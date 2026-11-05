import Contact from '../components/Contact'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../seoRoutes'

export default function ContactPage() {
  return <div className="pt-28 md:pt-36"><Seo path="/contact" {...PAGE_SEO['/contact']} /><Contact /></div>
}
