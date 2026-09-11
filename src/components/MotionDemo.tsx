import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Palette, Megaphone, ShieldCheck, Smartphone, Bot, ArrowRight, Play, Pause } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const SCENE_DURATION = 3400
const TOTAL_SCENES = 5

const SERVICES_ICONS = [Code2, Smartphone, Palette, Megaphone, Bot, ShieldCheck]

const SCENE_BG = [
  'radial-gradient(circle at 30% 20%, #123a7a 0%, #071c40 65%, #030f26 100%)',
  'radial-gradient(circle at 70% 30%, #1a2f6b 0%, #0a1638 65%, #030a1f 100%)',
  'radial-gradient(circle at 50% 60%, #0d2a5c 0%, #061530 65%, #020814 100%)',
  'radial-gradient(circle at 30% 70%, #163a72 0%, #081a3a 65%, #030d20 100%)',
  'radial-gradient(circle at 50% 40%, #0a3d91 0%, #071e4a 65%, #030f26 100%)',
]

function Words({ text, className, delayStart = 0 }: { text: string; className?: string; delayStart?: number }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delayStart + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.28em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  )
}

function FloatingParticles() {
  const particles = [
    { size: 90, left: '8%', top: '15%', dur: 7 },
    { size: 50, left: '85%', top: '20%', dur: 9 },
    { size: 70, left: '75%', top: '70%', dur: 8 },
    { size: 40, left: '15%', top: '75%', dur: 6.5 },
    { size: 30, left: '50%', top: '10%', dur: 10 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: 'radial-gradient(circle, rgba(91,168,255,0.35) 0%, rgba(91,168,255,0) 70%)',
          }}
          animate={{ y: [0, -22, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Grille subtile */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />
    </div>
  )
}

function WipeTransition({ children, sceneKey }: { children: React.ReactNode; sceneKey: number }) {
  return (
    <motion.div
      key={sceneKey}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)', transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      {children}
    </motion.div>
  )
}

function StatCount({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t0 = performance.now()
    const dur = 1100
    let raf: number
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return (
    <span className="font-display text-4xl sm:text-6xl text-white">
      {n}
      <span className="text-[#5ba8ff]">{suffix}</span>
    </span>
  )
}

export default function MotionDemo() {
  const [scene, setScene] = useState(0)
  const [playing, setPlaying] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setScene((s) => (s + 1) % TOTAL_SCENES), SCENE_DURATION)
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

      <motion.div
        animate={{ background: SCENE_BG[scene] }}
        transition={{ duration: 0.6 }}
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-900/10"
      >
        <FloatingParticles />

        <AnimatePresence mode="wait">
          {scene === 0 && (
            <WipeTransition sceneKey={0}>
              <motion.img
                src="/assets/amine-digital-logo.png"
                alt="AMINE DIGITAL"
                initial={{ scale: 0.3, rotate: -35, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 13 }}
                className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-[0_0_30px_rgba(91,168,255,0.6)]"
              />
              <motion.h3
                initial={{ y: 20, opacity: 0, letterSpacing: '0.4em' }}
                animate={{ y: 0, opacity: 1, letterSpacing: '0.05em' }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="font-display text-2xl sm:text-4xl text-white mt-5"
              >
                AMINE DIGITAL
              </motion.h3>
            </WipeTransition>
          )}

          {scene === 1 && (
            <WipeTransition sceneKey={1}>
              <div className="text-center max-w-lg">
                <Words text={t('Votre entreprise mérite', 'Your business deserves')} className="font-display text-2xl sm:text-4xl text-white leading-snug block" />
                <Words text={t('d\'être vue en ligne.', 'to be seen online.')} className="font-display text-2xl sm:text-4xl text-[#5ba8ff] leading-snug block" delayStart={0.5} />
              </div>
            </WipeTransition>
          )}

          {scene === 2 && (
            <WipeTransition sceneKey={2}>
              <div className="relative grid grid-cols-3 gap-4 sm:gap-6">
                {SERVICES_ICONS.map((Icon, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -120, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 13, delay: i * 0.08 }}
                    whileInView={{}}
                    className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                      className="absolute inset-0 rounded-2xl bg-[#5ba8ff]/20 blur-md"
                    />
                    <Icon size={22} className="relative text-[#5ba8ff]" />
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="mt-6 text-white/70 text-xs sm:text-sm font-mono uppercase tracking-widest"
              >
                {t('Web · Mobile · Design · IA', 'Web · Mobile · Design · AI')}
              </motion.p>
            </WipeTransition>
          )}

          {scene === 3 && (
            <WipeTransition sceneKey={3}>
              <div className="grid grid-cols-3 gap-8 sm:gap-14 text-center">
                {[
                  { to: 3, suffix: '+', label: t('ans d\'expérience', 'years exp.') },
                  { to: 6, suffix: '', label: t('domaines', 'domains') },
                  { to: 100, suffix: '%', label: t('sur-mesure', 'tailored') },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <StatCount target={s.to} suffix={s.suffix} />
                    <p className="text-[10px] sm:text-xs text-white/60 font-mono uppercase tracking-widest mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </WipeTransition>
          )}

          {scene === 4 && (
            <WipeTransition sceneKey={4}>
              <motion.h3
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                className="font-display text-3xl sm:text-5xl text-white text-center"
              >
                {t('Construisons ensemble.', 'Let\'s build together.')}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white text-[#0a3d91] font-bold rounded-full px-6 py-3 text-sm mt-6 cursor-default"
              >
                AMINE DIGITAL <ArrowRight size={16} />
              </motion.div>
            </WipeTransition>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 z-10">
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
      </motion.div>
    </section>
  )
}
