import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { SERVICES } from '../data/services'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const currentIndex = SERVICES.findIndex((s) => s.slug === slug)
  const next = SERVICES[(currentIndex + 1) % SERVICES.length]

  return (
    <div className="px-6 pt-36 pb-24 max-w-[800px] mx-auto">
      <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted hover:text-clay transition-colors mb-8">
        <ArrowLeft size={15} /> Tous les services
      </Link>

      <div className="w-14 h-14 rounded-md bg-clay/10 text-clay flex items-center justify-center mb-6">
        <service.icon size={26} />
      </div>

      <h1 className="font-display text-4xl sm:text-5xl mb-5">{service.title}</h1>
      <p className="text-lg text-slate-900/70 mb-10 leading-relaxed">{service.longDesc}</p>

      <div className="border border-stroke rounded-md p-7 sm:p-8 bg-surface/40 mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-4">Ce que ça comprend</div>
        <ul className="space-y-3">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-900/85">
              <Check size={17} className="text-clay shrink-0 mt-0.5" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 mb-16">
        <a
          href="https://wa.me/22655300868"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-6 py-3.5 rounded-sm hover:opacity-90 transition-opacity"
        >
          Discuter de ce service <ArrowRight size={16} />
        </a>
        <Link
          to="/tarifs"
          className="inline-flex items-center gap-2 border border-stroke font-semibold px-6 py-3.5 rounded-sm hover:bg-slate-900/5 transition-colors"
        >
          Voir les tarifs
        </Link>
      </div>

      <Link
        to={`/services/${next.slug}`}
        className="group flex items-center justify-between border-t border-stroke pt-6"
      >
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted mb-1">Service suivant</div>
          <div className="font-display text-2xl group-hover:text-clay transition-colors">{next.title}</div>
        </div>
        <ArrowRight size={22} className="text-slate-900/30 group-hover:text-clay group-hover:translate-x-1 transition-all" />
      </Link>
    </div>
  )
}
