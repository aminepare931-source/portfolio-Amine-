import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Camera, User, Loader2 } from 'lucide-react'
import { submitTeamMember } from '../lib/supabase'

// Recadre la photo en carré 400x400 et la compresse (≈ 30 Ko) avant envoi.
async function resizePhoto(file: File): Promise<string> {
  const bmp = await createImageBitmap(file)
  const s = Math.min(bmp.width, bmp.height)
  const c = document.createElement('canvas')
  c.width = c.height = 400
  c.getContext('2d')!.drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, 400, 400)
  return c.toDataURL('image/jpeg', 0.82)
}

export default function TeamJoinPage() {
  const [params] = useSearchParams()
  const code = params.get('code') ?? ''
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [grp, setGrp] = useState<'Associés' | 'Collaborateurs'>('Collaborateurs')
  const [bio, setBio] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.title = 'Rejoindre la page équipe — AMINE DIGITAL'
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'
    document.head.appendChild(m)
    return () => m.remove()
  }, [])

  const valid = useMemo(() => name.trim().length >= 2 && role.trim().length >= 2 && consent, [name, role, consent])

  async function onPhoto(f?: File) {
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Choisis un fichier image (JPG ou PNG).'); return }
    try { setPhoto(await resizePhoto(f)); setError('') } catch { setError("Impossible de lire cette photo. Essaie-en une autre.") }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true); setError('')
    const r = await submitTeamMember({ code, name, role, grp, bio, photo })
    setBusy(false)
    if (r.ok) setDone(true); else setError(r.error ?? 'Erreur.')
  }

  const field = 'w-full border border-stroke rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay'

  if (!code) {
    return <div className="px-6 pt-40 pb-24 max-w-[520px] mx-auto text-center"><h1 className="font-display text-2xl mb-3">Lien incomplet</h1><p className="text-muted">Utilise le lien complet envoyé par AMINE DIGITAL.</p></div>
  }

  if (done) {
    return (
      <div className="px-6 pt-40 pb-24 max-w-[520px] mx-auto text-center">
        <span className="w-14 h-14 rounded-full bg-clay/10 text-clay flex items-center justify-center mx-auto mb-5"><Check size={26} /></span>
        <h1 className="font-display text-3xl mb-3">Merci {name.trim().split(' ')[0]} !</h1>
        <p className="text-muted mb-6">Ta fiche a bien été envoyée. Elle apparaîtra sur la page « À propos » dès qu'AMINE DIGITAL l'aura validée.</p>
        
      </div>
    )
  }

  return (
    <div className="px-5 sm:px-6 pt-36 pb-24 max-w-[960px] mx-auto">
      <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Équipe</div>
      <h1 className="font-display text-3xl sm:text-4xl mb-3">Rejoins la page équipe d'AMINE DIGITAL</h1>
      <p className="text-muted mb-10 max-w-xl">Remplis ces quelques lignes. Une fois envoyée, ta fiche sera relue puis publiée sur le site par AMINE DIGITAL.</p>

      <div className="grid md:grid-cols-[1fr_300px] gap-10 items-start">
        <form onSubmit={onSubmit} className="space-y-5">
          <label className="block text-sm font-medium">Nom et prénom
            <input required value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="Ex. Aminata Traoré" className={`${field} mt-1.5`} />
          </label>
          <label className="block text-sm font-medium">Ton rôle
            <input required value={role} onChange={(e) => setRole(e.target.value)} maxLength={100} placeholder="Ex. Designer graphique" className={`${field} mt-1.5`} />
          </label>
          <div>
            <div className="text-sm font-medium mb-1.5">Statut</div>
            <div className="flex gap-3">
              {(['Associés', 'Collaborateurs'] as const).map((g) => (
                <button type="button" key={g} onClick={() => setGrp(g)} className={`flex-1 px-4 py-3 rounded-sm text-sm border transition-colors ${grp === g ? 'bg-gov text-white border-gov' : 'border-stroke hover:border-gov/50'}`}>
                  {g === 'Associés' ? 'Associé(e)' : 'Collaborateur / collaboratrice'}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm font-medium">Une phrase de présentation <span className="text-muted font-normal">(facultatif)</span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={240} rows={3} placeholder="Ex. Je crée les visuels et l'identité des marques." className={`${field} mt-1.5 resize-none`} />
            <span className="text-xs text-muted">{bio.length}/240</span>
          </label>
          <div>
            <div className="text-sm font-medium mb-1.5">Ta photo <span className="text-muted font-normal">(facultatif, visage bien visible)</span></div>
            <label className="inline-flex items-center gap-2 border border-stroke rounded-sm px-4 py-3 text-sm cursor-pointer hover:border-gov/50">
              <Camera size={16} /> {photo ? 'Changer la photo' : 'Choisir une photo'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
            </label>
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4" />
            <span>J'accepte que mon nom, mon rôle et ma photo soient publiés sur le site AMINE DIGITAL.</span>
          </label>
          {error && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">{error}</p>}
          <button disabled={!valid || busy} className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-8 py-3.5 rounded-sm disabled:opacity-40 hover:opacity-90 transition-opacity">
            {busy && <Loader2 size={16} className="animate-spin" />} Valider
          </button>
        </form>

        <aside className="md:sticky md:top-28">
          <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">Aperçu sur le site</div>
          <div className="flex items-start gap-4 border border-stroke rounded-md p-5 bg-surface/30">
            {photo ? <img src={photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-clay/30 shrink-0" /> : <span className="w-16 h-16 rounded-full bg-clay/10 text-clay flex items-center justify-center shrink-0"><User size={24} /></span>}
            <div>
              <div className="font-display text-base">{name || 'Ton nom'}</div>
              <div className="text-xs text-clay font-mono uppercase tracking-wide mt-0.5">{role || 'Ton rôle'}</div>
              {bio && <p className="text-xs text-muted leading-relaxed mt-2">{bio}</p>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
