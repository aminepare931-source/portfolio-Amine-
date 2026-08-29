import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { EASE_OUT, EASE_INOUT } from '../lib/anim'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('ad_preloaded')) {
      setDone(true)
      return
    }
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem('ad_preloaded', '1')
        setTimeout(() => setDone(true), 250)
      },
    })
    return () => controls.stop()
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_INOUT }}
          className="fixed inset-0 z-[200] bg-govDark flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="w-14 h-14 rounded-sm bg-white text-gov flex items-center justify-center font-display text-lg font-bold mb-6"
          >
            AD
          </motion.div>

          <div className="w-40 h-px bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="text-white/60 text-xs font-mono mt-3 tabular-nums">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
