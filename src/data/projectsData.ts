export interface ProjectCaseStudy {
  id: string
  name: string
  tagline: string
  description: string
  fullDescription: string
  tags: string[]
  category: 'E-Commerce' | 'Fullstack' | 'Automation' | 'Media'
  url: string | null
  githubUrl?: string | null
  size: string
  emoji: string | null
  color: string
  img: string | null
  featured: boolean
  position: number
  metrics: { label: string; value: string }[]
  keyFeatures: string[]
  architecture: string[]
}

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'embf-boutique',
    name: 'EMBF Boutique',
    tagline: 'Plateforme E-Commerce Tech Premium avec paiement Mobile Money',
    description: 'Boutique tech complète construite de zéro : backend Supabase, API CinetPay, notifications WhatsApp automatisées.',
    fullDescription: 'EMBF Boutique est une plateforme e-commerce moderne conçue pour répondre aux réalités du marché burkinabè et ouest-africain. Elle intègre un panier dynamique, la gestion des stocks en temps réel, un paiement fluide via Mobile Money (Orange Money, Moov Money) et un système de commande directe via WhatsApp.',
    tags: ['Supabase', 'React', 'CinetPay', 'Mobile Money', 'WhatsApp API', 'Tailwind CSS'],
    category: 'E-Commerce',
    url: 'https://embf-boutique.com',
    size: 'Large',
    emoji: '🛒',
    color: '#FF5A1F',
    img: '/assets/about1.jpg',
    featured: true,
    position: 1,
    metrics: [
      { label: 'Taux de conversion', value: '+35%' },
      { label: 'Paiements automatisés', value: '100% Mobile Money' },
      { label: 'Temps de chargement', value: '< 1.2s' },
    ],
    keyFeatures: [
      'Paiement Mobile Money sécurisé via CinetPay API',
      'Flux de commande instantané synchronisé avec WhatsApp',
      'Tableau de bord administrateur pour la gestion des produits et commandes',
      'Authentification et stockage média gérés par Supabase',
      'Design responsive optimisé pour smartphones à connexion modérée',
    ],
    architecture: ['React 18 / Vite', 'Supabase PostgreSQL & RLS', 'Edge Functions', 'CinetPay Webhook Gateway'],
  },
  {
    id: 'techbf-marketplace',
    name: 'TechBF',
    tagline: 'Marketplace de services et de mise en relation au Burkina Faso',
    description: 'Plateforme connectant artisans, freelances et clients locaux avec messagerie temps réel et système de recommandation.',
    fullDescription: 'TechBF numérise le secteur des services au Burkina Faso en offrant un espace de confiance où les clients trouvent des prestataires qualifiés (développeurs, designers, techniciens) tout en garantissant des transactions claires.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Tailwind', 'Realtime'],
    category: 'Fullstack',
    url: null,
    size: 'Large',
    emoji: '🏗️',
    color: '#E8C97A',
    img: '/assets/hero.jpg',
    featured: true,
    position: 2,
    metrics: [
      { label: 'Temps de réponse chat', value: 'Temps réel' },
      { label: 'Score satisfaction', value: '4.9/5' },
      { label: 'Réseau prestataires', value: 'Bobo & Ouaga' },
    ],
    keyFeatures: [
      'Messagerie instantanée en temps réel entre clients et prestataires',
      'Système de notation et d\'avis vérifiés',
      'Recherche avancée par localisation et domaine de compétence',
      'Système de parrainage et de badges de vérification',
    ],
    architecture: ['React Frontend', 'Express REST & WebSocket Engine', 'PostgreSQL DB', 'Cloudflare CDN'],
  },
  {
    id: 'fasoko-news',
    name: 'FASOKO',
    tagline: 'Portail d\'actualités et agrégateur média sahélo-burkinabè',
    description: 'Agrégateur d\'actualités en temps réel avec architecture serverless sur Cloudflare, haute performance et design sahélien.',
    fullDescription: 'FASOKO rassemble les flux d\'information essentiels du Burkina Faso et de la sous-région dans une interface épurée, ultra-rapide et économe en données cellulaires.',
    tags: ['Cloudflare Pages', 'Workers', 'RSS Parser', 'SEO', 'PWA'],
    category: 'Media',
    url: null,
    size: 'Medium',
    emoji: '📰',
    color: '#C9A24B',
    img: '/assets/about2.jpg',
    featured: true,
    position: 3,
    metrics: [
      { label: 'Vitesse de chargement', value: '0.4s' },
      { label: 'Consommation data', value: '-60%' },
      { label: 'Score SEO Google', value: '98/100' },
    ],
    keyFeatures: [
      'Agrégation automatique multicanal (RSS, APIs)',
      'Mise en cache edge mondiale sur réseau Cloudflare Workers',
      'Lecture hors-ligne optimisée (PWA ready)',
      'Design épuré adapté aux faibles bandes passantes',
    ],
    architecture: ['Cloudflare Workers API', 'HTML5 / CSS Custom', 'Workers KV Storage'],
  },
  {
    id: 'auto-bot-suite',
    name: 'Amine AutoBot & AI Suite',
    tagline: 'Assistant WhatsApp & Chatbot d\'automatisation client',
    description: 'Système d\'automatisation de service client connecté à OpenAI/Gemini et WhatsApp Webhook.',
    fullDescription: 'Une suite de scripts et d\'agents automatisés permettant aux PME locales de répondre H24 aux questions fréquentes des clients sur WhatsApp, de qualifier des prospects et de planifier des rendez-vous.',
    tags: ['Python', 'Gemini API', 'WhatsApp Webhook', 'Node.js', 'Automation'],
    category: 'Automation',
    url: null,
    size: 'Medium',
    emoji: '🤖',
    color: '#FF8A52',
    img: null,
    featured: false,
    position: 4,
    metrics: [
      { label: 'Disponibilité', value: '24/7' },
      { label: 'Gain de temps client', value: '15h/semaine' },
    ],
    keyFeatures: [
      'Réponses instantanées personnalisées basées sur IA',
      'Relances automatiques de panier abandonné',
      'Exportation automatique vers Google Sheets / Supabase',
    ],
    architecture: ['Python FastAPI', 'Gemini AI SDK', 'WhatsApp Business Webhook'],
  }
]
