import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Palette, Megaphone, ShieldCheck, Smartphone, Bot, ArrowRight, Play, Pause } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const SCENE_DURATION = 3200

const SERVICES_ICONS = [Code2, Smartphone, Palette, Megaphone, Bot, ShieldCheck]

export default function MotionDemo() {
  const [scene, setScene] = useState(0)
  const [playing, setPlaying] = useState(true)
  const { t } = useLanguage()
  const TOTAL_SCENES = 4

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setScene((s) => (s + 1) % TOTAL_SCENES)
    }, SCENE_DURATION)
    return () => clearInterval(id)
  }, [playing])

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
        <span className="w-6 h-px bg-clay" /> {t('Démo personnelle', 'Personal demo')}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl">
          {t('Motion Design', 'Motion Design')}<span className="text-[#3B82F6]">.</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-xs font-sans">
          {t(
            'Petite pub animée auto-produite pour AMINE DIGITAL — pour montrer ce savoir-faire aussi.',
            'A short self-made animated ad for AMINE DIGITAL — to show this skill too.'
          )}
        </p>
      </div>

      {/* Cadre "vidéo" */}
      <div
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10"
        style={{ background: 'radial-gradient(circle at 30% 20%, #123a7a 0%, #071c40 65%, #030f26 100%)' }}
      >
        <AnimatePresence mode="wait">
          {scene === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            >
              <motion.img
                src="/assets/amine-digital-logo.png"
                alt="AMINE DIGITAL"
                initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                className="w-20 h-20 sm:w-28 sm:h-28"
              />
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-display text-2xl sm:text-4xl text-white tracking-wide"
              >
                AMINE DIGITAL
              </motion.h3>
            </motion.div>
          )}

          {scene === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl sm:text-4xl text-white leading-snug max-w-lg"
              >
                {t('Votre entreprise mérite', 'Your business deserves')}
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-2xl sm:text-4xl text-[#5ba8ff] leading-snug max-w-lg"
              >
                {t('d\'être vue en ligne.', 'to be seen online.')}
              </motion.p>
            </motion.div>
          )}

          {scene === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {SERVICES_ICONS.map((Icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: i * 0.09 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm"
                  >
                    <Icon size={22} className="text-[#5ba8ff]" />
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-white/70 text-xs sm:text-sm font-mono uppercase tracking-widest"
              >
                {t('Web · Mobile · Design · IA', 'Web · Mobile · Design · AI')}
              </motion.p>
            </motion.div>
          )}

          {scene === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
            >
              <motion.h3
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                className="font-display text-3xl sm:text-5xl text-white"
              >
                {t('Construisons ensemble.', 'Let\'s build together.')}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-2 bg-white text-[#0a3d91] font-bold rounded-full px-6 py-3 text-sm"
              >
                AMINE DIGITAL <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contrôles + progression */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-colors shrink-0"
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <div className="flex-1 flex gap-1.5">
            {[...Array(TOTAL_SCENES)].map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden">
                {i === scene && playing && (
                  <motion.div
                    key={scene}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SCENE_DURATION / 1000, ease: 'linear' }}
                    className="h-full bg-white"
                  />
                )}
                {i < scene && <div className="h-full w-full bg-white" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
