import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const MILESTONES = [
  { date: '2021 — 2022', role: 'Auto-formation intensive', co: 'Self-taught · Bobo-Dioulasso', d: "Point de départ : zéro. Apprentissage intensif — HTML, CSS, JavaScript, bases de données." },
  { date: '2022 — 2024', role: 'Développeur Frontend Freelance', co: 'Projets clients', d: "Sites vitrine et landing pages pour clients locaux. Maîtrise du responsive et de la performance." },
  { date: '2023', role: 'Développeur & Designer', co: "FASOKO · Portail d'actualités", d: "Agrégateur d'actualités burkinabè, architecture serverless Cloudflare, design sahélien." },
  { date: '2023 — Présent', role: 'Fondateur & Développeur', co: 'EMBF Boutique · E-Commerce', d: "Boutique tech premium de zéro : Supabase, CinetPay, commandes WhatsApp, admin panel complet." },
  { date: '2024 — Présent', role: 'Fondateur & Développeur Principal', co: 'TechBF · Marketplace de services', d: "Marketplace connectant clients et artisans à travers le Burkina Faso. Messagerie temps réel, parrainage." },
]

export default function JourneyRoad() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [progress, setProgress] = useState(0)
  const [pathLen, setPathLen] = useState(0)

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const n = MILESTONES.length
  const dotPositions = MILESTONES.map((_, i) => (i / (n - 1)) * 0.94 + 0.02)

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-32 px-6 max-w-[900px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Mon Parcours
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-4">La Route.</h2>
        <p className="text-sm text-muted max-w-md mb-16">
          De Bobo-Dioulasso à mes premiers clients — chaque étape a laissé une trace.
        </p>
      </Reveal>

      <div className="relative flex">
        {/* Road SVG */}
        <svg
          width="4" height="100%" viewBox={`0 0 4 ${n * 260}`}
          className="absolute left-0 top-0 h-full"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d={`M2,0 L2,${n * 260}`}
            stroke="#2a221a" strokeWidth="3" fill="none"
          />
          <path
            d={`M2,0 L2,${n * 260}`}
            stroke="#FF5A1F" strokeWidth="3" fill="none"
            strokeDasharray={pathLen || 1}
            strokeDashoffset={(pathLen || 1) * (1 - progress)}
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,90,31,0.7))', transition: 'stroke-dashoffset .05s linear' }}
          />
        </svg>

        {/* Milestones */}
        <div className="pl-10 flex flex-col gap-[164px] md:gap-[196px] w-full">
          {MILESTONES.map((m, i) => {
            const lit = progress >= dotPositions[i] - 0.03
            return (
              <div key={m.role} className="relative">
                <div
                  className="absolute -left-[46px] top-1.5 w-3 h-3 rounded-full transition-all duration-500"
                  style={{
                    background: lit ? '#FF5A1F' : '#2a221a',
                    boxShadow: lit ? '0 0 14px #FF5A1F, 0 0 28px rgba(255,90,31,0.5)' : 'none',
                    transform: lit ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
                <div
                  className="transition-all duration-700"
                  style={{ opacity: lit ? 1 : 0.35, transform: lit ? 'translateX(0)' : 'translateX(-8px)' }}
                >
                  <div className="text-xs font-mono text-clay uppercase tracking-wide mb-1">{m.date}</div>
                  <h3 className="font-display text-2xl md:text-3xl mb-1">{m.role}</h3>
                  <div className="text-xs text-muted font-mono mb-3">{m.co}</div>
                  <p className="text-sm text-muted leading-relaxed max-w-md">{m.d}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
