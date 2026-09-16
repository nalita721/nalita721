import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  levelTestItems,
  LEVEL_TEST_DURATION_SEC,
  LEVEL_TEST_TOTAL_QUESTIONS,
  SKILL_LABELS,
} from '../data/levelTest'
import { CEFR_LEVELS, scoreToCefr } from '../data/cefr'
import { Button, Card, ProgressBar } from '../components/ui'
import { useCountdown } from '../lib/useCountdown'
import { useProgressStore } from '../store/progress'
import { speak } from '../lib/tts'
import { toScoreBand } from '../lib/scoreBand'
import { getRecommendations } from '../lib/recommendations'
import { playCompleteSound } from '../lib/sound'
import type { LevelTestSkill } from '../data/levelTest'

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function LevelTestPage() {
  const [phase, setPhase] = useState<'intro' | 'running' | 'finished'>('intro')
  const [itemIndex, setItemIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const setLevelTestResult = useProgressStore((s) => s.setLevelTestResult)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)
  const touchStreak = useProgressStore((s) => s.touchStreak)

  const items = levelTestItems
  const { secondsLeft, start } = useCountdown(LEVEL_TEST_DURATION_SEC, () => finish(answers))

  const questionsBeforeCurrent = items.slice(0, itemIndex).reduce((sum, it) => sum + it.questions.length, 0)
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
    if (isLastItem) finish(answers)
    else setItemIndex((i) => i + 1)
  }

  function finish(finalAnswers: Record<string, number>) {
    const listeningQs = items.filter((it) => it.section === 'listening').flatMap((it) => it.questions)
    const readingQs = items.filter((it) => it.section === 'reading').flatMap((it) => it.questions)

    const listeningCorrect = listeningQs.filter((q) => finalAnswers[q.id] === q.answerIndex).length
    const readingCorrect = readingQs.filter((q) => finalAnswers[q.id] === q.answerIndex).length

    const listeningScore = toScoreBand(listeningCorrect, listeningQs.length)
    const readingScore = toScoreBand(readingCorrect, readingQs.length)
    const totalScore = listeningScore + readingScore

    const skillBreakdown: Record<LevelTestSkill, { correct: number; total: number }> = {
      vocabulary: { correct: 0, total: 0 },
      grammar: { correct: 0, total: 0 },
      listening: { correct: 0, total: 0 },
      reading: { correct: 0, total: 0 },
    }

    items.forEach((it) => {
      it.questions.forEach((q) => {
        const correct = finalAnswers[q.id] === q.answerIndex
        recordAnswer(it.skill, correct)
        skillBreakdown[it.skill].total += 1
        if (correct) skillBreakdown[it.skill].correct += 1
      })
    })
    touchStreak()
    addXp(20)

    setLevelTestResult({
      date: new Date().toISOString(),
      cefr: scoreToCefr(totalScore).code,
      totalScore,
      listeningScore,
      readingScore,
      skillBreakdown,
    })
    setPhase('finished')
    playCompleteSound()
  }

  if (phase === 'intro') {
    return (
      <Card className="max-w-xl mx-auto text-center py-10 space-y-4">
        <p className="text-3xl">🌐</p>
        <h1 className="text-2xl font-bold text-stone-800">แบบทดสอบวัดระดับภาษาอังกฤษ</h1>
        <p className="text-stone-500">
          ทดสอบ {LEVEL_TEST_TOTAL_QUESTIONS} ข้อ ครอบคลุมคำศัพท์ ไวยากรณ์ การฟัง และการอ่าน ใช้เวลาประมาณ{' '}
          {LEVEL_TEST_DURATION_SEC / 60} นาที ผลลัพธ์จะบอกระดับภาษาตามมาตรฐานสากล{' '}
          <a
            href="https://www.coe.int/en/web/common-european-framework-reference-languages"
            target="_blank"
            rel="noreferrer"
            className="text-brand-600 underline"
          >
            CEFR
          </a>{' '}
          (A1–C1) พร้อมคะแนน TOEIC โดยประมาณ
        </p>
        <p className="text-xs text-stone-400">
          หมายเหตุ: นี่คือการประเมินเบื้องต้นเพื่อวางแผนการเรียน ไม่ใช่คะแนนสอบ TOEIC หรือใบรับรอง CEFR อย่างเป็นทางการ
        </p>
        <Button onClick={beginTest}>เริ่มทำแบบทดสอบ</Button>
      </Card>
    )
  }

  if (phase === 'finished') {
    const result = useProgressStore.getState().levelTestResult
    const level = result ? scoreToCefr(result.totalScore) : CEFR_LEVELS[0]
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="text-center py-10 space-y-3">
          <p className="text-sm text-stone-500">ระดับภาษาอังกฤษของคุณคือ</p>
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-4 mx-auto"
            style={{ backgroundColor: level.bgColor }}
          >
            <span className="text-4xl font-extrabold" style={{ color: level.color }}>
              {level.code}
            </span>
            <span className="text-left">
              <span className="block font-semibold" style={{ color: level.color }}>
                {level.nameTh}
              </span>
              <span className="block text-xs text-stone-500">{level.name}</span>
            </span>
          </div>

          {result && (
            <>
              <p className="text-2xl font-bold text-brand-600 mt-2">คะแนนโดยประมาณ {result.totalScore} / 990</p>
              <div className="flex justify-center gap-6 text-sm text-stone-600">
                <span>Listening {result.listeningScore}</span>
                <span>Reading {result.readingScore}</span>
              </div>
            </>
          )}
        </Card>

        <Card className="space-y-3">
          <h2 className="font-semibold text-stone-800">ระดับ {level.nameTh} หมายความว่าอย่างไร</h2>
          <p className="text-sm text-stone-600">{level.descriptionTh}</p>
          <div className="rounded-xl bg-sand-50 border border-sand-200 px-4 py-3 text-sm text-stone-700">
            💡 {level.tipTh}
          </div>
          {level.code === 'C1' && (
            <p className="text-xs text-stone-400">
              หมายเหตุ: TOEIC Listening &amp; Reading วัดได้สูงสุดถึงระดับ C1 ตามตารางเทียบของ ETS (C2 ต้องประเมินทักษะ
              Speaking/Writing เพิ่มเติม)
            </p>
          )}
        </Card>

        {result && (
          <Card className="space-y-3">
            <h2 className="font-semibold text-stone-800">แนะนำสำหรับคุณ</h2>
            <p className="text-sm text-stone-500">บทเรียนที่ควรเริ่มฝึกก่อน โดยอิงจากระดับและจุดที่ยังอ่อนของคุณ</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {getRecommendations(result).map((card) => (
                <Link key={card.id} to={card.to}>
                  <div className="h-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 hover:border-brand-400 hover:shadow-sm transition">
                    <p className="font-semibold text-stone-800">
                      {card.icon} {card.title}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}

        <div className="flex gap-3 justify-center">
          <Button onClick={beginTest}>ทำอีกครั้ง</Button>
          <Link to="/mock-test">
            <Button variant="secondary">ไปฝึก Mock Test</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">
          ข้อที่ {questionsBeforeCurrent + 1}
          {item.questions.length > 1 ? `-${questionsBeforeCurrent + item.questions.length}` : ''} /{' '}
          {LEVEL_TEST_TOTAL_QUESTIONS}
        </span>
        <span className="font-semibold text-brand-600">⏱ {formatTime(secondsLeft)}</span>
      </div>
      <ProgressBar value={questionsBeforeCurrent} max={LEVEL_TEST_TOTAL_QUESTIONS} />

      <Card className="space-y-4">
        <span className="text-xs uppercase tracking-wide text-stone-400">{SKILL_LABELS[item.skill]}</span>

        {item.audioScript && (
          <Button variant="secondary" onClick={() => speak(item.audioScript!)}>
            ▶️ ฟังเสียง
          </Button>
        )}

        {item.sentence && (
          <p className="text-stone-800 leading-relaxed bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
            {item.sentence}
          </p>
        )}

        {item.passageTexts?.map((text, ti) => (
          <pre
            key={ti}
            className="whitespace-pre-wrap font-sans text-sm text-stone-700 bg-sand-50 rounded-xl border border-sand-200 px-4 py-3"
          >
            {text}
          </pre>
        ))}

        <div className="space-y-5">
          {item.questions.map((q) => (
            <div key={q.id}>
              {q.question && <p className="text-sm font-semibold text-stone-800 mb-2">{q.question}</p>}
              <div className="grid gap-2">
                {q.choices.map((choice, i) => {
                  const isSelected = answers[q.id] === i
                  const hideText = item.audioOnly && answers[q.id] === undefined
                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(q.id, i)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                        isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-sand-200 hover:border-brand-400'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {hideText ? '••• (ฟังเสียงก่อนเลือก)' : choice}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={goNext} disabled={!allCurrentAnswered}>
          {isLastItem ? 'ส่งคำตอบ' : 'ข้อถัดไป →'}
        </Button>
      </Card>
    </div>
  )
}
