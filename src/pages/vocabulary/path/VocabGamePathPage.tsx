import { Link, Navigate, useParams } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { vocabChapters } from '../../../data/vocabulary'
import { Card } from '../../../components/ui'
import { useProgressStore } from '../../../store/progress'
import {
  getWordSets,
  isSetUnlocked,
  isStagePassed,
  isStageUnlocked,
  STAGE_DEFS,
  stageKey,
} from '../../../data/vocabularyGamePath'

type StageStatus = 'locked' | 'available' | 'inProgress' | 'completed'

export default function VocabGamePathPage() {
  const { chapterId } = useParams()
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  const results = useProgressStore((s) => s.wordPathStageResults)
  if (!chapter) return <Navigate to="/vocabulary" replace />

  const sets = getWordSets(chapter)

  return (
    <div className="space-y-6">
      <div>
        <Link to={`/vocabulary/${chapter.id}`} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">🗺️ เส้นทางเกมคำศัพท์ — {chapter.titleTh}</h1>
        <p className="text-stone-500 mt-1">
          เรียนรู้คำศัพท์ทีละ 10 คำ ผ่าน 5 ด่าน ปลดล็อกด่านถัดไปเมื่อทำคะแนนได้ตั้งแต่ 80% ขึ้นไป
        </p>
      </div>

      <div className="space-y-4">
        {sets.map((setWords, setIndex) => {
          const unlocked = isSetUnlocked(results, chapter.id, setIndex)
          const from = setIndex * setWords.length + 1
          const to = setIndex * setWords.length + setWords.length
          const setPassed = isStagePassed(results, chapter.id, setIndex, 5)

          return (
            <Card key={setIndex} className={!unlocked ? 'opacity-60' : ''}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-semibold text-stone-800">
                    ชุดที่ {setIndex + 1} <span className="text-xs text-stone-400 font-normal">(คำที่ {from}-{to})</span>
                  </h2>
                </div>
                {setPassed && <span className="text-xs font-semibold text-emerald-600">✅ เรียนจบชุดนี้แล้ว</span>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STAGE_DEFS.map((def) => {
                  const stageUnlocked = unlocked && isStageUnlocked(results, chapter.id, setIndex, def.stage)
                  const result = results[stageKey(chapter.id, setIndex, def.stage)]
                  const status: StageStatus = !stageUnlocked
                    ? 'locked'
                    : result?.passed
                      ? 'completed'
                      : result && result.attempts > 0
                        ? 'inProgress'
                        : 'available'

                  const statusStyles: Record<StageStatus, string> = {
                    locked: 'bg-sand-50 border-sand-200 text-stone-400',
                    available: 'bg-white border-sand-200 text-stone-700 hover:border-brand-400',
                    inProgress: 'bg-amber-50 border-amber-300 text-amber-700 hover:border-amber-400',
                    completed: 'bg-emerald-50 border-emerald-300 text-emerald-700',
                  }

                  const body = (
                    <div className={`rounded-2xl border px-3 py-4 text-center transition ${statusStyles[status]}`}>
                      <div className="text-2xl">{status === 'locked' ? <Lock size={20} className="mx-auto" /> : def.icon}</div>
                      <p className="text-xs font-semibold mt-2 leading-tight">{def.label}</p>
                      {result && (
                        <p className="text-[10px] mt-1 opacity-75">
                          {status === 'completed' ? '✓ ผ่านแล้ว' : `ดีที่สุด ${Math.round(result.bestScore * 100)}%`}
                        </p>
                      )}
                    </div>
                  )

                  return stageUnlocked ? (
                    <Link key={def.stage} to={`/vocabulary/${chapter.id}/path/${setIndex}/${def.key}`}>
                      {body}
                    </Link>
                  ) : (
                    <div key={def.stage}>{body}</div>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
