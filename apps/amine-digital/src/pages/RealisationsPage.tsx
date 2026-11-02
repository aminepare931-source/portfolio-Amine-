import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useRealisations } from '../lib/content'
import RealisationCard from '../components/RealisationCard'
import Seo from '../components/Seo'

export default function RealisationsPage() {
  const { list, loading } = useRealisations()
  return (
    <div className="px-5 sm:px-8 pt-36 pb-24 max-w-[1200px] mx-auto">
      <Seo path="/realisations" title="Réalisations — AMINE DIGITAL" description="Projets livrés par AMINE DIGITAL à Bobo-Dioulasso : sites web, applications, design et marketing digital." />
      <div className="text-center mb-12">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Réalisations</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Ils nous ont fait confiance</h1>
        <p className="text-slate-900/70 max-w-xl mx-auto">Quelques projets réalisés pour des entreprises et des porteurs de projet.</p>
      </div>
      {!loading && list.length === 0 && <p className="text-center text-muted">Les réalisations arrivent bientôt.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((r) => <RealisationCard key={r.id} r={r} />)}
      </div>
      <div className="text-center mt-16">
        <Link to="/devis" className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
          Demander un devis <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
