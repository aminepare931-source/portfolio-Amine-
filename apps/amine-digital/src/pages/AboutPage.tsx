import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Code2, Shield, Sparkles } from 'lucide-react'
import { Line, Fade } from '../components/Reveal'

export default function AboutPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[800px] mx-auto">
      <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">À propos</div>
      <h1 className="font-display text-4xl sm:text-5xl mb-8"><Line>L'histoire derrière AMINE DIGITAL</Line></h1>

      <Fade className="space-y-6 text-slate-900/80 leading-relaxed text-base sm:text-lg mb-14">
        <p>
          AMINE DIGITAL est né d'un constat simple : beaucoup d'entreprises et d'entrepreneurs burkinabè ont
          besoin d'une présence en ligne solide, mais font face à des prestataires dispersés — un pour le site,
          un autre pour le design, un autre encore pour les réseaux sociaux — sans personne pour assurer la
          cohérence de l'ensemble.
        </p>
        <p>
          Développeur autodidacte basé à Bobo-Dioulasso, j'ai appris en construisant de vrais produits plutôt
          qu'en suivant un parcours classique. Cette approche pratique se retrouve dans chaque projet : on part
          de votre besoin réel, pas d'un modèle générique appliqué sans réflexion.
        </p>
        <p>
          AMINE DIGITAL rassemble ce qu'il faut pour construire une présence digitale complète — développement,
          design, marketing, automatisation, sécurité — sous un seul interlocuteur, du premier échange jusqu'au
          suivi après livraison.
        </p>
      </Fade>

      <div className="flex flex-col sm:flex-row sm:divide-x divide-stroke border-y border-stroke mb-16">
        <div className="flex items-start gap-3 py-5 sm:py-2 sm:px-6 flex-1 first:sm:pl-0">
          <MapPin size={18} className="text-clay mt-0.5 shrink-0" />
          <div>
            <div className="font-display text-base mb-0.5">Basé à Bobo-Dioulasso</div>
            <p className="text-xs text-muted">Je connais le marché local et ses contraintes concrètes.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 py-5 sm:py-2 sm:px-6 flex-1">
          <Code2 size={18} className="text-clay mt-0.5 shrink-0" />
          <div>
            <div className="font-display text-base mb-0.5">Approche pratique</div>
            <p className="text-xs text-muted">Autodidacte, formé en construisant de vrais produits.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 py-5 sm:py-2 sm:px-6 flex-1">
          <Shield size={18} className="text-clay mt-0.5 shrink-0" />
          <div>
            <div className="font-display text-base mb-0.5">Un seul interlocuteur</div>
            <p className="text-xs text-muted">De la conception à la sécurité, sans intermédiaires.</p>
          </div>
        </div>
      </div>

      <div className="text-center border border-stroke rounded-md bg-surface/40 px-8 py-12">
        <Sparkles size={22} className="text-clay mx-auto mb-4" />
        <h2 className="font-display text-2xl sm:text-3xl mb-4">Envie d'en discuter ?</h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-sm hover:opacity-90 transition-opacity"
        >
          Me contacter <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
