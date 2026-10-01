import { useMemo, useState } from 'react'
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
  onOpen,
}: {
  projects: Project[]
  onOpen: (p: Project) => void
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

      {/* Cartes horizontales */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted text-sm border border-dashed border-stroke rounded-3xl">
          {t('Aucun projet dans cette catégorie.', 'No project in this category.')}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((p) => {
            const status = statusMeta(p.status, t)
            return (
              <button
                key={p.id}
                onClick={() => {
                  playClickSound()
                  onOpen(p)
                }}
                className="group w-full flex flex-col sm:flex-row items-stretch gap-0 text-left rounded-3xl border border-stroke overflow-hidden hover:border-clay/40 hover:-translate-y-0.5 transition-all bg-surface/20"
              >
                {p.img ? (
                  <div className="sm:w-[40%] aspect-[16/9] sm:aspect-auto overflow-hidden bg-surface shrink-0">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div
                    className="sm:w-[40%] aspect-[16/9] sm:aspect-auto flex items-center justify-center text-5xl shrink-0"
                    style={{ background: p.color ? `${p.color}15` : '#f1f5f9' }}
                  >
                    {p.emoji || '🧩'}
                  </div>
                )}

                <div className="flex-1 min-w-0 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-display text-2xl sm:text-3xl text-slate-900 group-hover:text-clay transition-colors">
                      {p.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full border border-stroke shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-muted leading-relaxed mb-4 max-w-xl">
                    {p.tagline || p.description}
                  </p>
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs font-mono text-slate-900/60 bg-surface px-2.5 py-1 rounded-full border border-stroke">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-clay">
                    {t('Voir le projet', 'View project')}
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
