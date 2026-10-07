import { motion } from 'framer-motion'
import { Layers, Code2, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react'
import { SiReact, SiTypescript, SiNodedotjs, SiWhatsapp, SiTailwindcss, SiCloudflare } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'

type TechItem = {
  name: string
  desc: [string, string]
  icon: React.ElementType
  color: string
  col: number
  row: number
}

const TECH_ITEMS: TechItem[] = [
  { name: 'React & Vite', desc: ['Interface moderne et performante', 'Modern, high-performance UI'], icon: SiReact, color: '#61DAFB', col: 1, row: 1 },
  { name: 'TypeScript', desc: ['Code plus sûr et maintenable', 'Safer, maintainable code'], icon: SiTypescript, color: '#3178C6', col: 3, row: 1 },
  { name: 'Node.js & Express', desc: ['API robuste et scalable', 'Robust, scalable API'], icon: SiNodedotjs, color: '#5FA04E', col: 5, row: 1 },
  { name: 'Mobile Money (CinetPay)', desc: ['Paiements mobiles sécurisés', 'Secure mobile payments'], icon: Zap, color: '#F59E0B', col: 1, row: 3 },
  { name: 'WhatsApp API', desc: ['Notifications et messagerie', 'Notifications & messaging'], icon: SiWhatsapp, color: '#25D366', col: 5, row: 3 },
  { name: 'Tailwind CSS', desc: ['Design moderne et responsive', 'Modern, responsive design'], icon: SiTailwindcss, color: '#38BDF8', col: 1, row: 5 },
  { name: 'Cloudflare', desc: ['Sécurité, CDN et performance', 'Security, CDN & performance'], icon: SiCloudflare, color: '#F38020', col: 3, row: 5 },
  { name: 'REST APIs', desc: ['Intégrations et communication', 'Integrations & communication'], icon: ShieldCheck, color: '#60A5FA', col: 5, row: 5 },
]

// Fondu doux sur le bas/la droite de la photo pour qu'elle se fonde dans le
// fond sombre de la carte, comme un détourage, sans vrai PNG transparent.
const PHOTO_FADE_MASK =
  'linear-gradient(to bottom, black 55%, transparent 96%), linear-gradient(to right, black 75%, transparent 100%)'

function HLine() {
  return (
    <div className="relative hidden lg:flex items-center justify-center h-full">
      <div className="w-full h-px bg-gradient-to-r from-[#3B82F6]/70 via-[#60A5FA]/70 to-[#3B82F6]/70 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
    </div>
  )
}

function VLine() {
  return (
    <div className="relative hidden lg:flex items-center justify-center w-full">
      <div className="h-full w-px bg-gradient-to-b from-[#3B82F6]/70 via-[#60A5FA]/70 to-[#3B82F6]/70 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
      <span className="absolute w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
    </div>
  )
}

export default function Marquee() {
  const { t } = useLanguage()

  return (
    <div className="relative bg-[#0b1226] py-14 sm:py-16 lg:py-20 z-20 overflow-hidden">
      {/* Fond — grille + halo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_60%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(59,130,246,0.14)_0%,transparent_45%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.1)_0%,transparent_45%)]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-center">
          {/* Colonne gauche — photo détourée + titre */}
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Ligne circuit décorative (desktop uniquement) */}
            <svg
              className="hidden lg:block absolute -top-10 -left-6 w-40 h-24 text-[#3B82F6]/50 pointer-events-none"
              viewBox="0 0 160 96"
              fill="none"
            >
              <path d="M4 4 H60 Q68 4 68 12 V60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="4" cy="4" r="3" fill="currentColor" />
              <circle cx="68" cy="60" r="2.5" fill="currentColor" />
            </svg>

            <div className="relative w-48 h-60 sm:w-56 sm:h-72 lg:w-full lg:max-w-[280px] lg:h-80">
              <img
                src="/assets/about1.jpg"
                alt="Mouhamed Amine Paré"
                className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
                style={{ maskImage: PHOTO_FADE_MASK, WebkitMaskImage: PHOTO_FADE_MASK }}
              />

              {/* Tag STACK */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute left-0 -bottom-5 inline-flex items-center gap-1.5 bg-[#0b1226] border border-white/15 rounded-full pl-2 pr-3 py-1.5 shadow-lg"
              >
                <span className="w-5 h-5 rounded-full bg-[#3B82F6]/20 flex items-center justify-center">
                  <Layers size={11} className="text-[#60A5FA]" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">{t('Stack', 'Stack')}</span>
              </motion.div>
            </div>

            <div className="mt-10 lg:mt-8 max-w-sm">
              <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
                {t('Mon environnement', 'My technical')}
                <br />
                <span
                  className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent"
                  style={{ filter: 'drop-shadow(0 0 18px rgba(59,130,246,0.45))' }}
                >
                  {t('technique', 'environment')}
                </span>
              </h3>
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                {t(
                  'Les technologies que j\'utilise au quotidien pour concevoir des produits rapides, fiables et prêts à être déployés.',
                  'The technologies I use day to day to build products that are fast, reliable and production-ready.'
                )}
              </p>
            </div>
          </div>

          {/* Colonne droite — diagramme réseau (lg+) */}
          <div
            className="hidden lg:grid relative"
            style={{
              gridTemplateColumns: '1fr 28px 1fr 28px 1fr 40px 168px',
              gridTemplateRows: 'auto 28px auto 28px auto',
            }}
          >
            {TECH_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.name}
                  style={{ gridColumn: item.col, gridRow: item.row }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-white/25 rounded-xl px-4 py-3.5 transition-colors"
                >
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-lg mb-2.5"
                    style={{ background: `${item.color}1f`, boxShadow: `inset 0 0 0 1px ${item.color}40` }}
                  >
                    <Icon size={17} style={{ color: item.color }} />
                  </span>
                  <p className="text-white text-[13px] font-semibold leading-tight">{item.name}</p>
                  <p className="text-white/45 text-[11px] leading-snug mt-1">{t(item.desc[0], item.desc[1])}</p>
                </motion.div>
              )
            })}

            {/* Hub central */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              style={{ gridColumn: 3, gridRow: 3 }}
              className="relative flex flex-col items-center justify-center text-center rounded-2xl px-4 py-5 bg-gradient-to-b from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/50 shadow-[0_0_30px_rgba(59,130,246,0.25)]"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#3B82F6]/20 border border-[#60A5FA]/50 mb-2">
                <Code2 size={20} className="text-[#93c5fd]" />
              </span>
              <p className="text-white font-display text-sm tracking-[0.15em]">FULL-STACK</p>
              <p className="text-white/45 text-[10px] font-mono mt-1 tracking-wide">
                {t('Moderne · Performant · Sécurisé', 'Modern · Fast · Secure')}
              </p>
            </motion.div>

            {/* Résultat */}
            <div style={{ gridColumn: 7, gridRow: 3 }} className="flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                <CheckCircle2 size={11} className="text-[#34d399]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">{t('Résultat', 'Result')}</span>
              </span>
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.3 }}
                className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 px-4 py-5 text-center"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#34d399]/15 border border-[#34d399]/40 mx-auto mb-2.5">
                  <CheckCircle2 size={18} className="text-[#34d399]" />
                </span>
                <p className="text-white font-display text-sm">{t('Prêt production', 'Production ready')}</p>
                <p className="text-white/45 text-[10px] leading-snug mt-1.5">
                  {t('Des solutions fiables, performantes et évolutives.', 'Reliable, high-performing, scalable solutions.')}
                </p>
              </motion.div>
            </div>

            {/* Connecteurs */}
            <div style={{ gridColumn: 2, gridRow: 1 }}><HLine /></div>
            <div style={{ gridColumn: 4, gridRow: 1 }}><HLine /></div>
            <div style={{ gridColumn: 2, gridRow: 5 }}><HLine /></div>
            <div style={{ gridColumn: 4, gridRow: 5 }}><HLine /></div>
            <div style={{ gridColumn: 2, gridRow: 3 }}><HLine /></div>
            <div style={{ gridColumn: 4, gridRow: 3 }}><HLine /></div>
            <div style={{ gridColumn: 6, gridRow: 3 }}><HLine /></div>
            <div style={{ gridColumn: 3, gridRow: 2 }}><VLine /></div>
            <div style={{ gridColumn: 3, gridRow: 4 }}><VLine /></div>
          </div>

          {/* Fallback mobile/tablette — grille de badges simple */}
          <div className="flex lg:hidden flex-wrap justify-center gap-2.5">
            {TECH_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10"
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                    style={{ background: `${item.color}22`, boxShadow: `inset 0 0 0 1px ${item.color}40` }}
                  >
                    <Icon size={14} style={{ color: item.color }} />
                  </span>
                  <span className="font-mono text-[11px] font-medium text-white/80 tracking-wide whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
