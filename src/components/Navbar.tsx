import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'about', label: 'Profil' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Parcours' },
  { id: 'gallery', label: 'Galerie' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={`hidden md:inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-shadow ${
            scrolled ? 'shadow-lg shadow-black/30' : ''
          }`}
        >
          <a href="#hero" className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center mr-1">
            <span className="w-7 h-7 rounded-full bg-bg flex items-center justify-center font-serif italic text-[13px]">
              AP
            </span>
          </a>
          <div className="w-px h-5 bg-stroke mx-1" />
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text hover:bg-stroke/50 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="w-px h-5 bg-stroke mx-1" />
          <a
            href="#contact"
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-clay text-black font-medium hover:opacity-90 transition-opacity"
          >
            Me contacter ↗
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden w-full flex items-center justify-between rounded-full border border-white/10 bg-surface/90 backdrop-blur-md px-4 py-2.5">
          <a href="#hero" className="font-display text-lg tracking-wide">AP<span className="text-clay">.</span></a>
          <button onClick={() => setOpen(!open)} className="text-xs tracking-wider uppercase text-muted">
            {open ? 'Fermer' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-bg/98 flex flex-col items-center justify-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-4xl tracking-wide text-muted hover:text-text transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-clay text-black px-6 py-3 text-sm font-medium">
            Me contacter
          </a>
        </div>
      )}
    </>
  )
}
