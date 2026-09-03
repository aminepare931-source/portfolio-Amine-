import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Download, Globe, Briefcase } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const AMINE_DIGITAL_URL = 'https://amine-digital-services.vercel.app'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { lang, toggleLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const links = [
    { to: '/a-propos', label: t('Profil', 'Profile') },
    { to: '/competences', label: t('Compétences', 'Skills') },
    { to: '/projets', label: t('Projets', 'Projects') },
    { to: '/parcours', label: t('Parcours', 'Journey') },
    { to: '/galerie', label: t('Portraits', 'Portraits') },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4 transition-all">
        {/* Desktop Navbar */}
        <div
          className={`hidden lg:inline-flex items-center gap-1 rounded-full backdrop-blur-xl border border-slate-900/10 bg-[#ffffff]/80 px-3 py-2 transition-all ${
            scrolled ? 'shadow-[0_10px_30px_rgba(15,23,42,0.12)] border-clay/30 bg-[#ffffff]/95' : ''
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 pr-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white overflow-hidden border border-clay/40 shrink-0">
              <img src="/assets/logo.png" alt="Amine.Dev" className="w-full h-full object-cover scale-125" />
            </div>
            <span className="font-display tracking-wider text-sm text-slate-900">AMINE<span className="text-clay">.</span>DEV</span>
          </Link>

          <a
            href={AMINE_DIGITAL_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5 border border-clay/30 text-clay font-medium hover:bg-clay/5 transition-colors mr-1"
          >
            <Briefcase size={12} /> {t('Voir l\'entreprise', 'View the company')}
          </a>

          <div className="w-px h-4 bg-stroke mx-1" />

          {/* Nav Links */}
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-xs rounded-full px-3 py-1.5 transition-all ${
                location.pathname === l.to
                  ? 'text-slate-900 font-medium bg-stroke/60 border border-clay/30'
                  : 'text-muted hover:text-slate-900 hover:bg-stroke/40'
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="w-px h-4 bg-stroke mx-1" />

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            title={t('Passer en Anglais', 'Switch to French')}
            className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-clay hover:border-clay hover:bg-slate-900/10 transition-all"
          >
            <Globe size={13} className="text-[#3B82F6]" />
            <span>{lang === 'fr' ? 'FR 🇫🇷' : 'EN 🇬🇧'}</span>
          </button>

          <Link
            to="/contact"
            className="text-xs rounded-full px-3.5 py-1.5 bg-clay text-black font-semibold hover:opacity-90 transition-opacity ml-1"
          >
            Contact
          </Link>
        </div>

        {/* Medium screens (Tablet) */}
        <div
          className={`hidden md:flex lg:hidden items-center justify-between w-full max-w-2xl rounded-full backdrop-blur-xl border border-slate-900/10 bg-[#ffffff]/90 px-4 py-2 transition-all ${
            scrolled ? 'shadow-lg border-clay/30' : ''
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display text-base">AMINE<span className="text-clay">.</span>DEV</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={AMINE_DIGITAL_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-clay/30 text-clay"
            >
              <Briefcase size={12} /> {t('Entreprise', 'Company')}
            </a>
            <button
              onClick={toggleLang}
              className="text-xs font-mono font-bold px-2 py-1 rounded-full bg-slate-900/10 text-clay"
            >
              {lang === 'fr' ? 'FR 🇫🇷' : 'EN 🇬🇧'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-xs px-3 py-1.5 rounded-full border border-stroke text-muted"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden w-full flex items-center justify-between rounded-full border border-slate-900/10 bg-[#ffffff]/90 backdrop-blur-md px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-8 h-8 rounded-full object-cover border border-clay/30" />
            <span className="font-display text-base tracking-wide">AMINE<span className="text-clay">.</span>DEV</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-slate-900/10 text-clay"
            >
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>
            <button onClick={() => setOpen(!open)} className="p-1 text-muted">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#ffffff]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 px-6">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full border border-stroke text-muted"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <img src="/assets/logo.png" alt="Amine.Dev" className="w-12 h-12 rounded-full border-2 border-clay" />
            <div>
              <div className="font-display text-2xl">AMINE<span className="text-clay">.</span>DEV</div>
              <div className="text-[10px] text-muted font-mono uppercase">Bobo-Dioulasso 🇧🇫</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-full bg-slate-900/10 border border-slate-900/20 text-clay"
            >
              <Globe size={14} className="text-[#3B82F6]" />
              <span>{lang === 'fr' ? 'Langue: Français 🇫🇷' : 'Language: English 🇬🇧'}</span>
            </button>
          </div>

          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl tracking-wide transition-colors ${
                location.pathname === l.to ? 'text-clay font-bold' : 'text-muted hover:text-slate-900'
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="w-12 h-px bg-stroke my-2" />

          <div className="flex items-center gap-3">
            <a
              href={AMINE_DIGITAL_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-clay/40 text-clay px-5 py-3 text-sm font-bold"
            >
              <Briefcase size={14} /> {t('Entreprise', 'Company')}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-full bg-clay text-black px-6 py-3 text-sm font-bold"
            >
              Contact
            </Link>
            <a
              href="/assets/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-900 border border-stroke px-4 py-2 rounded-full"
            >
              <Download size={14} /> {t('Télécharger CV', 'Download CV')}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
