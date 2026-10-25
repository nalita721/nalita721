import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Check, CheckCircle2, ChevronRight, Circle, ClipboardCheck, Lock, Play } from 'lucide-react'
import { vocabChapters } from '../../data/vocabulary'
import { Card } from '../../components/ui'
import { SkillHero } from '../../components/SkillPage'
import { useProgressStore } from '../../store/progress'
import { getWordSets, isSetLearned, PRACTICE_GAMES, stageKey } from '../../data/vocabularyGamePath'
import { findStep, stepLessons } from '../../data/pathLessons'
import { pathStepKey } from '../../data/learningPath'
import { lessonStatuses, nextLessonIndex, type LessonStatus } from '../../lib/miniLesson'
import { playClickSound, playLockedSound } from '../../lib/sound'

function StatusDot({ status, n }: { status: LessonStatus; n: number }) {
  if (status === 'passed')
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white shadow-[0_3px_0] shadow-amber-600">
        <Check size={18} strokeWidth={3} />
      </span>
    )
  if (status === 'locked')
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-100 text-stone-300">
        <Lock size={16} />
      </span>
    )
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-[0_3px_0] shadow-brand-800">
      {n}
    </span>
  )
}

/**
 * One vocabulary chapter: four short word sets (each a lesson with its quiz,
 * plus optional practice games once learned) and the chapter test.
 */
export default function ChapterHubPage() {
  const { chapterId } = useParams()
  const navigate = useNavigate()
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  const srsMap = useProgressStore((s) => s.srsMap)
  const stageResults = useProgressStore((s) => s.wordPathStageResults)
  const passedLessons = useProgressStore((s) => s.passedLessons)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const lessonResume = useProgressStore((s) => s.lessonResume)
  const step = findStep('vocabulary', chapterId)
  if (!chapter || !step) return <Navigate to="/vocabulary" replace />

  const sets = getWordSets(chapter)
  const nodes = stepLessons(step)
  const stepPassed = pathPassedSteps.includes(pathStepKey('vocabulary', chapter.id))
  // the page itself is gated, so whoever reaches it may start the chapter
  const statuses = lessonStatuses(nodes, passedLessons, stepPassed, true)
  const next = nextLessonIndex(statuses)
  const allDone = statuses.every((s) => s === 'passed')
  const passedCount = statuses.filter((s) => s === 'passed').length
  const learnedCount = chapter.words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
  const test = nodes[nodes.length - 1]
  const testStatus = statuses[statuses.length - 1]

  function open(to: string, locked: boolean) {
    if (locked) {
      playLockedSound()
      return
    }
    playClickSound()
    // lessons return here instead of to the study plan
    navigate(to, { state: { from: `/vocabulary/${chapterId}` } })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <Link to="/vocabulary" className="text-sm text-brand-600 hover:underline">
        ← คำศัพท์ทุกบท
      </Link>

      <SkillHero
        emoji="📚"
        eyebrow={`คำศัพท์ TOEIC · ระดับ ${chapter.cefrLevel}`}
        title={chapter.titleTh}
        description={chapter.description}
        gradient="from-sky-500 to-brand-700"
        stats={[
          { value: `${chapter.words.length}`, label: 'คำ' },
          { value: `${sets.length} ชุด`, label: '+ ทดสอบท้ายบท' },
          { value: `${passedCount}/${nodes.length}`, label: 'ด่านย่อยที่ผ่าน' },
        ]}
      />

      {!allDone && (
        <Link
          to={nodes[next].to}
          state={{ from: `/vocabulary/${chapter.id}` }}
          className="flex items-center gap-3 rounded-2xl bg-brand-600 px-5 py-4 text-white shadow-[0_5px_0] shadow-brand-800 transition active:translate-y-1 active:shadow-none"
        >
          <Play size={22} className="shrink-0" fill="currentColor" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold opacity-80">{lessonResume[nodes[next].key] !== undefined ? 'เรียนต่อจากที่ค้างไว้' : passedCount > 0 ? 'เรียนต่อ' : 'เริ่มเรียน'}</p>
            <p className="truncate font-bold">
              {nodes[next].kind === 'test' ? '📝 ' : `ชุดที่ ${next + 1} · `}
              {nodes[next].titleTh} · ≈ {nodes[next].minutes} นาที
            </p>
          </div>
          <ChevronRight className="shrink-0" />
        </Link>
      )}

      <section className="space-y-3">
        {sets.map((words, i) => {
          const node = nodes[i]
          const status = statuses[i]
          const learned = isSetLearned(passedLessons, stageResults, pathPassedSteps, chapter.id, i)
          return (
            <Card key={node.key} className={`space-y-4 ${status === 'locked' ? 'opacity-70' : ''}`}>
              <div className="flex items-center gap-3">
                <StatusDot status={status} n={i + 1} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-stone-800">ชุดที่ {i + 1}</p>
                  <p className="text-xs text-stone-500">
                    {node.titleTh} · ⏱ ≈ {node.minutes} นาที
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => open(node.to, status === 'locked')}
                  className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition active:translate-y-0.5 ${
                    status === 'locked'
                      ? 'bg-sand-100 text-stone-400'
                      : status === 'passed'
                        ? 'border-2 border-sand-200 text-stone-600 hover:border-brand-300'
                        : 'bg-brand-600 text-white shadow-[0_3px_0] shadow-brand-800'
                  }`}
                >
                  {status === 'locked' ? 'ยังล็อก' : status === 'passed' ? 'ทบทวน' : lessonResume[node.key] !== undefined ? 'เรียนต่อ' : 'เริ่มเรียน'}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {words.map((w) => (
                  <span key={w.id} className="rounded-full bg-sand-50 px-2.5 py-1 text-xs text-stone-600">
                    {w.term}
                  </span>
                ))}
              </div>

              {learned ? (
                <div className="border-t border-sand-100 pt-3">
                  <p className="mb-2 text-xs font-semibold text-stone-400">🎮 ฝึกเพิ่ม (ไม่บังคับ)</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {PRACTICE_GAMES.map((g) => {
                      const best = stageResults[stageKey(chapter.id, i, g.stage)]?.bestScore
                      return (
                        <button
                          key={g.key}
                          type="button"
                          onClick={() => open(`/vocabulary/${chapter.id}/path/${i}/${g.key}`, false)}
                          className="flex items-center gap-2 rounded-xl border-2 border-sand-200 bg-white px-3 py-2 text-left text-xs font-semibold text-stone-700 transition hover:border-brand-300"
                        >
                          <span className="text-lg">{g.icon}</span>
                          <span className="min-w-0 flex-1">
                            {g.labelTh}
                            {best !== undefined && (
                              <span className={`block font-bold ${best >= 0.8 ? 'text-emerald-600' : 'text-amber-600'}`}>ดีที่สุด {Math.round(best * 100)}%</span>
                            )}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <p className="border-t border-sand-100 pt-3 text-xs text-stone-400">🎮 เกมฝึกเพิ่ม 4 เกม จะเปิดเมื่อเรียนชุดนี้จบ</p>
              )}
            </Card>
          )
        })}

        <button type="button" onClick={() => open(test.to, testStatus === 'locked')} className="block w-full text-left">
          <Card
            className={`flex items-center gap-4 border-2 transition ${
              testStatus === 'passed'
                ? 'border-emerald-200 bg-emerald-50'
                : testStatus === 'locked'
                  ? 'border-sand-100 opacity-70'
                  : 'border-amber-300 bg-amber-50 hover:-translate-y-0.5 hover:shadow-md'
            }`}
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${
                testStatus === 'passed' ? 'bg-emerald-500' : testStatus === 'locked' ? 'bg-sand-200 text-stone-400' : 'bg-amber-500'
              }`}
            >
              {testStatus === 'locked' ? <Lock size={20} /> : testStatus === 'passed' ? <Check size={22} strokeWidth={3} /> : <ClipboardCheck size={22} />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-stone-800">📝 {test.titleTh}</p>
              <p className="text-xs text-stone-500">
                {testStatus === 'passed'
                  ? 'ผ่านแล้ว · ทำซ้ำเพื่อทบทวนได้'
                  : testStatus === 'locked'
                    ? `เรียนครบ ${sets.length} ชุดก่อน`
                    : `ต้องได้ 70% ขึ้นไปเพื่อผ่านบทนี้ · ≈ ${test.minutes} นาที`}
              </p>
            </div>
            {testStatus !== 'locked' && <ChevronRight className="shrink-0 text-stone-300" />}
          </Card>
        </button>
      </section>

      <details className="group rounded-2xl border border-sand-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-stone-800">
          📋 รายการคำศัพท์ทั้งบท
          <span className="text-xs font-normal text-stone-500">
            จำได้แล้ว {learnedCount}/{chapter.words.length} คำ <span className="ml-1 inline-block transition group-open:rotate-90">›</span>
          </span>
        </summary>
        <div className="grid gap-x-4 border-t border-sand-100 px-3 py-2 sm:grid-cols-2">
          {chapter.words.map((w) => {
            const learned = (srsMap[w.id]?.repetitions ?? 0) > 0
            return (
              <div key={w.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                {learned ? <CheckCircle2 size={16} className="shrink-0 text-emerald-600" /> : <Circle size={16} className="shrink-0 text-sand-300" />}
                <span className="shrink-0 text-sm font-medium text-stone-700">{w.term}</span>
                <span className="truncate text-xs text-stone-400">{w.meaningTh}</span>
              </div>
            )
          })}
        </div>
      </details>
    </div>
  )
}
