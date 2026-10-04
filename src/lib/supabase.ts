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
  status?: 'deployed' | 'in_progress' | 'paused' | 'done'
}

// Cache mémoire + sessionStorage pour éviter de refaire l'appel réseau
// à chaque navigation entre la home et /projets (c'était ça qui donnait
// l'impression de lenteur : chaque visite relançait un fetch complet).
let _projectsCache: Project[] | null = null
let _projectsPromise: Promise<Project[]> | null = null
const SESSION_CACHE_KEY = 'projects-cache-v1'

function readSessionCache(): Project[] | null {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeSessionCache(data: Project[]) {
  try {
    sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(data))
  } catch {
    /* quota / privacy mode — ignore */
  }
}

async function loadProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/projects?select=*&order=position.asc,created_at.asc`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    )
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          ...item,
          tagline: item.tagline || undefined,
          fullDescription: item.fullDescription || undefined,
          keyFeatures: item.keyFeatures && item.keyFeatures.length > 0 ? item.keyFeatures : undefined,
          metrics: item.metrics && item.metrics.length > 0 ? item.metrics : undefined,
          architecture: item.architecture && item.architecture.length > 0 ? item.architecture : undefined,
        }))
      }
    }
  } catch (e) {
    console.warn('Supabase fetch fallback to local projects', e)
  }
  return FEATURED_PROJECTS
}

export async function fetchProjects(): Promise<Project[]> {
  if (_projectsCache) return _projectsCache

  const fromSession = readSessionCache()
  if (fromSession) {
    _projectsCache = fromSession
    // Revalide en arrière-plan sans bloquer l'affichage
    loadProjects().then((fresh) => {
      _projectsCache = fresh
      writeSessionCache(fresh)
    })
    return fromSession
  }

  if (!_projectsPromise) {
    _projectsPromise = loadProjects().then((data) => {
      _projectsCache = data
      writeSessionCache(data)
      return data
    })
  }
  return _projectsPromise
}

// Démarre le fetch le plus tôt possible (dès le chargement de l'app),
// pour que les sections Projets affichent des données déjà prêtes.
export function prefetchProjects() {
  fetchProjects()
}

/* ═══════════════════════════════════════
   PARAMÈTRES DU SITE (contact, réseaux sociaux, liens)
   Éditables depuis l'admin — un seul enregistrement (id = 1)
═══════════════════════════════════════ */
export interface SiteSettings {
  id?: number
  email: string
  phone: string
  whatsapp: string
  linkedin: string | null
  tiktok: string | null
  facebook: string | null
  store_url: string | null
  store_label: string | null
}

export const DEFAULT_SETTINGS: SiteSettings = {
  email: 'aminepare931@gmail.com',
  phone: '+226 55 30 08 68',
  whatsapp: '22655300868',
  linkedin: null,
  tiktok: null,
  facebook: null,
  store_url: null,
  store_label: null,
}

export async function fetchSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/site_settings?select=*&limit=1`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
    )
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return { ...DEFAULT_SETTINGS, ...data[0] }
      }
    }
  } catch (e) {
    console.warn('Supabase settings fetch fallback to defaults', e)
  }
  return DEFAULT_SETTINGS
}
