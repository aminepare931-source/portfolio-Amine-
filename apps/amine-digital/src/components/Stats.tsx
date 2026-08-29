import Counter from './Counter'
import { Fade } from './Reveal'

const STATS = [
  { to: 3, suffix: '+', label: "ans d'expérience en développement" },
  { to: 6, suffix: '', label: 'domaines de service couverts' },
  { to: 1, suffix: '', label: 'seul interlocuteur, du début à la fin' },
]

export default function Stats() {
  return (
    <section className="bg-govDark text-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-3 divide-x divide-white/15">
        {STATS.map((s, i) => (
          <Fade key={s.label} delay={i * 0.1} className="text-center px-2 sm:px-6">
            <div className="font-display text-4xl sm:text-6xl mb-2">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <p className="text-[11px] sm:text-sm text-white/60 leading-snug max-w-[140px] sm:max-w-[180px] mx-auto">
              {s.label}
            </p>
          </Fade>
        ))}
      </div>
    </section>
  )
}
