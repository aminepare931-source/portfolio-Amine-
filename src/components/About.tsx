import Reveal from './Reveal'
import ScrambleIn from './ScrambleIn'
import { VIDEOS } from '../config/videos'

const STATS = [
  { n: '10+', l: 'Projets livrés' },
  { n: '3+', l: 'Années d\'expérience' },
  { n: '5+', l: 'Domaines maîtrisés' },
  { n: '∞', l: 'Curiosité' },
]

const TAGS = [
  'Self-taught', 'Burkina Faso 🇧🇫', 'Développement Web', 'Design Graphique',
  'Marketing Digital', 'Copywriting', 'Formation', 'Automatisation & IA',
  'E-Commerce', 'Mobile Money', 'Supabase', 'Cloudflare',
]

const SERVICES = [
  { n: 'Développement Fullstack', d: 'Frontend, backend, bases de données — du concept au déploiement.' },
  { n: 'Design Graphique', d: 'Identité visuelle, logos, maquettes Figma.' },
  { n: 'Marketing Digital', d: 'Stratégie réseaux sociaux, community management, SEO.' },
  { n: 'Rédaction & Copywriting', d: 'Textes de vente, contenu blog, scripts vidéo.' },
  { n: 'Formation & Cours', d: 'Programmes, supports pédagogiques, mentorat.' },
  { n: 'Automatisation & IA', d: 'Chatbots, intégrations API, prompt engineering.' },
]

export default function About() {
  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-32 overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover -z-10" src={VIDEOS.statsAbout} />
      <div className="absolute inset-0 bg-bg/85 -z-10" />

      <div className="relative px-6 max-w-[1200px] mx-auto">
      {/* Watermark géant en fond */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none select-none font-display uppercase leading-none whitespace-nowrap"
        style={{
          fontSize: 'clamp(90px, 22vw, 380px)',
          letterSpacing: '-0.04em',
          opacity: 0.05,
          color: '#E8C97A',
        }}
      >
        AMINE.DEV
      </div>

      <div className="relative grid md:grid-cols-[300px_1fr] gap-16 mb-20">
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
              <ScrambleIn text="Amine.Dev" delay={200} />
              <br />
              <span className="font-serif italic normal-case text-clay">
                <ScrambleIn text="Un digital complet." delay={700} />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              Salut, moi c'est <strong className="text-text">Amine Paré</strong>, connu en ligne sous <strong className="text-text">Amine.Dev</strong>.
              Basé à Bobo-Dioulasso, Burkina Faso, je suis <strong className="text-text">développeur fullstack</strong> — frontend, backend,
              bases de données — formé en construisant de vrais produits plutôt qu'en suivant un programme. Trois ans à apprendre vite,
              livrer vite, et corriger encore plus vite.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              Contrairement à beaucoup de développeurs, je ne me suis jamais arrêté au code. J'ai appris à
              <strong className="text-text"> designer</strong> mes propres interfaces, à <strong className="text-text">rédiger</strong> des
              textes qui vendent, à <strong className="text-text">gérer des réseaux sociaux</strong>, à <strong className="text-text">former</strong> d'autres
              autodidactes, et à <strong className="text-text">automatiser</strong> des tâches avec des chatbots et des scripts.
              Je vois le digital comme un tout — pas des cases séparées.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              Cette polyvalence me permet de porter un projet du concept jusqu'au lancement, sans dépendre
              d'une dizaine de prestataires différents : je conçois, je code, je designe, je rédige, et je fais
              connaître le produit.
            </p>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Chaque projet que je livre porte une conviction : <strong className="text-text">la tech peut transformer le Burkina Faso</strong>,
              et le digital africain mérite des standards aussi élevés qu'ailleurs.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-4 gap-4 my-8 py-6 border-y border-stroke">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl md:text-4xl text-clay">{s.n}</div>
                  <div className="text-[10px] md:text-xs text-muted uppercase tracking-wide mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t, i) => {
                const palette = [
                  { bg: 'rgba(255,90,31,0.16)', text: '#FF8A52' },
                  { bg: 'rgba(232,201,122,0.16)', text: '#E8C97A' },
                  { bg: 'rgba(201,162,75,0.18)', text: '#D4B366' },
                ]
                const c = palette[i % palette.length]
                return (
                  <span
                    key={t}
                    className="text-[11px] font-bold uppercase tracking-wide px-3.5 py-2 rounded-full"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {t}
                  </span>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* SERVICES — style "layer cards" (architecture SynapseX) */}
      <div className="relative">
        <Reveal>
          <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
            <span className="w-6 h-px bg-clay" /> Ce que je fais
          </div>
          <h3 className="font-display text-4xl md:text-5xl mb-3">Six domaines.</h3>
          <p className="text-sm text-muted max-w-md mb-12">Zéro friction entre l'idée et le produit fini.</p>
        </Reveal>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 -mx-6 px-6 md:mx-0 md:px-0 md:flex-col md:items-center md:max-w-2xl md:mx-auto md:overflow-visible">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={0.4 + i * 0.08} className="shrink-0 w-[68vw] xs:w-[58vw] sm:w-[260px] md:w-full snap-start">
              <div className="h-full md:min-h-[72px] border border-stroke rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-4 md:px-6 hover:border-clay/40 transition-colors group">
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm md:text-lg font-light text-text group-hover:text-clay transition-colors">{s.n}</span>
                </div>
                <span className="hidden md:block text-xs text-muted/70 md:text-right md:max-w-[45%]">{s.d}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
