// Flat-style scene illustrations standing in for TOEIC Part 1 photographs.
// Kept as inline SVG (no network dependency, no stock images) so they render instantly and
// consistently, while looking closer to a clean instructional photo than a stick figure.

const SKIN = '#E8B98A'
const SKIN_DARK = '#C98F5E'
const SHIRT_BLUE = '#3B82C4'
const SHIRT_NAVY = '#2C5C8A'
const SHIRT_ORANGE = '#EB6834'
const SHIRT_AQUA = '#1BAF7A'
const SHIRT_CREAM = '#F4EFE6'
const HAIR = '#3A2E26'
const HAIR_LIGHT = '#5C4632'
const FLOOR = '#D8C3A5'
const SHADOW = 'rgba(74,54,30,0.16)'
const WALL_TOP = '#FBF1E1'
const WALL_BOTTOM = '#F1DEBD'
const INK = '#4A4844'
const METAL = '#AEB4BC'
const METAL_DARK = '#868D96'

function Person({
  x,
  shirt = SHIRT_BLUE,
  skin = SKIN,
  hair = HAIR,
  armUp = false,
  facing = 1,
}: {
  x: number
  shirt?: string
  skin?: string
  hair?: string
  armUp?: boolean
  facing?: 1 | -1
}) {
  return (
    <g transform={`translate(${x},0) scale(${facing},1)`}>
      <ellipse cx="0" cy="119" rx="19" ry="5" fill={SHADOW} />
      <rect x="-11" y="78" width="9" height="34" rx="4" fill={INK} />
      <rect x="2" y="78" width="9" height="34" rx="4" fill={INK} />
      <rect x="-13" y="108" width="14" height="7" rx="3" fill="#2B2A28" />
      <rect x="-1" y="108" width="14" height="7" rx="3" fill="#2B2A28" />
      {armUp ? (
        <rect x="9" y="28" width="9" height="32" rx="4.5" fill={shirt} transform="rotate(-42 13 32)" />
      ) : (
        <rect x="-22" y="36" width="9" height="32" rx="4.5" fill={shirt} />
      )}
      <rect x="13" y="36" width="9" height="32" rx="4.5" fill={shirt} />
      <path d="M -15 30 Q -18 58 -13 80 L 13 80 Q 18 58 15 30 Q 0 22 -15 30 Z" fill={shirt} />
      <rect x="-5" y="24" width="10" height="9" fill={skin} />
      <circle cx="0" cy="15" r="14.5" fill={skin} />
      <path d="M -14.5 13 Q -16 -5 0 -6 Q 16 -5 14.5 13 L 14.5 15 Q 0 5 -14.5 15 Z" fill={hair} />
    </g>
  )
}

function OfficeWall() {
  return (
    <>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={WALL_TOP} />
          <stop offset="100%" stopColor={WALL_BOTTOM} />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#wall)" rx="16" />
      <rect x="0" y="122" width="320" height="38" fill={FLOOR} opacity="0.7" />
    </>
  )
}

const SCENES: Record<string, JSX.Element> = {
  handshake: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <OfficeWall />
      <rect x="24" y="24" width="46" height="60" rx="4" fill="#FFFFFF" opacity="0.55" />
      <rect x="30" y="30" width="34" height="4" rx="2" fill={METAL} opacity="0.6" />
      <Person x={122} shirt={SHIRT_BLUE} hair={HAIR} />
      <Person x={198} shirt={SHIRT_ORANGE} skin={SKIN_DARK} hair={HAIR_LIGHT} facing={-1} />
      <rect x="147" y="106" width="26" height="9" rx="4.5" fill="#8A6A45" transform="rotate(-7 160 111)" />
    </svg>
  ),
  typing: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <OfficeWall />
      <rect x="255" y="20" width="40" height="55" rx="4" fill="#FFFFFF" opacity="0.5" />
      <Person x={182} shirt={SHIRT_AQUA} hair={HAIR} />
      <rect x="128" y="118" width="104" height="10" rx="4" fill="#8A6A45" />
      <rect x="140" y="96" width="80" height="24" rx="3" fill="#3A3A38" />
      <rect x="145" y="99.5" width="70" height="15" rx="2" fill={SHIRT_BLUE} opacity="0.55" />
      <rect x="150" y="120" width="60" height="7" rx="2" fill="#DCD3C3" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <defs>
        <linearGradient id="sky-truck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF3FB" />
          <stop offset="100%" stopColor="#DCEBF8" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#sky-truck)" rx="16" />
      <rect x="0" y="122" width="320" height="38" fill={FLOOR} opacity="0.7" />
      <rect x="18" y="66" width="118" height="54" rx="6" fill="#D3D2C7" />
      <rect x="18" y="46" width="52" height="30" rx="6" fill={METAL_DARK} />
      <rect x="26" y="52" width="20" height="14" rx="2" fill="#EAF3FB" opacity="0.8" />
      <circle cx="46" cy="122" r="11" fill="#2B2A28" />
      <circle cx="46" cy="122" r="4" fill={METAL} />
      <circle cx="112" cy="122" r="11" fill="#2B2A28" />
      <circle cx="112" cy="122" r="4" fill={METAL} />
      <Person x={198} shirt={SHIRT_ORANGE} armUp hair={HAIR} />
      <rect x="228" y="68" width="30" height="24" rx="2" fill="#C9A077" />
      <rect x="228" y="68" width="30" height="6" rx="2" fill="#B08D5F" />
    </svg>
  ),
  chef: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <OfficeWall />
      <rect x="86" y="88" width="148" height="16" rx="4" fill={METAL} />
      <circle cx="128" cy="84" r="15" fill={METAL_DARK} />
      <circle cx="128" cy="84" r="11" fill="#3A3A38" />
      <circle cx="184" cy="84" r="15" fill={METAL_DARK} />
      <circle cx="184" cy="84" r="11" fill="#3A3A38" />
      <path d="M124 72 q4 -10 8 0" stroke="#E6E0D2" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M132 68 q4 -12 8 0" stroke="#E6E0D2" strokeWidth="2.5" fill="none" opacity="0.6" />
      <Person x={160} shirt={SHIRT_CREAM} skin={SKIN} hair={HAIR} />
      <path d="M148 -2 Q160 -14 172 -2 L172 10 Q160 4 148 10 Z" fill="#FFFFFF" transform="translate(0,10)" />
      <rect x="144" y="20" width="32" height="10" rx="5" fill="#FFFFFF" />
    </svg>
  ),
  bus: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <defs>
        <linearGradient id="sky-bus" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9F1FC" />
          <stop offset="100%" stopColor="#DCEBF8" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" fill="url(#sky-bus)" rx="16" />
      <rect x="0" y="122" width="320" height="38" fill={FLOOR} opacity="0.7" />
      <rect x="28" y="48" width="156" height="62" rx="12" fill={SHIRT_NAVY} />
      <rect x="42" y="60" width="28" height="22" rx="3" fill="#EAF2FD" />
      <rect x="78" y="60" width="28" height="22" rx="3" fill="#EAF2FD" />
      <rect x="114" y="60" width="28" height="22" rx="3" fill="#EAF2FD" />
      <rect x="112" y="90" width="26" height="20" fill="#2B2A28" />
      <rect x="150" y="94" width="26" height="10" rx="3" fill="#F4B23C" />
      <circle cx="55" cy="114" r="11" fill="#2B2A28" />
      <circle cx="55" cy="114" r="4" fill={METAL} />
      <circle cx="160" cy="114" r="11" fill="#2B2A28" />
      <circle cx="160" cy="114" r="4" fill={METAL} />
      <Person x={230} shirt={SHIRT_AQUA} hair={HAIR} />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <OfficeWall />
      <rect x="256" y="24" width="40" height="55" rx="4" fill="#FFFFFF" opacity="0.5" />
      <rect x="146" y="66" width="78" height="48" rx="6" fill={METAL} />
      <rect x="158" y="56" width="54" height="16" rx="3" fill={METAL_DARK} />
      <rect x="158" y="106" width="54" height="9" rx="2" fill="#FCFCFB" />
      <rect x="162" y="76" width="46" height="6" rx="2" fill="#8B929B" opacity="0.6" />
      <Person x={104} shirt={SHIRT_ORANGE} armUp hair={HAIR} />
    </svg>
  ),
}

export function SceneIllustration({ id }: { id?: string }) {
  const scene = id ? SCENES[id] : undefined
  if (!scene) return null
  return <div className="rounded-xl overflow-hidden border border-sand-200">{scene}</div>
}
