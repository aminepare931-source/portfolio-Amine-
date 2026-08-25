import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/contact', label: 'Contact' },
]

const WHATSAPP_URL = 'https://wa.me/22600000000'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between bg-white/80 backdrop-blur-xl border border-stroke rounded-full pl-5 pr-2 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <Link to="/" className="flex items-center gap-2 font-display text-lg tracking-tight" onClick={() => setOpen(false)}>
          AMINE<span className="text-clay">DIGITAL</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-colors ${
                  isActive ? 'bg-clay text-white' : 'text-slate-900/70 hover:bg-slate-900/5'
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
            className="hidden sm:flex items-center gap-2 bg-clay text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-stroke"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-[1100px] mx-auto mt-2 bg-white border border-stroke rounded-3xl p-4 shadow-xl flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-clay text-white' : 'text-slate-900/80'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex items-center justify-center gap-2 bg-clay text-white text-sm font-semibold px-5 py-3 rounded-xl"
          >
            <MessageCircle size={15} /> Écrire sur WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
