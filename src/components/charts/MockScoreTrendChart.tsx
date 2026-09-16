import { useState } from 'react'
import { BASELINE, GRIDLINE, SERIES_1, SERIES_2, TEXT_MUTED, TEXT_PRIMARY, TEXT_SECONDARY } from './chartTokens'
import type { MockTestResult } from '../../lib/types'

const WIDTH = 560
const HEIGHT = 200
const PAD_LEFT = 36
const PAD_RIGHT = 12
const PAD_TOP = 12
const PAD_BOTTOM = 24
const Y_MAX = 500
const TICKS = [0, 100, 200, 300, 400, 500]

function scaleX(i: number, count: number) {
  if (count <= 1) return PAD_LEFT + (WIDTH - PAD_LEFT - PAD_RIGHT) / 2
  return PAD_LEFT + (i / (count - 1)) * (WIDTH - PAD_LEFT - PAD_RIGHT)
}

function scaleY(v: number) {
  const usable = HEIGHT - PAD_TOP - PAD_BOTTOM
  return PAD_TOP + usable - (v / Y_MAX) * usable
}

function linePath(values: number[]) {
  return values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i, values.length).toFixed(1)} ${scaleY(v).toFixed(1)}`).join(' ')
}

export function MockScoreTrendChart({ results }: { results: MockTestResult[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const listening = results.map((r) => r.listeningScore)
  const reading = results.map((r) => r.readingScore)
  const count = results.length

  function handleMove(e: React.MouseEvent<SVGRectElement>) {
    if (count === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * WIDTH
    let nearest = 0
    let best = Infinity
    for (let i = 0; i < count; i++) {
      const d = Math.abs(scaleX(i, count) - px)
      if (d < best) {
        best = d
        nearest = i
      }
    }
    setHoverIndex(nearest)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-2 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SERIES_1 }} />
          <span style={{ color: TEXT_SECONDARY }}>Listening</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SERIES_2 }} />
          <span style={{ color: TEXT_SECONDARY }}>Reading</span>
        </span>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="กราฟเส้นแสดงคะแนน Mock Test ย้อนหลัง">
        {TICKS.map((t) => (
          <g key={t}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={scaleY(t)}
              y2={scaleY(t)}
              stroke={t === 0 ? BASELINE : GRIDLINE}
              strokeWidth={1}
            />
            <text x={PAD_LEFT - 6} y={scaleY(t) + 3} textAnchor="end" fontSize="9" fill={TEXT_MUTED}>
              {t}
            </text>
          </g>
        ))}

        {count > 0 && (
          <>
            <path d={linePath(listening)} fill="none" stroke={SERIES_1} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d={linePath(reading)} fill="none" stroke={SERIES_2} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

            <circle cx={scaleX(count - 1, count)} cy={scaleY(listening[count - 1])} r={5} fill={SERIES_1} stroke="#fcfcfb" strokeWidth={2} />
            <circle cx={scaleX(count - 1, count)} cy={scaleY(reading[count - 1])} r={5} fill={SERIES_2} stroke="#fcfcfb" strokeWidth={2} />

            {hoverIndex !== null && (
              <>
                <line
                  x1={scaleX(hoverIndex, count)}
                  x2={scaleX(hoverIndex, count)}
                  y1={PAD_TOP}
                  y2={HEIGHT - PAD_BOTTOM}
                  stroke={BASELINE}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
                <circle cx={scaleX(hoverIndex, count)} cy={scaleY(listening[hoverIndex])} r={4} fill={SERIES_1} stroke="#fcfcfb" strokeWidth={2} />
                <circle cx={scaleX(hoverIndex, count)} cy={scaleY(reading[hoverIndex])} r={4} fill={SERIES_2} stroke="#fcfcfb" strokeWidth={2} />
              </>
            )}

            <rect
              x={PAD_LEFT}
              y={PAD_TOP}
              width={WIDTH - PAD_LEFT - PAD_RIGHT}
              height={HEIGHT - PAD_TOP - PAD_BOTTOM}
              fill="transparent"
              onMouseMove={handleMove}
              onMouseLeave={() => setHoverIndex(null)}
            />
          </>
        )}
      </svg>

      {count === 0 && (
        <p className="text-sm text-center py-6" style={{ color: TEXT_MUTED }}>
          ยังไม่มีข้อมูล Mock Test — ลองทำสักครั้งเพื่อเริ่มติดตามคะแนน
        </p>
      )}

      {hoverIndex !== null && count > 0 && (
        <div className="mt-2 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-xs" style={{ color: TEXT_PRIMARY }}>
          <span className="font-semibold">ครั้งที่ {hoverIndex + 1}</span>
          <span className="mx-2" style={{ color: TEXT_MUTED }}>
            {new Date(results[hoverIndex].date).toLocaleDateString('th-TH')}
          </span>
          <span style={{ color: SERIES_1 }}>Listening {listening[hoverIndex]}</span>
          <span className="mx-1.5">·</span>
          <span style={{ color: SERIES_2 }}>Reading {reading[hoverIndex]}</span>
        </div>
      )}
    </div>
  )
}
