import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Copy, Check, Send, MapPin, Sparkles, Phone, ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import { playClickSound } from '../lib/sound'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Projet / Opportunité', message: '' })

  const copyEmail = () => {
    playClickSound()
    navigator.clipboard.writeText('aminepare931@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    playClickSound()
    setSent(true)

    // Open mailto client with prefilled data
    const mailtoUrl = `mailto:aminepare931@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
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
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
          Inscrivons vos idées dans le réel<span className="text-[#3B82F6]">.</span>
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-12 gap-10 items-start mt-8">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={0.1}>
            <div className="bg-surface/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-2xl">
              <p className="text-sm text-white/80 leading-relaxed font-sans">
                Vous recherchez un développeur fullstack réactif, capable de prendre en charge votre projet de la conception au déploiement ? Je réponds généralement sous 2 heures.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Box */}
                <div className="flex items-center justify-between bg-black/50 border border-white/10 rounded-2xl p-4 hover:border-[#3B82F6]/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted uppercase">Email Direct</div>
                      <a href="mailto:aminepare931@gmail.com" className="text-xs sm:text-sm font-semibold text-white hover:text-[#3B82F6] transition-colors">
                        aminepare931@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    title="Copier l'email"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* WhatsApp Box */}
                <a
                  href="https://wa.me/22655300858?text=Bonjour%20Amine,%20je%20souhaite%20discuter%20d'un%20projet..."
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
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                        +226 55 30 08 58 (WhatsApp)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider pr-2">Discuter ↗</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 bg-black/50 border border-white/10 rounded-2xl p-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 text-clay flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase">Localisation</div>
                    <div className="text-xs sm:text-sm text-white font-medium">Bobo-Dioulasso, Burkina Faso 🇧🇫</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="bg-surface/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-xl">
              <h3 className="font-display text-2xl text-white mb-2 flex items-center gap-2">
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
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#3B82F6] transition-colors"
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
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#3B82F6] transition-colors"
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
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#3B82F6] transition-colors"
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
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#3B82F6] transition-colors resize-none"
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
