const SB_URL = 'https://ytpghkntnuuppmreeboo.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGdoa250bnV1cHBtcmVlYm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTY5NzEsImV4cCI6MjA5Nzc5Mjk3MX0.D4i-P18kRs0_nsMX5Kk8EYdnTV-ZIxDVfI_OvoAmE4E'

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  url: string | null
  size: string
  emoji: string | null
  color: string
  img: string | null
  featured: boolean
  position: number
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(
    `${SB_URL}/rest/v1/projects?select=*&order=position.asc,created_at.asc`,
    { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
  )
  if (!res.ok) throw new Error('Erreur Supabase: ' + res.status)
  return res.json()
}
