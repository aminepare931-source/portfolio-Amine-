import Skills from '../components/Skills'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../seoRoutes'

export default function SkillsPage() {
  return <div className="pt-28 md:pt-36"><Seo path="/competences" {...PAGE_SEO['/competences']} /><Skills /></div>
}
