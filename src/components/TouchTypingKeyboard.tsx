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
// Styled as a bold flat icon (closely-packed fingers, hooked thumb) rather than an
// anatomical illustration, matching the reference the user asked for.
const FINGER_SHAPE = [
  { key: 'pinky', x: 38, length: 46, rotate: -6 },
  { key: 'ring', x: 58, length: 58, rotate: -2 },
  { key: 'middle', x: 78, length: 62, rotate: 2 },
  { key: 'index', x: 98, length: 54, rotate: 6 },
] as const

const BASE_Y = 66

function FingerShape({ x, length, rotate, active }: { x: number; length: number; rotate: number; active: boolean }) {
  const width = 20
  const y = BASE_Y - length
  return (
    <rect
      transform={`rotate(${rotate} ${x} ${BASE_Y})`}
      x={x - width / 2}
      y={y}
      width={width}
      height={length}
      rx={width / 2}
      className={`transition-colors duration-150 ${active ? 'fill-rose-500' : 'fill-amber-300'}`}
    />
  )
}

function Hand({ activeFinger, activeThumb, mirror }: { activeFinger: FingerId | null; activeThumb: boolean; mirror?: boolean }) {
  const prefix = mirror ? 'R' : 'L'
  return (
    <svg viewBox="0 0 140 130" className="w-20 h-[4.6rem]">
      <g transform={mirror ? 'scale(-1,1) translate(-140,0)' : undefined}>
        {/* palm: bold rounded block, drawn first so fingers/thumb lay cleanly on top of its base */}
        <path
          d="M14,68 C14,94 22,116 44,123 L96,123 C118,116 126,94 126,68 C126,56 115,50 103,50 L37,50 C25,50 14,56 14,68 Z"
          className="fill-amber-300"
        />
        {/* thumb: bold hooked shape */}
        <path
          d="M98,56 C118,51 136,63 134,82 C132,98 115,108 98,102 C89,99 86,89 91,80 C94,75 96,66 98,56 Z"
          className={`transition-colors duration-150 ${activeThumb ? 'fill-rose-500' : 'fill-amber-300'}`}
        />
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
