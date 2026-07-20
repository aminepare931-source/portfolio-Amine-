import Reveal from './Reveal'

const ITEMS = [
  { date: '2024 — Présent', role: 'Fondateur & Développeur Principal', co: 'TechBF · Marketplace de services', d: "Marketplace de services techniques connectant clients et artisans à travers le Burkina Faso. Messagerie temps réel, tableau de bord, parrainage." },
  { date: '2023 — Présent', role: 'Fondateur & Développeur', co: 'EMBF Boutique · E-Commerce', d: "Boutique tech premium de zéro : Supabase, CinetPay, commandes WhatsApp, admin panel complet." },
  { date: '2023', role: 'Développeur & Designer', co: 'FASOKO · Portail d\'actualités', d: "Agrégateur d'actualités burkinabè, architecture serverless Cloudflare, design sahélien." },
  { date: '2022 — 2024', role: 'Développeur Frontend Freelance', co: 'Projets clients', d: "Sites vitrine et landing pages pour clients locaux. Maîtrise du responsive et de la performance." },
  { date: '2021 — 2022', role: 'Auto-formation intensive', co: 'Self-taught', d: "Point de départ : zéro. Apprentissage intensif — HTML, CSS, JavaScript, bases de données." },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 max-w-[900px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Parcours
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-16">Mon Évolution.</h2>
      </Reveal>

      <div className="relative pl-8 border-l border-stroke">
        {ITEMS.map((it, i) => (
          <Reveal key={it.role} delay={i * 0.06} className="relative pb-14 last:pb-0">
            <div className="absolute -left-[calc(2rem+4px)] top-1.5 w-2 h-2 rounded-full bg-clay" style={{ boxShadow: '0 0 10px #FF5A1F' }} />
            <div className="text-xs font-mono text-clay uppercase tracking-wide mb-1">{it.date}</div>
            <h3 className="font-display text-2xl md:text-3xl mb-1">{it.role}</h3>
            <div className="text-xs text-muted font-mono mb-3">{it.co}</div>
            <p className="text-sm text-muted leading-relaxed max-w-lg">{it.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
