import { useEffect, useState } from 'react'
import { fetchProjects, Project } from '../lib/supabase'
import Reveal from './Reveal'
import ProjectsHeroCard from './ProjectsHeroCard'

function spanClass(size: string) {
  switch (size) {
    case 'featured': return 'md:col-span-7'
    case 'side': return 'md:col-span-5'
    case 'full': return 'md:col-span-12'
    default: return 'md:col-span-6'
  }
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => setError(true))
  }, [])

  return (
    <section id="projects" className="py-16 md:py-24">
      <ProjectsHeroCard />

      <div className="px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Tous les projets
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-12">Projets Récents.</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {!projects && !error && (
          <>
            {[0, 1, 2].map((i) => (
              <div key={i} className="md:col-span-6 aspect-video rounded-3xl bg-surface border border-stroke relative overflow-hidden shimmer" />
            ))}
          </>
        )}

        {error && (
          <div className="md:col-span-12 border border-dashed border-stroke rounded-3xl p-16 text-center text-muted text-sm">
            Impossible de charger les projets.
          </div>
        )}

        {projects && projects.length === 0 && (
          <div className="md:col-span-12 border border-dashed border-stroke rounded-3xl p-16 text-center text-muted text-sm">
            🚀 Les projets arrivent bientôt...
          </div>
        )}

        {projects?.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className={spanClass(p.size)}>
            <a
              href={p.url ?? '#'}
              target={p.url ? '_blank' : undefined}
              rel="noopener"
              className="group block bg-surface border border-stroke rounded-3xl overflow-hidden hover:border-clay/40 transition-colors h-full"
            >
              <div
                className="aspect-video relative flex items-center justify-center overflow-hidden"
                style={p.img ? {} : { background: `linear-gradient(135deg, #0a0a0a 0%, ${p.color}15 60%, #080706 100%)` }}
              >
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span
                    className="font-display text-4xl px-4 text-center"
                    style={{ color: p.color, textShadow: `0 0 30px ${p.color}55` }}
                  >
                    {p.emoji || p.name.toUpperCase()}
                  </span>
                )}
                {p.featured && (
                  <div className="absolute top-3 right-3 bg-clay text-black text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full">
                    ★ Vedette
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(p.tags || []).slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-wide bg-clay/10 text-clay px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
                <h3 className="font-display text-2xl mb-2 group-hover:text-clay transition-colors">{p.name}</h3>
                <p className="text-xs text-muted leading-relaxed">{p.description}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  )
}
