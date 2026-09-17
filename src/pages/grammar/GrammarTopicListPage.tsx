import { Link } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Card } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { useAuthStore } from '../../store/auth'
import { CEFR_LEVELS } from '../../data/cefr'
import { isGrammarTopicFree } from '../../lib/access'
import { getEffectivePathIndex, isStepUnlocked, pathStepKey, stepIndexOfContent } from '../../data/learningPath'

const sortedTopics = [...grammarTopics].sort(
  (a, b) => CEFR_LEVELS.findIndex((l) => l.code === a.cefrLevel) - CEFR_LEVELS.findIndex((l) => l.code === b.cefrLevel),
)

export default function GrammarTopicListPage() {
  const stats = useProgressStore((s) => s.partStats.grammar)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  const authStatus = useAuthStore((s) => s.status)
  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelCefr)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Grammar Practice (Part 5 / 6)</h1>
        <p className="text-stone-500 mt-1">
          ฝึกจุดไวยากรณ์ที่ TOEIC ออกสอบซ้ำบ่อยที่สุด พร้อมคำอธิบายทุกข้อ (ลองฟรีได้ที่บทพื้นฐาน)
          {stats.total > 0 && ` • ความแม่นยำสะสม ${Math.round((stats.correct / stats.total) * 100)}%`}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTopics.map((topic) => {
          const level = CEFR_LEVELS.find((l) => l.code === topic.cefrLevel)!
          const locked =
            authStatus === 'authenticated'
              ? !isStepUnlocked('grammar', topic.id, effectiveIndex)
              : !isGrammarTopicFree(topic.id)
          const isCurrent = authStatus === 'authenticated' && stepIndexOfContent('grammar', topic.id) === effectiveIndex
          const isPassed = pathPassedSteps.includes(pathStepKey('grammar', topic.id))
          return (
            <Link key={topic.id} to={`/grammar/${topic.id}`}>
              <Card
                className={`h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer ${isCurrent ? 'ring-2 ring-brand-400' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-stone-800">{topic.titleTh}</h2>
                  <div className="flex items-center gap-1 shrink-0">
                    {isPassed && <span title="ผ่านแล้ว">✅</span>}
                    {isCurrent && <span title="ขั้นตอนปัจจุบัน">🎯</span>}
                    {locked && <span title={authStatus === 'authenticated' ? 'ยังไม่ถึงคิว' : 'สำหรับสมาชิก'}>🔒</span>}
                    <span
                      className="rounded-full text-xs font-semibold px-2 py-0.5"
                      style={{ backgroundColor: level.bgColor, color: level.color }}
                    >
                      {level.code}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-stone-500 mt-1">{topic.description}</p>
                <p className="text-xs text-stone-400 mt-3">{topic.questions.length} ข้อฝึกหัด</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
