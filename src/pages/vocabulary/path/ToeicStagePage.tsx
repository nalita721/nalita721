import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Card, EmptyState, ProgressBar } from '../../../components/ui'
import { useProgressStore } from '../../../store/progress'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../../lib/sound'
import {
  resolveGameSetContext,
  stageKey,
  STAGE_BONUS_XP,
  pickDistractors,
  blankOutTerm,
} from '../../../data/vocabularyGamePath'
import { useSetLearned } from './useSetLearned'
import type { VocabWord } from '../../../lib/types'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

interface ToeicQuestion {
  word: VocabWord
  sentence: string
  choices: string[]
}

export default function ToeicStagePage() {
  const { chapterId, setIndex: setIndexParam } = useParams()
  const learned = useSetLearned(chapterId, Number(setIndexParam))
  const completeStage = useProgressStore((s) => s.completeStage)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const reviewWord = useProgressStore((s) => s.reviewWord)

  const ctx = resolveGameSetContext(chapterId, setIndexParam)

  const questions: ToeicQuestion[] = useMemo(() => {
    if (!ctx) return []
    return shuffle(ctx.words)
      .map((word) => {
        const blanked = blankOutTerm(word.exampleEn, word.term)
        if (!blanked) return null
        const distractors = pickDistractors(ctx.chapter, word, 3)
        return { word, sentence: blanked, choices: shuffle([word.term, ...distractors.map((d) => d.term)]) }
      })
      .filter((q): q is ToeicQuestion => q !== null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx?.chapter.id, ctx?.setIndex])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (!ctx) return <Navigate to="/vocabulary" replace />
  const { chapter, setIndex: si } = ctx
  const pathTo = `/vocabulary/${chapter.id}`

  if (!learned) return <Navigate to={pathTo} replace />

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto space-y-4">
        <Link to={pathTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <EmptyState title="ยังสร้างแบบทดสอบไม่ได้" description="คำศัพท์ชุดนี้ไม่มีประโยคตัวอย่างที่เหมาะกับการเติมคำ ลองชุดอื่นดูนะ" />
      </div>
    )
  }

  const q = questions[index]
  const done = index >= questions.length

  function handleSelect(choice: string) {
    if (selected) return
    setSelected(choice)
    const correct = choice === q.word.term
    recordAnswer('vocabulary', correct)
    reviewWord(q.word.id, correct ? 4 : 1)
    if (correct) {
      setScore((s) => s + 1)
      playCorrectSound()
    } else {
      playIncorrectSound()
    }
  }

  function next() {
    setSelected(null)
    const isLast = index + 1 >= questions.length
    setIndex((i) => i + 1)
    if (isLast) {
      playCompleteSound()
      completeStage(stageKey(chapter.id, si, 5), questions.length > 0 ? score / questions.length : 0, STAGE_BONUS_XP[5])
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={pathTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">🏆 TOEIC Challenge — ชุดที่ {si + 1}</h1>
      </div>

      <ProgressBar value={index} max={questions.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">{score / questions.length >= 0.8 ? '🏆' : '📝'}</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{questions.length}</p>
          <Link to={pathTo}>
            <Button className="mt-4">กลับไปหน้าเส้นทางเกม</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-sm text-stone-500">เลือกคำที่เติมในช่องว่างให้ถูกต้อง</p>
          <p className="text-lg text-stone-800 leading-relaxed bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {q.sentence}
          </p>
          <div className="grid gap-2">
            {q.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleSelect(choice)}
                disabled={selected !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selected === null
                    ? 'bg-white border-sand-200 hover:border-brand-400'
                    : choice === q.word.term
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : choice === selected
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-white border-sand-200 opacity-60'
                }`}
              >
                {String.fromCharCode(65 + i)}. {choice}
              </button>
            ))}
          </div>
          {selected && <Button onClick={next}>ข้อถัดไป →</Button>}
        </Card>
      )}
    </div>
  )
}
