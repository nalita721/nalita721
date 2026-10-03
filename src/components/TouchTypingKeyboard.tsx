import { KEYBOARD_ROWS, fingerForChar, type FingerId } from '../lib/touchTyping'

const ROW_OFFSET = ['ml-0', 'ml-3', 'ml-6']

export function Keyboard({ activeKey }: { activeKey: string }) {
  const active = activeKey.toLowerCase()
  return (
    <div className="space-y-1.5 select-none">
      {KEYBOARD_ROWS.map((row, ri) => (
        <div key={ri} className={`flex gap-1.5 ${ROW_OFFSET[ri]}`}>
          {row.map((key) => {
            const isActive = key === active
            return (
              <div
                key={key}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center text-sm font-semibold uppercase transition ${
                  isActive
                    ? 'bg-brand-600 border-brand-600 text-white scale-110 shadow-md'
                    : 'bg-white border-sand-200 text-stone-500'
                }`}
              >
                {key === '-' ? '−' : key}
              </div>
            )
          })}
        </div>
      ))}
      <div className="flex justify-center pt-1">
        <div
          className={`h-9 w-48 rounded-lg border flex items-center justify-center text-xs font-medium transition ${
            active === ' '
              ? 'bg-brand-600 border-brand-600 text-white shadow-md'
              : 'bg-white border-sand-200 text-stone-400'
          }`}
        >
          space
        </div>
      </div>
    </div>
  )
}

// Drawn canonically as a left hand (thumb on the inner/right side); the right hand
// is the same drawing mirrored horizontally, so finger geometry only needs to live here once.
const FINGER_SHAPE = [
  { key: 'pinky', x: 32, length: 40, rotate: -14 },
  { key: 'ring', x: 56, length: 54, rotate: -5 },
  { key: 'middle', x: 80, length: 60, rotate: 4 },
  { key: 'index', x: 104, length: 50, rotate: 13 },
] as const

const BASE_Y = 64

function FingerShape({ x, length, rotate, active }: { x: number; length: number; rotate: number; active: boolean }) {
  const width = 19
  const y = BASE_Y - length
  return (
    <g transform={`rotate(${rotate} ${x} ${BASE_Y})`} className="transition-transform">
      <rect
        x={x - width / 2}
        y={y}
        width={width}
        height={length}
        rx={width / 2}
        className={`transition-colors duration-150 ${active ? 'fill-rose-400 stroke-rose-500' : 'fill-amber-100 stroke-amber-300'}`}
        strokeWidth="1.5"
      />
      {/* fingernail */}
      <rect x={x - width / 2 + 4} y={y + 6} width={width - 8} height={length * 0.3} rx={(width - 8) / 2} className={active ? 'fill-rose-300' : 'fill-amber-50'} opacity="0.8" />
    </g>
  )
}

function Hand({ activeFinger, activeThumb, mirror }: { activeFinger: FingerId | null; activeThumb: boolean; mirror?: boolean }) {
  const prefix = mirror ? 'R' : 'L'
  return (
    <svg viewBox="0 0 140 128" className="w-20 h-[4.6rem]">
      <g transform={mirror ? 'scale(-1,1) translate(-140,0)' : undefined}>
        {/* palm */}
        <path
          d="M17,70 C15,96 24,118 47,124 L95,124 C116,118 125,96 123,70 C122,58 111,52 99,52 L41,52 C29,52 18,58 17,70 Z"
          className="fill-amber-100 stroke-amber-300"
          strokeWidth="1.5"
        />
        {/* thumb (inner side) */}
        <g transform="rotate(42 108 78)">
          <rect x="98" y="72" width="26" height="16" rx="8" className={`transition-colors duration-150 ${activeThumb ? 'fill-rose-400 stroke-rose-500' : 'fill-amber-100 stroke-amber-300'}`} strokeWidth="1.5" />
          <rect x="102" y="76" width="12" height="7" rx="3.5" className={activeThumb ? 'fill-rose-300' : 'fill-amber-50'} opacity="0.8" />
        </g>
        {/* fingers */}
        {FINGER_SHAPE.map((f) => (
          <FingerShape key={f.key} x={f.x} length={f.length} rotate={f.rotate} active={activeFinger === `${prefix}-${f.key}`} />
        ))}
      </g>
    </svg>
  )
}

export function HandsDiagram({ activeKey }: { activeKey: string }) {
  const finger = fingerForChar(activeKey || ' ')
  const isThumb = finger === 'thumb'
  return (
    <div className="flex items-end justify-center gap-4">
      <Hand activeFinger={finger} activeThumb={isThumb} />
      <Hand activeFinger={finger} activeThumb={isThumb} mirror />
    </div>
  )
}
