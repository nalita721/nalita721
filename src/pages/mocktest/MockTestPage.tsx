import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MOCK_TEST_DURATION_SEC, mockTestQuestions } from '../../data/mockTest'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useCountdown } from '../../lib/useCountdown'
import { useProgressStore } from '../../store/progress'
import { speak } from '../../lib/tts'
import { toScoreBand } from '../../lib/scoreBand'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MockTestPage() {
  const [phase, setPhase] = useState<'intro' | 'running' | 'finished'>('intro')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const addMockResult = useProgressStore((s) => s.addMockResult)

  const { secondsLeft, start } = useCountdown(MOCK_TEST_DURATION_SEC, () => finish(answers))

  const q = mockTestQuestions[index]
  const total = mockTestQuestions.length

  function beginTest() {
    setPhase('running')
    setIndex(0)
    setAnswers({})
    start()
  }

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    setAnswers((prev) => ({ ...prev, [q.id]: i }))
    if (i === q.answerIndex) playCorrectSound()
    else playIncorrectSound()
    setTimeout(() => {
      setSelected(null)
      if (index + 1 >= total) {
        finish({ ...answers, [q.id]: i })
      } else {
        setIndex((idx) => idx + 1)
      }
    }, 400)
  }

  function finish(finalAnswers: Record<string, number>) {
    const listeningQs = mockTestQuestions.filter((mq) => mq.section === 'listening')
    const readingQs = mockTestQuestions.filter((mq) => mq.section === 'reading')
    const listeningCorrect = listeningQs.filter((mq) => finalAnswers[mq.id] === mq.answerIndex).length
    const readingCorrect = readingQs.filter((mq) => finalAnswers[mq.id] === mq.answerIndex).length

    const listeningScore = toScoreBand(listeningCorrect, listeningQs.length)
    const readingScore = toScoreBand(readingCorrect, readingQs.length)

    addMockResult({
      date: new Date().toISOString(),
      totalScore: listeningScore + readingScore,
      listeningScore,
      readingScore,
      durationSec: MOCK_TEST_DURATION_SEC - secondsLeft,
    })
    setPhase('finished')
    playCompleteSound()
  }

  if (phase === 'intro') {
    return (
      <Card className="max-w-xl mx-auto text-center py-10 space-y-4">
        <h1 className="text-2xl font-bold text-stone-800">Mini Mock Test</h1>
        <p className="text-stone-500">
          ข้อสอบจำลองย่อ {total} ข้อ (Listening + Reading ผสมกัน) จับเวลา {MOCK_TEST_DURATION_SEC / 60} นาที
          เพื่อประเมินคะแนนโดยประมาณและฝึกบริหารเวลา
        </p>
        <p className="text-xs text-stone-400">
          หมายเหตุ: นี่คือชุดข้อสอบตัวอย่างสำหรับฝึกซ้อม ไม่ใช่คะแนน TOEIC จริง
        </p>
        <Button onClick={beginTest}>เริ่มทำข้อสอบ</Button>
      </Card>
    )
  }

  if (phase === 'finished') {
    const results = useProgressStore.getState().mockResults
    const last = results[results.length - 1]
    return (
      <Card className="max-w-xl mx-auto text-center py-10 space-y-3">
        <p className="text-2xl">🏁</p>
        <h1 className="text-xl font-bold text-stone-800">สรุปผล Mock Test</h1>
        {last ? (
          <>
            <p className="text-3xl font-bold text-brand-600">{last.totalScore} / 990</p>
            <div className="flex justify-center gap-6 text-sm text-stone-600 mt-2">
              <span>Listening: {last.listeningScore}/495</span>
              <span>Reading: {last.readingScore}/495</span>
            </div>
          </>
        ) : (
          <p className="text-stone-500">หมดเวลาก่อนตอบครบทุกข้อ</p>
        )}
        <div className="flex gap-3 justify-center pt-4">
          <Button onClick={beginTest}>ทำอีกครั้ง</Button>
          <Link to="/dashboard">
            <Button variant="secondary">กลับหน้าแดชบอร์ด</Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">ข้อที่ {index + 1}/{total}</span>
        <span className="font-semibold text-brand-600">⏱ {formatTime(secondsLeft)}</span>
      </div>
      <ProgressBar value={index} max={total} />

      <Card className="space-y-4">
        <span className="text-xs uppercase tracking-wide text-stone-400">
          {q.section === 'listening' ? 'Listening' : 'Reading'}
        </span>

        {q.passageOrImage && (
          <div className="rounded-xl bg-sand-100 px-4 py-6 text-center text-sm text-stone-600">{q.passageOrImage}</div>
        )}

        {q.audioScript && (
          <Button variant="secondary" onClick={() => speak(q.audioScript!)}>▶️ ฟังเสียง</Button>
        )}

        {q.context && (
          <pre className="whitespace-pre-wrap font-sans text-sm text-stone-700 bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {q.context}
          </pre>
        )}

        <p className="text-stone-800 font-medium">{q.question}</p>

        <div className="grid gap-2">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                selected === i ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-sand-200 hover:border-brand-400'
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
