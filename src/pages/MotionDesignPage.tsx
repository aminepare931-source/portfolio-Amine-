import { motion } from 'framer-motion'
import { Film, Sparkles, MessageCircle } from 'lucide-react'
import MotionDemo from '../components/MotionDemo'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'

export default function MotionDesignPage() {
  const { t } = useLanguage()

  return (
    <div className="pt-28 md:pt-36 pb-10">
      {/* Bannière d'intro — sombre, animée */}
      <section className="px-4 sm:px-6 max-w-[1320px] mx-auto mb-14">
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#0b1226] border border-white/5 px-6 sm:px-12 py-14 sm:py-20">
          {/* fond animé */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)]" />
          <motion.div
            className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-[#3B82F6]/20 blur-[90px]"
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#60A5FA]/15 blur-[90px]"
            animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono text-white/70 uppercase tracking-widest mb-6"
            >
              <Film size={13} className="text-[#60A5FA]" /> {t('Nouvelle compétence', 'New skill')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl text-white mb-4"
            >
              Motion Design<span className="text-[#60A5FA]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-sm sm:text-base leading-relaxed"
            >
              {t(
                'Animation, storytelling visuel et vidéos publicitaires — pensées et produites par moi-même pour donner vie aux marques et aux idées.',
                'Animation, visual storytelling and ad videos — self-produced to bring brands and ideas to life.'
              )}
            </motion.p>
          </div>
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
          <h2 className="font-display text-3xl sm:text-4xl mb-8">
            {t('D\'autres créations arrivent', 'More creations coming')}<span className="text-[#3B82F6]">.</span>
          </h2>
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
