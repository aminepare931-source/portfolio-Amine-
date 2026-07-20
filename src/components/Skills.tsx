import { useState } from 'react'
import Reveal from './Reveal'

const CATEGORIES = [
  {
    id: 'dev', label: 'Développement Web', ic: '💻',
    skills: [
      { n: 'HTML / CSS', lvl: 'Expert', d: 'Flexbox, Grid, animations, responsive, accessibilité.' },
      { n: 'JavaScript', lvl: 'Avancé', d: 'Vanilla ES6+, Fetch, DOM API, Canvas.' },
      { n: 'Supabase', lvl: 'Confirmé', d: 'PostgreSQL, RLS, Realtime, Storage, Auth.' },
      { n: 'Déploiement', lvl: 'Expert', d: 'Cloudflare Pages, Netlify, Vercel, DNS.' },
      { n: 'E-Commerce', lvl: 'Expert', d: 'Boutiques custom, admin panels, WhatsApp.' },
      { n: 'Paiements Africains', lvl: 'Confirmé', d: 'CinetPay, Orange Money, MTN MoMo, Moov.' },
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
    id: 'formation', label: 'Formation & Cours en ligne', ic: '🎓',
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
    <section id="skills" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Tech Stack & Compétences
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-4">Six domaines complets.</h2>
        <p className="text-sm text-muted max-w-lg mb-12">
          36 compétences réparties sur tout le spectre du digital — pas seulement le code.
        </p>
      </Reveal>

      {/* Category tabs */}
      <Reveal delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`text-xs md:text-sm rounded-full px-4 py-2.5 border transition-colors flex items-center gap-2 ${
                active === c.id ? 'bg-clay text-black border-clay font-medium' : 'border-stroke text-muted hover:text-text hover:border-text/30'
              }`}
            >
              <span>{c.ic}</span> {c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4">
        {cat.skills.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <div className="group h-full bg-surface border border-stroke rounded-2xl p-6 hover:border-clay/40 transition-colors relative overflow-hidden">
              <div className="font-medium text-text mb-1">{s.n}</div>
              <div className="text-[10px] font-mono text-clay uppercase tracking-wider mb-3">{s.lvl}</div>
              <p className="text-xs text-muted leading-relaxed">{s.d}</p>
              <div className="absolute top-0 left-0 right-0 h-[2px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
