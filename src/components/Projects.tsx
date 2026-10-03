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
        <div className="px-4 sm:px-6 max-w-[1200px] mx-auto py-14">
          <div className="aspect-[16/10] rounded-3xl bg-surface border border-stroke shimmer relative overflow-hidden" />
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
