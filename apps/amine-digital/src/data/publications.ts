export type PubCategory = 'Formation' | 'Service' | 'Actualité'

export interface Publication {
  slug: string
  title: string
  category: PubCategory
  /** Texte court affiché sur la carte et utilisé comme meta description */
  excerpt: string
  /** Prix ou accroche commerciale, si l'affiche en affiche un */
  price?: string
  /** Points clés (transcription de l'affiche : utile pour Google) */
  points: string[]
  /** Paragraphe d'introduction affiché sur la page */
  intro: string
  /** Service du site auquel la publication se rattache */
  serviceSlug?: string
  image: string
  alt: string
  /** Largeur / hauteur de l'image, pour éviter le saut de mise en page */
  w: number
  h: number
}

const img = (n: string) => `/assets/publications/${n}.jpg`

// Pour publier une nouvelle affiche : déposer l'image dans public/assets/publications/
// puis ajouter un bloc ici, en tête de liste (les plus récentes d'abord).
export const PUBLICATIONS: Publication[] = [
  {
    slug: 'bon-debut-novembre',
    title: 'Bon début de mois de novembre',
    category: 'Actualité',
    excerpt: 'Un nouveau mois, de nouvelles opportunités : toute l’équipe AMINE DIGITAL vous souhaite un mois de novembre productif.',
    points: ['Santé, bonheur, réussite et prospérité', 'Restons motivés, soudés et tournés vers nos objectifs'],
    intro: 'Que ce mois de novembre vous apporte santé, bonheur, réussite et prospérité. Ensemble, faisons de ce mois une réussite.',
    image: img('bon-debut-novembre'), alt: 'Affiche AMINE DIGITAL : bon début de mois de novembre', w: 1000, h: 1000,
  },
  {
    slug: 'conception-site-web-pro',
    title: 'Conception de site web pro, à partir de 25 000 FCFA',
    category: 'Service',
    excerpt: 'Site vitrine, e-commerce ou refonte : un site web professionnel à partir de 25 000 FCFA (offre limitée et soumise à conditions).',
    price: 'À partir de 25 000 FCFA',
    points: ['Site vitrine', 'E-commerce', 'Refonte de site', 'Offre limitée et soumise à conditions'],
    intro: 'AMINE DIGITAL conçoit votre site web professionnel : vitrine, boutique en ligne ou refonte d’un site existant, à partir de 25 000 FCFA seulement.',
    serviceSlug: 'sites-web',
    image: img('conception-site-web-pro'), alt: 'Affiche : conception de site web professionnel à partir de 25 000 FCFA', w: 1000, h: 667,
  },
  {
    slug: 'informatique-et-digital',
    title: 'Services informatique & digital pour professionnels',
    category: 'Service',
    excerpt: 'Sites web, applications mobiles, logiciels sur mesure, cybersécurité, IA, e-commerce : tout ce que propose AMINE DIGITAL.',
    points: ['Création de sites web', 'Applications mobiles', 'Logiciels sur mesure', 'Cybersécurité', 'Intelligence artificielle (IA)', 'Solutions e-commerce', 'Vente en ligne & physique', 'Recherche & innovation'],
    intro: 'Vous avez besoin de services informatique et digital professionnels ? Voici ce que nous offrons.',
    serviceSlug: 'sites-web',
    image: img('informatique-et-digital'), alt: 'Affiche AMINE DIGITAL : services informatique et digital', w: 1000, h: 1000,
  },
  {
    slug: 'boutique-ecommerce-cle-en-main',
    title: 'Boutique e-commerce clé en main',
    category: 'Service',
    excerpt: 'Une boutique en ligne qui vend, encaisse et livre automatiquement. Une minute avec AMINE peut vous faire gagner des mois de galère.',
    points: ['Boutique clé en main', 'Encaissement automatique', 'Livraison automatisée', 'Gestion des produits et commandes'],
    intro: 'Une boutique e-commerce clé en main qui vend, encaisse et livre automatiquement : vous gérez vos produits et vos commandes depuis votre téléphone.',
    serviceSlug: 'sites-web',
    image: img('boutique-ecommerce-cle-en-main'), alt: 'Affiche : boutique e-commerce clé en main AMINE DIGITAL', w: 802, h: 1000,
  },
  {
    slug: 'community-manager',
    title: 'Community Manager pour booster votre visibilité',
    category: 'Service',
    excerpt: 'Création et animation de vos pages, contenus, gestion des messages et une publicité sponsorisée incluse.',
    points: ['Création & animation des pages réseaux sociaux (Facebook, LinkedIn, Instagram…)', 'Création de contenus : articles, newsletter, images, vidéos', 'Gestion des messages & commentaires', '1 pub sponsorisée incluse'],
    intro: 'Besoin d’un Community Manager pour booster la visibilité de votre entreprise ? Voici nos services.',
    serviceSlug: 'marketing-digital',
    image: img('community-manager'), alt: 'Affiche : service Community Manager AMINE DIGITAL', w: 1000, h: 667,
  },
  {
    slug: 'designer-graphique',
    title: 'Un excellent designer graphique',
    category: 'Service',
    excerpt: 'Logo, affiches, visuels réseaux sociaux : AMINE DIGITAL est le designer graphique qu’il vous faut.',
    points: ['Identité visuelle et logo', 'Affiches et visuels pour les réseaux sociaux'],
    intro: 'Vous cherchez un excellent designer graphique ? N’hésitez plus, contactez-nous.',
    serviceSlug: 'design',
    image: img('designer-graphique'), alt: 'Affiche : AMINE DIGITAL, designer graphique', w: 1000, h: 1000,
  },
  {
    slug: 'cybersecurite-protegez-chaque-acces',
    title: 'Cybersécurité : protégez chaque accès',
    category: 'Service',
    excerpt: 'Identité, appareils et données sécurisés par conception.',
    points: ['Sécurisation des accès', 'Protection des appareils', 'Protection des données'],
    intro: 'Protégez chaque accès : identité, appareils et données sécurisés par conception.',
    serviceSlug: 'cybersecurite',
    image: img('cybersecurite-protegez-chaque-acces'), alt: 'Affiche : cybersécurité, protégez chaque accès', w: 754, h: 1000,
  },
  {
    slug: 'cv-professionnel',
    title: 'Votre CV professionnel : 01 CV à 2 000 FCFA',
    category: 'Service',
    excerpt: 'Un CV prêt pour attirer les recruteurs : plus de 100 CV conçus, rapidité et pratiques modernes, à 2 000 FCFA.',
    price: '2 000 FCFA',
    points: ['Attirer l’attention des recruteurs', 'Gagner du temps lors des candidatures', 'Adapter rapidement aux opportunités', 'Plus de 100 CV conçus', 'Rapidité', 'Maîtrise des pratiques modernes et professionnelles'],
    intro: 'As-tu ton curriculum vitae ? Pourquoi posséder un CV prêt, et pourquoi nous : expérience avérée, rapidité et savoir-faire moderne.',
    serviceSlug: 'design',
    image: img('cv-professionnel'), alt: 'Affiche : création de CV professionnel à 2 000 FCFA', w: 1000, h: 1000,
  },
  {
    slug: 'formation-ecommerce-alibaba',
    title: 'Formation exclusive e-commerce sur Alibaba.com',
    category: 'Formation',
    excerpt: 'Acheter sur Alibaba, éviter les arnaques, payer en sécurité, trouver des niches rentables et vendre en ligne. Gratuit pour les 15 premiers inscrits.',
    price: 'Gratuit pour les 15 premiers, puis 5 500 FCFA',
    points: ['Comment acheter sur Alibaba', 'Tout savoir sur l’achat en ligne et les transitaires', 'Éviter les arnaqueurs et faux comptes', 'Effectuer un paiement sécurisé', 'Rechercher des niches rentables', 'Comment vendre en ligne'],
    intro: 'Formation exclusive sur le e-commerce avec Alibaba.com. 15 places seulement : gratuit pour les 15 premiers inscrits, 5 500 FCFA ensuite.',
    image: img('formation-ecommerce-alibaba'), alt: 'Affiche : formation exclusive e-commerce sur Alibaba.com', w: 1000, h: 1000,
  },
  {
    slug: 'formation-cartes-virtuelles',
    title: 'Formation création de cartes virtuelles : 2 100 FCFA',
    category: 'Formation',
    excerpt: 'Payez en ligne simplement et partout : formation vidéo + PDF à 2 100 FCFA au lieu de 5 000, avec assistance gratuite.',
    price: '2 100 FCFA au lieu de 5 000 FCFA',
    points: ['Carte 100 % virtuelle, sans carte physique', 'Assistance gratuite', 'Formation vidéo + PDF', 'Utilisable sur Google, TikTok, Canva, Spotify, Netflix, PayPal et plus', 'Recharge simple par Mobile Money'],
    intro: 'Apprenez à créer vos cartes virtuelles pour payer en ligne, simplement et partout, avec une recharge par Mobile Money.',
    image: img('formation-cartes-virtuelles'), alt: 'Affiche : formation création de cartes virtuelles, promo 2 100 FCFA', w: 802, h: 1000,
  },
  {
    slug: 'formation-cartes-virtuelles-eversend',
    title: 'Formation cartes virtuelles avec Eversend',
    category: 'Formation',
    excerpt: 'Apprenez à créer vos cartes virtuelles vous-même avec Eversend : paiements en ligne, abonnements, Netflix, Alibaba, TikTok, Facebook Ads. 2 100 FCFA.',
    price: '2 100 FCFA au lieu de 5 000 FCFA',
    points: ['Paiements en ligne et abonnements', 'Apps, Netflix, Alibaba, TikTok, Facebook Ads', 'Formation vidéo + PDF', 'Promotion : 5 000 FCFA → 2 100 FCFA'],
    intro: 'Formation pour créer vos cartes virtuelles vous-même avec Eversend, en promotion à 2 100 FCFA.',
    image: img('formation-cartes-virtuelles-eversend'), alt: 'Affiche : formation création de cartes virtuelles Eversend', w: 1000, h: 1000,
  },
]
