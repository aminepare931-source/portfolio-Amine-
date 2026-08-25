import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, MapPin, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { playClickSound } from '../lib/sound'
import { Project } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

function statusMeta(status: Project['status'], t: (fr: string, en: string) => string) {
  switch (status) {
    case 'in_progress': return { label: t('En cours', 'In progress'), dot: '#eab308' }
    case 'paused': return { label: t('En pause', 'Paused'), dot: '#f97316' }
    case 'done': return { label: t('Terminé', 'Done'), dot: '#64748b' }
    case 'deployed':
    default: return { label: t('Déployé', 'Deployed'), dot: '#22c55e' }
  }
}

function tint(hex: string | undefined, fallback: string) {
  if (!hex) return fallback
  const h = hex.replace('#', '')
  if (h.length !== 6) return fallback
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, 0.06)`
}

export default function ProjectsCarousel({
  projects,
  onOpen,
  showAllLink,
}: {
  projects: Project[]
  onOpen: (p: Project) => void
  showAllLink?: boolean
}) {
  const { t } = useLanguage()
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

  useEffect(() => {
    if (projects.length < 2) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [projects.length])

  function navigate(dir: 'next' | 'prev') {
    if (isAnimating || projects.length < 2) return
    setIsAnimating(true)
    playClickSound()
    setActiveIndex((prev) =>
      dir === 'next' ? (prev + 1) % projects.length : (prev + projects.length - 1) % projects.length
    )
    timeoutRef.current = setTimeout(() => setIsAnimating(false), 600)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  if (projects.length === 0) return null

  const n = projects.length
  const center = activeIndex
  const left = (activeIndex + n - 1) % n
  const right = (activeIndex + 1) % n
  const back = (activeIndex + 2) % n

  const roleStyle = (role: 'center' | 'left' | 'right' | 'back'): CSSProperties => {
    const base: CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.7 / 1',
      transition:
        'transform 600ms cubic-bezier(0.4,0,0.2,1), filter 600ms cubic-bezier(0.4,0,0.2,1), opacity 600ms cubic-bezier(0.4,0,0.2,1), left 600ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'transform, filter, opacity',
      cursor: 'pointer',
    }
    if (role === 'center')
      return {
        ...base,
        left: '50%',
        bottom: isMobile ? '12%' : '8%',
        height: isMobile ? '56%' : '78%',
        transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.15})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
      }
    if (role === 'left')
      return {
        ...base,
        left: isMobile ? '14%' : '22%',
        bottom: isMobile ? '20%' : '14%',
        height: isMobile ? '22%' : '32%',
        transform: 'translateX(-50%) scale(0.95)',
        filter: 'blur(2px)',
        opacity: 0.7,
        zIndex: 10,
      }
    if (role === 'right')
      return {
        ...base,
        left: isMobile ? '86%' : '78%',
        bottom: isMobile ? '20%' : '14%',
        height: isMobile ? '22%' : '32%',
        transform: 'translateX(-50%) scale(0.95)',
        filter: 'blur(2px)',
        opacity: 0.7,
        zIndex: 10,
      }
    return {
      ...base,
      left: '50%',
      bottom: isMobile ? '20%' : '14%',
      height: isMobile ? '16%' : '24%',
      transform: 'translateX(-50%) scale(0.85)',
      filter: 'blur(4px)',
      opacity: 0.4,
      zIndex: 5,
    }
  }

  const roleFor = (i: number) =>
    i === center ? 'center' : i === left ? 'left' : i === right ? 'right' : n > 3 && i === back ? 'back' : null

  const activeItem = projects[activeIndex]
  const status = statusMeta(activeItem.status, t)

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: tint(activeItem.color, '#ffffff') }}
    >
      <div
        className="relative w-full"
        style={{
          height: isMobile ? '64vh' : '88vh',
          minHeight: isMobile ? 460 : 580,
          overflow: 'hidden',
        }}
      >
        {/* Ghost Background Watermark */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap text-slate-900/5 font-display"
          style={{ top: '10%', fontSize: 'clamp(60px, 18vw, 260px)', lineHeight: 1, zIndex: 2 }}
        >
          {t('PROJETS', 'PROJECTS')}
        </div>

        {/* Top Brand Tag */}
        <div className="absolute top-6 left-6 z-[60] flex items-center gap-2 text-xs font-mono uppercase text-slate-900/80 tracking-widest bg-white/70 px-3.5 py-1.5 rounded-full border border-slate-900/10 backdrop-blur-md">
          <MapPin size={13} className="text-[#3B82F6]" />
          <span>{t('Réalisations', 'Case studies')}</span>
        </div>

        {/* Status badge top-right */}
        <div className="absolute top-6 right-6 z-[60] flex items-center gap-1.5 bg-white/80 backdrop-blur-md text-[10px] font-mono font-medium px-3 py-1.5 rounded-full shadow-md border border-slate-900/10">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
          {status.label}
        </div>

        {/* 3D Carousel Stack */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {projects.map((p, i) => {
            const role = roleFor(i)
            if (!role) return null
            return (
              <div
                key={p.id}
                style={roleStyle(role)}
                onClick={() => {
                  if (i === center) {
                    playClickSound()
                    onOpen(p)
                  } else {
                    playClickSound()
                    setActiveIndex(i)
                  }
                }}
                className="group overflow-hidden rounded-3xl shadow-2xl border border-slate-900/20 bg-white relative"
              >
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    draggable={false}
                    className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-4xl font-display"
                    style={{ background: tint(p.color, '#f1f5f9') }}
                  >
                    {p.emoji || '🧩'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-40 transition-opacity" />

                {i === center && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      playClickSound()
                      onOpen(p)
                    }}
                    className="absolute top-4 right-4 bg-white/70 hover:bg-[#3B82F6] hover:text-black transition-colors text-slate-900 text-xs font-mono p-2.5 rounded-full border border-slate-900/20 backdrop-blur-md shadow-lg"
                  >
                    <Maximize2 size={14} />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Left Info & Controls */}
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 z-[60] max-w-md">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-clay uppercase tracking-widest mb-2 bg-white/60 px-3 py-1 rounded-full border border-slate-900/10 backdrop-blur-md">
            <Sparkles size={13} /> {t('Projet', 'Project')} {activeIndex + 1} / {n}
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-slate-900 mb-1 line-clamp-1">
            {activeItem.name}
          </h3>

          <p className="hidden sm:block text-xs text-slate-900/80 leading-relaxed mb-4 font-sans line-clamp-2">
            {activeItem.tagline || activeItem.description}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 rounded-full border border-slate-900/30 bg-white/60 text-slate-900 flex items-center justify-center hover:scale-105 hover:border-slate-900 transition-all backdrop-blur-md shadow-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 rounded-full border border-slate-900/30 bg-white/60 text-slate-900 flex items-center justify-center hover:scale-105 hover:border-slate-900 transition-all backdrop-blur-md shadow-lg"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Right - View All */}
        {showAllLink && (
          <Link
            to="/projets"
            onClick={playClickSound}
            className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-[60] flex items-center gap-2 text-slate-900 hover:text-[#3B82F6] transition-colors font-display text-xl sm:text-3xl uppercase"
          >
            <span>{t('Voir tous les projets', 'View all projects')}</span>
            <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </Link>
        )}
      </div>
    </section>
  )
}
