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

const LEFT_FINGERS: { id: FingerId; height: number }[] = [
  { id: 'L-pinky', height: 34 },
  { id: 'L-ring', height: 44 },
  { id: 'L-middle', height: 50 },
  { id: 'L-index', height: 42 },
]
const RIGHT_FINGERS: { id: FingerId; height: number }[] = [
  { id: 'R-index', height: 42 },
  { id: 'R-middle', height: 50 },
  { id: 'R-ring', height: 44 },
  { id: 'R-pinky', height: 34 },
]

function Hand({ fingers, activeFinger, activeThumb, flip }: { fingers: typeof LEFT_FINGERS; activeFinger: FingerId | null; activeThumb: boolean; flip?: boolean }) {
  return (
    <svg viewBox="0 0 120 90" className="w-20 h-16">
      {/* palm */}
      <rect x="10" y="50" width="100" height="34" rx="16" className="fill-amber-100 stroke-amber-300" strokeWidth="1.5" />
      {/* thumb */}
      <rect
        x={flip ? '78' : '12'}
        y="58"
        width="20"
        height="13"
        rx="6.5"
        className={`stroke-amber-300 transition-colors ${activeThumb ? 'fill-rose-400' : 'fill-amber-50'}`}
        strokeWidth="1.5"
        transform={flip ? 'rotate(25 88 64)' : 'rotate(-25 22 64)'}
      />
      {/* fingers */}
      {fingers.map((f, i) => {
        const x = 18 + i * 22
        const isActive = f.id === activeFinger
        return (
          <rect
            key={f.id}
            x={x}
            y={55 - f.height}
            width="16"
            height={f.height}
            rx="8"
            className={`stroke-amber-300 transition-colors ${isActive ? 'fill-rose-400' : 'fill-amber-50'}`}
            strokeWidth="1.5"
          />
        )
      })}
    </svg>
  )
}

export function HandsDiagram({ activeKey }: { activeKey: string }) {
  const finger = fingerForChar(activeKey || ' ')
  const isThumb = finger === 'thumb'
  return (
    <div className="flex items-end justify-center gap-6">
      <Hand fingers={LEFT_FINGERS} activeFinger={finger} activeThumb={isThumb} />
      <Hand fingers={RIGHT_FINGERS} activeFinger={finger} activeThumb={isThumb} flip />
    </div>
  )
}
