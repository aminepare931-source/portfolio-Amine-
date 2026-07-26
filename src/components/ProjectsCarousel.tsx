import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Eye, ExternalLink, Sparkles, Code2, ShieldCheck, Flame } from 'lucide-react'
import { fetchProjects, Project } from '../lib/supabase'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import { playClickSound } from '../lib/sound'

function darken(hex: string, amount = 0.88) {
  try {
    const r = Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount))
    const g = Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount))
    const b = Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount))
    return `rgb(${r},${g},${b})`
  } catch {
    return '#090807'
  }
}

const CATEGORIES = ['Tous', 'E-Commerce', 'SaaS', 'Supabase', 'Cloudflare', 'Mobile Money']

export default function ProjectsCarousel() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [category, setCategory] = useState<string>('Tous')
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

  const filteredProjects = projects
    ? category === 'Tous'
      ? projects
      : projects.filter(
          (p) =>
            (p.tags || []).some((t) => t.toLowerCase().includes(category.toLowerCase())) ||
            p.name.toLowerCase().includes(category.toLowerCase()) ||
            p.description.toLowerCase().includes(category.toLowerCase())
        )
    : []

  const activeProjects = filteredProjects.length > 0 ? filteredProjects : projects || []

  // Auto-play rotation every 4 seconds
  useEffect(() => {
    if (!activeProjects || activeProjects.length < 2) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeProjects.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [activeProjects])

  function navigate(dir: 'next' | 'prev') {
    if (isAnimating || !activeProjects || activeProjects.length < 2) return
    setIsAnimating(true)
    playClickSound()
    setActiveIndex((prev) =>
      dir === 'next'
        ? (prev + 1) % activeProjects.length
        : (prev + activeProjects.length - 1) % activeProjects.length
    )
    timeoutRef.current = setTimeout(() => setIsAnimating(false), 600)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const n = activeProjects.length || 0
  const center = activeIndex % (n || 1)
  const left = n ? (center + n - 1) % n : 0
  const right = n ? (center + 1) % n : 0
  const back = n ? (center + 2) % n : 0

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
    i === center ? 'center' : i === left ? 'left' : i === right ? 'right' : 'back'

  if (error) {
    return (
      <div className="max-w-[1320px] mx-auto px-6 py-16 text-center text-white/50 text-xs font-mono border border-dashed border-white/10 rounded-3xl">
        Impossible de charger les projets pour le moment.
      </div>
    )
  }

  if (!projects) {
    return (
      <div className="max-w-[1320px] mx-auto px-6 py-24 h-[60vh] rounded-3xl bg-surface/50 border border-white/10 shimmer relative overflow-hidden" />
    )
  }

  const active = activeProjects[center] || projects[0]
  const bg = darken(active.color || '#FF5A1F', 0.88)

  return (
    <Reveal>
      {/* Category Filter Chips - Horizontal Scrollable on Mobile */}
      <div className="flex items-center overflow-x-auto scrollbar-none gap-2 mb-8 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClickSound()
              setCategory(cat)
              setActiveIndex(0)
            }}
            className={`text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 shrink-0 ${
              category === cat
                ? 'bg-[#FF5A1F] text-black font-extrabold border-[#FF5A1F] shadow-[0_5px_20px_rgba(255,90,31,0.4)] scale-105'
                : 'bg-surface/60 text-white/70 hover:text-white border-white/10 hover:bg-white/10 backdrop-blur-md'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Showcase Frame */}
      <section
        className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[40px] border border-white/15 shadow-2xl transition-colors duration-700"
        style={{ backgroundColor: bg }}
      >
        <div
          className="relative w-full"
          style={{
            height: isMobile ? '64vh' : '86vh',
            minHeight: isMobile ? 460 : 580,
            maxHeight: 780,
            overflow: 'hidden',
          }}
        >
          {/* Background Ghost Watermark */}
          <div
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap px-6 font-display text-white/5 tracking-tight"
            style={{
              top: '10%',
              fontSize: 'clamp(60px, 18vw, 240px)',
              lineHeight: 1,
              zIndex: 2,
            }}
          >
            REALISATIONS
          </div>

          {/* Top Brand Tag */}
          <div className="absolute top-6 left-6 z-[60] flex items-center gap-2 text-xs font-mono uppercase text-white/80 tracking-widest bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span>Amine.Dev Portfolio</span>
          </div>

          {/* 3D Cards Stack */}
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            {activeProjects.map((p, i) => (
              <div
                key={p.id}
                style={roleStyle(roleFor(i))}
                onClick={() => {
                  if (i === center) {
                    playClickSound()
                    setSelectedProject(p)
                  } else {
                    playClickSound()
                    setActiveIndex(i)
                  }
                }}
                className="group overflow-hidden rounded-3xl shadow-2xl border border-white/20 bg-black/80 backdrop-blur-md relative"
              >
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className="w-full h-full rounded-3xl flex flex-col items-center justify-center text-center p-6"
                    style={{ background: `linear-gradient(135deg, #070605 0%, ${p.color}40 100%)` }}
                  >
                    <span className="text-5xl mb-3">{p.emoji || '🚀'}</span>
                    <span className="font-display text-2xl sm:text-3xl text-white font-bold">
                      {p.name}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-transparent transition-all" />

                {i === center && (
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono uppercase px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                    <Eye size={12} className="text-[#FF5A1F]" />
                    <span>Cliquer pour étude de cas</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom-left Project Info & Controls */}
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 z-[60] max-w-md">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-clay uppercase tracking-widest mb-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
              <Sparkles size={13} />
              <span>Projet {center + 1} / {n}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl text-white leading-tight mb-2">
              {active.name}
            </h3>

            <p className="hidden sm:block text-xs text-white/80 leading-relaxed mb-4 font-sans line-clamp-2">
              {active.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {(active.tags || []).slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono uppercase tracking-wide bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('prev')}
                  className="w-11 h-11 rounded-full border border-white/30 bg-black/60 text-white flex items-center justify-center hover:scale-105 hover:border-white transition-all backdrop-blur-md shadow-lg"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={() => navigate('next')}
                  className="w-11 h-11 rounded-full border border-white/30 bg-black/60 text-white flex items-center justify-center hover:scale-105 hover:border-white transition-all backdrop-blur-md shadow-lg"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <button
                onClick={() => {
                  playClickSound()
                  setSelectedProject(active)
                }}
                className="bg-[#FF5A1F] text-black font-bold text-xs px-5 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-1.5 shadow-[0_5px_20px_rgba(255,90,31,0.4)]"
              >
                <Eye size={14} /> Étude de cas
              </button>
            </div>
          </div>

          {/* Bottom-right Visit Button */}
          {active.url ? (
            <a
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-[60] flex items-center gap-2 text-white hover:text-[#FF5A1F] transition-colors font-display text-2xl sm:text-4xl uppercase"
            >
              <span>Visiter</span>
              <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8" />
            </a>
          ) : (
            <button
              onClick={() => {
                playClickSound()
                setSelectedProject(active)
              }}
              className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-[60] flex items-center gap-2 text-white hover:text-[#FF5A1F] transition-colors font-display text-2xl sm:text-4xl uppercase"
            >
              <span>Détails</span>
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}
        </div>
      </section>

      {/* Case Study Detailed Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Reveal>
  )
}
