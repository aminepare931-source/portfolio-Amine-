import { Link } from 'react-router-dom'
import { Code2, Palette, Megaphone, ShieldCheck, Smartphone, Bot, ArrowRight, Check } from 'lucide-react'

const SERVICES = [
  {
    icon: Code2,
    title: 'Sites web',
    desc: 'Site vitrine, boutique en ligne, plateforme sur mesure — rapide, responsive, facile à gérer.',
    items: ['Site vitrine professionnel', 'Boutique en ligne (paiement Mobile Money)', 'Refonte de site existant', 'Hébergement & nom de domaine'],
  },
  {
    icon: Smartphone,
    title: 'Applications mobiles',
    desc: 'Applications Android sur mesure pour votre activité ou vos clients.',
    items: ['Application métier', 'Application vitrine', 'Maintenance & mises à jour'],
  },
  {
    icon: Palette,
    title: 'Design & identité',
    desc: 'Une image visuelle cohérente qui inspire confiance.',
    items: ['Logo & charte graphique', 'Supports pour réseaux sociaux', 'Maquettes UI/UX'],
  },
  {
    icon: Megaphone,
    title: 'Marketing digital',
    desc: 'Être visible là où sont vos clients, avec du contenu qui convertit.',
    items: ['Gestion de réseaux sociaux', 'Création de contenu', 'Campagnes publicitaires ciblées'],
  },
  {
    icon: Bot,
    title: 'Automatisation & IA',
    desc: 'Gagner du temps sur les tâches répétitives grâce à l\'IA.',
    items: ['Chatbots WhatsApp/Messenger', 'Automatisation de tâches', 'Intégration d\'outils IA'],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité',
    desc: 'Protéger vos données, vos comptes et votre présence en ligne.',
    items: ['Audit de sécurité', 'Sécurisation de comptes & sites', 'Sensibilisation & bonnes pratiques'],
  },
]

export default function ServicesPage() {
  return (
    <div className="px-6 pt-36 pb-24 max-w-[1100px] mx-auto">
      <div className="text-center mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Ce que je fais</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Nos services</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          De l'idée au lancement, un accompagnement complet pour exister en ligne.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {SERVICES.map((s) => (
          <div key={s.title} className="border border-stroke rounded-3xl p-7 hover:border-clay/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-clay/10 text-clay flex items-center justify-center mb-4">
              <s.icon size={20} />
            </div>
            <h3 className="font-display text-2xl mb-2">{s.title}</h3>
            <p className="text-sm text-muted mb-4 leading-relaxed">{s.desc}</p>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-900/80">
                  <Check size={15} className="text-clay shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/tarifs"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Voir les tarifs <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
