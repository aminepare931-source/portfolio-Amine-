import { useEffect, useState } from 'react'
import ProjectsHeroCard from './ProjectsHeroCard'
import ProjectsCarousel from './ProjectsCarousel'
import ProjectModal from './ProjectModal'
import { fetchProjects, Project } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

export default function Projects({ limit, showViewAll }: { limit?: number; showViewAll?: boolean } = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
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
        <ProjectsCarousel
          projects={visibleProjects}
          onOpen={setActiveProject}
          showAllLink={showViewAll && projects.length > (limit || 0)}
        />
      )}

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}
