import { FEATURED_PROJECTS, ProjectCaseStudy } from '../data/projectsData'

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
  tagline?: string
  fullDescription?: string
  keyFeatures?: string[]
  metrics?: { label: string; value: string }[]
  architecture?: string[]
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/projects?select=*&order=position.asc,created_at.asc`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    )
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any, idx: number) => {
          const match = FEATURED_PROJECTS.find(p => p.id === item.id || p.name.toLowerCase() === item.name?.toLowerCase())
          return {
            ...item,
            tagline: item.tagline || match?.tagline || item.description,
            fullDescription: item.fullDescription || match?.fullDescription || item.description,
            keyFeatures: item.keyFeatures || match?.keyFeatures || ['Architecture évolutive', 'Interface optimisée', 'Gestion de données sécurisée'],
            metrics: item.metrics || match?.metrics || [{ label: 'Performance', value: 'Optimisée' }],
            architecture: item.architecture || match?.architecture || ['React / TypeScript', 'Supabase / Cloud backend'],
          }
        })
      }
    }
  } catch (e) {
    console.warn('Supabase fetch fallback to local projects', e)
  }
  return FEATURED_PROJECTS
}

