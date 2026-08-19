import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, MessageCircle, MapPin, CheckCircle, Code, ShieldCheck, Globe, Sparkles, Terminal } from 'lucide-react'
import Reveal from './Reveal'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { lang, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'bio' | 'pillars' | 'polyglot'>('bio')

  const HIGHLIGHTS = [
    t('BAC Pro Énergie Solaire, BEP & BEPC', 'Professional BAC Solar Energy, BEP & BEPC'),
    t('Fullstack : TypeScript, Python, C/C++, PHP, Go', 'Fullstack: TypeScript, Python, C/C++, PHP, Go'),
    t('Cyber-sécurité : audits OWASP, APIs & JWT', 'Cybersecurity: OWASP audits, APIs & JWT'),
    t('Mobile Money : CinetPay, Orange, Moov', 'Mobile Money: CinetPay, Orange, Moov'),
    t('Automatisation IA : bots WhatsApp, Gemini SDK', 'AI Automation: WhatsApp bots, Gemini SDK'),
    t('Bobo-Dioulasso 🇧🇫 — Dispo remote international', 'Bobo-Dioulasso 🇧🇫 — Available worldwide remote'),
  ]

  const PILLARS = [
    {
      id: 'vision',
      title: t('Penser produit fini', 'Think finished product'),
      icon: Globe,
      desc: t('Pas juste du code qui marche : une interface propre et une expérience fluide.', 'Not just code that works: a clean interface and a smooth experience.'),
    },
    {
      id: 'sec',
      title: t('La sécurité, pas en option', 'Security, not optional'),
      icon: ShieldCheck,
      desc: t('Chaque système audité (OWASP), sécurisé et chiffré de bout en bout.', 'Every system audited (OWASP), secured and encrypted end-to-end.'),
    },
    {
      id: 'polyglot',
      title: t('Plusieurs langages', 'Multiple languages'),
      icon: Terminal,
      desc: t('TS, Python, C/C++, PHP, Go, Bash — le bon outil pour chaque défi.', 'TS, Python, C/C++, PHP, Go, Bash — the right tool for each challenge.'),
    },
  ]

  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-36 overflow-hidden bg-[#ffffff]">
      {/* Fond sombre uni avec lueur douce */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.04) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#ffffff]/95 to-[#ffffff] pointer-events-none" />

      <div className="relative z-10 px-6 max-w-[1320px] mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-900/10 pb-8">
            <div>
              <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-2">
                <span className="w-8 h-px bg-clay" /> {t("À Propos d'Amine Paré", "About Amine Paré")}
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900">
                {t('Développeur Fullstack & Créateur Digital', 'Fullstack Developer & Digital Creator')}<span className="text-[#3B82F6]">.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] text-black font-bold px-6 py-3 text-xs sm:text-sm hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(59, 130, 246,0.3)]"
              >
                <MessageCircle size={15} /> {t('Me contacter', 'Contact me')}
              </Link>

              <a
                href="/assets/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-900 border border-slate-900/20 hover:border-clay px-5 py-3 rounded-full transition-colors backdrop-blur-md"
              >
                <Download size={14} /> CV PDF
              </a>
            </div>
          </div>
        </Reveal>

        {/* Auto-Scrolling Highlight Marquee */}
        <div className="relative overflow-hidden mb-10 py-3 rounded-2xl bg-slate-900/40 border border-slate-900/10 backdrop-blur-md">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {[...HIGHLIGHTS, ...HIGHLIGHTS].map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/80 border border-slate-900/10 mx-2 shrink-0 text-xs font-mono text-slate-900/90"
              >
                <span className="text-[#3B82F6] font-bold">✦</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid: Portrait/Media + Interactive Content */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Portrait & Live Video Reel */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-900/10 bg-surface/80 group shadow-2xl backdrop-blur-xl">
                <img
                  src="/assets/about1.jpg"
                  alt="Mouhamed Amine Paré"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-900/20 text-[11px] font-mono text-clay mb-2">
                    <MapPin size={12} /> Bobo-Dioulasso, Burkina Faso 🇧🇫
                  </div>
                  <h3 className="font-display text-2xl text-white">Mouhamed Amine Paré</h3>
                  <p className="text-xs text-white/80 font-mono">Fullstack Developer &amp; Digital Creator (Polyglot Tech)</p>
                </div>
              </div>
            </Reveal>

            {/* Citation */}
            <Reveal delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden border border-clay/20 bg-gradient-to-br from-[#eff4fb] to-surface2 shadow-xl">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-widest mb-2">{t('Philosophie & Vision', 'Philosophy & Vision')}</span>
                  <p className="font-display text-base sm:text-lg text-slate-900 leading-snug">
                    {t(
                      '"Je préfère un projet qui marche vraiment, en production, à une démo qui brille sur le papier."',
                      '"I\'d rather ship something that actually works in production than a demo that only looks good on paper."'
                    )}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Story & Pillar Tabs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Tabs Header */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface/60 border border-slate-900/10 backdrop-blur-md">
              <button
                onClick={() => {
                  playClickSound()
                  setActiveTab('bio')
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                  activeTab === 'bio'
                    ? 'bg-[#3B82F6] text-black shadow-md'
                    : 'text-slate-900/60 hover:text-slate-900 hover:bg-slate-900/5'
                }`}
              >
                👨‍💻 {t('Mon Profil Global', 'My Global Profile')}
              </button>
              <button
                onClick={() => {
                  playClickSound()
                  setActiveTab('pillars')
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                  activeTab === 'pillars'
                    ? 'bg-[#3B82F6] text-black shadow-md'
                    : 'text-slate-900/60 hover:text-slate-900 hover:bg-slate-900/5'
                }`}
              >
                ⚡ {t('Piliers & Sécurité', 'Pillars & Security')}
              </button>
            </div>

            {/* Tab Content Box */}
            <AnimatePresence mode="wait">
              {activeTab === 'bio' && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-surface/60 border border-slate-900/10 rounded-3xl p-6 sm:p-8 space-y-4 text-sm text-slate-900/80 leading-relaxed backdrop-blur-xl"
                >
                  <p>
                    {t(
                      "Mouhamed Amine Paré — développeur fullstack et créateur digital autodidacte, formé en construisant de vrais produits. Code, cyber-sécurité, Mobile Money, automatisation IA : je mène un projet de la sécurité des données jusqu'à l'expérience finale.",
                      "Mouhamed Amine Paré — self-taught fullstack developer and digital creator, trained by building real products. Code, cybersecurity, Mobile Money, AI automation: I drive a project from data security to final UX."
                    )}
                  </p>

                  {/* Bullet Points - 2-Column Grid on Mobile */}
                  <div className="pt-4 border-t border-slate-900/10 grid grid-cols-2 sm:grid-cols-2 gap-3">
                    {HIGHLIGHTS.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-900/90 font-medium bg-slate-900/5 p-2.5 rounded-xl border border-slate-900/5">
                        <CheckCircle size={14} className="text-[#3B82F6] shrink-0 mt-0.5" />
                        <span className="leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'pillars' && (
                <motion.div
                  key="pillars"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {PILLARS.map((p) => {
                    const Icon = p.icon
                    return (
                      <div
                        key={p.id}
                        className="bg-surface/60 border border-slate-900/10 rounded-2xl p-3.5 sm:p-5 hover:border-clay/50 transition-all backdrop-blur-xl flex flex-col items-start gap-2"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#3B82F6] flex items-center justify-center shrink-0">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="font-display text-sm sm:text-lg text-slate-900 mb-1 leading-tight">{p.title}</h4>
                          <p className="text-[11px] sm:text-xs text-slate-900/70 leading-snug font-sans">{p.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct WhatsApp Action Callout */}
            <div className="bg-gradient-to-r from-[#3B82F6]/10 via-surface to-surface2 border border-[#3B82F6]/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <h4 className="font-display text-xl text-slate-900 mb-1">{t('Un projet ambitieux à concrétiser ?', 'An ambitious project to build?')}</h4>
                <p className="text-xs text-slate-900/70">{t('Discutons de vos besoins techniques & de sécurité dès aujourd\'hui.', 'Let\'s discuss your technical & security requirements today.')}</p>
              </div>
              <a
                href="https://wa.me/22655300868?text=Bonjour%20Amine,%20j'ai%20consulté%20votre%20portfolio..."
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-black font-bold px-6 py-3.5 text-xs shrink-0 hover:scale-105 transition-transform shadow-lg"
              >
                <MessageCircle size={18} /> {t('Discuter sur WhatsApp', 'Chat on WhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
