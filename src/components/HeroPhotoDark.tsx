import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

// Mobile / tablet only — rendered inside a parent hidden at the `lg` breakpoint,
// where HeroDesktop takes over with its own full-card layout.
export default function HeroPhotoDark() {
  const { t } = useLanguage()
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Studio backdrop — radial blue gradient matching the portfolio's brand color */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 110% at 65% 15%, #0c3d7a 0%, #0a2550 32%, #071530 55%, #05070d 78%)',
        }}
      />

      {/* Neon light beams — blue diagonal streaks, on-brand with the site's #3B82F6 accent */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen z-[1]">
        <div
          className="absolute -left-14 top-0 w-36 sm:w-44 h-[165%] -rotate-[14deg] blur-2xl opacity-100"
          style={{ background: 'linear-gradient(180deg, rgba(59,130,246,1), rgba(59,130,246,0) 74%)' }}
        />
        <div
          className="absolute left-4 -top-10 w-24 sm:w-28 h-[155%] -rotate-[12deg] blur-xl opacity-100"
          style={{ background: 'linear-gradient(180deg, rgba(96,165,250,1), rgba(96,165,250,0) 66%)' }}
        />
        <div
          className="absolute left-[46%] -top-10 w-14 sm:w-16 h-[150%] rotate-[9deg] blur-lg opacity-90"
          style={{ background: 'linear-gradient(180deg, rgba(147,197,253,0.95), rgba(147,197,253,0) 58%)' }}
        />
        <div
          className="absolute right-2 top-0 w-28 sm:w-32 h-[155%] rotate-[9deg] blur-2xl opacity-95"
          style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.9), rgba(37,99,235,0) 62%)' }}
        />
      </div>

      {/* Photo cutout — transparent PNG, anchored to the bottom like a studio portrait */}
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        src="/assets/hero-cutout.png"
        alt="Mouhamed Amine Paré"
        className="absolute inset-x-0 bottom-0 z-[2] w-full h-full object-contain object-bottom scale-[1.3] sm:scale-[1.35] origin-bottom"
      />

      {/* Blend edges into the dark background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/70 via-transparent to-transparent" />

      {/* Decorative floating glass panels */}
      <div className="hidden sm:block absolute left-[8%] top-[38%] w-16 h-24 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm rotate-[8deg]" />
      <div className="hidden sm:block absolute left-[18%] top-[55%] w-12 h-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm -rotate-6" />

      {/* Eyebrow + "01/03" overlaid directly on the photo, so the text block
          below can start straight at the title (saves vertical space) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-20 sm:top-4 left-4 z-[3] flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/85"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
        {t('Développeur Fullstack', 'Fullstack Developer')}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex absolute top-20 sm:top-4 right-4 z-[3] flex-col items-center font-mono text-[10px]"
      >
        <span className="text-[#3B82F6] font-bold text-xs">01</span>
        <span className="w-px h-4 bg-white/25 my-0.5" />
        <span className="text-white/40">/03</span>
      </motion.div>
    </div>
  )
}
