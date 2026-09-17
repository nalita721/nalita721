import { Link } from 'react-router-dom'
import { vocabChapters } from '../../data/vocabulary'
import { Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { useAuthStore } from '../../store/auth'
import { CEFR_LEVELS } from '../../data/cefr'
import { isVocabChapterFree } from '../../lib/access'
import { getEffectivePathIndex, isStepUnlocked, pathStepKey, stepIndexOfContent } from '../../data/learningPath'

const sortedChapters = [...vocabChapters].sort(
  (a, b) => CEFR_LEVELS.findIndex((l) => l.code === a.cefrLevel) - CEFR_LEVELS.findIndex((l) => l.code === b.cefrLevel),
)

export default function ChapterListPage() {
  const srsMap = useProgressStore((s) => s.srsMap)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  const authStatus = useAuthStore((s) => s.status)
  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelCefr)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">คลังคำศัพท์ TOEIC</h1>
        <p className="text-stone-500 mt-1">เลือกบทที่ต้องการฝึก แต่ละบทมีคำศัพท์ตามหัวข้อที่ออกสอบบ่อย (ลองฟรีได้ที่บทที่ 1)</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedChapters.map((chapter) => {
          const learned = chapter.words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
          const level = CEFR_LEVELS.find((l) => l.code === chapter.cefrLevel)!
          const locked =
            authStatus === 'authenticated'
              ? !isStepUnlocked('vocabulary', chapter.id, effectiveIndex)
              : !isVocabChapterFree(chapter.id)
          const isCurrent = authStatus === 'authenticated' && stepIndexOfContent('vocabulary', chapter.id) === effectiveIndex
          const isPassed = pathPassedSteps.includes(pathStepKey('vocabulary', chapter.id))
          return (
            <Link key={chapter.id} to={`/vocabulary/${chapter.id}`}>
              <Card
                className={`h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer ${isCurrent ? 'ring-2 ring-brand-400' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-stone-800">{chapter.titleTh}</h2>
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
                <p className="text-sm text-stone-500 mt-1">{chapter.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>ความคืบหน้า</span>
                    <span>{learned}/{chapter.words.length} คำ</span>
                  </div>
                  <ProgressBar value={learned} max={chapter.words.length} />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
