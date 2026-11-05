import { useSettings, waUrl } from '../lib/settings'
import { PAGE_SEO } from '../data/seoRoutes'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import { usePlans } from '../lib/content'
import Faq from '../components/Faq'
import Seo from '../components/Seo'

export default function PricingPage() {
  const cfg = useSettings()
  const PLANS = usePlans()
  return (
    <div className="px-6 pt-36 pb-24 max-w-[1100px] mx-auto">
      <Seo path="/tarifs" {...PAGE_SEO['/tarifs']} />
      <div className="text-center mb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Tarifs</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Des offres claires</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          Trois formules, adaptables selon votre budget et votre projet.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-md p-7 border flex flex-col ${
              plan.highlight ? 'border-clay bg-clay text-white shadow-2xl scale-[1.02]' : 'border-stroke'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-clay text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                Populaire
              </span>
            )}
            <h3 className="font-display text-2xl mb-1">{plan.name}</h3>
            <p className={`text-xs mb-5 ${plan.highlight ? 'text-white/70' : 'text-muted'}`}>{plan.tagline ?? ''}</p>
            <div className="font-display text-3xl mb-6">{plan.price}</div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check size={15} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-clay'}`} /> {f}
                </li>
              ))}
            </ul>
            <a
              href={waUrl(cfg)}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-sm transition-opacity hover:opacity-90 ${
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
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link to="/devis" className="text-clay font-semibold hover:underline">Demander un devis →</Link>
          <Link to="/contact" className="text-clay font-semibold hover:underline">Discutons de votre projet →</Link>
        </div>
      </div>

      <Faq />
    </div>
  )
}
