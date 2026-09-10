import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Stats from '../components/Stats'
import About from '../components/About'
import PatternDivider from '../components/PatternDivider'
import Skills from '../components/Skills'
import GithubActivity from '../components/GithubActivity'
import MotionDemo from '../components/MotionDemo'
import Projects from '../components/Projects'
import JourneyRoad from '../components/JourneyRoad'
import Explorations from '../components/Explorations'
import Testimonials from '../components/Testimonials'
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
      <GithubActivity />
      <MotionDemo />
      <Projects limit={4} showViewAll />
      <JourneyRoad />
      <Explorations />
      <Testimonials />
      <BottomMarquee />
      <Contact />
    </>
  )
}
