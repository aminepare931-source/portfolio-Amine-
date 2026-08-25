import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    price: '[Ton prix]',
    tagline: 'Pour démarrer en ligne',
    features: ['Site vitrine (jusqu\'à 5 pages)', 'Design responsive mobile', 'Nom de domaine (1 an)', 'Livraison en 5-7 jours'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '[Ton prix]',
    tagline: 'Pour vendre en ligne',
    features: ['Tout Starter, plus :', 'Boutique en ligne + Mobile Money', 'Réseaux sociaux configurés', 'Support 1 mois inclus'],
    highlight: true,
  },
  {
    name: 'Sur-mesure',
    price: 'Sur devis',
    tagline: 'Application, automatisation, projet spécifique',
    features: ['Application mobile ou web métier', 'Automatisation / IA', 'Accompagnement complet', 'Devis personnalisé'],
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[1100px] mx-auto">
      <div className="text-center mb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Tarifs</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Des offres claires</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          Trois formules, adaptables selon votre budget et votre projet.
        </p>
      </div>

      <div className="mb-14 text-center">
        <span className="inline-block text-xs font-mono text-clay bg-clay/10 border border-dashed border-clay/40 px-4 py-2 rounded-full">
          ⚠️ Prix à compléter — remplace les [Ton prix] par tes vrais montants (FCFA)
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-7 border flex flex-col ${
              plan.highlight ? 'border-clay bg-clay text-white shadow-2xl scale-[1.02]' : 'border-stroke'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-clay text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Populaire
              </span>
            )}
            <h3 className="font-display text-2xl mb-1">{plan.name}</h3>
            <p className={`text-xs mb-5 ${plan.highlight ? 'text-white/70' : 'text-muted'}`}>{plan.tagline}</p>
            <div className="font-display text-3xl mb-6">{plan.price}</div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={15} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-clay'}`} /> {f}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/22600000000"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-full transition-opacity hover:opacity-90 ${
                plan.highlight ? 'bg-white text-clay' : 'bg-clay text-white'
              }`}
            >
              Choisir {plan.name} <ArrowRight size={15} />
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-sm text-muted mb-4">Un besoin spécifique qui ne rentre pas dans ces cases ?</p>
        <Link to="/contact" className="text-clay font-semibold hover:underline">
          Discutons de votre projet →
        </Link>
      </div>
    </div>
  )
}
