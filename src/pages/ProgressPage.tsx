import { Link } from 'react-router-dom'
import { AlertTriangle, TrendingUp } from 'lucide-react'
import { Badge, Button, Card } from '../components/ui'
import { GoalRing } from '../components/GoalRing'
import { useProgressStore } from '../store/progress'
import { SkillAccuracyChart } from '../components/charts/SkillAccuracyChart'
import { MockScoreTrendChart } from '../components/charts/MockScoreTrendChart'
import type { StatPart } from '../lib/types'

const GOAL_SCORE = 800

const PART_LABELS: Record<StatPart, string> = {
  vocabulary: 'คำศัพท์',
  grammar: 'ไวยากรณ์',
  listening: 'การฟัง',
  reading: 'การอ่าน',
  mock: 'Mock Test',
}

const PART_LINK: Record<StatPart, string> = {
  vocabulary: '/vocabulary',
  grammar: '/grammar',
  listening: '/listening',
  reading: '/reading',
  mock: '/mock-test',
}

export default function ProgressPage() {
  const partStats = useProgressStore((s) => s.partStats)
  const mockResults = useProgressStore((s) => s.mockResults)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)

  const lastMock = mockResults[mockResults.length - 1]
  // Only Full Mock Test results count toward the best score — Mini Mock Test is too short (fewer
  // questions) to be a reliable measure. Older results saved before this field existed default to
  // counting, so past scores aren't silently dropped.
  const bestMockScore = mockResults.filter((r) => r.type !== 'mini').reduce((best, r) => Math.max(best, r.totalScore), 0)
  const currentScore = Math.max(levelTestResult?.totalScore ?? 0, bestMockScore)
  const goalPercent = Math.min(100, Math.round((currentScore / GOAL_SCORE) * 100))

  const skillKeys = (Object.keys(PART_LABELS) as StatPart[]).filter((k) => k !== 'mock')
  const skillData = skillKeys.map((key) => ({ key, label: PART_LABELS[key], correct: partStats[key].correct, total: partStats[key].total }))

  const weakPoints = skillData
    .filter((d) => d.total > 0)
    .map((d) => ({ ...d, accuracy: d.correct / d.total }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <TrendingUp size={24} className="text-brand-600" />
          ความก้าวหน้าของคุณ
        </h1>
        <p className="text-stone-500 mt-1">ภาพรวมทักษะและคะแนนที่พัฒนาไปตลอดการฝึกฝน</p>
      </div>

      <GoalRing percent={goalPercent} currentScore={currentScore} />

      <Card>
        <h2 className="font-semibold text-stone-800 mb-4">ความแม่นยำแยกตามทักษะ</h2>
        <SkillAccuracyChart data={skillData} />
      </Card>

      <Card>
        <h2 className="font-semibold text-stone-800 mb-3 flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          จุดที่ควรพัฒนาเพิ่ม
        </h2>
        {weakPoints.length === 0 ? (
          <p className="text-sm text-stone-500">ยังไม่มีข้อมูลเพียงพอ ลองฝึกฝนแต่ละทักษะก่อนเพื่อดูจุดที่ควรพัฒนา</p>
        ) : (
          <div className="space-y-2.5">
            {weakPoints.map((w) => (
              <div key={w.key} className="flex items-center justify-between gap-3 rounded-xl border border-sand-100 px-4 py-3">
                <div>
                  <p className="font-medium text-stone-800">{w.label}</p>
                  <p className="text-xs text-stone-400">ความแม่นยำ {Math.round(w.accuracy * 100)}% ({w.correct}/{w.total} ข้อ)</p>
                </div>
                <Link to={PART_LINK[w.key]}>
                  <Button variant="secondary" className="shrink-0">ฝึกเพิ่ม</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="font-semibold text-stone-800 mb-2">แนวโน้มคะแนน Mock Test</h2>
        {lastMock ? (
          <div className="flex items-baseline gap-3 mb-4">
            <p className="text-3xl font-bold text-brand-600">{lastMock.totalScore} / 990</p>
            <Badge>ล่าสุด {new Date(lastMock.date).toLocaleDateString('th-TH')}</Badge>
          </div>
        ) : (
          <p className="text-sm text-stone-500 mb-4">ยังไม่เคยทำ Mock Test ลองทำดูเพื่อประเมินระดับปัจจุบัน</p>
        )}
        <MockScoreTrendChart results={mockResults} />
        <Link to="/mock-test" className="inline-block mt-4">
          <Button variant="secondary">{lastMock ? 'ทำ Mock Test อีกครั้ง' : 'เริ่ม Mock Test'}</Button>
        </Link>
      </Card>
    </div>
  )
}
