import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../data/seoRoutes'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ServiceImage } from '../components/PillarIllustrations'
import { SERVICES } from '../data/services'
import { Line } from '../components/Reveal'

export default function ServicesPage() {
  return (
    <div className="px-4 sm:px-6 pt-36 pb-24 max-w-[1100px] mx-auto">
      <Seo path="/services" {...PAGE_SEO['/services']} />
      <div className="text-center mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Ce que nous faisons</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4"><Line>Nos services</Line></h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          De l'idée au lancement, un accompagnement complet pour exister en ligne. Cliquez sur un service pour voir le détail.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="group flex flex-col border border-stroke rounded-md p-4 sm:p-6 hover:border-clay/40 hover:-translate-y-0.5 transition-all duration-300 bg-surface/30"
          >
            <div className="flex items-start justify-between mb-3">
              <ServiceImage set="services-page" slug={s.slug} className="w-16 sm:w-28 h-auto" />
              <ArrowUpRight size={16} className="text-slate-900/30 group-hover:text-clay transition-colors" />
            </div>
            <h3 className="font-display text-base sm:text-xl leading-snug mb-1.5">{s.title}</h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">{s.teaser}</p>
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
