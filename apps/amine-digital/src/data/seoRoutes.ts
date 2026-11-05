/** Titres et descriptions de chaque page : source unique, utilisée par le site ET par le pré-rendu (partage WhatsApp, Google). */
export const SITE = 'https://amine-digital-services.vercel.app'
export const BRAND = 'AMINE DIGITAL'

export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'AMINE DIGITAL — Sites web, applications et marketing digital à Bobo-Dioulasso',
    description: "AMINE DIGITAL crée des sites web, applications mobiles, designs et campagnes de marketing digital pour les entreprises de Bobo-Dioulasso et du Burkina Faso. Demandez un devis gratuit.",
  },
  '/a-propos': {
    title: 'À propos — AMINE DIGITAL, agence digitale à Bobo-Dioulasso',
    description: "Découvrez AMINE DIGITAL : une équipe de développeurs, designers et spécialistes du marketing digital basée à Bobo-Dioulasso, au service des entreprises du Burkina Faso.",
  },
  '/processus': {
    title: 'Notre méthode de travail — AMINE DIGITAL',
    description: "De l'échange initial à la livraison : le processus d'AMINE DIGITAL en étapes claires pour réaliser votre site web, votre application ou votre campagne digitale.",
  },
  '/services': {
    title: 'Nos services — Web, e-commerce, cybersécurité, digitalisation, formation | AMINE DIGITAL',
    description: "Sites et applications web, applications mobiles, e-commerce, community management, cybersécurité, digitalisation, suivi d'entreprise, conseil et formation : tous les services d'AMINE DIGITAL à Bobo-Dioulasso, Burkina Faso.",
  },
  '/tarifs': {
    title: 'Tarifs — AMINE DIGITAL',
    description: "Formules claires pour votre site web, boutique en ligne ou application à Bobo-Dioulasso : Starter, Pro et sur-mesure, avec paiement Mobile Money.",
  },
  '/journal': {
    title: 'Publications & conseils — AMINE DIGITAL',
    description: "Toutes les publications d'AMINE DIGITAL : offres de services, formations, sites web, design, cybersécurité, e-commerce — Bobo-Dioulasso, Burkina Faso.",
  },
  '/realisations': {
    title: 'Réalisations — AMINE DIGITAL',
    description: "Projets d'AMINE DIGITAL à Bobo-Dioulasso : projets clients, produits SaaS et applications internes (sites web, applications, outils de gestion).",
  },
  '/devis': {
    title: 'Demander un devis — AMINE DIGITAL',
    description: "Décrivez votre projet (site web, application, design, marketing digital) et recevez une proposition adaptée à votre budget et à vos délais.",
  },
  '/contact': {
    title: 'Contact — AMINE DIGITAL, Bobo-Dioulasso (Burkina Faso)',
    description: "Contactez AMINE DIGITAL à Bobo-Dioulasso par WhatsApp, téléphone ou e-mail pour parler de votre projet de site web, d'application ou de marketing digital.",
  },
}

export const serviceSeo = (s: { slug: string; title: string; desc: string; teaser: string }) => ({
  path: `/services/${s.slug}`,
  title: `${s.title} à Bobo-Dioulasso — ${BRAND}`,
  description: `${s.teaser} ${s.desc}`.slice(0, 280),
})

/** Données structurées de l'entreprise (page d'accueil). Aucune coordonnée non vérifiée n'est ajoutée ici. */
export const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: BRAND,
  url: SITE,
  logo: `${SITE}/icon-512.png`,
  image: `${SITE}/og-image.jpg`,
  description: PAGE_SEO['/'].description,
  areaServed: { '@type': 'Country', name: 'Burkina Faso' },
  address: { '@type': 'PostalAddress', addressLocality: 'Bobo-Dioulasso', addressCountry: 'BF' },
  knowsAbout: ['Sites et applications web', 'Applications mobiles', 'E-commerce et paiement Mobile Money', 'Community management', 'Design graphique', 'Marketing digital', 'Automatisation par IA', 'Cybersécurité', "Digitalisation d'entreprise", "Suivi d'entreprise", 'Conseil', 'Formation'],
}
