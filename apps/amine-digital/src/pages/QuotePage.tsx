import { useState } from 'react'
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import { submitQuote } from '../lib/supabase'
import { useSettings, waUrl } from '../lib/settings'
import { SERVICES } from '../data/services'
import Seo from '../components/Seo'

const BUDGETS = ['Moins de 25 000 FCFA', '25 000 – 50 000 FCFA', '50 000 – 100 000 FCFA', 'Plus de 100 000 FCFA', 'Je ne sais pas encore']
const DEADLINES = ['Urgent (moins d\'une semaine)', 'Sous 2 semaines', 'Sous 1 mois', 'Pas pressé']
const field = 'w-full border border-stroke rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay'

export default function QuotePage() {
  const cfg = useSettings()
  const [sent, setSent] = useState<null | { type: string; name: string }>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const g = (k: string) => String(f.get(k) ?? '').trim()
    if (!g('phone') && !g('email')) { setError('Indiquez un numéro WhatsApp ou une adresse e-mail pour que nous puissions vous répondre.'); return }
    setBusy(true); setError('')
    const r = await submitQuote({ name: g('name'), phone: g('phone'), email: g('email'), type: g('type'), budget: g('budget'), deadline: g('deadline'), message: g('message') })
    setBusy(false)
    if (r.ok) setSent({ type: g('type'), name: g('name') })
    else setError(r.error?.startsWith('Erreur') || r.error?.includes('configurée') ? "La demande n'a pas pu être envoyée. Écrivez-nous directement sur WhatsApp." : (r.error ?? 'Envoi impossible.'))
  }

  return (
    <div className="px-5 sm:px-8 pt-36 pb-24 max-w-[800px] mx-auto">
      <Seo path="/devis" title="Demander un devis — AMINE DIGITAL" description="Décrivez votre projet (site web, application, design, marketing digital) et recevez une proposition adaptée à votre budget. AMINE DIGITAL, Bobo-Dioulasso." />
      <div className="text-center mb-10">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Devis</div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4">Demander un devis</h1>
        <p className="text-slate-900/70 max-w-lg mx-auto">Quelques informations sur votre projet, et nous revenons vers vous avec une proposition claire.</p>
      </div>

      <div className="border border-stroke rounded-md p-6 sm:p-10 bg-surface/40">
        {sent ? (
          <div className="text-center py-8">
            <CheckCircle2 size={36} className="text-clay mx-auto mb-3" />
            <h2 className="font-display text-2xl mb-2">Demande envoyée</h2>
            <p className="text-muted text-sm mb-6">Merci {sent.name}. Nous revenons vers vous rapidement.</p>
            <a href={waUrl(cfg, `Bonjour AMINE DIGITAL, je viens d'envoyer une demande de devis (${sent.type || 'projet'}) sur votre site.`)} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-gov text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
              <MessageCircle size={16} /> Prévenir aussi sur WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
            <input required name="name" maxLength={80} placeholder="Votre nom" aria-label="Votre nom" className={field} />
            <input name="phone" inputMode="tel" maxLength={30} placeholder="WhatsApp / téléphone" aria-label="WhatsApp ou téléphone" className={field} />
            <input type="email" name="email" maxLength={120} placeholder="E-mail (facultatif si WhatsApp)" aria-label="E-mail" className={`sm:col-span-2 ${field}`} />
            <label className="sm:col-span-2 text-sm font-medium">Type de projet
              <select required name="type" defaultValue="" className={`${field} mt-1.5`}>
                <option value="" disabled>Choisir…</option>
                {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
                <option>Autre / je ne sais pas</option>
              </select>
            </label>
            <label className="text-sm font-medium">Budget envisagé
              <select name="budget" defaultValue="" className={`${field} mt-1.5`}>
                <option value="">Non précisé</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium">Délai souhaité
              <select name="deadline" defaultValue="" className={`${field} mt-1.5`}>
                <option value="">Non précisé</option>
                {DEADLINES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </label>
            <textarea name="message" maxLength={2000} rows={5} placeholder="Décrivez votre projet, votre activité, ce que vous attendez…" aria-label="Description du projet" className={`sm:col-span-2 ${field} resize-none`} />
            {error && <p role="alert" className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">{error}</p>}
            <button type="submit" disabled={busy} className="sm:col-span-2 disabled:opacity-50 inline-flex items-center justify-center gap-2 bg-clay text-white font-semibold px-6 py-3.5 rounded-sm hover:opacity-90 transition-opacity">
              <Send size={16} /> {busy ? 'Envoi…' : 'Envoyer ma demande'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
