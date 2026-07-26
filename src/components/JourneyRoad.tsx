import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { VIDEOS } from '../config/videos'

const MILESTONES = [
  { ic: '🌱', date: '2021 — 2022', role: 'Auto-formation intensive', co: 'Self-taught · Bobo-Dioulasso', d: "Zéro à opérationnel : HTML, CSS, JavaScript, bases de données, premiers scripts backend. Apprentissage par la pratique, pas par la théorie." },
  { ic: '🖥️', date: '2022 — 2024', role: 'Développeur Frontend Freelance', co: 'Projets clients', d: "Sites vitrine et landing pages pour clients locaux. Montée en compétence sur le responsive, la performance et les intégrations backend." },
  { ic: '📰', date: '2023', role: 'Développeur & Designer Fullstack', co: "FASOKO · Portail d'actualités", d: "Agrégateur d'actualités burkinabè, backend d'agrégation de flux, architecture serverless Cloudflare, design sahélien." },
  { ic: '🛒', date: '2023 — Présent', role: 'Fondateur & Développeur Fullstack', co: 'EMBF Boutique · E-Commerce', d: "Boutique tech premium construite de zéro : backend Supabase, API CinetPay, commandes WhatsApp automatisées, admin panel complet." },
  { ic: '🏗️', date: '2024 — Présent', role: 'Fondateur & Développeur Principal', co: 'TechBF · Marketplace de services', d: "Marketplace fullstack connectant clients et artisans à travers le Burkina Faso — API, messagerie temps réel, système de parrainage." },
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
    <section id="experience" ref={sectionRef} className="relative">
      {/* ATELIER-STYLE INTRO */}
      <div className="relative w-full h-[46vh] sm:h-[55vh] md:h-[85vh] overflow-hidden flex flex-col">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEOS.parcoursIntro}
        />
        <div className="absolute inset-0 bg-black/32" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="text-xs text-white/80 uppercase tracking-[0.3em] mb-6" style={{textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>Mon Parcours</div>
          <h2 className="font-instrument text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl" style={{textShadow:'0 4px 20px rgba(0,0,0,0.85)'}}>
            DE BOBO-DIOULASSO<br />
            <span className="italic">à</span> DES CLIENTS<br />
            <span className="italic">à travers</span> L'AFRIQUE
          </h2>
          <p className="mt-5 md:mt-6 text-white/85 text-sm md:text-base font-light max-w-md leading-relaxed" style={{textShadow:'0 2px 10px rgba(0,0,0,0.85)'}}>
            Trois ans d'autoformation intensive, transformés en produits réels
            qui tournent en production aujourd'hui.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a href="#skills-anchor" onClick={(e) => { e.preventDefault(); sectionRef.current?.querySelector('.road-start')?.scrollIntoView({ behavior: 'smooth' }) }} className="group flex items-center gap-2 bg-white text-black rounded-full px-7 py-3 text-sm font-medium hover:scale-105 transition-transform">
              Voir la timeline
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/projets" className="flex items-center gap-2 border border-white/40 text-white rounded-full px-7 py-3 text-sm hover:bg-white/10 hover:border-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              Voir les projets
            </a>
          </div>
        </div>
      </div>

      <div className="road-start py-14 sm:py-20 md:py-32 px-6 max-w-[900px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
            <span className="w-6 h-px bg-clay" /> La Route
          </div>
          <p className="text-sm text-muted max-w-md mb-16">
            De Bobo-Dioulasso à mes premiers clients — chaque étape a laissé une trace.
          </p>
        </Reveal>

      <div className="relative hidden md:flex">
        {/* Road SVG — thicker, glowing */}
        <svg
          width="6" height="100%" viewBox={`0 0 6 ${n * 300}`}
          className="absolute left-0 top-0 h-full"
          preserveAspectRatio="none"
        >
          <path d={`M3,0 L3,${n * 300}`} stroke="#221a12" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path
            d={`M3,0 L3,${n * 300}`}
            stroke="#FF5A1F" strokeWidth="5" fill="none" strokeLinecap="round"
            strokeDasharray={pathLen || 1}
            strokeDashoffset={(pathLen || 1) * (1 - progress)}
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,90,31,0.9))', transition: 'stroke-dashoffset .05s linear' }}
          />
        </svg>

        {/* Milestones */}
        <div className="pl-12 flex flex-col gap-14 md:gap-16 w-full">
          {MILESTONES.map((m, i) => {
            const lit = progress >= dotPositions[i] - 0.03
            return (
              <div key={m.role} className="relative">
                {/* Glowing node with pulse ring */}
                <div className="absolute -left-[52px] top-6">
                  {lit && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: '#FF5A1F', animation: 'ping-pulse 1.8s ease-out infinite' }}
                    />
                  )}
                  <div
                    className="relative w-4 h-4 rounded-full transition-all duration-500"
                    style={{
                      background: lit ? '#FF5A1F' : '#221a12',
                      boxShadow: lit ? '0 0 18px #FF5A1F, 0 0 36px rgba(255,90,31,0.6)' : 'none',
                    }}
                  />
                </div>

                <div
                  className="bg-surface border rounded-2xl p-6 md:p-8 transition-all duration-700"
                  style={{
                    borderColor: lit ? 'rgba(255,90,31,0.35)' : 'rgba(255,255,255,0.08)',
                    opacity: lit ? 1 : 0.4,
                    transform: lit ? 'translateX(0)' : 'translateX(-10px)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl md:text-4xl shrink-0">{m.ic}</span>
                    <div>
                      <div className="text-xs font-mono text-clay uppercase tracking-wide mb-1">{m.date}</div>
                      <h3 className="font-display text-2xl md:text-3xl mb-1">{m.role}</h3>
                      <div className="text-xs text-muted font-mono mb-3">{m.co}</div>
                      <p className="text-sm text-muted leading-relaxed">{m.d}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MOBILE — timeline horizontale compacte */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 -mx-6 px-6">
        {MILESTONES.map((m, i) => (
          <div key={m.role} className="shrink-0 w-[78vw] xs:w-[70vw] snap-start bg-surface border border-clay/25 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{m.ic}</span>
              <span className="text-[10px] font-mono text-clay uppercase tracking-wide">{m.date}</span>
            </div>
            <h3 className="font-display text-xl mb-1">{m.role}</h3>
            <div className="text-[11px] text-muted font-mono mb-2">{m.co}</div>
            <p className="text-xs text-muted leading-relaxed">{m.d}</p>
            <div className="text-[9px] text-muted/50 mt-3">{i + 1} / {n}</div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
