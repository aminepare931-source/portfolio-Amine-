import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import type { Publication } from '../data/publications'

export default function PublicationCard({ p, priority = false }: { p: Publication; priority?: boolean }) {
  return (
    <Link
      to={`/journal/${p.slug}`}
      className="group block break-inside-avoid mb-5 rounded-md overflow-hidden border border-stroke bg-white/60 hover:border-gov/50 hover:shadow-[0_18px_40px_rgba(10,61,145,0.14)] transition-all"
    >
      <div className="relative overflow-hidden bg-surface">
        {p.media?.some((m) => m.type !== 'image') && <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-black/70 text-white text-[11px] font-medium rounded-full px-2.5 py-1"><Play size={11} fill="currentColor" /> Vidéo</span>}
        <img
          src={p.image}
          alt={p.alt}
          width={p.w}
          height={p.h}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gov">{p.category}</span>
          {p.price && <span className="text-[11px] font-mono text-muted text-right">{p.price}</span>}
        </div>
        <h3 className="font-display text-base leading-snug mb-1.5 group-hover:text-clay transition-colors">{p.title}</h3>
        <p className="text-xs text-muted leading-relaxed line-clamp-2">{p.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gov">
          Voir <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  )
}
