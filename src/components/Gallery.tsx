import Reveal from './Reveal'

const PHOTOS = [
  { src: '/assets/hero.jpg', label: 'Portrait professionnel' },
  { src: '/assets/about1.jpg', label: 'Style décontracté' },
  { src: '/assets/about2.jpg', label: 'Tenue traditionnelle burkinabè' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Galerie
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-12">En Images.</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={i * 0.08}>
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-stroke">
              <img src={p.src} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-mono uppercase tracking-wide">{p.label}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
