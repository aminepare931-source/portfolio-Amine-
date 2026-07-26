import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Shield, Zap, ArrowRight, Code } from 'lucide-react'
import { VIDEOS } from '../config/videos'
import { useLanguage } from '../context/LanguageContext'
import { playClickSound } from '../lib/sound'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [bootStep, setBootStep] = useState(0)
  const { t } = useLanguage()

  const BOOT_LOGS = [
    t('[01/04] INITIALISATION DU NOYAU ARCHITECTURE... OK', '[01/04] INITIALIZING CORE ARCHITECTURE... OK'),
    t('[02/04] VÉRIFICATION SÉCURITÉ OWASP & AUTH JWT... SECURE', '[02/04] CHECKING OWASP SECURITY & JWT AUTH... SECURE'),
    t('[03/04] CHARGEMENT MODULES MOBILE MONEY & IA... READY', '[03/04] LOADING MOBILE MONEY & AI MODULES... READY'),
    t('[04/04] SYSTÈME OPÉRATIONNEL. LANCEMENT DE L\'INTERFACE...', '[04/04] SYSTEM READY. LAUNCHING PORTFOLIO...'),
  ]

  useEffect(() => {
    const start = performance.now()
    const duration = 2600 // Smooth, responsive 2.6s total duration
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      const currentPct = Math.floor(progress * 100)
      setCount(currentPct)

      // Step log progression based on progress %
      if (progress < 0.25) setBootStep(0)
      else if (progress < 0.55) setBootStep(1)
      else if (progress < 0.85) setBootStep(2)
      else setBootStep(3)

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 250)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050403] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Background High-Tech Layer */}
      <div className="absolute inset-0 bg-[#050403]" />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none"
        src={VIDEOS.loadingScreen}
      />

      {/* Cyber Gradient Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050403]/90 via-[#050403]/70 to-[#050403]/95 pointer-events-none" />

      {/* Grid Pattern Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black border border-[#FF5A1F]/50 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-full h-full object-cover rounded-full scale-110" />
          </div>
          <div>
            <div className="font-display text-sm tracking-wider text-white">
              AMINE<span className="text-[#FF5A1F]">.</span>DEV
            </div>
            <div className="text-[10px] font-mono text-white/50 uppercase">
              {t('System Boot v3.2 · Bobo-Dioulasso 🇧🇫', 'System Boot v3.2 · Bobo-Dioulasso 🇧🇫')}
            </div>
          </div>
        </div>

        {/* Skip button for instant enter */}
        <button
          onClick={() => {
            playClickSound()
            onComplete()
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#FF5A1F] hover:text-black border border-white/15 hover:border-[#FF5A1F] text-xs font-mono font-bold transition-all backdrop-blur-md cursor-pointer group"
        >
          <span>{t('Accéder au portfolio', 'Skip Intro')}</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* CENTER HERO DISPLAY */}
      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6 my-auto">
        {/* Pulsing Central Logo Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-flex items-center justify-center mb-2"
        >
          <div className="absolute inset-0 rounded-full bg-[#FF5A1F]/20 blur-2xl animate-pulse" />
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/80 border-2 border-[#FF5A1F] flex items-center justify-center shadow-[0_0_30px_rgba(255,90,31,0.5)]">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full scale-125" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-clay text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
            <Zap size={12} className="text-[#FF5A1F]" /> {t('Portfolio Créateur Digital & Fullstack', 'Fullstack & Digital Creator Portfolio')}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-white tracking-tight">
            MOUHAMED AMINE PARÉ<span className="text-[#FF5A1F]">.</span>
          </h1>
        </motion.div>

        {/* High-Tech Terminal Status Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/70 border border-white/10 rounded-2xl p-4 sm:p-5 text-left font-mono text-xs backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-white/10 pb-2 mb-3">
            <span className="flex items-center gap-1.5 text-clay">
              <Terminal size={12} /> {t('Console d\'initialisation', 'Initialization Console')}
            </span>
            <span className="text-emerald-400 font-bold">STATUS: RUNNING</span>
          </div>

          <div className="h-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={bootStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="text-[#FF5A1F] font-semibold text-xs sm:text-sm flex items-center gap-2"
              >
                <Code size={14} className="shrink-0 text-white/70" />
                <span>{BOOT_LOGS[bootStep]}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM COUNTER & PROGRESS LASER */}
      <div className="relative z-10 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
        <div>
          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">{t('Progression', 'Loading')}</div>
          <div className="text-xs font-mono text-clay">{t('Chargement des ressources...', 'Loading assets...')}</div>
        </div>

        <div className="font-display text-4xl sm:text-6xl text-white font-bold tabular-nums tracking-wider">
          {String(count).padStart(3, '0')}<span className="text-[#FF5A1F] text-2xl sm:text-3xl">%</span>
        </div>
      </div>

      {/* High-Precision Bottom Laser Loading Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/10 z-30">
        <div
          className="h-full bg-gradient-to-r from-[#FF5A1F] via-[#ff8a52] to-[#FF5A1F] transition-all duration-75 shadow-[0_0_12px_#FF5A1F]"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  )
}
