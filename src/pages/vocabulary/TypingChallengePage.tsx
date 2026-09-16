import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function TypingChallengePage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const backTo = isGlobal ? '/games' : `/vocabulary/${chapterId}`
  const title = isGlobal ? 'ทุกบท' : chapter?.titleTh ?? ''

  const words = useMemo(() => shuffle(isGlobal ? allWords() : chapter?.words ?? []), [chapter, isGlobal])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />

  const word = words[index]
  const done = index >= words.length

  function checkAnswer() {
    if (!word) return
    const correct = input.trim().toLowerCase() === word.term.toLowerCase()
    setFeedback(correct ? 'correct' : 'wrong')
    recordAnswer('vocabulary', correct)
    if (correct) setScore((s) => s + 1)
  }

  function next() {
    setInput('')
    setFeedback(null)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">Typing Challenge — {title}</h1>
      </div>

      <ProgressBar value={index} max={words.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">⌨️</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">ทำถูก {score}/{words.length} คำ</p>
          <Link to={backTo}>
            <Button className="mt-4">กลับไปหน้าเลือกเกม</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-sm text-stone-500">พิมพ์คำศัพท์ภาษาอังกฤษที่ตรงกับความหมายนี้</p>
          <p className="text-xl font-semibold text-stone-800">{word.meaningTh}</p>
          <p className="text-xs text-stone-400">({word.pos})</p>

          <input
            autoFocus
            value={input}
            disabled={feedback !== null}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && feedback === null && checkAnswer()}
            placeholder="พิมพ์คำตอบแล้วกด Enter"
            className="w-full rounded-xl border border-sand-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />

          {feedback && (
            <div className={feedback === 'correct' ? 'text-emerald-600' : 'text-rose-600'}>
              {feedback === 'correct' ? '✅ ถูกต้อง!' : `❌ ผิด คำตอบคือ "${word.term}"`}
            </div>
          )}

          <div className="flex gap-3">
            {feedback === null ? (
              <Button onClick={checkAnswer} disabled={!input.trim()}>ตรวจคำตอบ</Button>
            ) : (
              <Button onClick={next}>ข้อถัดไป →</Button>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
