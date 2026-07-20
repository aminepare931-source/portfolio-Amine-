import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ReactNode } from 'react'

export default function Reveal({
  children, delay = 0, y = 30, className = '',
}: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
