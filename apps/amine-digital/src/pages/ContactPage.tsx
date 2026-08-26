import { useState } from 'react'
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react'

const CONTACTS = [
  { icon: MessageCircle, label: 'WhatsApp', value: 'Écrire directement', href: 'https://wa.me/22655300868' },
  { icon: Mail, label: 'Email', value: 'amine.dg.dev@gmail.com', href: 'mailto:amine.dg.dev@gmail.com' },
  { icon: MapPin, label: 'Localisation', value: 'Bobo-Dioulasso, Burkina Faso', href: null },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="px-6 pt-36 pb-24 max-w-[1000px] mx-auto">
      <div className="text-center mb-14">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Contact</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Parlons de votre projet</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">
          Le plus rapide reste WhatsApp. Sinon, laissez un message ci-dessous.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-14">
        {CONTACTS.map((c) => {
          const content = (
            <div className="border border-stroke rounded-md p-5 hover:border-clay/40 transition-colors h-full">
              <c.icon size={18} className="text-clay mb-3" />
              <div className="text-xs font-mono uppercase tracking-widest text-muted mb-1">{c.label}</div>
              <div className="text-sm font-medium">{c.value}</div>
            </div>
          )
          return c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer">{content}</a>
          ) : (
            <div key={c.label}>{content}</div>
          )
        })}
      </div>

      <div className="border border-stroke rounded-md p-7 sm:p-10 bg-surface/40">
        {sent ? (
          <div className="text-center py-10">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-display text-2xl mb-2">Message envoyé</h3>
            <p className="text-muted text-sm">Je reviens vers vous rapidement.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <input required placeholder="Nom" className="border border-stroke rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:border-clay" />
            <input required type="email" placeholder="Email" className="border border-stroke rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:border-clay" />
            <input placeholder="Téléphone / WhatsApp" className="sm:col-span-2 border border-stroke rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:border-clay" />
            <textarea required placeholder="Décrivez votre projet..." rows={5} className="sm:col-span-2 border border-stroke rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:border-clay resize-none" />
            <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-clay text-white font-semibold px-6 py-3.5 rounded-sm hover:opacity-90 transition-opacity">
              <Send size={16} /> Envoyer le message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
