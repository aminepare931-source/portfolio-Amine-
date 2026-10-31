import { ShoppingCart, Building2, Newspaper, Bot, Smartphone, Globe, Layers, Shield, type LucideIcon } from 'lucide-react'

// Remplace le champ "emoji" des projets (qui vient aussi de Supabase) par une icône SVG,
// choisie selon le nom / les tags du projet.
export function pickProjectIcon(p: { id?: string; name?: string; tags?: string[] }): LucideIcon {
  const s = `${p.id ?? ''} ${p.name ?? ''} ${(p.tags ?? []).join(' ')}`.toLowerCase()
  if (/boutique|shop|store|e-?commerce|commerce/.test(s)) return ShoppingCart
  if (/news|actualit|media|média|rss|fasoko/.test(s)) return Newspaper
  if (/bot|\bai\b|\bia\b|intelligence|suite/.test(s)) return Bot
  if (/marketplace|techbf|service|plateforme/.test(s)) return Building2
  if (/mobile|android|ios|app\b/.test(s)) return Smartphone
  if (/secur|sécur|cyber/.test(s)) return Shield
  if (/site|web|vitrine/.test(s)) return Globe
  return Layers
}

export default function ProjectIcon({
  project,
  size = 40,
  className = '',
}: {
  project: { id?: string; name?: string; tags?: string[] }
  size?: number
  className?: string
}) {
  const Icon = pickProjectIcon(project)
  return <Icon size={size} strokeWidth={1.6} className={className} aria-hidden="true" />
}
