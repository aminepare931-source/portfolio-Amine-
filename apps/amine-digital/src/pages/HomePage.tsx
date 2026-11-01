import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Code2, Palette, Megaphone, ShieldCheck, Smartphone, Bot, MapPin, HeadphonesIcon } from 'lucide-react'
import { SERVICES } from '../data/services'
import { PROCESS } from '../data/process'
import { PUBLICATIONS } from '../data/publications'
import { ARTICLES } from '../data/articles'
import { Line, Fade } from '../components/Reveal'
import Stats from '../components/Stats'
import HeroGlobe from '../components/HeroGlobe'
import Marquee from '../components/Marquee'
import Testimonials from '../components/Testimonials'
import Magnetic from '../components/Magnetic'
import { ServiceImage, WebDevIllustration, DesignIllustration, MarketingIllustration, SecurityIllustration, MobileIllustration, AutomationIllustration } from '../components/PillarIllustrations'
import { EASE_OUT, EASE_SOFT, EASE_OUT_CSS } from '../lib/anim'

function TextRollButton({ to, children, tone = 'dark' }: { to: string; children: string; tone?: 'dark' | 'orange' | 'light' }) {
  const bg = tone === 'dark' ? 'bg-gray-900' : tone === 'light' ? 'bg-blue-600 hover:bg-blue-500 shadow-[0_8px_24px_rgba(37,99,235,0.45)]' : 'bg-clay hover:bg-blue-700'
  const arrowText = tone === 'dark' ? 'text-gray-900' : tone === 'light' ? 'text-blue-600' : 'text-clay'
  return (
    <Magnetic strength={0.25}>
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
    </Magnetic>
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
  { icon: Code2, illustration: WebDevIllustration, title: 'Développement Web & Mobile', desc: 'Sites vitrines, boutiques en ligne, applications sur mesure.' },
  { icon: Palette, illustration: DesignIllustration, title: 'Design & Identité', desc: 'Logo, charte graphique, supports visuels qui marquent.' },
  { icon: Megaphone, illustration: MarketingIllustration, title: 'Marketing Digital', desc: 'Réseaux sociaux, contenu, campagnes qui font venir des clients.' },
  { icon: ShieldCheck, illustration: SecurityIllustration, title: 'Cybersécurité', desc: 'Sécurisation de vos données, de vos comptes, de votre présence en ligne.' },
]

export default function HomePage() {
  return (
    <>
      {/* 1 — HERO */}
      <section className="relative bg-[#061a3d] text-white overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-16 lg:pb-20">
        {/* Fond : photo globe/réseau, teintée bleu nuit pour garder le texte lisible */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <img
            src="/assets/hero-bg.jpg"
            alt=""
            width={736}
            height={1308}
            fetchPriority="high"
            className="hero-kenburns absolute inset-0 w-full h-full object-cover object-[70%_40%]"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(4,14,40,0.92) 0%, rgba(5,22,60,0.72) 48%, rgba(8,40,100,0.5) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(4,14,40,0), rgba(4,14,40,0.55))' }} />
          <HeroGlobe className="lg:hidden absolute -right-[38%] top-[6%] w-[520px] h-[520px] opacity-70" />
          <div className="hero-glow absolute -right-24 top-1/4 w-[34rem] h-[34rem] rounded-full" style={{ background: 'radial-gradient(circle, rgba(56,152,255,0.35), rgba(56,152,255,0) 65%)' }} />
        </div>

        <div className="relative z-20 max-w-[1200px] mx-auto w-full px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 text-[13px] sm:text-sm text-white/90 tracking-wide mb-5 sm:mb-6">
                <span className="w-2 h-2 rounded-sm bg-sky-400" /> AMINE DIGITAL
              </div>

              <h1 className="font-medium text-white leading-[1.08] tracking-[-0.03em] [text-shadow:0_2px_24px_rgba(2,10,30,0.55)]" style={{ fontSize: 'clamp(1.9rem, 6.5vw, 3.4rem)' }}>
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
                  <span key={c.label} className="flex items-center gap-1.5 bg-white/10 border border-white/25 rounded-sm px-3 py-1.5 text-xs font-medium text-white">
                    <c.icon size={13} className="text-sky-300" /> {c.label}
                  </span>
                ))}
              </Fade>

              <Fade delay={0.5} className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8">
                <TextRollButton to="/tarifs" tone="light">Voir les tarifs</TextRollButton>
                <Magnetic strength={0.25}>
                  <a
                    href="https://wa.me/22654412618"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-[13px] sm:text-sm font-medium rounded-sm px-6 py-3 border border-white/40 hover:bg-white/20 transition-colors"
                  >
                    Discuter sur WhatsApp
                  </a>
                </Magnetic>
              </Fade>

              {/* Ligne de repères */}
              <Fade delay={0.65} className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6 border-t border-white/25 text-xs text-white/85">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-sky-300" /> Basé à Bobo-Dioulasso</span>
                <span className="flex items-center gap-1.5"><Code2 size={13} className="text-sky-300" /> 6 domaines de service</span>
                <span className="flex items-center gap-1.5"><HeadphonesIcon size={13} className="text-sky-300" /> Suivi après livraison</span>
              </Fade>
            </div>

            {/* Photo de projet réel */}
            <Fade delay={0.2} className="relative lg:min-h-[560px]">
              <HeroGlobe className="hidden lg:block absolute lg:-top-24 lg:-right-28 lg:w-[760px] lg:h-[760px] pointer-events-none" />
              <div className="relative aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5] lg:w-[46%] lg:absolute lg:left-0 lg:bottom-0 rounded-sm overflow-hidden border-2 border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-bg">
                <img
                  src="/assets/hero-accueil.jpg"
                  alt="Équipe de professionnels devant une ville moderne — AMINE DIGITAL"
                  width={736}
                  height={1104}
                  className="w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-x-0 bottom-0 bg-govDark text-white text-xs font-mono px-4 py-3 flex items-center justify-between">
                  <span>Votre projet, notre équipe</span>
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

      <Marquee />

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

          <div className="px-5 sm:px-8 lg:px-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 mb-10">
            <div>
              {PILLARS.map((p, i) => (
                <div key={p.title} className={`group flex items-start gap-4 py-5 ${i !== 0 ? 'border-t border-stroke' : ''}`}>
                  <span className="font-display text-2xl text-gov/30 group-hover:text-gov transition-colors duration-300 w-8 shrink-0">
                    0{i + 1}
                  </span>
                  <p.illustration />
                  <div>
                    <h3 className="font-display text-lg mb-1">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:pt-2">
              <p className="text-[15px] sm:text-lg leading-[1.65] font-medium text-gray-900 max-w-xl mb-8">
                Développeur autodidacte basé à Bobo-Dioulasso, j'accompagne entreprises et entrepreneurs burkinabè
                dans la construction de leur présence en ligne — du premier croquis jusqu'au site en production.
              </p>
              <TextRollButton to="/a-propos">En savoir plus sur AMINE DIGITAL</TextRollButton>
            </div>
          </div>
        </div>
      </section>

      <Stats />

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

          <div className="px-5 sm:px-8 lg:px-12 mb-10">
            <div className="relative grid sm:grid-cols-3 gap-8 sm:gap-4">
              <div className="hidden sm:block absolute top-5 left-[16.5%] right-[16.5%] h-px bg-stroke" />
              {PROCESS.slice(0, 3).map((step) => (
                <div key={step.n} className="relative flex sm:flex-col items-start sm:items-center gap-4 sm:gap-4 sm:text-center">
                  <div className="w-10 h-10 rounded-sm bg-gov text-white font-display flex items-center justify-center shrink-0 relative z-10">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-display text-base mb-1">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed sm:max-w-[220px] sm:mx-auto">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

          <div className="px-5 sm:px-8 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 mb-10">
            {SERVICES.map((s, i) => {
              const featured = i === 0
                            return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className={`group relative border border-stroke rounded-md overflow-hidden hover:border-clay/40 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] bg-bg flex flex-col justify-between ${
                    featured ? 'lg:col-span-2 lg:row-span-2 p-8' : 'p-6'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <ServiceImage slug={s.slug} className={featured ? 'w-full max-w-[460px] h-auto' : 'w-40 h-auto'} />
                    <ArrowUpRight size={16} className="text-gov/30 group-hover:text-gov group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]" />
                  </div>
                  <div className={featured ? 'mt-10' : 'mt-6'}>
                    <h3 className={`font-display mb-1.5 ${featured ? 'text-2xl' : 'text-base'}`}>{s.title}</h3>
                    <p className={`text-muted leading-relaxed ${featured ? 'text-sm max-w-xs' : 'text-xs'}`}>{s.teaser}</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="px-5 sm:px-8 lg:px-12">
            <TextRollButton to="/services">Voir tous les services</TextRollButton>
          </div>
        </div>
      </section>

      {/* 6 — JOURNAL */}
      <section className="bg-bg pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <Fade>
            <SectionBadge n={4} label="Journal" />
          <h2
            className="px-5 sm:px-8 lg:px-12 font-medium text-gray-900 leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)' }}
          >
            Publications & conseils
          </h2>
          </Fade>

          <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {PUBLICATIONS.slice(0, 4).map((p) => (
              <Link key={p.slug} to={`/journal/${p.slug}`} className="group block rounded-md overflow-hidden border border-stroke bg-white/60 hover:border-gov/50 transition-colors">
                <img src={p.image} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="w-full aspect-square object-contain bg-surface group-hover:scale-[1.03] transition-transform duration-500" />
                <div className="p-3 text-xs font-medium leading-snug group-hover:text-clay transition-colors">{p.title}</div>
              </Link>
            ))}
          </div>

          <div className="px-5 sm:px-8 lg:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 mb-10">
            {ARTICLES[0] && (
              <Link to={`/journal/${ARTICLES[0].slug}`} className="group block border-t-2 border-gov pt-5">
                <div className="text-xs font-mono text-muted mb-3">{ARTICLES[0].date}</div>
                <h3 className="font-display text-2xl sm:text-3xl mb-3 leading-snug group-hover:text-clay transition-colors">
                  {ARTICLES[0].title}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-md mb-4">{ARTICLES[0].excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gov">
                  Lire l'article <ArrowUpRight size={14} />
                </span>
              </Link>
            )}

            <div>
              {ARTICLES.slice(1).map((a, i) => (
                <Link
                  key={a.slug}
                  to={`/journal/${a.slug}`}
                  className={`group flex items-start justify-between gap-4 py-5 ${i !== 0 ? 'border-t border-stroke' : 'border-t border-stroke lg:border-t-0'}`}
                >
                  <div>
                    <div className="text-xs font-mono text-muted mb-1.5">{a.date}</div>
                    <h4 className="font-display text-base mb-1 group-hover:text-clay transition-colors leading-snug">{a.title}</h4>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">{a.excerpt}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-gov/30 group-hover:text-gov shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="px-5 sm:px-8 lg:px-12">
            <TextRollButton to="/journal">Voir toutes les publications</TextRollButton>
          </div>
        </div>
      </section>

      <Testimonials />

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
