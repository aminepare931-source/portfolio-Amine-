import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToId(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, {
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
