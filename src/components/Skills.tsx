import { useState } from 'react'
import Reveal from './Reveal'

const CATEGORIES = [
  {
    id: 'frontend', label: 'Frontend', ic: '🖥️',
    skills: [
      { n: 'HTML / CSS', lvl: 'Expert', d: 'Flexbox, Grid, animations, responsive, accessibilité.' },
      { n: 'JavaScript ES6+', lvl: 'Avancé', d: 'DOM API, Fetch, async/await, modules.' },
      { n: 'UI/UX Interactions', lvl: 'Avancé', d: 'Micro-animations, transitions, expérience fluide.' },
      { n: 'Responsive & Performance', lvl: 'Expert', d: 'Mobile-first, optimisation, temps de chargement.' },
      { n: 'Déploiement', lvl: 'Expert', d: 'Cloudflare Pages, Netlify, Vercel, DNS.' },
      { n: 'E-Commerce', lvl: 'Expert', d: 'Boutiques custom, panier, admin panels.' },
    ],
  },
  {
    id: 'backend', label: 'Backend & Bases de données', ic: '⚙️',
    skills: [
      { n: 'Node.js / Express', lvl: 'Avancé', d: 'APIs REST, middleware, architecture serveur.' },
      { n: 'Python (Django / Flask)', lvl: 'Confirmé', d: 'Applications web, APIs, scripts d\'automatisation.' },
      { n: 'Supabase / PostgreSQL', lvl: 'Avancé', d: 'RLS, Realtime, Storage, Auth, Edge Functions.' },
      { n: 'MySQL / MariaDB', lvl: 'Confirmé', d: 'Modélisation relationnelle, requêtes complexes.' },
      { n: 'MongoDB', lvl: 'Confirmé', d: 'Bases NoSQL, schémas flexibles, agrégations.' },
      { n: 'Firebase', lvl: 'Confirmé', d: 'Auth, Firestore, hosting et fonctions rapides.' },
    ],
  },
  {
    id: 'design', label: 'Design Graphique', ic: '🎨',
    skills: [
      { n: 'Figma', lvl: 'Avancé', d: 'Maquettes UI/UX, prototypage, design systems.' },
      { n: 'Identité visuelle', lvl: 'Confirmé', d: 'Logos, palettes, chartes graphiques.' },
      { n: 'Typographie', lvl: 'Confirmé', d: 'Association de polices, hiérarchie visuelle.' },
      { n: 'Visuels réseaux sociaux', lvl: 'Avancé', d: 'Posts, stories, bannières, formats variés.' },
      { n: 'Présentations', lvl: 'Confirmé', d: 'Pitchs, decks clients, supports commerciaux.' },
      { n: 'Retouche photo', lvl: 'Intermédiaire', d: 'Détourage, corrections, montages simples.' },
    ],
  },
  {
    id: 'marketing', label: 'Marketing Digital', ic: '📈',
    skills: [
      { n: 'Stratégie réseaux', lvl: 'Confirmé', d: 'Calendrier éditorial, ligne éditoriale.' },
      { n: 'Community management', lvl: 'Avancé', d: 'Animation de communauté, engagement.' },
      { n: 'Publicités Meta/Google', lvl: 'Intermédiaire', d: 'Campagnes basiques, ciblage, budget.' },
      { n: 'SEO on-page', lvl: 'Confirmé', d: 'Balises, structure, performance de contenu.' },
      { n: 'Analyse & KPIs', lvl: 'Intermédiaire', d: 'Suivi des résultats, ajustement de stratégie.' },
      { n: 'Growth petites structures', lvl: 'Confirmé', d: 'Acquisition à budget limité, bouche-à-oreille digital.' },
    ],
  },
  {
    id: 'copy', label: 'Rédaction & Copywriting', ic: '✍️',
    skills: [
      { n: 'Textes de vente', lvl: 'Avancé', d: 'Pages produit, landing pages qui convertissent.' },
      { n: 'Contenu blog / SEO', lvl: 'Confirmé', d: 'Articles optimisés, structure lisible.' },
      { n: 'Scripts vidéo', lvl: 'Confirmé', d: 'Voix off, storytelling pour formats courts.' },
      { n: 'Descriptions produits', lvl: 'Expert', d: 'Fiches e-commerce qui donnent envie d\'acheter.' },
      { n: 'Newsletters', lvl: 'Intermédiaire', d: 'Emails clients, séquences simples.' },
      { n: 'Bios & pitchs', lvl: 'Avancé', d: 'Présentations courtes et percutantes.' },
    ],
  },
  {
    id: 'formation', label: 'Formation & Cours', ic: '🎓',
    skills: [
      { n: 'Conception de programmes', lvl: 'Confirmé', d: 'Structurer un parcours d\'apprentissage complet.' },
      { n: 'Supports pédagogiques', lvl: 'Avancé', d: 'Slides, fiches, exercices pratiques.' },
      { n: 'Tutoriels vidéo', lvl: 'Confirmé', d: 'Explications pas-à-pas, capture d\'écran.' },
      { n: 'Mentorat', lvl: 'Confirmé', d: 'Accompagnement de développeurs débutants.' },
      { n: 'Documentation technique', lvl: 'Expert', d: 'Guides clairs pour utilisateurs et clients.' },
      { n: 'Templates Notion', lvl: 'Avancé', d: 'Outils prêts à l\'emploi pour organiser un projet.' },
    ],
  },
  {
    id: 'auto', label: 'Automatisation & IA', ic: '🤖',
    skills: [
      { n: 'Chatbots WhatsApp/Web', lvl: 'Confirmé', d: 'Réponses automatiques, assistance client.' },
      { n: 'Intégrations API', lvl: 'Avancé', d: 'Connexion d\'outils, webhooks, synchronisation.' },
      { n: 'Scripts d\'automatisation', lvl: 'Confirmé', d: 'Tâches répétitives simplifiées.' },
      { n: 'Prompt engineering', lvl: 'Avancé', d: 'Exploitation efficace des outils IA génératifs.' },
      { n: 'Outils no-code', lvl: 'Intermédiaire', d: 'Zapier, Make et équivalents pour aller vite.' },
      { n: 'Veille IA', lvl: 'Confirmé', d: 'Suivi des nouveaux outils et bonnes pratiques.' },
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState(CATEGORIES[0].id)
  const cat = CATEGORIES.find((c) => c.id === active)!

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/assets/bg.mp4"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 px-6 max-w-[1200px] mx-auto">
        <Reveal>
          <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 mb-10">
            <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-clay" /> Tech Stack & Compétences
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-4 text-white">Développeur fullstack.</h2>
            <p className="text-sm text-white/70 max-w-lg">
              Frontend, backend, bases de données — et bien au-delà. 42 compétences sur tout le spectre du digital.
            </p>
          </div>
        </Reveal>

        {/* Category tabs — glass pills */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`liquid-glass rounded-full px-4 py-2.5 text-xs md:text-sm transition-transform hover:scale-105 flex items-center gap-2 ${
                  active === c.id ? 'text-white font-medium' : 'text-white/60'
                }`}
                style={active === c.id ? { background: 'rgba(255,90,31,0.18)' } : {}}
              >
                <span>{c.ic}</span> {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {cat.skills.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="liquid-glass rounded-2xl p-6 h-full hover:scale-[1.02] transition-transform">
                <div className="font-medium text-white mb-1">{s.n}</div>
                <div className="text-[10px] font-mono text-clay uppercase tracking-wider mb-3">{s.lvl}</div>
                <p className="text-xs text-white/60 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
