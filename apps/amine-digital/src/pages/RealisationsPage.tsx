import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useRealisations, KIND_LABEL, type Kind } from '../lib/content'
import RealisationCard from '../components/RealisationCard'
import Seo from '../components/Seo'

const ORDER: Kind[] = ['client', 'saas', 'interne', 'personnel']

export default function RealisationsPage() {
  const { list, loading } = useRealisations()
  const [filter, setFilter] = useState<'all' | Kind>('all')
  const kinds = ORDER.filter((k) => list.some((r) => r.kind === k))
  const shown = filter === 'all' ? list : list.filter((r) => r.kind === filter)
  return (
    <div className="px-5 sm:px-8 pt-36 pb-24 max-w-[1200px] mx-auto">
      <Seo path="/realisations" title="Réalisations — AMINE DIGITAL" description="Projets d'AMINE DIGITAL à Bobo-Dioulasso : projets clients, produits SaaS et applications internes (sites web, applications, outils métier)." />
      <div className="text-center mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Réalisations</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Nos projets</h1>
        <p className="text-slate-900/70 max-w-xl mx-auto">Chaque projet indique clairement s'il a été réalisé pour un client, s'il s'agit d'un produit SaaS ou d'une application interne d'AMINE DIGITAL.</p>
      </div>
      {kinds.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filtrer par type">
          {(['all', ...kinds] as const).map((k) => (
            <button key={k} role="tab" aria-selected={filter === k} onClick={() => setFilter(k)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${filter === k ? 'bg-gov text-white border-gov' : 'border-stroke text-slate-900/70 hover:border-gov/50'}`}>
              {k === 'all' ? `Tous (${list.length})` : `${KIND_LABEL[k]} (${list.filter((r) => r.kind === k).length})`}
            </button>
          ))}
        </div>
      )}
      {!loading && list.length === 0 && <p className="text-center text-muted">Les projets arrivent bientôt.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((r) => <RealisationCard key={r.id} r={r} />)}
      </div>
      <div className="text-center mt-16">
        <Link to="/devis" className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
          Un projet similaire ? Demander un devis <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
