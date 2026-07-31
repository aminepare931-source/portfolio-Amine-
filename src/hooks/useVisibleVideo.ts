import { useEffect, useRef } from 'react'

/**
 * Met en pause la vidéo quand elle sort du champ visuel (et hors écran au chargement),
 * pour éviter que plusieurs vidéos décodent en même temps sur mobile.
 */
export function useVisibleVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
