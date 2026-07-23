import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VIDEOS } from '../config/videos'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // La vidéo joue seule ~1.4s avant que le texte apparaisse
    const textTimer = setTimeout(() => setShowText(true), 1400)

    const start = performance.now()
    const duration = 3200
    let raf: number
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.floor(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onComplete, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(textTimer) }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Vidéo nette, sans recadrage ni zoom (source portrait) */}
      <div className="absolute inset-0 bg-black" />
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-contain"
        src={VIDEOS.loadingScreen}
      />

      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,7,6,0.35) 0%, rgba(8,7,6,0.75) 100%)' }} />

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: '#FF5A1F', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                Portfolio en chargement
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                className="uppercase font-black tracking-tight text-white leading-[0.95]"
                style={{ fontSize: 'clamp(34px, 7vw, 68px)', textShadow: '0 4px 20px rgba(0,0,0,0.85)' }}
              >
                Bienvenue chez amine<span style={{ color: '#FF5A1F' }}>.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[13px] text-white max-w-md mt-4"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
              >
                Frontend, backend, design et automatisation — un digital complet, du concept au déploiement.
              </motion.p>

              <div className="mt-8 font-display text-4xl md:text-5xl text-white tabular-nums" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
                {String(count).padStart(3, '0')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar toujours visible dès le début */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div
          className="h-full origin-left transition-transform duration-100"
          style={{ transform: `scaleX(${count / 100})`, background: '#FF5A1F', boxShadow: '0 0 8px rgba(255,90,31,0.5)' }}
        />
      </div>
    </div>
  )
}
