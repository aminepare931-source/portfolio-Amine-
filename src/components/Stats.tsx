import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'

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
  return <div ref={ref} className="font-display text-4xl sm:text-6xl md:text-8xl text-text">{n}{suffix}</div>
}

const STATS = [
  { n: 3, s: '+', l: "Années d'expérience" },
  { n: 10, s: '+', l: 'Projets livrés' },
  { n: 36, s: '', l: 'Compétences maîtrisées' },
]

export default function Stats() {
  return (
    <section className="py-20 md:py-28 px-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center">
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1}>
            <CountUp target={s.n} suffix={s.s} />
            <div className="text-xs md:text-sm text-muted uppercase tracking-[0.2em] mt-3">{s.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
