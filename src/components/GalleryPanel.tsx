import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  { img: '/assets/hero.jpg', label: 'Portrait' },
  { img: '/assets/about1.jpg', label: 'Style' },
  { img: '/assets/about2.jpg', label: 'Traditionnel' },
  { color: '#FF5A1F', label: 'HTML / CSS' },
  { color: '#E8C97A', label: 'JavaScript' },
  { color: '#C9A24B', label: 'Supabase' },
  { img: '/assets/hero.jpg', label: 'Amine Paré' },
  { color: '#FF5A1F', label: 'E-Commerce' },
  { img: '/assets/about1.jpg', label: 'Bobo-Dioulasso' },
]

function buildLayout(count: number, cols: number) {
  const rows: number[][] = []
  let placed = 0
  let r = 0
  while (placed < count) {
    const row = Array(cols).fill(-1)
    const a = (r * 2 + (r % 2)) % cols
    row[a] = placed++
    if (r % 3 === 0 && placed < count) {
      const b = (a + 2) % cols === a ? (a + 1) % cols : (a + 2) % cols
      row[b] = placed++
    }
    rows.push(row)
    r++
  }
  return rows
}

export default function GalleryPanel() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [cols, setCols] = useState(3)

  useEffect(() => {
    const onResize = () => setCols(window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const layout = buildLayout(ITEMS.length, cols)

  // RAF-driven scale animation as each card crosses the viewport — normal document flow, not fixed.
  useEffect(() => {
    let raf: number
    const tick = () => {
      const vh = window.innerHeight
      cardsRef.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.bottom <= 0 || rect.top >= vh) {
          el.style.transform = 'scale(0.4)'
          el.style.opacity = '0'
          return
        }
        const enter = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.6)))
        const exit = Math.min(1, Math.max(0, rect.bottom / (vh * 0.4)))
        const scale = Math.min(enter, exit)
        el.style.transform = `scale(${Math.max(0.4, scale)})`
        el.style.opacity = String(Math.max(0.15, scale))
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cols])

  return (
    <section className="relative bg-black py-24 md:py-32">
      <div className="text-center mb-12 px-6">
        <span className="text-xs text-muted uppercase tracking-[0.3em]">Mon univers</span>
        <h2 className="font-display text-5xl md:text-7xl text-white mt-3">En Images & Code.</h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-4 md:gap-6 px-4 md:px-8">
        {layout.map((row, ri) => (
          <div key={ri} className="grid gap-4 md:gap-6" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {row.map((itemIdx, ci) => {
              if (itemIdx === -1) return <div key={ci} />
              const item = ITEMS[itemIdx]
              const isLeft = ci < cols / 2
              return (
                <div
                  key={ci}
                  ref={(el) => { cardsRef.current[itemIdx] = el }}
                  className="aspect-[2/3] rounded-2xl overflow-hidden relative transition-none"
                  style={{ transformOrigin: isLeft ? 'right bottom' : 'left bottom', transform: 'scale(0.4)', opacity: 0.15 }}
                >
                  {'img' in item ? (
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, #111 0%, ${item.color}22 100%)` }}>
                      <span className="font-display text-2xl text-center px-4" style={{ color: item.color }}>{item.label}</span>
                    </div>
                  )}
                  {'img' in item && (
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-[10px] font-mono uppercase tracking-wide text-white">{item.label}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16 px-6">
        <a
          href="#projects"
          className="rounded-full bg-white text-black font-display text-2xl md:text-4xl px-10 md:px-12 py-5 md:py-6 hover:scale-105 transition-transform"
        >
          projets →
        </a>
      </div>
    </section>
  )
}
