import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Sparkles, Code2, Monitor, Cloud, Bot, ShieldCheck,
  ArrowRight, ArrowUpRight, Pencil, Zap,
} from 'lucide-react'
import {
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiPhp, SiGo, SiGnubash, SiPostgresql,
  SiReact, SiTailwindcss, SiCloudflare, SiVercel, SiNodedotjs, SiSupabase,
  SiFirebase, SiWhatsapp, SiGooglegemini,
} from 'react-icons/si'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

const LEVEL_COLOR: Record<string, string> = {
  Expert: '#3B82F6',
  Avancé: '#3B82F6',
  Confirmé: '#64748B',
  Intermédiaire: '#64748B',
}

function SkillBar({ pct, color }: { pct: number; color: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)

  return (
    <div className="flex items-center gap-2.5">
      <div ref={ref} className="flex-1 h-2 rounded-full bg-slate-900/10 overflow-hidden p-0.5 border border-slate-900/5">
        <div
          className="h-full rounded-full transition-all duration-[1200ms] ease-out"
          style={{ width: inView ? `${pct}%` : '0%', background: color, boxShadow: `0 0 10px ${color}80` }}
        />
      </div>
      <span className="text-[10px] font-mono font-bold text-slate-900/50 w-8 text-right shrink-0">{pct}%</span>
    </div>
  )
}

export default function Skills() {
  const { lang, t } = useLanguage()
  const [activeTab, setActiveTab] = useState('langs')
  const [search, setSearch] = useState('')

  const TICKER_ITEMS = [
    { n: 'JavaScript', logo: SiJavascript, color: '#F7DF1E' },
    { n: 'TypeScript', logo: SiTypescript, color: '#3178C6' },
    { n: 'React', logo: SiReact, color: '#61DAFB' },
    { n: 'Node.js', logo: SiNodedotjs, color: '#5FA04E' },
    { n: 'Python', logo: SiPython, color: '#3776AB' },
    { n: 'C++', logo: SiCplusplus, color: '#00599C' },
    { n: 'PHP', logo: SiPhp, color: '#777BB4' },
    { n: 'Firebase', logo: SiFirebase, color: '#F5820D' },
    { n: 'Cloudflare', logo: SiCloudflare, color: '#F38020' },
    { n: 'Gemini', logo: SiGooglegemini, color: '#8E75FF' },
  ]

  const CATEGORIES = [
    {
      id: 'langs',
      label: t('Langages & Core Logic', 'Languages & Core Logic'),
      icon: Code2,
      skills: [
        { n: 'TypeScript', logo: SiTypescript, color: '#3178C6', lvl: t('Avancé', 'Advanced'), pct: 90, d: t('Code plus sûr et maintenable avec un typage statique puissant.', 'Safer, maintainable code with powerful static typing.'), tags: ['Type Safety', 'OOP', 'ES6+'] },
        { n: 'Python', logo: SiPython, color: '#3776AB', lvl: t('Avancé', 'Advanced'), pct: 85, d: t('Langage polyvalent pour l\'IA, la data et l\'automatisation.', 'Versatile language for AI, data and automation.'), tags: ['Data Science', 'Automation', 'AI/ML'] },
        { n: 'C / C++', logo: SiCplusplus, color: '#00599C', lvl: t('Intermédiaire', 'Intermediate'), pct: 70, d: t('Performance et contrôle pour les applications complexes.', 'Performance and control for complex applications.'), tags: ['STL', 'Algorithmie', 'Performance'] },
        { n: 'PHP', logo: SiPhp, color: '#777BB4', lvl: t('Avancé', 'Advanced'), pct: 85, d: t('Développement web robuste et flexible pour des projets scalables.', 'Robust, flexible web development for scalable projects.'), tags: ['Laravel', 'Symfony', 'API'] },
        { n: 'Go (Golang)', logo: SiGo, color: '#00ADD8', lvl: t('Intermédiaire', 'Intermediate'), pct: 65, d: t('Services concurrents, micro-outils CLI ultra rapides.', 'Concurrent services, ultra-fast CLI micro-tools.'), tags: ['Goroutines', 'CLI', 'HTTP'] },
        { n: 'Bash / Shell', logo: SiGnubash, color: '#4EAA25', lvl: t('Avancé', 'Advanced'), pct: 80, d: t('Automatisation Linux, scripts d\'administration, CI/CD.', 'Linux automation, admin scripts, CI/CD.'), tags: ['Automatisation', 'Cron', 'CI/CD'] },
        { n: 'SQL & NoSQL', logo: SiPostgresql, color: '#4169E1', lvl: t('Avancé', 'Advanced'), pct: 90, d: t('PostgreSQL, Supabase, MySQL, MongoDB, requêtes optimisées.', 'PostgreSQL, Supabase, MySQL, MongoDB, optimized queries.'), tags: ['PostgreSQL', 'RLS', 'Index'] },
      ],
    },
    {
      id: 'cyber',
      label: t('Cyber-Sécurité & Protection', 'Cybersecurity & Auditing'),
      icon: ShieldCheck,
      skills: [
        { n: 'Audit & PenTesting Web', color: '#EF4444', lvl: t('Avancé', 'Advanced'), pct: 80, d: t('Détection de vulnérabilités OWASP Top 10, injections SQL, XSS, CSRF.', 'OWASP Top 10 vulnerability assessment, SQLi, XSS, CSRF checks.'), tags: ['OWASP', 'XSS', 'SQLi'] },
        { n: 'Sécurisation APIs & Tokens', color: '#3B82F6', lvl: t('Avancé', 'Advanced'), pct: 90, d: t('Authentification JWT, OAuth2, Rate Limiting, hachage bcrypt/Argon2.', 'JWT auth, OAuth2, Rate Limiting, bcrypt/Argon2 hashing.'), tags: ['JWT', 'OAuth2', 'Bcrypt'] },
        { n: 'Hardening Serveur', color: '#F59E0B', lvl: t('Avancé', 'Advanced'), pct: 80, d: t('Configuration UFW/Firewall, SSL/TLS, Cloudflare WAF.', 'UFW/Firewall setup, SSL/TLS, Cloudflare WAF.'), tags: ['Firewall', 'SSL/TLS', 'WAF'] },
        { n: 'Chiffrement & Données', color: '#8B5CF6', lvl: t('Avancé', 'Advanced'), pct: 80, d: t('Protection des paiements Mobile Money, webhooks signés.', 'Mobile Money payment protection, signed webhooks.'), tags: ['Crypto', 'Webhooks', 'Mobile Money'] },
      ],
    },
    {
      id: 'frontend',
      label: t('Frontend & Création UI', 'Frontend & UI Creation'),
      icon: Monitor,
      skills: [
        { n: 'React 18 & Vite', logo: SiReact, color: '#61DAFB', lvl: t('Avancé', 'Advanced'), pct: 90, d: t('Interfaces modernes et performantes pour le web.', 'Modern, high-performance web interfaces.'), tags: ['Hooks', 'Redux', 'Next.js'] },
        { n: 'Tailwind CSS & Motion', logo: SiTailwindcss, color: '#38BDF8', lvl: t('Avancé', 'Advanced'), pct: 90, d: t('Design systems réactifs, Framer Motion, micro-interactions.', 'Responsive design systems, Framer Motion, micro-interactions.'), tags: ['Design System', 'Framer Motion', 'Responsive'] },
        { n: 'Cloudflare & Vercel', logo: SiVercel, color: '#000000', lvl: t('Avancé', 'Advanced'), pct: 80, d: t('Déploiement Edge, gestion DNS, Workers, architectures CDN.', 'Edge deployments, DNS management, Workers, CDN architectures.'), tags: ['CDN', 'DNS', 'Workers'] },
        { n: 'E-Commerce Custom UI', color: '#F59E0B', lvl: t('Avancé', 'Advanced'), pct: 85, d: t('Boutiques sur-mesure, paniers dynamiques, checkout Mobile Money.', 'Tailored stores, dynamic carts, Mobile Money checkout.'), tags: ['Panier', 'Checkout', 'Mobile Money'] },
      ],
    },
    {
      id: 'backend',
      label: t('Backend & Cloud Africa', 'Backend & Africa Cloud'),
      icon: Cloud,
      skills: [
        { n: 'Node.js & Express', logo: SiNodedotjs, color: '#5FA04E', lvl: t('Avancé', 'Advanced'), pct: 88, d: t('API rapides et scalables avec un écosystème puissant.', 'Fast, scalable APIs with a powerful ecosystem.'), tags: ['Express.js', 'MongoDB', 'JWT'] },
        { n: 'REST APIs', color: '#60A5FA', lvl: t('Avancé', 'Advanced'), pct: 85, d: t('Intégrations et communication avec des services externes.', 'Integrations and communication with external services.'), tags: ['JSON', 'OAuth2', 'Swagger'] },
        { n: 'Supabase & PostgreSQL', logo: SiSupabase, color: '#3ECF8E', lvl: t('Avancé', 'Advanced'), pct: 90, d: t('RLS policies, Realtime DB, Storage, Edge Functions.', 'RLS policies, Realtime DB, Storage, Edge Functions.'), tags: ['RLS', 'Realtime', 'Edge Functions'] },
        { n: 'Passerelles Mobile Money', color: '#F59E0B', lvl: t('Avancé', 'Advanced'), pct: 85, d: t('Intégration CinetPay, Orange Money, Moov Money, webhooks sécurisés.', 'CinetPay, Orange Money, Moov Money integration, secured webhooks.'), tags: ['CinetPay', 'Orange Money', 'Webhooks'] },
        { n: 'Firebase & NoSQL', logo: SiFirebase, color: '#F5820D', lvl: t('Intermédiaire', 'Intermediate'), pct: 75, d: t('Backend-as-a-Service pour des applications mobiles et web.', 'Backend-as-a-Service for mobile and web apps.'), tags: ['Auth', 'Firestore', 'Hosting'] },
      ],
    },
    {
      id: 'auto',
      label: t('IA, Automation & Digital', 'AI, Automation & Digital'),
      icon: Sparkles,
      skills: [
        { n: 'WhatsApp Business API', logo: SiWhatsapp, color: '#25D366', lvl: t('Intermédiaire', 'Intermediate'), pct: 70, d: t('Notifications et messagerie pour une meilleure communication client.', 'Notifications and messaging for better client communication.'), tags: ['Webhooks', 'Messages', 'Automatisation'] },
        { n: 'Gemini AI SDK', logo: SiGooglegemini, color: '#8E75FF', lvl: t('Intermédiaire', 'Intermediate'), pct: 65, d: t('Intégration de l\'IA multimodale pour des applications intelligentes.', 'Multimodal AI integration for smart applications.'), tags: ['LLM', 'Multimodal', 'API'] },
        { n: 'Création & Branding', color: '#EC4899', lvl: t('Avancé', 'Advanced'), pct: 80, d: t('Conception de supports visuels, identités de marque.', 'Visual assets design, brand identities.'), tags: ['Identité', 'Visuels', 'Présentations'] },
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
    <section id="skills" className="relative pt-4 sm:pt-6 pb-20 sm:pb-28 md:pb-36 overflow-hidden bg-[#f8fafc]">
      {/* Fond — halo doux */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 85% 5%, rgba(59,130,246,0.08) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 px-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <Reveal>
          <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-[#3B82F6] font-mono font-bold uppercase tracking-[0.3em] mb-3">
                <Sparkles size={13} /> {t('Arsenal Global', 'Global Arsenal')} <span className="w-10 h-px bg-slate-900/20 ml-1" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.05]">
                {t('Compétences & Maîtrise', 'Skills & Mastery')}
                <br />
                <span className="bg-gradient-to-r from-slate-900 to-[#3B82F6] bg-clip-text text-transparent">
                  {t('Multi-Secteurs.', 'Multi-Domain.')}
                </span>
              </h2>
              <p className="text-slate-900/55 text-sm sm:text-base mt-4 max-w-lg">
                {t(
                  'Des technologies modernes et des outils puissants pour créer des solutions fiables, performantes et évolutives.',
                  'Modern technologies and powerful tools to build solutions that are reliable, high-performing and scalable.'
                )}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96 shrink-0">
              <Pencil size={14} className="hidden lg:block absolute -top-7 right-10 text-slate-900/25 rotate-12" />
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-900/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('Rechercher une technologie...', 'Search a technology...')}
                className="w-full bg-white border border-slate-900/10 rounded-full pl-12 pr-10 py-4 text-sm text-slate-900 placeholder-slate-900/40 outline-none focus:border-[#3B82F6] transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-slate-900/40 hover:text-slate-900"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Ticker tech */}
        <div className="relative mb-8 rounded-2xl bg-white border border-slate-900/10 shadow-sm">
          <div className="flex items-center gap-5 overflow-x-auto scrollbar-none px-6 py-4 pr-14">
            {TICKER_ITEMS.map((item, i) => {
              const Icon = item.logo
              return (
                <div key={item.n} className="flex items-center gap-5 shrink-0">
                  <div className="flex items-center gap-2">
                    <Icon size={18} style={{ color: item.color }} />
                    <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{item.n}</span>
                  </div>
                  {i < TICKER_ITEMS.length - 1 && <span className="text-slate-900/20">•</span>}
                </div>
              )
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-white to-transparent flex items-center justify-end pr-3 pointer-events-none">
            <span className="w-7 h-7 rounded-full bg-slate-900/5 flex items-center justify-center">
              <ArrowRight size={13} className="text-slate-900/40" />
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        {!isSearching && (
          <div className="flex items-center overflow-x-auto scrollbar-none gap-2.5 pb-3 mb-8 sm:flex-wrap">
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
                  className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#3B82F6] text-white shadow-[0_10px_25px_rgba(59,130,246,0.35)]'
                      : 'bg-white border border-slate-900/10 text-slate-900/60 hover:text-slate-900 hover:border-slate-900/20'
                  }`}
                >
                  <Icon size={15} />
                  <span>{c.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Grille de cartes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (isSearching ? search : '') + lang}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5"
          >
            {displayedSkills.map((s) => {
              const Logo = 'logo' in s ? (s as any).logo : null
              const color = (s as any).color || '#3B82F6'
              const levelColor = LEVEL_COLOR[s.lvl] || '#3B82F6'
              return (
                <div
                  key={s.n}
                  className="group relative bg-white border border-slate-900/10 hover:border-[#3B82F6]/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl shrink-0"
                        style={{ background: `${color}18` }}
                      >
                        {Logo ? <Logo size={22} style={{ color }} /> : <Code2 size={20} style={{ color }} />}
                      </span>
                      <ArrowUpRight size={16} className="text-slate-900/20 group-hover:text-[#3B82F6] transition-colors mt-1" />
                    </div>

                    {'catLabel' in s && (
                      <span className="text-[9px] font-mono text-[#3B82F6] uppercase tracking-widest mb-1 block truncate">
                        {(s as any).catLabel}
                      </span>
                    )}

                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-display text-base sm:text-lg text-slate-900 leading-tight">{s.n}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider"
                        style={{ backgroundColor: `${levelColor}15`, color: levelColor }}
                      >
                        {s.lvl}
                      </span>
                    </div>

                    <p className="hidden sm:block text-xs text-slate-900/55 leading-relaxed mb-5 line-clamp-2">
                      {s.d}
                    </p>
                  </div>

                  <div>
                    <SkillBar pct={(s as any).pct ?? 70} color={color} />
                    {'tags' in s && (
                      <div className="hidden sm:flex flex-wrap gap-1.5 mt-4">
                        {(s as any).tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/[0.04] text-slate-900/55 border border-slate-900/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Carte "écosystème complet" — ferme la grille */}
            <div className="relative bg-gradient-to-br from-[#3B82F6]/[0.06] to-transparent border border-dashed border-[#3B82F6]/25 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden min-h-[160px] sm:min-h-[220px]">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#3B82F6]">
                <Zap size={12} /> {t('Un écosystème complet', 'A complete ecosystem')}
              </div>
              <p className="font-display text-base sm:text-xl text-slate-900 leading-snug mt-4 max-w-[70%]">
                {t('Des outils modernes pour construire l\'avenir.', 'Modern tools to build the future.')}
              </p>
              <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] rotate-12 shadow-xl shadow-[#3B82F6]/20 flex items-center justify-center">
                <Code2 className="text-white -rotate-12" size={26} />
              </div>
              <span className="absolute top-5 right-6 w-2 h-2 rounded-full bg-[#3B82F6]" />
            </div>
          </motion.div>
        </AnimatePresence>

        {displayedSkills.length === 0 && (
          <div className="text-center py-16 text-muted text-sm font-mono border border-dashed border-slate-900/10 rounded-3xl">
            {t(`Aucune technologie ne correspond à "${search}".`, `No technology found for "${search}".`)}
          </div>
        )}
      </div>
    </section>
  )
}
