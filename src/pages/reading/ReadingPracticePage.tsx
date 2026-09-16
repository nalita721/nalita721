import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { readingPassages } from '../../data/reading'
import { Button, Card } from '../../components/ui'
import { useProgressStore } from '../../store/progress'

export default function ReadingPracticePage() {
  const { passageId } = useParams()
  const passage = readingPassages.find((p) => p.id === passageId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!passage) return <Navigate to="/reading" replace />

  function select(questionId: string, choiceIndex: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }))
  }

  function submit() {
    if (!passage) return
    passage.questions.forEach((q) => {
      const correct = answers[q.id] === q.answerIndex
      recordAnswer('reading', correct)
    })
    setSubmitted(true)
  }

  const score = submitted
    ? passage.questions.filter((q) => answers[q.id] === q.answerIndex).length
    : 0
  const allAnswered = passage.questions.every((q) => answers[q.id] !== undefined)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link to="/reading" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-slate-800 mt-2">{passage.title}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">{passage.text}</pre>
        </Card>

        <div className="space-y-4">
          {passage.questions.map((q, qi) => (
            <Card key={q.id}>
              <p className="text-sm font-semibold text-slate-800 mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="grid gap-2">
                {q.choices.map((choice, i) => {
                  const isSelected = answers[q.id] === i
                  const isCorrect = i === q.answerIndex
                  let stateClass = 'bg-white border-slate-200 hover:border-brand-400'
                  if (submitted) {
                    if (isCorrect) stateClass = 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    else if (isSelected) stateClass = 'bg-rose-50 border-rose-400 text-rose-700'
                    else stateClass = 'bg-white border-slate-200 opacity-60'
                  } else if (isSelected) {
                    stateClass = 'bg-brand-600 border-brand-600 text-white'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => select(q.id, i)}
                      disabled={submitted}
                      className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${stateClass}`}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>
            </Card>
          ))}

          {!submitted ? (
            <Button onClick={submit} disabled={!allAnswered}>ส่งคำตอบ</Button>
          ) : (
            <Card className="text-center">
              <p className="font-semibold text-slate-800">คะแนน {score}/{passage.questions.length}</p>
              <Link to="/reading">
                <Button className="mt-3">กลับไปเลือกบทความอื่น</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
