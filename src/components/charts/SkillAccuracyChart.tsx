import { useState } from 'react'
import { SERIES_1, TEXT_MUTED, TEXT_PRIMARY, TEXT_SECONDARY } from './chartTokens'

export interface SkillAccuracyDatum {
  key: string
  label: string
  correct: number
  total: number
}

export function SkillAccuracyChart({ data }: { data: SkillAccuracyDatum[] }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="space-y-3" role="img" aria-label="กราฟแท่งแสดงความแม่นยำแยกตามทักษะ">
      {data.map((d) => {
        const pct = d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0
        const isHovered = hovered === d.key
        return (
          <div
            key={d.key}
            className="relative"
            onMouseEnter={() => setHovered(d.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span style={{ color: TEXT_SECONDARY }} className="font-medium">
                {d.label}
              </span>
              <span style={{ color: d.total > 0 ? TEXT_PRIMARY : TEXT_MUTED }} className="font-semibold tabular-nums">
                {d.total > 0 ? `${pct}%` : '—'}
              </span>
            </div>
            <div className="h-5 w-full rounded-full bg-brand-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: SERIES_1, opacity: isHovered ? 0.85 : 1 }}
              />
            </div>
            {isHovered && d.total > 0 && (
              <div
                className="absolute -top-7 left-0 rounded-md px-2 py-1 text-xs font-medium text-white shadow-sm z-10"
                style={{ backgroundColor: TEXT_PRIMARY }}
              >
                ถูก {d.correct}/{d.total} ข้อ
              </div>
            )}
            <p style={{ color: TEXT_MUTED }} className="text-[11px] mt-0.5">
              {d.total} ข้อที่ทำแล้ว
            </p>
          </div>
        )
      })}
    </div>
  )
}
