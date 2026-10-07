import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import MotionDesignTeaser from '../components/MotionDesignTeaser'
import StackMotionMobile from '../components/StackMotionMobile'
import Stats from '../components/Stats'
import About from '../components/About'
import PatternDivider from '../components/PatternDivider'
import Skills from '../components/Skills'
import GithubActivity from '../components/GithubActivity'
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
      <StackMotionMobile />
      <MotionDesignTeaser />
      <Stats />
      <About />
      <PatternDivider />
      <Skills />
      <GithubActivity />
      <Projects limit={4} showViewAll />
      <JourneyRoad />
      <Explorations />
      <Testimonials />
      <BottomMarquee />
      <Contact />
    </>
  )
}
