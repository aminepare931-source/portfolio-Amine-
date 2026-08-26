import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Menu, X, Clock, ArrowRight } from 'lucide-react'

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

const WHATSAPP_URL = 'https://wa.me/22600000000'

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
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between bg-white rounded-full p-[5px] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <Link to="/" className="flex items-center gap-2 pl-2 pr-1" onClick={() => setOpen(false)}>
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold tracking-tight shrink-0">
              AD
            </span>
            <span className="hidden sm:flex items-center gap-6 ml-3 text-sm text-gray-900">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `hover:text-gray-500 transition-colors duration-300 ${isActive ? 'text-gray-900 font-medium' : 'text-gray-700'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 pr-1">
            <span className="hidden lg:inline text-[13px] text-gray-600">Basé à Bobo-Dioulasso</span>
            <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
              <Clock size={14} /> {time} (GMT)
            </span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2"
            >
              <span className="overflow-hidden h-[20px] flex flex-col">
                <span
                  className="flex flex-col transition-transform duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}
                >
                  <span className="group-hover:-translate-y-full transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}>
                    Discuter du projet
                  </span>
                </span>
              </span>
              <span className="w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45" style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}>
                <ArrowRight size={13} />
              </span>
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white mr-0.5"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div
          className={`absolute inset-x-3 bottom-3 bg-white rounded-2xl p-6 transition-transform duration-500 ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
            <Clock size={13} /> {time} (GMT) · Bobo-Dioulasso
          </div>
          <nav className="flex flex-col gap-1 mb-6">
            {NAV_MOBILE.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-[28px] font-medium text-gray-900 py-2"
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="text-[28px] font-medium text-gray-900 py-2">
              Contact
            </Link>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3.5 rounded-full text-sm"
          >
            Démarrer un projet <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </>
  )
}
