import { useState } from 'react'
import { Link } from 'react-router-dom'
import { iqTestQuestions } from '../../data/iqTest'
import { Button, Card, ProgressBar } from '../../components/ui'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

export default function IQTestQuizPage() {
  const [phase, setPhase] = useState<'intro' | 'running' | 'finished'>('intro')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [score, setScore] = useState(0)
  const [showReview, setShowReview] = useState(false)

  const total = iqTestQuestions.length
  const q = iqTestQuestions[index]
  const done = phase === 'finished'

  function beginTest() {
    setPhase('running')
    setIndex(0)
    setSelected(null)
    setAnswers({})
    setScore(0)
    setShowReview(false)
  }

  function handleSelect(choiceIndex: number) {
    if (selected !== null) return
    setSelected(choiceIndex)
    setAnswers((prev) => ({ ...prev, [q.id]: choiceIndex }))
    const correct = choiceIndex === q.answerIndex
    if (correct) {
      setScore((s) => s + 1)
      playCorrectSound()
    } else {
      playIncorrectSound()
    }
  }

  function next() {
    setSelected(null)
    const isLast = index + 1 >= total
    if (isLast) {
      setPhase('finished')
      playCompleteSound()
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (phase === 'intro') {
    return (
      <Card className="max-w-xl mx-auto text-center py-10 space-y-4">
        <h1 className="text-2xl font-bold text-stone-800">IQ Test — แบบทดสอบจากเอกสาร</h1>
        <p className="text-stone-500">
          แบบทดสอบการอ่านป้ายประกาศและสถานการณ์ภาษาอังกฤษ {total} ข้อ ถอดความจากเอกสารต้นฉบับ
        </p>
        <p className="text-xs text-stone-400">แนะนำให้ทบทวนคำศัพท์ก่อนทำแบบทดสอบ</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={beginTest}>เริ่มทำแบบทดสอบ</Button>
          <Link to="/iq-test/vocab">
            <Button variant="secondary">ทบทวนคำศัพท์ก่อน</Button>
          </Link>
        </div>
      </Card>
    )
  }

  if (done) {
    return (
      <div className={`mx-auto space-y-4 ${showReview ? 'max-w-2xl' : 'max-w-xl'}`}>
        <Card className="text-center py-10 space-y-3">
          <p className="text-2xl">{score / total >= 0.8 ? '🏆' : '📝'}</p>
          <h1 className="text-xl font-bold text-stone-800">สรุปผล IQ Test</h1>
          <p className="text-3xl font-bold text-brand-600">{score} / {total}</p>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button onClick={beginTest}>ทำอีกครั้ง</Button>
            <Button variant="secondary" onClick={() => setShowReview((v) => !v)}>
              {showReview ? 'ซ่อนเฉลย' : '📋 ดูเฉลย'}
            </Button>
            <Link to="/iq-test">
              <Button variant="secondary">กลับหน้า IQ Test</Button>
            </Link>
          </div>
        </Card>

        {showReview && (
          <div className="space-y-3">
            {iqTestQuestions.map((question, qi) => {
              const userAnswer = answers[question.id]
              return (
                <Card key={question.id}>
                  <p className="text-xs text-stone-400 mb-2">ข้อ {qi + 1}</p>
                  {question.context && (
                    <pre className="whitespace-pre-wrap font-sans text-xs text-stone-600 bg-sand-50 rounded-xl border border-sand-200 px-3 py-2 mb-2">
                      {question.contextLabel && <span className="block font-semibold text-stone-700 mb-1">{question.contextLabel}</span>}
                      {question.context}
                    </pre>
                  )}
                  {question.situation && (
                    <p className="text-xs text-stone-600 bg-sand-50 rounded-xl border border-sand-200 px-3 py-2 mb-2 whitespace-pre-wrap">
                      {question.situation}
                    </p>
                  )}
                  <p className="text-sm font-medium text-stone-800 mb-2">{question.question}</p>
                  <div className="space-y-1.5">
                    {question.choices.map((choice, ci) => {
                      const isCorrect = ci === question.answerIndex
                      const isUserWrong = ci === userAnswer && !isCorrect
                      return (
                        <p
                          key={ci}
                          className={`text-sm rounded-lg px-3 py-1.5 ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-700 font-medium'
                              : isUserWrong
                                ? 'bg-rose-50 text-rose-700'
                                : 'text-stone-500'
                          }`}
                        >
                          {String.fromCharCode(97 + ci)}. {choice}
                          {isCorrect && ' ✓'}
                          {isUserWrong && ' (คำตอบของคุณ)'}
                        </p>
                      )
                    })}
                    {userAnswer === undefined && <p className="text-xs text-stone-400 italic">ไม่ได้ตอบ</p>}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to="/iq-test" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-xl font-bold text-stone-800">IQ Test</h1>
          <span className="text-sm text-stone-500">ข้อที่ {index + 1}/{total}</span>
        </div>
      </div>

      <ProgressBar value={index} max={total} />

      <Card className="space-y-4">
        {q.context && (
          <pre className="whitespace-pre-wrap font-sans text-sm text-stone-700 bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {q.contextLabel && <span className="block font-semibold text-brand-600 mb-1">{q.contextLabel}</span>}
            {q.context}
          </pre>
        )}

        {q.situation && (
          <p className="text-sm text-stone-700 bg-sand-50 rounded-xl border border-sand-200 px-4 py-3 whitespace-pre-wrap">
            {q.situation}
          </p>
        )}

        <p className="text-stone-800 font-medium">{q.question}</p>

        <div className="grid gap-2">
          {q.choices.map((choice, i) => {
            const isSelected = selected === i
            const isCorrect = i === q.answerIndex
            let className = 'bg-white border-sand-200 hover:border-brand-400'
            if (selected !== null) {
              if (isCorrect) className = 'bg-emerald-50 border-emerald-400 text-emerald-700'
              else if (isSelected) className = 'bg-rose-50 border-rose-400 text-rose-700'
              else className = 'bg-white border-sand-200 opacity-60'
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${className}`}
              >
                {String.fromCharCode(97 + i)}. {choice}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <Button onClick={next} className="w-full justify-center">
            {index + 1 >= total ? 'ดูผลคะแนน' : 'ข้อถัดไป →'}
          </Button>
        )}
      </Card>
    </div>
  )
}
