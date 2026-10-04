import { motion } from 'framer-motion'
import { Film, Sparkles, MessageCircle, Zap, Clapperboard, PenTool } from 'lucide-react'
import MotionDemo from './MotionDemo'
import Reveal from './Reveal'
import { useLanguage } from '../context/LanguageContext'

export default function MotionDesignSection() {
  const { t } = useLanguage()

  const FEATURES = [
    {
      icon: PenTool,
      title: t('Storytelling visuel', 'Visual storytelling'),
      desc: t('Chaque scène raconte quelque chose — pas juste du mouvement pour faire joli.', 'Every scene tells something — not motion for its own sake.'),
    },
    {
      icon: Zap,
      title: t('Production rapide', 'Fast turnaround'),
      desc: t('De l\'idée à la vidéo livrée, en autonomie complète — écriture, animation, montage.', 'From idea to delivered video, fully self-produced — writing, animation, editing.'),
    },
    {
      icon: Clapperboard,
      title: t('Sur-mesure pour la marque', 'Tailored to the brand'),
      desc: t('Couleurs, rythme et ton adaptés à chaque entreprise, pas un template générique.', 'Colors, pacing and tone fitted to each business — never a generic template.'),
    },
  ]

  return (
    <div id="motion-design" className="pt-10 sm:pt-16">
      {/* Bannière — typo éditoriale XXL */}
      <section className="px-4 sm:px-6 max-w-[1320px] mx-auto mb-10">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#070b16] border border-white/5 px-6 sm:px-14 py-14 sm:py-24">
          {/* fond animé */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000_60%,transparent_100%)]" />
          <motion.div
            className="absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-[#3B82F6]/25 blur-[100px]"
            animate={{ x: [0, 50, 0], y: [0, 25, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-1/5 w-72 h-72 rounded-full bg-[#f97316]/15 blur-[100px]"
            animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono text-white/70 uppercase tracking-widest mb-8"
            >
              <Film size={13} className="text-[#60A5FA]" /> {t('Nouvelle compétence', 'New skill')}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display uppercase text-white leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
            >
              Motion
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#93c5fd] to-white bg-clip-text text-transparent">
                Design.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/55 text-sm sm:text-lg leading-relaxed max-w-lg"
            >
              {t(
                'Animation, storytelling visuel et vidéos publicitaires — pensées et produites par moi-même pour donner vie aux marques et aux idées.',
                'Animation, visual storytelling and ad videos — self-produced to bring brands and ideas to life.'
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pourquoi le Motion Design — 3 cartes */}
      <section className="px-4 sm:px-6 max-w-[1320px] mx-auto mb-14">
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-stroke bg-surface/40 p-6 hover:border-clay/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-clay/10 border border-clay/20 flex items-center justify-center mb-4">
                  <Icon size={19} className="text-clay" />
                </div>
                <h3 className="font-display text-base text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Projet #1 — démo interactive AMINE DIGITAL */}
      <MotionDemo />

      {/* Zone d'accueil pour les prochaines vidéos motion */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
            <span className="w-6 h-px bg-clay" /> {t('Projets vidéo', 'Video projects')}
          </div>
          <h3 className="font-display text-3xl sm:text-4xl mb-8">
            {t('D\'autres créations arrivent', 'More creations coming')}<span className="text-[#3B82F6]">.</span>
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-center py-14 px-8 border-2 border-dashed border-slate-900/15 rounded-3xl bg-surface/30">
            <Sparkles size={26} className="text-clay/40 mx-auto mb-4" />
            <p className="text-sm font-medium text-slate-900/60 max-w-sm mx-auto mb-6">
              {t(
                'Les prochaines vidéos motion design et projets animés apparaîtront ici au fur et à mesure.',
                'Upcoming motion design videos and animated projects will appear here over time.'
              )}
            </p>
            <a
              href="https://wa.me/22655300868?text=Bonjour%20Amine,%20je%20souhaite%20discuter%20d%27un%20projet%20motion%20design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clay text-black font-medium px-5 py-2.5 rounded-full hover:scale-105 transition-transform text-sm"
            >
              <MessageCircle size={16} /> {t('Discuter d\'un projet', 'Discuss a project')}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
