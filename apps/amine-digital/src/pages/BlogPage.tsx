import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ARTICLES } from '../data/articles'

export default function BlogPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[800px] mx-auto">
      <div className="text-center mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Journal</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Conseils & réflexions</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          Sur le digital, le web et ce que j'apprends en travaillant avec des entreprises d'ici.
        </p>
      </div>

      <div className="border-t border-stroke">
        {ARTICLES.map((a) => (
          <Link
            key={a.slug}
            to={`/journal/${a.slug}`}
            className="group flex items-start justify-between gap-6 py-8 border-b border-stroke"
          >
            <div>
              <div className="text-xs font-mono text-muted mb-2">{a.date}</div>
              <h3 className="font-display text-xl sm:text-2xl mb-2 group-hover:text-clay transition-colors">{a.title}</h3>
              <p className="text-sm text-muted leading-relaxed max-w-lg">{a.excerpt}</p>
            </div>
            <ArrowUpRight size={20} className="text-slate-900/30 group-hover:text-clay group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  )
}
