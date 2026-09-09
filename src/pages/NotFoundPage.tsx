import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="pt-28 md:pt-36 min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-6">
          <span className="w-6 h-px bg-clay" /> {t('Erreur 404', 'Error 404')}
        </div>

        <h1 className="font-display text-7xl sm:text-8xl text-slate-900 mb-4">
          404<span className="text-[#3B82F6]">.</span>
        </h1>

        <Compass size={28} className="text-clay/50 mx-auto mb-5" />

        <p className="text-slate-900/70 mb-10">
          {t(
            'Cette page n\'existe pas ou a été déplacée. Retournez à l\'accueil pour continuer votre visite.',
            'This page doesn\'t exist or has moved. Head back home to continue exploring.'
          )}
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-black font-bold py-3.5 px-7 text-sm hover:scale-[1.03] transition-transform shadow-[0_10px_25px_rgba(59,130,246,0.4)]"
        >
          <ArrowLeft size={16} />
          {t('Retour à l\'accueil', 'Back home')}
        </Link>
      </div>
    </div>
  )
}
