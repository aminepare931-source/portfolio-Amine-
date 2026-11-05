import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../data/seoRoutes'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ServiceImage } from '../components/PillarIllustrations'
import { SERVICES } from '../data/services'
import { Line } from '../components/Reveal'

export default function ServicesPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[1000px] mx-auto">
      <Seo path="/services" {...PAGE_SEO['/services']} />
      <div className="text-center mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Ce que nous faisons</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4"><Line>Nos services</Line></h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          De l'idée au lancement, un accompagnement complet pour exister en ligne. Cliquez sur un service pour voir le détail.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group border border-stroke rounded-md p-7 hover:border-clay/40 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] bg-surface/30"
          >
            <div className="flex items-start justify-between mb-4">
              <ServiceImage set="services-page" slug={s.slug} className="w-44 h-auto -ml-2" />
              <ArrowUpRight size={18} className="text-slate-900/30 group-hover:text-clay group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]" />
            </div>
            <h3 className="font-display text-2xl mb-2">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.teaser}</p>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/tarifs"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-sm hover:opacity-90 transition-opacity"
        >
          Voir les tarifs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
