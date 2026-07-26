import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import SunTrailCursor from './components/SunTrailCursor'
import MotionBackgroundCanvas from './components/MotionBackgroundCanvas'
import ScrollMotionControl from './components/ScrollMotionControl'
import RecruiterModal from './components/RecruiterModal'
import TerminalDrawer from './components/TerminalDrawer'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import ParcoursPage from './pages/ParcoursPage'
import GaleriePage from './pages/GaleriePage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [recruiterOpen, setRecruiterOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <LanguageProvider>
      <Router>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <MotionBackgroundCanvas />
        <SunTrailCursor />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/competences" element={<SkillsPage />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/parcours" element={<ParcoursPage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <ScrollMotionControl
          onOpenRecruiter={() => setRecruiterOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        <RecruiterModal isOpen={recruiterOpen} onClose={() => setRecruiterOpen(false)} />
        <TerminalDrawer isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

        <Footer />
      </Router>
    </LanguageProvider>
  )
}
