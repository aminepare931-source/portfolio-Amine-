export default function BottomMarquee() {
  const text = 'CONSTRUIRE POUR L\'AFRIQUE • '
  return (
    <div className="relative overflow-hidden border-y border-stroke py-6 bg-surface/50">
      <div className="flex w-max animate-marquee">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="font-display text-3xl md:text-4xl text-muted/60 whitespace-nowrap px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
