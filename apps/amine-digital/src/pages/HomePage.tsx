import { Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ArrowRight, ArrowUpRight, Code2, Palette, Megaphone, ShieldCheck, Smartphone, Bot, MapPin, HeadphonesIcon } from 'lucide-react'
import { SERVICES } from '../data/services'
import { PROCESS } from '../data/process'
import { ARTICLES } from '../data/articles'
import { Line, Fade } from '../components/Reveal'
import { EASE_OUT, EASE_SOFT, EASE_OUT_CSS } from '../lib/anim'

const HeroShader = lazy(() => import('../components/HeroShader'))

function TextRollButton({ to, children, tone = 'dark' }: { to: string; children: string; tone?: 'dark' | 'orange' }) {
  const bg = tone === 'dark' ? 'bg-gray-900' : 'bg-clay hover:bg-blue-700'
  const arrowText = tone === 'dark' ? 'text-gray-900' : 'text-clay'
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 ${bg} text-white text-[13px] sm:text-sm font-medium rounded-sm pl-5 sm:pl-6 pr-2 py-2 transition-colors`}
    >
      <span className="overflow-hidden h-[20px] flex flex-col">
        <span
          className="group-hover:-translate-y-full transition-transform duration-500 flex flex-col"
          style={{ transitionTimingFunction: EASE_OUT_CSS }}
        >
          <span>{children}</span>
          <span>{children}</span>
        </span>
      </span>
      <span
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-white ${arrowText} flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45 shrink-0`}
        style={{ transitionTimingFunction: EASE_OUT_CSS }}
      >
        <ArrowRight size={14} />
      </span>
    </Link>
  )
}

function SectionBadge({ n, label, border = 'border-gray-200' }: { n: number; label: string; border?: string }) {
  return (
    <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
        {n}
      </span>
      <span className={`text-[12px] sm:text-[13px] font-medium border ${border} rounded-sm px-3 sm:px-4 py-1 sm:py-1.5`}>
        {label}
      </span>
    </div>
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
      {/* 1 — HERO */}
      <section className="relative bg-[#dbe6f7] overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 lg:pb-20">
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

        <div className="relative z-20 max-w-[1200px] mx-auto w-full px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 text-[13px] sm:text-sm text-gray-900 tracking-wide mb-5 sm:mb-6">
                <span className="w-2 h-2 rounded-sm bg-gov" /> AMINE DIGITAL
              </div>

              <h1 className="font-medium text-gray-900 leading-[1.08] tracking-[-0.03em]" style={{ fontSize: 'clamp(1.9rem, 6.5vw, 4rem)' }}>
                <Line>Votre présence digitale,</Line>
                <Line delay={0.08}>construite pour vendre,</Line>
                <Line delay={0.16}>pas juste pour exister.</Line>
              </h1>

              {/* Chips services */}
              <Fade delay={0.3} className="flex flex-wrap gap-2 mt-6">
                {[
                  { icon: Code2, label: 'Web' },
                  { icon: Smartphone, label: 'Mobile' },
                  { icon: Palette, label: 'Design' },
                  { icon: Megaphone, label: 'Marketing' },
                  { icon: Bot, label: 'IA' },
                  { icon: ShieldCheck, label: 'Sécurité' },
                ].map((c) => (
                  <span key={c.label} className="flex items-center gap-1.5 bg-bg border border-stroke rounded-sm px-3 py-1.5 text-xs font-medium text-gray-700">
                    <c.icon size={13} className="text-gov" /> {c.label}
                  </span>
                ))}
              </Fade>

              <Fade delay={0.5} className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8">
                <TextRollButton to="/tarifs" tone="orange">Voir les tarifs</TextRollButton>
                <a
                  href="https://wa.me/22655300868"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-bg text-gray-900 text-[13px] sm:text-sm font-medium rounded-sm px-6 py-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Discuter sur WhatsApp
                </a>
              </Fade>

              {/* Ligne de repères */}
              <Fade delay={0.65} className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6 border-t border-stroke/70 text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gov" /> Basé à Bobo-Dioulasso</span>
                <span className="flex items-center gap-1.5"><Code2 size={13} className="text-gov" /> 6 domaines de service</span>
                <span className="flex items-center gap-1.5"><HeadphonesIcon size={13} className="text-gov" /> Suivi après livraison</span>
              </Fade>
            </div>

            {/* Photo de projet réel */}
            <Fade delay={0.2} className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[4/4.5] rounded-sm overflow-hidden border-2 border-gov shadow-[0_20px_50px_rgba(10,61,145,0.18)] bg-bg">
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gov/10 to-gov/5 text-center p-6">
                  <Code2 size={28} className="text-gov" />
                  <p className="text-xs text-gray-500 font-mono">Photo réelle à venir</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-govDark text-white text-xs font-mono px-4 py-3 flex items-center justify-between">
                  <span>Projet en cours</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-gov rounded-sm hidden sm:flex items-center justify-center text-white font-display text-2xl -z-10">
                AD
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* 2 — À PROPOS */}
      <section className="bg-bg pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <Fade>
            <SectionBadge n={1} label="À propos d'AMINE DIGITAL" />
          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.12] tracking-[-0.02em] mb-12 sm:mb-16 lg:mb-20"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Un seul interlocuteur, du concept
            <br className="hidden lg:block" /> au lancement de votre projet.
          </h2>
          </Fade>

          <div className="px-5 sm:px-8 lg:px-12">
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {PILLARS.map((p) => (
                <div key={p.title} className="border border-stroke rounded-md p-7">
                  <div className="w-11 h-11 rounded-md bg-clay/10 text-clay flex items-center justify-center mb-4">
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

            <TextRollButton to="/a-propos">En savoir plus sur AMINE DIGITAL</TextRollButton>
          </div>
        </div>
      </section>

      {/* 3 — PROCESSUS */}
      <section className="bg-surface2 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <Fade>
            <SectionBadge n={2} label="Comment on travaille" border="border-gray-300" />
          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Notre processus
          </h2>
          </Fade>

          <div className="px-5 sm:px-8 lg:px-12 grid sm:grid-cols-3 gap-5 mb-10">
            {PROCESS.slice(0, 3).map((step) => (
              <div key={step.n} className="bg-bg rounded-md p-6 border border-stroke">
                <div className="font-display text-clay text-2xl mb-3">{step.n}</div>
                <h3 className="font-display text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-8 lg:px-12">
            <TextRollButton to="/processus">Voir les 6 étapes complètes</TextRollButton>
          </div>
        </div>
      </section>

      {/* 4 — SERVICES */}
      <section className="bg-bg pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <Fade>
            <SectionBadge n={3} label="Ce que je fais" />
          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Nos services
          </h2>
          </Fade>

          <div className="px-5 sm:px-8 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group border border-stroke rounded-md overflow-hidden hover:border-clay/40 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] bg-bg"
              >
                <div
                  className="aspect-[16/9] flex items-center justify-center relative overflow-hidden"
                  style={{ background: i % 2 === 0 ? 'linear-gradient(135deg, #0a3d9122, #0a3d9108)' : 'linear-gradient(135deg, #0a3d9115, #0a3d9105)' }}
                >
                  <s.icon size={34} className="text-gov/70" />
                  <ArrowUpRight size={16} className="absolute top-3 right-3 text-gov/40 group-hover:text-gov group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg mb-1.5">{s.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{s.teaser}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-5 sm:px-8 lg:px-12">
            <TextRollButton to="/services">Voir tous les services</TextRollButton>
          </div>
        </div>
      </section>

      {/* 5 — RÉALISATIONS */}
      <section className="bg-surface2 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1200px] mx-auto">
          <Fade>
            <SectionBadge n={4} label="Réalisations clients" border="border-gray-300" />
          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
          >
            Nos projets
          </h2>
          </Fade>

          <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {[1, 2].map((n) => (
              <div key={n} className="aspect-[329/246] rounded-md border-2 border-dashed border-gray-300 bg-bg/60 flex flex-col items-center justify-center text-center p-6">
                <div className="text-3xl mb-2">📁</div>
                <p className="text-sm font-medium text-gray-500">Projet client à venir</p>
                <p className="text-xs text-gray-400 mt-1">Espace réservé pour une future réalisation</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — JOURNAL */}
      <section className="bg-bg pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <Fade>
            <SectionBadge n={5} label="Journal" />
          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Conseils & réflexions
          </h2>
          </Fade>

          <div className="px-5 sm:px-8 lg:px-12 grid sm:grid-cols-3 gap-5 mb-10">
            {ARTICLES.map((a) => (
              <Link key={a.slug} to={`/journal/${a.slug}`} className="group">
                <div className="text-xs font-mono text-muted mb-2">{a.date}</div>
                <h3 className="font-display text-lg mb-2 group-hover:text-clay transition-colors leading-snug">{a.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{a.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="px-5 sm:px-8 lg:px-12">
            <TextRollButton to="/journal">Lire tous les articles</TextRollButton>
          </div>
        </div>
      </section>

      {/* 7 — CTA FINAL */}
      <section className="bg-surface2 px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="max-w-[900px] mx-auto text-center bg-bg border border-stroke rounded-md px-8 py-14">
          <h2 className="font-display text-3xl sm:text-4xl mb-4">Un projet en tête ?</h2>
          <p className="text-slate-900/70 mb-8 max-w-md mx-auto">
            Décrivez-moi votre besoin, je vous réponds avec une proposition claire et un tarif adapté.
          </p>
          <TextRollButton to="/contact">Démarrer une discussion</TextRollButton>
        </div>
      </section>
    </>
  )
}
