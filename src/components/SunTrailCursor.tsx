import { useEffect, useRef } from 'react'

interface Particle { x: number; y: number; life: number; r: number }

export default function SunTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouse = useRef({ x: -999, y: -999 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch devices
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          life: 1,
          r: Math.random() * 3 + 1.5,
        })
      }
      if (particles.current.length > 140) particles.current.splice(0, particles.current.length - 140)
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const colors = ['255,90,31', '232,201,122', '201,90,50', '255,170,60']
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach((p) => {
        p.life -= 0.022
        p.y -= 0.3
        const c = colors[Math.floor(p.life * 3.9) % colors.length]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c},${Math.max(0, p.life * 0.55)})`
        ctx.fill()
      })
      particles.current = particles.current.filter((p) => p.life > 0)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 pointer-events-none z-[60] mix-blend-screen"
    />
  )
}
