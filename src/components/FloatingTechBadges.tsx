import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { SiReact, SiSupabase, SiWhatsapp } from 'react-icons/si'
import { IconType } from 'react-icons'

interface BadgeDef {
  icon: IconType
  label: string
  side: 'left' | 'right'
  top: string // position verticale en % par rapport au cadre photo
  wireLength: number // longueur du fil en px
  color: string
  delay: number
}

const BADGES: BadgeDef[] = [
  { icon: SiReact, label: 'React', side: 'left', top: '12%', wireLength: 64, color: '#3B82F6', delay: 0 },
  { icon: SiSupabase, label: 'Supabase', side: 'right', top: '20%', wireLength: 72, color: '#3ECF8E', delay: 0.6 },
  { icon: ShieldCheck, label: 'Sécurité', side: 'left', top: '68%', wireLength: 56, color: '#f59e0b', delay: 1.1 },
  { icon: SiWhatsapp, label: 'Automatisation', side: 'right', top: '78%', wireLength: 80, color: '#25D366', delay: 0.3 },
]

function Wire({ side, length, color }: { side: 'left' | 'right'; length: number; color: string }) {
  return (
    <svg
      width={length}
      height="14"
      viewBox={`0 0 ${length} 14`}
      className="shrink-0"
      style={{ transform: side === 'left' ? 'scaleX(-1)' : undefined }}
    >
      <path
        d={`M0,7 C${length * 0.4},7 ${length * 0.3},0 ${length},0`}
        fill="none"
        stroke={color}
        strokeOpacity={0.55}
        strokeWidth={1.5}
        className="wire-path"
      />
      {/* point d'ancrage côté badge */}
      <circle cx={0} cy={7} r={2.5} fill={color} />
    </svg>
  )
}

export default function FloatingTechBadges() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
      {BADGES.map((b, idx) => {
        const Icon = b.icon
        const isLeft = b.side === 'left'
        return (
          <motion.div
            key={idx}
            className="absolute flex items-center gap-0"
            style={{
              top: b.top,
              ...(isLeft ? { right: '100%' } : { left: '100%' }),
              flexDirection: isLeft ? 'row-reverse' : 'row',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.8 + b.delay },
              scale: { duration: 0.6, delay: 0.8 + b.delay },
              y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 + b.delay },
            }}
          >
            {isLeft && <Wire side="left" length={b.wireLength} color={b.color} />}
            <span
              className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 backdrop-blur-md border px-3 py-1.5 text-[11px] font-mono font-semibold text-slate-900 shadow-lg"
              style={{ borderColor: `${b.color}55` }}
            >
              <Icon size={13} style={{ color: b.color }} />
              {b.label}
            </span>
            {!isLeft && <Wire side="right" length={b.wireLength} color={b.color} />}
          </motion.div>
        )
      })}
    </div>
  )
}
