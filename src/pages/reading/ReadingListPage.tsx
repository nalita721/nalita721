import { Link } from 'react-router-dom'
import { readingPassages } from '../../data/reading'
import { Card } from '../../components/ui'
import { useAuthStore } from '../../store/auth'
import { useProgressStore } from '../../store/progress'
import { isReadingPassageFree } from '../../lib/access'
import { getEffectivePathIndex, isStepUnlocked, pathStepKey, stepIndexOfContent } from '../../data/learningPath'

export default function ReadingListPage() {
  const authStatus = useAuthStore((s) => s.status)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelCefr)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Reading Practice (Part 6 / 7)</h1>
        <p className="text-stone-500 mt-1">ฝึกเติมข้อความและอ่านจับใจความจากบทความสไตล์ TOEIC (ลองฟรีได้ที่บทแรก)</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {readingPassages.map((p) => {
          const locked =
            authStatus === 'authenticated'
              ? !isStepUnlocked('reading', p.id, effectiveIndex)
              : !isReadingPassageFree(p.id)
          const isCurrent = authStatus === 'authenticated' && stepIndexOfContent('reading', p.id) === effectiveIndex
          const isPassed = pathPassedSteps.includes(pathStepKey('reading', p.id))
          return (
            <Link key={p.id} to={`/reading/${p.id}`}>
              <Card
                className={`h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer ${isCurrent ? 'ring-2 ring-brand-400' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-brand-600">Part {p.part}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {isPassed && <span title="ผ่านแล้ว">✅</span>}
                    {isCurrent && <span title="ขั้นตอนปัจจุบัน">🎯</span>}
                    {locked && <span title={authStatus === 'authenticated' ? 'ยังไม่ถึงคิว' : 'สำหรับสมาชิก'}>🔒</span>}
                  </div>
                </div>
                <h2 className="font-semibold text-stone-800 mt-1">{p.title}</h2>
                <p className="text-xs text-stone-400 mt-3">{p.questions.length} คำถาม</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
