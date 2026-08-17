import { motion } from 'framer-motion'
import { Cpu, Zap, ShieldCheck, Code, Globe, Terminal, Sparkles, Layers, Database } from 'lucide-react'

const TECH_ITEMS = [
  { name: 'React & Vite', icon: Code },
  { name: 'TypeScript', icon: Terminal },
  { name: 'Node.js & Express', icon: Cpu },
  { name: 'Supabase', icon: Database },
  { name: 'Mobile Money (CinetPay)', icon: Zap },
  { name: 'WhatsApp API', icon: Sparkles },
  { name: 'Tailwind CSS', icon: Layers },
  { name: 'Cloudflare', icon: Globe },
  { name: 'REST APIs', icon: ShieldCheck },
]

export default function Marquee() {
  const doubled = [...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-slate-900/10 bg-[#ffffff] py-5 z-20">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {doubled.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="group flex items-center gap-2.5 px-6 py-2 rounded-full bg-slate-900/5 hover:bg-slate-900/10 border border-slate-900/10 hover:border-clay/40 transition-colors mx-3 shrink-0"
            >
              <Icon size={16} className="text-slate-900/50 group-hover:text-clay transition-colors" />
              <span className="font-sans text-xs sm:text-sm font-medium text-slate-900/80 group-hover:text-slate-900 tracking-wide">
                {item.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
