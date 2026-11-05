import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { KIND_LABEL, STATUS_LABEL, type Kind, type Realisation } from '../lib/content'

export const KIND_STYLE: Record<Kind, string> = {
  client: 'bg-gov text-white',
  saas: 'bg-clay text-white',
  interne: 'bg-slate-800 text-white',
  personnel: 'bg-slate-200 text-slate-800',
}

export function KindBadge({ kind }: { kind: Kind | null }) {
  if (!kind) return null
  return <span className={`inline-block text-[10px] font-mono uppercase tracking-wider rounded-sm px-2 py-1 ${KIND_STYLE[kind]}`}>{KIND_LABEL[kind]}</span>
}

export default function RealisationCard({ r }: { r: Realisation }) {
  return (
    <Link
      to={`/realisations/${r.id}`}
      className="group flex flex-col rounded-md overflow-hidden border border-stroke bg-white/60 hover:border-gov/50 hover:shadow-[0_18px_40px_rgba(10,61,145,0.14)] transition-all"
    >
      <div className="relative overflow-hidden bg-surface h-44 sm:h-52 flex items-center justify-center">
        {r.image && <img src={r.image} alt={r.title} loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.display = 'none' }} className="block max-w-full max-h-full w-auto h-auto object-contain" />}
        <div className="absolute top-3 left-3"><KindBadge kind={r.kind} /></div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gov mb-2">
          {[r.status ? STATUS_LABEL[r.status] : null, r.sector, r.client].filter(Boolean).join(' · ')}
        </div>
        <h3 className="font-display text-lg leading-snug mb-2 group-hover:text-clay transition-colors">{r.title}</h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3">{r.description}</p>
        {r.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {r.tags.slice(0, 4).map((t) => <span key={t} className="text-[10px] font-mono border border-stroke rounded-full px-2.5 py-1 text-slate-900/70">{t}</span>)}
          </div>
        )}
        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-gov">Voir le détail <ArrowUpRight size={13} /></span>
      </div>
    </Link>
  )
}
