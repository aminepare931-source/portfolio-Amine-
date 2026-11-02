import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../lib/supabase'

const SKIP = ['/administration', '/equipe/rejoindre']

/** Statistiques anonymes : pages vues et clics sur WhatsApp (visibles dans l'administration). */
export default function Tracker() {
  const { pathname } = useLocation()
  const last = useRef('')
  const path = useRef(pathname)
  path.current = pathname

  useEffect(() => {
    if (SKIP.includes(pathname) || last.current === pathname) return
    last.current = pathname
    trackEvent('page_view', pathname)
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (a && /^https:\/\/wa\.me\//.test(a.href) && !SKIP.includes(path.current)) trackEvent('whatsapp', path.current)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
