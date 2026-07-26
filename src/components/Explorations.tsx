import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, X, Sparkles, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { playClickSound } from '../lib/sound'

const ITEMS = [
  {
    src: '/assets/hero.jpg',
    bg: '#1a0d05',
    label: 'Portrait Professionnel',
    desc: 'L\'attitude et la rigueur d\'un développeur prêt pour l\'international.',
  },
  {
    src: '/assets/about1.jpg',
    bg: '#140c06',
    label: 'Style Décontracté & Créatif',
    desc: 'Session de travail intensive à Bobo-Dioulasso, Burkina Faso.',
  },
  {
    src: '/assets/about2.jpg',
    bg: '#1e0e04',
    label: 'Tenue Traditionnelle',
    desc: 'Fierté des racines africaines et vision résolument tournée vers le futur.',
  },
  {
    src: '/assets/about1.jpg',
    bg: '#0f0c09',
    label: 'Amine.Dev Studio',
    desc: 'Derrière l\'écran de code, concevoir des architectures robustes.',
  },
]

export default function Explorations() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Auto-rotate photos every 4 seconds
  useEffect(() => {
    if (modalOpen) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ITEMS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [modalOpen])

  function navigate(dir: 'next' | 'prev') {
    if (isAnimating) return
    setIsAnimating(true)
    playClickSound()
    setActiveIndex((prev) =>
      dir === 'next' ? (prev + 1) % ITEMS.length : (prev + ITEMS.length - 1) % ITEMS.length
    )
    timeoutRef.current = setTimeout(() => setIsAnimating(false), 600)
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

  const activeItem = ITEMS[activeIndex]

  return (
    <section
      id="galerie"
      className="relative w-full overflow-hidden transition-colors duration-700 bg-[#070605]"
      style={{ backgroundColor: activeItem.bg }}
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
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap text-white/5 font-display"
          style={{
            top: '12%',
            fontSize: 'clamp(70px, 22vw, 300px)',
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          GALERIE
        </div>

        {/* Top Brand Tag */}
        <div className="absolute top-6 left-6 z-[60] flex items-center gap-2 text-xs font-mono uppercase text-white/80 tracking-widest bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <MapPin size={13} className="text-[#FF5A1F]" />
          <span>Amine Paré • Burkina Faso</span>
        </div>

        {/* 3D Photo Carousel Stack */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {ITEMS.map((it, i) => (
            <div
              key={i}
              style={roleStyle(roleFor(i))}
              onClick={() => {
                if (i === center) {
                  playClickSound()
                  setModalOpen(true)
                } else {
                  playClickSound()
                  setActiveIndex(i)
                }
              }}
              className="group overflow-hidden rounded-3xl shadow-2xl border border-white/20 bg-black relative"
            >
              <img
                src={it.src}
                alt={it.label}
                draggable={false}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-40 transition-opacity" />

              {i === center && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    playClickSound()
                    setModalOpen(true)
                  }}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-[#FF5A1F] hover:text-black transition-colors text-white text-xs font-mono p-2.5 rounded-full border border-white/20 backdrop-blur-md shadow-lg"
                >
                  <Maximize2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Left Info & Controls */}
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 z-[60] max-w-md">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-clay uppercase tracking-widest mb-2 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
            <Sparkles size={13} /> Photo {activeIndex + 1} / {n}
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-white uppercase mb-1">
            {activeItem.label}
          </h3>

          <p className="hidden sm:block text-xs text-white/80 leading-relaxed mb-4 font-sans">
            {activeItem.desc}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 rounded-full border border-white/30 bg-black/60 text-white flex items-center justify-center hover:scale-105 hover:border-white transition-all backdrop-blur-md shadow-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 rounded-full border border-white/30 bg-black/60 text-white flex items-center justify-center hover:scale-105 hover:border-white transition-all backdrop-blur-md shadow-lg"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Right Projects Link */}
        <Link
          to="/projets"
          onClick={playClickSound}
          className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-[60] flex items-center gap-2 text-white hover:text-[#FF5A1F] transition-colors font-display text-2xl sm:text-4xl uppercase"
        >
          <span>Voir les projets</span>
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </Link>
      </div>

      {/* Photo Lightbox Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-surface border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-4"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-[#FF5A1F] hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <img
              src={activeItem.src}
              alt={activeItem.label}
              className="w-full h-[60vh] object-cover rounded-2xl mb-4"
            />

            <div className="px-2">
              <h4 className="font-display text-2xl text-white mb-1">{activeItem.label}</h4>
              <p className="text-xs text-white/70 font-sans">{activeItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
