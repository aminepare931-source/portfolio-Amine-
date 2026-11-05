import About from '../components/About'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../seoRoutes'

export default function AboutPage() {
  return <div className="pt-28 md:pt-36"><Seo path="/a-propos" {...PAGE_SEO['/a-propos']} /><About /></div>
}
