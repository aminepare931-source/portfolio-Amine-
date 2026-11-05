import { useState } from 'react'
import { SERVICES } from '../data/services'
// Illustrations des services (images fournies par AMINE DIGITAL).
// PNG à fond transparent : l'illustration se pose sur la couleur de la carte.
// Accueil : série « services » — Page Services et pages de détail : série « services-page ».
export function ServiceImage({ slug, className = '', set = 'services' }: { slug: string; className?: string; set?: 'services' | 'services-page' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    // Pas d'illustration pour ce service : on affiche son icône dans un cadre aux couleurs du site.
    const Icon = SERVICES.find((s) => s.slug === slug)?.icon
    return (
      <div aria-hidden="true" className={`select-none pointer-events-none aspect-[4/3] rounded-md bg-gov/10 text-gov flex items-center justify-center ${className}`}>
        {Icon && <Icon size={44} strokeWidth={1.5} />}
      </div>
    )
  }
  return (
    <img
      src={`/assets/${set}/${slug}.png`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className={`select-none pointer-events-none ${className}`}
    />
  )
}

function Badge({ slug }: { slug: string }) {
  return <ServiceImage slug={slug} className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0" />
}

export const WebDevIllustration = () => <Badge slug="sites-web" />
export const DesignIllustration = () => <Badge slug="design" />
export const MarketingIllustration = () => <Badge slug="marketing-digital" />
export const SecurityIllustration = () => <Badge slug="cybersecurite" />
export const MobileIllustration = () => <Badge slug="applications-mobiles" />
export const AutomationIllustration = () => <Badge slug="automatisation-ia" />
