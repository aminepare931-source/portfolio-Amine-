import Reveal from './Reveal'
import ProjectsHeroCard from './ProjectsHeroCard'
import ProjectsCarousel from './ProjectsCarousel'

export default function Projects() {
  return (
    <section id="projects" className="py-10 sm:py-14 md:py-24">
      <ProjectsHeroCard />

      <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
            <span className="w-6 h-px bg-clay" /> Tous les projets
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-8">Projets Récents.</h2>
        </Reveal>

        <ProjectsCarousel />
      </div>
    </section>
  )
}
