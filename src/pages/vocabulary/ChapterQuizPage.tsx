import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import type { VocabWord } from '../../lib/types'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

interface QuizQuestion {
  word: VocabWord
  choices: VocabWord[]
}

function buildQuiz(chapterWords: VocabWord[], pool: VocabWord[]): QuizQuestion[] {
  return shuffle(chapterWords).map((word) => {
    const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)
    return { word, choices: shuffle([word, ...distractors]) }
  })
}

export default function ChapterQuizPage() {
  const { chapterId } = useParams()
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)

  const pool = useMemo(() => allWords(), [])
  const quiz = useMemo(() => (chapter ? buildQuiz(chapter.words, pool) : []), [chapter, pool])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (!chapter) return <Navigate to="/vocabulary" replace />

  const q = quiz[index]
  const done = index >= quiz.length

  function handleSelect(choiceId: string) {
    if (selected) return
    setSelected(choiceId)
    const correct = choiceId === q.word.id
    recordAnswer('vocabulary', correct)
    if (correct) {
      setScore((s) => s + 1)
      addXp(4)
    }
  }

  function next() {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={`/vocabulary/${chapter.id}`} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">แบบทดสอบท้ายบท — {chapter.titleTh}</h1>
      </div>

      <ProgressBar value={index} max={quiz.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">{score / quiz.length >= 0.8 ? '🏆' : '📝'}</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{quiz.length}</p>
          <p className="text-sm text-stone-500 mt-1">
            {score / quiz.length >= 0.8 ? 'เยี่ยมมาก! บทนี้คุณแม่นแล้ว' : 'ลองฝึก Flashcard เพิ่มแล้วกลับมาทำใหม่'}
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <Link to={`/vocabulary/${chapter.id}`}>
              <Button>กลับไปหน้าเลือกเกม</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-sm text-stone-500">เลือกความหมายที่ถูกต้องของคำนี้</p>
          <h2 className="text-2xl font-bold text-stone-800">{q.word.term}</h2>
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
                {c.meaningTh}
              </button>
            ))}
          </div>
          {selected && <Button onClick={next}>ข้อถัดไป →</Button>}
        </Card>
      )}
    </div>
  )
}
