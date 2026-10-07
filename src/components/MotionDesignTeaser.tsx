import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Film, ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { playClickSound } from '../lib/sound'

// Fondu doux en haut de la photo pour qu'elle se fonde dans le fond clair
// de la page là où elle dépasse du cadre (même technique que le bandeau Marquee,
// pour rester cohérent visuellement).
const TOP_FADE_MASK = 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)'

export default function MotionDesignTeaser() {
  const { t } = useLanguage()

  return (
    <section className="px-4 sm:px-6 max-w-[1320px] mx-auto py-8 sm:py-10">
      <Link
        to="/projets#motion-design"
        onClick={playClickSound}
        className="group relative flex flex-col md:flex-row md:items-end gap-8 md:gap-10 w-full rounded-[28px] sm:rounded-[32px] bg-[#070b16] border border-white/5 px-6 sm:px-12 py-12 sm:py-16 hover:border-white/15 transition-colors"
      >
        {/* fond — contenu dans le cadre */}
        <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_70%_at_30%_50%,#000_60%,transparent_100%)]" />
          <motion.div
            className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-[#3B82F6]/20 blur-[90px]"
            animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-[#f97316]/10 blur-[90px]"
            animate={{ x: [0, 25, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-6 flex-1">
          <div className="text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-3 flex items-center gap-2">
              <Film size={12} className="text-[#60A5FA]" /> {t('Nouvelle compétence', 'New skill')}
            </p>
            <h3
              className="font-display uppercase text-white leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.5rem)' }}
            >
              Motion
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#93c5fd] to-white bg-clip-text text-transparent">
                Design.
              </span>
            </h3>
            <p className="text-white/50 text-xs sm:text-sm mt-4 max-w-sm">
              {t(
                'Pubs animées et storytelling visuel, pensés et produits par moi-même.',
                'Animated ads and visual storytelling, self-produced.'
              )}
            </p>
          </div>

          <span className="inline-flex items-center gap-2 bg-white text-[#0b1226] font-semibold px-5 py-3 rounded-full text-sm shrink-0 w-fit group-hover:gap-3 transition-all">
            <Play size={14} /> {t('Voir mes créations', 'See my work')}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Photo — même colonne dédiée que le texte (pas d'absolute), centrée
            et ancrée en bas du cadre, casse le cadre vers le haut comme les
            portraits du bandeau Marquee. */}
        <div className="relative z-10 hidden md:flex items-end justify-center w-40 lg:w-52 shrink-0 self-stretch pointer-events-none">
          <img
            src="/assets/about2.jpg"
            alt="Mouhamed Amine Paré"
            className="w-full aspect-square object-cover rounded-[1.75rem] rotate-[2deg] -mt-14 lg:-mt-20"
            style={{
              maskImage: TOP_FADE_MASK,
              WebkitMaskImage: TOP_FADE_MASK,
              filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.5))',
            }}
          />
        </div>
      </Link>
    </section>
  )
}
