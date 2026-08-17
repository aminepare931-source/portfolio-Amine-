import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-stroke py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-3 max-w-[1200px] mx-auto text-xs text-muted font-mono">
      <span>© 2025 Amine.Dev — Amine Paré, Bobo-Dioulasso, Burkina Faso</span>
      <span className="flex items-center gap-2 text-green-400">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Disponible pour missions
      </span>
      <Link to="/" className="hover:text-clay transition-colors">Retour en haut ↑</Link>
    </footer>
  )
}
