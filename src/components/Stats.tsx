import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Zap, Code, ShieldCheck, Award, ArrowUpRight, CheckCircle } from 'lucide-react'
import { playClickSound } from '../lib/sound'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    const duration = 1800
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      // Ease out cubic
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <div ref={ref} className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
      {n}
      <span className="text-[#3B82F6]">{suffix}</span>
    </div>
  )
}

const STAT_CARDS = [
  {
    n: 3,
    s: '+',
    label: "Années d'Expérience",
    tagline: 'Pratique intensive & autodidacte',
    detail: 'Spécialisé en React, Node.js & architectures cloud depuis 2023',
    icon: Code,
    color: '#3B82F6',
  },
  {
    n: 12,
    s: '+',
    label: 'Projets Déployés',
    labelSub: 'E-Commerce, SAAS & Mobile',
    detail: 'Applications web complètes avec paiement Mobile Money & Supabase',
    icon: Zap,
    color: '#3B82F6',
  },
  {
    n: 100,
    s: '%',
    label: 'Rigueur & Fiabilité',
    labelSub: 'Code propre & sécurisé',
    detail: 'Respect des délais, tests rigoureux et intégrations API robustes',
    icon: ShieldCheck,
    color: '#3B82F6',
  },
  {
    n: 42,
    s: '+',
    label: 'Technologies & Tools',
    labelSub: 'Ecosystème Web Modern',
    detail: 'Frontend, Backend, Bases de données, Devops & Automatisation IA',
    icon: Award,
    color: '#3B82F6',
  },
]

export default function Stats() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0a0e16]">
      {/* Fond sombre uni */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e16] via-[#0a0e16]/90 to-[#0a0e16] pointer-events-none" />

      <div className="relative z-10 px-6 max-w-[1320px] mx-auto">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-2">
              <span className="w-8 h-px bg-clay" /> Chiffres Clés & Performance
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white">
              Impact mesurable &amp; valeur concrète<span className="text-[#3B82F6]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-md font-sans">
            Des résultats fondés sur l'ingénierie moderne, la passion du code et la maîtrise des enjeux technologiques africains.
          </p>
        </div>

        {/* 4-Card 2026 Motion Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STAT_CARDS.map((card, idx) => {
            const Icon = card.icon
            const isHovered = activeCard === idx

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => {
                  playClickSound()
                  setActiveCard(idx)
                }}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 border transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-xl ${
                  isHovered
                    ? 'bg-surface/90 border-[#3B82F6]/60 shadow-[0_15px_40px_rgba(59, 130, 246,0.2)] scale-[1.02]'
                    : 'bg-surface/40 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Glowing Top Accent Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 opacity-60"
                  style={{
                    background: isHovered
                      ? `linear-gradient(90deg, transparent, ${card.color}, transparent)`
                      : 'transparent',
                  }}
                />

                {/* Card Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300"
                    style={{
                      backgroundColor: `${card.color}15`,
                      borderColor: `${card.color}40`,
                      color: card.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                {/* Animated Number */}
                <div className="mb-2">
                  <CountUp target={card.n} suffix={card.s} />
                </div>

                {/* Labels */}
                <h3 className="font-display text-lg text-white mb-1 font-semibold">
                  {card.label}
                </h3>
                <p className="text-xs text-clay font-mono mb-4">{card.tagline}</p>

                {/* Detail text — masqué sur mobile pour rester compact */}
                <p className="hidden sm:block text-xs text-white/70 leading-relaxed border-t border-white/10 pt-3">
                  {card.detail}
                </p>

                {/* Corner accent arrow */}
                <div className="absolute bottom-4 right-4 text-white/20 group-hover:text-clay transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
