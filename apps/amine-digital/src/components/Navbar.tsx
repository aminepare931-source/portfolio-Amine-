import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, X, Clock, MapPin, Mail } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/tarifs', label: 'Tarifs' },
]

const NAV_MOBILE = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/processus', label: 'Processus' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/journal', label: 'Journal' },
  { to: '/tarifs', label: 'Tarifs' },
]

const WHATSAPP_URL = 'https://wa.me/22655300868'

function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const formatted = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Africa/Ouagadougou',
      }).format(now)
      setTime(formatted)
    }
    update()
    const id = setInterval(update, 1000 * 30)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const time = useLocalTime()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Bandeau secondaire — mentions officielles */}
        <div className="hidden sm:block bg-govDark text-white/85 text-[11px] font-mono">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5"><MapPin size={11} /> Bobo-Dioulasso, Burkina Faso</span>
              <span className="flex items-center gap-1.5"><Mail size={11} /> amine.dg.dev@gmail.com</span>
            </div>
            <span className="flex items-center gap-1.5"><Clock size={11} /> {time} (GMT)</span>
          </div>
        </div>

        {/* Barre principale */}
        <div className="bg-white border-b-2 border-gov shadow-sm">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <span className="w-10 h-10 rounded-sm bg-gov text-white flex items-center justify-center text-xs font-bold tracking-tight shrink-0">
                AD
              </span>
              <span className="hidden sm:block leading-tight">
                <span className="block font-display text-sm text-gray-900 tracking-wide">AMINE DIGITAL</span>
                <span className="block text-[10px] font-mono text-gov uppercase tracking-widest">Services numériques</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center border border-stroke rounded-sm overflow-hidden text-sm">
              {NAV.map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 font-medium transition-colors ${i !== 0 ? 'border-l border-stroke' : ''} ${
                      isActive ? 'bg-gov text-white' : 'text-gray-700 hover:bg-surface'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center bg-gov text-white text-sm font-semibold rounded-sm px-5 py-2.5 hover:bg-govDark transition-colors"
              >
                Nous contacter
              </a>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-sm bg-gov text-white"
                aria-label="Menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div
          className={`absolute inset-x-0 top-[64px] bg-white border-t-2 border-gov p-5 transition-transform duration-400 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-5 font-mono">
            <Clock size={13} /> {time} (GMT) · Bobo-Dioulasso
          </div>
          <nav className="flex flex-col border border-stroke rounded-sm overflow-hidden mb-4">
            {NAV_MOBILE.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium ${i !== 0 ? 'border-t border-stroke' : ''} ${
                    isActive ? 'bg-gov text-white' : 'text-gray-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-gov text-white font-semibold py-3 rounded-sm text-sm"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </>
  )
}
