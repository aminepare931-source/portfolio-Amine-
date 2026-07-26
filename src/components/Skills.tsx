import { useState } from 'react'
import Reveal from './Reveal'
import { VIDEOS } from '../config/videos'
import { useInView } from '../hooks/useInView'

const LEVEL_PCT: Record<string, number> = { Expert: 95, Avancé: 80, Confirmé: 65, Intermédiaire: 45 }
const LEVEL_COLOR: Record<string, string> = { Expert: '#FF5A1F', Avancé: '#E8C97A', Confirmé: '#C9A24B', Intermédiaire: '#8a7a5a' }

function SkillBar({ lvl }: { lvl: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const pct = LEVEL_PCT[lvl] ?? 50
  const color = LEVEL_COLOR[lvl] ?? '#FF5A1F'
  return (
    <div ref={ref} className="h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-[1200ms] ease-out" style={{ width: inView ? `${pct}%` : '0%', background: color }} />
    </div>
  )
}

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
    <section id="skills" className="relative py-14 sm:py-20 md:py-32 overflow-hidden">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src={VIDEOS.skills}
      />
      <div className="absolute inset-0 bg-black/28" />

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

        {/* Badges + streak counter (style Duolingo) */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wide px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(255,90,31,0.18)', color: '#FF8A52' }}>Fullstack</span>
            <span className="text-[11px] font-bold uppercase tracking-wide px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(232,201,122,0.18)', color: '#E8C97A' }}>Autodidacte</span>
            <span className="text-[11px] font-bold uppercase tracking-wide px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(90,200,120,0.18)', color: '#6FDB9A' }}>Disponible</span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-extrabold px-3 py-1.5 rounded-full ml-1" style={{ background: 'rgba(255,90,31,0.12)', color: '#FF8A52' }}>
              🔥 3 ans de code
            </span>
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

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible">
          {cat.skills.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05} className="shrink-0 w-[72vw] xs:w-[65vw] sm:w-[280px] md:w-auto snap-start">
              <div className="liquid-glass rounded-2xl p-4 sm:p-6 h-full hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white text-sm sm:text-base">{s.n}</div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-clay">{s.lvl}</span>
                </div>
                <SkillBar lvl={s.lvl} />
                <p className="text-xs text-white/75 leading-relaxed mt-3">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex md:hidden justify-center gap-1 mt-3">
          {cat.skills.map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
        </div>
      </div>
    </section>
  )
}
