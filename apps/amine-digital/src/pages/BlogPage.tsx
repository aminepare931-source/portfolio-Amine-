import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ARTICLES } from '../data/articles'
import type { PubCategory } from '../data/publications'
import { usePublications } from '../lib/content'
import PublicationCard from '../components/PublicationCard'
import Seo from '../components/Seo'

const FILTERS: ('Tout' | PubCategory)[] = ['Tout', 'Service', 'Formation', 'Actualité']

const LABELS: Record<PubCategory, string> = { Service: 'Services', Formation: 'Formations', 'Actualité': 'Actualités' }

export default function BlogPage() {
  const { list: PUBLICATIONS } = usePublications()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Tout')
  const list = filter === 'Tout' ? PUBLICATIONS : PUBLICATIONS.filter((p) => p.category === filter)

  return (
    <div className="px-5 sm:px-8 pt-36 pb-24 max-w-[1200px] mx-auto">
      <Seo
        path="/journal"
        title="Publications & conseils — AMINE DIGITAL"
        description="Toutes les publications d'AMINE DIGITAL : offres de services, formations, sites web, design, cybersécurité, e-commerce — Bobo-Dioulasso, Burkina Faso."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Publications AMINE DIGITAL',
          hasPart: PUBLICATIONS.map((p) => ({ '@type': 'ImageObject', name: p.title, description: p.excerpt, contentUrl: p.image.startsWith('/') ? `https://amine-digital-services.vercel.app${p.image}` : undefined })),
        }}
      />

      <div className="text-center mb-12">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Journal</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Publications</h1>
        <p className="text-slate-900/70 max-w-xl mx-auto">
          Nos offres, formations et annonces, aussi publiées sur Facebook et TikTok, ici à retrouver facilement (et sur Google).
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filtrer les publications">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              filter === f ? 'bg-gov text-white border-gov' : 'border-stroke text-slate-900/70 hover:border-gov/50'
            }`}
          >
            {f === 'Tout' ? `Tout (${PUBLICATIONS.length})` : LABELS[f]}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mb-24">
        {list.map((p, i) => (
          <PublicationCard key={p.slug} p={p} priority={i < 3} />
        ))}
      </div>

      <div className="max-w-[800px] mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Articles</div>
        <h2 className="font-display text-3xl mb-8">Conseils & réflexions</h2>
        <div className="border-t border-stroke">
          {ARTICLES.map((a) => (
            <Link key={a.slug} to={`/journal/${a.slug}`} className="group flex items-start justify-between gap-6 py-8 border-b border-stroke">
              <div>
                <div className="text-xs font-mono text-muted mb-2">{a.date}</div>
                <h3 className="font-display text-xl sm:text-2xl mb-2 group-hover:text-clay transition-colors">{a.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-lg">{a.excerpt}</p>
              </div>
              <ArrowUpRight size={20} className="text-slate-900/30 group-hover:text-clay transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
