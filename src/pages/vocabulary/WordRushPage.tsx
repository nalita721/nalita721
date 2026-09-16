import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { Button, Card } from '../../components/ui'
import { useCountdown } from '../../lib/useCountdown'
import { useProgressStore } from '../../store/progress'
import type { VocabWord } from '../../lib/types'

const ROUND_SECONDS = 60

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildQuestion(word: VocabWord, pool: VocabWord[]) {
  const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)
  const choices = shuffle([word, ...distractors])
  return { word, choices }
}

export default function WordRushPage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)

  const pool = useMemo(() => allWords(), [])
  const sourceWords = isGlobal ? pool : chapter?.words
  const backTo = isGlobal ? '/games' : `/vocabulary/${chapterId}`
  const title = isGlobal ? 'ทุกบท' : chapter?.titleTh ?? ''

  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [question, setQuestion] = useState(() => (sourceWords ? buildQuestion(shuffle(sourceWords)[0], pool) : null))
  const [feedbackId, setFeedbackId] = useState<string | null>(null)

  const { secondsLeft, running, start } = useCountdown(ROUND_SECONDS, () => {})

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />

  function startRound() {
    setScore(0)
    setWrong(0)
    nextQuestion()
    start()
  }

  function nextQuestion() {
    const word = shuffle(sourceWords!)[0]
    setQuestion(buildQuestion(word, pool))
    setFeedbackId(null)
  }

  function handleAnswer(choiceId: string) {
    if (!question || feedbackId) return
    const correct = choiceId === question.word.id
    setFeedbackId(choiceId)
    recordAnswer('vocabulary', correct)
    if (correct) {
      setScore((s) => s + 1)
      addXp(2)
    } else {
      setWrong((w) => w + 1)
    }
    setTimeout(nextQuestion, 500)
  }

  const finished = running === false && secondsLeft === 0

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">Word Rush — {title}</h1>
        <p className="text-sm text-stone-500 mt-1">ตอบให้เร็วและแม่นก่อนเวลาหมด 60 วินาที</p>
      </div>

      {!running && !finished && (
        <Card className="text-center py-10">
          <p className="text-stone-600 mb-4">เลือกความหมายที่ตรงกับคำศัพท์ให้เร็วที่สุด!</p>
          <Button onClick={startRound}>เริ่มเกม 60 วินาที</Button>
        </Card>
      )}

      {running && question && (
        <Card className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-brand-600">⏱ {secondsLeft}s</span>
            <span className="text-stone-500">คะแนน {score} • ผิด {wrong}</span>
          </div>
          <h2 className="text-2xl font-bold text-center text-stone-800">{question.word.term}</h2>
          <div className="grid grid-cols-1 gap-2">
            {question.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => handleAnswer(c.id)}
                disabled={feedbackId !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  feedbackId === null
                    ? 'bg-white border-sand-200 hover:border-brand-400'
                    : c.id === question.word.id
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : c.id === feedbackId
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-white border-sand-200 opacity-60'
                }`}
              >
                {c.meaningTh}
              </button>
            ))}
          </div>
        </Card>
      )}

      {finished && (
        <Card className="text-center py-12">
          <p className="text-2xl">⚡</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">หมดเวลา! ตอบถูก {score} ข้อ (ผิด {wrong})</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={startRound}>เล่นอีกครั้ง</Button>
            <Link to={backTo}>
              <Button variant="secondary">กลับไปหน้าเลือกเกม</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
