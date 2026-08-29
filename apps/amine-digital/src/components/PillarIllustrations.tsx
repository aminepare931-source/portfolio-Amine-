function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm bg-gov/8 border border-gov/15 flex items-center justify-center shrink-0 overflow-hidden">
      {children}
    </div>
  )
}

export function WebDevIllustration() {
  return (
    <Badge>
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="4" y="8" width="40" height="26" rx="2" stroke="#0a3d91" strokeWidth="2" />
        <line x1="4" y1="15" x2="44" y2="15" stroke="#0a3d91" strokeWidth="2" />
        <circle cx="9" cy="11.5" r="1.2" fill="#0a3d91" />
        <circle cx="13" cy="11.5" r="1.2" fill="#0a3d91" />
        <path d="M14 21l-4 4 4 4" stroke="#0a3d91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 21l4 4-4 4" stroke="#0a3d91" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="20" x2="20" y2="30" stroke="#0a3d91" strokeWidth="2" strokeLinecap="round" />
        <rect x="16" y="38" width="16" height="4" rx="1" fill="#0a3d91" fillOpacity="0.4" />
      </svg>
    </Badge>
  )
}

export function DesignIllustration() {
  return (
    <Badge>
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M32 8L40 16L20 36L10 38L12 28L32 8Z" stroke="#0a3d91" strokeWidth="2" strokeLinejoin="round" />
        <line x1="28" y1="12" x2="36" y2="20" stroke="#0a3d91" strokeWidth="2" />
        <circle cx="12" cy="34" r="3" fill="#0a3d91" fillOpacity="0.25" />
        <circle cx="18" cy="40" r="2.5" fill="#0a3d91" fillOpacity="0.4" />
        <circle cx="24" cy="42" r="2" fill="#0a3d91" />
      </svg>
    </Badge>
  )
}

export function MarketingIllustration() {
  return (
    <Badge>
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M6 22v4a2 2 0 002 2h4l10 6V14l-10 6H8a2 2 0 00-2 2z" stroke="#0a3d91" strokeWidth="2" strokeLinejoin="round" />
        <path d="M28 16c3 2.5 3 13.5 0 16" stroke="#0a3d91" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 12c5 4.5 5 19.5 0 24" stroke="#0a3d91" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <rect x="12" y="34" width="3" height="6" fill="#0a3d91" fillOpacity="0.35" />
      </svg>
    </Badge>
  )
}

export function SecurityIllustration() {
  return (
    <Badge>
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <path d="M24 6l16 6v10c0 10-7 17-16 20C15 39 8 32 8 22V12l16-6z" stroke="#0a3d91" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 23l5 5 9-10" stroke="#0a3d91" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Badge>
  )
}

export function MobileIllustration() {
  return (
    <Badge>
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <rect x="14" y="5" width="20" height="38" rx="3" stroke="#0a3d91" strokeWidth="2" />
        <line x1="14" y1="12" x2="34" y2="12" stroke="#0a3d91" strokeWidth="2" />
        <line x1="14" y1="36" x2="34" y2="36" stroke="#0a3d91" strokeWidth="2" />
        <circle cx="24" cy="39.5" r="1.4" fill="#0a3d91" />
        <rect x="18" y="17" width="12" height="8" rx="1.5" fill="#0a3d91" fillOpacity="0.25" />
        <line x1="18" y1="29" x2="27" y2="29" stroke="#0a3d91" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="18" y1="32" x2="24" y2="32" stroke="#0a3d91" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      </svg>
    </Badge>
  )
}

export function AutomationIllustration() {
  return (
    <Badge>
      <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
        <circle cx="18" cy="24" r="8" stroke="#0a3d91" strokeWidth="2" />
        <path
          d="M18 12v3M18 33v3M6 24h3M27 24h3M9.5 15.5l2 2M24.5 32.5l2 2M9.5 32.5l2-2M24.5 15.5l2-2"
          stroke="#0a3d91"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M30 30l6 6M36 30l-6 6" stroke="#0a3d91" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <circle cx="18" cy="24" r="2.4" fill="#0a3d91" />
      </svg>
    </Badge>
  )
}
