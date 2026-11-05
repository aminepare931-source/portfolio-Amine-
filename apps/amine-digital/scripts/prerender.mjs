// Après `vite build` : crée une page HTML par adresse, avec son propre titre, sa description et ses balises de partage.
// Résultat : WhatsApp, Facebook et Google voient les bons textes sans exécuter le JavaScript. L'application React reprend ensuite la main.
import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' })
const { PAGE_SEO, SITE, serviceSeo, ORG_JSONLD } = await vite.ssrLoadModule('/src/data/seoRoutes.ts')
const { SERVICES } = await vite.ssrLoadModule('/src/data/services.ts')
const { PUBLICATIONS } = await vite.ssrLoadModule('/src/data/publications.ts')

const pages = Object.entries(PAGE_SEO).map(([p, m]) => ({ path: p, ...m }))
for (const s of SERVICES) pages.push(serviceSeo(s))
for (const p of PUBLICATIONS) pages.push({ path: `/journal/${p.slug}`, title: `${p.title} — AMINE DIGITAL`, description: p.excerpt, image: p.image?.startsWith('/') ? p.image : undefined })

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
  if (p.image) {
    h = h.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${SITE}${esc(p.image)}$2`)
    h = h.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${SITE}${esc(p.image)}$2`)
  }
  let extra = `<link rel="canonical" href="${esc(url)}" />`
  if (p.path === '/') extra += `<script type="application/ld+json">${JSON.stringify(ORG_JSONLD)}</script>`
  h = h.replace('</head>', `${extra}</head>`)
  // Contenu lisible sans JavaScript (React le remplace au chargement)
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
