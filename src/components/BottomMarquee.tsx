import { playClickSound } from '../lib/sound'

export default function BottomMarquee() {
  const items = [
    "CONSTRUIRE POUR L'AFRIQUE ✦",
    "TRANSFORMATION DIGITALE ✦",
    "FULLSTACK TS & REACT ✦",
    "EXCELLENCE CODE & UX ✦",
  ]
  const repeated = Array.from({ length: 4 }).flatMap(() => items)

  return (
    <div
      onMouseEnter={playClickSound}
      className="relative overflow-hidden border-y border-white/10 py-6 bg-[#080706] backdrop-blur-md"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {repeated.map((text, i) => (
          <span
            key={i}
            className="font-display text-2xl sm:text-4xl text-white/40 hover:text-[#FF5A1F] transition-colors whitespace-nowrap px-6 tracking-wider cursor-default select-none"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
