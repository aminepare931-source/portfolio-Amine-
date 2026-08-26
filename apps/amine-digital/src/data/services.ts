import { Code2, Smartphone, Palette, Megaphone, Bot, ShieldCheck } from 'lucide-react'

export interface Service {
  slug: string
  icon: typeof Code2
  title: string
  teaser: string
  desc: string
  longDesc: string
  items: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'sites-web',
    icon: Code2,
    title: 'Sites web',
    teaser: 'Vitrine, boutique en ligne, plateforme sur mesure.',
    desc: 'Rapide, responsive, facile à gérer soi-même une fois livré.',
    longDesc:
      "Un site web, c'est souvent le premier contact entre votre entreprise et un client potentiel. Je conçois des sites rapides, clairs, et pensés d'abord pour le mobile — parce que c'est là que la majorité de vos visiteurs vous trouveront. Que ce soit une vitrine simple pour présenter votre activité ou une boutique complète avec paiement Mobile Money, l'objectif reste le même : convertir un visiteur en client.",
    items: ['Site vitrine professionnel', 'Boutique en ligne (paiement Mobile Money)', 'Refonte de site existant', 'Hébergement & nom de domaine'],
  },
  {
    slug: 'applications-mobiles',
    icon: Smartphone,
    title: 'Applications mobiles',
    teaser: 'Une app Android pensée pour votre activité.',
    desc: "De l'idée au store, en passant par les retours de vos premiers utilisateurs.",
    longDesc:
      "Quand un site ne suffit plus — parce que vous avez besoin d'une expérience plus riche, hors-ligne, ou intégrée aux habitudes quotidiennes de vos utilisateurs — une application mobile prend le relais. Je développe des applications Android sur mesure, de la première maquette jusqu'à la publication, avec des itérations basées sur les retours réels de vos premiers utilisateurs.",
    items: ['Application métier', 'Application vitrine', 'Maintenance & mises à jour'],
  },
  {
    slug: 'design',
    icon: Palette,
    title: 'Design & identité',
    teaser: 'Une image visuelle qui inspire confiance.',
    desc: 'Une identité cohérente, du logo aux publications.',
    longDesc:
      "Avant même de lire ce que vous proposez, vos clients voient votre image. Un logo mal pensé, des couleurs qui ne collent pas, des publications improvisées — tout ça coûte de la crédibilité. Je construis une identité visuelle cohérente : logo, palette, typographie, et déclinaisons prêtes à l'emploi pour vos réseaux sociaux et supports imprimés.",
    items: ['Logo & charte graphique', 'Supports pour réseaux sociaux', 'Maquettes UI/UX'],
  },
  {
    slug: 'marketing-digital',
    icon: Megaphone,
    title: 'Marketing digital',
    teaser: 'Être visible là où sont vos clients.',
    desc: 'Du contenu qui parle à votre audience et qui convertit.',
    longDesc:
      "Avoir un site ou une page ne suffit pas si personne ne la voit. Je m'occupe de votre présence sur les réseaux sociaux — contenu, régularité, ton — et de campagnes publicitaires ciblées pour toucher les bonnes personnes, au bon moment, avec un budget maîtrisé.",
    items: ['Gestion de réseaux sociaux', 'Création de contenu', 'Campagnes publicitaires ciblées'],
  },
  {
    slug: 'automatisation-ia',
    icon: Bot,
    title: 'Automatisation & IA',
    teaser: 'Moins de tâches répétitives, plus de temps utile.',
    desc: 'Des outils qui travaillent pendant que vous vous occupez du reste.',
    longDesc:
      "Répondre aux mêmes questions sur WhatsApp, trier des commandes à la main, ressaisir les mêmes informations — ce sont des heures perdues chaque semaine. J'intègre des outils d'automatisation et d'intelligence artificielle adaptés à votre activité pour reprendre ce temps-là.",
    items: ['Chatbots WhatsApp / Messenger', 'Automatisation de tâches', "Intégration d'outils IA"],
  },
  {
    slug: 'cybersecurite',
    icon: ShieldCheck,
    title: 'Cybersécurité',
    teaser: 'Protéger vos données et vos comptes.',
    desc: 'Un diagnostic clair, des correctifs, et les bons réflexes ensuite.',
    longDesc:
      "Un compte piraté, un site compromis, des données perdues — les conséquences vont souvent au-delà du problème technique. Je réalise un audit de votre présence numérique, corrige les failles trouvées, et vous transmets les bons réflexes pour la suite : mots de passe, accès partagés, sauvegardes.",
    items: ['Audit de sécurité', 'Sécurisation de comptes & sites', 'Sensibilisation & bonnes pratiques'],
  },
]
