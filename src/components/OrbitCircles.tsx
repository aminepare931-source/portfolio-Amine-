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
  { ic: '💻', angle: 270, r: 130, glow: '#FF5A1F' },
  { ic: '🎨', angle: 40, r: 200, glow: '#E8C97A' },
  { ic: '📈', angle: 160, r: 200, glow: '#C9A24B' },
  { ic: '✍️', angle: 305, r: 200, glow: '#FF5A1F' },
  { ic: '🎓', angle: 110, r: 270, glow: '#E8C97A' },
  { ic: '🤖', angle: 250, r: 270, glow: '#FF5A1F' },
]
const RINGS = [130, 200, 270] // radius in px, at the 760px "stage" base scale

export default function OrbitCircles() {
  const count = useCountUp(10)

  return (
    <div className="w-full flex justify-center overflow-hidden py-6">
      <div className="relative shrink-0 origin-center scale-[0.42] sm:scale-[0.58] md:scale-75 lg:scale-100" style={{ width: 700, height: 700 }}>
        {/* Rings */}
        {RINGS.map((r, i) => (
          <div
            key={i}
            className="orbit-ring border"
            style={{
              width: r * 2, height: r * 2,
              borderColor: 'rgba(232,201,122,0.18)',
              animation: `${i % 2 === 0 ? 'spin-cw' : 'spin-ccw'} ${30 + i * 15}s linear infinite`,
            }}
          />
        ))}

        {/* Center count-up */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-7xl text-clay">{count}+</div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted mt-1">Projets livrés</div>
        </div>

        {/* Orbiting badges */}
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
                animation: `fly-in 0.6s ease-out ${0.6 + i * 0.25}s both`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl bg-surface border flex items-center justify-center text-3xl"
                style={{ borderColor: b.glow, boxShadow: `0 0 18px ${b.glow}55` }}
              >
                {b.ic}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
