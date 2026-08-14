import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const start = performance.now()
    const duration = 1600
    let raf: number

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setCount(Math.floor(progress * 100))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0e16] flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-16 h-16 rounded-full bg-black border-2 border-clay overflow-hidden flex items-center justify-center"
      >
        <img src="/assets/logo.png" alt="Amine.Dev" className="w-full h-full object-cover scale-125" />
      </motion.div>

      <div className="font-display text-lg tracking-wider text-white">
        AMINE<span className="text-clay">.</span>DEV
      </div>

      <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-clay transition-all duration-75"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  )
}
