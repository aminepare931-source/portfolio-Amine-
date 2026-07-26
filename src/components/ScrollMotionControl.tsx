import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Zap, Terminal, Keyboard, ArrowUp } from 'lucide-react'
import { toggleSound, isSoundEnabled, playClickSound } from '../lib/sound'

interface ScrollMotionControlProps {
  onOpenRecruiter: () => void
  onOpenTerminal: () => void
}

export default function ScrollMotionControl({
  onOpenRecruiter,
  onOpenTerminal,
}: ScrollMotionControlProps) {
  const [autoScrolling, setAutoScrolling] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [soundOn, setSoundOn] = useState(isSoundEnabled())
  const [showHotkeys, setShowHotkeys] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Track scroll progress & handle Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll logic
  useEffect(() => {
    let scrollInterval: ReturnType<typeof setInterval>

    if (autoScrolling) {
      scrollInterval = setInterval(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        if (window.scrollY >= maxScroll - 10) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.scrollBy({ top: 1.5, behavior: 'auto' })
        }
      }, 20)
    }

    return () => clearInterval(scrollInterval)
  }, [autoScrolling])

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      const key = e.key.toLowerCase()

      if (key === 't' || key === 'c') {
        e.preventDefault()
        playClickSound()
        onOpenTerminal()
      } else if (key === 'm' || key === 'r') {
        e.preventDefault()
        playClickSound()
        onOpenRecruiter()
      } else if (key === 's') {
        e.preventDefault()
        const newState = toggleSound()
        setSoundOn(newState)
        if (newState) playClickSound()
      } else if (key === 'a') {
        e.preventDefault()
        playClickSound()
        setAutoScrolling((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onOpenTerminal, onOpenRecruiter])

  const handleToggleSound = () => {
    const newState = toggleSound()
    setSoundOn(newState)
    if (newState) playClickSound()
  }

  const handleToggleAutoScroll = () => {
    playClickSound()
    setAutoScrolling(!autoScrolling)
  }

  const scrollToTop = () => {
    playClickSound()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Top Motion Scroll Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-white/10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#FF5A1F] via-[#E8C97A] to-[#FF5A1F] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating 2026 Interactive Controls Dock (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2">

        {/* Back To Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              title="Retour en haut"
              className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-clay hover:text-black transition-all shadow-lg"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Dock */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#080706]/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">

          {/* Auto-Scroll Button */}
          <button
            onClick={handleToggleAutoScroll}
            className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-full transition-all ${
              autoScrolling
                ? 'bg-[#FF5A1F] text-black shadow-[0_0_15px_rgba(255,90,31,0.6)] animate-pulse'
                : 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10'
            }`}
            title="Activer/Désactiver le défilement automatique (Touche [A])"
          >
            {autoScrolling ? <Pause size={13} /> : <Play size={13} />}
            <span className="hidden sm:inline">{autoScrolling ? 'Scroll On' : 'Auto-Scroll'}</span>
          </button>

          {/* Recruiter Pitch Shortcut */}
          <button
            onClick={() => {
              playClickSound()
              onOpenRecruiter()
            }}
            title="Pitch Recruteur 30s (Touche [M])"
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-clay/20 text-clay hover:text-white border border-clay/30 transition-colors font-semibold"
          >
            <Zap size={13} /> <span className="hidden md:inline">Pitch</span>
          </button>

          {/* Terminal CLI Shortcut */}
          <button
            onClick={() => {
              playClickSound()
              onOpenTerminal()
            }}
            title="Terminal CLI (Touche [T])"
            className="p-2 rounded-full text-white/70 hover:text-clay hover:bg-white/10 transition-colors"
          >
            <Terminal size={15} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Désactiver le son (Touche [S])' : 'Activer le son (Touche [S])'}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {soundOn ? <Volume2 size={15} className="text-clay" /> : <VolumeX size={15} />}
          </button>

          {/* Keyboard Shortcuts Dialog Toggle */}
          <button
            onClick={() => {
              playClickSound()
              setShowHotkeys(!showHotkeys)
            }}
            title="Raccourcis clavier"
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Keyboard size={15} />
          </button>
        </div>
      </div>

      {/* Hotkeys Modal */}
      <AnimatePresence>
        {showHotkeys && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHotkeys(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 w-full max-w-sm bg-[#0a0e18] border border-clay/40 rounded-2xl p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display text-lg text-clay flex items-center gap-2">
                  <Keyboard size={18} /> Raccourcis Clavier 2026
                </h3>
                <button
                  onClick={() => setShowHotkeys(false)}
                  className="text-xs text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Terminal CLI :</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-clay font-bold">[T] ou [C]</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Pitch Recruteur :</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-clay font-bold">[M] ou [R]</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Activer/Couper Son :</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-clay font-bold">[S]</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Auto-Scroll Mode :</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-clay font-bold">[A]</span>
                </div>
              </div>

              <button
                onClick={() => setShowHotkeys(false)}
                className="w-full bg-clay text-black font-bold py-2 rounded-xl text-xs hover:opacity-90"
              >
                Compris
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
