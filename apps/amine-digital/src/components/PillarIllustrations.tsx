// Illustrations des services (images fournies par AMINE DIGITAL).
// PNG à fond transparent : l'illustration se pose sur la couleur de la carte.
export function ServiceImage({ slug, className = '' }: { slug: string; className?: string }) {
  return (
    <img
      src={`/assets/services/${slug}.png`}
      alt=""
      loading="lazy"
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
