import { useEffect, useState } from 'react'
import ProjectsHeroCard from './ProjectsHeroCard'
import ProjectsList from './ProjectsList'
import { fetchProjects, Project } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { playClickSound } from '../lib/sound'

export default function Projects({ limit, showViewAll }: { limit?: number; showViewAll?: boolean } = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  const visibleProjects = limit ? projects.slice(0, limit) : projects

  return (
    <div>
      <ProjectsHeroCard />

      {loading ? (
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: limit || 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-stroke overflow-hidden bg-surface/20">
                <div className="aspect-video bg-surface shimmer relative overflow-hidden" />
                <div className="p-5 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-surface shimmer relative overflow-hidden" />
                  <div className="h-3 w-full rounded bg-surface shimmer relative overflow-hidden" />
                  <div className="h-3 w-4/5 rounded bg-surface shimmer relative overflow-hidden" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto py-16 text-center text-muted text-sm border border-dashed border-stroke rounded-3xl">
          {t('Les projets arrivent bientôt.', 'Projects coming soon.')}
        </div>
      ) : (
        <>
          <ProjectsList projects={visibleProjects} />

          {showViewAll && projects.length > (limit || 0) && (
            <div className="px-4 sm:px-6 max-w-[1200px] mx-auto flex justify-center mt-10">
              <Link
                to="/projets"
                onClick={playClickSound}
                className="group inline-flex items-center gap-2 rounded-full border border-slate-900/15 bg-surface/60 hover:bg-slate-900/5 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors"
              >
                {t('Voir tous les projets', 'View all projects')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  )
}
