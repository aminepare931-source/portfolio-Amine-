import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SERVICES, type Service } from '../data/services'
import { ServiceImage } from './PillarIllustrations'

const pad = (n: number) => String(n).padStart(2, '0')

function ServiceCard({ s, i, className = '' }: { s: Service; i: number; className?: string }) {
  return (
    <Link
      to={`/services/${s.slug}`}
      className={`group relative flex flex-col justify-between border border-stroke rounded-md bg-bg p-6 hover:border-clay/40 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between">
        <ServiceImage slug={s.slug} className="w-28 h-auto" />
        <span className="font-mono text-xs text-gov/50">{pad(i + 1)}</span>
      </div>
      <div className="mt-6">
        <h3 className="font-display text-xl leading-snug mb-2">{s.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{s.teaser}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gov">Voir le service <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
      </div>
    </Link>
  )
}

/** Mobile et écrans réduits : défilement horizontal au doigt, avec compteur et barre de progression. */
function Swipe() {
  const ref = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [pct, setPct] = useState(0)
  const onScroll = () => {
    const el = ref.current; if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setPct(max > 0 ? el.scrollLeft / max : 0)
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 16 : 1
    setIdx(Math.min(SERVICES.length - 1, Math.round(el.scrollLeft / step)))
  }
  const go = (d: number) => {
    const el = ref.current; if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    el.scrollBy({ left: d * ((first?.offsetWidth ?? 300) + 16), behavior: 'smooth' })
  }
  return (
    <div>
      <div ref={ref} onScroll={onScroll} className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollPaddingLeft: '1.25rem' }}>
        {SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} className="snap-start shrink-0 w-[78vw] max-w-[340px] min-h-[320px]" />)}
      </div>
      <div className="px-5 sm:px-8 mt-4 flex items-center gap-4">
        <span className="font-mono text-xs text-gov w-14">{pad(idx + 1)} / {pad(SERVICES.length)}</span>
        <div className="flex-1 h-1 rounded-full bg-stroke overflow-hidden"><div className="h-full bg-clay rounded-full transition-[width] duration-150" style={{ width: `${Math.max(8, pct * 100)}%` }} /></div>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => go(-1)} aria-label="Service précédent" className="w-9 h-9 border border-stroke rounded-full flex items-center justify-center hover:border-gov/50 rotate-180"><ArrowRight size={15} /></button>
          <button onClick={() => go(1)} aria-label="Service suivant" className="w-9 h-9 border border-stroke rounded-full flex items-center justify-center hover:border-gov/50"><ArrowRight size={15} /></button>
        </div>
      </div>
      <p className="px-5 sm:px-8 mt-3 text-xs text-muted sm:hidden">Faites glisser pour voir les {SERVICES.length} services.</p>
    </div>
  )
}

/** Grand écran : la section reste en place pendant que le défilement vertical fait avancer les services horizontalement. */
function Pinned() {
  const outer = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  const [idx, setIdx] = useState(0)
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], ['4%', '100%'])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(SERVICES.length - 1, Math.floor(v * SERVICES.length))))
  useEffect(() => {
    const measure = () => { const t = track.current; if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth)) }
    measure(); window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  return (
    <div ref={outer} style={{ height: `${SERVICES.length * 30 + 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1200px] w-full mx-auto px-12 mb-8 flex items-end justify-between gap-8">
          <div className="font-display text-7xl text-gov/15 leading-none select-none">{pad(idx + 1)}<span className="text-3xl align-top ml-2">/ {pad(SERVICES.length)}</span></div>
          <div className="flex-1 max-w-sm">
            <div className="text-xs font-mono uppercase tracking-widest text-muted mb-2">{SERVICES[idx].title}</div>
            <div className="h-1 rounded-full bg-stroke overflow-hidden"><motion.div className="h-full bg-clay rounded-full" style={{ width: bar }} /></div>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-6 pl-12 pr-24 will-change-transform">
          {SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} className="shrink-0 w-[360px] h-[400px]" />)}
        </motion.div>
      </div>
    </div>
  )
}

export default function ServicesShowcase() {
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setWide(mq.matches)
    on(); mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide && !reduce ? <Pinned /> : <Swipe />
}
