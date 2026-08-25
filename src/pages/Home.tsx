import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Stats from '../components/Stats'
import About from '../components/About'
import PatternDivider from '../components/PatternDivider'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import JourneyRoad from '../components/JourneyRoad'
import Explorations from '../components/Explorations'
import BottomMarquee from '../components/BottomMarquee'
import Contact from '../components/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <About />
      <PatternDivider />
      <Skills />
      <Projects limit={4} showViewAll />
      <JourneyRoad />
      <Explorations />
      <BottomMarquee />
      <Contact />
    </>
  )
}
