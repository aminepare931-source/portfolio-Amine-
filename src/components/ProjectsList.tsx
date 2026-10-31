import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import { playClickSound } from '../lib/sound'

type StatusKey = 'all' | 'deployed' | 'in_progress' | 'paused' | 'done'

function statusMeta(status: Project['status'], t: (fr: string, en: string) => string) {
  switch (status) {
    case 'in_progress': return { label: t('En cours', 'In progress'), dot: '#eab308' }
    case 'paused': return { label: t('En pause', 'Paused'), dot: '#f97316' }
    case 'done': return { label: t('Terminé', 'Done'), dot: '#64748b' }
    case 'deployed':
    default: return { label: t('Déployé', 'Deployed'), dot: '#22c55e' }
  }
}

export default function ProjectsList({
  projects,
}: {
  projects: Project[]
}) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<StatusKey>('all')

  const FILTERS: { key: StatusKey; label: string; dot?: string }[] = [
    { key: 'all', label: t('Tous', 'All') },
    { key: 'deployed', label: t('Déployé', 'Deployed'), dot: '#22c55e' },
    { key: 'in_progress', label: t('En cours', 'In progress'), dot: '#eab308' },
    { key: 'paused', label: t('En pause', 'Paused'), dot: '#f97316' },
    { key: 'done', label: t('Terminé', 'Done'), dot: '#64748b' },
  ]

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => (p.status || 'deployed') === filter)
  }, [projects, filter])

  return (
    <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
      {/* Filtres par statut */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => {
          const active = filter === f.key
          const count = f.key === 'all' ? projects.length : projects.filter((p) => (p.status || 'deployed') === f.key).length
          if (f.key !== 'all' && count === 0) return null
          return (
            <button
              key={f.key}
              onClick={() => {
                playClickSound()
                setFilter(f.key)
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium border transition-colors ${
                active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-surface/50 text-slate-900/70 border-stroke hover:border-slate-900/30'
              }`}
            >
              {f.dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.dot }} />}
              {f.label}
              <span className={active ? 'text-white/60' : 'text-slate-900/40'}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* Grille classique */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted text-sm border border-dashed border-stroke rounded-3xl">
          {t('Aucun projet dans cette catégorie.', 'No project in this category.')}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => {
            const status = statusMeta(p.status, t)
            return (
              <Link
                key={p.id}
                to={`/projets/${p.id}`}
                onClick={() => playClickSound()}
                className="group flex flex-col text-left rounded-2xl border border-stroke overflow-hidden hover:border-clay/40 hover:-translate-y-1 transition-all bg-surface/20"
              >
                {p.img ? (
                  <div className="aspect-video overflow-hidden bg-surface flex items-center justify-center p-2">
                    <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                ) : (
                  <div
                    className="aspect-video flex items-center justify-center text-4xl"
                    style={{ background: p.color ? `${p.color}15` : '#f1f5f9' }}
                  >
                    {p.emoji || '🧩'}
                  </div>
                )}

                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg text-slate-900 group-hover:text-clay transition-colors truncate">
                      {p.name}
                    </h3>
                    <ArrowUpRight size={16} className="text-slate-900/20 group-hover:text-clay group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full border border-stroke mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                    {status.label}
                  </span>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">
                    {p.tagline || p.description}
                  </p>
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-slate-900/50 bg-surface px-2 py-0.5 rounded-full border border-stroke">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
