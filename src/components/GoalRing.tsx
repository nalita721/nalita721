import { Card } from './ui'

export const GOAL_SCORE = 800
const RING_RADIUS = 40
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export function GoalRing({ percent, currentScore }: { percent: number; currentScore: number }) {
  const offset = RING_CIRCUMFERENCE - (percent / 100) * RING_CIRCUMFERENCE
  return (
    <Card className="flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          <circle cx="48" cy="48" r={RING_RADIUS} fill="none" stroke="#E8D8C8" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={RING_RADIUS}
            fill="none"
            stroke="#3B82C4"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-stone-800">{percent}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-stone-500">เป้าหมายของคุณ</p>
        <p className="font-semibold text-stone-800">TOEIC {GOAL_SCORE}+</p>
        {currentScore > 0 && <p className="text-xs text-stone-400 mt-1">คะแนนสูงสุดของคุณ {currentScore}/990</p>}
      </div>
    </Card>
  )
}
