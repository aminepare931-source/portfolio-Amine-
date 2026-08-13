import { useState } from 'react'
import Reveal from './Reveal'
import ProjectsHeroCard from './ProjectsHeroCard'
import ProjectModal from './ProjectModal'
import { FEATURED_PROJECTS, ProjectCaseStudy } from '../data/projectsData'
import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null)
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-10 sm:py-14 md:py-24">
      <ProjectsHeroCard />

      <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
            <span className="w-6 h-px bg-clay" /> {t('Réalisations', 'Case Studies')}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-10">
            {t('Projets Récents.', 'Recent Projects.')}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURED_PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <button
                onClick={() => setActiveProject(p)}
                className="group w-full text-left bg-surface border border-stroke hover:border-clay/40 rounded-3xl overflow-hidden transition-colors"
              >
                <div
                  className="aspect-video flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, #0f0e0c 0%, ${p.color}22 100%)` }}
                >
                  <span className="text-5xl">{p.emoji}</span>
                  {p.featured && (
                    <div className="absolute top-3 right-3 bg-clay text-black text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full">
                      ★ {t('Vedette', 'Featured')}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-wide bg-clay/10 text-clay px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-clay transition-colors">{p.name}</h3>
                  <p className="text-xs text-muted leading-relaxed">{p.description}</p>
                  <div className="mt-4 text-xs font-mono text-clay uppercase tracking-wide">
                    {t('Voir le détail', 'View details')} →
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
