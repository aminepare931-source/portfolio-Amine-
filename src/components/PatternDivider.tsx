import Reveal from './Reveal'

/* Motif géométrique inspiré du bogolan (tissu traditionnel malien/burkinabè) */
export default function PatternDivider() {
  return (
    <Reveal>
      <div className="relative py-10 flex items-center justify-center overflow-hidden">
        <svg width="100%" height="48" viewBox="0 0 800 48" preserveAspectRatio="xMidYMid meet" className="opacity-40 max-w-4xl">
          <defs>
            <pattern id="bogolan" width="80" height="48" patternUnits="userSpaceOnUse">
              <path d="M0,24 L20,4 L40,24 L20,44 Z" fill="none" stroke="#C9A24B" strokeWidth="1.5" />
              <circle cx="60" cy="24" r="5" fill="none" stroke="#FF5A1F" strokeWidth="1.5" />
              <path d="M50,10 L70,10 M50,38 L70,38" stroke="#7a726a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="48" fill="url(#bogolan)" />
        </svg>
      </div>
    </Reveal>
  )
}
