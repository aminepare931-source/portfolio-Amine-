export interface Article {
  slug: string
  title: string
  excerpt: string
  date: string
  content: string[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'pourquoi-votre-entreprise-a-besoin-dun-site-web',
    title: "Pourquoi votre entreprise a besoin d'un site web, même petite",
    excerpt: "Beaucoup d'entreprises burkinabè fonctionnent très bien sans site web. Voici pourquoi ça change quand même la donne d'en avoir un.",
    date: '2026-01',
    content: [
      "Beaucoup de commerces et d'entreprises au Burkina Faso fonctionnent aujourd'hui uniquement via WhatsApp ou Facebook, et ça marche. Alors pourquoi investir dans un site web ?",
      "D'abord, la crédibilité : un client qui cherche votre entreprise sur Google et ne trouve rien va souvent se poser des questions. Un site simple, même une seule page, répond à ça.",
      "Ensuite, le contrôle : sur les réseaux sociaux, vous dépendez des règles de la plateforme, de son algorithme, parfois de comptes suspendus sans explication. Votre site vous appartient.",
      "Enfin, la conversion : un site bien structuré, avec vos services et un moyen de vous contacter clairement affiché, transforme plus de visiteurs en clients qu'une simple page sociale.",
    ],
  },
  {
    slug: 'mobile-money-sur-votre-boutique-en-ligne',
    title: 'Intégrer le Mobile Money à votre boutique en ligne',
    excerpt: "Le paiement en ligne reste un frein pour beaucoup de projets e-commerce ici. Le Mobile Money change ça.",
    date: '2026-02',
    content: [
      "L'un des plus gros freins à la vente en ligne au Burkina Faso, c'est le paiement : peu de clients ont une carte bancaire, et la confiance envers le paiement en ligne classique reste limitée.",
      "Le Mobile Money résout une grande partie de ce problème : c'est un moyen de paiement que vos clients utilisent déjà au quotidien, sans friction supplémentaire.",
      "Intégrer le Mobile Money à une boutique en ligne demande une configuration technique spécifique, mais une fois en place, ça simplifie énormément le parcours d'achat — et ça rassure le client.",
    ],
  },
  {
    slug: 'reseaux-sociaux-ou-site-web',
    title: 'Réseaux sociaux ou site web : faut-il choisir ?',
    excerpt: "Ce n'est pas l'un ou l'autre. Voici comment les deux fonctionnent ensemble, pas en concurrence.",
    date: '2026-03',
    content: [
      "La question revient souvent : faut-il investir dans un site web ou se concentrer sur les réseaux sociaux ?",
      "En réalité, ce n'est pas un choix à faire. Les réseaux sociaux sont excellents pour la visibilité au quotidien, l'engagement, le contenu régulier. Le site web, lui, sert de base stable : c'est là où un client va vérifier que vous existez vraiment, voir l'ensemble de vos services, ou passer commande directement.",
      "La meilleure approche, c'est de les faire travailler ensemble : vos réseaux sociaux amènent du trafic vers votre site, et votre site convertit ce trafic en clients.",
    ],
  },
]
