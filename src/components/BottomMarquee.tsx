import { playClickSound } from '../lib/sound'

export default function BottomMarquee() {
  const items = [
    "CONSTRUIRE POUR L'AFRIQUE",
    'TRANSFORMATION DIGITALE',
    'FULLSTACK TS & REACT',
    'EXCELLENCE CODE & UX',
  ]

  return (
    <div
      onMouseEnter={playClickSound}
      className="relative border-y border-slate-900/10 py-6 bg-[#ffffff] backdrop-blur-md"
    >
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 px-4 max-w-[1320px] mx-auto">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="font-display text-xl sm:text-3xl text-slate-900/40 hover:text-[#3B82F6] transition-colors whitespace-nowrap tracking-wider cursor-default select-none">
              {text}
            </span>
            {i !== items.length - 1 && <span className="w-2 h-2 rounded-full bg-[#3B82F6]/30 shrink-0" />}
          </span>
        ))}
      </div>
    </div>
  )
}
