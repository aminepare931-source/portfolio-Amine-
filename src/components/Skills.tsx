import Reveal from './Reveal'

const SKILLS = [
  { ic: '⚡', n: 'HTML / CSS', lvl: 'Expert', d: 'Flexbox, Grid, animations, responsive, accessibilité.' },
  { ic: '🟡', n: 'JavaScript', lvl: 'Avancé', d: 'Vanilla ES6+, Fetch, DOM API, Canvas.' },
  { ic: '🗄️', n: 'Supabase', lvl: 'Confirmé', d: 'PostgreSQL, RLS, Realtime, Storage, Auth.' },
  { ic: '🚀', n: 'Déploiement', lvl: 'Expert', d: 'Cloudflare Pages, Netlify, DNS, performance.' },
  { ic: '💳', n: 'Paiements Africains', lvl: 'Confirmé', d: 'CinetPay, Orange Money, MTN MoMo, Moov.' },
  { ic: '🛒', n: 'E-Commerce', lvl: 'Expert', d: 'Boutiques custom, admin panels, WhatsApp.' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Tech Stack
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-12">Mes Compétences.</h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4">
        {SKILLS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <div className="group h-full bg-surface border border-stroke rounded-2xl p-6 hover:border-clay/40 transition-colors relative overflow-hidden">
              <span className="text-2xl mb-4 block">{s.ic}</span>
              <div className="font-medium text-text mb-1">{s.n}</div>
              <div className="text-[10px] font-mono text-clay uppercase tracking-wider mb-3">{s.lvl}</div>
              <p className="text-xs text-muted leading-relaxed">{s.d}</p>
              <div className="absolute top-0 left-0 right-0 h-[2px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
