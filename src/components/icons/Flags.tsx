// Drapeaux en SVG (remplacent les emojis de drapeaux)
type P = { className?: string }
const base = 'inline-block w-[1.25em] h-[0.9em] rounded-[2px] align-[-0.1em] shrink-0'

export function FlagFR({ className = '' }: P) {
  return (
    <svg viewBox="0 0 3 2" className={`${base} ${className}`} aria-label="Français" role="img">
      <rect width="1" height="2" fill="#0055A4" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#EF4135" />
    </svg>
  )
}

export function FlagGB({ className = '' }: P) {
  return (
    <svg viewBox="0 0 60 40" className={`${base} ${className}`} aria-label="English" role="img">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  )
}

export function FlagBF({ className = '' }: P) {
  return (
    <svg viewBox="0 0 3 2" className={`${base} ${className}`} aria-label="Burkina Faso" role="img">
      <rect width="3" height="1" fill="#EF2B2D" />
      <rect y="1" width="3" height="1" fill="#009E49" />
      <path
        d="M1.5 .55l.1.3h.32l-.26.19.1.31-.26-.19-.26.19.1-.31-.26-.19h.32z"
        fill="#FCD116"
      />
    </svg>
  )
}
