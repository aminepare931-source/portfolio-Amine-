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
  const [hubOpen, setHubOpen] = useState(false)
  const [diplomaHover, setDiplomaHover] = useState(false)

  const MILESTONES = [
    {
      id: 'm0',
      ic: '🎨',
      date: t('Avant 2023', 'Before 2023'),
      role: t('Digital & Création', 'Digital & Creation'),
      co: t('Graphisme, e-commerce, contenu digital', 'Graphic design, e-commerce, digital content'),
      d: t(
        'Déjà avant 2023, premières expériences dans le digital : graphisme, création visuelle, e-commerce et création de contenu. Une période qui apprend à créer, présenter et vendre en ligne.',
        'Already before 2023, first experiences in digital: graphic design, visual creation, e-commerce and content creation. A period focused on creating, presenting and selling online.'
      ),
      skills: ['Graphisme', 'E-commerce', 'Création de contenu', 'Produits digitaux'],
    },
    {
      id: 'm1',
      ic: '🖥️',
      date: '2023 — 2024',
      role: t('Informatique & Systèmes', 'Computing & Systems'),
      co: t('Maintenance & administration système', 'Maintenance & system administration'),
      d: t(
        'Formation en maintenance informatique : installation, configuration et dépannage sur Windows, Linux et Ubuntu. Une vraie base pour comprendre ce qui se passe derrière les logiciels.',
        'Training in computer maintenance: installation, configuration and troubleshooting on Windows, Linux and Ubuntu. A real foundation for understanding what happens behind the software.'
      ),
      skills: ['Windows / Linux / Ubuntu', 'Terminal', 'Configuration système', 'Dépannage'],
    },
    {
      id: 'm2',
      ic: '🚀',
      date: '2024',
      role: t('Entrée dans le Développement', 'Entering Development'),
      co: t('Fondamentaux du développement web', 'Web development fundamentals'),
      d: t(
        'Passage du digital à la programmation : découverte des fondamentaux du développement web avant de construire de vraies applications.',
        'Transition from digital to programming: discovering web development fundamentals before building real applications.'
      ),
      skills: ['HTML / CSS / JS', 'Logique de programmation'],
    },
    {
      id: 'm3',
      ic: '🎯',
      date: '2024 — 2025',
      role: t('Spécialisation Frontend', 'Frontend Specialization'),
      co: t('Interfaces modernes & interactives', 'Modern & interactive interfaces'),
      d: t(
        'Spécialisation en développement Frontend : interfaces modernes, responsives et interactives avec React, Vite, Tailwind CSS et TypeScript.',
        'Frontend development specialization: modern, responsive and interactive interfaces with React, Vite, Tailwind CSS and TypeScript.'
      ),
      skills: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'Animations'],
    },
    {
      id: 'm4',
      ic: '⚙️',
      date: '2025',
      role: t('Backend & Fullstack', 'Backend & Fullstack'),
      co: t('API, bases de données, architecture', 'APIs, databases, architecture'),
      d: t(
        'Approfondissement du Backend : API, bases de données, authentification, logique métier. Une évolution vers un profil Fullstack, capable de gérer une application de bout en bout.',
        'Deepening Backend skills: APIs, databases, authentication, business logic. An evolution toward a Fullstack profile, able to handle an application end-to-end.'
      ),
      skills: ['API REST', 'Bases de données', 'Authentification', 'Architecture'],
    },
    {
      id: 'm5',
      ic: '📱',
      date: '2025',
      role: t('Web & Mobile', 'Web & Mobile'),
      co: t('Produits multiplateformes', 'Cross-platform products'),
      d: t(
        'Élargissement vers le développement mobile, pour créer des produits accessibles aussi bien sur le Web que sur mobile.',
        'Expansion into mobile development, to build products accessible on both the Web and mobile.'
      ),
      skills: ['Développement mobile', 'Multiplateforme'],
    },
    {
      id: 'm6',
      ic: '🔀',
      date: '2025 — 2026',
      role: t('Git & GitHub', 'Git & GitHub'),
      co: t('Gestion de projet & collaboration', 'Project management & collaboration'),
      d: t(
        'Maîtrise de Git et GitHub : gestion des versions, branches, pull requests, workflows de développement et déploiement — le passage à une vraie gestion de projet.',
        'Mastery of Git and GitHub: version control, branches, pull requests, development workflows and deployment — the shift to real project management.'
      ),
      skills: ['Git', 'GitHub', 'Branches & PR', 'Workflows CI/CD'],
    },
    {
      id: 'm7',
      ic: '🛡️',
      date: '2026',
      role: t('Sécurité', 'Security'),
      co: t('Sécurisation des applications', 'Application security'),
      d: t(
        'Renforcement des compétences en sécurité : authentification, autorisations, protection des API et bonnes pratiques pour construire des applications plus sûres.',
        'Strengthening security skills: authentication, authorization, API protection and best practices for building safer applications.'
      ),
      skills: ['Authentification & Autorisation', 'Protection API', 'Bonnes pratiques'],
    },
    {
      id: 'm8',
      ic: '🤖',
      date: '2026',
      role: t('Intelligence Artificielle', 'Artificial Intelligence'),
      co: t('Intégration IA dans les applications', 'AI integration in applications'),
      d: t(
        'Intégration de l\'intelligence artificielle dans les applications : au-delà de l\'usage de l\'IA pour générer du code, la création de fonctionnalités basées sur l\'IA.',
        'Integrating artificial intelligence into applications: beyond using AI to generate code, building actual AI-powered features.'
      ),
      skills: ['Intégration IA', 'Fonctionnalités IA'],
    },
    {
      id: 'm9',
      ic: '⚡',
      date: t('2026 — Présent', '2026 — Present'),
      role: t('Automatisation', 'Automation'),
      co: t('Systèmes connectés & processus automatisés', 'Connected systems & automated processes'),
      d: t(
        'Aujourd\'hui, connecter différents outils et services pour automatiser des tâches et construire des systèmes capables d\'exécuter des processus avec moins d\'intervention humaine.',
        'Today, connecting different tools and services to automate tasks and build systems capable of running processes with less human intervention.'
      ),
      skills: ['Automatisation', 'Intégrations API', 'Systèmes connectés'],
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
    <section id="experience" className="relative bg-[#ffffff] overflow-hidden py-16 sm:py-24">
      {/* Intro Video Background Banner (Compact Header) */}
      <div className="relative w-full rounded-3xl overflow-hidden max-w-[1320px] mx-auto px-6 mb-12">
        <div className="relative rounded-3xl overflow-hidden border border-slate-900/10 bg-white/60 p-8 sm:p-12 backdrop-blur-xl">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3B82F6]/40 text-xs font-mono text-clay uppercase tracking-[0.25em] mb-4">
              <Award size={14} className="text-[#3B82F6]" /> {t('Mon Parcours Global', 'My Global Journey')}
            </div>

            <h2 className="font-display text-3xl sm:text-5xl text-slate-900 leading-tight mb-4">
              {t('DE BOBO-DIOULASSO à DES CLIENTS EN AFRIQUE', 'FROM BOBO-DIOULASSO TO INTERNATIONAL CLIENTS')}
            </h2>

            <p className="text-xs sm:text-sm text-slate-900/80 font-sans leading-relaxed mb-6">
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
                    : 'bg-slate-900/10 text-slate-900/70 hover:text-slate-900'
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
                    : 'bg-slate-900/10 text-slate-900/70 hover:text-slate-900'
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-slate-900/10 pb-6">
            <div>
              <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-1">
                <span className="w-8 h-px bg-clay" /> {t('Chronologie Horizontale & Interactive', 'Horizontal Interactive Timeline')}
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-slate-900">
                {t('La Route du Code & de la Sécurité', 'The Road of Code & Security')}<span className="text-[#3B82F6]">.</span>
              </h3>
            </div>

            {/* Prev / Next controls */}
            {viewMode === 'showcase' && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-900/50">
                  {t('Étape', 'Step')} {activeIndex + 1} / {MILESTONES.length}
                </span>
                <button
                  onClick={prevStep}
                  className="w-10 h-10 rounded-full border border-slate-900/20 bg-surface/80 text-slate-900 flex items-center justify-center hover:bg-[#3B82F6] hover:text-black hover:border-[#3B82F6] transition-all"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={nextStep}
                  className="w-10 h-10 rounded-full border border-slate-900/20 bg-surface/80 text-slate-900 flex items-center justify-center hover:bg-[#3B82F6] hover:text-black hover:border-[#3B82F6] transition-all"
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
            {/* Hub central: survol pour dévoiler tout le parcours — version explosive */}
            <div className="flex flex-col items-center py-6 sm:py-10">
              <div className="relative flex items-center justify-center">
                {/* Ondes de choc au survol */}
                <AnimatePresence>
                  {hubOpen && (
                    <>
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0.6, opacity: 0.6 }}
                          animate={{ scale: 2.4, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.1, delay, repeat: Infinity, ease: 'easeOut' }}
                          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#3B82F6] pointer-events-none"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                <motion.button
                  onMouseEnter={() => { setHubOpen(true); playClickSound() }}
                  onMouseLeave={() => setHubOpen(false)}
                  onClick={() => { playClickSound(); setActiveIndex(activeIndex) }}
                  animate={hubOpen ? { scale: [1, 1.25, 1.12], rotate: [0, -8, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#3B82F6] text-black flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-[0_0_60px_rgba(59,130,246,0.8)] border-4 border-white cursor-pointer"
                >
                  {current.ic}
                </motion.button>
              </div>

              <span className="text-xs font-mono text-slate-900/50 mt-3">
                {t('Survolez pour faire exploser le parcours', 'Hover to blast open the full journey')}
              </span>

              {/* Route + jalons qui explosent depuis le centre */}
              <AnimatePresence>
                {hubOpen && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'center' }}
                    className="w-full max-w-3xl mt-6 relative"
                  >
                    <div className="relative h-1 bg-slate-900/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-[#3B82F6] shadow-[0_0_16px_#3B82F6]"
                      />
                    </div>
                    <div className="flex justify-between mt-4 px-1">
                      {MILESTONES.map((m, idx) => {
                        const distanceFromCenter = idx - (MILESTONES.length - 1) / 2
                        return (
                          <motion.button
                            key={m.id}
                            onClick={() => {
                              playClickSound()
                              setActiveIndex(idx)
                            }}
                            initial={{ opacity: 0, scale: 0, y: -30, rotate: distanceFromCenter * 25 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 260,
                              damping: 14,
                              delay: 0.08 + Math.abs(distanceFromCenter) * 0.05,
                            }}
                            whileHover={{ scale: 1.4, rotate: [0, -10, 10, 0] }}
                            className="flex flex-col items-center gap-1 cursor-pointer group"
                          >
                            <span
                              className={`text-lg sm:text-xl transition-transform drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] ${
                                idx === activeIndex ? 'scale-125' : 'opacity-60'
                              }`}
                            >
                              {m.ic}
                            </span>
                            <span
                              className={`text-[9px] font-mono hidden sm:block transition-colors ${
                                idx === activeIndex ? 'text-[#3B82F6] font-bold' : 'text-slate-900/50 group-hover:text-slate-900'
                              }`}
                            >
                              {m.date}
                            </span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Milestone Card Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + lang}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-surface/80 border border-slate-900/15 rounded-3xl p-5 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 rounded-2xl bg-white/60 border border-slate-900/10">
                        {current.ic}
                      </span>
                      <div>
                        <span className="text-xs font-mono font-bold text-clay uppercase tracking-wider block">
                          {current.date}
                        </span>
                        <span className="text-xs text-slate-900/50 font-mono">{current.co}</span>
                      </div>
                    </div>

                    <h4 className="font-display text-3xl sm:text-4xl text-slate-900">{current.role}</h4>

                    <p className="text-sm text-slate-900/80 leading-relaxed font-sans max-w-2xl line-clamp-2 sm:line-clamp-none">
                      {current.d}
                    </p>

                    <div className="hidden sm:block pt-2">
                      <div className="text-[11px] font-mono text-muted uppercase tracking-widest mb-2">
                        {t('Technologies & Compétences Clés', 'Technologies & Key Skills')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {current.skills.map((s) => (
                          <span
                            key={s}
                            className="text-xs font-mono bg-slate-900/10 border border-slate-900/15 text-slate-900 px-3.5 py-1.5 rounded-full backdrop-blur-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-4 bg-white/50 border border-slate-900/10 rounded-2xl p-6 space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center mx-auto text-2xl font-bold font-mono">
                      0{activeIndex + 1}
                    </div>
                    <div>
                      <div className="text-xs text-slate-900/50 font-mono">{t('Étape du parcours', 'Journey Step')}</div>
                      <div className="font-display text-lg text-slate-900">{current.role}</div>
                    </div>
                    <Link
                      to="/projets"
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-slate-900/10 hover:bg-[#3B82F6] hover:text-black text-slate-900 text-xs font-mono font-bold py-3 transition-colors"
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
                className="bg-surface/60 border border-slate-900/10 hover:border-[#3B82F6]/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <span className="text-xl sm:text-3xl p-1.5 sm:p-2 rounded-xl bg-white/50 border border-slate-900/10">
                      {m.ic}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-clay uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30">
                      {m.date}
                    </span>
                  </div>

                  <h4 className="font-display text-sm sm:text-xl text-slate-900 mb-1 leading-tight">{m.role}</h4>
                  <div className="text-[10px] sm:text-xs text-slate-900/50 font-mono mb-2">{m.co}</div>

                  <p className="hidden sm:block text-xs text-slate-900/70 leading-relaxed font-sans mb-3 line-clamp-3">{m.d}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 sm:pt-3 border-t border-slate-900/10">
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[8px] sm:text-[9px] font-mono bg-slate-900/5 border border-slate-900/10 text-slate-900/70 px-2 py-0.5 rounded-full"
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
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-slate-900/10">
          <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-3">
            <Award size={16} className="text-[#3B82F6]" />
            <span>{t('Formations & Diplômes Académiques', 'Academic Degrees & Diplomas')}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-slate-900 mb-6">
            {t('Parcours Technique & Diplômes d\'État', 'Technical & Academic Qualification')}<span className="text-[#3B82F6]">.</span>
          </h3>

          <div className="relative flex flex-col items-center py-4">
            {/* BEPC — carte centrale, déclencheur */}
            <div className="relative">
              <AnimatePresence>
                {diplomaHover && (
                  <>
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.85, opacity: 0.5 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.1, delay, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-2xl border-2 border-sky-400 pointer-events-none"
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              <motion.div
                onMouseEnter={() => { setDiplomaHover(true); playClickSound() }}
                onMouseLeave={() => setDiplomaHover(false)}
                animate={diplomaHover ? { scale: [1, 1.06, 1.02], boxShadow: '0 0 50px rgba(56,189,248,0.6)' } : { scale: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                className="relative z-20 w-full max-w-xs mx-auto bg-surface/80 border-2 border-sky-400/40 hover:border-sky-400 rounded-2xl p-5 sm:p-6 backdrop-blur-xl cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🎓</span>
                  <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                    {t('Premier Cycle', 'General Education')}
                  </span>
                </div>
                <h4 className="font-display text-xl text-slate-900 mb-1">BEPC</h4>
                <div className="text-xs text-sky-400 font-mono mb-2">{t('Brevet d\'Études du Premier Cycle', 'Junior High School Certificate')}</div>
                <p className="text-xs text-slate-900/70 leading-relaxed font-sans">
                  {t(
                    'Études du premier cycle avec mention, socle scientifique solide.',
                    'Junior secondary education with honors, strong scientific foundation.'
                  )}
                </p>
                <div className="text-center mt-2 text-[10px] font-mono text-slate-900/40">
                  {t('Survolez pour faire exploser la suite →', 'Hover to blast open what came next →')}
                </div>
              </motion.div>
            </div>

            {/* BEP + BAC — jaillissent de la BEPC au survol */}
            <AnimatePresence>
              {diplomaHover && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-5 max-w-2xl mx-auto">
                    {/* BEP Énergie Solaire */}
                    <motion.div
                      initial={{ opacity: 0, x: -60, scale: 0.3, rotate: -20 }}
                      animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.08 }}
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="bg-surface/60 border border-slate-900/10 hover:border-slate-900/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">☀️</span>
                        <span className="text-[10px] font-mono font-bold text-clay bg-clay/10 px-2.5 py-1 rounded-full border border-clay/30">
                          {t('Brevet d\'Études', 'Technical Certificate')}
                        </span>
                      </div>
                      <h4 className="font-display text-xl text-slate-900 mb-1">BEP</h4>
                      <div className="text-xs text-clay font-mono mb-2">{t('Option : Énergie Solaire', 'Option: Solar Energy')}</div>
                      <p className="text-xs text-slate-900/70 leading-relaxed font-sans">
                        {t(
                          'Fondamentaux électriques, câblage et dépannage d\'équipements.',
                          'Electrical fundamentals, wiring, and equipment troubleshooting.'
                        )}
                      </p>
                    </motion.div>

                    {/* BAC Pro Énergie Solaire */}
                    <motion.div
                      initial={{ opacity: 0, x: 60, scale: 0.3, rotate: 20 }}
                      animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.14 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-surface/80 border border-clay/30 hover:border-clay rounded-2xl p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden shadow-lg"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6]/10 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">⚡</span>
                        <span className="text-[10px] font-mono font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-full border border-[#3B82F6]/30">
                          {t('Diplôme d\'État', 'State Diploma')}
                        </span>
                      </div>
                      <h4 className="font-display text-xl text-slate-900 mb-1">BAC Professionnel</h4>
                      <div className="text-xs text-clay font-mono mb-2">{t('Spécialité : Énergie Solaire', 'Specialty: Solar Energy')}</div>
                      <p className="text-xs text-slate-900/70 leading-relaxed font-sans">
                        {t(
                          'Électrotechnique, systèmes photovoltaïques et logique d\'ingénierie physique.',
                          'Electrotechnics, photovoltaic systems, and hardware engineering logic.'
                        )}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
