import { ArrowUpRight } from 'lucide-react'
import type { Realisation } from '../lib/content'

export default function RealisationCard({ r }: { r: Realisation }) {
  const body = (
    <>
      {r.image && (
        <div className="overflow-hidden bg-surface aspect-[16/10]">
          <img src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
        </div>
      )}
      <div className="p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gov mb-2">{[r.sector, r.client].filter(Boolean).join(' · ') || 'Réalisation'}</div>
        <h3 className="font-display text-lg leading-snug mb-2 group-hover:text-clay transition-colors">{r.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{r.description}</p>
        {r.result && <p className="mt-3 text-sm font-medium text-gov">{r.result}</p>}
        {r.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {r.tags.map((t) => <span key={t} className="text-[10px] font-mono border border-stroke rounded-full px-2.5 py-1 text-slate-900/70">{t}</span>)}
          </div>
        )}
        {r.link && <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gov">Voir le projet <ArrowUpRight size={13} /></span>}
      </div>
    </>
  )
  const cls = 'group block rounded-md overflow-hidden border border-stroke bg-white/60 hover:border-gov/50 hover:shadow-[0_18px_40px_rgba(10,61,145,0.14)] transition-all'
  return r.link
    ? <a href={r.link} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
    : <div className={cls}>{body}</div>
}
