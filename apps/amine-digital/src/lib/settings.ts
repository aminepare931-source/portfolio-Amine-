import { useEffect, useState } from 'react'
import { fetchSettings } from './supabase'

export interface Settings {
  whatsapp: string
  phone: string
  email: string
  address: string
  facebook: string
  tiktok: string
  instagram: string
  linkedin: string
}

export const DEFAULT_SETTINGS: Settings = {
  whatsapp: '22654412618',
  phone: '+226 54 41 26 18',
  email: 'digitalamine3@gmail.com',
  address: 'Bobo-Dioulasso, Burkina Faso',
  facebook: '',
  tiktok: '',
  instagram: '',
  linkedin: '',
}

let cache: Settings | null = null
let pending: Promise<Settings> | null = null

function load(): Promise<Settings> {
  if (cache) return Promise.resolve(cache)
  if (!pending) {
    pending = fetchSettings().then((row) => {
      const s = { ...DEFAULT_SETTINGS }
      if (row) for (const k of Object.keys(s) as (keyof Settings)[]) if (row[k]) s[k] = row[k] as string
      cache = s
      return s
    })
  }
  return pending
}

/** Coordonnées du site : valeurs par défaut tout de suite, puis celles de l'administration. */
export function useSettings(): Settings {
  const [s, setS] = useState<Settings>(cache ?? DEFAULT_SETTINGS)
  useEffect(() => { let on = true; load().then((v) => on && setS(v)); return () => { on = false } }, [])
  return s
}

export function waUrl(s: Settings, text?: string) {
  const n = s.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`
}
