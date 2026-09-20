// Flat-style scene illustrations standing in for TOEIC Part 1 photographs.
// Kept as inline SVG (no network dependency, no stock/AI images) so they render instantly and
// consistently. A grain + vignette overlay and a muted, slightly desaturated palette push it as
// close to "photograph" as an illustration can get without actually being one.

const SKIN = '#DDAE85'
const SKIN_DARK = '#BC8B62'
const SHIRT_BLUE = '#4A72A0'
const SHIRT_NAVY = '#35526B'
const SHIRT_ORANGE = '#C97148'
const SHIRT_AQUA = '#3D8F72'
const SHIRT_CREAM = '#EDE7D9'
const HAIR = '#3A2E26'
const HAIR_LIGHT = '#5C4632'
const FLOOR = '#C6B598'
const SHADOW = 'rgba(50,38,22,0.2)'
const WALL_TOP = '#EDE4D2'
const WALL_BOTTOM = '#E1D2AF'
const INK = '#454340'
const METAL = '#A3A9B0'
const METAL_DARK = '#7C838B'

function PhotoDefs({ filterId, vignetteId }: { filterId: string; vignetteId: string }) {
  return (
    <defs>
      <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" stitchTiles="stitch" result="noise" />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.2126 0.7152 0.0722 0 0"
          result="grain"
        />
        <feComponentTransfer in="grain">
          <feFuncA type="linear" slope="0.35" intercept="0" />
        </feComponentTransfer>
      </filter>
      <radialGradient id={vignetteId} cx="50%" cy="42%" r="75%">
        <stop offset="55%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#241708" stopOpacity="0.3" />
      </radialGradient>
      <filter id={`${filterId}-blur`}>
        <feGaussianBlur stdDeviation="0.7" />
      </filter>
    </defs>
  )
}

function PhotoOverlay({ filterId, vignetteId }: { filterId: string; vignetteId: string }) {
  return (
    <>
      <rect width="320" height="160" filter={`url(#${filterId})`} style={{ mixBlendMode: 'multiply' }} />
      <rect width="320" height="160" fill={`url(#${vignetteId})`} />
    </>
  )
}

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

function OfficeWall({ blurFilterId }: { blurFilterId: string }) {
  return (
    <>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={WALL_TOP} />
        <stop offset="100%" stopColor={WALL_BOTTOM} />
      </linearGradient>
      <rect width="320" height="160" fill="url(#wall)" rx="16" filter={`url(#${blurFilterId})`} />
      <rect x="0" y="122" width="320" height="38" fill={FLOOR} opacity="0.7" />
    </>
  )
}

const SCENES: Record<string, JSX.Element> = {
  handshake: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <PhotoDefs filterId="grain-handshake" vignetteId="vig-handshake" />
      <OfficeWall blurFilterId="grain-handshake-blur" />
      <rect x="24" y="24" width="46" height="60" rx="4" fill="#FFFFFF" opacity="0.4" filter="url(#grain-handshake-blur)" />
      <rect x="30" y="30" width="34" height="4" rx="2" fill={METAL} opacity="0.5" filter="url(#grain-handshake-blur)" />
      <Person x={122} shirt={SHIRT_BLUE} hair={HAIR} />
      <Person x={198} shirt={SHIRT_ORANGE} skin={SKIN_DARK} hair={HAIR_LIGHT} facing={-1} />
      <rect x="147" y="106" width="26" height="9" rx="4.5" fill="#7A5C3A" transform="rotate(-7 160 111)" />
      <PhotoOverlay filterId="grain-handshake" vignetteId="vig-handshake" />
    </svg>
  ),
  typing: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <PhotoDefs filterId="grain-typing" vignetteId="vig-typing" />
      <OfficeWall blurFilterId="grain-typing-blur" />
      <rect x="255" y="20" width="40" height="55" rx="4" fill="#FFFFFF" opacity="0.35" filter="url(#grain-typing-blur)" />
      <Person x={182} shirt={SHIRT_AQUA} hair={HAIR} />
      <rect x="128" y="118" width="104" height="10" rx="4" fill="#7A5C3A" />
      <rect x="140" y="96" width="80" height="24" rx="3" fill="#3A3A38" />
      <rect x="145" y="99.5" width="70" height="15" rx="2" fill={SHIRT_BLUE} opacity="0.45" />
      <rect x="150" y="120" width="60" height="7" rx="2" fill="#CFC5B2" />
      <PhotoOverlay filterId="grain-typing" vignetteId="vig-typing" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <PhotoDefs filterId="grain-truck" vignetteId="vig-truck" />
      <linearGradient id="sky-truck" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DDE6ED" />
        <stop offset="100%" stopColor="#CFDCE6" />
      </linearGradient>
      <rect width="320" height="160" fill="url(#sky-truck)" rx="16" />
      <rect x="0" y="122" width="320" height="38" fill={FLOOR} opacity="0.7" />
      <rect x="18" y="66" width="118" height="54" rx="6" fill="#C4C3B9" filter="url(#grain-truck-blur)" />
      <rect x="18" y="46" width="52" height="30" rx="6" fill={METAL_DARK} filter="url(#grain-truck-blur)" />
      <rect x="26" y="52" width="20" height="14" rx="2" fill="#DDE6ED" opacity="0.7" />
      <circle cx="46" cy="122" r="11" fill="#2B2A28" />
      <circle cx="46" cy="122" r="4" fill={METAL} />
      <circle cx="112" cy="122" r="11" fill="#2B2A28" />
      <circle cx="112" cy="122" r="4" fill={METAL} />
      <Person x={198} shirt={SHIRT_ORANGE} armUp hair={HAIR} />
      <rect x="228" y="68" width="30" height="24" rx="2" fill="#B08D5F" />
      <rect x="228" y="68" width="30" height="6" rx="2" fill="#987A50" />
      <PhotoOverlay filterId="grain-truck" vignetteId="vig-truck" />
    </svg>
  ),
  chef: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <PhotoDefs filterId="grain-chef" vignetteId="vig-chef" />
      <OfficeWall blurFilterId="grain-chef-blur" />
      <rect x="86" y="88" width="148" height="16" rx="4" fill={METAL} filter="url(#grain-chef-blur)" />
      <circle cx="128" cy="84" r="15" fill={METAL_DARK} filter="url(#grain-chef-blur)" />
      <circle cx="128" cy="84" r="11" fill="#3A3A38" />
      <circle cx="184" cy="84" r="15" fill={METAL_DARK} filter="url(#grain-chef-blur)" />
      <circle cx="184" cy="84" r="11" fill="#3A3A38" />
      <path d="M124 72 q4 -10 8 0" stroke="#D8D0BE" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M132 68 q4 -12 8 0" stroke="#D8D0BE" strokeWidth="2.5" fill="none" opacity="0.5" />
      <Person x={160} shirt={SHIRT_CREAM} skin={SKIN} hair={HAIR} />
      <path d="M148 -2 Q160 -14 172 -2 L172 10 Q160 4 148 10 Z" fill="#F2EEE3" transform="translate(0,10)" />
      <rect x="144" y="20" width="32" height="10" rx="5" fill="#F2EEE3" />
      <PhotoOverlay filterId="grain-chef" vignetteId="vig-chef" />
    </svg>
  ),
  bus: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <PhotoDefs filterId="grain-bus" vignetteId="vig-bus" />
      <linearGradient id="sky-bus" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DEE7EE" />
        <stop offset="100%" stopColor="#CFDCE6" />
      </linearGradient>
      <rect width="320" height="160" fill="url(#sky-bus)" rx="16" />
      <rect x="0" y="122" width="320" height="38" fill={FLOOR} opacity="0.7" />
      <rect x="28" y="48" width="156" height="62" rx="12" fill={SHIRT_NAVY} filter="url(#grain-bus-blur)" />
      <rect x="42" y="60" width="28" height="22" rx="3" fill="#DEE7EE" />
      <rect x="78" y="60" width="28" height="22" rx="3" fill="#DEE7EE" />
      <rect x="114" y="60" width="28" height="22" rx="3" fill="#DEE7EE" />
      <rect x="112" y="90" width="26" height="20" fill="#2B2A28" />
      <rect x="150" y="94" width="26" height="10" rx="3" fill="#C99A3E" />
      <circle cx="55" cy="114" r="11" fill="#2B2A28" />
      <circle cx="55" cy="114" r="4" fill={METAL} />
      <circle cx="160" cy="114" r="11" fill="#2B2A28" />
      <circle cx="160" cy="114" r="4" fill={METAL} />
      <Person x={230} shirt={SHIRT_AQUA} hair={HAIR} />
      <PhotoOverlay filterId="grain-bus" vignetteId="vig-bus" />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 320 160" className="w-full h-40">
      <PhotoDefs filterId="grain-printer" vignetteId="vig-printer" />
      <OfficeWall blurFilterId="grain-printer-blur" />
      <rect x="256" y="24" width="40" height="55" rx="4" fill="#FFFFFF" opacity="0.35" filter="url(#grain-printer-blur)" />
      <rect x="146" y="66" width="78" height="48" rx="6" fill={METAL} />
      <rect x="158" y="56" width="54" height="16" rx="3" fill={METAL_DARK} />
      <rect x="158" y="106" width="54" height="9" rx="2" fill="#EDEBE4" />
      <rect x="162" y="76" width="46" height="6" rx="2" fill="#7C838B" opacity="0.6" />
      <Person x={104} shirt={SHIRT_ORANGE} armUp hair={HAIR} />
      <PhotoOverlay filterId="grain-printer" vignetteId="vig-printer" />
    </svg>
  ),
}

export function SceneIllustration({ id }: { id?: string }) {
  const scene = id ? SCENES[id] : undefined
  if (!scene) return null
  return <div className="rounded-xl overflow-hidden border border-sand-200">{scene}</div>
}
