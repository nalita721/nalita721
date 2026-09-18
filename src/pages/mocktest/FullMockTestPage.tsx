import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getExamSet } from '../../data/examSets'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useCountdown } from '../../lib/useCountdown'
import { useProgressStore } from '../../store/progress'
import { speak, type Accent } from '../../lib/tts'
import { toScoreBand } from '../../lib/scoreBand'
import { playCompleteSound } from '../../lib/sound'
import type { ExamPart } from '../../lib/types'
import { SceneIllustration } from '../../components/SceneIllustration'

const ACCENTS: Accent[] = ['US', 'UK', 'AU', 'CA']

const PART_LABELS: Record<ExamPart, string> = {
  1: 'Part 1: Photographs',
  2: 'Part 2: Question-Response',
  3: 'Part 3: Conversations',
  4: 'Part 4: Talks',
  5: 'Part 5: Incomplete Sentences',
  6: 'Part 6: Text Completion',
  7: 'Part 7: Reading Comprehension',
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function FullMockTestPage() {
  const { setId } = useParams()
  const examSet = getExamSet(setId)
  const [phase, setPhase] = useState<'intro' | 'running' | 'finished'>('intro')
  const [itemIndex, setItemIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [accent, setAccent] = useState<Accent>('US')
  const addMockResult = useProgressStore((s) => s.addMockResult)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const items = examSet.fullExamItems
  const { secondsLeft, start } = useCountdown(examSet.durationSec, () => finish(answers))

  const questionsBeforeCurrent = useMemo(
    () => items.slice(0, itemIndex).reduce((sum, it) => sum + it.questions.length, 0),
    [itemIndex, items],
  )

  const item = items[itemIndex]
  const isLastItem = itemIndex >= items.length - 1
  const allCurrentAnswered = item ? item.questions.every((q) => answers[q.id] !== undefined) : false

  function beginTest() {
    setPhase('running')
    setItemIndex(0)
    setAnswers({})
    start()
  }

  function selectAnswer(questionId: string, choiceIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }))
  }

  function goNext() {
    if (isLastItem) {
      finish(answers)
    } else {
      setItemIndex((i) => i + 1)
    }
  }

  function finish(finalAnswers: Record<string, number>) {
    const listeningQs = items.filter((it) => it.section === 'listening').flatMap((it) => it.questions)
    const readingQs = items.filter((it) => it.section === 'reading').flatMap((it) => it.questions)

    const listeningCorrect = listeningQs.filter((q) => finalAnswers[q.id] === q.answerIndex).length
    const readingCorrect = readingQs.filter((q) => finalAnswers[q.id] === q.answerIndex).length

    const listeningScore = toScoreBand(listeningCorrect, listeningQs.length)
    const readingScore = toScoreBand(readingCorrect, readingQs.length)

    items.forEach((it) => {
      it.questions.forEach((q) => {
        recordAnswer(it.section, finalAnswers[q.id] === q.answerIndex)
      })
    })

    addMockResult({
      date: new Date().toISOString(),
      type: 'full',
      totalScore: listeningScore + readingScore,
      listeningScore,
      readingScore,
      durationSec: examSet.durationSec - secondsLeft,
    })
    setPhase('finished')
    playCompleteSound()
  }

  if (phase === 'intro') {
    return (
      <Card className="max-w-xl mx-auto text-center py-10 space-y-4">
        <h1 className="text-2xl font-bold text-stone-800">Full Mock Test — {examSet.label}</h1>
        <p className="text-stone-500">
          ข้อสอบจำลองเต็มรูปแบบ {examSet.totalCount} ข้อ ตามโครงสร้าง TOEIC จริง — Listening{' '}
          {examSet.listeningCount} ข้อ (Part 1-4) และ Reading {examSet.readingCount} ข้อ (Part 5-7) จับเวลารวม{' '}
          {examSet.durationSec / 60} นาที
        </p>
        <p className="text-xs text-stone-400">
          หมายเหตุ: นี่คือชุดข้อสอบตัวอย่างสำหรับฝึกซ้อม ไม่ใช่คะแนน TOEIC จริง ระหว่างทำข้อสอบจะไม่มีการเฉลยทันที
          เพื่อจำลองบรรยากาศการสอบจริง
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
        <p className="text-2xl">🏆</p>
        <h1 className="text-xl font-bold text-stone-800">สรุปผล Full Mock Test — {examSet.label}</h1>
        {last && (
          <>
            <p className="text-3xl font-bold text-brand-600">{last.totalScore} / 990</p>
            <div className="flex justify-center gap-6 text-sm text-stone-600 mt-2">
              <span>Listening: {last.listeningScore}/495</span>
              <span>Reading: {last.readingScore}/495</span>
            </div>
            <p className="text-xs text-stone-400">ใช้เวลาทำข้อสอบ {Math.round(last.durationSec / 60)} นาที</p>
          </>
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

  const audioOnly = item.part === 1 || item.part === 2

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs font-semibold text-brand-600">{PART_LABELS[item.part]}</span>
          <p className="text-sm text-stone-500">
            ข้อที่ {questionsBeforeCurrent + 1}
            {item.questions.length > 1 ? `-${questionsBeforeCurrent + item.questions.length}` : ''} / {examSet.totalCount}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {item.audioScript && (
            <div className="flex gap-1">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  onClick={() => setAccent(a)}
                  className={`text-xs px-2 py-1 rounded-full border ${accent === a ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-sand-200 text-stone-500'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          )}
          <span className="font-semibold text-brand-600">⏱ {formatTime(secondsLeft)}</span>
        </div>
      </div>

      <ProgressBar value={questionsBeforeCurrent} max={examSet.totalCount} />

      <Card className="space-y-5">
        {item.imageId && <SceneIllustration id={item.imageId} />}
        {item.imageDescription && (
          <p className="text-center text-xs text-stone-500">{item.imageDescription}</p>
        )}

        {item.audioScript && (
          <Button variant="secondary" onClick={() => speak(item.audioScript!, accent)}>
            ▶️ ฟังเสียง{item.part >= 3 ? (item.part === 3 ? 'บทสนทนา' : 'ประกาศ') : ''}
          </Button>
        )}

        {item.sentence && (
          <p className="text-stone-800 leading-relaxed bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {item.sentence}
          </p>
        )}

        {item.passageTexts?.map((text, ti) => (
          <pre key={ti} className="whitespace-pre-wrap font-sans text-sm text-stone-700 bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {text}
          </pre>
        ))}

        <div className="space-y-5">
          {item.questions.map((q) => (
            <div key={q.id}>
              <p className="text-sm font-semibold text-stone-800 mb-2">{q.question}</p>
              <div className="grid gap-2">
                {q.choices.map((choice, i) => {
                  const isSelected = answers[q.id] === i
                  const hideText = audioOnly && answers[q.id] === undefined
                  return (
                    <div key={i} className="flex items-center gap-2">
                      {audioOnly && (
                        <button
                          type="button"
                          onClick={() => speak(choice, accent)}
                          className="shrink-0 rounded-lg border border-sand-200 px-2 py-2 text-sm hover:bg-sand-50"
                          aria-label={`ฟังตัวเลือก ${String.fromCharCode(65 + i)}`}
                        >
                          🔊
                        </button>
                      )}
                      <button
                        onClick={() => selectAnswer(q.id, i)}
                        data-testid="answer-choice"
                        className={`flex-1 rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                          isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-sand-200 hover:border-brand-400'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {hideText ? '••• (ฟังเสียงก่อนเลือก)' : choice}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={goNext} disabled={!allCurrentAnswered} data-testid="next-button">
          {isLastItem ? 'ส่งข้อสอบ' : 'ข้อถัดไป →'}
        </Button>
      </Card>
    </div>
  )
}
