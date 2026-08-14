import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Code2, Database, Palette, Bot, Terminal, ShieldCheck, Lock, Cpu, Globe } from 'lucide-react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

const LEVEL_PCT: Record<string, number> = { Expert: 95, Avancé: 85, Confirmé: 70, Intermédiaire: 55 }
const LEVEL_COLOR: Record<string, string> = { Expert: '#3B82F6', Avancé: '#3B82F6', Confirmé: '#3B82F6', Intermédiaire: '#3B82F6' }

function SkillBar({ lvl }: { lvl: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const pct = LEVEL_PCT[lvl] ?? 65
  const color = LEVEL_COLOR[lvl] ?? '#3B82F6'

  return (
    <div ref={ref} className="h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/5">
      <div
        className="h-full rounded-full transition-all duration-[1200ms] ease-out shadow-[0_0_12px_rgba(59, 130, 246,0.5)]"
        style={{ width: inView ? `${pct}%` : '0%', background: color }}
      />
    </div>
  )
}

export default function Skills() {
  const { lang, t } = useLanguage()
  const [activeTab, setActiveTab] = useState('langs')
  const [search, setSearch] = useState('')

  const CATEGORIES = [
    {
      id: 'langs',
      label: t('Languages & Core Logic', 'Languages & Core Logic'),
      icon: Terminal,
      skills: [
        { n: 'TypeScript & JavaScript (ES6+)', lvl: 'Expert', d: t('Typage strict, architecture modulaire, async, React & Node.js.', 'Strict typing, modular architecture, async, React & Node.js.') },
        { n: 'Python', lvl: 'Avancé', d: t('Scripts d\'automatisation, FastAPI, web scraping, scripts IA et analyse.', 'Automation scripts, FastAPI, web scraping, AI scripts & analysis.') },
        { n: 'C / C++', lvl: 'Confirmé', d: t('Algorithmique bas niveau, gestion mémoire, optimisation de performance.', 'Low-level algorithms, memory management, performance optimization.') },
        { n: 'PHP (Modern)', lvl: 'Confirmé', d: t('Développement web, intégration d\'APIs, scripts serveur legacy & modernes.', 'Web development, API integration, legacy & modern server scripts.') },
        { n: 'Go (Golang)', lvl: 'Confirmé', d: t('Services concurrents, micro-outilsCLI ultra rapides, serveurs HTTP.', 'Concurrent services, fast CLI micro-tools, HTTP servers.') },
        { n: 'Bash / Shell Scripting', lvl: 'Avancé', d: t('Automatisation Linux, scripts d\'administration, CI/CD, cron jobs.', 'Linux automation, admin scripts, CI/CD, cron jobs.') },
        { n: 'SQL & NoSQL', lvl: 'Expert', d: t('PostgreSQL, Supabase, MySQL, MongoDB, requêtes optimisées, RLS.', 'PostgreSQL, Supabase, MySQL, MongoDB, optimized queries, RLS.') },
      ],
    },
    {
      id: 'cyber',
      label: t('Cyber-Sécurité & Protection', 'Cybersecurity & Auditing'),
      icon: ShieldCheck,
      skills: [
        { n: 'Audit & PenTesting Web', lvl: 'Avancé', d: t('Détection de vulnérabilités OWASP Top 10, injections SQL, XSS, CSRF.', 'OWASP Top 10 vulnerability assessment, SQLi, XSS, CSRF checks.') },
        { n: 'Sécurisation APIs & Tokens', lvl: 'Expert', d: t('Authentification JWT, OAuth2, Rate Limiting, CORS, hachage bcrypt/Argon2.', 'JWT auth, OAuth2, Rate Limiting, CORS, bcrypt/Argon2 hashing.') },
        { n: 'Hardening & Sécurité Serveur', lvl: 'Avancé', d: t('Configuration UFW/Firewall, SSL/TLS, Cloudflare WAF, gestion des secrets.', 'UFW/Firewall setup, SSL/TLS, Cloudflare WAF, secret management.') },
        { n: 'Chiffrement & Données Sensibles', lvl: 'Avancé', d: t('Protections des paiements Mobile Money, webhooks signés cryptographiquement.', 'Mobile Money payment protection, cryptographically signed webhooks.') },
      ],
    },
    {
      id: 'frontend',
      label: t('Frontend & Création UI', 'Frontend & UI Creation'),
      icon: Code2,
      skills: [
        { n: 'React 18 & Vite', lvl: 'Expert', d: t('Hooks sur mesure, state global, performance SPA, lazy loading.', 'Custom hooks, global state, SPA performance, lazy loading.') },
        { n: 'Tailwind CSS & Motion', lvl: 'Expert', d: t('Design systems réactifs, Framer Motion, micro-interactions modernes.', 'Responsive design systems, Framer Motion, modern micro-interactions.') },
        { n: 'Cloudflare Pages & Vercel', lvl: 'Expert', d: t('Déploiement Edge, gestion DNS, Workers, architectures CDN.', 'Edge deployments, DNS management, Workers, CDN architectures.') },
        { n: 'E-Commerce Custom UI', lvl: 'Expert', d: t('Boutiques sur-mesure, paniers dynamiques, checkout Mobile Money.', 'Tailored stores, dynamic carts, Mobile Money checkout.') },
      ],
    },
    {
      id: 'backend',
      label: t('Backend & Cloud Africa', 'Backend & Africa Cloud'),
      icon: Database,
      skills: [
        { n: 'Node.js & Express', lvl: 'Expert', d: t('APIs RESTful, middlewares, auth JWT, proxy de sécurité.', 'RESTful APIs, middlewares, JWT auth, security proxies.') },
        { n: 'Supabase & PostgreSQL', lvl: 'Expert', d: t('RLS policies, Realtime DB, Storage, Edge Functions.', 'RLS policies, Realtime DB, Storage, Edge Functions.') },
        { n: 'Passerelles Mobile Money', lvl: 'Expert', d: t('Intégration CinetPay, Orange Money, Moov Money, webhooks sécurisés.', 'CinetPay, Orange Money, Moov Money integration, secured webhooks.') },
        { n: 'Firebase & NoSQL', lvl: 'Avancé', d: t('Firestore rules, Cloud Functions, Auth, Hosting.', 'Firestore rules, Cloud Functions, Auth, Hosting.') },
      ],
    },
    {
      id: 'auto',
      label: t('IA, Automation & Digital', 'AI, Automation & Digital'),
      icon: Bot,
      skills: [
        { n: 'Chatbots WhatsApp Business API', lvl: 'Expert', d: t('Assistants virtuels H24, qualification de leads, relances automatiques.', '24/7 virtual assistants, lead qualification, automated follow-ups.') },
        { n: 'Gemini AI SDK Integration', lvl: 'Avancé', d: t('Traitement du langage, génération automatique de contenus, workflows IA.', 'NLP, automated content generation, AI workflows.') },
        { n: 'Création & Branding Digital', lvl: 'Avancé', d: t('Conception de supports visuels, identités de marque, présentations impactantes.', 'Visual assets design, brand identities, high-impact decks.') },
      ],
    },
  ]

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0]
  const isSearching = search.trim().length > 0

  const displayedSkills = isSearching
    ? CATEGORIES.flatMap((c) =>
        c.skills.map((s) => ({ ...s, catLabel: c.label }))
      ).filter(
        (s) =>
          s.n.toLowerCase().includes(search.toLowerCase()) ||
          s.d.toLowerCase().includes(search.toLowerCase()) ||
          s.lvl.toLowerCase().includes(search.toLowerCase())
      )
    : currentCategory.skills

  return (
    <section id="skills" className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-[#080b12]">
      {/* Fond sombre uni avec lueur douce */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e16] via-[#080b12]/90 to-[#0a0e16] pointer-events-none" />

      <div className="relative z-10 px-6 max-w-[1320px] mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-2">
                <span className="w-8 h-px bg-clay" /> {t('Arsenal Global & Polyvalent', 'Global & Polyvalent Arsenal')}
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white">
                {t('Compétences & Maîtrise Multi-Secteurs', 'Skills & Multi-Domain Mastery')}<span className="text-[#3B82F6]">.</span>
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('Rechercher une technologie...', 'Search a technology...')}
                className="w-full bg-surface/80 border border-white/15 rounded-full pl-11 pr-8 py-3 text-xs sm:text-sm text-white placeholder-white/40 outline-none focus:border-[#3B82F6] transition-all backdrop-blur-md"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Auto-Scrolling Continuous Tech Ticker */}
        <div className="relative overflow-hidden mb-10 py-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {[...CATEGORIES.flatMap(c => c.skills), ...CATEGORIES.flatMap(c => c.skills)].map((s, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/80 border border-white/10 mx-2 shrink-0 text-xs font-mono"
              >
                <span className="w-2 h-2 rounded-full" style={{ background: LEVEL_COLOR[s.lvl] || '#3B82F6' }} />
                <span className="text-white font-bold">{s.n}</span>
                <span className="text-[10px] text-white/50">({s.lvl})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs (Horizontal Scrollable on Mobile) */}
        {!isSearching && (
          <div className="flex items-center overflow-x-auto scrollbar-none gap-2 pb-3 mb-8 sm:flex-wrap -mx-2 px-2">
            {CATEGORIES.map((c) => {
              const Icon = c.icon
              const isActive = activeTab === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    playClickSound()
                    setActiveTab(c.id)
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-mono font-bold shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#3B82F6] text-black shadow-[0_10px_25px_rgba(59, 130, 246,0.4)] scale-105'
                      : 'bg-surface/60 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-md'
                  }`}
                >
                  <Icon size={15} />
                  <span>{c.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Skills Cards Grid - 2 Columns on Mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (isSearching ? search : '') + lang}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6"
          >
            {displayedSkills.map((s) => (
              <div
                key={s.n}
                className="group relative bg-surface/60 border border-white/10 hover:border-[#3B82F6]/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl flex flex-col justify-between shadow-xl"
              >
                <div>
                  {'catLabel' in s && (
                    <span className="text-[9px] sm:text-[10px] font-mono text-clay uppercase tracking-widest mb-1.5 block truncate">
                      {(s as any).catLabel}
                    </span>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-display text-sm sm:text-lg text-white group-hover:text-[#3B82F6] transition-colors leading-tight">
                      {s.n}
                    </h3>
                    <span
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto shrink-0"
                      style={{
                        backgroundColor: `${LEVEL_COLOR[s.lvl]}20`,
                        color: LEVEL_COLOR[s.lvl],
                        border: `1px solid ${LEVEL_COLOR[s.lvl]}40`,
                      }}
                    >
                      {s.lvl}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-white/70 leading-snug sm:leading-relaxed mb-4 font-sans line-clamp-3">
                    {s.d}
                  </p>
                </div>

                <SkillBar lvl={s.lvl} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayedSkills.length === 0 && (
          <div className="text-center py-16 text-muted text-sm font-mono border border-dashed border-white/10 rounded-3xl">
            {t(`Aucune technologie ne correspond à "${search}".`, `No technology found for "${search}".`)}
          </div>
        )}
      </div>
    </section>
  )
}
