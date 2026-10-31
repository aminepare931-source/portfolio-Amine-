import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Code, Zap, ShieldCheck, Award } from 'lucide-react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    const duration = 1800
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <div ref={ref} className="font-display text-5xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-none">
      {n}
      <span className="text-[#3B82F6]">{suffix}</span>
    </div>
  )
}

const STAT_ITEMS = [
  { n: 3, s: '+', label: "Années d'expérience", detail: 'React, Node.js & cloud depuis 2023', icon: Code },
  { n: 12, s: '+', label: 'Projets déployés', detail: 'E-commerce, SaaS & mobile en production', icon: Zap },
  { n: 100, s: '%', label: 'Rigueur & fiabilité', detail: 'Code propre, tests, délais tenus', icon: ShieldCheck },
  { n: 42, s: '+', label: 'Technologies maîtrisées', detail: 'Frontend, backend, devops & IA', icon: Award },
]

export default function Stats() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#ffffff]">
      <div className="px-6 max-w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-slate-900/10 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-2">
              <span className="w-8 h-px bg-clay" /> Chiffres clés & performance
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-slate-900">
              Impact mesurable &amp; valeur concrète<span className="text-[#3B82F6]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-md font-sans">
            Des résultats fondés sur l'ingénierie moderne, la passion du code et la maîtrise des enjeux technologiques africains.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-slate-900/10">
          {STAT_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`group px-0 lg:px-8 py-6 lg:py-0 ${idx !== 0 ? 'lg:first:pl-0' : ''} ${
                idx < 2 ? 'border-b lg:border-b-0 border-slate-900/10' : ''
              } ${idx % 2 === 0 ? 'pr-6 lg:pr-8' : 'pl-6 lg:pl-8'}`}
            >
              <item.icon size={20} className="text-clay/60 group-hover:text-clay transition-colors mb-4" />
              <CountUp target={item.n} suffix={item.s} />
              <h3 className="font-display text-sm sm:text-base text-slate-900 mt-3 mb-1">{item.label}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
