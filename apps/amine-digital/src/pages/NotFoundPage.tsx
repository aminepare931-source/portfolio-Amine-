import { Link } from 'react-router-dom'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="px-6 pt-36 pb-24 min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-6">
          <span className="w-6 h-px bg-clay" /> Erreur 404
        </div>

        <h1 className="font-display text-7xl sm:text-8xl text-gray-900 mb-4">404</h1>

        <FileQuestion size={28} className="text-clay/50 mx-auto mb-5" />

        <p className="text-slate-900/70 mb-10">
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre visite.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gov text-white font-semibold rounded-sm px-6 py-3 hover:bg-govDark transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
