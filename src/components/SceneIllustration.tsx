// Simple flat-style scene illustrations standing in for Part 1 photographs.
// Kept as inline SVG (no network dependency) so they render instantly and consistently.

const SKIN = '#e8b98a'
const SKIN_DARK = '#c98f5e'
const SHIRT_BLUE = '#2a78d6'
const SHIRT_ORANGE = '#eb6834'
const SHIRT_AQUA = '#1baf7a'
const HAIR = '#3a2e26'
const SAND = '#e8d7c3'
const SAND_DARK = '#c9a077'
const INK = '#52514e'

function Person({ x, shirt = SHIRT_BLUE, skin = SKIN, armUp = false }: { x: number; shirt?: string; skin?: string; armUp?: boolean }) {
  return (
    <g transform={`translate(${x},0)`}>
      <circle cx="0" cy="18" r="14" fill={skin} />
      <path d="M -14 14 Q 0 -2 14 14 L 14 18 L -14 18 Z" fill={HAIR} />
      <rect x="-16" y="30" width="32" height="46" rx="10" fill={shirt} />
      {armUp ? (
        <rect x="10" y="26" width="9" height="34" rx="4" fill={shirt} transform="rotate(-35 14 30)" />
      ) : (
        <rect x="-24" y="36" width="10" height="34" rx="5" fill={shirt} />
      )}
      <rect x="14" y="36" width="10" height="34" rx="5" fill={shirt} />
      <rect x="-10" y="74" width="9" height="28" rx="4" fill={INK} />
      <rect x="2" y="74" width="9" height="28" rx="4" fill={INK} />
    </g>
  )
}

function Ground() {
  return <rect x="0" y="150" width="320" height="10" fill={SAND_DARK} opacity="0.5" />
}

const SCENES: Record<string, JSX.Element> = {
  handshake: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <rect width="320" height="160" fill={SAND} rx="16" />
      <Ground />
      <g transform="translate(120,50)">
        <Person x={0} shirt={SHIRT_BLUE} />
      </g>
      <g transform="translate(200,50)">
        <Person x={0} shirt={SHIRT_ORANGE} skin={SKIN_DARK} />
      </g>
      <rect x="148" y="108" width="24" height="8" rx="4" fill="#8a6a45" transform="rotate(-8 160 112)" />
    </svg>
  ),
  typing: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <rect width="320" height="160" fill={SAND} rx="16" />
      <rect x="60" y="30" width="60" height="70" fill="#fcfcfb" opacity="0.6" rx="4" />
      <g transform="translate(180,45)">
        <Person x={0} shirt={SHIRT_AQUA} />
      </g>
      <rect x="140" y="118" width="90" height="10" rx="4" fill="#8a6a45" />
      <rect x="150" y="100" width="70" height="20" rx="3" fill="#3a3a38" />
      <rect x="154" y="103" width="62" height="12" rx="2" fill={SHIRT_BLUE} opacity="0.5" />
      <Ground />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <rect width="320" height="160" fill={SAND} rx="16" />
      <rect x="20" y="70" width="110" height="50" rx="6" fill="#c3c2b7" />
      <rect x="20" y="50" width="50" height="30" rx="6" fill="#9ba3ad" />
      <circle cx="45" cy="122" r="10" fill="#3a3a38" />
      <circle cx="110" cy="122" r="10" fill="#3a3a38" />
      <g transform="translate(190,50)">
        <Person x={0} shirt={SHIRT_ORANGE} armUp />
      </g>
      <rect x="220" y="70" width="26" height="20" rx="2" fill="#c9a077" />
      <Ground />
    </svg>
  ),
  chef: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <rect width="320" height="160" fill={SAND} rx="16" />
      <rect x="90" y="90" width="140" height="14" rx="4" fill="#9ba3ad" />
      <circle cx="130" cy="86" r="14" fill="#c3c2b7" />
      <circle cx="180" cy="86" r="14" fill="#c3c2b7" />
      <g transform="translate(160,40)">
        <Person x={0} shirt="#f4f1ea" skin={SKIN} />
        <rect x="-16" y="6" width="32" height="12" rx="6" fill="#ffffff" />
      </g>
      <Ground />
    </svg>
  ),
  bus: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <rect width="320" height="160" fill={SAND} rx="16" />
      <rect x="30" y="50" width="150" height="60" rx="10" fill={SHIRT_BLUE} opacity="0.85" />
      <rect x="45" y="62" width="26" height="20" rx="3" fill="#eaf2fd" />
      <rect x="80" y="62" width="26" height="20" rx="3" fill="#eaf2fd" />
      <rect x="115" y="90" width="24" height="20" fill="#3a3a38" />
      <circle cx="55" cy="114" r="10" fill="#3a3a38" />
      <circle cx="155" cy="114" r="10" fill="#3a3a38" />
      <g transform="translate(210,45)">
        <Person x={0} shirt={SHIRT_AQUA} />
      </g>
      <Ground />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <rect width="320" height="160" fill={SAND} rx="16" />
      <rect x="150" y="70" width="70" height="44" rx="6" fill="#c3c2b7" />
      <rect x="162" y="60" width="46" height="14" rx="3" fill="#9ba3ad" />
      <rect x="162" y="118" width="46" height="8" rx="2" fill="#fcfcfb" />
      <g transform="translate(110,45)">
        <Person x={0} shirt={SHIRT_ORANGE} armUp />
      </g>
      <Ground />
    </svg>
  ),
}

export function SceneIllustration({ id }: { id?: string }) {
  const scene = id ? SCENES[id] : undefined
  if (!scene) return null
  return <div className="rounded-xl overflow-hidden border border-sand-200">{scene}</div>
}
