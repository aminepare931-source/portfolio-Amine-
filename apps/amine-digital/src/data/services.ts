import { Code2, Smartphone, Palette, Megaphone, Bot, ShieldCheck, ShoppingCart, Share2, Workflow, TrendingUp, Lightbulb, GraduationCap } from 'lucide-react'

export interface Service {
  slug: string
  icon: typeof Code2
  title: string
  teaser: string
  desc: string
  longDesc: string
  items: string[]
}

const ALL: Service[] = [
  {
    slug: 'sites-web',
    icon: Code2,
    title: 'Sites web & applications web',
    teaser: 'Vitrine, boutique en ligne, plateforme sur mesure.',
    desc: 'Rapide, responsive, facile à gérer soi-même une fois livré.',
    longDesc:
      "Un site web, c'est souvent le premier contact entre votre entreprise et un client potentiel. Nous concevons des sites rapides, clairs, et pensés d'abord pour le mobile — parce que c'est là que la majorité de vos visiteurs vous trouveront. Que ce soit une vitrine simple pour présenter votre activité ou une boutique complète avec paiement Mobile Money, l'objectif reste le même : convertir un visiteur en client.",
    items: ['Site vitrine professionnel', 'Application web sur mesure (gestion, plateforme, tableau de bord)', 'Refonte de site existant', 'Hébergement & nom de domaine'],
  },
  {
    slug: 'applications-mobiles',
    icon: Smartphone,
    title: 'Applications mobiles & logiciels',
    teaser: 'Une app Android pensée pour votre activité.',
    desc: "De l'idée au store, en passant par les retours de vos premiers utilisateurs.",
    longDesc:
      "Quand un site ne suffit plus — parce que vous avez besoin d'une expérience plus riche, hors-ligne, ou intégrée aux habitudes quotidiennes de vos utilisateurs — une application mobile prend le relais. Nous développons des applications Android sur mesure, de la première maquette jusqu'à la publication, avec des itérations basées sur les retours réels de vos premiers utilisateurs.",
    items: ['Application métier', 'Logiciel de gestion sur mesure', 'Application vitrine', 'Maintenance & mises à jour'],
  },
  {
    slug: 'design',
    icon: Palette,
    title: 'Design & identité',
    teaser: 'Une image visuelle qui inspire confiance.',
    desc: 'Une identité cohérente, du logo aux publications.',
    longDesc:
      "Avant même de lire ce que vous proposez, vos clients voient votre image. Un logo mal pensé, des couleurs qui ne collent pas, des publications improvisées — tout ça coûte de la crédibilité. Nous construisons une identité visuelle cohérente : logo, palette, typographie, et déclinaisons prêtes à l'emploi pour vos réseaux sociaux et supports imprimés.",
    items: ['Logo & charte graphique', 'Affiches et supports pour réseaux sociaux', 'Maquettes UI/UX', 'CV professionnel'],
  },
  {
    slug: 'marketing-digital',
    icon: Megaphone,
    title: 'Marketing digital',
    teaser: 'Être visible là où sont vos clients.',
    desc: 'Du contenu qui parle à votre audience et qui convertit.',
    longDesc:
      "Avoir un site ou une page ne suffit pas si personne ne la voit. Nous nous occupons de votre présence sur les réseaux sociaux — contenu, régularité, ton — et de campagnes publicitaires ciblées pour toucher les bonnes personnes, au bon moment, avec un budget maîtrisé.",
    items: ['Stratégie de présence en ligne', 'Création de contenu', 'Campagnes publicitaires ciblées'],
  },
  {
    slug: 'automatisation-ia',
    icon: Bot,
    title: 'Automatisation & IA',
    teaser: 'Moins de tâches répétitives, plus de temps utile.',
    desc: 'Des outils qui travaillent pendant que vous vous occupez du reste.',
    longDesc:
      "Répondre aux mêmes questions sur WhatsApp, trier des commandes à la main, ressaisir les mêmes informations — ce sont des heures perdues chaque semaine. Nous intégrons des outils d'automatisation et d'intelligence artificielle adaptés à votre activité pour reprendre ce temps-là.",
    items: ['Chatbots WhatsApp / Messenger', 'Assistante IA de vente pour boutique en ligne', 'Automatisation de tâches', "Intégration d'outils IA"],
  },
  {
    slug: 'cybersecurite',
    icon: ShieldCheck,
    title: 'Cybersécurité',
    teaser: 'Protéger vos données et vos comptes.',
    desc: 'Un diagnostic clair, des correctifs, et les bons réflexes ensuite.',
    longDesc:
      "Un compte piraté, un site compromis, des données perdues — les conséquences vont souvent au-delà du problème technique. Nous réalisons un audit de votre présence numérique, corrigeons les failles trouvées, et vous transmettons les bons réflexes pour la suite : mots de passe, accès partagés, sauvegardes.",
    items: ['Audit de sécurité et tests d\'intrusion web', 'Sécurisation des comptes, des sites et des API', 'Protection des serveurs (pare-feu, SSL) et des données', 'Sensibilisation & bonnes pratiques'],
  },
  {
    slug: 'e-commerce',
    icon: ShoppingCart,
    title: 'E-commerce & paiement Mobile Money',
    teaser: 'Vendre en ligne, simplement, avec les moyens de paiement locaux.',
    desc: 'Boutique, commandes, paiement et livraison, de bout en bout.',
    longDesc:
      "Vendre en ligne au Burkina Faso, c'est d'abord permettre à vos clients de commander facilement et de payer avec ce qu'ils utilisent : Orange Money, Moov Money, Wave. Nous mettons en place votre boutique en ligne, la prise de commande (y compris par WhatsApp), la gestion des produits et le suivi des commandes, avec une interface pensée pour le téléphone.",
    items: ['Boutique en ligne clé en main', 'Paiement Mobile Money (Orange Money, Moov Money, Wave)', 'Commandes par WhatsApp', 'Gestion des produits, des stocks et des commandes', 'Vente en ligne et en boutique physique'],
  },
  {
    slug: 'community-management',
    icon: Share2,
    title: 'Community management',
    teaser: 'Des réseaux sociaux animés, sans que vous y passiez vos journées.',
    desc: 'Contenus réguliers, messages traités, publicité maîtrisée.',
    longDesc:
      "Une page qui ne bouge pas fait fuir les clients. Nous créons et animons vos pages (Facebook, Instagram, LinkedIn), produisons les contenus (images, vidéos, articles, newsletter), répondons aux messages et commentaires, et pouvons lancer une publicité sponsorisée pour toucher plus de monde.",
    items: ['Création et animation de vos pages', 'Création de contenus : images, vidéos, articles, newsletter', 'Gestion des messages et des commentaires', 'Publicité sponsorisée'],
  },
  {
    slug: 'digitalisation',
    icon: Workflow,
    title: "Digitalisation d'entreprise",
    teaser: 'Passer du papier et du cahier à des outils numériques.',
    desc: 'Des outils de gestion adaptés à votre métier.',
    longDesc:
      "Beaucoup d'entreprises gèrent encore leurs commandes, leur stock et leur caisse sur papier ou par messages éparpillés. Nous digitalisons votre activité avec des outils adaptés à votre métier : restaurant, boutique, élevage, auto-école ou autre. Vous gagnez du temps, vous réduisez les erreurs et vous voyez enfin vos chiffres.",
    items: ['Logiciel de gestion sur mesure (caisse, stock, commandes)', 'Menu digital et commande en ligne pour restaurants', 'Facturation et reçus numériques', 'Tableaux de bord et statistiques', 'Gestion du personnel et des rôles'],
  },
  {
    slug: 'suivi-entreprise',
    icon: TrendingUp,
    title: "Suivi d'entreprise",
    teaser: 'Garder le contrôle sur votre activité, mois après mois.',
    desc: 'Des chiffres clairs et un accompagnement dans la durée.',
    longDesc:
      "Lancer un outil ne suffit pas : il faut suivre ce qu'il produit. Nous vous aidons à suivre votre activité avec des tableaux de bord clairs (ventes, stocks, entrées et sorties d'argent), à garder vos outils à jour et à ajuster ce qui doit l'être au fil du temps.",
    items: ['Tableaux de bord de ventes, de stock et de trésorerie', 'Suivi de la visibilité en ligne', 'Maintenance et mises à jour de vos outils', 'Accompagnement régulier'],
  },
  {
    slug: 'conseil',
    icon: Lightbulb,
    title: 'Conseil & bonnes pratiques',
    teaser: 'Les bons choix dès le départ, pour éviter les erreurs coûteuses.',
    desc: 'Un avis clair avant de dépenser votre budget.',
    longDesc:
      "Quel outil choisir, quel nom de domaine, quel hébergeur, comment protéger ses comptes, par quoi commencer avec un petit budget ? Nous vous donnons un avis clair et honnête, adapté à votre situation, pour que votre présence numérique soit solide dès le départ.",
    items: ['Conseil en stratégie digitale', "Choix des outils, du nom de domaine et de l'hébergement", 'Bonnes pratiques de sécurité', 'Audit de votre présence en ligne'],
  },
  {
    slug: 'formation',
    icon: GraduationCap,
    title: 'Formation',
    teaser: 'Apprendre à utiliser le numérique pour votre activité.',
    desc: 'Des formations pratiques, pensées pour le contexte local.',
    longDesc:
      "Nous partageons ce que nous faisons au quotidien : formations pratiques sur la vente en ligne et les paiements numériques, et sensibilisation aux bonnes pratiques de sécurité. Les formations proposées sont annoncées dans nos publications.",
    items: ['Formation e-commerce (vente sur Alibaba.com)', 'Création et utilisation de cartes virtuelles', 'Sensibilisation à la cybersécurité'],
  },
]

const ORDER = ['sites-web', 'applications-mobiles', 'e-commerce', 'design', 'marketing-digital', 'community-management', 'automatisation-ia', 'cybersecurite', 'digitalisation', 'suivi-entreprise', 'conseil', 'formation']
export const SERVICES: Service[] = ORDER.map((slug) => ALL.find((x) => x.slug === slug)!)
