import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../data/services'

export default function ServicesPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[1000px] mx-auto">
      <div className="text-center mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Ce que je fais</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Nos services</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          De l'idée au lancement, un accompagnement complet pour exister en ligne. Cliquez sur un service pour voir le détail.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group border border-stroke rounded-3xl p-7 hover:border-clay/40 hover:-translate-y-1 transition-all bg-surface/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-2xl bg-clay/10 text-clay flex items-center justify-center">
                <s.icon size={20} />
              </div>
              <ArrowUpRight size={18} className="text-slate-900/30 group-hover:text-clay group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <h3 className="font-display text-2xl mb-2">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.teaser}</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/tarifs"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Voir les tarifs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
