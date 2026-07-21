import { useEffect, useRef } from 'react'
import Reveal from './Reveal'

const COL_A = [
  { img: '/assets/hero.jpg', label: 'Portrait' },
  { color: '#FF5A1F', ic: '💻', label: 'Développement' },
  { img: '/assets/about2.jpg', label: 'Bobo-Dioulasso' },
]
const COL_B = [
  { color: '#E8C97A', ic: '🎨', label: 'Design' },
  { img: '/assets/about1.jpg', label: 'Amine Paré' },
  { color: '#C9A24B', ic: '🤖', label: 'Automatisation' },
]

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const colARef = useRef<HTMLDivElement>(null)
  const colBRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const tick = () => {
      const el = sectionRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = Math.min(1, Math.max(0, 1 - (rect.top + rect.height) / (vh + rect.height)))
        if (colARef.current) colARef.current.style.transform = `translateY(${(progress - 0.5) * -80}px)`
        if (colBRef.current) colBRef.current.style.transform = `translateY(${(progress - 0.5) * 80}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const Card = ({ item }: { item: typeof COL_A[0] }) => (
    <div className="aspect-square rounded-2xl overflow-hidden border border-stroke relative">
      {'img' in item ? (
        <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: `linear-gradient(135deg,#111,${item.color}20)` }}>
          <span className="text-3xl">{item.ic}</span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-[10px] font-mono uppercase tracking-wide text-white">{item.label}</span>
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto overflow-hidden">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Explorations
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-16">
          Terrain de <span className="font-serif italic normal-case text-clay">jeu visuel</span>.
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-2xl mx-auto">
        <div ref={colARef} className="flex flex-col gap-6 md:gap-10" style={{ willChange: 'transform' }}>
          {COL_A.map((it, i) => <Card key={i} item={it} />)}
        </div>
        <div ref={colBRef} className="flex flex-col gap-6 md:gap-10 mt-16" style={{ willChange: 'transform' }}>
          {COL_B.map((it, i) => <Card key={i} item={it} />)}
        </div>
      </div>
    </section>
  )
}
