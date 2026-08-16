import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Award, Calendar, CheckCircle2, ChevronRight, Sparkles, Terminal, ShieldCheck, Lock } from 'lucide-react'
import Reveal from './Reveal'
import { Link } from 'react-router-dom'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

export default function JourneyRoad() {
  const { lang, t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase')

  const MILESTONES = [
    {
      id: 'm0',
      ic: '💡',
      date: 'Avant 2023',
      role: t('Passion Tech & Univers Digital', 'Tech Passion & Digital Exploration'),
      co: 'Bobo-Dioulasso 🇧🇫',
      d: t(
        'Exploration passionnée des systèmes et du numérique, avant de se lancer dans la programmation.',
        'Passionate exploration of computer systems and digital tech, before diving into software engineering.'
      ),
      skills: ['Culture Tech', 'Systèmes & Matériel', 'Graphisme', 'Bureautique & Réseaux'],
    },
    {
      id: 'm1',
      ic: '🚀',
      date: '2023 (À 15 ans)',
      role: t('Débuts en Développement & Code', 'Software Engineering Debut (At 15)'),
      co: 'Débuts en Auto-formation',
      d: t(
        'Premiers pas en programmation à 15 ans : HTML5, CSS3, JS ES6+, Python, C/C++ et algorithmique.',
        'First steps in programming at 15: HTML5/CSS3, JS ES6+, Python, C/C++ and algorithms.'
      ),
      skills: ['JavaScript ES6+', 'Python', 'C / C++', 'Git & GitHub', 'Bases de Données'],
    },
    {
      id: 'm2',
      ic: '🛡️',
      date: '2023 — 2024',
      role: t('Expansion Fullstack & Cyber-Sécurité', 'Fullstack Expansion & Cybersecurity'),
      co: 'FASOKO & Audits Web',
      d: t(
        'FASOKO (Cloudflare Workers, PWA) et premiers audits de sécurité web (OWASP, JWT).',
        'FASOKO (Cloudflare Workers, PWA) and first web security audits (OWASP, JWT).'
      ),
      skills: ['React 18', 'Cloudflare Workers', 'OWASP Audit', 'JWT Auth', 'Tailwind CSS'],
    },
    {
      id: 'm3',
      ic: '💳',
      date: '2024 — Présent',
      role: t('E-Commerce & Mobile Money (EMBF)', 'E-Commerce & Mobile Money Lead'),
      co: 'EMBF Boutique',
      d: t(
        'EMBF Boutique : Supabase RLS, paiements Mobile Money (CinetPay), bot WhatsApp automatisé.',
        'EMBF Boutique: Supabase RLS, CinetPay Mobile Money payments, automated WhatsApp bot.'
      ),
      skills: ['Supabase RLS', 'CinetPay API', 'WhatsApp Bot API', 'PostgreSQL', 'Express.js'],
    },
    {
      id: 'm4',
      ic: '🌟',
      date: 'Présent',
      role: t('Développeur touche-à-tout', 'All-round developer'),
      co: 'TechBF & Missions Globales',
      d: t(
        'Marketplaces, bots IA (Gemini SDK) et architectures multi-langages (TS, Python, PHP, Go).',
        'Marketplaces, AI bots (Gemini SDK) and polyglot architectures (TS, Python, PHP, Go).'
      ),
      skills: ['TypeScript', 'Python / Go', 'PHP / C++', 'Docker & Cloud', 'Cyber Protection'],
    },
  ]

  const current = MILESTONES[activeIndex]

  // Auto-advance timeline step every 4.5 seconds in showcase view
  useEffect(() => {
    if (viewMode !== 'showcase') return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MILESTONES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [viewMode])

  function nextStep() {
    playClickSound()
    setActiveIndex((prev) => (prev + 1) % MILESTONES.length)
  }

  function prevStep() {
    playClickSound()
    setActiveIndex((prev) => (prev - 1 + MILESTONES.length) % MILESTONES.length)
  }

  return (
    <section id="experience" className="relative bg-[#0a0e16] overflow-hidden py-16 sm:py-24">
      {/* Intro Video Background Banner (Compact Header) */}
      <div className="relative w-full rounded-3xl overflow-hidden max-w-[1320px] mx-auto px-6 mb-12">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 p-8 sm:p-12 backdrop-blur-xl">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 65%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-[#3B82F6]/40 text-xs font-mono text-clay uppercase tracking-[0.25em] mb-4">
              <Award size={14} className="text-[#3B82F6]" /> {t('Mon Parcours Global', 'My Global Journey')}
            </div>

            <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight mb-4">
              {t('DE BOBO-DIOULASSO à DES CLIENTS EN AFRIQUE', 'FROM BOBO-DIOULASSO TO INTERNATIONAL CLIENTS')}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed mb-6">
              {t('3+ années d\'autoformation continue, d\'audits de sécurité et de réalisations concrètes sur le terrain.', '3+ years of continuous learning, security audits, and production systems in Africa.')}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playClickSound()
                  setViewMode('showcase')
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  viewMode === 'showcase'
                    ? 'bg-[#3B82F6] text-black shadow-lg'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                ⚡ {t('Vue Interactive Horizon', 'Interactive Horizon View')}
              </button>

              <button
                onClick={() => {
                  playClickSound()
                  setViewMode('grid')
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#3B82F6] text-black shadow-lg'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                📊 {t('Vue Synthèse Grid', 'Grid Overview')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 max-w-[1320px] mx-auto relative z-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-1">
                <span className="w-8 h-px bg-clay" /> {t('Chronologie Horizontale & Interactive', 'Horizontal Interactive Timeline')}
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white">
                {t('La Route du Code & de la Sécurité', 'The Road of Code & Security')}<span className="text-[#3B82F6]">.</span>
              </h3>
            </div>

            {/* Prev / Next controls */}
            {viewMode === 'showcase' && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/50">
                  {t('Étape', 'Step')} {activeIndex + 1} / {MILESTONES.length}
                </span>
                <button
                  onClick={prevStep}
                  className="w-10 h-10 rounded-full border border-white/20 bg-surface/80 text-white flex items-center justify-center hover:bg-[#3B82F6] hover:text-black hover:border-[#3B82F6] transition-all"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={nextStep}
                  className="w-10 h-10 rounded-full border border-white/20 bg-surface/80 text-white flex items-center justify-center hover:bg-[#3B82F6] hover:text-black hover:border-[#3B82F6] transition-all"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* SHOWCASE INTERACTIVE HORIZONTAL TIMELINE (NO LONG VERTICAL SCROLL) */}
        {viewMode === 'showcase' ? (
          <div className="space-y-8">
            {/* Horizontal Timeline Bar */}
            <div className="relative p-2 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-xl overflow-x-auto scrollbar-none">
              <div className="flex items-center justify-between min-w-[700px] relative px-4 py-2">
                {/* Connecting Laser Line */}
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-white/10 z-0">
                  <div
                    className="h-full bg-[#3B82F6] transition-all duration-500 shadow-[0_0_10px_#3B82F6]"
                    style={{ width: `${(activeIndex / (MILESTONES.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Step Nodes */}
                {MILESTONES.map((m, idx) => {
                  const isActive = idx === activeIndex
                  const isPassed = idx <= activeIndex
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        playClickSound()
                        setActiveIndex(idx)
                      }}
                      className="relative z-10 flex flex-col items-center group cursor-pointer"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-all duration-300 font-bold ${
                          isActive
                            ? 'bg-[#3B82F6] text-black scale-110 shadow-[0_0_20px_rgba(59, 130, 246,0.6)] border-2 border-white'
                            : isPassed
                            ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/50'
                            : 'bg-black/80 text-white/40 border border-white/10 group-hover:border-white/30'
                        }`}
                      >
                        {m.ic}
                      </div>
                      <span
                        className={`text-[11px] font-mono mt-2 transition-colors ${
                          isActive ? 'text-[#3B82F6] font-bold' : 'text-white/60'
                        }`}
                      >
                        {m.date}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Milestone Card Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + lang}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-surface/80 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 rounded-2xl bg-black/60 border border-white/10">
                        {current.ic}
                      </span>
                      <div>
                        <span className="text-xs font-mono font-bold text-clay uppercase tracking-wider block">
                          {current.date}
                        </span>
                        <span className="text-xs text-white/50 font-mono">{current.co}</span>
                      </div>
                    </div>

                    <h4 className="font-display text-3xl sm:text-4xl text-white">{current.role}</h4>

                    <p className="text-sm text-white/80 leading-relaxed font-sans max-w-2xl">
                      {current.d}
                    </p>

                    <div className="pt-2">
                      <div className="text-[11px] font-mono text-muted uppercase tracking-widest mb-2">
                        {t('Technologies & Compétences Clés', 'Technologies & Key Skills')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {current.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs font-mono bg-white/10 border border-white/15 text-white px-3.5 py-1.5 rounded-full backdrop-blur-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-black/50 border border-white/10 rounded-2xl p-6 space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center mx-auto text-2xl font-bold font-mono">
                      0{activeIndex + 1}
                    </div>
                    <div>
                      <div className="text-xs text-white/50 font-mono">{t('Étape du parcours', 'Journey Step')}</div>
                      <div className="font-display text-lg text-white">{current.role}</div>
                    </div>
                    <Link
                      to="/projets"
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-white/10 hover:bg-[#3B82F6] hover:text-black text-white text-xs font-mono font-bold py-3 transition-colors"
                    >
                      <span>{t('Projets associés', 'Associated Projects')}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* GRID MODE FOR OVERVIEW - 2 Columns on Mobile */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {MILESTONES.map((m) => (
              <div
                key={m.id}
                className="bg-surface/60 border border-white/10 hover:border-[#3B82F6]/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-xl sm:text-3xl p-1.5 sm:p-2 rounded-xl bg-black/50 border border-white/10">
                      {m.ic}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-clay uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30">
                      {m.date}
                    </span>
                  </div>

                  <h4 className="font-display text-sm sm:text-xl text-white mb-1 leading-tight">{m.role}</h4>
                  <div className="text-[10px] sm:text-xs text-white/50 font-mono mb-2">{m.co}</div>

                  <p className="hidden sm:block text-xs text-white/70 leading-relaxed font-sans mb-3 line-clamp-3">{m.d}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 sm:pt-3 border-t border-white/10">
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[8px] sm:text-[9px] font-mono bg-white/5 border border-white/10 text-white/70 px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Diplômes & Formations Académiques - 2 Columns on Mobile */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-3">
            <Award size={16} className="text-[#3B82F6]" />
            <span>{t('Formations & Diplômes Académiques', 'Academic Degrees & Diplomas')}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-white mb-6">
            {t('Parcours Technique & Diplômes d\'État', 'Technical & Academic Qualification')}<span className="text-[#3B82F6]">.</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* BAC Pro Énergie Solaire */}
            <div className="bg-surface/80 border border-clay/30 hover:border-clay rounded-2xl p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6]/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">⚡</span>
                <span className="text-[10px] font-mono font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full border border-[#3B82F6]/30">
                  {t('Diplôme d\'État', 'State Diploma')}
                </span>
              </div>
              <h4 className="font-display text-xl text-white group-hover:text-clay transition-colors mb-1">
                BAC Professionnel
              </h4>
              <div className="text-xs text-clay font-mono mb-2">{t('Spécialité : Énergie Solaire', 'Specialty: Solar Energy')}</div>
              <p className="hidden sm:block text-xs text-white/70 leading-relaxed font-sans">
                {t(
                  'Électrotechnique, systèmes photovoltaïques et logique d\'ingénierie physique.',
                  'Electrotechnics, photovoltaic systems, and hardware engineering logic.'
                )}
              </p>
            </div>

            {/* BEP Énergie Solaire */}
            <div className="bg-surface/60 border border-white/10 hover:border-white/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">☀️</span>
                <span className="text-[10px] font-mono font-bold text-clay bg-clay/10 px-2.5 py-1 rounded-full border border-clay/30">
                  {t('Brevet d\'Études', 'Technical Certificate')}
                </span>
              </div>
              <h4 className="font-display text-xl text-white mb-1">
                BEP
              </h4>
              <div className="text-xs text-clay font-mono mb-2">{t('Option : Énergie Solaire', 'Option: Solar Energy')}</div>
              <p className="hidden sm:block text-xs text-white/70 leading-relaxed font-sans">
                {t(
                  'Fondamentaux électriques, câblage et dépannage d\'équipements.',
                  'Electrical fundamentals, wiring, and equipment troubleshooting.'
                )}
              </p>
            </div>

            {/* BEPC */}
            <div className="bg-surface/60 border border-white/10 hover:border-white/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xl transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">🎓</span>
                <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                  {t('Premier Cycle', 'General Education')}
                </span>
              </div>
              <h4 className="font-display text-xl text-white mb-1">
                BEPC
              </h4>
              <div className="text-xs text-sky-400 font-mono mb-2">{t('Brevet d\'Études du Premier Cycle', 'Junior High School Certificate')}</div>
              <p className="hidden sm:block text-xs text-white/70 leading-relaxed font-sans">
                {t(
                  'Études du premier cycle avec mention, socle scientifique solide.',
                  'Junior secondary education with honors, strong scientific foundation.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
