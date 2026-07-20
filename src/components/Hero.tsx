import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ROLES = ['Développeur', 'Designer', 'Créateur', 'Autodidacte']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/bg.mp4"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs text-muted uppercase tracking-[0.3em] mb-8"
        >
          Disponible pour missions · Bobo-Dioulasso 🇧🇫
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-2"
        >
          AMINE<span className="text-clay">.</span>DEV
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-xs text-muted font-mono tracking-wide mb-6"
        >
          Amine Paré — Bobo-Dioulasso, Burkina Faso
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-sm md:text-base text-muted mb-4"
        >
          Un{' '}
          <span key={roleIdx} className="font-serif italic text-text animate-role-fade-in inline-block">
            {ROLES[roleIdx]}
          </span>{' '}
          digital complet — et bien plus, pour l'Afrique.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed"
        >
          Expériences digitales complètes, du concept au déploiement — développement, design, marketing, contenu et automatisation, pensés pour l'Afrique.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="inline-flex flex-col sm:flex-row gap-4"
        >
          <Link to="/projets" className="rounded-full bg-text text-bg px-7 py-3.5 text-sm font-medium hover:scale-105 transition-transform">
            Voir mes projets
          </Link>
          <Link to="/contact" className="rounded-full border-2 border-stroke px-7 py-3.5 text-sm font-medium hover:border-clay transition-colors">
            Me contacter
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-clay animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}
