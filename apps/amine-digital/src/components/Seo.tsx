import { useEffect } from 'react'

const SITE = 'https://amine-digital-services.vercel.app'

export default function Seo({
  title, description, image, path, jsonLd,
}: { title: string; description: string; image?: string; path: string; jsonLd?: object }) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    const set = (sel: string, attr: string, val: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, sel.match(/"(.+)"/)![1]); document.head.appendChild(el) }
      el.setAttribute('content', val)
    }
    set('meta[name="description"]', 'name', description)
    set('meta[property="og:title"]', 'property', title)
    set('meta[property="og:description"]', 'property', description)
    if (image && image.startsWith('/')) set('meta[property="og:image"]', 'property', SITE + image)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = SITE + path
    let ld: HTMLScriptElement | null = null
    if (jsonLd) {
      ld = document.createElement('script'); ld.type = 'application/ld+json'
      ld.textContent = JSON.stringify(jsonLd); document.head.appendChild(ld)
    }
    return () => { document.title = prev; ld?.remove() }
  }, [title, description, image, path, jsonLd])
  return null
}
