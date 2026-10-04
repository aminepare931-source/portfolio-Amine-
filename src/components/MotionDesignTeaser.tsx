import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Film, ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { playClickSound } from '../lib/sound'

export default function MotionDesignTeaser() {
  const { t } = useLanguage()

  return (
    <section className="px-4 sm:px-6 max-w-[1320px] mx-auto py-8 sm:py-10">
      <Link
        to="/projets#motion-design"
        onClick={playClickSound}
        className="group relative block w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#0b1226] border border-white/5 px-6 sm:px-10 py-9 sm:py-12 hover:border-white/15 transition-colors"
      >
        {/* fond */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        <motion.div
          className="absolute -top-10 right-10 w-56 h-56 rounded-full bg-[#3B82F6]/20 blur-[80px]"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
              <Film size={24} className="text-[#60A5FA]" />
              <motion.div
                className="absolute inset-0 rounded-2xl border border-[#60A5FA]/40"
                animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-1">
                {t('Nouvelle compétence', 'New skill')}
              </p>
              <h3 className="font-display text-xl sm:text-2xl text-white">
                {t('Expert en Motion Design', 'Motion Design expert')}
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mt-1 max-w-md">
                {t(
                  'Pubs animées et storytelling visuel, pensés et produits par moi-même.',
                  'Animated ads and visual storytelling, self-produced.'
                )}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 bg-white text-[#0b1226] font-semibold px-5 py-2.5 rounded-full text-sm shrink-0 group-hover:gap-3 transition-all">
            <Play size={14} /> {t('Voir mes créations', 'See my work')}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </section>
  )
}
