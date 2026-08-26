import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PROCESS } from '../data/process'

export default function ProcessPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[800px] mx-auto">
      <div className="text-center mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Comment on travaille</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Notre processus</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          Six étapes claires, du premier échange jusqu'au suivi après livraison.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 sm:left-7 top-2 bottom-2 w-px bg-stroke" />
        <div className="space-y-10">
          {PROCESS.map((step) => (
            <div key={step.n} className="relative flex gap-5 sm:gap-7">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-clay text-white font-display text-lg flex items-center justify-center shrink-0 z-10">
                {step.n}
              </div>
              <div className="pt-1.5">
                <h3 className="font-display text-xl sm:text-2xl mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-md">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Démarrer la première étape <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
