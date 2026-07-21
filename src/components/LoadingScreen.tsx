import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { VIDEOS } from '../config/videos'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2400
    let raf: number
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.floor(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onComplete, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg overflow-hidden">
      {/* Video background */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.6 }} src={VIDEOS.loadingScreen} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #070b0a 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, #070b0a 0%, transparent 40%)' }} />

      {/* Grid lines (desktop only) */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px bg-white/10" />
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />
      <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-px bg-white/10" />

      {/* Central glow */}
      <svg className="absolute inset-x-0 top-0 w-full h-[60vh] pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
        <defs>
          <filter id="loader-glow"><feGaussianBlur stdDeviation="25" /></filter>
        </defs>
        <ellipse cx="500" cy="120" rx="380" ry="140" fill="#FF5A1F" opacity="0.18" filter="url(#loader-glow)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Liquid glass floating card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: -50 }} transition={{ duration: 0.7 }}
          className="liquid-glass-strong rounded-2xl w-[200px] p-4 flex flex-col items-center justify-center text-center mb-2"
        >
          <span className="text-[10px] font-mono text-clay tracking-widest mb-2">[ 2026 ]</span>
          <p className="text-[13px] text-white leading-snug mb-1">
            Conçu par un <span className="font-serif italic text-clay">développeur</span> autodidacte
          </p>
          <p className="text-[10px] text-white/50">Bobo-Dioulasso, Burkina Faso</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: '#FF5A1F' }}
        >
          Portfolio en chargement
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
          className="uppercase font-black tracking-tight text-white leading-[0.95]"
          style={{ fontSize: 'clamp(34px, 7vw, 68px)' }}
        >
          Bienvenue chez amine<span style={{ color: '#FF5A1F' }}>.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[13px] text-white/60 max-w-md mt-4"
        >
          Frontend, backend, design et automatisation — un digital complet, du concept au déploiement.
        </motion.p>

        {/* Counter */}
        <div className="mt-8 font-display text-4xl md:text-5xl text-white tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <div
          className="h-full origin-left transition-transform duration-100"
          style={{ transform: `scaleX(${count / 100})`, background: '#FF5A1F', boxShadow: '0 0 8px rgba(255,90,31,0.5)' }}
        />
      </div>
    </div>
  )
}
