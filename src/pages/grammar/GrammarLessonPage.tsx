import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, ChevronLeft, Volume2, X } from 'lucide-react'
import { grammarTopics } from '../../data/grammar'
import { Button, Card } from '../../components/ui'
import { CEFR_LEVELS } from '../../data/cefr'
import { speak } from '../../lib/tts'
import { playClickSound, playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { CefrCode, GrammarKeyPoint } from '../../lib/types'

const LEVEL_GRADIENT: Record<CefrCode, string> = {
  A1: 'from-amber-400 to-amber-600',
  A2: 'from-amber-500 to-orange-600',
  B1: 'from-brand-500 to-brand-700',
  B2: 'from-brand-600 to-indigo-700',
  C1: 'from-emerald-500 to-emerald-700',
}

function HighlightedExample({ text, highlight }: { text: string; highlight?: string }) {
  const at = highlight ? text.indexOf(highlight) : -1
  if (!highlight || at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded bg-amber-200 px-1 font-semibold not-italic text-stone-900">{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  )
}

function KeyPointStep({
  kp,
  number,
  gradient,
  answer,
  onAnswer,
}: {
  kp: GrammarKeyPoint
  number: number
  gradient: string
  answer: number | undefined
  onAnswer: (choice: number) => void
}) {
  const answered = answer !== undefined
  const check = kp.check

  return (
    <div className="space-y-4 animate-fadeIn">
      <Card className="space-y-4">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white`}
          >
            {number}
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-snug text-stone-800">{kp.label}</h2>
            {kp.pattern && (
              <span className="mt-1.5 inline-block rounded-lg bg-brand-50 px-2.5 py-1 font-mono text-sm font-semibold text-brand-700">
                {kp.pattern}
              </span>
            )}
          </div>
        </div>

        <p className="leading-relaxed text-stone-700">{kp.explanation}</p>

        <div className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base italic text-stone-800">
              <HighlightedExample text={kp.exampleEn} highlight={kp.highlight} />
            </p>
            <button
              type="button"
              onClick={() => speak(kp.exampleEn)}
              className="shrink-0 rounded-full p-1.5 text-brand-600 transition hover:bg-brand-50"
              aria-label="ฟังเสียงตัวอย่าง"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <p className="mt-1 text-sm text-stone-500">{kp.exampleTh}</p>
        </div>
      </Card>

      {check && (
        <Card className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">✅ เช็กความเข้าใจ</p>
          <p className="font-medium text-stone-800">{check.sentence}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {check.choices.map((choice, i) => {
              const isCorrect = i === check.answerIndex
              const style = !answered
                ? 'border-sand-200 bg-white hover:border-brand-400'
                : isCorrect
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : i === answer
                    ? 'border-rose-400 bg-rose-50 text-rose-800'
                    : 'border-sand-200 bg-white opacity-50'
              return (
                <button
                  key={i}
                  type="button"
                  disabled={answered}
                  onClick={() => onAnswer(i)}
                  className={`flex items-center justify-between gap-2 rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition ${style}`}
                >
                  {choice}
                  {answered && isCorrect && <Check size={16} className="shrink-0" />}
                  {answered && i === answer && !isCorrect && <X size={16} className="shrink-0" />}
                </button>
              )
            })}
          </div>
          {answered && (
            <p
              className={`rounded-xl px-4 py-3 text-sm animate-fadeIn ${
                answer === check.answerIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
              }`}
            >
              <span className="font-bold">{answer === check.answerIndex ? 'ถูกต้อง! ' : 'ยังไม่ถูก — '}</span>
              {check.explanation}
            </p>
          )}
        </Card>
      )}
    </div>
  )
}

export default function GrammarLessonPage() {
  const { topicId } = useParams()
  const topic = grammarTopics.find((t) => t.id === topicId)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  if (!topic) return <Navigate to="/grammar" replace />

  const { lesson } = topic
  const level = CEFR_LEVELS.find((l) => l.code === topic.cefrLevel)!
  const gradient = LEVEL_GRADIENT[topic.cefrLevel]
  const keyPoints = lesson.keyPoints
  // step 0 = intro, 1..n = key points, n + 1 = summary
  const lastStep = keyPoints.length + 1
  const kpIndex = step - 1
  const kp = step >= 1 && step <= keyPoints.length ? keyPoints[kpIndex] : null
  const needsAnswer = kp?.check !== undefined && answers[kpIndex] === undefined

  const checks = keyPoints.map((k, i) => ({ k, i })).filter(({ k }) => k.check)
  const correctCount = checks.filter(({ k, i }) => answers[i] === k.check!.answerIndex).length

  function go(to: number) {
    playClickSound()
    if (to === lastStep) playCompleteSound()
    setStep(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function answer(choice: number) {
    if (!kp?.check) return
    setAnswers((prev) => ({ ...prev, [kpIndex]: choice }))
    if (choice === kp.check.answerIndex) playCorrectSound()
    else playIncorrectSound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-10">
      {/* Top bar: exit + segmented progress */}
      <div className="flex items-center gap-3">
        <Link to="/grammar" className="shrink-0 text-stone-400 hover:text-stone-600" aria-label="ออกจากบทเรียน">
          <X size={22} />
        </Link>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: lastStep + 1 }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 flex-1 rounded-full transition-colors ${i <= step ? `bg-gradient-to-r ${gradient}` : 'bg-sand-200'}`}
            />
          ))}
        </div>
        <span className="shrink-0 text-xs font-semibold text-stone-400">
          {step}/{lastStep}
        </span>
      </div>

      {step === 0 && (
        <div className="space-y-4 animate-fadeIn">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} px-6 py-8 text-white shadow-sm`}>
            <span className="pointer-events-none absolute -right-4 -top-4 text-8xl opacity-20">{lesson.emoji}</span>
            <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
              ระดับ {level.code} · {level.nameTh}
            </span>
            <h1 className="relative mt-3 text-2xl font-extrabold leading-snug">
              {lesson.emoji} {topic.titleTh}
            </h1>
            <p className="relative mt-2 text-sm text-white/85">{topic.description}</p>
          </div>

          <Card className="border-brand-200 bg-brand-50">
            <p className="leading-relaxed text-stone-700">{lesson.introTh}</p>
          </Card>

          <Card>
            <p className="mb-3 text-sm font-semibold text-stone-500">ในบทนี้จะได้เรียน {keyPoints.length} จุดสำคัญ</p>
            <ol className="space-y-2">
              {keyPoints.map((k, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-stone-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                    {i + 1}
                  </span>
                  {k.label}
                </li>
              ))}
            </ol>
            {checks.length > 0 && (
              <p className="mt-4 text-xs text-stone-400">มีคำถามสั้นๆ เช็กความเข้าใจหลังแต่ละจุด {checks.length} ข้อ</p>
            )}
          </Card>
        </div>
      )}

      {kp && (
        <KeyPointStep key={kpIndex} kp={kp} number={step} gradient={gradient} answer={answers[kpIndex]} onAnswer={answer} />
      )}

      {step === lastStep && (
        <div className="space-y-4 animate-fadeIn">
          <Card className="text-center">
            <p className="text-4xl">🎉</p>
            <h2 className="mt-2 text-xl font-extrabold text-stone-800">เรียนครบทุกจุดแล้ว!</h2>
            {checks.length > 0 && (
              <p className="mt-1 text-sm text-stone-500">
                เช็กความเข้าใจถูก {correctCount}/{checks.length} ข้อ
                {correctCount < checks.length && ' — ลองย้อนดูจุดที่พลาดก่อนไปทำแบบทดสอบ'}
              </p>
            )}
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-400">📋 สรุปสูตรทั้งบท</p>
            <div className="divide-y divide-sand-100">
              {keyPoints.map((k, i) => {
                const missed = k.check && answers[i] !== undefined && answers[i] !== k.check.answerIndex
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i + 1)}
                    className="flex w-full items-start gap-3 py-2.5 text-left transition hover:bg-sand-50"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-stone-800">{k.label}</span>
                      {k.pattern && <span className="block font-mono text-xs text-brand-700">{k.pattern}</span>}
                    </span>
                    {missed && <span className="shrink-0 text-xs font-semibold text-rose-500">ทบทวน</span>}
                  </button>
                )
              })}
            </div>
          </Card>

          <Card className="flex items-start gap-3 border-amber-200 bg-amber-50">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-stone-700">{lesson.tipTh}</p>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link to={`/grammar/${topic.id}/writing`}>
              <Button variant="secondary" className="w-full py-3">
                ✍️ ฝึกแต่งประโยค
              </Button>
            </Link>
            <Link to={`/grammar/${topic.id}/practice`}>
              <Button className="w-full py-3">📝 ทำแบบทดสอบ →</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      {step < lastStep && (
        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <Button variant="secondary" onClick={() => go(step - 1)} className="py-3" aria-label="ย้อนกลับ">
              <ChevronLeft size={18} />
            </Button>
          )}
          <Button onClick={() => go(step + 1)} disabled={needsAnswer} className="flex-1 py-3 text-base">
            {step === 0 ? 'เริ่มเรียน →' : needsAnswer ? 'ตอบคำถามก่อนไปต่อ' : step === keyPoints.length ? 'ดูสรุป →' : 'ต่อไป →'}
          </Button>
        </div>
      )}
    </div>
  )
}
