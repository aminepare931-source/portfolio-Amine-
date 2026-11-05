import { useCallback, useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, ImagePlus, Loader2, Download } from 'lucide-react'
import { fetchProjects } from '../lib/supabase'
import { PROJECT_DRAFTS } from '../data/projectDrafts'
import { SERVICES } from '../data/services'
import { resizeImage } from '../lib/image'
import { input, btn, type TabProps } from './adminUi'

/** Charge une liste via une fonction d'administration et fournit enregistrer / supprimer. */
function useCrud<T extends { id: string }>(name: string, { call, notify }: TabProps, onChange?: () => void) {
  const [rows, setRows] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const load = useCallback(async () => {
    try { setRows(await call<T[]>(`admin_${name}_list`)) } catch (e) { notify((e as Error).message) } finally { setLoading(false) }
  }, [call, notify, name])
  useEffect(() => { load() }, [load])
  const save = async (id: string | null, data: Record<string, unknown>, msg: string): Promise<boolean> => {
    try { await call(`admin_${name}_save`, { p_id: id || null, p_data: data }); notify(msg); await load(); onChange?.(); return true } catch (e) { notify((e as Error).message); return false }
  }
  const del = async (id: string, ask: string) => {
    if (!confirm(ask)) return
    try { await call(`admin_${name}_delete`, { p_id: id }); notify('Supprimé'); await load(); onChange?.() } catch (e) { notify((e as Error).message) }
  }
  return { rows, loading, save, del, load }
}

const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)
const Hidden = () => <span className="text-[10px] bg-slate-200 text-slate-700 rounded-full px-2 py-0.5 ml-1.5 font-semibold">Masqué</span>

function ImagePicker({ value, onPick, label }: { value: string | null; onPick: (dataUrl: string, w: number, h: number) => void; label: string }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('')
  async function change(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return
    setBusy(true); setErr('')
    try {
      let q = 0.82, r = await resizeImage(f, 1000, q)
      while (r.dataUrl.length > 560000 && q > 0.45) { q -= 0.12; r = await resizeImage(f, 1000, q) }
      if (r.dataUrl.length > 600000) throw new Error('trop lourde')
      onPick(r.dataUrl, r.w, r.h)
    } catch { setErr("Image illisible ou trop lourde. Essayez une autre image.") } finally { setBusy(false); e.target.value = '' }
  }
  return (
    <div className="sm:col-span-2">
      <label className={`${btn} border-stroke hover:bg-slate-900/5 cursor-pointer`}>
        {busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />} {value ? 'Changer l\'image' : label}
        <input type="file" accept="image/*" className="hidden" onChange={change} />
      </label>
      {value && <img src={value} alt="" className="mt-3 max-h-44 rounded-sm border border-stroke" />}
      {err && <p className="text-xs text-red-700 mt-2">{err}</p>}
    </div>
  )
}

/* ───────── Publications ───────── */
interface Pub { id: string; slug: string; title: string; category: string; excerpt: string; price: string | null; intro: string; points: string[]; service_slug: string | null; image: string; alt: string | null; w: number; h: number; visible: boolean }
const emptyPub = { id: '', title: '', category: 'Service', excerpt: '', price: '', intro: '', points: '', service_slug: '', image: '', w: 1000, h: 1000, alt: '', visible: true, changed: false }

export function PublicationsTab(p: TabProps) {
  const { rows, loading, save, del } = useCrud<Pub>('publication', p)
  const [f, setF] = useState<typeof emptyPub | null>(null)
  const ok = f && f.title.trim().length >= 3 && f.excerpt.trim().length >= 5 && (f.id || f.image)
  const submit = async () => {
    if (!f) return
    const data: Record<string, unknown> = { title: f.title, category: f.category, excerpt: f.excerpt, price: f.price, intro: f.intro, points: lines(f.points), service_slug: f.service_slug, alt: f.alt, visible: f.visible }
    if (f.changed) Object.assign(data, { image: f.image, w: f.w, h: f.h })
    if (await save(f.id || null, data, f.id ? 'Publication mise à jour' : 'Publication ajoutée — visible sur le site')) setF(null)
  }
  const edit = (r: Pub) => setF({ id: r.id, title: r.title, category: r.category, excerpt: r.excerpt, price: r.price ?? '', intro: r.intro, points: r.points.join('\n'), service_slug: r.service_slug ?? '', image: r.image, w: r.w, h: r.h, alt: r.alt ?? '', visible: r.visible, changed: false })
  const toggle = (r: Pub) => save(r.id, { title: r.title, category: r.category, excerpt: r.excerpt, price: r.price, intro: r.intro, points: r.points, service_slug: r.service_slug, alt: r.alt, visible: !r.visible }, r.visible ? 'Publication masquée' : 'Publication visible')
  return (
    <div>
      <p className="text-xs text-muted mb-4">Ajoutez ici une nouvelle affiche : elle apparaît tout de suite dans la page Publications et sur l'accueil, avec sa propre page (utile pour Google). Les 11 premières affiches du site restent gérées par le code.</p>
      {!f && <button onClick={() => setF({ ...emptyPub })} className={`${btn} bg-gov text-white border-gov mb-5`}><Plus size={14} /> Nouvelle publication</button>}
      {f && (
        <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-5 grid sm:grid-cols-2 gap-3">
          <input className={`${input} sm:col-span-2`} placeholder="Titre" maxLength={140} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <select className={input} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}><option>Service</option><option>Formation</option><option>Actualité</option></select>
          <input className={input} placeholder="Prix ou accroche (facultatif)" maxLength={80} value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={2} maxLength={300} placeholder="Texte court (carte et description Google)" value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={3} maxLength={1200} placeholder="Introduction affichée sur la page (facultatif)" value={f.intro} onChange={(e) => setF({ ...f, intro: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={4} placeholder={'Points clés, un par ligne (recopiez le texte de l\'affiche : Google le lira)'} value={f.points} onChange={(e) => setF({ ...f, points: e.target.value })} />
          <select className={input} value={f.service_slug} onChange={(e) => setF({ ...f, service_slug: e.target.value })}><option value="">Aucun service lié</option>{SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}</select>
          <input className={input} placeholder="Description de l'image (facultatif)" value={f.alt} onChange={(e) => setF({ ...f, alt: e.target.value })} />
          <ImagePicker value={f.image || null} label="Choisir l'affiche" onPick={(d, w, h) => setF({ ...f, image: d, w, h, changed: true })} />
          <label className="sm:col-span-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={f.visible} onChange={(e) => setF({ ...f, visible: e.target.checked })} /> Visible sur le site</label>
          <div className="sm:col-span-2 flex gap-2"><button disabled={!ok} onClick={submit} className={`${btn} bg-gov text-white border-gov disabled:opacity-40`}>Enregistrer</button><button onClick={() => setF(null)} className={`${btn} border-stroke`}>Annuler</button></div>
        </div>
      )}
      {!loading && rows.length === 0 && <p className="text-muted text-sm">Aucune publication ajoutée depuis l'administration.</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="border border-stroke rounded-md p-3 bg-white/70 flex flex-wrap gap-4 items-center">
            <img src={r.image} alt="" className="w-20 h-20 object-cover rounded-sm border border-stroke" />
            <div className="flex-1 min-w-[200px]">
              <div className="font-display text-base">{r.title}{!r.visible && <Hidden />}</div>
              <div className="text-xs text-clay font-mono uppercase">{r.category}{r.price ? ` · ${r.price}` : ''}</div>
              <p className="text-xs text-muted mt-1 line-clamp-2">{r.excerpt}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggle(r)} className={`${btn} border-stroke`}>{r.visible ? <><EyeOff size={14} /> Masquer</> : <><Eye size={14} /> Afficher</>}</button>
              <button onClick={() => edit(r)} className={`${btn} border-stroke`}><Pencil size={14} /> Modifier</button>
              <button onClick={() => del(r.id, `Supprimer « ${r.title} » ?`)} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Réalisations ───────── */
interface Real { id: string; title: string; client: string | null; sector: string | null; description: string; long_desc: string | null; result: string | null; link: string | null; tags: string[]; features: string[]; stack: string[]; gallery: string[]; image: string | null; kind: string | null; status: string | null; visible: boolean; position: number }
const emptyReal = { id: '', title: '', client: '', sector: '', description: '', long_desc: '', result: '', link: '', tags: '', features: '', stack: '', gallery: [] as string[], image: '', kind: '', status: '', visible: true, position: 0, changed: false }
const KINDS: [string, string][] = [['client', 'Projet client (réalisé pour un client)'], ['saas', 'SaaS AMINE DIGITAL (produit vendu en abonnement)'], ['interne', 'Application interne AMINE DIGITAL'], ['personnel', 'Projet personnel']]
const KIND_SHORT: Record<string, string> = { client: 'Client', saas: 'SaaS', interne: 'Interne', personnel: 'Personnel' }
const PLACEHOLDER = 'À compléter'

function GalleryPicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('')
  async function add(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 4 - value.length); if (!files.length) return
    setBusy(true); setErr('')
    try {
      const out: string[] = []
      for (const f of files) {
        let q = 0.78, r = await resizeImage(f, 1000, q)
        while (r.dataUrl.length > 520000 && q > 0.4) { q -= 0.12; r = await resizeImage(f, 1000, q) }
        out.push(r.dataUrl)
      }
      onChange([...value, ...out])
    } catch { setErr('Une image est illisible ou trop lourde.') } finally { setBusy(false); e.target.value = '' }
  }
  return (
    <div className="sm:col-span-2">
      <div className="text-xs text-muted mb-2">Captures d'écran supplémentaires (4 maximum)</div>
      <div className="flex flex-wrap gap-3 items-center">
        {value.map((g, i) => (
          <div key={i} className="relative">
            <img src={g} alt="" className="h-20 rounded-sm border border-stroke" />
            <button type="button" onClick={() => onChange(value.filter((_, k) => k !== i))} aria-label="Retirer l'image" className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs leading-5">×</button>
          </div>
        ))}
        {value.length < 4 && (
          <label className={`${btn} border-stroke hover:bg-slate-900/5 cursor-pointer`}>
            {busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />} Ajouter
            <input type="file" accept="image/*" multiple className="hidden" onChange={add} />
          </label>
        )}
      </div>
      {err && <p className="text-xs text-red-700 mt-2">{err}</p>}
    </div>
  )
}

export function RealisationsTab(p: TabProps) {
  const { rows, loading, save, del, load } = useCrud<Real>('realisation', p)
  const [f, setF] = useState<typeof emptyReal | null>(null)
  const [importing, setImporting] = useState(false)
  const draft = f && f.description.trim() === PLACEHOLDER
  const ok = f && f.title.trim().length >= 3 && f.description.trim().length >= 5 && (!f.link.trim() || /^https?:\/\//.test(f.link.trim())) && (!f.visible || (!!f.kind && !draft))
  const split = (v: string, sep: RegExp) => v.split(sep).map((t) => t.trim()).filter(Boolean)
  const payload = (r: typeof emptyReal) => ({ title: r.title, client: r.client, sector: r.sector, description: r.description, long_desc: r.long_desc, result: r.result, link: r.link, tags: split(r.tags, /,/), features: split(r.features, /\n/), stack: split(r.stack, /,/), gallery: r.gallery, kind: r.kind, status: r.status, visible: r.visible, position: Number(r.position) || 0, ...(r.changed ? { image: r.image } : {}) })
  const toForm = (r: Real) => ({ id: r.id, title: r.title, client: r.client ?? '', sector: r.sector ?? '', description: r.description, long_desc: r.long_desc ?? '', result: r.result ?? '', link: r.link ?? '', tags: r.tags.join(', '), features: r.features.join('\n'), stack: r.stack.join(', '), gallery: r.gallery, image: r.image ?? '', kind: r.kind ?? '', status: r.status ?? '', visible: r.visible, position: r.position, changed: false })

  async function importPortfolio() {
    setImporting(true)
    try {
      const projects = await fetchProjects()
      const have = new Set(rows.map((r) => r.title.trim().toLowerCase()))
      let n = 0
      for (const pr of projects) {
        if (have.has(pr.name.trim().toLowerCase())) continue
        const img = pr.img && /^https:\/\//.test(pr.img) ? pr.img : ''
        await p.call('admin_realisation_save', { p_id: null, p_data: { title: pr.name, description: pr.description?.trim().length >= 5 ? pr.description.trim() : PLACEHOLDER, tags: pr.tags ?? [], image: img, kind: '', visible: false, position: pr.position ?? 0 } })
        n++
      }
      p.notify(n ? `${n} projet(s) importé(s) en brouillon : complétez-les puis publiez-les` : 'Rien de nouveau à importer')
      await load()
    } catch (e) { p.notify((e as Error).message) } finally { setImporting(false) }
  }

  async function importPrepared() {
    setImporting(true)
    try {
      const have = new Set(rows.map((r) => r.title.trim().toLowerCase()))
      let n = 0
      for (const d of PROJECT_DRAFTS) {
        if (have.has(d.title.trim().toLowerCase())) continue
        await p.call('admin_realisation_save', { p_id: null, p_data: { title: d.title, kind: d.kind, status: d.status, sector: d.sector, description: d.description, long_desc: d.long_desc, features: d.features, stack: d.stack, tags: d.tags, image: d.image ?? '', client: d.client ?? '', link: d.link ?? '', visible: false, position: n } })
        n++
      }
      p.notify(n ? `${n} présentation(s) préparée(s) ajoutée(s) en brouillon : vérifiez le type puis affichez-les` : 'Toutes les présentations préparées sont déjà là')
      await load()
    } catch (e) { p.notify((e as Error).message) } finally { setImporting(false) }
  }

  return (
    <div>
      <p className="text-xs text-muted mb-4">Chaque projet doit avoir un type clair (client, SaaS, application interne ou personnel) : il est affiché sur sa carte et sur sa page détaillée. Un projet masqué ou « à compléter » n'apparaît pas sur le site.</p>
      {!f && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button onClick={() => setF({ ...emptyReal })} className={`${btn} bg-gov text-white border-gov`}><Plus size={14} /> Nouveau projet</button>
          <button onClick={importPortfolio} disabled={importing} className={`${btn} border-stroke hover:bg-slate-900/5 disabled:opacity-50`}>{importing ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} Importer depuis le portfolio</button>
          <button onClick={importPrepared} disabled={importing} className={`${btn} border-stroke hover:bg-slate-900/5 disabled:opacity-50`}><Download size={14} /> Importer mes présentations préparées</button>
        </div>
      )}
      {f && (
        <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-5 grid sm:grid-cols-2 gap-3">
          <input className={`${input} sm:col-span-2`} placeholder="Nom du projet" maxLength={120} value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <select className={`${input} ${!f.kind ? 'border-amber-400' : ''}`} value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })}><option value="">Type de projet (obligatoire pour publier)…</option>{KINDS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <select className={input} value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}><option value="">Statut (facultatif)</option><option value="en_ligne">En ligne</option><option value="en_developpement">En développement</option><option value="prototype">Prototype</option></select>
          <input className={input} placeholder={f.kind === 'client' ? 'Nom du client (avec son accord)' : 'Client (facultatif)'} value={f.client} onChange={(e) => setF({ ...f, client: e.target.value })} />
          <input className={input} placeholder="Secteur, ex. Restauration (facultatif)" value={f.sector} onChange={(e) => setF({ ...f, sector: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={2} maxLength={800} placeholder="Résumé en 1 ou 2 phrases (affiché sur la carte)" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
          {draft && <p className="sm:col-span-2 text-xs text-amber-700">Ce projet vient du portfolio : remplacez « {PLACEHOLDER} » par un vrai résumé avant de le publier.</p>}
          <textarea className={`${input} sm:col-span-2`} rows={6} maxLength={4000} placeholder={'Description détaillée : à quoi sert le projet, pour qui, quel problème il résout, comment il a été fait. (Une ligne vide sépare les paragraphes.)'} value={f.long_desc} onChange={(e) => setF({ ...f, long_desc: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={4} placeholder="Fonctionnalités, une par ligne" value={f.features} onChange={(e) => setF({ ...f, features: e.target.value })} />
          <input className={input} placeholder="Technologies, séparées par des virgules (React, Supabase…)" value={f.stack} onChange={(e) => setF({ ...f, stack: e.target.value })} />
          <input className={input} placeholder="Étiquettes, séparées par des virgules" value={f.tags} onChange={(e) => setF({ ...f, tags: e.target.value })} />
          <input className={`${input} sm:col-span-2`} placeholder="Résultat obtenu (facultatif, uniquement s'il est réel)" maxLength={300} value={f.result} onChange={(e) => setF({ ...f, result: e.target.value })} />
          <input className={`${input} sm:col-span-2`} placeholder="Lien du projet https://… (facultatif)" value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} />
          <ImagePicker value={f.image || null} label="Image principale (capture, photo)" onPick={(d) => setF({ ...f, image: d, changed: true })} />
          <GalleryPicker value={f.gallery} onChange={(g) => setF({ ...f, gallery: g })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.visible} onChange={(e) => setF({ ...f, visible: e.target.checked })} /> Visible sur le site</label>
          <label className="flex items-center gap-2 text-sm">Ordre <input type="number" className={`${input} w-24`} value={f.position} onChange={(e) => setF({ ...f, position: Number(e.target.value) })} /></label>
          <div className="sm:col-span-2 flex gap-2"><button disabled={!ok} onClick={async () => { if (await save(f.id || null, payload(f), 'Projet enregistré')) setF(null) }} className={`${btn} bg-gov text-white border-gov disabled:opacity-40`}>Enregistrer</button><button onClick={() => setF(null)} className={`${btn} border-stroke`}>Annuler</button></div>
          {!ok && f.visible && <p className="sm:col-span-2 text-xs text-amber-700">Pour publier : choisissez le type du projet et rédigez le résumé. Sinon décochez « Visible sur le site » pour garder un brouillon.</p>}
        </div>
      )}
      {!loading && rows.length === 0 && <p className="text-muted text-sm">Aucun projet pour le moment. Importez ceux de votre portfolio ou ajoutez-en un.</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="border border-stroke rounded-md p-3 bg-white/70 flex flex-wrap gap-4 items-center">
            {r.image ? <img src={r.image} alt="" className="w-20 h-14 object-cover rounded-sm border border-stroke" /> : <span className="w-20 h-14 rounded-sm bg-surface border border-stroke" />}
            <div className="flex-1 min-w-[200px]">
              <div className="font-display text-base">{r.title}{!r.visible && <Hidden />}{r.description.trim() === PLACEHOLDER && <span className="text-[10px] bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 ml-1.5 font-semibold">À compléter</span>}</div>
              <div className="text-xs text-muted">{r.kind ? <b className="text-gov">{KIND_SHORT[r.kind]}</b> : <b className="text-amber-700">Type à choisir</b>}{[r.sector, r.client].filter(Boolean).map((x) => ` · ${x}`)}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => save(r.id, { ...payload(toForm(r)), visible: !r.visible }, r.visible ? 'Projet masqué' : 'Projet visible')} disabled={!r.visible && (!r.kind || r.description.trim() === PLACEHOLDER)} className={`${btn} border-stroke disabled:opacity-40`}>{r.visible ? <><EyeOff size={14} /> Masquer</> : <><Eye size={14} /> Afficher</>}</button>
              <button onClick={() => setF(toForm(r))} className={`${btn} border-stroke`}><Pencil size={14} /> {r.description.trim() === PLACEHOLDER || !r.kind ? 'Compléter' : 'Modifier'}</button>
              <button onClick={() => del(r.id, `Supprimer « ${r.title} » ?`)} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── FAQ ───────── */
interface FaqRow { id: string; question: string; answer: string; position: number; visible: boolean }
const emptyFaq = { id: '', question: '', answer: '', position: 0, visible: true }

export function FaqTab(p: TabProps) {
  const { rows, loading, save, del } = useCrud<FaqRow>('faq', p)
  const [f, setF] = useState<typeof emptyFaq | null>(null)
  return (
    <div>
      <p className="text-xs text-muted mb-4">Les questions s'affichent sur la page Tarifs et sur la page Contact, et aident aussi le référencement Google. Les plus petits numéros d'ordre apparaissent en premier.</p>
      {!f && <button onClick={() => setF({ ...emptyFaq, position: rows.length + 1 })} className={`${btn} bg-gov text-white border-gov mb-5`}><Plus size={14} /> Nouvelle question</button>}
      {f && (
        <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-5 grid gap-3">
          <input className={input} placeholder="Question" maxLength={200} value={f.question} onChange={(e) => setF({ ...f, question: e.target.value })} />
          <textarea className={input} rows={4} maxLength={1200} placeholder="Réponse" value={f.answer} onChange={(e) => setF({ ...f, answer: e.target.value })} />
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">Ordre <input type="number" className={`${input} w-24`} value={f.position} onChange={(e) => setF({ ...f, position: Number(e.target.value) })} /></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.visible} onChange={(e) => setF({ ...f, visible: e.target.checked })} /> Visible</label>
          </div>
          <div className="flex gap-2"><button disabled={f.question.trim().length < 5 || f.answer.trim().length < 5} onClick={async () => { if (await save(f.id || null, { question: f.question, answer: f.answer, position: Number(f.position) || 0, visible: f.visible }, 'Question enregistrée')) setF(null) }} className={`${btn} bg-gov text-white border-gov disabled:opacity-40`}>Enregistrer</button><button onClick={() => setF(null)} className={`${btn} border-stroke`}>Annuler</button></div>
        </div>
      )}
      {!loading && rows.length === 0 && <p className="text-muted text-sm">Aucune question. La section FAQ est masquée sur le site.</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="border border-stroke rounded-md p-4 bg-white/70 flex flex-wrap gap-3 justify-between">
            <div className="flex-1 min-w-[220px]">
              <div className="font-medium text-sm">{r.position}. {r.question}{!r.visible && <Hidden />}</div>
              <p className="text-xs text-muted mt-1">{r.answer}</p>
            </div>
            <div className="flex gap-2 items-start">
              <button onClick={() => setF({ id: r.id, question: r.question, answer: r.answer, position: r.position, visible: r.visible })} className={`${btn} border-stroke`}><Pencil size={14} /> Modifier</button>
              <button onClick={() => del(r.id, 'Supprimer cette question ?')} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Tarifs ───────── */
interface PlanRow { id: string; name: string; price: string; tagline: string | null; features: string[]; highlight: boolean; position: number; visible: boolean }
const emptyPlan = { id: '', name: '', price: '', tagline: '', features: '', highlight: false, position: 0, visible: true }

export function PlansTab(p: TabProps) {
  const { rows, loading, save, del } = useCrud<PlanRow>('plan', p)
  const [f, setF] = useState<typeof emptyPlan | null>(null)
  return (
    <div>
      <p className="text-xs text-muted mb-4">Ces formules s'affichent sur la page Tarifs. Modifier un prix ici le change aussitôt sur le site. Si vous supprimez toutes les formules, la page Tarifs reprend les formules d'origine.</p>
      {!f && <button onClick={() => setF({ ...emptyPlan, position: rows.length + 1 })} className={`${btn} bg-gov text-white border-gov mb-5`}><Plus size={14} /> Nouvelle formule</button>}
      {f && (
        <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-5 grid sm:grid-cols-2 gap-3">
          <input className={input} placeholder="Nom (ex. Starter)" maxLength={60} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={input} placeholder="Prix affiché (ex. 20 000 FCFA)" maxLength={80} value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} />
          <input className={`${input} sm:col-span-2`} placeholder="Phrase d'accroche" maxLength={120} value={f.tagline} onChange={(e) => setF({ ...f, tagline: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={5} placeholder="Ce qui est inclus, un point par ligne" value={f.features} onChange={(e) => setF({ ...f, features: e.target.value })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.highlight} onChange={(e) => setF({ ...f, highlight: e.target.checked })} /> Mettre en avant (« Populaire »)</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.visible} onChange={(e) => setF({ ...f, visible: e.target.checked })} /> Visible</label>
          <label className="flex items-center gap-2 text-sm">Ordre <input type="number" className={`${input} w-24`} value={f.position} onChange={(e) => setF({ ...f, position: Number(e.target.value) })} /></label>
          <div className="sm:col-span-2 flex gap-2"><button disabled={f.name.trim().length < 2 || !f.price.trim()} onClick={async () => { if (await save(f.id || null, { name: f.name, price: f.price, tagline: f.tagline, features: lines(f.features), highlight: f.highlight, position: Number(f.position) || 0, visible: f.visible }, 'Formule enregistrée')) setF(null) }} className={`${btn} bg-gov text-white border-gov disabled:opacity-40`}>Enregistrer</button><button onClick={() => setF(null)} className={`${btn} border-stroke`}>Annuler</button></div>
        </div>
      )}
      {!loading && rows.length === 0 && <p className="text-muted text-sm">Aucune formule enregistrée.</p>}
      <div className="grid sm:grid-cols-3 gap-3">
        {rows.map((r) => (
          <div key={r.id} className={`border rounded-md p-4 bg-white/70 ${r.highlight ? 'border-clay' : 'border-stroke'}`}>
            <div className="font-display text-lg">{r.name}{!r.visible && <Hidden />}</div>
            <div className="text-sm text-clay font-semibold">{r.price}</div>
            <ul className="text-xs text-muted mt-2 space-y-1 list-disc pl-4">{r.features.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setF({ id: r.id, name: r.name, price: r.price, tagline: r.tagline ?? '', features: r.features.join('\n'), highlight: r.highlight, position: r.position, visible: r.visible })} className={`${btn} border-stroke`}><Pencil size={14} /> Modifier</button>
              <button onClick={() => del(r.id, `Supprimer la formule ${r.name} ?`)} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Statistiques ───────── */
interface Stats { views: number; whatsapp: number; contacts: number; quotes: number; top_pages: { label: string; n: number }[]; wa_pages: { label: string; n: number }[]; daily: { d: string; v: number; w: number }[] }

export function StatsTab({ call, notify }: TabProps) {
  const [days, setDays] = useState(30)
  const [s, setS] = useState<Stats | null>(null)
  useEffect(() => { setS(null); call<Stats>('admin_stats', { p_days: days }).then(setS).catch((e) => notify((e as Error).message)) }, [call, notify, days])
  const max = Math.max(1, ...(s?.daily.map((d) => d.v) ?? [1]))
  const tiles: [string, number | undefined][] = [['Pages vues', s?.views], ['Clics WhatsApp', s?.whatsapp], ['Messages', s?.contacts], ['Demandes de devis', s?.quotes]]
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <p className="text-xs text-muted max-w-md">Statistiques anonymes du site : aucune donnée personnelle n'est enregistrée sur les visiteurs.</p>
        <div className="flex gap-2">{[7, 30, 90].map((d) => <button key={d} onClick={() => setDays(d)} className={`${btn} ${days === d ? 'bg-gov text-white border-gov' : 'border-stroke'}`}>{d} jours</button>)}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {tiles.map(([l, n]) => (
          <div key={l} className="border border-stroke rounded-md p-4 bg-white/70">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted">{l}</div>
            <div className="font-display text-3xl mt-1">{n ?? '…'}</div>
          </div>
        ))}
      </div>
      <div className="border border-stroke rounded-md p-4 bg-white/70 mb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">Pages vues par jour</div>
        {s && s.daily.length === 0 ? <p className="text-sm text-muted">Pas encore de données.</p> : (
          <div className="flex items-end gap-1 h-32" role="img" aria-label="Pages vues par jour">
            {s?.daily.map((d) => <div key={d.d} title={`${d.d} : ${d.v} pages vues, ${d.w} clics WhatsApp`} className="flex-1 min-w-[3px] bg-gov/80 rounded-t-sm" style={{ height: `${Math.max(4, (d.v / max) * 100)}%` }} />)}
          </div>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {([['Pages les plus vues', s?.top_pages], ['Clics WhatsApp par page', s?.wa_pages]] as const).map(([t, list]) => (
          <div key={t} className="border border-stroke rounded-md p-4 bg-white/70">
            <div className="text-xs font-mono uppercase tracking-widest text-muted mb-3">{t}</div>
            {list && list.length === 0 && <p className="text-sm text-muted">Pas encore de données.</p>}
            <ul className="space-y-1.5 text-sm">{list?.map((x) => <li key={x.label} className="flex justify-between gap-3"><span className="truncate">{x.label}</span><b>{x.n}</b></li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}
