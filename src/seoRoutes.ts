/** Titres et descriptions de chaque page : source unique pour le site et le pré-rendu (partage WhatsApp, Google). */
export const SITE = 'https://portfolio-amine-dev.vercel.app'
const NAME = 'Mouhamed Amine Paré'

export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${NAME} (Amine.Dev) — Développeur web et mobile à Bobo-Dioulasso`,
    description: "Portfolio de Mouhamed Amine Paré, alias Amine.Dev : développeur autodidacte à Bobo-Dioulasso (Burkina Faso). Développement web et mobile, intégration d'IA, marketing digital et cybersécurité.",
  },
  '/a-propos': {
    title: `À propos — ${NAME}, développeur à Bobo-Dioulasso`,
    description: "Qui est Mouhamed Amine Paré (Amine.Dev) : développeur autodidacte au Burkina Faso, environ trois ans d'expérience en développement web et mobile, IA, marketing digital et cybersécurité.",
  },
  '/competences': {
    title: `Compétences — ${NAME} (Amine.Dev)`,
    description: "Technologies et savoir-faire de Mouhamed Amine Paré : développement web et mobile, intégration d'intelligence artificielle, marketing digital et cybersécurité.",
  },
  '/projets': {
    title: `Projets — ${NAME} (Amine.Dev)`,
    description: "Projets réalisés par Mouhamed Amine Paré : applications web et mobiles, plateformes, outils d'IA et sites, avec leur description et leurs technologies.",
  },
  '/parcours': {
    title: `Parcours — ${NAME} (Amine.Dev)`,
    description: "Le parcours de Mouhamed Amine Paré : des débuts en autodidacte à Bobo-Dioulasso jusqu'aux projets web, mobiles et d'IA.",
  },
  '/galerie': {
    title: `Galerie — ${NAME} (Amine.Dev)`,
    description: "Galerie de créations, explorations visuelles et motion design de Mouhamed Amine Paré (Amine.Dev).",
  },
  '/contact': {
    title: `Contact — ${NAME}, développeur à Bobo-Dioulasso`,
    description: "Contactez Mouhamed Amine Paré (Amine.Dev) à Bobo-Dioulasso, Burkina Faso, pour un projet de site web, d'application, d'IA ou de marketing digital.",
  },
}

export const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NAME,
  alternateName: ['Amine.Dev', 'AmineDev'],
  url: SITE,
  image: `${SITE}/og-image.jpg`,
  jobTitle: 'Développeur web et mobile',
  description: PAGE_SEO['/'].description,
  address: { '@type': 'PostalAddress', addressLocality: 'Bobo-Dioulasso', addressCountry: 'BF' },
  sameAs: ['https://github.com/aminepare931-source'],
  knowsAbout: ['Développement web', 'Développement mobile', 'Intelligence artificielle', 'Marketing digital', 'Cybersécurité'],
}
