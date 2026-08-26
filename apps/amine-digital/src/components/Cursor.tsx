import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 38, mass: 0.7 })
  const ringY = useSpring(y, { stiffness: 380, damping: 38, mass: 0.7 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      setHovering(!!(e.target as HTMLElement).closest('a, button, [data-hover]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2 w-2 rounded-full bg-gray-900 mix-blend-difference"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 2.3 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[299] h-8 w-8 rounded-full border border-gray-900 mix-blend-difference"
      />
    </>
  )
}
