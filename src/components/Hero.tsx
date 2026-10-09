import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, MoreHorizontal } from 'lucide-react'
import { SiReact, SiTypescript, SiJavascript, SiPython } from 'react-icons/si'
import HeroPhotoDark from './HeroPhotoDark'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  function scrollToNext() {
    const el = document.getElementById('hero')
    const next = el?.nextElementSibling
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#05070d] text-white grid lg:grid-cols-2"
    >
      {/* LEFT: TEXT CONTENT */}
      <div className="relative z-10 flex flex-col justify-center order-2 lg:order-1 px-5 sm:px-10 lg:pl-20 lg:pr-10 pt-6 pb-12 lg:py-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/70 mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
          {t('Développeur Fullstack', 'Fullstack Developer')}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4 sm:mb-5"
        >
          Mouhamed <br />
          Amine <span className="text-[#3B82F6]">Paré.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-sm sm:text-base text-white/60 max-w-sm mb-7 sm:mb-9 leading-relaxed"
        >
          {t(
            'Je crée des solutions web modernes et performantes pour transformer des idées en produits concrets.',
            'I build modern, high-performance web solutions that turn ideas into real products.'
          )}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center gap-4 mb-9 sm:mb-12"
        >
          <Link
            to="/projets"
            onClick={playClickSound}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-bold px-6 py-3.5 text-sm shadow-[0_10px_25px_rgba(59,130,246,0.35)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.55)] hover:scale-105 transition-all duration-300"
          >
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            <span>{t('Voir mes projets', 'See my projects')}</span>
          </Link>

          <button
            onClick={scrollToNext}
            aria-label={t('Défiler', 'Scroll down')}
            className="group flex items-center gap-2.5 text-white/50 hover:text-white transition-colors"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 group-hover:border-white/40 transition-colors">
              <ArrowDown size={16} className="animate-bounce" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] hidden sm:inline">
              {t('Scroll', 'Scroll')}
            </span>
          </button>
        </motion.div>

        {/* Tech icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2.5"
        >
          {[SiReact, SiTypescript, SiJavascript, SiPython].map((Icon, i) => (
            <span
              key={i}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 transition-colors"
            >
              <Icon size={16} className="text-white/80" />
            </span>
          ))}
          <Link
            to="/competences"
            onClick={playClickSound}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#3B82F6]/50 transition-colors text-white/60 hover:text-white"
            aria-label={t('Voir toutes les compétences', 'See all skills')}
          >
            <MoreHorizontal size={16} />
          </Link>
        </motion.div>
      </div>

      {/* RIGHT: PHOTO */}
      <div className="relative order-1 lg:order-2 h-[50vh] sm:h-[58vh] lg:h-auto">
        <HeroPhotoDark />
      </div>
    </section>
  )
}
