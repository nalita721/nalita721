import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronLeft, Lightbulb, Play, Volume2, X } from 'lucide-react'
import { Button, Card } from './ui'
import { speakLang } from '../lib/tts'
import { useProgressStore } from '../store/progress'
import { playClickSound, playCompleteSound, playCorrectSound, playIncorrectSound } from '../lib/sound'
import { LESSON_PASS_RATIO, LESSON_XP } from '../lib/miniLesson'

export interface WordCard {
  kind: 'word'
  id: string
  word: string
  reading?: string
  romaji?: string
  pos: string
  meaningTh: string
  example: string
  exampleReading?: string
  exampleTh: string
  mnemonicTh?: string
}

export interface PointCard {
  kind: 'point'
  label: string
  pattern?: string
  explanation: string
  example: string
  exampleReading?: string
  exampleTh: string
  highlight?: string
  check?: {
    /** Read aloud before the question (listening checks) */
    audio?: string
    sentence: string
    choices: string[]
    answerIndex: number
    explanation: string
  }
}

export type LessonCard = WordCard | PointCard

export interface QuizItem {
  id: string
  prompt: string
  reading?: string
  choices: string[]
  answerIndex: number
}

export interface MiniLessonProps {
  lessonKey: string
  /** Small line above the title, e.g. "✍️ ไวยากรณ์ · Present Tenses" */
  eyebrow: string
  title: string
  /** e.g. "ด่านย่อย 2/4" */
  position: string
  minutes: number
  /** BCP-47 language of the examples, for speech */
  tts: string
  cards: LessonCard[]
  quiz?: QuizItem[]
  exitTo: string
  next?: { to: string; label: string }
  onCheck?: (correct: boolean) => void
  onQuizAnswer?: (id: string, correct: boolean) => void
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const at = highlight ? text.indexOf(highlight) : -1
  if (!highlight || at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded bg-amber-200 px-1 font-semibold text-stone-900">{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  )
}

function SpeakButton({ text, tts, label = 'ฟังเสียง' }: { text: string; tts: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speakLang(text, tts)}
      className="shrink-0 rounded-full p-2 text-brand-600 transition hover:bg-brand-50"
      aria-label={label}
    >
      <Volume2 size={20} />
    </button>
  )
}

function Choices({
  choices,
  answerIndex,
  picked,
  onPick,
  disabled,
}: {
  choices: string[]
  answerIndex: number
  picked: number | undefined
  onPick: (i: number) => void
  disabled?: boolean
}) {
  const answered = picked !== undefined
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {choices.map((choice, i) => {
        const isCorrect = i === answerIndex
        const style = !answered
          ? 'border-sand-200 bg-white hover:border-brand-400'
          : isCorrect
            ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
            : i === picked
              ? 'border-rose-400 bg-rose-50 text-rose-800'
              : 'border-sand-200 bg-white opacity-50'
        return (
          <button
            key={i}
            type="button"
            disabled={answered || disabled}
            onClick={() => onPick(i)}
            className={`flex items-center justify-between gap-2 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition disabled:cursor-default ${style} ${
              disabled && !answered ? 'opacity-50' : ''
            }`}
          >
            {choice}
            {answered && isCorrect && <Check size={16} className="shrink-0" />}
            {answered && i === picked && !isCorrect && <X size={16} className="shrink-0" />}
          </button>
        )
      })}
    </div>
  )
}

function WordView({ card, tts }: { card: WordCard; tts: string }) {
  return (
    <Card className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{card.pos}</span>
        <SpeakButton text={card.word} tts={tts} />
      </div>
      <button type="button" onClick={() => speakLang(card.word, tts)} className="block w-full text-center">
        <p className="text-4xl font-bold text-stone-800 sm:text-5xl">{card.word}</p>
        {card.reading && (
          <p className="mt-2 text-base font-medium text-brand-500">
            {card.reading}
            {card.romaji && <span className="text-stone-400"> · {card.romaji}</span>}
          </p>
        )}
        <p className="mt-3 text-xl font-semibold text-stone-700">{card.meaningTh}</p>
      </button>
      <div className="flex items-start justify-between gap-3 rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
        <div className="min-w-0">
          <p className="text-base text-stone-800">
            <Highlighted text={card.example} highlight={card.word} />
          </p>
          {card.exampleReading && <p className="text-sm italic text-stone-500">{card.exampleReading}</p>}
          <p className="mt-1 text-sm text-stone-500">{card.exampleTh}</p>
        </div>
        <SpeakButton text={card.example} tts={tts} label="ฟังประโยคตัวอย่าง" />
      </div>
      {card.mnemonicTh && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
          <p className="text-sm text-stone-700">{card.mnemonicTh}</p>
        </div>
      )}
    </Card>
  )
}

function PointView({
  card,
  number,
  tts,
  picked,
  onPick,
}: {
  card: PointCard
  number: number
  tts: string
  picked: number | undefined
  onPick: (i: number) => void
}) {
  const [heard, setHeard] = useState(false)
  const check = card.check
  return (
    <div className="space-y-4 animate-fadeIn">
      <Card className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
            {number}
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-snug text-stone-800">{card.label}</h2>
            {card.pattern && (
              <span className="mt-1.5 inline-block rounded-lg bg-brand-50 px-2.5 py-1 font-mono text-sm font-semibold text-brand-700">
                {card.pattern}
              </span>
            )}
          </div>
        </div>
        <p className="leading-relaxed text-stone-700">{card.explanation}</p>
        <div className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-base text-stone-800">
                <Highlighted text={card.example} highlight={card.highlight} />
              </p>
              {card.exampleReading && <p className="text-sm italic text-stone-500">{card.exampleReading}</p>}
            </div>
            <SpeakButton text={card.example} tts={tts} label="ฟังเสียงตัวอย่าง" />
          </div>
          <p className="mt-1 text-sm text-stone-500">{card.exampleTh}</p>
        </div>
      </Card>

      {check && (
        <Card className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">✅ เช็กความเข้าใจ</p>
          {check.audio && (
            <button
              type="button"
              onClick={() => {
                setHeard(true)
                speakLang(check.audio!, tts)
              }}
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_0] shadow-brand-800 transition active:translate-y-1 active:shadow-none"
            >
              <Play size={16} /> {heard ? 'ฟังอีกครั้ง' : 'ฟังโจทย์'}
            </button>
          )}
          <p className="font-medium text-stone-800">{check.sentence}</p>
          <Choices
            choices={check.choices}
            answerIndex={check.answerIndex}
            picked={picked}
            onPick={onPick}
            disabled={!!check.audio && !heard}
          />
          {picked !== undefined && (
            <div
              className={`space-y-1 rounded-xl px-4 py-3 text-sm animate-fadeIn ${
                picked === check.answerIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
              }`}
            >
              <p>
                <span className="font-bold">{picked === check.answerIndex ? 'ถูกต้อง! ' : 'ยังไม่ถูก — '}</span>
                {check.explanation}
              </p>
              {check.audio && <p className="italic text-stone-600">“{check.audio}”</p>}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}

/**
 * A few-minute lesson: a handful of cards, then (for words) a short quiz.
 * The card reached is saved so leaving halfway resumes at the same place.
 */
export function MiniLesson(props: MiniLessonProps) {
  const { lessonKey, cards, tts } = props
  const quiz = props.quiz ?? []
  const resumeAt = useProgressStore((s) => s.lessonResume[lessonKey])
  const wasPassed = useProgressStore((s) => s.passedLessons.includes(lessonKey))
  const setLessonResume = useProgressStore((s) => s.setLessonResume)
  const completeLesson = useProgressStore((s) => s.completeLesson)
  const touchStreak = useProgressStore((s) => s.touchStreak)
  const dailyGoal = useProgressStore((s) => s.dailyGoal)
  const dailyLessons = useProgressStore((s) => s.dailyLessons)
  const dailyLessonsDate = useProgressStore((s) => s.dailyLessonsDate)

  const [step, setStep] = useState(() => Math.min(Math.max(resumeAt ?? 0, 0), cards.length))
  const [resumed] = useState(() => (resumeAt ?? 0) > 0)
  const [checks, setChecks] = useState<Record<number, number>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [round, setRound] = useState(0)
  const [result, setResult] = useState<{ passed: boolean; score: number; newXp: boolean } | null>(null)

  const quizItems = useMemo(
    () => shuffle(quiz),
    // pages rebuild `quiz` on render; only a new lesson or a retry reshuffles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessonKey, round],
  )

  const total = cards.length + quizItems.length
  const card = step < cards.length ? cards[step] : null
  const qIndex = step >= cards.length && step < total ? step - cards.length : -1
  const q = qIndex >= 0 ? quizItems[qIndex] : null
  const pointNumber = card?.kind === 'point' ? cards.slice(0, step + 1).filter((c) => c.kind === 'point').length : 0

  useEffect(() => {
    // remember the card reached; quizzes restart from their first question
    if (!result) setLessonResume(lessonKey, Math.min(step, cards.length) || null)
  }, [step, result, lessonKey, cards.length, setLessonResume])

  const needsAnswer =
    (card?.kind === 'point' && card.check !== undefined && checks[step] === undefined) || (q !== null && quizAnswers[qIndex] === undefined)

  function finish() {
    const score = quizItems.filter((item, i) => quizAnswers[i] === item.answerIndex).length
    const passed = quizItems.length === 0 || score / quizItems.length >= LESSON_PASS_RATIO
    playCompleteSound()
    if (passed) {
      completeLesson(lessonKey)
      touchStreak()
    }
    setResult({ passed, score, newXp: passed && !wasPassed })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function go(to: number) {
    playClickSound()
    if (to >= total) {
      finish()
      return
    }
    setStep(Math.max(0, to))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function pickCheck(i: number) {
    if (card?.kind !== 'point' || !card.check) return
    const correct = i === card.check.answerIndex
    setChecks((a) => ({ ...a, [step]: i }))
    if (correct) playCorrectSound()
    else playIncorrectSound()
    props.onCheck?.(correct)
  }

  function pickQuiz(i: number) {
    if (!q) return
    const correct = i === q.answerIndex
    setQuizAnswers((a) => ({ ...a, [qIndex]: i }))
    if (correct) playCorrectSound()
    else playIncorrectSound()
    speakLang(q.prompt, tts)
    props.onQuizAnswer?.(q.id, correct)
  }

  function retry(fromStart: boolean) {
    setResult(null)
    setQuizAnswers({})
    setRound((r) => r + 1)
    setStep(fromStart ? 0 : cards.length)
  }

  const goalToday = dailyLessonsDate === new Date().toISOString().slice(0, 10) ? dailyLessons : 0

  if (result) {
    return (
      <div className="mx-auto max-w-xl space-y-5 pb-10">
        <Card className="space-y-4 py-8 text-center">
          <p className="text-5xl">{result.passed ? '🎉' : '💪'}</p>
          <div>
            <p className="text-xl font-extrabold text-stone-800">{result.passed ? 'จบด่านย่อยแล้ว!' : 'เกือบแล้ว ลองอีกครั้งนะ'}</p>
            <p className="text-sm text-stone-500">
              {props.title}
              {quizItems.length > 0 && ` · ตอบถูก ${result.score}/${quizItems.length}`}
            </p>
          </div>
          {result.newXp && <p className="text-lg font-extrabold text-amber-500">+{LESSON_XP} XP</p>}
          {!result.passed && (
            <p className="text-sm text-stone-600">ต้องตอบถูก {Math.round(LESSON_PASS_RATIO * 100)}% ขึ้นไปถึงจะผ่าน</p>
          )}
          {result.passed && (
            <div className="mx-auto max-w-xs">
              <div className="mb-1 flex justify-between text-xs text-stone-500">
                <span>🎯 เป้าหมายวันนี้</span>
                <span>
                  {Math.min(goalToday, dailyGoal)}/{dailyGoal} ด่าน
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-sand-100">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${Math.min(1, goalToday / dailyGoal) * 100}%` }} />
              </div>
              {goalToday === dailyGoal && <p className="mt-2 text-sm font-bold text-emerald-600">ครบเป้าหมายวันนี้แล้ว 🔥</p>}
            </div>
          )}
        </Card>
        {result.passed ? (
          <div className="flex gap-3">
            <Link to={props.exitTo} className="flex-1">
              <Button variant="secondary" className="w-full py-3">
                กลับแผนที่
              </Button>
            </Link>
            {props.next && (
              <Link to={props.next.to} className="flex-[2]">
                <Button className="w-full py-3">{props.next.label} →</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1 py-3" onClick={() => retry(true)}>
              ทบทวนอีกรอบ
            </Button>
            <Button className="flex-1 py-3" onClick={() => retry(false)}>
              ทำแบบทดสอบใหม่
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl space-y-5 pb-10">
      <div className="flex items-center gap-3">
        <Link to={props.exitTo} aria-label="ออกจากบทเรียน" className="shrink-0 text-stone-400 transition hover:text-stone-600">
          <X size={24} />
        </Link>
        <div className="flex flex-1 gap-1">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`h-2.5 flex-1 rounded-full transition-colors ${
                i < step ? (i >= cards.length ? 'bg-amber-400' : 'bg-brand-500') : i === step ? 'bg-brand-300' : 'bg-sand-200'
              }`}
            />
          ))}
        </div>
        <span className="shrink-0 text-xs font-semibold text-stone-400">
          {Math.min(step + 1, total)}/{total}
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold text-stone-400">
          {props.eyebrow} · {props.position} · ⏱ ≈ {props.minutes} นาที
        </p>
        <h1 className="text-lg font-bold text-stone-800">{props.title}</h1>
        {resumed && step > 0 && step < cards.length && Object.keys(checks).length === 0 && (
          <p className="mt-1 text-xs font-semibold text-brand-600">↩︎ เรียนต่อจากที่ค้างไว้</p>
        )}
      </div>

      {card?.kind === 'word' && <WordView key={step} card={card} tts={tts} />}
      {card?.kind === 'point' && (
        <PointView key={step} card={card} number={pointNumber} tts={tts} picked={checks[step]} onPick={pickCheck} />
      )}
      {q && (
        <Card key={`q${round}-${qIndex}`} className="space-y-4 animate-fadeIn">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-amber-600">
            📝 ทดสอบท้ายด่าน {qIndex + 1}/{quizItems.length}
          </p>
          <p className="text-center text-sm text-stone-500">คำนี้แปลว่าอะไร</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-center text-4xl font-bold text-stone-800">{q.prompt}</p>
            <SpeakButton text={q.prompt} tts={tts} />
          </div>
          {quizAnswers[qIndex] !== undefined && q.reading && <p className="text-center text-brand-500 animate-fadeIn">{q.reading}</p>}
          <Choices choices={q.choices} answerIndex={q.answerIndex} picked={quizAnswers[qIndex]} onPick={pickQuiz} />
        </Card>
      )}

      <div className="flex gap-3">
        {step > 0 && step <= cards.length && (
          <Button variant="secondary" onClick={() => go(step - 1)} className="py-3" aria-label="ย้อนกลับ">
            <ChevronLeft size={18} />
          </Button>
        )}
        <Button onClick={() => go(step + 1)} disabled={needsAnswer} className="flex-1 py-3 text-base">
          {needsAnswer
            ? 'ตอบคำถามก่อนไปต่อ'
            : step + 1 >= total
              ? 'จบด่านย่อย ✓'
              : step + 1 === cards.length && quizItems.length > 0
                ? 'ไปทำแบบทดสอบ →'
                : 'ต่อไป →'}
        </Button>
      </div>
    </div>
  )
}
