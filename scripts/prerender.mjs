// Après `vite build` : crée une page HTML par adresse, avec son propre titre, sa description et ses balises de partage.
import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' })
const { PAGE_SEO, SITE, PERSON_JSONLD } = await vite.ssrLoadModule('/src/seoRoutes.ts')
const pages = Object.entries(PAGE_SEO).map(([p, m]) => ({ path: p, ...m }))
const links = pages.filter((p) => p.path !== '/').map((p) => `<li><a href="${esc(p.path)}">${esc(p.title)}</a></li>`).join('')

function render(p) {
  const url = SITE + (p.path === '/' ? '' : p.path)
  let h = base
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`)
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
  h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(p.title)}$2`)
  h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
  h = h.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
  h = h.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(p.title)}$2`)
  h = h.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
  let extra = `<link rel="canonical" href="${esc(url)}" />`
  if (p.path === '/') extra += `<script type="application/ld+json">${JSON.stringify(PERSON_JSONLD)}</script>`
  h = h.replace('</head>', `${extra}</head>`)
  h = h.replace('<div id="root"></div>', `<div id="root"></div><noscript><main><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p><nav><ul>${links}</ul></nav></main></noscript>`)
  return h
}

let n = 0
for (const p of pages) {
  const out = p.path === '/' ? path.join(dist, 'index.html') : path.join(dist, p.path, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, render(p)); n++
}
await vite.close()
console.log(`prerender: ${n} pages`)
