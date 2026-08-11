import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, ArrowRight, Code, Globe, ShieldCheck } from 'lucide-react'
import FlipCard from './FlipCard'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const { lang, t } = useLanguage()

  const ROLES = [
    t('Développeur Fullstack & Créateur Digital 🚀', 'Fullstack Developer & Digital Creator 🚀'),
    t('Cyber-Sécurité, Audits & Protection SI 🛡️', 'Cybersecurity, Security Audits & Protection 🛡️'),
    t('Expert Mobile Money (CinetPay / Orange / Moov) 💳', 'Mobile Money Expert (CinetPay / Orange / Moov) 💳'),
    t('Bots WhatsApp & automatisation', 'WhatsApp bots & automation'),
    t('Polyglotte Code: TS, Python, C/C++, PHP, Go 💻', 'Code Polyglot: TS, Python, C/C++, PHP, Go 💻'),
  ]

  // 3D Motion tilt effect for Hero Container
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 150, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('hero')?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Role rotator interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [lang])

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-12 px-4 sm:px-6"
      style={{ minHeight: '100dvh' }}
    >
      {/* Background High-Tech Layer */}
      <div className="absolute inset-0 bg-[#060504]" />

      {/* Cybernetic Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(255, 90, 31, 0.18) 0%, rgba(8, 7, 6, 0.85) 60%, rgba(6, 5, 4, 0.98) 100%)',
        }}
      />

      {/* Grid Pattern Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* MAIN CONTENT GRID */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full max-w-[1320px] mx-auto grid lg:grid-cols-12 items-center gap-5 sm:gap-12 lg:gap-8 my-auto"
      >
        {/* LEFT COLUMN: INTRO & PITCH */}
        <div className="lg:col-span-7 max-w-2xl">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface/90 border border-clay/30 text-xs text-clay font-mono mb-4 sm:mb-6 shadow-xl backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-white font-medium">{t('Disponible Remote & Freelance', 'Available for Remote & Freelance')}</span>
            <span className="text-white/30">•</span>
            <span className="text-clay">Bobo-Dioulasso 🇧🇫</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white mb-2 sm:mb-4"
          >
            Mouhamed <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Amine Paré
            </span>
            <span className="text-[#FF5A1F] inline-block animate-bounce">.</span>
          </motion.h1>

          {/* Dynamic Motion Role Switcher */}
          <div className="h-8 sm:h-12 flex items-center mb-3 sm:mb-6 overflow-hidden">
            <motion.div
              key={currentRoleIndex + lang}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-base sm:text-xl font-mono text-[#FF5A1F] font-semibold"
            >
              <Code size={20} className="shrink-0 text-clay" />
              <span>{ROLES[currentRoleIndex]}</span>
            </motion.div>
          </div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base text-muted max-w-xl mb-5 sm:mb-8 leading-relaxed font-sans"
          >
            {t(
              "Développeur Fullstack & Créateur Digital. Applications web, e-commerce Mobile Money, cyber-sécurité et automatisation IA — du concept au déploiement.",
              "Fullstack Developer & Digital Creator. Web apps, Mobile Money e-commerce, cybersecurity and AI automation — from concept to deployment."
            )}
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3.5"
          >
            {/* Voir les projets */}
            <Link
              to="/projets"
              onClick={playClickSound}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#ff7a47] text-black font-bold px-5 py-3 sm:px-7 sm:py-4 text-xs sm:text-sm shadow-[0_10px_25px_rgba(255,90,31,0.4)] hover:shadow-[0_15px_35px_rgba(255,90,31,0.6)] hover:scale-105 transition-all duration-300"
            >
              <span>{t('Voir mes projets', 'See my projects')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 rounded-full bg-surface/80 hover:bg-surface border border-white/20 hover:border-clay/50 text-white px-5 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium transition-all backdrop-blur-md hover:scale-105"
            >
              <span>{t('Me contacter', 'Contact me')}</span>
              <ArrowRight size={15} className="text-clay"/>
            </Link>

            {/* CV PDF */}
            <a
              href="/assets/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-3 py-2.5 sm:px-4 sm:py-3.5"
            >
              <Download size={14} /> CV PDF
            </a>
          </motion.div>

          {/* Tech stack auto-scrolling marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-5 sm:mt-8 overflow-hidden rounded-xl bg-white/5 border border-white/10 p-2.5 backdrop-blur-md hidden sm:block"
          >
            <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-clay uppercase font-bold tracking-wider px-2">
              <span>{t('Domaines & Stack Technical :', 'Domains & Stack :')}</span>
            </div>
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
              {[
                'React 18 / TS',
                'Node.js & Express',
                'Python & FastAPI',
                'CyberSec OWASP & Auth',
                'C / C++ Algorithmes',
                'PHP & Modern Web',
                'Go (Golang)',
                'CinetPay Mobile Money',
                'WhatsApp Business API',
                'Supabase & PostgreSQL',
                'React 18 / TS',
                'Node.js & Express',
                'Python & FastAPI',
                'CyberSec OWASP & Auth',
                'C / C++ Algorithmes',
                'PHP & Modern Web',
                'Go (Golang)',
                'CinetPay Mobile Money',
                'WhatsApp Business API',
                'Supabase & PostgreSQL',
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-surface/80 border border-white/10 text-white/90 text-xs font-mono font-semibold mx-1.5 shrink-0 hover:border-[#FF5A1F]/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE 3D FLIP CARD + FLOATING BADGES */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          
          {/* Floating Orbit Metric Pill 1 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -left-6 z-20 bg-[#0d1322]/90 border border-clay/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 hidden lg:flex"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF5A1F]/20 text-[#FF5A1F] flex items-center justify-center font-bold text-sm">
              <Globe size={18} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">{t('Portée', 'Scope')}</div>
              <div className="text-xs font-bold text-white">{t('Full Remote & Afrique', 'Full Remote & Worldwide')}</div>
            </div>
          </motion.div>

          {/* Floating Orbit Metric Pill 2 */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-4 -right-6 z-20 bg-[#0d1322]/90 border border-emerald-500/30 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 hidden lg:flex"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">{t('Sécurité & Qualité', 'Security & Quality')}</div>
              <div className="text-xs font-bold text-white">{t('Audit & Protection 100%', 'Audited & 100% Production Ready')}</div>
            </div>
          </motion.div>

          {/* FlipCard Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[260px] sm:max-w-none mx-auto"
          >
            <FlipCard />
          </motion.div>
        </div>
      </motion.div>

      {/* BOTTOM TICKER / SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 w-full max-w-[1320px] mx-auto pt-4 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-white/60"
      >
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 w-full md:w-auto">
          <span className="flex items-center gap-1.5 text-white bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-xl border border-white/5 sm:border-none">
            <span className="text-[#FF5A1F] font-bold">3+</span> {t("Années Expérience", "Years Experience")}
          </span>
          <span className="flex items-center gap-1.5 text-white bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-xl border border-white/5 sm:border-none">
            <span className="text-[#FF5A1F] font-bold">12+</span> {t("Projets Livrés", "Projects Delivered")}
          </span>
          <span className="col-span-2 sm:col-span-1 flex items-center gap-1.5 text-white bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-xl border border-white/5 sm:border-none justify-center sm:justify-start">
            <span className="text-[#FF5A1F] font-bold">100%</span> {t("Créateur Digital & Autodidacte", "Digital Creator & Self-Taught")}
          </span>
        </div>

        <div className="items-center gap-2 text-[10px] text-muted uppercase tracking-widest self-center hidden sm:flex">
          <span>{t("Défiler pour explorer", "Scroll to explore")}</span>
          <span className="animate-bounce text-clay">↓</span>
        </div>
      </motion.div>

    </section>
  )
}
