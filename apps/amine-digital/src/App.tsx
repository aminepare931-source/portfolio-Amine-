import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import FloatingCta from './components/FloatingCta'
import Preloader from './components/Preloader'
import PageTransition from './components/PageTransition'
import { useLenis } from './hooks/useLenis'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProcessPage from './pages/ProcessPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import PricingPage from './pages/PricingPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/a-propos" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/processus" element={<PageTransition><ProcessPage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
        <Route path="/tarifs" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/journal" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/journal/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useLenis()

  return (
    <BrowserRouter>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <FloatingCta />
    </BrowserRouter>
  )
}
