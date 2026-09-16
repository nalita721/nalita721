import type { ReactNode } from 'react'

export type WordIconKey =
  | 'person'
  | 'people'
  | 'handshake'
  | 'document'
  | 'badge'
  | 'chartUp'
  | 'chartDown'
  | 'money'
  | 'calendar'
  | 'clock'
  | 'briefcase'
  | 'building'
  | 'gear'
  | 'lightbulb'
  | 'scale'
  | 'mapPin'
  | 'plane'
  | 'suitcase'
  | 'hotel'
  | 'passport'
  | 'star'
  | 'bank'
  | 'target'
  | 'cart'
  | 'megaphone'
  | 'magnifier'

const GEAR_TEETH_ANGLES = [0, 60, 120, 180, 240, 300]

function IconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      {children}
    </svg>
  )
}

const ICONS: Record<WordIconKey, ReactNode> = {
  person: (
    <IconSvg>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    </IconSvg>
  ),
  people: (
    <IconSvg>
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="15.5" cy="8" r="2.6" />
      <path d="M3.5 19c0-3.2 2.3-5.3 5-5.3 1.1 0 2.1.3 3 .9" />
      <path d="M12.5 14.6c.9-.6 1.9-.9 3-.9 2.7 0 5 2.1 5 5.3" />
    </IconSvg>
  ),
  handshake: (
    <IconSvg>
      <path d="M2 15l5-5c.8-.8 2-.8 2.8 0l1 1" />
      <path d="M22 15l-5-5c-.8-.8-2-.8-2.8 0l-1 1" />
      <path d="M9.8 11l2 2a1.7 1.7 0 0 0 2.4 0" />
      <path d="M7.8 13l2.2 2.2a1.7 1.7 0 0 0 2.4 0" />
      <path d="M5.8 15l2.2 2.2a1.7 1.7 0 0 0 2.4 0" />
    </IconSvg>
  ),
  document: (
    <IconSvg>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 9h2M9.5 12h5M9.5 15h5" />
    </IconSvg>
  ),
  badge: (
    <IconSvg>
      <circle cx="12" cy="10" r="6" />
      <path d="M9.3 10l1.8 1.8 3.6-3.6" />
      <path d="M9 15.5L7.5 21l4.5-2 4.5 2-1.5-5.5" />
    </IconSvg>
  ),
  chartUp: (
    <IconSvg>
      <path d="M4 20V13M10 20V9M16 20v-5" />
      <path d="M4 21h16" />
      <path d="M13 10l4-4" />
      <path d="M13.5 6h3.5v3.5" />
    </IconSvg>
  ),
  chartDown: (
    <IconSvg>
      <path d="M4 20V13M10 20V17M16 20v-9" />
      <path d="M4 21h16" />
      <path d="M13 14l4 4" />
      <path d="M17 14v4h-4" />
    </IconSvg>
  ),
  money: (
    <IconSvg>
      <circle cx="9" cy="9" r="5" />
      <circle cx="15" cy="15" r="5" opacity="0.55" />
      <path d="M9 6.5v5M7 9h4" />
    </IconSvg>
  ),
  calendar: (
    <IconSvg>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v4M16 3v4" />
      <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" />
    </IconSvg>
  ),
  clock: (
    <IconSvg>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </IconSvg>
  ),
  briefcase: (
    <IconSvg>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </IconSvg>
  ),
  building: (
    <IconSvg>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8.5 7h1.5M14 7h1.5M8.5 11h1.5M14 11h1.5M8.5 15h1.5M14 15h1.5" />
      <path d="M10 21v-4h4v4" />
    </IconSvg>
  ),
  gear: (
    <IconSvg>
      <circle cx="12" cy="12" r="3.3" />
      <circle cx="12" cy="12" r="6.5" />
      {GEAR_TEETH_ANGLES.map((angle) => (
        <rect key={angle} x="10.6" y="1.3" width="2.8" height="3.2" rx="0.6" transform={`rotate(${angle} 12 12)`} />
      ))}
    </IconSvg>
  ),
  lightbulb: (
    <IconSvg>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </IconSvg>
  ),
  scale: (
    <IconSvg>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7l-2.5 5a2.7 2.7 0 0 0 5 0L5 7z" />
      <path d="M19 7l-2.5 5a2.7 2.7 0 0 0 5 0L19 7z" />
      <path d="M8.5 21h7" />
    </IconSvg>
  ),
  mapPin: (
    <IconSvg>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </IconSvg>
  ),
  plane: (
    <IconSvg>
      <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3z" />
      <path d="M12.5 13.5L21 3" />
    </IconSvg>
  ),
  suitcase: (
    <IconSvg>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <circle cx="8" cy="20" r="1" />
      <circle cx="16" cy="20" r="1" />
    </IconSvg>
  ),
  hotel: (
    <IconSvg>
      <path d="M3 19V9" />
      <path d="M3 13h18v6" />
      <rect x="4.5" y="10.5" width="5" height="2.5" rx="1" />
      <path d="M3 19h18" />
    </IconSvg>
  ),
  passport: (
    <IconSvg>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <circle cx="12" cy="9.5" r="2.5" />
      <path d="M9 15h6M9.5 17.5h5" />
    </IconSvg>
  ),
  star: (
    <IconSvg>
      <path d="M12 2.5l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.6l-6 3.4 1.5-6.5-5-4.4 6.6-.6L12 2.5z" />
    </IconSvg>
  ),
  bank: (
    <IconSvg>
      <path d="M3 10l9-6 9 6" />
      <path d="M4.5 10v9M9 10v9M15 10v9M19.5 10v9" />
      <path d="M3 19h18" />
    </IconSvg>
  ),
  target: (
    <IconSvg>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </IconSvg>
  ),
  cart: (
    <IconSvg>
      <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </IconSvg>
  ),
  megaphone: (
    <IconSvg>
      <path d="M3 10v4h3l6 4V6l-6 4H3z" />
      <path d="M15 9a4 4 0 0 1 0 6" />
      <path d="M17.5 7a7.5 7.5 0 0 1 0 10" />
    </IconSvg>
  ),
  magnifier: (
    <IconSvg>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </IconSvg>
  ),
}

export function WordIcon({ iconKey, className = '' }: { iconKey: WordIconKey; className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center rounded-2xl bg-brand-50 text-brand-600 p-3 ${className}`}>
      {ICONS[iconKey]}
    </div>
  )
}
