import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FlipCard from './FlipCard'
import { VIDEOS } from '../config/videos'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden" style={{ minHeight: "100dvh" }}>
      <div className="absolute inset-0 bg-black" />
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-contain"
        src={VIDEOS.hero}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,7,6,0.5) 0%, rgba(8,7,6,0.6) 100%)' }} />

      <div className="relative z-10 min-h-screen grid md:grid-cols-2 items-center gap-10 px-6 md:px-10 lg:px-16 pt-28 pb-16">
        {/* LEFT — texte */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-xs text-muted uppercase tracking-[0.3em] mb-6"
          >
            Disponible pour missions · Bobo-Dioulasso 🇧🇫
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight mb-3 text-white"
          >
            Mouhamed Amine Paré
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
            className="text-base md:text-lg text-clay font-medium mb-5"
          >
            Développeur Fullstack &amp; Créateur Digital
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="text-sm md:text-base text-muted max-w-md mb-10 leading-relaxed"
          >
            Je conçois et développe des applications web évolutives qui résolvent des problèmes concrets —
            du code au design, du marketing à l'automatisation. Basé à Bobo-Dioulasso, Burkina Faso 🇧🇫,
            animé par une vision qui transforme les défis locaux en opportunités numériques.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="inline-flex flex-col sm:flex-row gap-4"
          >
            <div className="btn-border-wrap">
              <Link to="/projets" className="relative block rounded-full bg-text text-bg px-7 py-3.5 text-sm font-medium hover:scale-105 transition-transform text-center">
                Explorer les projets
              </Link>
            </div>
            <a href="/assets/cv.pdf" target="_blank" rel="noopener" className="rounded-full border-2 border-stroke px-7 py-3.5 text-sm font-medium hover:border-clay transition-colors text-center">
              Voir le CV
            </a>
          </motion.div>
        </div>

        {/* RIGHT — carte à retournement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
        >
          <FlipCard />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-clay animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
