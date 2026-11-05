import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Loader2, Upload, X, FileText } from 'lucide-react'
import { submitTeamApplication, uploadCandidateFile, MAX_UPLOAD, type UploadedFile } from '../lib/supabase'
import { ALL_FIELDS, checkField, sectionsFor, inMode, isRequired, type Field, type Mode } from '../data/applicationForm'

type Values = Record<string, string | boolean | UploadedFile[]>
const DRAFT = 'ad_application_draft'

function loadDraft(): Values {
  try { return JSON.parse(localStorage.getItem(DRAFT) ?? '{}') as Values } catch { return {} }
}

export default function TeamApplyPage() {
  const [params] = useSearchParams()
  const code = params.get('code') ?? ''
  const mode: Mode = params.get('type') === 'connu' ? 'court' : 'complet'
  const sections = useMemo(() => sectionsFor(mode), [mode])
  const fieldsNow = useMemo(() => ALL_FIELDS.filter((f) => inMode(f, mode)), [mode])
  const [v, setV] = useState<Values>(loadDraft)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [uploading, setUploading] = useState<{ name: string; pct: number }[]>([])
  const [upErr, setUpErr] = useState('')
  const files = (Array.isArray(v.files) ? v.files : []) as UploadedFile[]
  const trap = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.title = 'Candidature — AMINE DIGITAL'
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'
    document.head.appendChild(m)
    return () => m.remove()
  }, [])
  useEffect(() => { try { localStorage.setItem(DRAFT, JSON.stringify(v)) } catch { /* */ } }, [v])

  const required = useMemo(() => fieldsNow.filter((f) => isRequired(f, mode)), [fieldsNow, mode])
  const filled = required.filter((f) => !checkField(f, v[f.key], mode)).length
  const pct = Math.round((filled / required.length) * 100)

  const set = (k: string, val: string | boolean) => { setV((x) => ({ ...x, [k]: val })); if (errors[k]) setErrors((e) => ({ ...e, [k]: '' })) }

  async function addFiles(list: FileList | null) {
    if (!list) return
    setUpErr('')
    const picked = Array.from(list).slice(0, Math.max(0, 6 - files.length))
    if (list.length + files.length > 6) setUpErr('6 fichiers maximum : les premiers seulement ont été gardés.')
    for (const f of picked) {
      if (f.size > MAX_UPLOAD) { setUpErr(`« ${f.name} » dépasse 50 Mo. Pour une vidéo plus lourde, mets-la sur YouTube ou Google Drive et colle le lien.`); continue }
      setUploading((u) => [...u, { name: f.name, pct: 0 }])
      try {
        const up = await uploadCandidateFile(code, f, (pct) => setUploading((u) => u.map((x) => (x.name === f.name ? { ...x, pct } : x))))
        setV((x) => ({ ...x, files: [...((Array.isArray(x.files) ? x.files : []) as UploadedFile[]), up] }))
      } catch (e) { setUpErr((e as Error).message) }
      setUploading((u) => u.filter((x) => x.name !== f.name))
    }
  }
  const removeFile = (url: string) => setV((x) => ({ ...x, files: files.filter((f) => f.url !== url) }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    if (trap.current?.value) { setDone(true); return } // champ piège : un robot l'a rempli
    const errs: Record<string, string> = {}
    for (const f of fieldsNow) { const m = checkField(f, v[f.key], mode); if (m) errs[f.key] = m }
    if (mode === 'complet' && !String(v.link1 ?? '').trim() && files.length === 0) errs.link1 = 'Ajoute au moins une preuve : un lien ou un fichier.'
    if (uploading.length) { setError('Attends la fin de l\'envoi des fichiers.'); return }
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(`f-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setError(`Il reste ${Object.keys(errs).length} champ(s) à corriger.`); return }
    setBusy(true); setError('')
    const data: Record<string, unknown> = { mode }
    for (const f of fieldsNow) { const x = v[f.key]; if (f.type === 'check') data[f.key] = x === true; else if (typeof x === 'string' && x.trim()) data[f.key] = x.trim() }
    if (files.length) data.files = files
    const r = await submitTeamApplication(code, data)
    setBusy(false)
    if (r.ok) { try { localStorage.removeItem(DRAFT) } catch { /* */ } setDone(true) } else setError(r.error ?? 'Erreur.')
  }

  const base = 'w-full border rounded-sm px-4 py-3 text-sm bg-bg focus:outline-none focus:border-clay'

  const renderField = (f: Field) => {
    const err = errors[f.key]
    const cls = `${base} ${err ? 'border-red-400' : 'border-stroke'}`
    const val = typeof v[f.key] === 'string' ? (v[f.key] as string) : ''
    if (f.type === 'check') {
      return (
        <label id={`f-${f.key}`} className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={v[f.key] === true} onChange={(e) => set(f.key, e.target.checked)} className="mt-1 h-4 w-4 shrink-0" />
          <span>{f.label}{err && <span className="block text-xs text-red-700 mt-1">{err}</span>}</span>
        </label>
      )
    }
    return (
      <div id={`f-${f.key}`}>
        <label className="block text-sm font-medium" htmlFor={`i-${f.key}`}>{f.label}{!isRequired(f, mode) && <span className="text-muted font-normal"> (facultatif)</span>}</label>
        {f.hint && <p className="text-xs text-muted mt-1">{f.hint}</p>}
        <div className="mt-1.5">
          {f.type === 'textarea' ? (
            <textarea id={`i-${f.key}`} rows={f.rows ?? 3} maxLength={2000} value={val} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} className={`${cls} resize-y`} />
          ) : f.type === 'select' ? (
            <select id={`i-${f.key}`} value={val} onChange={(e) => set(f.key, e.target.value)} className={cls}>
              <option value="">Choisir…</option>
              {f.options!.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : f.type === 'radio' ? (
            <div className="flex gap-3">
              {f.options!.map((o) => (
                <button type="button" key={o} onClick={() => set(f.key, o)} className={`px-6 py-2.5 rounded-sm text-sm border transition-colors ${val === o ? 'bg-gov text-white border-gov' : 'border-stroke hover:border-gov/50'}`}>{o}</button>
              ))}
            </div>
          ) : (
            <input id={`i-${f.key}`} type={f.type} maxLength={f.type === 'url' ? 300 : 160} value={val} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder} className={cls} />
          )}
        </div>
        {err && <p className="text-xs text-red-700 mt-1.5">{err}</p>}
      </div>
    )
  }

  if (!code) {
    return <div className="px-6 pt-40 pb-24 max-w-[520px] mx-auto text-center"><h1 className="font-display text-2xl mb-3">Lien incomplet</h1><p className="text-muted">Utilise le lien complet envoyé par AMINE DIGITAL.</p></div>
  }

  if (done) {
    return (
      <div className="px-6 pt-40 pb-24 max-w-[560px] mx-auto text-center">
        <span className="w-14 h-14 rounded-full bg-clay/10 text-clay flex items-center justify-center mx-auto mb-5"><Check size={26} /></span>
        <h1 className="font-display text-3xl mb-3">{mode === 'court' ? 'Dossier envoyé' : 'Candidature envoyée'}</h1>
        <p className="text-muted">{mode === 'court' ? 'Merci, ton dossier est bien enregistré. AMINE DIGITAL revient vers toi très vite.' : 'Merci. AMINE DIGITAL étudie chaque dossier avec attention. Si ton profil correspond, tu seras contacté(e) sur WhatsApp ou par e-mail pour un entretien et un test pratique.'}</p>
      </div>
    )
  }

  return (
    <div className="px-5 sm:px-6 pt-36 pb-24 max-w-[760px] mx-auto">
      <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">Recrutement</div>
      <h1 className="font-display text-3xl sm:text-4xl mb-3">{mode === 'court' ? "Ton dossier d'équipe AMINE DIGITAL" : "Candidature à l'équipe AMINE DIGITAL"}</h1>
      {mode === 'court' ? (
        <p className="text-muted mb-4">Pas besoin de tout remplir : on se connaît déjà. AMINE DIGITAL a simplement besoin de quelques informations pour ton dossier d'équipe. Compte environ 5 minutes.</p>
      ) : (
      <p className="text-muted mb-4">AMINE DIGITAL travaille pour de vrais clients : chaque personne qui rejoint l'équipe doit pouvoir prouver son niveau. Prends le temps de répondre avec précision, comptes environ 15 minutes. Ton brouillon est gardé sur cet appareil si tu dois t'arrêter.</p>
      )}

      <div className="sticky top-20 z-10 bg-bg/95 backdrop-blur border border-stroke rounded-sm px-4 py-2.5 mb-8 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-stroke overflow-hidden"><div className="h-full bg-clay transition-all" style={{ width: `${pct}%` }} /></div>
        <span className="text-xs font-mono text-muted w-20 text-right">{filled}/{required.length}</span>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-12">
        <input ref={trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        {sections.map((s, i) => (
          <section key={s.id}>
            <div className="text-xs font-mono uppercase tracking-widest text-clay mb-1">Étape {i + 1} sur {sections.length}</div>
            <h2 className="font-display text-2xl mb-2">{s.title}</h2>
            {mode === 'complet' && s.intro && <p className="text-sm text-muted mb-5">{s.intro}</p>}
            {mode === 'court' && s.id === 'preuves' && <p className="text-sm text-muted mb-5">Facultatif : si tu as des exemples de ton travail (liens, photos, vidéos), ajoute-les. Sinon, passe à la suite.</p>}
            <div className="space-y-5">{s.fields.map((f) => <div key={f.key}>{renderField(f)}</div>)}</div>
        {s.id === 'preuves' && (
          <div id="f-files" className="mt-5 border border-dashed border-stroke rounded-md p-4">
            <div className="text-sm font-medium">Tes fichiers <span className="text-muted font-normal">(photos, vidéos, PDF, maquettes…)</span></div>
            <p className="text-xs text-muted mt-1 mb-3">6 fichiers maximum, 50 Mo chacun. Envoie ce qui montre le mieux ton travail : captures d'écran, vidéo de démonstration, designs, document.</p>
            <label className="inline-flex items-center gap-2 border border-stroke rounded-sm px-4 py-2.5 text-sm cursor-pointer hover:border-gov/50">
              <Upload size={16} /> Choisir des fichiers
              <input type="file" multiple accept="image/*,video/*,audio/*,.pdf,.zip,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt" className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
            </label>
            <ul className="mt-3 space-y-2">
              {files.map((f) => (
                <li key={f.url} className="flex items-center gap-3 text-sm border border-stroke rounded-sm px-3 py-2">
                  {f.type.startsWith('image/') ? <img src={f.url} alt="" className="w-10 h-10 object-cover rounded-sm" /> : <FileText size={18} className="text-clay shrink-0" />}
                  <span className="flex-1 truncate">{f.name}</span>
                  <span className="text-xs text-muted">{(f.size / 1048576).toFixed(1)} Mo</span>
                  <button type="button" onClick={() => removeFile(f.url)} aria-label="Retirer le fichier" className="text-red-700"><X size={16} /></button>
                </li>
              ))}
              {uploading.map((u) => (
                <li key={u.name} className="text-sm border border-stroke rounded-sm px-3 py-2">
                  <div className="flex justify-between gap-3"><span className="truncate">{u.name}</span><span className="text-xs text-muted">{u.pct}%</span></div>
                  <div className="h-1 mt-2 bg-stroke rounded-full overflow-hidden"><div className="h-full bg-clay transition-all" style={{ width: `${u.pct}%` }} /></div>
                </li>
              ))}
            </ul>
            {upErr && <p role="alert" className="text-xs text-red-700 mt-2">{upErr}</p>}
          </div>
        )}
          </section>
        ))}
        {error && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">{error}</p>}
        <button disabled={busy} className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-8 py-3.5 rounded-sm disabled:opacity-40 hover:opacity-90 transition-opacity">
          {busy && <Loader2 size={16} className="animate-spin" />} {mode === 'court' ? 'Envoyer mon dossier' : 'Envoyer ma candidature'}
        </button>
      </form>
    </div>
  )
}
