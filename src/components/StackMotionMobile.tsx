import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers, ArrowRight, Sparkles, Film, Eye, Play } from 'lucide-react'
import { SiReact, SiTypescript, SiNodedotjs, SiExpress, SiTailwindcss, SiMongodb } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import { playClickSound } from '../lib/sound'

const MINI_TECH = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express', icon: SiExpress, color: '#ffffff' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
]

const MINI_FEATURES = [
  { icon: Sparkles, label: ['Animation', 'Animation'] as [string, string] },
  { icon: Eye, label: ['Storytelling', 'Storytelling'] as [string, string] },
  { icon: Play, label: ['Video Ads', 'Video Ads'] as [string, string] },
]

// Version mobile très compacte des sections Stack + Motion Design :
// un carousel horizontal (swipe) à 2 cartes, pour occuper le moins
// de place possible en hauteur (pas de grosse photo, texte réduit).
export default function StackMotionMobile() {
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActive(idx)
  }

  return (
    <div className="lg:hidden px-4 sm:px-6 py-6">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6"
      >
        {/* Carte Stack */}
        <div className="snap-center shrink-0 w-[86%] sm:w-[70%] rounded-[1.75rem] bg-[#0b1226] border border-white/10 p-5 overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_70%_at_30%_20%,#000_60%,transparent_100%)]" />

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 mb-3">
              <span className="w-6 h-6 rounded-md bg-[#3B82F6]/20 flex items-center justify-center">
                <Layers size={12} className="text-[#60A5FA]" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">{t('Stack', 'Stack')}</span>
            </span>

            <h3 className="font-display text-xl text-white leading-tight">
              {t('Mon environnement', 'My technical')}
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">
                {t('technique', 'environment')}
              </span>
            </h3>
            <p className="text-white/45 text-xs mt-2 leading-relaxed">
              {t(
                'Les technologies que j\'utilise au quotidien pour concevoir des produits rapides, fiables et prêts à être déployés.',
                'The technologies I use day to day to build fast, reliable, production-ready products.'
              )}
            </p>

            <div className="grid grid-cols-3 gap-1.5 mt-4">
              {MINI_TECH.map((item) => {
                const Icon = item.icon
                return (
                  <span
                    key={item.name}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/10"
                  >
                    <Icon size={12} style={{ color: item.color }} className="shrink-0" />
                    <span className="font-mono text-[10px] text-white/75 truncate">{item.name}</span>
                  </span>
                )
              })}
            </div>

            <Link
              to="/competences"
              onClick={playClickSound}
              className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold py-2.5 rounded-full text-xs"
            >
              {t('Voir toutes les technologies', 'See all technologies')} <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Carte Motion Design */}
        <Link
          to="/projets#motion-design"
          onClick={playClickSound}
          className="snap-center shrink-0 w-[86%] sm:w-[70%] rounded-[1.75rem] bg-[#070b16] border border-white/10 overflow-hidden relative flex flex-col"
        >
          <div className="relative h-32 shrink-0">
            <img src="/assets/about2.jpg" alt="Motion Design" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/20 to-transparent" />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-white/70">
              <Film size={10} className="text-[#60A5FA]" /> {t('Nouvelle compétence', 'New skill')}
            </span>
            <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
              <ArrowRight size={13} className="text-white" />
            </span>
            <h3 className="absolute bottom-2.5 left-3 font-display text-lg text-white leading-none">
              Motion <span className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent">Design.</span>
            </h3>
          </div>

          <div className="flex items-center justify-around gap-1 border-t border-white/10 px-2 py-3">
            {MINI_FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <span key={i} className="flex items-center gap-1.5 text-white/60">
                  <Icon size={12} className="text-[#60A5FA]" />
                  <span className="text-[10px] font-medium whitespace-nowrap">{t(...f.label)}</span>
                </span>
              )
            })}
          </div>
        </Link>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <span className={`h-1 rounded-full transition-all duration-300 ${active === 0 ? 'w-6 bg-[#3B82F6]' : 'w-4 bg-slate-900/15'}`} />
        <span className={`h-1 rounded-full transition-all duration-300 ${active === 1 ? 'w-6 bg-[#3B82F6]' : 'w-4 bg-slate-900/15'}`} />
      </div>
    </div>
  )
}
