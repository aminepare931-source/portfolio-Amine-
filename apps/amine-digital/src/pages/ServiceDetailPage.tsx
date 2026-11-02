import { useSettings, waUrl } from '../lib/settings'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { ServiceImage } from '../components/PillarIllustrations'
import { SERVICES } from '../data/services'
import { SERVICE_PHOTOS, type ServicePhoto } from '../data/servicePhotos'

function Photo({ p }: { p: ServicePhoto }) {
  return (
    <img
      src={p.src}
      alt={p.alt}
      loading="lazy"
      className="w-full h-auto rounded-md border border-stroke shadow-[0_16px_40px_rgba(10,61,145,0.12)]"
    />
  )
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const cfg = useSettings()
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const currentIndex = SERVICES.findIndex((s) => s.slug === slug)
  const next = SERVICES[(currentIndex + 1) % SERVICES.length]
  const photos = SERVICE_PHOTOS[service.slug] ?? []

  return (
    <div className="px-6 pt-36 pb-24 max-w-[1000px] mx-auto">
      <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted hover:text-clay transition-colors mb-8">
        <ArrowLeft size={15} /> Tous les services
      </Link>

      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center mb-10">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl mb-3">{service.title}</h1>
          <p className="text-muted">{service.teaser}</p>
        </div>
        <ServiceImage set="services-page" slug={service.slug} className="w-48 sm:w-56 h-auto md:justify-self-end" />
      </div>

      {/* 1 — Présentation + photo */}
      <section className="grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-14">
        <p className="text-base sm:text-lg text-slate-900/75 leading-relaxed">{service.longDesc}</p>
        {photos[0] && <Photo p={photos[0]} />}
      </section>

      {/* 2 — Ce que ça comprend + photo */}
      <section className="grid md:grid-cols-2 gap-6 md:gap-10 items-center mb-14">
        <div className="border border-stroke rounded-md p-7 sm:p-8 bg-surface/40 md:order-2">
          <div className="text-xs font-mono uppercase tracking-widest text-clay mb-4">Ce que ça comprend</div>
          <ul className="space-y-3">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-900/85">
                <Check size={17} className="text-clay shrink-0 mt-0.5" /> {item}
              </li>
            ))}
          </ul>
        </div>
        {photos[1] && <div className="md:order-1"><Photo p={photos[1]} /></div>}
      </section>

      {/* 3 — Aperçus */}
      {photos.length > 2 && (
        <section className="mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-clay mb-4">En situation</div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {photos.slice(2, 4).map((ph) => <Photo key={ph.src} p={ph} />)}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-3 mb-16">
        <a
          href={waUrl(cfg, `Bonjour AMINE DIGITAL, je souhaite discuter du service : ${service.title}`)}
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
        <ArrowRight size={22} className="text-slate-900/30 group-hover:text-clay group-hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]" />
      </Link>
    </div>
  )
}
