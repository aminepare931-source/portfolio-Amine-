import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Palette, Megaphone, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react'

const PILLARS = [
  { icon: Code2, title: 'Développement Web & Mobile', desc: 'Sites vitrines, boutiques en ligne, applications sur mesure.' },
  { icon: Palette, title: 'Design & Identité', desc: 'Logo, charte graphique, supports visuels qui marquent.' },
  { icon: Megaphone, title: 'Marketing Digital', desc: 'Réseaux sociaux, contenu, campagnes qui font venir des clients.' },
  { icon: ShieldCheck, title: 'Cybersécurité', desc: 'Sécurisation de vos données, de vos comptes, de votre présence en ligne.' },
]

export default function HomePage() {
  return (
    <>
      <section className="px-6 pt-40 pb-20 max-w-[1100px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-clay bg-clay/5 px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={13} /> Bobo-Dioulasso · Burkina Faso
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-6">
          Votre présence digitale,
          <br />
          <span className="text-clay">construite pour vendre.</span>
        </h1>
        <p className="text-slate-900/70 max-w-xl mx-auto mb-9 text-base sm:text-lg">
          Sites web, applications, design et marketing digital pour entreprises et entrepreneurs au Burkina Faso.
          Un seul interlocuteur, du concept au lancement.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/tarifs"
            className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Voir les tarifs <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/22600000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-stroke font-semibold px-7 py-3.5 rounded-full hover:bg-slate-900/5 transition-colors"
          >
            <MessageCircle size={16} /> Discuter sur WhatsApp
          </a>
        </div>
      </section>

      <section className="px-6 py-16 max-w-[1100px] mx-auto">
        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map((p) => (
            <div key={p.title} className="border border-stroke rounded-3xl p-7 hover:border-clay/40 hover:-translate-y-1 transition-all bg-surface/40">
              <div className="w-11 h-11 rounded-2xl bg-clay/10 text-clay flex items-center justify-center mb-4">
                <p.icon size={20} />
              </div>
              <h3 className="font-display text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-[900px] mx-auto text-center border border-stroke rounded-[2rem] bg-surface/50 px-8 py-14">
          <h2 className="font-display text-3xl sm:text-4xl mb-4">Un projet en tête ?</h2>
          <p className="text-slate-900/70 mb-8 max-w-md mx-auto">
            Décrivez-moi votre besoin, je vous réponds avec une proposition claire et un tarif adapté.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Démarrer une discussion <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
