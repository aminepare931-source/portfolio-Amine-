import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Bâtir', 'Créer', 'Servir']

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    let raf: number
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setCount(Math.floor(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onComplete, 350)
    }
    raf = requestAnimationFrame(tick)
    const wordTimer = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 750)
    return () => { cancelAnimationFrame(raf); clearInterval(wordTimer) }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10">
      <motion.div
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio — Bobo-Dioulasso
      </motion.div>

      <div className="flex items-end justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIdx}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-text/80"
          >
            {WORDS[wordIdx]}
          </motion.div>
        </AnimatePresence>
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
      </div>

      <div className="h-[3px] w-full bg-stroke/50 relative overflow-hidden">
        <div
          className="h-full accent-gradient origin-left transition-transform duration-100"
          style={{ transform: `scaleX(${count / 100})`, boxShadow: '0 0 8px rgba(255,90,31,0.4)' }}
        />
      </div>
    </div>
  )
}
