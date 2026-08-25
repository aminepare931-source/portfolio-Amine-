import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Palette, Megaphone, ShieldCheck, Smartphone, Bot, ArrowRight, Check, Plus } from 'lucide-react'

const SERVICES = [
  {
    icon: Code2,
    title: 'Sites web',
    teaser: 'Vitrine, boutique en ligne, plateforme sur mesure.',
    desc: 'Rapide, responsive, facile à gérer soi-même une fois livré.',
    items: ['Site vitrine professionnel', 'Boutique en ligne (paiement Mobile Money)', 'Refonte de site existant', 'Hébergement & nom de domaine'],
  },
  {
    icon: Smartphone,
    title: 'Applications mobiles',
    teaser: 'Une app Android pensée pour votre activité.',
    desc: 'De l\'idée au store, en passant par les retours de vos premiers utilisateurs.',
    items: ['Application métier', 'Application vitrine', 'Maintenance & mises à jour'],
  },
  {
    icon: Palette,
    title: 'Design & identité',
    teaser: 'Une image visuelle qui inspire confiance.',
    desc: 'Une identité cohérente, du logo aux publications.',
    items: ['Logo & charte graphique', 'Supports pour réseaux sociaux', 'Maquettes UI/UX'],
  },
  {
    icon: Megaphone,
    title: 'Marketing digital',
    teaser: 'Être visible là où sont vos clients.',
    desc: 'Du contenu qui parle à votre audience et qui convertit.',
    items: ['Gestion de réseaux sociaux', 'Création de contenu', 'Campagnes publicitaires ciblées'],
  },
  {
    icon: Bot,
    title: 'Automatisation & IA',
    teaser: 'Moins de tâches répétitives, plus de temps utile.',
    desc: 'Des outils qui travaillent pendant que vous vous occupez du reste.',
    items: ['Chatbots WhatsApp / Messenger', 'Automatisation de tâches', 'Intégration d\'outils IA'],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité',
    teaser: 'Protéger vos données et vos comptes.',
    desc: 'Un diagnostic clair, des correctifs, et les bons réflexes ensuite.',
    items: ['Audit de sécurité', 'Sécurisation de comptes & sites', 'Sensibilisation & bonnes pratiques'],
  },
]

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="px-6 pt-36 pb-24 max-w-[900px] mx-auto">
      <div className="text-center mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Ce que je fais</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Nos services</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          De l'idée au lancement, un accompagnement complet pour exister en ligne.
        </p>
      </div>

      <div className="border-t border-stroke">
        {SERVICES.map((s, i) => {
          const isOpen = openIndex === i
          return (
            <div key={s.title} className="border-b border-stroke">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-5 py-6 sm:py-8 text-left group"
              >
                <div
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-clay text-white' : 'bg-clay/10 text-clay'
                  }`}
                >
                  <s.icon size={isOpen ? 22 : 20} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-display transition-colors ${isOpen ? 'text-clay' : 'text-slate-900'} text-2xl sm:text-3xl`}>
                    {s.title}
                  </h3>
                  <p className="hidden sm:block text-sm text-muted mt-1">{s.teaser}</p>
                </div>

                <Plus
                  size={20}
                  className={`shrink-0 text-clay transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pl-0 sm:pl-[76px] pb-8 pr-2">
                      <p className="text-sm text-slate-900/70 mb-5 max-w-md leading-relaxed">{s.desc}</p>
                      <ul className="space-y-2.5">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-900/80">
                            <Check size={15} className="text-clay shrink-0 mt-0.5" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
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
