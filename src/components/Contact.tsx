import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Copy, Check, Send, MapPin, Sparkles, Phone, ShieldCheck, Linkedin, Facebook, ShoppingBag } from 'lucide-react'
import Reveal from './Reveal'
import { playClickSound } from '../lib/sound'
import { fetchSettings, DEFAULT_SETTINGS, SiteSettings } from '../lib/supabase'

/* Icône TikTok — pas dans lucide-react, en SVG simple */
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Projet / Opportunité', message: '' })
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    fetchSettings().then(setSettings)
  }, [])

  const copyEmail = () => {
    playClickSound()
    navigator.clipboard.writeText(settings.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    playClickSound()
    setSent(true)

    // Open mailto client with prefilled data
    const mailtoUrl = `mailto:${settings.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoUrl

    setTimeout(() => {
      setSent(false)
      setFormData({ name: '', email: '', subject: 'Projet / Opportunité', message: '' })
    }, 4000)
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-36 px-6 max-w-[1320px] mx-auto z-10">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-3">
          <span className="w-8 h-px bg-clay" /> Démarrer une collaboration
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-6">
          Inscrivons vos idées dans le réel<span className="text-[#3B82F6]">.</span>
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-10 items-start mt-8">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={0.1}>
            <div className="bg-surface/60 border border-slate-900/10 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-2xl">
              <p className="text-sm text-slate-900/80 leading-relaxed font-sans">
                Vous recherchez un développeur fullstack réactif, capable de prendre en charge votre projet de la conception au déploiement ? Je réponds généralement sous 2 heures.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Box */}
                <div className="flex items-center justify-between bg-white/50 border border-slate-900/10 rounded-2xl p-4 hover:border-[#3B82F6]/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted uppercase">Email Direct</div>
                      <a href={`mailto:${settings.email}`} className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#3B82F6] transition-colors">
                        {settings.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    title="Copier l'email"
                    className="p-2.5 rounded-xl bg-slate-900/5 hover:bg-slate-900/10 text-slate-900/70 hover:text-slate-900 transition-colors"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* WhatsApp Box */}
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Bonjour%20Amine,%20je%20souhaite%20discuter%20d'un%20projet...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="flex items-center justify-between bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-4 hover:bg-[#25D366]/20 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#25D366] text-black flex items-center justify-center shrink-0 font-bold">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#25D366] uppercase font-bold">Réponse sous 2h</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#25D366] transition-colors">
                        {settings.phone} (WhatsApp)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider pr-2">Discuter ↗</span>
                </a>

                {/* Réseaux sociaux */}
                {(settings.linkedin || settings.tiktok || settings.facebook) && (
                  <div className="flex gap-2.5 pt-1">
                    {settings.linkedin && (
                      <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" onClick={playClickSound}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0A66C2]/10 border border-[#0A66C2]/30 hover:bg-[#0A66C2]/20 text-[#0A66C2] rounded-xl py-3 transition-colors">
                        <Linkedin size={18} /> <span className="text-xs font-bold">LinkedIn</span>
                      </a>
                    )}
                    {settings.tiktok && (
                      <a href={settings.tiktok} target="_blank" rel="noopener noreferrer" onClick={playClickSound}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900/5 border border-slate-900/20 hover:bg-slate-900/10 text-slate-900 rounded-xl py-3 transition-colors">
                        <TikTokIcon size={16} /> <span className="text-xs font-bold">TikTok</span>
                      </a>
                    )}
                    {settings.facebook && (
                      <a href={settings.facebook} target="_blank" rel="noopener noreferrer" onClick={playClickSound}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/20 text-[#1877F2] rounded-xl py-3 transition-colors">
                        <Facebook size={18} /> <span className="text-xs font-bold">Facebook</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Boutique / formations */}
                {settings.store_url && (
                  <a href={settings.store_url} target="_blank" rel="noopener noreferrer" onClick={playClickSound}
                    className="flex items-center justify-between bg-clay/10 border border-clay/30 rounded-2xl p-4 hover:bg-clay/20 transition-all group">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-clay/20 text-clay flex items-center justify-center shrink-0">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-clay uppercase font-bold">Boutique</div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-clay transition-colors">
                          {settings.store_label || 'Voir mes formations'}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-clay uppercase tracking-wider pr-2">Découvrir ↗</span>
                  </a>
                )}

                {/* Location */}
                <div className="flex items-center gap-3.5 bg-white/50 border border-slate-900/10 rounded-2xl p-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-900/5 text-clay flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">Localisation</div>
                    <div className="text-xs sm:text-sm text-slate-900 font-medium">Bobo-Dioulasso, Burkina Faso 🇧🇫</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="bg-surface/80 border border-slate-900/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-xl">
              <h3 className="font-display text-2xl text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles size={20} className="text-[#3B82F6]" /> Envoyer un message direct
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1.5">Nom / Entreprise</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Jean Dupont"
                    className="w-full bg-white/60 border border-slate-900/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-900/35 outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1.5">Adresse Email</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jean@exemple.com"
                    className="w-full bg-white/60 border border-slate-900/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-900/35 outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted uppercase mb-1.5">Sujet de la demande</label>
                <input
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="ex: Création de site e-commerce / Opportunité de recrutement"
                  className="w-full bg-white/60 border border-slate-900/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-900/35 outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted uppercase mb-1.5">Votre Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Expliquez brièvement votre besoin, vos délais et vos objectifs..."
                  className="w-full bg-white/60 border border-slate-900/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-900/35 outline-none focus:border-[#3B82F6] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-black font-bold py-4 text-sm hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(59, 130, 246,0.4)]"
              >
                {sent ? (
                  <>
                    <Check size={18} /> Redirection vers l'application e-mail...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Envoyer le message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
