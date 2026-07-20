const ITEMS = [
  'HTML', 'CSS', 'JavaScript', 'Supabase', 'Cloudflare', 'UI/UX Design',
  'Mobile First', 'E-Commerce', 'CinetPay', 'API REST', 'Mobile Money', 'Figma',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-stroke bg-surface py-4">
      <div className="flex w-max animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="font-display text-lg tracking-wide text-muted px-6 whitespace-nowrap">
            {item} <span className="text-clay mx-3">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
