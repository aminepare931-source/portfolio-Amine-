import { motion } from 'framer-motion'
import { Settings, Smartphone, Watch, MessageCircle, Cpu, Globe, ShieldCheck, Zap } from 'lucide-react'

const RING_ICONS = [Settings, Smartphone, Watch, MessageCircle, Cpu, Globe, ShieldCheck, Zap]

export default function HeroPhotoRing() {
  const n = RING_ICONS.length
  // Photo frame is aspect-[4/5], so a physical circle needs different
  // percentage radii on each axis to avoid looking like an ellipse.
  const radiusX = 46
  const radiusY = 37

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] mx-auto select-none">
      {/* Glow behind everything */}
      <div
        className="absolute inset-0 rounded-[32px] blur-2xl opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)' }}
      />

      {/* Photo frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative aspect-[4/5] rounded-[28px] overflow-hidden border-[3px] border-[#3B82F6]/40 shadow-[0_25px_60px_rgba(37,99,235,0.25)]"
        style={{ background: 'linear-gradient(160deg,#0b1226 0%,#13244a 55%,#1d4ed8 100%)' }}
      >
        <img
          src="/assets/hero.jpg"
          alt="Mouhamed Amine Paré"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a16]/70 via-transparent to-transparent" />
      </motion.div>

      {/* Circular ring of connected tech-icon badges */}
      <div className="absolute inset-0 pointer-events-none">
        {RING_ICONS.map((Icon, i) => {
          const angle = (360 / n) * i - 90
          const rad = (angle * Math.PI) / 180
          const cx = 50 + radiusX * Math.cos(rad)
          const cy = 50 + radiusY * Math.sin(rad)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-900/10 shadow-lg flex items-center justify-center"
              style={{ left: `${cx}%`, top: `${cy}%` }}
            >
              <Icon size={16} className="text-[#3B82F6]" />
            </motion.div>
          )
        })}
      </div>

      {/* Dashboard-style stat widget overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute -bottom-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-xl border border-slate-900/10 shadow-xl px-3 py-2.5 hidden sm:block"
      >
        <p className="text-[9px] font-mono text-muted uppercase tracking-wider mb-1">Portfolio</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">12+</span>
          <div className="flex items-end gap-0.5 h-4">
            {[4, 7, 5, 10, 8].map((h, i) => (
              <span key={i} className="w-1 rounded-full bg-[#3B82F6]" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
