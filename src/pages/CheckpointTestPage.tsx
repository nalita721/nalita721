import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Card, ProgressBar } from '../components/ui'
import { useProgressStore } from '../store/progress'
import { speak } from '../lib/tts'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../lib/sound'
import { PASS_THRESHOLD, PATH_UNITS } from '../data/learningPath'
import { buildCheckpointTest, checkpointDurationSec } from '../data/checkpointTest'
import { useCountdown } from '../lib/useCountdown'
import { CEFR_LEVELS } from '../data/cefr'
import type { CefrCode } from '../lib/types'

const PASS_BONUS_XP = 40

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function CheckpointTestPage() {
  const { level } = useParams()
  const unit = PATH_UNITS.find((u) => u.cefrLevel === level)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)
  const passStep = useProgressStore((s) => s.passStep)

  const [questions, setQuestions] = useState(() => buildCheckpointTest(level as CefrCode))
  const [phase, setPhase] = useState<'intro' | 'running' | 'finished'>('intro')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showReview, setShowReview] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const finishedRef = useRef(false)
  const durationSec = checkpointDurationSec(questions)
  const { secondsLeft, start, stop } = useCountdown(durationSec, () => {
    setTimedOut(true)
    finish(answers)
  })

  if (!unit || questions.length === 0) return <Navigate to="/study-plan" replace />

  const cefr = CEFR_LEVELS.find((l) => l.code === unit.cefrLevel)!
  const q = questions[index]
  const total = questions.length
  const score = questions.filter((mq) => answers[mq.id] === mq.answerIndex).length
  const passed = score / total >= PASS_THRESHOLD

  function begin() {
    if (phase === 'finished') setQuestions(buildCheckpointTest(level as CefrCode))
    setPhase('running')
    setIndex(0)
    setAnswers({})
    setShowReview(false)
    setTimedOut(false)
    finishedRef.current = false
    start()
  }

  function finish(finalAnswers: Record<string, number>) {
    // the timer can expire while an answer's feedback delay is still pending
    if (finishedRef.current) return
    finishedRef.current = true
    stop()
    setPhase('finished')
    playCompleteSound()
    const finalScore = questions.filter((mq) => finalAnswers[mq.id] === mq.answerIndex).length
    if (finalScore / total >= PASS_THRESHOLD) {
      passStep('checkpoint', unit!.cefrLevel)
      addXp(PASS_BONUS_XP)
    }
  }

  function advance(nextAnswers: Record<string, number>) {
    if (index + 1 < total) setIndex((idx) => idx + 1)
    else finish(nextAnswers)
  }

  function skip() {
    if (selected !== null) return
    advance(answers)
  }

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    const correct = i === q.answerIndex
    const nextAnswers = { ...answers, [q.id]: i }
    setAnswers(nextAnswers)
    recordAnswer(q.section, correct)
    if (correct) playCorrectSound()
    else playIncorrectSound()
    setTimeout(() => {
      setSelected(null)
      advance(nextAnswers)
    }, 500)
  }

  if (phase === 'intro') {
    return (
      <Card className="max-w-xl mx-auto text-center py-10 space-y-4">
        <p className="text-4xl">🏆</p>
        <h1 className="text-2xl font-bold text-stone-800">ฝึกสอบ TOEIC ท้ายหน่วย {cefr.code}</h1>
        <p className="text-stone-500">
          ข้อสอบแนว TOEIC {total} ข้อ (Listening + Reading) จากเนื้อหาที่เรียนในหน่วย "{cefr.nameTh}"
          — ต้องได้ {Math.round(PASS_THRESHOLD * 100)}% ขึ้นไปเพื่อปลดล็อกหน่วยถัดไป
        </p>
        <p className="text-sm font-semibold text-brand-600">
          ⏱ จับเวลา {durationSec / 60} นาที — Reading ประมาณข้อละ 45 วินาที เท่ากับจังหวะข้อสอบจริง
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={begin}>เริ่มทำข้อสอบ</Button>
          <Link to="/study-plan">
            <Button variant="secondary">กลับแผนการเรียน</Button>
          </Link>
        </div>
      </Card>
    )
  }

  if (phase === 'finished') {
    return (
      <div className={`mx-auto space-y-4 ${showReview ? 'max-w-2xl' : 'max-w-xl'}`}>
        <Card className="text-center py-10 space-y-3">
          <p className="text-4xl">{passed ? '🎉' : '📝'}</p>
          <h1 className="text-xl font-bold text-stone-800">
            {passed ? `ผ่านหน่วย ${cefr.code} แล้ว!` : 'ยังไม่ผ่าน ลองอีกครั้งนะ'}
          </h1>
          {timedOut && <p className="text-sm text-rose-600">⏱ หมดเวลา — ข้อที่ยังไม่ได้ตอบนับเป็นผิด</p>}
          <p className="text-3xl font-bold text-brand-600">
            {score} / {total}
          </p>
          <p className="text-sm text-stone-500">
            {passed
              ? `ได้รับ +${PASS_BONUS_XP} XP และปลดล็อกหน่วยถัดไปแล้ว`
              : `ต้องได้อย่างน้อย ${Math.ceil(total * PASS_THRESHOLD)} ข้อ — ทบทวนบทเรียนในหน่วยนี้แล้วกลับมาสอบใหม่ได้`}
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-4">
            {passed ? (
              <Link to="/study-plan">
                <Button>ไปต่อ →</Button>
              </Link>
            ) : (
              <Button onClick={begin}>สอบอีกครั้ง</Button>
            )}
            <Button variant="secondary" onClick={() => setShowReview((v) => !v)}>
              {showReview ? 'ซ่อนเฉลย' : '📋 ดูเฉลย'}
            </Button>
          </div>
        </Card>

        {showReview &&
          questions.map((mq, i) => {
            const userAnswer = answers[mq.id]
            return (
              <Card key={mq.id}>
                <p className="text-xs text-stone-400 mb-1">
                  ข้อ {i + 1} • {mq.section === 'listening' ? 'Listening' : 'Reading'}
                </p>
                {mq.context && mq.context.length < 200 && <p className="text-sm text-stone-600 mb-1">{mq.context}</p>}
                <p className="text-sm font-medium text-stone-800 mb-2">{mq.question}</p>
                <div className="space-y-1.5">
                  {mq.choices.map((choice, ci) => {
                    const isCorrect = ci === mq.answerIndex
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
                        {String.fromCharCode(65 + ci)}. {choice}
                        {isCorrect && ' ✓'}
                        {isUserWrong && ' (คำตอบของคุณ)'}
                      </p>
                    )
                  })}
                </div>
              </Card>
            )
          })}
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">
          🏆 ฝึกสอบท้ายหน่วย {cefr.code} • ข้อที่ {index + 1}/{total}
        </span>
        <span className={`font-semibold ${secondsLeft <= 60 ? 'text-rose-600' : 'text-brand-600'}`}>
          ⏱ {formatTime(secondsLeft)}
        </span>
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
          <Button variant="secondary" onClick={() => speak(q.audioScript!, 'US', 0.8)}>
            ▶️ ฟังเสียง
          </Button>
        )}

        {q.context && (
          <pre className="whitespace-pre-wrap font-sans text-sm text-stone-700 bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {q.context}
          </pre>
        )}

        <p className="text-stone-800 font-medium">{q.question}</p>

        <div className="grid gap-2">
          {q.choices.map((choice, i) => {
            const reveal = selected !== null
            const style = !reveal
              ? 'bg-white border-sand-200 hover:border-brand-400'
              : i === q.answerIndex
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                : i === selected
                  ? 'bg-rose-50 border-rose-400 text-rose-800'
                  : 'bg-white border-sand-200 opacity-60'
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={reveal}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${style}`}
              >
                {String.fromCharCode(65 + i)}. {choice}
              </button>
            )
          })}
        </div>

        <button
          onClick={skip}
          disabled={selected !== null}
          className="text-xs text-stone-400 hover:text-stone-600 transition disabled:opacity-40"
        >
          ข้ามข้อนี้ →
        </button>
      </Card>
    </div>
  )
}
