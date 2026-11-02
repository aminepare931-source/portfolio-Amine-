import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useRealisations } from '../lib/content'
import RealisationCard from './RealisationCard'

/** Section d'accueil : n'apparaît que lorsqu'au moins une réalisation est publiée. */
export default function RealisationsSection() {
  const { list } = useRealisations()
  if (!list.length) return null
  return (
    <section className="bg-bg pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Réalisations</div>
            <h2 className="font-display text-3xl sm:text-4xl">Nos projets livrés</h2>
          </div>
          <Link to="/realisations" className="inline-flex items-center gap-2 text-sm font-medium text-gov hover:text-clay transition-colors">Toutes les réalisations <ArrowRight size={15} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.slice(0, 3).map((r) => <RealisationCard key={r.id} r={r} />)}
        </div>
      </div>
    </section>
  )
}
