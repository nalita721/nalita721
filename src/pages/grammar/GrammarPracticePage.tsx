import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'

export default function GrammarPracticePage() {
  const { topicId } = useParams()
  const topic = grammarTopics.find((t) => t.id === topicId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  if (!topic) return <Navigate to="/grammar" replace />

  const q = topic.questions[index]
  const done = index >= topic.questions.length

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return
    setSelected(choiceIndex)
    const correct = choiceIndex === q.answerIndex
    recordAnswer('grammar', correct)
    if (correct) setScore((s) => s + 1)
  }

  function next() {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link to={`/grammar/${topic.id}`} className="text-sm text-brand-600 hover:underline">← กลับไปบทเรียน</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">{topic.titleTh}</h1>
      </div>

      <ProgressBar value={index} max={topic.questions.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">📘</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{topic.questions.length}</p>
          <Link to="/grammar">
            <Button className="mt-4">กลับไปเลือกหัวข้ออื่น</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-stone-400">ข้อที่ {index + 1}/{topic.questions.length}</p>
          <p className="text-lg text-stone-800 leading-relaxed">{q.sentence}</p>
          <div className="grid gap-2">
            {q.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selected === null
                    ? 'bg-white border-sand-200 hover:border-brand-400'
                    : i === q.answerIndex
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : i === selected
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-white border-sand-200 opacity-60'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3 text-sm text-stone-700">
              💡 {q.explanation}
            </div>
          )}

          {selected !== null && <Button onClick={next}>ข้อถัดไป →</Button>}
        </Card>
      )}
    </div>
  )
}
