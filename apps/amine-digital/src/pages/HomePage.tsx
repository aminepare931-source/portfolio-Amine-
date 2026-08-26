import { Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ArrowRight, Code2, Palette, Megaphone, ShieldCheck } from 'lucide-react'

const HeroShader = lazy(() => import('../components/HeroShader'))

function TextRollButton({ to, children, tone = 'dark' }: { to: string; children: string; tone?: 'dark' | 'orange' }) {
  const bg = tone === 'dark' ? 'bg-gray-900' : 'bg-clay hover:bg-blue-700'
  const arrowText = tone === 'dark' ? 'text-gray-900' : 'text-clay'
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 ${bg} text-white text-[13px] sm:text-sm font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors`}
    >
      <span className="overflow-hidden h-[20px] flex flex-col">
        <span
          className="group-hover:-translate-y-full transition-transform duration-500 flex flex-col"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}
        >
          <span>{children}</span>
          <span>{children}</span>
        </span>
      </span>
      <span
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white ${arrowText} flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45 shrink-0`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25,0.1,0.25,1)' }}
      >
        <ArrowRight size={14} />
      </span>
    </Link>
  )
}

const PILLARS = [
  { icon: Code2, title: 'Développement Web & Mobile', desc: 'Sites vitrines, boutiques en ligne, applications sur mesure.' },
  { icon: Palette, title: 'Design & Identité', desc: 'Logo, charte graphique, supports visuels qui marquent.' },
  { icon: Megaphone, title: 'Marketing Digital', desc: 'Réseaux sociaux, contenu, campagnes qui font venir des clients.' },
  { icon: ShieldCheck, title: 'Cybersécurité', desc: 'Sécurisation de vos données, de vos comptes, de votre présence en ligne.' },
]

export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex flex-col bg-[#EFEFEF] overflow-hidden">
        <Suspense
          fallback={
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 30% 20%, #ffffff 0%, #efefef 60%, #e8e8e8 100%)' }}
            />
          }
        >
          <HeroShader />
        </Suspense>

        <div className="flex-1" />

        <div className="relative z-20 max-w-[1200px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <div className="text-[13px] sm:text-sm text-gray-900 tracking-wide mb-5 sm:mb-8">AMINE DIGITAL</div>

          <h1
            className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
          >
            Votre présence digitale,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            construite pour vendre,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            pas juste pour exister.
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-12">
            <TextRollButton to="/tarifs" tone="orange">
              Voir les tarifs
            </TextRollButton>
            <a
              href="https://wa.me/22600000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 text-[13px] sm:text-sm font-medium rounded-full px-6 py-3 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Discuter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
              1
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              À propos d'AMINE DIGITAL
            </span>
          </div>

          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.12] tracking-[-0.02em] mb-12 sm:mb-16 lg:mb-20"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Un seul interlocuteur, du concept
            <br className="hidden lg:block" /> au lancement de votre projet.
          </h2>

          <div className="px-5 sm:px-8 lg:px-12">
            <div className="grid sm:grid-cols-2 gap-5 mb-14">
              {PILLARS.map((p) => (
                <div key={p.title} className="border border-stroke rounded-3xl p-7">
                  <div className="w-11 h-11 rounded-2xl bg-clay/10 text-clay flex items-center justify-center mb-4">
                    <p.icon size={20} />
                  </div>
                  <h3 className="font-display text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-[15px] sm:text-lg leading-[1.65] font-medium text-gray-900 max-w-xl mb-8">
              Développeur autodidacte basé à Bobo-Dioulasso, j'accompagne entreprises et entrepreneurs burkinabè
              dans la construction de leur présence en ligne — du premier croquis jusqu'au site en production.
            </p>

            <TextRollButton to="/services">À propos de mes services</TextRollButton>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CASE STUDIES */}
      <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
              2
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Réalisations clients
            </span>
          </div>

          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
          >
            Nos projets
          </h2>

          <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {[1, 2].map((n) => (
              <div key={n} className="aspect-[329/246] rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 flex flex-col items-center justify-center text-center p-6">
                <div className="text-3xl mb-2">📁</div>
                <p className="text-sm font-medium text-gray-500">Projet client à venir</p>
                <p className="text-xs text-gray-400 mt-1">Espace réservé pour une future réalisation</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
