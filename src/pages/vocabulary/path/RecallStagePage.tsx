import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Card, ProgressBar } from '../../../components/ui'
import { useProgressStore } from '../../../store/progress'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../../lib/sound'
import {
  resolveGameSetContext,
  stageKey,
  STAGE_BONUS_XP,
  pickDistractors,
} from '../../../data/vocabularyGamePath'
import { useSetLearned } from './useSetLearned'
import type { VocabWord } from '../../../lib/types'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

interface RecallQuestion {
  word: VocabWord
  choices: VocabWord[]
}

export default function RecallStagePage() {
  const { chapterId, setIndex: setIndexParam } = useParams()
  const learned = useSetLearned(chapterId, Number(setIndexParam))
  const completeStage = useProgressStore((s) => s.completeStage)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const reviewWord = useProgressStore((s) => s.reviewWord)

  const ctx = resolveGameSetContext(chapterId, setIndexParam)

  const questions: RecallQuestion[] = useMemo(() => {
    if (!ctx) return []
    return shuffle(ctx.words).map((word) => ({
      word,
      choices: shuffle([word, ...pickDistractors(ctx.chapter, word, 3)]),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx?.chapter.id, ctx?.setIndex])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (!ctx) return <Navigate to="/vocabulary" replace />
  const { chapter, setIndex: si } = ctx
  const pathTo = `/vocabulary/${chapter.id}`

  if (!learned) return <Navigate to={pathTo} replace />

  const q = questions[index]
  const done = index >= questions.length

  function handleSelect(choiceId: string) {
    if (selected) return
    setSelected(choiceId)
    const correct = choiceId === q.word.id
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
      completeStage(stageKey(chapter.id, si, 4), questions.length > 0 ? score / questions.length : 0, STAGE_BONUS_XP[4])
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={pathTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">🧠 Recall Challenge — ชุดที่ {si + 1}</h1>
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
          <p className="text-sm text-stone-500">เลือกคำศัพท์ภาษาอังกฤษที่ตรงกับความหมายนี้</p>
          <h2 className="text-2xl font-bold text-stone-800">{q.word.meaningTh}</h2>
          <div className="grid gap-2">
            {q.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                disabled={selected !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selected === null
                    ? 'bg-white border-sand-200 hover:border-brand-400'
                    : c.id === q.word.id
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : c.id === selected
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-white border-sand-200 opacity-60'
                }`}
              >
                {c.term}
              </button>
            ))}
          </div>
          {selected && <Button onClick={next}>ข้อถัดไป →</Button>}
        </Card>
      )}
    </div>
  )
}
