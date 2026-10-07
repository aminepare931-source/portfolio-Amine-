import { motion } from 'framer-motion'
import { Zap, ShieldCheck, Sparkles } from 'lucide-react'
import { SiReact, SiTypescript, SiNodedotjs, SiSupabase, SiTailwindcss, SiCloudflare } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'

const TECH_ITEMS = [
  { name: 'React & Vite', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js & Express', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Mobile Money (CinetPay)', icon: Zap, color: '#F59E0B' },
  { name: 'WhatsApp API', icon: Sparkles, color: '#25D366' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
  { name: 'REST APIs', icon: ShieldCheck, color: '#60A5FA' },
]

// Fondu doux en haut de la photo pour qu'elle se fonde dans le fond clair
// de la page au lieu de montrer un bord rectangulaire net en dépassant du cadre.
const TOP_FADE_MASK = 'linear-gradient(to bottom, transparent 0%, black 32%, black 100%)'

export default function Marquee() {
  const { t } = useLanguage()

  return (
    <div className="relative bg-[#0b1226] py-10 sm:py-12 z-20">
      {/* Fond — grille + halo (contenu dans la bande, ne bloque pas le dépassement des photos) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(59,130,246,0.12)_0%,transparent_45%),radial-gradient(circle_at_85%_50%,rgba(59,130,246,0.12)_0%,transparent_45%)]" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Portrait — bookend gauche, casse le cadre vers le haut.
            Affiché seulement à partir de lg : c'est le seul breakpoint où
            la rangée passe en flex-row, donc le seul où ce débordement vers
            le haut reste bien positionné au-dessus de la bande (sinon, en
            flex-col, la marge négative le fait chevaucher la section du dessus). */}
        <div className="hidden lg:flex items-end gap-3 shrink-0">
          <div className="relative w-28 h-40 sm:w-36 sm:h-48 -mt-24 sm:-mt-32 shrink-0">
            <img
              src="/assets/about1.jpg"
              alt="Mouhamed Amine Paré au travail"
              className="absolute inset-0 w-full h-full object-cover rounded-[1.75rem] rotate-[-4deg]"
              style={{
                maskImage: TOP_FADE_MASK,
                WebkitMaskImage: TOP_FADE_MASK,
                filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.5))',
              }}
            />
          </div>
          <div className="hidden lg:block pb-1">
            <p className="text-white/35 text-[9px] uppercase tracking-[0.25em] font-mono">{t('Stack', 'Stack')}</p>
            <p className="text-white font-display text-sm font-bold">{t('Au quotidien', 'Daily driver')}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 flex-1">
          {TECH_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all"
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}22`, boxShadow: `inset 0 0 0 1px ${item.color}40` }}
                >
                  <Icon size={14} style={{ color: item.color }} />
                </span>
                <span className="font-mono text-[11px] sm:text-xs font-medium text-white/80 group-hover:text-white tracking-wide whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Portrait — bookend droite, casse le cadre vers le haut (même raison : lg uniquement) */}
        <div className="hidden lg:flex items-end gap-3 shrink-0">
          <div className="hidden lg:block text-right pb-1">
            <p className="text-white/35 text-[9px] uppercase tracking-[0.25em] font-mono">{t('Résultat', 'Result')}</p>
            <p className="text-white font-display text-sm font-bold">{t('Prêt production', 'Production ready')}</p>
          </div>
          <div className="relative w-28 h-40 sm:w-36 sm:h-48 -mt-24 sm:-mt-32 shrink-0">
            <img
              src="/assets/contact-avatar.jpg"
              alt="Mouhamed Amine Paré"
              className="absolute inset-0 w-full h-full object-cover rounded-[1.75rem] rotate-[4deg]"
              style={{
                maskImage: TOP_FADE_MASK,
                WebkitMaskImage: TOP_FADE_MASK,
                filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.5))',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
