import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { VIDEOS } from '../config/videos'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    const duration = 1600
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return <div ref={ref} className="font-display text-4xl sm:text-5xl md:text-6xl">{n}{suffix}</div>
}

/* Palette 3D "pressable" — couleur + ombre plus foncée, façon Duolingo */
const STATS = [
  { n: 3, s: '+', l: "Années d'expérience", bg: '#FF5A1F', shadow: '#C4400E' },
  { n: 10, s: '+', l: 'Projets livrés', bg: '#E8C97A', shadow: '#B89345' },
  { n: 36, s: '', l: 'Compétences maîtrisées', bg: '#C9A24B', shadow: '#93712A' },
]

export default function Stats() {
  return (
    <section className="relative py-12 sm:py-16 md:py-28 overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={VIDEOS.statsAbout} />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <div
                className="rounded-3xl px-6 py-8 text-center text-black select-none transition-transform active:translate-y-1"
                style={{ background: s.bg, boxShadow: `0 6px 0 ${s.shadow}` }}
              >
                <CountUp target={s.n} suffix={s.s} />
                <div className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] mt-2 opacity-80">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
