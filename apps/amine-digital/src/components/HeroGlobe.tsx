import { useEffect, useRef } from 'react'
import { LAND_DOTS } from '../data/landDots'

const RAD = Math.PI / 180
const TILT = 0.38
const SPIN = 0.11 // rad/s ≈ un tour en ~57 s
const HOME = { name: 'Bobo-Dioulasso', lon: -4.3, lat: 11.18 }
const DESTS = [
  { lon: 2.35, lat: 48.85 }, // Paris
  { lon: -17.45, lat: 14.7 }, // Dakar
  { lon: 3.4, lat: 6.45 }, // Lagos
  { lon: 55.3, lat: 25.2 }, // Dubaï
  { lon: -74, lat: 40.7 }, // New York
  { lon: 28.05, lat: -26.2 }, // Johannesburg
  { lon: 36.8, lat: -1.3 }, // Nairobi
  { lon: 116.4, lat: 39.9 }, // Pékin
  { lon: -46.6, lat: -23.5 }, // São Paulo
]

type V3 = [number, number, number]
const toVec = (lon: number, lat: number): V3 => {
  const l = lon * RAD, p = lat * RAD
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)]
}
const slerp = (a: V3, b: V3, t: number): V3 => {
  const d = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const w = Math.acos(d), s = Math.sin(w) || 1
  const k1 = Math.sin((1 - t) * w) / s, k2 = Math.sin(t * w) / s
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2]
}

const LAND = LAND_DOTS.map(([lon, lat]) => toVec(lon, lat))
const HOME_V = toVec(HOME.lon, HOME.lat)
const ARCS = DESTS.map((d, i) => {
  const b = toVec(d.lon, d.lat)
  const ang = Math.acos(Math.min(1, HOME_V[0] * b[0] + HOME_V[1] * b[1] + HOME_V[2] * b[2]))
  return { b, lift: 0.1 + 0.22 * (ang / Math.PI), delay: i * 1.15 }
})
const CYCLE = 9 // s : durée d'un cycle pour un arc
const STARS = Array.from({ length: 70 }, (_, i) => {
  const a = (i * 2.399963) % (Math.PI * 2)
  const r = 1.08 + ((i * 37) % 100) / 100 * 0.55
  return { a, r, ph: (i * 1.7) % 6.28, s: 0.6 + ((i * 13) % 10) / 10 }
})

export default function HeroGlobe({ className = '' }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = wrap.current, cv = canvas.current
    if (!el || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, last = 0, time = 0

    const resize = () => {
      const r = el.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      W = r.width; H = r.height
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce || !raf) draw()
    }

    const rotate = (v: V3, rot: number): V3 => {
      const c = Math.cos(rot), s = Math.sin(rot)
      const x = v[0] * c - v[2] * s, z = v[2] * c + v[0] * s
      const ct = Math.cos(TILT), st = Math.sin(TILT)
      return [x, v[1] * ct - z * st, v[1] * st + z * ct]
    }

    function draw() {
      const R = Math.min(W, H) * 0.36
      const cx = W / 2, cy = H / 2
      const rot = -HOME.lon * RAD * 0 + 0.08 + time * SPIN
      ctx!.clearRect(0, 0, W, H)

      // halo extérieur
      let g = ctx!.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.55)
      g.addColorStop(0, 'rgba(56,152,255,0.28)'); g.addColorStop(1, 'rgba(56,152,255,0)')
      ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.55, 0, 7); ctx!.fill()

      // corps de la sphère
      g = ctx!.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R)
      g.addColorStop(0, 'rgba(40,110,230,0.38)'); g.addColorStop(0.6, 'rgba(12,50,140,0.30)'); g.addColorStop(1, 'rgba(4,16,60,0.55)')
      ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, 7); ctx!.fill()

      // méridiens / parallèles discrets
      ctx!.lineWidth = 0.6
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx!.beginPath(); let pen = false
        for (let lon = -180; lon <= 180; lon += 6) {
          const p = rotate(toVec(lon, lat), rot)
          if (p[2] > 0) { const x = cx + R * p[0], y = cy - R * p[1]; pen ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y); pen = true } else pen = false
        }
        ctx!.strokeStyle = 'rgba(147,197,253,0.13)'; ctx!.stroke()
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx!.beginPath(); let pen = false
        for (let lat = -90; lat <= 90; lat += 6) {
          const p = rotate(toVec(lon, lat), rot)
          if (p[2] > 0) { const x = cx + R * p[0], y = cy - R * p[1]; pen ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y); pen = true } else pen = false
        }
        ctx!.strokeStyle = 'rgba(147,197,253,0.10)'; ctx!.stroke()
      }

      // terres : points (face arrière très discrète, face avant lumineuse)
      for (let i = 0; i < LAND.length; i++) {
        const p = rotate(LAND[i], rot)
        const x = cx + R * p[0], y = cy - R * p[1]
        if (p[2] < 0) {
          ctx!.fillStyle = 'rgba(147,197,253,0.07)'
          ctx!.fillRect(x - 0.6, y - 0.6, 1.2, 1.2)
        } else {
          const tw = 0.82 + 0.18 * Math.sin(time * 2 + i * 0.7)
          const a = (0.28 + 0.72 * p[2]) * tw
          const s = 0.8 + 1.1 * p[2]
          ctx!.fillStyle = `rgba(${200 + 40 * p[2] | 0},${225 + 25 * p[2] | 0},255,${a.toFixed(3)})`
          ctx!.beginPath(); ctx!.arc(x, y, s, 0, 7); ctx!.fill()
        }
      }

      // arcs lumineux depuis Bobo-Dioulasso
      ctx!.lineCap = 'round'
      for (const arc of ARCS) {
        const ph = ((time - arc.delay) % CYCLE + CYCLE) % CYCLE
        const head = Math.min(1, ph / 3.2)
        const fade = ph < 3.2 ? 1 : Math.max(0, 1 - (ph - 3.2) / 2.2)
        if (fade <= 0) continue
        const tail = Math.max(0, head - 0.55)
        let prev: [number, number, number] | null = null
        const steps = 44
        for (let k = 0; k <= steps; k++) {
          const t = tail + (head - tail) * (k / steps)
          const v = slerp(HOME_V, arc.b, t), h = 1 + arc.lift * Math.sin(Math.PI * t)
          const p = rotate([v[0] * h, v[1] * h, v[2] * h], rot)
          const x = cx + R * p[0], y = cy - R * p[1]
          if (prev && p[2] > 0.02 && prev[2] > 0.02) {
            const along = k / steps
            ctx!.strokeStyle = `rgba(125,200,255,${(0.9 * along * fade).toFixed(3)})`
            ctx!.lineWidth = 0.8 + 1.6 * along
            ctx!.beginPath(); ctx!.moveTo(prev[0], prev[1]); ctx!.lineTo(x, y); ctx!.stroke()
          }
          prev = [x, y, p[2]]
        }
        // tête lumineuse
        if (prev && prev[2] > 0.02 && fade > 0.05) {
          const gh = ctx!.createRadialGradient(prev[0], prev[1], 0, prev[0], prev[1], 9)
          gh.addColorStop(0, `rgba(255,255,255,${fade})`); gh.addColorStop(0.35, `rgba(110,190,255,${0.7 * fade})`); gh.addColorStop(1, 'rgba(110,190,255,0)')
          ctx!.fillStyle = gh; ctx!.beginPath(); ctx!.arc(prev[0], prev[1], 9, 0, 7); ctx!.fill()
        }
        // impact à l'arrivée
        if (ph >= 3.2 && ph < 5.4) {
          const pr = rotate(arc.b, rot)
          if (pr[2] > 0.02) {
            const k = (ph - 3.2) / 2.2
            ctx!.strokeStyle = `rgba(147,210,255,${(0.8 * (1 - k)).toFixed(3)})`; ctx!.lineWidth = 1.2
            ctx!.beginPath(); ctx!.arc(cx + R * pr[0], cy - R * pr[1], 3 + 16 * k, 0, 7); ctx!.stroke()
          }
        }
      }

      // repère Bobo-Dioulasso : point + onde
      const hp = rotate(HOME_V, rot)
      if (hp[2] > 0.02) {
        const x = cx + R * hp[0], y = cy - R * hp[1]
        const k = (time % 2.4) / 2.4
        ctx!.strokeStyle = `rgba(147,210,255,${(0.9 * (1 - k)).toFixed(3)})`; ctx!.lineWidth = 1.4
        ctx!.beginPath(); ctx!.arc(x, y, 4 + 22 * k, 0, 7); ctx!.stroke()
        const gh = ctx!.createRadialGradient(x, y, 0, x, y, 12)
        gh.addColorStop(0, 'rgba(255,255,255,1)'); gh.addColorStop(0.4, 'rgba(110,190,255,0.8)'); gh.addColorStop(1, 'rgba(110,190,255,0)')
        ctx!.fillStyle = gh; ctx!.beginPath(); ctx!.arc(x, y, 12, 0, 7); ctx!.fill()
      }

      // liseré d'atmosphère
      g = ctx!.createRadialGradient(cx, cy, R * 0.93, cx, cy, R * 1.04)
      g.addColorStop(0, 'rgba(120,190,255,0)'); g.addColorStop(0.7, 'rgba(120,190,255,0.35)'); g.addColorStop(1, 'rgba(120,190,255,0)')
      ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.04, 0, 7); ctx!.fill()

      // étincelles autour du globe
      for (const s of STARS) {
        const a = 0.15 + 0.85 * Math.max(0, Math.sin(time * 1.6 * s.s + s.ph))
        const x = cx + Math.cos(s.a + time * 0.02) * R * s.r, y = cy + Math.sin(s.a + time * 0.02) * R * s.r
        ctx!.fillStyle = `rgba(190,225,255,${(a * 0.7).toFixed(3)})`
        ctx!.beginPath(); ctx!.arc(x, y, 0.7 + 0.9 * s.s * a, 0, 7); ctx!.fill()
      }
    }

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) { last = 0; return }
      if (last) time += Math.min(0.05, (ts - last) / 1000)
      last = ts
      draw()
    }

    const ro = new ResizeObserver(resize); ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 }); io.observe(el)
    resize()
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [])

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <canvas ref={canvas} className="w-full h-full block" />
    </div>
  )
}
