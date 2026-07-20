import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import SunTrailCursor from './components/SunTrailCursor'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import PatternDivider from './components/PatternDivider'
import Skills from './components/Skills'
import Projects from './components/Projects'
import JourneyRoad from './components/JourneyRoad'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <SunTrailCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <PatternDivider />
        <Skills />
        <Projects />
        <JourneyRoad />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
