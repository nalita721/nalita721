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
// Styled after the 🤚 "raised back of hand" emoji: straight, closely-packed fingers,
// a short rounded thumb, and a simple two-tone palm for a bit of depth.
const FINGER_SHAPE = [
  { key: 'pinky', x: 40, length: 44, rotate: -3 },
  { key: 'ring', x: 59, length: 54, rotate: -1 },
  { key: 'middle', x: 78, length: 58, rotate: 1 },
  { key: 'index', x: 97, length: 52, rotate: 3 },
] as const

const BASE_Y = 66

function FingerShape({ x, length, rotate, active }: { x: number; length: number; rotate: number; active: boolean }) {
  const width = 21
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
        {/* palm: rounded oval block, drawn first so fingers/thumb lay cleanly on top of its base */}
        <path
          d="M16,66 C16,92 24,116 48,124 L92,124 C116,116 124,92 124,66 C124,54 113,48 100,48 L40,48 C27,48 16,54 16,66 Z"
          className="fill-amber-300"
        />
        {/* subtle center crease for a little emoji-style dimension */}
        <path d="M70,52 C66,75 66,100 70,122" className="stroke-amber-400" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
        {/* thumb: short rounded shape, low on the inner side */}
        <rect
          x="92"
          y="76"
          width="34"
          height="22"
          rx="11"
          transform="rotate(48 92 87)"
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
