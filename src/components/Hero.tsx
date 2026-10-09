import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, ArrowRight, Code, Globe, ShieldCheck, Zap } from 'lucide-react'
import { SiReact, SiNodedotjs, SiPython, SiOwasp, SiPhp, SiGo, SiWhatsapp, SiSupabase } from 'react-icons/si'
import HeroPhotoRing from './HeroPhotoRing'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const { lang, t } = useLanguage()

  const ROLES = [
    t('Développeur Fullstack & Créateur Digital', 'Fullstack Developer & Digital Creator'),
    t('Cyber-sécurité, audits & protection', 'Cybersecurity, audits & protection'),
    t('Mobile Money (CinetPay, Orange, Moov)', 'Mobile Money (CinetPay, Orange, Moov)'),
    t('Bots WhatsApp & automatisation', 'WhatsApp bots & automation'),
    t('TypeScript, Python, C/C++, PHP, Go', 'TypeScript, Python, C/C++, PHP, Go'),
  ]

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
      <div className="absolute inset-0 bg-[#f1f5f9]" />

      {/* Cybernetic Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.98) 100%)',
        }}
      />

      {/* Grid Pattern Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* MAIN CONTENT GRID */}
      <div
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
            <span className="text-slate-900 font-medium">{t('Disponible Remote & Freelance', 'Available for Remote & Freelance')}</span>
            <span className="text-slate-900/30">•</span>
            <span className="text-clay">Bobo-Dioulasso 🇧🇫</span>
          </motion.div>

          {/* Headline — display serif with layered 3D shadow */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serifHero font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-slate-900 mb-3 sm:mb-5"
            style={{
              textShadow:
                '1px 1px 0 #cbd5e1, 2px 2px 0 #b6c2d1, 3px 3px 0 #a3b3c6, 4px 4px 0 #90a4bb, 5px 5px 10px rgba(15,23,42,0.25)',
            }}
          >
            Mouhamed <br />
            Amine Paré
          </motion.h1>

          {/* Dynamic Motion Role Switcher */}
          <div className="min-h-[2.75rem] sm:h-12 flex items-center mb-3 sm:mb-6 overflow-hidden">
            <motion.div
              key={currentRoleIndex + lang}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-2 text-sm sm:text-xl font-mono text-[#3B82F6] font-semibold leading-snug"
            >
              <Code size={18} className="shrink-0 text-clay mt-0.5" />
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
              "Développeur Fullstack, Architecte Systèmes & Visionnaire IA. E-commerce, Mobile Money et automatisations IA sécurisées — du concept stratégique au déploiement global.",
              "Fullstack Developer, Systems Architect & AI Visionary. E-commerce, Mobile Money and secure AI automations — from strategic concept to global deployment."
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
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-black font-bold px-5 py-3 sm:px-7 sm:py-4 text-xs sm:text-sm shadow-[0_10px_25px_rgba(59, 130, 246,0.4)] hover:shadow-[0_15px_35px_rgba(59, 130, 246,0.6)] hover:scale-105 transition-all duration-300"
            >
              <span>{t('Voir mes projets', 'See my projects')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 rounded-full bg-surface/80 hover:bg-surface border border-slate-900/20 hover:border-clay/50 text-slate-900 px-5 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium transition-all backdrop-blur-md hover:scale-105"
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
              className="inline-flex items-center gap-1.5 text-xs text-slate-900/70 hover:text-slate-900 transition-colors border border-slate-900/10 hover:border-slate-900/30 rounded-full px-3 py-2.5 sm:px-4 sm:py-3.5"
            >
              <Download size={14} /> CV PDF
            </a>
          </motion.div>

          {/* Tech stack — badges pilules */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 sm:mt-7 flex flex-wrap gap-1.5 sm:gap-2"
          >
            {[
              { n: 'React 18', logo: SiReact },
              { n: 'Node.js', logo: SiNodedotjs },
              { n: 'Python', logo: SiPython },
              { n: 'OWASP', logo: SiOwasp },
              { n: 'Go', logo: SiGo },
              { n: 'PHP', logo: SiPhp },
              { n: 'Supabase', logo: SiSupabase },
              { n: 'Mobile Money', logo: Zap },
              { n: 'WhatsApp API', logo: SiWhatsapp },
            ].map((tech, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white border border-slate-900/10 text-slate-900/90 text-[11px] sm:text-xs font-semibold shadow-sm hover:border-[#3B82F6]/50 hover:shadow-md transition-all"
              >
                <tech.logo size={13} className="text-clay/70 shrink-0" />
                {tech.n}
              </span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN: PHOTO WITH ICON RING */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[260px] sm:max-w-none mx-auto"
          >
            <HeroPhotoRing />
          </motion.div>
        </div>
      </div>

      {/* BOTTOM TICKER / SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 w-full max-w-[1320px] mx-auto pt-4 sm:pt-6 border-t border-slate-900/10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-slate-900/60"
      >
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 w-full md:w-auto">
          <span className="flex items-center gap-1.5 text-slate-900 bg-slate-900/5 sm:bg-transparent p-2 sm:p-0 rounded-xl border border-slate-900/5 sm:border-none">
            <span className="text-[#3B82F6] font-bold">3+</span> {t("Années Expérience", "Years Experience")}
          </span>
          <span className="flex items-center gap-1.5 text-slate-900 bg-slate-900/5 sm:bg-transparent p-2 sm:p-0 rounded-xl border border-slate-900/5 sm:border-none">
            <span className="text-[#3B82F6] font-bold">12+</span> {t("Projets Livrés", "Projects Delivered")}
          </span>
          <span className="col-span-2 sm:col-span-1 flex items-center gap-1.5 text-slate-900 bg-slate-900/5 sm:bg-transparent p-2 sm:p-0 rounded-xl border border-slate-900/5 sm:border-none justify-center sm:justify-start">
            <span className="text-[#3B82F6] font-bold">100%</span> {t("Créateur Digital & Autodidacte", "Digital Creator & Self-Taught")}
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
