import JourneyRoad from '../components/JourneyRoad'
import Seo from '../components/Seo'
import { PAGE_SEO } from '../seoRoutes'

export default function ParcoursPage() {
  return <div className="pt-28 md:pt-36"><Seo path="/parcours" {...PAGE_SEO['/parcours']} /><JourneyRoad /></div>
}
