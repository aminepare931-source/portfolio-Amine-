import { useState } from 'react'
import { MessageCircle, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { submitLead } from '../lib/supabase'
import { useSettings, waUrl } from '../lib/settings'

export default function ContactPage() {
  const cfg = useSettings()
  const CONTACTS = [
    { icon: MessageCircle, label: 'WhatsApp', value: cfg.phone, href: waUrl(cfg) },
    { icon: Mail, label: 'Email', value: cfg.email, href: `mailto:${cfg.email}` },
    { icon: MapPin, label: 'Localisation', value: cfg.address, href: null as string | null },
  ]
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setBusy(true); setError('')
    const r = await submitLead({ name: String(f.get('name')), email: String(f.get('email')), phone: String(f.get('phone')), message: String(f.get('message')) })
    setBusy(false)
    if (r.ok) setSent(true)
    else setError("Le message n'a pas pu être envoyé. Écrivez-nous directement sur WhatsApp.")
  }

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
            <CheckCircle2 size={36} className="text-clay mx-auto mb-3" />
            <h3 className="font-display text-2xl mb-2">Message envoyé</h3>
            <p className="text-muted text-sm">Nous revenons vers vous rapidement.</p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="grid sm:grid-cols-2 gap-4"
          >
            <input required name="name" maxLength={80} placeholder="Nom" className="border border-stroke rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay" />
            <input required type="email" name="email" placeholder="Email" className="border border-stroke rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay" />
            <input name="phone" placeholder="Téléphone / WhatsApp" className="sm:col-span-2 border border-stroke rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay" />
            <textarea required name="message" minLength={5} maxLength={2000} placeholder="Décrivez votre projet..." rows={5} className="sm:col-span-2 border border-stroke rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay resize-none" />
            {error && <p role="alert" className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">{error}</p>}
            <button type="submit" disabled={busy} className="sm:col-span-2 disabled:opacity-50 inline-flex items-center justify-center gap-2 bg-clay text-white font-semibold px-6 py-3.5 rounded-sm hover:opacity-90 transition-opacity">
              <Send size={16} /> {busy ? 'Envoi…' : 'Envoyer le message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
