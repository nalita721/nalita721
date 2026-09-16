import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Button, Card } from '../../components/ui'
import { useCountdown } from '../../lib/useCountdown'
import { useProgressStore } from '../../store/progress'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

const ROUND_SECONDS = 60

const ALL_QUESTIONS = grammarTopics.flatMap((topic) => topic.questions)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function GrammarBlitzPage() {
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)

  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [question, setQuestion] = useState(() => shuffle(ALL_QUESTIONS)[0])
  const [feedbackIndex, setFeedbackIndex] = useState<number | null>(null)

  const { secondsLeft, running, start } = useCountdown(ROUND_SECONDS, () => {})

  function startRound() {
    setScore(0)
    setWrong(0)
    nextQuestion()
    start()
  }

  function nextQuestion() {
    setQuestion(shuffle(ALL_QUESTIONS)[0])
    setFeedbackIndex(null)
  }

  function handleAnswer(choiceIndex: number) {
    if (feedbackIndex !== null) return
    const correct = choiceIndex === question.answerIndex
    setFeedbackIndex(choiceIndex)
    recordAnswer('grammar', correct)
    if (correct) {
      setScore((s) => s + 1)
      addXp(2)
      playCorrectSound()
    } else {
      setWrong((w) => w + 1)
      playIncorrectSound()
    }
    setTimeout(nextQuestion, 600)
  }

  const finished = running === false && secondsLeft === 0
  useEffect(() => {
    if (finished) playCompleteSound()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to="/games" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">Grammar Blitz</h1>
        <p className="text-sm text-stone-500 mt-1">ตอบคำถามไวยากรณ์แบบสุ่มจากทุกหัวข้อให้เร็วที่สุดใน 60 วินาที</p>
      </div>

      {!running && !finished && (
        <Card className="text-center py-10">
          <p className="text-stone-600 mb-4">ผสมคำถามไวยากรณ์ทั้ง 6 หัวข้อ พร้อมทบทวนหรือยัง?</p>
          <Button onClick={startRound}>เริ่มเกม 60 วินาที</Button>
        </Card>
      )}

      {running && question && (
        <Card className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-brand-600">⏱ {secondsLeft}s</span>
            <span className="text-stone-500">คะแนน {score} • ผิด {wrong}</span>
          </div>
          <p className="text-lg text-stone-800 leading-relaxed text-center">{question.sentence}</p>
          <div className="grid grid-cols-1 gap-2">
            {question.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={feedbackIndex !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  feedbackIndex === null
                    ? 'bg-white border-sand-200 hover:border-brand-400'
                    : i === question.answerIndex
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : i === feedbackIndex
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-white border-sand-200 opacity-60'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
        </Card>
      )}

      {finished && (
        <Card className="text-center py-12">
          <p className="text-2xl">🧠</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">หมดเวลา! ตอบถูก {score} ข้อ (ผิด {wrong})</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={startRound}>เล่นอีกครั้ง</Button>
            <Link to="/games">
              <Button variant="secondary">กลับไปหน้าเกม</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
