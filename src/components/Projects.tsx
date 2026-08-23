import { useEffect, useState } from 'react'
import { ArrowUpRight, Code2 } from 'lucide-react'
import Reveal from './Reveal'
import ProjectsHeroCard from './ProjectsHeroCard'
import ProjectModal from './ProjectModal'
import { fetchProjects, Project } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

function ProjectCard({ p, big, index, onOpen }: { p: Project; big?: boolean; index: number; onOpen: () => void }) {
  const { t } = useLanguage()
  const color = p.color || '#3B82F6'

  return (
    <button
      onClick={onOpen}
      className={`group relative w-full text-left bg-white border border-stroke hover:border-clay/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 ${big ? 'sm:col-span-2' : ''}`}
    >
      {/* Numéro décoratif */}
      <span
        className="absolute -top-2 -left-1 font-display text-[7rem] leading-none opacity-[0.05] group-hover:opacity-10 transition-opacity select-none pointer-events-none z-0"
        style={{ color }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div
        className={`relative flex items-center justify-center overflow-hidden bg-surface ${big ? 'aspect-[21/9]' : 'aspect-video'}`}
        style={p.img ? {} : { background: `linear-gradient(135deg, #f8fafc 0%, ${color}20 60%, ${color}10 100%)` }}
      >
        {p.img ? (
          <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className={big ? 'text-7xl' : 'text-5xl'} style={{ filter: `drop-shadow(0 8px 20px ${color}40)` }}>
            {p.emoji || '💻'}
          </span>
        )}

        {/* Barre d'accent en bas de l'image */}
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {p.featured && (
          <div className="absolute top-4 right-4 bg-clay text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
            ★ {t('Vedette', 'Featured')}
          </div>
        )}
        <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
          <ArrowUpRight size={16} className="text-slate-900" />
        </div>
      </div>

      <div className={`relative z-10 ${big ? 'p-6 sm:p-8' : 'p-6'}`}>
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Code2 size={12} className="text-clay shrink-0" />
          {(p.tags || []).slice(0, big ? 4 : 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wide bg-clay/10 text-clay px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`font-display group-hover:text-clay transition-colors mb-2 ${big ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
          {p.name}
        </h3>
        <p className={`text-muted leading-relaxed line-clamp-2 sm:line-clamp-none ${big ? 'text-sm max-w-xl' : 'text-xs'}`}>{p.description}</p>

        <div className="mt-5 pt-4 border-t border-stroke flex items-center justify-between">
          <span className="text-xs font-mono text-clay font-bold uppercase tracking-wide flex items-center gap-1.5">
            {t('Voir le détail', 'View details')}
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        </div>
      </div>
    </button>
  )
}

export default function Projects() {
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

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 aspect-[21/9] rounded-3xl bg-surface border border-stroke shimmer relative overflow-hidden" />
            <div className="aspect-video rounded-3xl bg-surface border border-stroke shimmer relative overflow-hidden" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm border border-dashed border-stroke rounded-3xl">
            {t('Les projets arrivent bientôt.', 'Projects coming soon.')}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {projects.map((p, i) => {
              const isBig = p.size === 'featured' || p.size === 'full'
              return (
                <Reveal key={p.id} delay={i * 0.08} className={isBig ? 'sm:col-span-2' : ''}>
                  <ProjectCard p={p} big={isBig} index={i} onOpen={() => setActiveProject(p)} />
                </Reveal>
              )
            })}
          </div>
        )}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
