import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/a-propos', label: 'Profil' },
  { to: '/competences', label: 'Compétences' },
  { to: '/projets', label: 'Projets' },
  { to: '/parcours', label: 'Parcours' },
  { to: '/galerie', label: 'Galerie' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [location.pathname])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={`hidden md:inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-shadow ${
            scrolled ? 'shadow-lg shadow-black/30' : ''
          }`}
        >
          <Link to="/" className="w-9 h-9 rounded-full bg-black flex items-center justify-center mr-1 overflow-hidden border border-white/10">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-full h-full object-cover scale-125" />
          </Link>
          <div className="w-px h-5 bg-stroke mx-1" />
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                location.pathname === l.to ? 'text-text bg-stroke/50' : 'text-muted hover:text-text hover:bg-stroke/50'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="w-px h-5 bg-stroke mx-1" />
          <Link
            to="/contact"
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-clay text-black font-medium hover:opacity-90 transition-opacity"
          >
            Me contacter ↗
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden w-full flex items-center justify-between rounded-full border border-white/10 bg-surface/90 backdrop-blur-md px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display text-lg tracking-wide">AMINE<span className="text-clay">.</span>DEV</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="text-xs tracking-wider uppercase text-muted">
            {open ? 'Fermer' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-bg/98 flex flex-col items-center justify-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-4xl tracking-wide text-muted hover:text-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-clay text-black px-6 py-3 text-sm font-medium">
            Me contacter
          </Link>
        </div>
      )}
    </>
  )
}
