import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import PatternDivider from '../components/PatternDivider'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import JourneyRoad from '../components/JourneyRoad'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <PatternDivider />
      <Skills />
      <Projects />
      <JourneyRoad />
      <Gallery />
      <Contact />
    </>
  )
}
