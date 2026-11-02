const SB_URL = 'https://ytpghkntnuuppmreeboo.supabase.co'
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
  const res = await fetch(`${SB_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
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
