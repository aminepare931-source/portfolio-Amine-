import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Eye, Play, ArrowRight, ArrowUpRight, Circle, Target } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { playClickSound } from '../lib/sound'

const FEATURES: { icon: typeof Sparkles; title: [string, string]; desc: [string, string] }[] = [
  {
    icon: Sparkles,
    title: ['Animation', 'Animation'],
    desc: ['Des mouvements qui captivent et donnent vie à vos idées.', 'Movement that captivates and brings your ideas to life.'],
  },
  {
    icon: Eye,
    title: ['Visual storytelling', 'Visual storytelling'],
    desc: ['Des histoires visuelles qui marquent les esprits.', 'Visual stories that leave a mark.'],
  },
  {
    icon: Play,
    title: ['Video ads', 'Video ads'],
    desc: ['Des formats percutants pour plus d\'impact.', 'High-impact formats that get noticed.'],
  },
]

// Fondu doux en haut de la photo pour qu'elle se fonde dans la carte,
// même technique que le reste du site.
const TOP_FADE_MASK = 'linear-gradient(to bottom, transparent 0%, black 22%, black 100%)'

export default function MotionDesignTeaser() {
  const { t } = useLanguage()

  return (
    <section className="hidden lg:block px-4 sm:px-6 max-w-[1400px] mx-auto py-8 sm:py-10">
      <Link
        to="/projets#motion-design"
        onClick={playClickSound}
        className="group relative block w-full rounded-[28px] sm:rounded-[32px] bg-[#070b16] border border-white/5 px-6 sm:px-10 lg:px-14 pt-10 sm:pt-12 pb-0 hover:border-white/15 transition-colors overflow-hidden"
      >
        {/* fond — grille + halos */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_25%_35%,#000_60%,transparent_100%)]" />
          <motion.div
            className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-[#ef4444]/15 blur-[110px]"
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-[#3B82F6]/15 blur-[100px]"
            animate={{ x: [0, 25, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Creative mode indicator */}
        <div className="relative z-10 hidden sm:flex items-center justify-end gap-1.5 mb-4">
          <Circle size={7} className="text-[#ef4444] fill-[#ef4444]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
            {t('Creative mode', 'Creative mode')}
          </span>
        </div>

        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-14 items-center">
          {/* Texte */}
          <div className="text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center gap-2">
              <Sparkles size={12} className="text-[#60A5FA]" /> {t('Nouvelle compétence', 'New skill')}
            </p>
            <h3
              className="font-display uppercase text-white leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 4.75rem)' }}
            >
              Motion
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                Design.
              </span>
            </h3>
            <p className="text-white/50 text-sm mt-5 max-w-sm">
              {t(
                'Pubs animées et storytelling visuel, pensés et produits par moi-même.',
                'Animated ads and visual storytelling, self-produced.'
              )}
            </p>

            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold px-6 py-3.5 rounded-full text-sm mt-8 group-hover:gap-3 transition-all shadow-[0_8px_24px_rgba(59,130,246,0.35)]">
              <Play size={14} fill="white" /> {t('Voir mes créations', 'See my work')}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>

          {/* Photo — carte rouge en arrière-plan, casse le cadre vers le haut */}
          <div className="relative hidden md:flex justify-center w-[260px] lg:w-[300px] shrink-0 self-end">
            {/* carte décorative derrière, légèrement tournée */}
            <div className="absolute inset-x-4 -top-8 bottom-0 rounded-[1.75rem] bg-gradient-to-b from-[#b91c1c] to-[#7f1d1d] rotate-[4deg] opacity-90" />
            <div className="absolute -left-6 top-1/4 bottom-6 w-3 rounded-full bg-[#3B82F6]/30 blur-[2px]" />

            <div className="relative w-full -mt-16 lg:-mt-20">
              <img
                src="/assets/about2.jpg"
                alt="Mouhamed Amine Paré"
                className="w-full aspect-square object-cover rounded-[1.75rem] rotate-[-2deg]"
                style={{
                  maskImage: TOP_FADE_MASK,
                  WebkitMaskImage: TOP_FADE_MASK,
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                }}
              />
              {/* pastille MOTION DESIGN */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#0b1226]/90 backdrop-blur border border-white/15 rounded-full pl-2 pr-3 py-1.5">
                <Target size={11} className="text-[#60A5FA]" />
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/80 whitespace-nowrap">
                  {t('Motion design', 'Motion design')}
                </span>
              </div>
            </div>
          </div>

          {/* Pagination 01/03 */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-2 text-white/40">
            <span className="text-xs font-mono text-[#60A5FA]">01</span>
            <span className="w-px h-6 bg-white/20" />
            <span className="text-[10px] font-mono">/ 03</span>
          </div>
        </div>

        {/* 3 features */}
        <div className="relative z-10 mt-10 sm:mt-12 grid sm:grid-cols-3 border-t border-white/10">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className={`flex items-start gap-3 py-6 px-1 sm:px-5 ${i > 0 ? 'sm:border-l border-white/10' : ''}`}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/25 shrink-0">
                  <Icon size={17} className="text-[#60A5FA]" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-semibold uppercase tracking-wide">{t(...f.title)}</p>
                  <p className="text-white/45 text-[11px] leading-snug mt-1">{t(...f.desc)}</p>
                </div>
                <ArrowUpRight size={15} className="text-white/25 shrink-0 mt-1 hidden sm:block" />
              </div>
            )
          })}
        </div>
      </Link>
    </section>
  )
}
