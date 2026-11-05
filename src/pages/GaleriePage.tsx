import Explorations from '../components/Explorations'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../seoRoutes'

export default function GaleriePage() {
  return <div className="pt-28 md:pt-36"><Seo path="/galerie" {...PAGE_SEO['/galerie']} /><Explorations /></div>
}
