import { playClickSound } from '../lib/sound'

export default function BottomMarquee() {
  const items = [
    "CONSTRUIRE POUR L'AFRIQUE",
    'TRANSFORMATION DIGITALE',
    'FULLSTACK TS & REACT',
    'EXCELLENCE CODE & UX',
  ]
  const repeated = Array.from({ length: 2 }).flatMap(() => items)

  return (
    <div
      onMouseEnter={playClickSound}
      className="relative overflow-hidden border-y border-slate-900/10 py-6 bg-[#ffffff] backdrop-blur-md"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {repeated.map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-2xl sm:text-4xl text-slate-900/40 hover:text-[#3B82F6] transition-colors whitespace-nowrap px-6 tracking-wider cursor-default select-none">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]/30 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
