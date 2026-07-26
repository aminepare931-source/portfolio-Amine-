import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Briefcase, CheckCircle2, MessageSquare, Mail, Award, MapPin, Zap, ExternalLink, Copy, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface RecruiterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const { lang, t } = useLanguage()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0c0a] border border-[#FF5A1F]/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_70px_rgba(255,90,31,0.2)] text-text"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stroke pb-6 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/15 text-[#FF8A52] text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap size={14} className="animate-pulse" /> {t('Fiche Synthétique Recruteur (Pitch 30s)', 'Recruiter Executive Summary (30s Pitch)')}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-white">
                  Mouhamed Amine Paré <span className="text-clay">— Amine.Dev</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin size={13} className="text-clay" /> Bobo-Dioulasso, Burkina Faso</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">{t('Disponible CDD / CDI / Freelance / Remote', 'Available for Full-time / Freelance / Remote')}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-muted hover:text-white hover:border-clay transition-all shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Pitch Content */}
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-surface/80 border border-white/10 rounded-2xl p-5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-clay mb-2 flex items-center gap-2">
                  <Briefcase size={16} /> {t('Pourquoi recruter Amine ?', 'Why hire Amine?')}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t(
                    "Passionné de tech et du digital depuis toujours, Amine a débuté le développement à l'âge de 15 ans en 2023. En 3 ans d'évolution continue, il est devenu un Développeur Fullstack, Créateur Digital & Polyglotte Tech (TypeScript, Python, C/C++, PHP, Go). Capable de concevoir, auditer la sécurité (cyber-sécurité, OWASP), développer et intégrer des APIs de paiement Mobile Money & bots IA de bout en bout.",
                    "Passionate about all things tech and digital, Amine started software development at age 15 in 2023. Over 3 years of continuous evolution, he became a Fullstack Developer, Digital Creator & Tech Polyglot (TypeScript, Python, C/C++, PHP, Go). Equipped to design, audit security (cybersecurity, OWASP), build, and integrate Mobile Money payment APIs & AI bots end-to-end."
                  )}
                </p>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-surface border border-stroke p-4 rounded-xl text-center">
                  <div className="font-display text-2xl text-clay">3+ {t('ans', 'yrs')}</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">{t('Expérience', 'Experience')}</div>
                </div>
                <div className="bg-surface border border-stroke p-4 rounded-xl text-center">
                  <div className="font-display text-2xl text-white">12+</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">{t('Projets livrés', 'Projects Delivered')}</div>
                </div>
                <div className="bg-surface border border-stroke p-4 rounded-xl text-center">
                  <div className="font-display text-2xl text-clay">Fullstack</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">End-to-End</div>
                </div>
                <div className="bg-surface border border-stroke p-4 rounded-xl text-center">
                  <div className="font-display text-2xl text-emerald-400">100%</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">{t('Autonomie & Sécurité', 'Autonomy & Security')}</div>
                </div>
              </div>

              {/* Core Strength Bullet Points */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-clay font-bold mb-3">{t('Forces clés pour votre équipe', 'Key Strengths for Your Team')}</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 bg-surface/50 border border-stroke p-3 rounded-xl">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{t('Fullstack & Polyglotte :', 'Fullstack & Polyglot:')}</strong> TS/JS, Python, C/C++, PHP, Go, Node.js, Express, React, Supabase.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 bg-surface/50 border border-stroke p-3 rounded-xl">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{t('Cyber-Sécurité & Audits :', 'Cybersecurity & Audits:')}</strong> OWASP, auth JWT/OAuth2, proxy, hardening serveur, chiffrement.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 bg-surface/50 border border-stroke p-3 rounded-xl">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{t('Fintech & E-Commerce :', 'Fintech & E-Commerce:')}</strong> Intégration CinetPay, Mobile Money (Orange, Moov), WhatsApp Bot API.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 bg-surface/50 border border-stroke p-3 rounded-xl">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{t('Diplômes d\'État :', 'State Diplomas:')}</strong> BAC Pro Énergie Solaire, BEP Énergie Solaire, BEPC (Bases solides en ingénierie & électrotechnique).
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 bg-surface/50 border border-stroke p-3 rounded-xl">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{t('Vision Créateur Digital :', 'Digital Creator Vision:')}</strong> UI/UX, prototypage, design vidéo, automatisation globale.
                    </div>
                  </div>
                </div>
              </div>

              {/* CV & Contact Direct Actions */}
              <div className="pt-4 border-t border-stroke flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="/assets/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF5A1F] text-black font-semibold px-6 py-3.5 rounded-full hover:scale-105 transition-all text-sm shadow-[0_4px_20px_rgba(255,90,31,0.3)]"
                >
                  <Download size={18} /> {t('Télécharger le CV (PDF)', 'Download CV (PDF)')}
                </a>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => copyToClipboard('aminepare931@gmail.com', 'email')}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-stroke bg-surface hover:border-clay px-4 py-3 rounded-full text-xs font-medium transition-colors"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedEmail ? t('Email copié !', 'Email copied!') : 'aminepare931@gmail.com'}
                  </button>

                  <a
                    href="https://wa.me/22655300858?text=Bonjour%20Amine,%20j'ai%20vu%20votre%20portfolio..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-3 rounded-full text-xs font-semibold transition-colors"
                  >
                    <MessageSquare size={14} /> WhatsApp Direct
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
