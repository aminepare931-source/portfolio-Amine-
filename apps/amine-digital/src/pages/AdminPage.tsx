import { useCallback, useEffect, useState } from 'react'
import { Users, Inbox, Star, Settings as Cog, Lock, Check, X, Trash2, Pencil, Copy, RefreshCw, LogOut, EyeOff, User, Plus, Image as ImageIcon, Briefcase, ClipboardList, HelpCircle, Tag, BarChart3 } from 'lucide-react'
import { rpc } from '../lib/supabase'
import { input, btn, type Call, type TabProps } from './adminUi'
import { ApplicationsTab } from './AdminApplications'
import { PublicationsTab, RealisationsTab, FaqTab, PlansTab, StatsTab } from './AdminContent'

const KEY = 'ad_admin_pw'
type Tab = 'team' | 'apps' | 'leads' | 'publications' | 'realisations' | 'faq' | 'plans' | 'stats' | 'reviews' | 'settings' | 'security'

interface TeamRow { id: string; name: string; role: string; grp: 'Associés' | 'Collaborateurs'; bio: string | null; photo: string | null; status: 'pending' | 'approved' | 'hidden' }
interface Lead { id: string; kind?: string; name: string; email: string | null; phone: string | null; message: string; handled: boolean; created_at: string }
interface Review { id: string; name: string; role: string | null; service: string | null; date_label: string | null; text: string; visible: boolean }

const fmt = (d: string) => new Date(d).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })

export default function AdminPage() {
  const [pw, setPw] = useState(() => { try { return sessionStorage.getItem(KEY) ?? '' } catch { return '' } })
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('team')
  const [counts, setCounts] = useState({ pending: 0, leads: 0, apps: 0 })
  const [toast, setToast] = useState('')

  useEffect(() => {
    document.title = 'Administration — AMINE DIGITAL'
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'
    document.head.appendChild(m)
    return () => m.remove()
  }, [])

  const notify = useCallback((t: string) => { setToast(t); setTimeout(() => setToast(''), 3000) }, [])
  const call = useCallback(<T,>(fn: string, args: Record<string, unknown> = {}) => rpc<T>(fn, { p_pass: pw, ...args }), [pw])

  useEffect(() => { if (pw) call('admin_login').then(() => setAuthed(true)).catch(() => { setAuthed(false); try { sessionStorage.removeItem(KEY) } catch { /* */ } }) }, []) // eslint-disable-line

  const refreshCounts = useCallback(async () => {
    try {
      const [t, l] = await Promise.all([call<TeamRow[]>('admin_team_list'), call<Lead[]>('admin_leads_list')])
      let apps = 0
      try { apps = (await call<{ status: string }[]>('admin_application_list')).filter((x) => x.status === 'nouvelle').length } catch { /* script SQL pas encore exécuté */ }
      setCounts({ pending: t.filter((x) => x.status === 'pending').length, leads: l.filter((x) => !x.handled).length, apps })
    } catch { /* */ }
  }, [call])
  useEffect(() => { if (authed) refreshCounts() }, [authed, refreshCounts, tab])

  if (!authed) return <Login onOk={(p) => { try { sessionStorage.setItem(KEY, p) } catch { /* */ } setPw(p); setAuthed(true) }} />

  const tabs: { id: Tab; label: string; icon: typeof Users; n?: number }[] = [
    { id: 'team', label: 'Équipe', icon: Users, n: counts.pending },
    { id: 'apps', label: 'Candidatures', icon: ClipboardList, n: counts.apps },
    { id: 'leads', label: 'Demandes', icon: Inbox, n: counts.leads },
    { id: 'publications', label: 'Publications', icon: ImageIcon },
    { id: 'realisations', label: 'Réalisations', icon: Briefcase },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'plans', label: 'Tarifs', icon: Tag },
    { id: 'reviews', label: 'Avis clients', icon: Star },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'settings', label: 'Coordonnées', icon: Cog },
    { id: 'security', label: 'Sécurité', icon: Lock },
  ]

  return (
    <div className="px-4 sm:px-6 pt-32 pb-24 max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-clay mb-1">Administration</div>
          <h1 className="font-display text-3xl">AMINE DIGITAL</h1>
        </div>
        <button onClick={() => { try { sessionStorage.removeItem(KEY) } catch { /* */ } setPw(''); setAuthed(false) }} className={`${btn} border-stroke hover:bg-slate-900/5`}><LogOut size={14} /> Déconnexion</button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`${btn} ${tab === t.id ? 'bg-gov text-white border-gov' : 'border-stroke hover:border-gov/50'}`}>
            <t.icon size={14} /> {t.label}
            {!!t.n && <span className="ml-1 rounded-full bg-red-600 text-white px-1.5 text-[10px]">{t.n}</span>}
          </button>
        ))}
      </div>

      {tab === 'team' && <TeamTab call={call} notify={notify} onChange={refreshCounts} />}
      {tab === 'apps' && <ApplicationsTab call={call} notify={notify} onChange={refreshCounts} />}
      {tab === 'leads' && <LeadsTab call={call} notify={notify} onChange={refreshCounts} />}
      {tab === 'publications' && <PublicationsTab call={call} notify={notify} />}
      {tab === 'realisations' && <RealisationsTab call={call} notify={notify} />}
      {tab === 'faq' && <FaqTab call={call} notify={notify} />}
      {tab === 'plans' && <PlansTab call={call} notify={notify} />}
      {tab === 'stats' && <StatsTab call={call} notify={notify} />}
      {tab === 'reviews' && <ReviewsTab call={call} notify={notify} />}
      {tab === 'settings' && <SettingsTab call={call} notify={notify} />}
      {tab === 'security' && <SecurityTab call={call} notify={notify} onNewPw={(p) => { try { sessionStorage.setItem(KEY, p) } catch { /* */ } setPw(p) }} />}

      {toast && <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-sm shadow-lg">{toast}</div>}
    </div>
  )
}


function Login({ onOk }: { onOk: (p: string) => void }) {
  const [p, setP] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  async function go(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr('')
    try { await rpc('admin_login', { p_pass: p }); onOk(p) } catch (x) { setErr((x as Error).message) } finally { setBusy(false) }
  }
  return (
    <div className="px-6 pt-40 pb-24 max-w-[380px] mx-auto">
      <div className="text-xs font-mono uppercase tracking-widest text-clay mb-2">Administration</div>
      <h1 className="font-display text-3xl mb-6">AMINE DIGITAL</h1>
      <form onSubmit={go} className="space-y-4">
        <input type="password" autoFocus value={p} onChange={(e) => setP(e.target.value)} placeholder="Mot de passe" className={input} />
        {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
        <button disabled={!p || busy} className="w-full bg-clay text-white font-semibold py-3 rounded-sm disabled:opacity-40">{busy ? 'Vérification…' : 'Accéder'}</button>
      </form>
    </div>
  )
}

/* ───────── Équipe ───────── */
function TeamTab({ call, notify, onChange }: TabProps) {
  const [rows, setRows] = useState<TeamRow[]>([])
  const [code, setCode] = useState('')
  const [edit, setEdit] = useState<TeamRow | null>(null)
  const load = useCallback(async () => {
    try { setRows(await call<TeamRow[]>('admin_team_list')); setCode(await call<string>('admin_invite_get')) } catch (e) { notify((e as Error).message) }
  }, [call, notify])
  useEffect(() => { load() }, [load])

  const link = `${location.origin}/equipe/rejoindre?code=${code}`
  const save = async (r: TeamRow, status: TeamRow['status']) => {
    try { await call('admin_team_update', { p_id: r.id, p_status: status, p_name: r.name, p_role: r.role, p_grp: r.grp, p_bio: r.bio ?? '' }); notify(status === 'approved' ? 'Fiche publiée sur le site' : status === 'hidden' ? 'Fiche masquée' : 'Fiche mise à jour'); setEdit(null); await load(); onChange?.() } catch (e) { notify((e as Error).message) }
  }
  const del = async (r: TeamRow) => { if (!confirm(`Supprimer définitivement ${r.name} ?`)) return; try { await call('admin_team_delete', { p_id: r.id }); notify('Fiche supprimée'); await load(); onChange?.() } catch (e) { notify((e as Error).message) } }
  const rotate = async () => { if (!confirm("Générer un nouveau lien ? L'ancien ne fonctionnera plus.")) return; try { setCode(await call<string>('admin_invite_rotate')); notify('Nouveau lien généré') } catch (e) { notify((e as Error).message) } }

  const label = { pending: 'En attente', approved: 'Publiée', hidden: 'Masquée' }
  const tone = { pending: 'bg-amber-100 text-amber-800', approved: 'bg-green-100 text-green-800', hidden: 'bg-slate-200 text-slate-700' }

  return (
    <div>
      <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Fiche publique : lien pour les membres déjà acceptés (nom, rôle, photo sur le site)</div>
        <p className="text-xs text-amber-700 mb-3">Pour recruter un nouveau candidat, n'utilise pas ce lien : va dans l'onglet « Candidatures » et copie le lien du formulaire détaillé.</p>
        <div className="flex flex-wrap gap-2 items-center">
          <input readOnly value={code ? link : '…'} onFocus={(e) => e.currentTarget.select()} className={`${input} flex-1 min-w-[240px] font-mono text-xs`} />
          <button onClick={() => { navigator.clipboard?.writeText(link); notify('Lien copié') }} className={`${btn} border-stroke hover:bg-slate-900/5`}><Copy size={14} /> Copier</button>
          <button onClick={rotate} className={`${btn} border-stroke hover:bg-slate-900/5`}><RefreshCw size={14} /> Nouveau lien</button>
        </div>
        <p className="text-xs text-muted mt-2">Les fiches envoyées arrivent « en attente » : elles n'apparaissent sur le site qu'après votre validation.</p>
      </div>

      {rows.length === 0 && <p className="text-muted text-sm">Aucune fiche pour le moment.</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="border border-stroke rounded-md p-4 bg-white/70">
            {edit?.id === r.id ? (
              <div className="grid sm:grid-cols-2 gap-3">
                <input className={input} value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="Nom" />
                <input className={input} value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })} placeholder="Rôle" />
                <select className={input} value={edit.grp} onChange={(e) => setEdit({ ...edit, grp: e.target.value as TeamRow['grp'] })}><option>Associés</option><option>Collaborateurs</option></select>
                <input className={input} value={edit.bio ?? ''} onChange={(e) => setEdit({ ...edit, bio: e.target.value })} placeholder="Présentation" maxLength={240} />
                <div className="sm:col-span-2 flex gap-2"><button onClick={() => save(edit, r.status)} className={`${btn} bg-gov text-white border-gov`}>Enregistrer</button><button onClick={() => setEdit(null)} className={`${btn} border-stroke`}>Annuler</button></div>
              </div>
            ) : (
              <div className="flex flex-wrap items-start gap-4">
                {r.photo ? <img src={r.photo} alt="" className="w-16 h-16 rounded-full object-cover border border-stroke" /> : <span className="w-16 h-16 rounded-full bg-clay/10 text-clay flex items-center justify-center"><User size={22} /></span>}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 flex-wrap"><span className="font-display text-base">{r.name}</span><span className={`text-[10px] rounded-full px-2 py-0.5 font-semibold ${tone[r.status]}`}>{label[r.status]}</span></div>
                  <div className="text-xs text-clay font-mono uppercase mt-0.5">{r.role} · {r.grp}</div>
                  {r.bio && <p className="text-xs text-muted mt-1.5">{r.bio}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.status !== 'approved' && <button onClick={() => save(r, 'approved')} className={`${btn} bg-green-600 text-white border-green-600`}><Check size={14} /> {r.status === 'pending' ? 'Valider' : 'Republier'}</button>}
                  {r.status === 'pending' && <button onClick={() => save(r, 'hidden')} className={`${btn} border-stroke`}><X size={14} /> Refuser</button>}
                  {r.status === 'approved' && <button onClick={() => save(r, 'hidden')} className={`${btn} border-stroke`}><EyeOff size={14} /> Masquer</button>}
                  <button onClick={() => setEdit(r)} className={`${btn} border-stroke`}><Pencil size={14} /> Modifier</button>
                  <button onClick={() => del(r)} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Demandes ───────── */
function LeadsTab({ call, notify, onChange }: TabProps) {
  const [rows, setRows] = useState<Lead[]>([])
  const load = useCallback(async () => { try { setRows(await call<Lead[]>('admin_leads_list')) } catch (e) { notify((e as Error).message) } }, [call, notify])
  useEffect(() => { load() }, [load])
  const set = async (l: Lead, h: boolean) => { try { await call('admin_lead_set', { p_id: l.id, p_handled: h }); await load(); onChange?.() } catch (e) { notify((e as Error).message) } }
  const del = async (l: Lead) => { if (!confirm('Supprimer cette demande ?')) return; try { await call('admin_lead_delete', { p_id: l.id }); await load(); onChange?.() } catch (e) { notify((e as Error).message) } }
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">Messages du formulaire Contact et demandes de devis (page Devis).</p>
      {rows.length === 0 && <p className="text-muted text-sm">Aucune demande pour le moment.</p>}
      {rows.map((l) => (
        <div key={l.id} className={`border rounded-md p-4 ${l.handled ? 'border-stroke bg-white/40 opacity-70' : 'border-gov/40 bg-white/80'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div><span className="font-display text-base">{l.name}</span> {l.kind === 'devis' && <span className="text-[10px] bg-gov/10 text-gov rounded-full px-2 py-0.5 ml-1 font-semibold">Devis</span>} <span className="text-xs text-muted ml-2">{fmt(l.created_at)}</span></div>
            <div className="flex gap-2">
              {l.phone && <a className={`${btn} border-stroke`} href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a>}
              {l.email && <a className={`${btn} border-stroke`} href={`mailto:${l.email}`}>E-mail</a>}
              <button onClick={() => set(l, !l.handled)} className={`${btn} ${l.handled ? 'border-stroke' : 'bg-green-600 text-white border-green-600'}`}><Check size={14} /> {l.handled ? 'Rouvrir' : 'Traitée'}</button>
              <button onClick={() => del(l)} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
            </div>
          </div>
          <div className="text-xs text-muted mb-2">{[l.email, l.phone].filter(Boolean).join(' · ')}</div>
          <p className="text-sm whitespace-pre-wrap">{l.message}</p>
        </div>
      ))}
    </div>
  )
}

/* ───────── Avis ───────── */
const emptyReview = { id: '', name: '', role: '', service: '', date_label: '', text: '', visible: true }
function ReviewsTab({ call, notify }: TabProps) {
  const [rows, setRows] = useState<Review[]>([])
  const [f, setF] = useState<typeof emptyReview | null>(null)
  const load = useCallback(async () => { try { setRows(await call<Review[]>('admin_review_list')) } catch (e) { notify((e as Error).message) } }, [call, notify])
  useEffect(() => { load() }, [load])
  const save = async (v: typeof emptyReview) => {
    try { await call('admin_review_save', { p_id: v.id || null, p_name: v.name, p_role: v.role, p_service: v.service, p_date: v.date_label, p_text: v.text, p_visible: v.visible }); notify('Avis enregistré'); setF(null); await load() } catch (e) { notify((e as Error).message) }
  }
  const del = async (r: Review) => { if (!confirm('Supprimer cet avis ?')) return; try { await call('admin_review_delete', { p_id: r.id }); await load() } catch (e) { notify((e as Error).message) } }
  return (
    <div>
      <p className="text-xs text-muted mb-4">Ajoutez ici les vrais avis reçus (WhatsApp, Facebook…), avec l'accord du client. Le texte doit rester celui du client.</p>
      {!f && <button onClick={() => setF({ ...emptyReview })} className={`${btn} bg-gov text-white border-gov mb-5`}><Plus size={14} /> Ajouter un avis</button>}
      {f && (
        <div className="border border-stroke rounded-md p-4 bg-surface/40 mb-5 grid sm:grid-cols-2 gap-3">
          <input className={input} placeholder="Prénom Nom (ou prénom + initiale)" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={input} placeholder="Activité / ville (facultatif)" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
          <input className={input} placeholder="Service concerné (facultatif)" value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })} />
          <input className={input} placeholder="Date, ex. octobre 2026 (facultatif)" value={f.date_label} onChange={(e) => setF({ ...f, date_label: e.target.value })} />
          <textarea className={`${input} sm:col-span-2`} rows={4} maxLength={800} placeholder="Avis du client, tel qu'il l'a écrit" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} />
          <label className="sm:col-span-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={f.visible} onChange={(e) => setF({ ...f, visible: e.target.checked })} /> Visible sur le site</label>
          <div className="sm:col-span-2 flex gap-2"><button disabled={f.name.trim().length < 2 || f.text.trim().length < 5} onClick={() => save(f)} className={`${btn} bg-gov text-white border-gov disabled:opacity-40`}>Enregistrer</button><button onClick={() => setF(null)} className={`${btn} border-stroke`}>Annuler</button></div>
        </div>
      )}
      {rows.length === 0 && <p className="text-muted text-sm">Aucun avis pour le moment.</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="border border-stroke rounded-md p-4 bg-white/70 flex flex-wrap gap-3 justify-between">
            <div className="flex-1 min-w-[220px]">
              <div className="font-display text-base">{r.name} {!r.visible && <span className="text-[10px] bg-slate-200 rounded-full px-2 py-0.5 ml-1">Masqué</span>}</div>
              <div className="text-xs text-muted">{[r.role, r.service, r.date_label].filter(Boolean).join(' · ')}</div>
              <p className="text-sm mt-2">« {r.text} »</p>
            </div>
            <div className="flex gap-2 items-start">
              <button onClick={() => setF({ id: r.id, name: r.name, role: r.role ?? '', service: r.service ?? '', date_label: r.date_label ?? '', text: r.text, visible: r.visible })} className={`${btn} border-stroke`}><Pencil size={14} /> Modifier</button>
              <button onClick={() => del(r)} className={`${btn} border-red-200 text-red-700`}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Coordonnées ───────── */
const FIELDS: [string, string, string][] = [
  ['whatsapp', 'Numéro WhatsApp (chiffres seulement, avec l\'indicatif)', '22654412618'],
  ['phone', 'Téléphone affiché', '+226 54 41 26 18'],
  ['email', 'E-mail', 'digitalamine3@gmail.com'],
  ['address', 'Adresse / ville', 'Bobo-Dioulasso, Burkina Faso'],
  ['facebook', 'Facebook (lien)', 'https://facebook.com/…'],
  ['tiktok', 'TikTok (lien)', 'https://tiktok.com/@…'],
  ['instagram', 'Instagram (lien)', 'https://instagram.com/…'],
  ['linkedin', 'LinkedIn (lien)', 'https://linkedin.com/…'],
]
function SettingsTab({ notify }: TabProps) {
  const [v, setV] = useState<Record<string, string>>({})
  return <SettingsForm v={v} setV={setV} notify={notify} />
}
function SettingsForm({ v, setV, notify }: { v: Record<string, string>; setV: (x: Record<string, string>) => void; notify: (t: string) => void }) {
  const pw = (() => { try { return sessionStorage.getItem(KEY) ?? '' } catch { return '' } })()
  useEffect(() => {
    import('../lib/supabase').then(async (m) => { const row = await m.fetchSettings(); const o: Record<string, string> = {}; FIELDS.forEach(([k, , ph]) => { o[k] = (row?.[k] as string) ?? (['whatsapp', 'phone', 'email', 'address'].includes(k) ? ph : '') }); setV(o) })
  }, []) // eslint-disable-line
  const save = async () => { try { await rpc('admin_settings_save', { p_pass: pw, p_data: v }); notify('Coordonnées enregistrées — visibles sur tout le site') } catch (e) { notify((e as Error).message) } }
  return (
    <div className="max-w-[640px]">
      <p className="text-xs text-muted mb-4">Ces informations remplacent automatiquement les numéros, e-mails et liens affichés sur tout le site (menu, pied de page, boutons WhatsApp, contact).</p>
      <div className="space-y-3">
        {FIELDS.map(([k, l, ph]) => (
          <label key={k} className="block text-sm font-medium">{l}
            <input className={`${input} mt-1`} value={v[k] ?? ''} placeholder={ph} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
          </label>
        ))}
      </div>
      <button onClick={save} className={`${btn} bg-gov text-white border-gov mt-5`}>Enregistrer</button>
    </div>
  )
}

/* ───────── Sécurité ───────── */
function SecurityTab({ call, notify, onNewPw }: TabProps & { onNewPw: (p: string) => void }) {
  const [n, setN] = useState('')
  const go = async () => { try { await call('admin_change_password', { p_new: n }); onNewPw(n); setN(''); notify('Mot de passe modifié') } catch (e) { notify((e as Error).message) } }
  return (
    <div className="max-w-[420px]">
      <h2 className="font-display text-xl mb-3">Changer le mot de passe</h2>
      <input type="password" className={input} placeholder="Nouveau mot de passe (10 caractères minimum)" value={n} onChange={(e) => setN(e.target.value)} />
      <button disabled={n.length < 10} onClick={go} className={`${btn} bg-gov text-white border-gov mt-3 disabled:opacity-40`}>Modifier</button>
      <p className="text-xs text-muted mt-4">Le mot de passe est vérifié par la base de données (jamais écrit dans le code du site). Pour couper l'accès à un lien d'invitation, utilisez « Nouveau lien » dans l'onglet Équipe.</p>
    </div>
  )
}
