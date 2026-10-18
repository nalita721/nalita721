import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, ChevronLeft, Volume2, X } from 'lucide-react'
import { Button, Card } from '../../components/ui'
import { speakLang } from '../../lib/tts'
import { useProgressStore } from '../../store/progress'
import { playClickSound, playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { LangCode, LangQuickCheck } from '../../lib/langTypes'
import { bestKey, useLangLevel } from './useLangLevel'

function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight)
  if (at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded bg-amber-200 px-1 font-semibold text-stone-900">{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  )
}

function Question({ q, answer, onAnswer }: { q: LangQuickCheck; answer: number | undefined; onAnswer: (i: number) => void }) {
  const answered = answer !== undefined
  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-stone-800">{q.sentence}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.choices.map((choice, i) => {
          const style = !answered
            ? 'border-sand-200 bg-white hover:border-brand-400'
            : i === q.answerIndex
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
              className={`flex items-center justify-between gap-2 rounded-xl border-2 px-4 py-2.5 text-left text-base font-medium transition ${style}`}
            >
              {choice}
              {answered && i === q.answerIndex && <Check size={16} className="shrink-0" />}
              {answered && i === answer && i !== q.answerIndex && <X size={16} className="shrink-0" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <p
          className={`rounded-xl px-4 py-3 text-sm animate-fadeIn ${
            answer === q.answerIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
          }`}
        >
          <span className="font-bold">{answer === q.answerIndex ? 'ถูกต้อง! ' : 'ยังไม่ถูก — '}</span>
          {q.explanation}
        </p>
      )}
    </div>
  )
}

export default function LangGrammarPage({ lang }: { lang: LangCode }) {
  const { topicId } = useParams()
  const { track, meta, content, loading } = useLangLevel(lang)
  const recordLangBest = useProgressStore((s) => s.recordLangBest)
  const [step, setStep] = useState(0)
  const [checkAnswers, setCheckAnswers] = useState<Record<number, number>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})

  if (!meta) return <Navigate to={track.path} replace />
  if (loading || !content) return <p className="py-10 text-center text-stone-400">กำลังโหลดเนื้อหา…</p>
  const topic = content.grammar.find((g) => g.id === topicId)
  if (!topic) return <Navigate to={`${track.path}/${meta.slug}`} replace />

  const levelPath = `${track.path}/${meta.slug}`
  const kps = topic.keyPoints
  const qs = topic.questions
  // 0 intro · 1..k key points · k+1 lesson summary · k+2..k+1+q questions · last = result
  const summaryStep = kps.length + 1
  const firstQuestion = summaryStep + 1
  const resultStep = firstQuestion + qs.length
  const kp = step >= 1 && step <= kps.length ? kps[step - 1] : null
  const qIndex = step >= firstQuestion && step < resultStep ? step - firstQuestion : -1
  const needsAnswer = (kp && checkAnswers[step - 1] === undefined) || (qIndex >= 0 && quizAnswers[qIndex] === undefined)
  const score = qs.filter((q, i) => quizAnswers[i] === q.answerIndex).length

  function go(to: number) {
    playClickSound()
    if (to === resultStep) {
      playCompleteSound()
      recordLangBest(bestKey(lang, meta!.slug, `g:${topic!.id}`), qs.length ? score / qs.length : 1)
    }
    setStep(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function answer(set: typeof setCheckAnswers, i: number, choice: number, correct: number) {
    set((prev) => ({ ...prev, [i]: choice }))
    if (choice === correct) playCorrectSound()
    else playIncorrectSound()
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-10">
      <div className="flex items-center gap-3">
        <Link to={levelPath} className="shrink-0 text-stone-400 hover:text-stone-600" aria-label="ออก">
          <X size={22} />
        </Link>
        <div className="flex flex-1 gap-0.5">
          {Array.from({ length: resultStep + 1 }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 flex-1 rounded-full transition-colors ${
                i <= step ? (i >= firstQuestion ? 'bg-amber-400' : 'bg-brand-500') : 'bg-sand-200'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-8 text-white shadow-sm">
            <span className="pointer-events-none absolute -right-4 -top-4 text-8xl opacity-20">{topic.emoji}</span>
            <span className="inline-flex rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
              {track.flag} {meta.code} · ไวยากรณ์
            </span>
            <h1 className="mt-3 text-2xl font-extrabold">
              {topic.emoji} {topic.titleTh}
            </h1>
            <p className="mt-2 text-sm text-white/85">{topic.description}</p>
          </div>
          <Card className="border-brand-200 bg-brand-50">
            <p className="leading-relaxed text-stone-700">{topic.introTh}</p>
          </Card>
          <Card>
            <p className="mb-3 text-sm font-semibold text-stone-500">ในบทนี้จะได้เรียน {kps.length} จุด</p>
            <ol className="space-y-2">
              {kps.map((k, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-stone-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                    {i + 1}
                  </span>
                  {k.label}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-stone-400">จากนั้นทำแบบฝึกหัด {qs.length} ข้อ</p>
          </Card>
        </div>
      )}

      {kp && (
        <div key={step} className="space-y-4 animate-fadeIn">
          <Card className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {step}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold leading-snug text-stone-800">{kp.label}</h2>
                <span className="mt-1.5 inline-block rounded-lg bg-brand-50 px-2.5 py-1 text-sm font-semibold text-brand-700">
                  {kp.pattern}
                </span>
              </div>
            </div>
            <p className="leading-relaxed text-stone-700">{kp.explanation}</p>
            <div className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xl text-stone-800">
                  <Highlighted text={kp.example} highlight={kp.highlight} />
                </p>
                <button
                  type="button"
                  onClick={() => speakLang(kp.example, track.ttsLang)}
                  className="shrink-0 rounded-full p-1.5 text-brand-600 hover:bg-brand-50"
                  aria-label="ฟังเสียงตัวอย่าง"
                >
                  <Volume2 size={20} />
                </button>
              </div>
              <p className="text-sm italic text-stone-500">{kp.exampleReading}</p>
              <p className="mt-1 text-sm text-stone-500">{kp.exampleTh}</p>
            </div>
          </Card>
          <Card className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">✅ เช็กความเข้าใจ</p>
            <Question
              q={kp.check}
              answer={checkAnswers[step - 1]}
              onAnswer={(c) => answer(setCheckAnswers, step - 1, c, kp.check.answerIndex)}
            />
          </Card>
        </div>
      )}

      {step === summaryStep && (
        <div className="space-y-4 animate-fadeIn">
          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-400">📋 สรุปสูตรทั้งบท</p>
            <div className="divide-y divide-sand-100">
              {kps.map((k, i) => (
                <button key={i} type="button" onClick={() => go(i + 1)} className="flex w-full items-start gap-3 py-2.5 text-left hover:bg-sand-50">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-stone-800">{k.label}</span>
                    <span className="block text-sm text-brand-700">{k.pattern}</span>
                  </span>
                </button>
              ))}
            </div>
          </Card>
          <Card className="flex items-start gap-3 border-amber-200 bg-amber-50">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-stone-700">{topic.tipTh}</p>
          </Card>
        </div>
      )}

      {qIndex >= 0 && (
        <Card key={step} className="space-y-2 animate-fadeIn">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
            📝 แบบฝึกหัด ข้อ {qIndex + 1}/{qs.length}
          </p>
          <Question
            q={qs[qIndex]}
            answer={quizAnswers[qIndex]}
            onAnswer={(c) => answer(setQuizAnswers, qIndex, c, qs[qIndex].answerIndex)}
          />
        </Card>
      )}

      {step === resultStep && (
        <Card className="space-y-3 py-8 text-center animate-fadeIn">
          <p className="text-4xl">{score / qs.length >= 0.7 ? '🎉' : '📝'}</p>
          <p className="text-2xl font-bold text-brand-600">
            {score} / {qs.length}
          </p>
          <p className="text-sm text-stone-500">
            {score / qs.length >= 0.7 ? 'เข้าใจหัวข้อนี้แล้ว!' : 'ลองย้อนทบทวนสูตรแล้วทำใหม่'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setQuizAnswers({})
                go(firstQuestion)
              }}
            >
              ทำแบบฝึกหัดใหม่
            </Button>
            <Link to={levelPath}>
              <Button>กลับหน้า {meta.code}</Button>
            </Link>
          </div>
        </Card>
      )}

      {step < resultStep && (
        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <Button variant="secondary" onClick={() => go(step - 1)} className="py-3" aria-label="ย้อนกลับ">
              <ChevronLeft size={18} />
            </Button>
          )}
          <Button onClick={() => go(step + 1)} disabled={!!needsAnswer} className="flex-1 py-3 text-base">
            {step === 0
              ? 'เริ่มเรียน →'
              : needsAnswer
                ? 'ตอบคำถามก่อนไปต่อ'
                : step === summaryStep
                  ? `ทำแบบฝึกหัด ${qs.length} ข้อ →`
                  : step === resultStep - 1
                    ? 'ดูผล →'
                    : 'ต่อไป →'}
          </Button>
        </div>
      )}
    </div>
  )
}
