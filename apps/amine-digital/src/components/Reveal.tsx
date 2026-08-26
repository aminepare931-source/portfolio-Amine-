import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/anim'

export function Line({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.05, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Fade({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  )
}

// Alias par défaut pour compatibilité avec l'usage existant (équivalent à Fade)
export default function Reveal(props: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return <Fade {...props} />
}
