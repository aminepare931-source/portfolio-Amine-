import { motion } from 'framer-motion'
import { Cpu, Zap, ShieldCheck, Code, Globe, Terminal, Sparkles, Layers, Database } from 'lucide-react'

const TECH_ITEMS = [
  { name: 'React 18 & Vite', icon: Code, color: '#61DAFB' },
  { name: 'TypeScript', icon: Terminal, color: '#3178C6' },
  { name: 'Node.js & Express', icon: Cpu, color: '#5FA04E' },
  { name: 'Supabase Cloud', icon: Database, color: '#3ECF8E' },
  { name: 'Mobile Money CinetPay', icon: Zap, color: '#FF5A1F' },
  { name: 'WhatsApp API & AI', icon: Sparkles, color: '#25D366' },
  { name: 'Tailwind CSS', icon: Layers, color: '#38BDF8' },
  { name: 'Cloudflare Edge', icon: Globe, color: '#F38020' },
  { name: 'REST & GraphQL', icon: ShieldCheck, color: '#E8C97A' },
]

export default function Marquee() {
  const doubled = [...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#080706]/80 backdrop-blur-md py-5 z-20">
      {/* Background glow streak */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A1F]/10 via-transparent to-[#FF5A1F]/10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {doubled.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="group flex items-center gap-2.5 px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-clay/50 transition-all duration-300 mx-3 shrink-0"
            >
              <Icon size={16} style={{ color: item.color }} className="group-hover:scale-125 transition-transform" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white tracking-wide">
                {item.name}
              </span>
              <span className="text-[#FF5A1F] text-xs opacity-40 group-hover:opacity-100 transition-opacity ml-1">✦</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
