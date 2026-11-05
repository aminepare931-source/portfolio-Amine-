import { useCallback, useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Copy, Trash2, MessageCircle, Mail, ExternalLink } from 'lucide-react'
import { input, btn, type TabProps } from './adminUi'
import { APPLICATION_SECTIONS, flags } from '../data/applicationForm'
import { STORAGE_PUBLIC, type UploadedFile } from '../lib/supabase'

export interface Application { id: string; name: string; phone: string | null; email: string | null; role: string | null; status: string; note: string | null; data: Record<string, unknown>; created_at: string }

const STATUS: [string, string, string][] = [
  ['nouvelle', 'Nouvelle', 'bg-blue-100 text-blue-800'],
  ['a_contacter', 'À contacter', 'bg-amber-100 text-amber-800'],
  ['entretien', 'Entretien / test', 'bg-purple-100 text-purple-800'],
  ['accepte', 'Acceptée', 'bg-green-100 text-green-800'],
  ['refuse', 'Refusée', 'bg-slate-200 text-slate-700'],
]
const safeUrl = (u: string) => /^https?:\/\//i.test(u)
const fmt = (d: string) => new Date(d).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })

export function ApplicationsTab({ call, notify, onChange }: TabProps) {
  const [rows, setRows] = useState<Application[]>([])
  const [code, setCode] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const [r, c] = await Promise.all([call<Application[]>('admin_application_list'), call<string>('admin_invite_get')])
      setRows(r); setCode(c)
    } catch (e) { notify((e as Error).message) } finally { setLoading(false) }
  }, [call, notify])
  useEffect(() => { load() }, [load])

  const link = `${location.origin}/equipe/candidature?code=${code}`
  const update = async (a: Application, status: string) => {
    try { await call('admin_application_update', { p_id: a.id, p_status: status, p_note: notes[a.id] ?? a.note ?? '' }); notify('Dossier mis à jour'); await load(); onChange?.() } catch (e) { notify((e as Error).message) }
  }
  const del = async (a: Application) => {
    if (!confirm(`Supprimer définitivement le dossier de ${a.name} ?`)) return
    try { await call('admin_application_delete', { p_id: a.id }); notify('Dossier supprimé'); await load(); onChange?.() } catch (e) { notify((e as Error).message) }
  }

  const shown = rows.filter((r) => filter === 'all' || r.status === filter)
  const wa = (p: string) => `https://wa.me/${p.replace(/[^\d]/g, '')}`

  return (
    <div>
      <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-6 space-y-4">
        <p className="text-xs text-muted">Choisis le bon lien selon la personne. Les réponses sont privées : elles n'apparaissent jamais sur le site. Si un lien circule trop, change le code dans l'onglet Équipe (« nouveau lien »).</p>
        {[
          ['Candidat que tu ne connais pas : dossier complet', link, 'Toutes les questions : expérience, preuves, IA, mises en situation (facultatives).'],
          ['Personne que tu connais déjà : dossier court', `${link}&type=connu`, 'Environ 5 minutes : contact, poste, niveau en IA et engagements. Sans questionnaire pesant.'],
        ].map(([t, l, d]) => (
          <div key={t}>
            <div className="text-xs font-mono uppercase tracking-widest text-clay mb-1">{t}</div>
            <p className="text-xs text-muted mb-2">{d}</p>
            <div className="flex flex-wrap gap-2">
              <input readOnly value={code ? l : '…'} className={`${input} flex-1 min-w-[240px] font-mono text-xs`} onFocus={(e) => e.target.select()} />
              <button disabled={!code} onClick={() => { navigator.clipboard?.writeText(l); notify('Lien copié') }} className={`${btn} bg-gov text-white border-gov disabled:opacity-40`}><Copy size={14} /> Copier</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {[['all', 'Toutes'], ...STATUS.map(([k, l]) => [k, l])].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={`${btn} ${filter === k ? 'bg-gov text-white border-gov' : 'border-stroke hover:border-gov/50'}`}>
            {l} <span className="opacity-70">{k === 'all' ? rows.length : rows.filter((r) => r.status === k).length}</span>
          </button>
        ))}
      </div>

      {!loading && shown.length === 0 && <p className="text-muted text-sm">Aucune candidature pour l'instant.</p>}
      <div className="space-y-3">
        {shown.map((a) => {
          const fl = flags(a.data)
          const st = STATUS.find((s) => s[0] === a.status) ?? STATUS[0]
          const isOpen = open === a.id
          return (
            <div key={a.id} className="border border-stroke rounded-md bg-white/70">
              <button onClick={() => setOpen(isOpen ? null : a.id)} className="w-full text-left p-4 flex flex-wrap gap-3 items-center">
                <div className="flex-1 min-w-[200px]">
                  <div className="font-display text-base">{a.name}<span className={`text-[10px] rounded-full px-2 py-0.5 ml-2 font-semibold ${st[2]}`}>{st[1]}</span>{a.data.mode === 'court' && <span className="text-[10px] rounded-full px-2 py-0.5 ml-1.5 font-semibold bg-teal-100 text-teal-800">Dossier court</span>}</div>
                  <div className="text-xs text-clay font-mono uppercase">{a.role}{a.data.level ? ` · ${String(a.data.level).split(' (')[0]}` : ''}{a.data.years ? ` · ${a.data.years}` : ''}</div>
                  <div className="text-xs text-muted mt-0.5">{fmt(a.created_at)}</div>
                </div>
                <div className="flex flex-wrap gap-1.5 max-w-[360px]">
                  {fl.good.map((g) => <span key={g} className="text-[10px] bg-green-50 text-green-800 border border-green-200 rounded-full px-2 py-0.5">{g}</span>)}
                  {fl.warn.map((w) => <span key={w} className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5">{w}</span>)}
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isOpen && (
                <div className="border-t border-stroke p-4 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {a.phone && <a href={wa(a.phone)} target="_blank" rel="noreferrer" className={`${btn} border-stroke`}><MessageCircle size={14} /> WhatsApp {a.phone}</a>}
                    {a.email && <a href={`mailto:${a.email}`} className={`${btn} border-stroke`}><Mail size={14} /> {a.email}</a>}
                  </div>

                  {APPLICATION_SECTIONS.filter((s) => s.id !== 'engagements').map((s) => {
                    const items = s.fields.filter((f) => f.type !== 'check' && a.data[f.key])
                    if (!items.length) return null
                    return (
                      <div key={s.id}>
                        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-2">{s.title}</div>
                        <dl className="space-y-2.5">
                          {items.map((f) => {
                            const val = String(a.data[f.key])
                            return (
                              <div key={f.key}>
                                <dt className="text-xs text-muted">{f.label}</dt>
                                <dd className="text-sm whitespace-pre-wrap break-words">
                                  {f.type === 'url' && safeUrl(val) ? <a href={val} target="_blank" rel="noreferrer noopener" className="text-gov underline inline-flex items-center gap-1">{val}<ExternalLink size={12} /></a> : val}
                                </dd>
                              </div>
                            )
                          })}
                        </dl>
                      </div>
                    )
                  })}

                  {Array.isArray(a.data.files) && a.data.files.length > 0 && (
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-clay mb-2">Fichiers envoyés</div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {(a.data.files as UploadedFile[]).filter((f) => typeof f.url === 'string' && f.url.startsWith(STORAGE_PUBLIC)).map((f) => (
                          <div key={f.url} className="border border-stroke rounded-sm p-2 bg-white">
                            {f.type?.startsWith('image/') ? <a href={f.url} target="_blank" rel="noreferrer noopener"><img src={f.url} alt={f.name} className="block max-w-full h-auto max-h-64 mx-auto" /></a>
                              : f.type?.startsWith('video/') ? <video src={f.url} controls preload="metadata" className="block max-w-full max-h-64 mx-auto" />
                              : f.type?.startsWith('audio/') ? <audio src={f.url} controls className="w-full" /> : null}
                            <a href={f.url} target="_blank" rel="noreferrer noopener" className="text-xs text-gov underline inline-flex items-center gap-1 mt-1.5 break-all">{f.name}<ExternalLink size={12} /></a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-clay mb-2">Ta décision</div>
                    <textarea rows={3} maxLength={2000} className={input} placeholder="Notes privées : impressions, résultat du test, questions à poser à l'entretien…" value={notes[a.id] ?? a.note ?? ''} onChange={(e) => setNotes({ ...notes, [a.id]: e.target.value })} />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {STATUS.map(([k, l]) => <button key={k} onClick={() => update(a, k)} className={`${btn} ${a.status === k ? 'bg-gov text-white border-gov' : 'border-stroke hover:border-gov/50'}`}>{l}</button>)}
                      <button onClick={() => del(a)} className={`${btn} border-red-200 text-red-700 ml-auto`}><Trash2 size={14} /> Supprimer</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
