import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown, MoreHorizontal } from 'lucide-react'
import { SiReact, SiTypescript, SiNodedotjs } from 'react-icons/si'
import PythonLogo from './icons/PythonLogo'
import Hero3D from './Hero3D'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

function scrollToNext() {
  const el = document.getElementById('hero')
  const next = el?.nextElementSibling
  next?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HeroDesktop() {
  const { t } = useLanguage()

  return (
    <div className="hidden lg:block relative w-full min-h-[600px] h-full">
      {/* Full-card backdrop — blue glow concentrated behind the centered photo,
          fading to the card's base dark color on both sides for symmetry */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 80% at 50% 38%, #0c3d7a 0%, #0a2550 30%, #071530 55%, #05070d 80%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none mix-blend-screen z-[1]">
        <div
          className="absolute left-[31%] top-0 w-40 h-full -rotate-[9deg] blur-2xl opacity-90"
          style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.9), rgba(59,130,246,0) 70%)' }}
        />
        <div
          className="absolute left-[47%] -top-10 w-20 h-[130%] rotate-[6deg] blur-xl opacity-80"
          style={{ background: 'linear-gradient(180deg, rgba(147,197,253,0.9), rgba(147,197,253,0) 60%)' }}
        />
        <div
          className="absolute right-[31%] top-0 w-36 h-full rotate-[9deg] blur-2xl opacity-85"
          style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.85), rgba(37,99,235,0) 68%)' }}
        />
      </div>

      {/* Symmetric 3-column grid: text | photo (centered, fixed width) | 3D animation */}
      <div className="relative z-10 grid grid-cols-[1fr_minmax(260px,320px)_1fr] items-center h-full min-h-[600px] gap-6 px-10 xl:px-14 py-12">
        {/* TEXT COLUMN */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/70 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            {t('Développeur Fullstack', 'Fullstack Developer')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-5xl xl:text-6xl leading-[1.05] tracking-tight mb-5"
          >
            Mouhamed <br />
            Amine <span className="text-[#3B82F6]">Paré.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base text-white/60 max-w-sm mb-9 leading-relaxed"
          >
            {t(
              'Je crée des solutions web modernes et performantes pour transformer des idées en produits concrets.',
              'I build modern, high-performance web solutions that turn ideas into real products.'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex items-center gap-4 mb-12"
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
              <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
                {t('Scroll', 'Scroll')}
              </span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2.5"
          >
            {[
              { Icon: SiReact, bg: '#0b1324', iconColor: '#61DAFB', border: 'border-[#61DAFB]/30' },
              { Icon: SiTypescript, bg: '#2563eb', iconColor: '#ffffff', border: 'border-white/10' },
              { Icon: SiNodedotjs, bg: '#0b1324', iconColor: '#4ADE80', border: 'border-[#4ADE80]/30' },
              { Icon: null, bg: '#0b1324', iconColor: undefined, border: 'border-white/10' },
            ].map(({ Icon, bg, iconColor, border }, i) => (
              <span
                key={i}
                className={`flex items-center justify-center w-10 h-10 rounded-xl border ${border} shadow-lg hover:scale-105 transition-transform`}
                style={{ backgroundColor: bg }}
              >
                {Icon ? <Icon size={16} color={iconColor} /> : <PythonLogo size={18} />}
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

        {/* PHOTO COLUMN — centered, recropped to its own narrower column */}
        <div className="relative h-full flex items-end justify-center">
          {/* "01 / 03" index, centered above the photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center font-mono text-xs"
          >
            <span className="text-[#3B82F6] font-bold text-sm">01</span>
            <span className="w-px h-6 bg-white/25 my-1" />
            <span className="text-white/35">/03</span>
          </motion.div>

          {/* Decorative floating glass panels */}
          <div className="absolute -left-4 top-[30%] w-14 h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm rotate-[8deg]" />
          <div className="absolute -right-6 top-[48%] w-11 h-14 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm -rotate-6" />

          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            src="/assets/hero-cutout.png"
            alt="Mouhamed Amine Paré"
            className="relative z-[2] h-[90%] w-auto object-contain object-bottom"
          />

          {/* Soft ground shadow under the portrait */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-10 rounded-full bg-black/40 blur-xl" />
        </div>

        {/* 3D COLUMN — abstract animated shape standing in for the old stack card */}
        <div className="h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full h-[240px] xl:h-[280px]"
          >
            <Hero3D />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-2 bg-[#0a0f1e]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3.5 shadow-xl"
          >
            <ul className="space-y-1.5 text-xs font-mono text-white/80">
              {['React', 'Node.js', 'TypeScript', 'Python'].map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
