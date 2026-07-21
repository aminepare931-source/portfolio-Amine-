import { useEffect, useState } from 'react'

function useCountUp(target: number, delay = 1200, duration = 1800) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const start = setTimeout(() => {
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(Math.round(eased * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(start)
  }, [target, delay, duration])
  return n
}

const BADGES = [
  { ic: '💻', angle: 265, r: 130, glow: '#FF5A1F', float: 3.2 },
  { ic: '⚙️', angle: 20, r: 200, glow: '#E8C97A', float: 3.8 },
  { ic: '🎨', angle: 95, r: 200, glow: '#C9A24B', float: 2.9 },
  { ic: '📈', angle: 190, r: 200, glow: '#FF5A1F', float: 4.1 },
  { ic: '✍️', angle: 330, r: 270, glow: '#E8C97A', float: 3.5 },
  { ic: '🎓', angle: 60, r: 270, glow: '#FF5A1F', float: 3.0 },
  { ic: '🤖', angle: 145, r: 270, glow: '#C9A24B', float: 3.6 },
]
const RINGS = [130, 200, 270]

export default function OrbitCircles() {
  const count = useCountUp(10)

  return (
    <div className="w-full flex justify-center overflow-hidden py-6">
      <div className="relative shrink-0 origin-center scale-[0.42] sm:scale-[0.58] md:scale-75 lg:scale-100" style={{ width: 700, height: 700 }}>
        {/* Rings — faster + pulsing */}
        {RINGS.map((r, i) => (
          <div
            key={i}
            className="orbit-ring border-2"
            style={{
              width: r * 2, height: r * 2,
              borderColor: 'rgba(255,90,31,0.28)',
              boxShadow: `0 0 ${20 + i * 8}px rgba(255,90,31,0.08)`,
              animation: `${i % 2 === 0 ? 'spin-cw' : 'spin-ccw'} ${16 + i * 6}s linear infinite`,
            }}
          />
        ))}

        {/* Center — photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4"
              style={{ borderColor: '#FF5A1F', boxShadow: '0 0 40px rgba(255,90,31,0.5), 0 0 80px rgba(255,90,31,0.2)' }}
            >
              <img src="/assets/hero.jpg" alt="Amine Paré" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface border border-clay/40 rounded-full px-4 py-1.5 flex items-center gap-1.5">
              <span className="font-display text-xl text-clay">{count}+</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">Projets</span>
            </div>
          </div>
        </div>

        {/* Orbiting badges — with idle float + fly-in */}
        {BADGES.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180
          const x = Math.cos(rad) * b.r
          const y = Math.sin(rad) * b.r
          return (
            <div
              key={i}
              className="orbit-badge"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                animation: `fly-in 0.6s ease-out ${0.5 + i * 0.15}s both`,
              }}
            >
              <div
                style={{ animation: `float-bob ${b.float}s ease-in-out ${i * 0.3}s infinite` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl bg-surface border-2 flex items-center justify-center text-3xl"
                  style={{ borderColor: b.glow, boxShadow: `0 0 24px ${b.glow}66` }}
                >
                  {b.ic}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
