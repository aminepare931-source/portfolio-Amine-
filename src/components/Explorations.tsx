import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ITEMS = [
  { src: '/assets/hero.jpg', bg: '#2a1509', label: 'Portrait professionnel' },
  { src: '/assets/about1.jpg', bg: '#1c1006', label: 'Style décontracté' },
  { src: '/assets/about2.jpg', bg: '#241505', label: 'Tenue traditionnelle' },
  { src: '/assets/about1.jpg', bg: '#171310', label: 'Amine.Dev' },
]

export default function Explorations() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function navigate(dir: 'next' | 'prev') {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % ITEMS.length : (prev + ITEMS.length - 1) % ITEMS.length))
    timeoutRef.current = setTimeout(() => setIsAnimating(false), 650)
  }
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const n = ITEMS.length
  const center = activeIndex
  const left = (activeIndex + n - 1) % n
  const right = (activeIndex + 1) % n
  const back = (activeIndex + 2) % n

  const roleStyle = (role: 'center' | 'left' | 'right' | 'back'): CSSProperties => {
    const base: CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.7 / 1',
      transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'transform, filter, opacity',
    }
    if (role === 'center') return { ...base, left: '50%', bottom: isMobile ? '14%' : '6%', height: isMobile ? '58%' : '82%', transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.15})`, filter: 'blur(0px)', opacity: 1, zIndex: 20 }
    if (role === 'left') return { ...base, left: isMobile ? '14%' : '22%', bottom: isMobile ? '22%' : '14%', height: isMobile ? '20%' : '32%', transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.75, zIndex: 10 }
    if (role === 'right') return { ...base, left: isMobile ? '86%' : '78%', bottom: isMobile ? '22%' : '14%', height: isMobile ? '20%' : '32%', transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.75, zIndex: 10 }
    return { ...base, left: '50%', bottom: isMobile ? '22%' : '14%', height: isMobile ? '15%' : '24%', transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 0.9, zIndex: 5 }
  }

  const roleFor = (i: number) => i === center ? 'center' : i === left ? 'left' : i === right ? 'right' : 'back'

  return (
    <section
      id="galerie"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: ITEMS[activeIndex].bg, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)' }}
    >
      <div className="relative w-full" style={{ height: isMobile ? '62vh' : '92vh', minHeight: isMobile ? 440 : 560, overflow: 'hidden' }}>

        {/* Ghost watermark */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap"
          style={{ top: '14%', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(70px, 22vw, 320px)', color: '#fff', opacity: 0.06, letterSpacing: '-0.02em', lineHeight: 1, zIndex: 2 }}
        >
          GALERIE
        </div>

        {/* Brand label */}
        <div className="absolute top-6 left-4 sm:left-8 z-[60] text-xs font-semibold uppercase text-white/90" style={{ letterSpacing: '0.18em' }}>
          Amine.Dev
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {ITEMS.map((it, i) => (
            <div key={i} style={roleStyle(roleFor(i))}>
              <img
                src={it.src} alt={it.label} draggable={false}
                className="w-full h-full rounded-2xl"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          ))}
        </div>

        {/* Bottom-left caption + nav */}
        <div className="absolute bottom-6 left-4 sm:bottom-16 sm:left-10 z-[60]" style={{ maxWidth: 320 }}>
          <p className="uppercase font-bold mb-2 sm:mb-3 text-base sm:text-xl text-white/95" style={{ letterSpacing: '0.02em' }}>
            {ITEMS[activeIndex].label}
          </p>
          <p className="hidden sm:block text-xs sm:text-sm text-white/75 leading-relaxed mb-5">
            Portraits, style, racines — un aperçu d'Amine derrière l'écran de code.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/70 text-white flex items-center justify-center hover:scale-105 hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={22} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/70 text-white flex items-center justify-center hover:scale-105 hover:bg-white/10 transition-all"
            >
              <ArrowRight size={22} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <Link
          to="/projets"
          className="absolute bottom-6 right-4 sm:bottom-16 sm:right-10 z-[60] flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(18px, 3.5vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          Voir mes projets
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </Link>
      </div>
    </section>
  )
}
