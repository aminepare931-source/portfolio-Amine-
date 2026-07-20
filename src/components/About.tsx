import Reveal from './Reveal'

const STATS = [
  { n: '10+', l: 'Projets livrés' },
  { n: '3+', l: 'Années de code' },
  { n: '∞', l: 'Curiosité' },
]

const TAGS = ['Self-taught', 'Burkina Faso 🇧🇫', 'Frontend', 'Fullstack', 'E-Commerce', 'Mobile Money', 'UI/UX', 'Supabase']

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <div className="grid md:grid-cols-[300px_1fr] gap-16">
        <Reveal>
          <div className="relative">
            <img
              src="/assets/about1.jpg"
              alt="Amine Paré"
              className="w-full rounded-2xl border border-stroke object-cover min-h-[320px]"
              style={{ boxShadow: '6px 6px 0 #FF5A1F' }}
            />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full accent-gradient flex items-center justify-center text-black font-display text-xl">
              3
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
              <span className="w-6 h-px bg-clay" /> Profil
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] mb-8">
              Autodidacte,<br /><span className="font-serif italic normal-case text-clay">Passionné</span>,<br />Déterminé.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              Salut, moi c'est <strong className="text-text">Amine Paré</strong>. Développeur web basé à Bobo-Dioulasso, Burkina Faso.
              100% autodidacte depuis 3 ans — pas d'école, juste une curiosité sans limite et des milliers d'heures de pratique sur de vrais projets.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              Je construis des expériences web premium adaptées au contexte africain : interfaces élégantes, e-commerces performants,
              marketplaces, intégrations Mobile Money. Mon approche : design-first, performance-driven, user-obsessed.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Chaque ligne de code que j'écris porte une conviction : la tech peut transformer le Burkina Faso.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-6 my-8 py-6 border-y border-stroke">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-clay">{s.n}</div>
                  <div className="text-xs text-muted uppercase tracking-wide mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="text-xs font-mono border border-stroke text-muted px-3 py-1.5 hover:border-clay hover:text-clay transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
