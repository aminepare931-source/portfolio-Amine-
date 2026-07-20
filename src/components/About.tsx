import Reveal from './Reveal'

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
  { ic: '💻', n: 'Développement Web', d: 'Sites, marketplaces, e-commerces sur mesure — vanilla JS, Supabase, déploiement.' },
  { ic: '🎨', n: 'Design Graphique', d: 'Identité visuelle, logos, maquettes Figma, supports pour réseaux sociaux.' },
  { ic: '📈', n: 'Marketing Digital', d: 'Stratégie réseaux sociaux, community management, publicités, SEO de base.' },
  { ic: '✍️', n: 'Rédaction & Copywriting', d: 'Textes de vente, contenu blog, scripts vidéo, descriptions produits.' },
  { ic: '🎓', n: 'Formation & Cours', d: 'Conception de programmes, supports pédagogiques, mentorat, documentation.' },
  { ic: '🤖', n: 'Automatisation & IA', d: 'Chatbots WhatsApp, intégrations API, scripts, prompt engineering.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <div className="grid md:grid-cols-[300px_1fr] gap-16 mb-20">
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
              Amine<span className="text-clay">.</span>Dev<br />
              <span className="font-serif italic normal-case text-clay">Un digital complet.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm md:text-base text-muted leading-relaxed mb-4">
              Salut, moi c'est <strong className="text-text">Amine Paré</strong>, connu en ligne sous <strong className="text-text">Amine.Dev</strong>.
              Basé à Bobo-Dioulasso, Burkina Faso, je suis 100% autodidacte depuis 3 ans — pas d'école, juste une curiosité
              sans limite et des milliers d'heures de pratique sur de vrais projets.
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
              {TAGS.map((t) => (
                <span key={t} className="text-xs font-mono border border-stroke text-muted px-3 py-1.5 hover:border-clay hover:text-clay transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* SERVICES GRID */}
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Ce que je fais
        </div>
        <h3 className="font-display text-4xl md:text-5xl mb-10">Six domaines, un seul interlocuteur.</h3>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <div className="h-full bg-surface border border-stroke rounded-2xl p-6 hover:border-clay/40 transition-colors">
              <span className="text-2xl mb-3 block">{s.ic}</span>
              <div className="font-medium text-text mb-2">{s.n}</div>
              <p className="text-xs text-muted leading-relaxed">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
