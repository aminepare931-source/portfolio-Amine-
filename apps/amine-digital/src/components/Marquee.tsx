const ITEMS = [
  'Développement Web',
  'Applications Mobiles',
  'Design & Identité',
  'Marketing Digital',
  'Automatisation & IA',
  'Cybersécurité',
]

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="bg-gov py-3 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium px-6">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </span>
        ))}
      </div>
    </div>
  )
}
