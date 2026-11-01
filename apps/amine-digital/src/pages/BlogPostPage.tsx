import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react'
import { ARTICLES } from '../data/articles'
import { PUBLICATIONS } from '../data/publications'
import PublicationCard from '../components/PublicationCard'
import Seo from '../components/Seo'

function PublicationPage({ slug }: { slug: string }) {
  const p = PUBLICATIONS.find((x) => x.slug === slug)!
  const others = PUBLICATIONS.filter((x) => x.slug !== slug && x.category === p.category).concat(PUBLICATIONS.filter((x) => x.slug !== slug && x.category !== p.category)).slice(0, 3)
  const wa = `https://wa.me/22654412618?text=${encodeURIComponent(`Bonjour AMINE DIGITAL, je suis intéressé(e) par : ${p.title}`)}`

  return (
    <div className="px-5 sm:px-8 pt-36 pb-24 max-w-[1100px] mx-auto">
      <Seo
        path={`/journal/${p.slug}`}
        title={`${p.title} — AMINE DIGITAL`}
        description={p.excerpt}
        image={p.image}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': p.price ? 'Service' : 'Article',
          name: p.title,
          description: p.excerpt,
          image: `https://amine-digital-services.vercel.app${p.image}`,
          provider: { '@type': 'Organization', name: 'AMINE DIGITAL', areaServed: 'Burkina Faso', address: { '@type': 'PostalAddress', addressLocality: 'Bobo-Dioulasso', addressCountry: 'BF' } },
        }}
      />
      <Link to="/journal" className="inline-flex items-center gap-2 text-sm text-muted hover:text-clay transition-colors mb-8">
        <ArrowLeft size={15} /> Toutes les publications
      </Link>

      <div className="grid md:grid-cols-[1fr_1fr] gap-8 lg:gap-14 items-start">
        <img src={p.image} alt={p.alt} width={p.w} height={p.h} className="w-full h-auto rounded-md border border-stroke shadow-[0_20px_50px_rgba(10,61,145,0.15)] md:sticky md:top-28" />
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">{p.category}</div>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-5">{p.title}</h1>
          {p.price && <div className="inline-block rounded-full bg-gov/10 text-gov font-semibold text-sm px-4 py-1.5 mb-5">{p.price}</div>}
          <p className="text-slate-900/75 leading-relaxed text-base sm:text-lg mb-7">{p.intro}</p>
          <ul className="space-y-3 mb-9">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-slate-900/80">
                <Check size={18} className="text-gov shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gov text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
              <MessageCircle size={16} /> Commander sur WhatsApp
            </a>
            {p.serviceSlug && (
              <Link to={`/services/${p.serviceSlug}`} className="inline-flex items-center gap-2 border border-stroke px-6 py-3 rounded-sm text-gov hover:border-gov/50 transition-colors">
                Voir le service <ArrowRight size={15} />
              </Link>
            )}
          </div>
          <p className="text-xs text-muted mt-5">+226 54 41 26 18 — Bobo-Dioulasso, Burkina Faso</p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-display text-2xl mb-6">Autres publications</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {others.map((o) => <PublicationCard key={o.slug} p={o} />)}
        </div>
      </div>
    </div>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  if (slug && PUBLICATIONS.some((p) => p.slug === slug)) return <PublicationPage slug={slug} />

  const article = ARTICLES.find((a) => a.slug === slug)
  if (!article) return <Navigate to="/journal" replace />

  return (
    <div className="px-6 pt-36 pb-24 max-w-[700px] mx-auto">
      <Seo path={`/journal/${article.slug}`} title={`${article.title} — AMINE DIGITAL`} description={article.excerpt} />
      <Link to="/journal" className="inline-flex items-center gap-2 text-sm text-muted hover:text-clay transition-colors mb-8">
        <ArrowLeft size={15} /> Journal
      </Link>
      <div className="text-xs font-mono text-muted mb-3">{article.date}</div>
      <h1 className="font-display text-3xl sm:text-4xl mb-8 leading-tight">{article.title}</h1>
      <div className="space-y-5 text-slate-900/80 leading-relaxed text-base sm:text-lg mb-14">
        {article.content.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="border-t border-stroke pt-8 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
          Un projet en tête ? Discutons-en <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
