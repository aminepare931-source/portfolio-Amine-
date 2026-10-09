import { motion } from 'framer-motion'

export default function HeroPhotoDark() {
  return (
    <div className="relative w-full h-full min-h-[46vh] sm:min-h-[56vh] lg:min-h-screen overflow-hidden">
      {/* Photo */}
      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        src="/assets/hero.jpg"
        alt="Mouhamed Amine Paré"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Dark tint so the photo sits in the navy palette */}
      <div className="absolute inset-0 bg-[#05070d]/20" />

      {/* Neon light beams — red + blue diagonal streaks */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen">
        <div
          className="absolute -left-16 top-0 w-32 sm:w-40 h-[160%] -rotate-[14deg] blur-2xl opacity-90"
          style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.9), rgba(239,68,68,0) 72%)' }}
        />
        <div
          className="absolute -left-2 -top-10 w-20 sm:w-24 h-[150%] -rotate-[12deg] blur-xl opacity-95"
          style={{ background: 'linear-gradient(180deg, rgba(14,165,233,0.95), rgba(14,165,233,0) 65%)' }}
        />
        <div
          className="absolute left-[42%] -top-10 w-12 sm:w-14 h-[150%] rotate-[9deg] blur-lg opacity-80"
          style={{ background: 'linear-gradient(180deg, rgba(96,165,250,0.85), rgba(96,165,250,0) 58%)' }}
        />
        <div
          className="absolute right-4 top-0 w-24 sm:w-28 h-[150%] rotate-[9deg] blur-2xl opacity-80"
          style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.75), rgba(239,68,68,0) 60%)' }}
        />
      </div>

      {/* Blend edges into the dark background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent" />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#05070d] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/70 via-transparent to-transparent" />

      {/* Decorative floating glass panels */}
      <div className="hidden sm:block absolute left-[8%] top-[38%] w-16 h-24 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm rotate-[8deg]" />
      <div className="hidden sm:block absolute left-[18%] top-[55%] w-12 h-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm -rotate-6" />

      {/* Floating stack card (top-right) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="hidden lg:block absolute top-24 right-8 bg-[#0a0f1e]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3.5 shadow-xl"
      >
        <ul className="space-y-1.5 text-xs font-mono text-white/80">
          {['React', 'Node.js', 'TypeScript', 'Python'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* "01 / 03" index — purely decorative pagination accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden lg:flex absolute top-24 left-6 flex-col items-center font-mono text-xs"
      >
        <span className="text-[#3B82F6] font-bold text-sm">01</span>
        <span className="w-px h-6 bg-white/25 my-1" />
        <span className="text-white/35">/03</span>
      </motion.div>
    </div>
  )
}
