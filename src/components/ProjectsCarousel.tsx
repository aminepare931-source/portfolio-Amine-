import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { fetchProjects, Project } from '../lib/supabase'
import Reveal from './Reveal'

function darken(hex: string, amount = 0.85) {
  try {
    const r = Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount))
    const g = Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount))
    const b = Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount))
    return `rgb(${r},${g},${b})`
  } catch { return '#111' }
}

export default function ProjectsCarousel() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => setError(true))
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function navigate(dir: 'next' | 'prev') {
    if (isAnimating || !projects || projects.length < 2) return
    setIsAnimating(true)
    setActiveIndex((prev) => (dir === 'next' ? (prev + 1) % projects.length : (prev + projects.length - 1) % projects.length))
    timeoutRef.current = setTimeout(() => setIsAnimating(false), 650)
  }
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const n = projects?.length || 0
  const center = activeIndex
  const left = n ? (activeIndex + n - 1) % n : 0
  const right = n ? (activeIndex + 1) % n : 0
  const back = n ? (activeIndex + 2) % n : 0

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

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16 text-center text-muted text-sm border border-dashed border-stroke rounded-3xl">
        Impossible de charger les projets.
      </div>
    )
  }
  if (!projects) {
    return <div className="max-w-[1200px] mx-auto px-6 py-24 h-[60vh] rounded-3xl bg-surface border border-stroke shimmer relative overflow-hidden" />
  }
  if (projects.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-16 text-center text-muted text-sm border border-dashed border-stroke rounded-3xl">
        🚀 Les projets arrivent bientôt...
      </div>
    )
  }

  const active = projects[activeIndex]
  const bg = darken(active.color || '#FF5A1F', 0.88)

  return (
    <Reveal>
      <section
        className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[40px]"
        style={{ backgroundColor: bg, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)' }}
      >
        <div className="relative w-full" style={{ height: isMobile ? '80vh' : '90vh', minHeight: 560, maxHeight: 780, overflow: 'hidden' }}>

          {/* Ghost watermark */}
          <div
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap px-6"
            style={{ top: '14%', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(60px, 18vw, 260px)', color: '#fff', opacity: 0.06, letterSpacing: '-0.02em', lineHeight: 1, zIndex: 2 }}
          >
            PROJETS
          </div>

          <div className="absolute top-6 left-4 sm:left-8 z-[60] text-xs font-semibold uppercase text-white/90" style={{ letterSpacing: '0.18em' }}>
            Amine.Dev
          </div>

          {/* Carousel cards */}
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            {projects.map((p, i) => (
              <div key={p.id} style={roleStyle(roleFor(i))}>
                {p.img ? (
                  <img src={p.img} alt={p.name} draggable={false} className="w-full h-full rounded-2xl" style={{ objectFit: 'cover' }} />
                ) : (
                  <div
                    className="w-full h-full rounded-2xl flex items-center justify-center text-center px-3"
                    style={{ background: `linear-gradient(135deg, #0a0a0a 0%, ${p.color}22 100%)` }}
                  >
                    <span className="font-display text-2xl sm:text-3xl" style={{ color: p.color }}>
                      {p.emoji || p.name.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom-left caption + nav */}
          <div className="absolute bottom-6 left-4 sm:bottom-16 sm:left-10 z-[60]" style={{ maxWidth: 320 }}>
            <p className="uppercase font-bold mb-2 sm:mb-3 text-base sm:text-xl text-white/95" style={{ letterSpacing: '0.02em' }}>
              {active.name}
            </p>
            <p className="hidden sm:block text-xs sm:text-sm text-white/75 leading-relaxed mb-3">
              {active.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {(active.tags || []).slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] font-mono uppercase tracking-wide bg-white/10 text-white/80 px-2 py-0.5 rounded">{t}</span>
              ))}
            </div>
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
          {active.url ? (
            <a
              href={active.url} target="_blank" rel="noopener"
              className="absolute bottom-6 right-4 sm:bottom-16 sm:right-10 z-[60] flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(16px, 3vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              Voir le projet
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2.25} />
            </a>
          ) : (
            <a
              href="/contact"
              className="absolute bottom-6 right-4 sm:bottom-16 sm:right-10 z-[60] flex items-center gap-2 text-white/90 hover:text-white transition-colors uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(16px, 3vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              En savoir plus
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2.25} />
            </a>
          )}
        </div>
      </section>
    </Reveal>
  )
}
