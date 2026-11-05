export const SB_URL = 'https://ytpghkntnuuppmreeboo.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGdoa250bnV1cHBtcmVlYm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTY5NzEsImV4cCI6MjA5Nzc5Mjk3MX0.D4i-P18kRs0_nsMX5Kk8EYdnTV-ZIxDVfI_OvoAmE4E'

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  img: string | null
  color: string
  emoji: string | null
  position: number
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/projects?select=*&order=position.asc,created_at.asc`, {
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
      },
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export interface TeamRow {
  name: string
  role: string
  grp: 'Associés' | 'Collaborateurs'
  bio: string | null
  photo: string | null
}

export async function fetchTeam(): Promise<TeamRow[]> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/team_members?select=name,role,grp,bio,photo&order=created_at.asc`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    })
    return res.ok ? await res.json() : []
  } catch {
    return []
  }
}

export async function submitTeamMember(m: { code: string; name: string; role: string; grp: string; bio: string; photo: string | null }): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/submit_team_member`, {
      method: 'POST',
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_code: m.code, p_name: m.name, p_role: m.role, p_grp: m.grp, p_bio: m.bio, p_photo: m.photo }),
    })
    if (res.ok) return { ok: true }
    const txt = await res.text()
    if (txt.includes('invitation invalide')) return { ok: false, error: "Ce lien d'invitation n'est plus valide. Demande un nouveau lien à AMINE DIGITAL." }
    if (txt.includes('team_members') && txt.includes('does not exist')) return { ok: false, error: "Le service n'est pas encore activé. Préviens AMINE DIGITAL." }
    return { ok: false, error: "L'envoi a échoué. Vérifie les champs et réessaie." }
  } catch {
    return { ok: false, error: 'Connexion impossible. Vérifie ta connexion Internet et réessaie.' }
  }
}

/** Appel d'une fonction Supabase (RPC). Renvoie les données ou lève une erreur lisible. */
export async function rpc<T = unknown>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const send = () => fetch(`${SB_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  let res: Response
  try {
    try { res = await send() } catch { res = await send() } // une nouvelle tentative si le réseau coupe
  } catch {
    throw new Error("Connexion interrompue (réseau ou image trop lourde). Vérifiez Internet, réessayez, ou choisissez une image plus légère.")
  }
  const txt = await res.text()
  if (!res.ok) {
    if (txt.includes('acces refuse')) throw new Error('Mot de passe incorrect.')
    if (txt.includes('does not exist') || txt.includes('Could not find')) throw new Error("La base n'est pas encore configurée (script SQL à exécuter).")
    throw new Error('Erreur : ' + (txt.slice(0, 160) || res.status))
  }
  return (txt ? JSON.parse(txt) : null) as T
}

export interface ReviewRow { id: string; name: string; role: string | null; service: string | null; date_label: string | null; text: string; visible: boolean }

export async function fetchReviews(): Promise<ReviewRow[]> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/reviews?select=*&order=created_at.desc`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } })
    return res.ok ? await res.json() : []
  } catch { return [] }
}

export async function fetchSettings(): Promise<Record<string, string | null> | null> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/ad_settings?select=*&limit=1`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } })
    if (!res.ok) return null
    const rows = await res.json()
    return rows[0] ?? null
  } catch { return null }
}

export async function submitLead(l: { name: string; email: string; phone: string; message: string }): Promise<{ ok: boolean; error?: string }> {
  try {
    await rpc('submit_lead', { p_name: l.name, p_email: l.email, p_phone: l.phone, p_message: l.message })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

/** Lecture publique d'une table (null si la base est injoignable ou pas encore configurée). */
export async function restSelect<T>(table: string, query = 'select=*'): Promise<T[] | null> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/${table}?${query}`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } })
    return res.ok ? await res.json() : null
  } catch { return null }
}

export async function submitQuote(q: { name: string; phone: string; email: string; type: string; budget: string; deadline: string; message: string }): Promise<{ ok: boolean; error?: string }> {
  try {
    await rpc('submit_quote', { p_name: q.name, p_phone: q.phone, p_email: q.email, p_type: q.type, p_budget: q.budget, p_deadline: q.deadline, p_message: q.message })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

/** Statistiques anonymes (aucune donnée personnelle) : page vue ou clic WhatsApp. */
export function trackEvent(type: 'page_view' | 'whatsapp', label: string) {
  try {
    fetch(`${SB_URL}/rest/v1/rpc/track_event`, {
      method: 'POST', keepalive: true,
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_type: type, p_label: label }),
    }).catch(() => { /* */ })
  } catch { /* */ }
}

export async function submitTeamApplication(code: string, data: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    await rpc('submit_team_application', { p_code: code, p_data: data })
    return { ok: true }
  } catch (e) {
    const m = (e as Error).message
    if (m.includes('invitation invalide')) return { ok: false, error: "Ce lien d'invitation n'est plus valide. Demande un nouveau lien à AMINE DIGITAL." }
    if (m.includes('trop de demandes')) return { ok: false, error: 'Trop de candidatures en même temps. Réessaie dans quelques minutes.' }
    if (m.includes('donnees invalides')) return { ok: false, error: 'Certains champs obligatoires sont incomplets.' }
    return { ok: false, error: m }
  }
}

export interface UploadedFile { name: string; url: string; type: string; size: number }
export const MAX_UPLOAD = 50 * 1024 * 1024
export const STORAGE_PUBLIC = `${SB_URL}/storage/v1/object/public/candidatures/`

/** Envoie un fichier de preuve (photo, vidéo, PDF…) dans le stockage privé des candidatures. */
export function uploadCandidateFile(code: string, file: File, onProgress: (pct: number) => void): Promise<UploadedFile> {
  return new Promise((resolve, reject) => {
    const safe = file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '_').slice(-80) || 'fichier'
    const rand = Array.from(crypto.getRandomValues(new Uint8Array(12)), (b) => b.toString(16).padStart(2, '0')).join('')
    const path = `${encodeURIComponent(code)}/${rand}/${safe}`
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${SB_URL}/storage/v1/object/candidatures/${path}`)
    xhr.setRequestHeader('apikey', SB_KEY)
    xhr.setRequestHeader('Authorization', `Bearer ${SB_KEY}`)
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream')
    xhr.setRequestHeader('x-upsert', 'false')
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100)) }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve({ name: file.name.slice(0, 120), url: `${STORAGE_PUBLIC}${path}`, type: file.type, size: file.size })
      else if (xhr.status === 413) reject(new Error('Fichier trop lourd (50 Mo maximum).'))
      else if (xhr.status === 415) reject(new Error("Ce type de fichier n'est pas accepté."))
      else if (xhr.status === 400 || xhr.status === 401 || xhr.status === 403) reject(new Error("Envoi refusé : lien d'invitation invalide ou envoi de fichiers pas encore activé."))
      else reject(new Error("L'envoi a échoué. Réessaie."))
    }
    xhr.onerror = () => reject(new Error('Connexion interrompue. Réessaie.'))
    xhr.send(file)
  })
}
