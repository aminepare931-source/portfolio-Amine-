import Projects from '../components/Projects'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../seoRoutes'
import MotionDesignSection from '../components/MotionDesignSection'

export default function ProjectsPage() {
  return (
    <div className="pt-28 md:pt-36">
      <Seo path="/projets" {...PAGE_SEO['/projets']} />
      <Projects />
      <MotionDesignSection />
    </div>
  )
}
