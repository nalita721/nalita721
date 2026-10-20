import { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Check, ChevronLeft, Volume2, X } from 'lucide-react'
import { listeningGroupsByPart } from '../../data/listening'
import { listeningLessonFor } from '../../data/listeningLessons'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { speak, type Accent } from '../../lib/tts'
import { SceneIllustration } from '../../components/SceneIllustration'
import { playClickSound, playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import { PASS_THRESHOLD } from '../../data/learningPath'
import { findStep, lessonKey, listeningPracticeSets } from '../../data/pathLessons'
import type { ExamItem, ListeningTip } from '../../lib/types'

const ACCENTS: Accent[] = ['US', 'UK', 'AU', 'CA']
type Mode = 'practice' | 'exam'
type Phase = 'lesson' | 'practice' | 'summary'

const letter = (i: number) => String.fromCharCode(65 + i)

function choiceStyle(revealed: boolean, isCorrect: boolean, isSelected: boolean, mode: Mode) {
  if (!revealed) return 'border-sand-200 bg-white hover:border-brand-400 text-stone-700'
  if (mode === 'exam') return isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-sand-200 bg-white opacity-60'
  if (isCorrect) return 'border-emerald-400 bg-emerald-50 text-emerald-800'
  if (isSelected) return 'border-rose-400 bg-rose-50 text-rose-800'
  return 'border-sand-200 bg-white opacity-50'
}

/** What was actually spoken for a group, for the script reveal and the end-of-test review. */
function scriptOf(group: ExamItem): string {
  if (group.part === 1) {
    const q = group.questions[0]
    return q.choices.map((c, i) => `${letter(i)}. ${c}`).join('\n')
  }
  if (group.part === 2) {
    const q = group.questions[0]
    return [`Q: ${group.audioScript ?? ''}`, ...q.choices.map((c, i) => `${letter(i)}. ${c}`)].join('\n')
  }
  return group.transcript ?? group.audioScript ?? ''
}

function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight)
  if (at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded bg-amber-200 px-1 font-semibold not-italic text-stone-900">{highlight}</mark>
      {text.slice(at + highlight.length)}
    </>
  )
}

function TipStep({
  tip,
  number,
  accent,
  answer,
  onAnswer,
}: {
  tip: ListeningTip
  number: number
  accent: Accent
  answer: number | undefined
  onAnswer: (i: number) => void
}) {
  const answered = answer !== undefined
  const { check } = tip
  return (
    <div className="space-y-4 animate-fadeIn">
      <Card className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-700 text-sm font-bold text-white">
            {number}
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-snug text-stone-800">{tip.label}</h2>
            <span className="mt-1.5 inline-block rounded-lg bg-teal-50 px-2.5 py-1 text-sm font-semibold text-teal-700">
              {tip.pattern}
            </span>
          </div>
        </div>
        <p className="leading-relaxed text-stone-700">{tip.explanation}</p>
        <div className="rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base italic text-stone-800">
              <Highlighted text={tip.exampleEn} highlight={tip.highlight} />
            </p>
            <button
              type="button"
              onClick={() => speak(tip.exampleEn, accent, 0.9)}
              className="shrink-0 rounded-full p-1.5 text-teal-600 transition hover:bg-teal-50"
              aria-label="ฟังเสียงตัวอย่าง"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <p className="mt-1 text-sm text-stone-500">{tip.exampleTh}</p>
        </div>
      </Card>

      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">🎧 ลองฟังแล้วตอบ</p>
        <Button variant="secondary" onClick={() => speak(check.audio, accent, 0.9)}>
          ▶️ ฟังเสียง
        </Button>
        <p className="font-medium text-stone-800">{check.question}</p>
        <div className="grid gap-2">
          {check.choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => onAnswer(i)}
              className={`flex items-center justify-between gap-2 rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition ${choiceStyle(
                answered,
                i === check.answerIndex,
                i === answer,
                'practice',
              )}`}
            >
              {letter(i)}. {choice}
              {answered && i === check.answerIndex && <Check size={16} className="shrink-0" />}
              {answered && i === answer && i !== check.answerIndex && <X size={16} className="shrink-0" />}
            </button>
          ))}
        </div>
        {answered && (
          <div
            className={`space-y-1 rounded-xl px-4 py-3 text-sm animate-fadeIn ${
              answer === check.answerIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
            }`}
          >
            <p>
              <span className="font-bold">{answer === check.answerIndex ? 'ถูกต้อง! ' : 'ยังไม่ถูก — '}</span>
              {check.explanation}
            </p>
            <p className="text-xs italic opacity-80">เสียงที่ได้ยิน: "{check.audio}"</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default function ListeningPracticePage() {
  const { part } = useParams()
  const partNum = Number(part) as 1 | 2 | 3 | 4
  const [searchParams] = useSearchParams()
  // ?set=k is one short practice set from the learning path; without it the whole part is practised
  const practiceSets = [1, 2, 3, 4].includes(partNum) ? listeningPracticeSets(partNum) : []
  const setParam = searchParams.get('set')
  const setIndex = setParam !== null && practiceSets[Number(setParam)] ? Number(setParam) : null
  const groups = setIndex !== null ? practiceSets[setIndex] : listeningGroupsByPart(partNum)
  const lesson = listeningLessonFor(partNum)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const passStep = useProgressStore((s) => s.passStep)
  const completeLesson = useProgressStore((s) => s.completeLesson)

  const [phase, setPhase] = useState<Phase>(lesson && setIndex === null ? 'lesson' : 'practice')
  const [lessonStep, setLessonStep] = useState(0)
  const [tipAnswers, setTipAnswers] = useState<Record<number, number>>({})
  const [mode, setMode] = useState<Mode>('practice')
  const [accent, setAccent] = useState<Accent>('US')
  const [groupIndex, setGroupIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showScript, setShowScript] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showReview, setShowReview] = useState(false)

  if (![1, 2, 3, 4].includes(partNum) || groups.length === 0) return <Navigate to="/listening" replace />

  const allQuestions = groups.flatMap((g) => g.questions)
  const totalQuestions = allQuestions.length
  const score = allQuestions.filter((q) => answers[q.id] === q.answerIndex).length
  const passed = totalQuestions > 0 && score / totalQuestions >= PASS_THRESHOLD
  const group = groups[groupIndex]
  const audioOnly = partNum <= 2
  const questionsBefore = groups.slice(0, groupIndex).reduce((sum, g) => sum + g.questions.length, 0)
  const groupAnswered = group ? group.questions.every((q) => answers[q.id] !== undefined) : false

  const tips = lesson?.tips ?? []
  const lastLessonStep = tips.length + 1
  const tip = lessonStep >= 1 && lessonStep <= tips.length ? tips[lessonStep - 1] : null
  const tipNeedsAnswer = tip !== null && tipAnswers[lessonStep - 1] === undefined

  function goLesson(to: number) {
    playClickSound()
    setLessonStep(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function startPractice() {
    playClickSound()
    setPhase('practice')
    setGroupIndex(0)
    setAnswers({})
    setShowScript(false)
    setHasPlayed(false)
    setShowReview(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function playGroupAudio() {
    if (!group || isSpeaking) return
    setIsSpeaking(true)
    try {
      if (partNum === 1) {
        const choices = group.questions[0].choices
        for (let i = 0; i < choices.length; i++) await speak(`${letter(i)}. ${choices[i]}`, accent, 0.85)
      } else if (partNum === 2) {
        await speak(group.audioScript ?? '', accent, 0.9)
        const choices = group.questions[0].choices
        for (let i = 0; i < choices.length; i++) await speak(`${letter(i)}. ${choices[i]}`, accent, 0.85)
      } else {
        await speak(group.audioScript ?? '', accent, 0.9)
      }
    } finally {
      setHasPlayed(true)
      setIsSpeaking(false)
    }
  }

  function handleSelect(questionId: string, choiceIndex: number) {
    if (answers[questionId] !== undefined) return
    const question = group.questions.find((q) => q.id === questionId)!
    const correct = choiceIndex === question.answerIndex
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }))
    recordAnswer('listening', correct)
    if (mode === 'practice') {
      if (correct) playCorrectSound()
      else playIncorrectSound()
    }
  }

  function nextGroup() {
    setShowScript(false)
    setHasPlayed(false)
    if (groupIndex + 1 < groups.length) {
      playClickSound()
      setGroupIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    playCompleteSound()
    if (passed) {
      const step = findStep('listening', String(partNum))
      if (setIndex !== null && step) {
        completeLesson(lessonKey(step, `p${setIndex}`))
        const done = useProgressStore.getState().passedLessons
        if (practiceSets.every((_, k) => done.includes(lessonKey(step, `p${k}`)))) passStep('listening', String(partNum))
      } else passStep('listening', String(partNum))
    }
    setPhase('summary')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const settings = (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex overflow-hidden rounded-full border border-sand-200 bg-white text-xs">
        {(['practice', 'exam'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 font-medium transition ${mode === m ? 'bg-brand-600 text-white' : 'text-stone-500'}`}
          >
            {m === 'practice' ? 'โหมดฝึก' : 'โหมดจำลองสอบ'}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        {ACCENTS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAccent(a)}
            className={`rounded-full border px-2.5 py-1 text-xs ${accent === a ? 'border-brand-600 bg-brand-600 text-white' : 'border-sand-200 bg-white text-stone-500'}`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  )

  // ---------- Lesson: intro, strategy tips with a listening check each, then ready ----------
  if (phase === 'lesson' && lesson) {
    return (
      <div className="mx-auto max-w-2xl space-y-5 pb-10">
        <div className="flex items-center gap-3">
          <Link to="/listening" className="shrink-0 text-stone-400 hover:text-stone-600" aria-label="ออกจากบทเรียน">
            <X size={22} />
          </Link>
          <div className="flex flex-1 gap-1">
            {Array.from({ length: lastLessonStep + 1 }, (_, i) => (
              <span
                key={i}
                className={`h-2.5 flex-1 rounded-full transition-colors ${i <= lessonStep ? 'bg-gradient-to-r from-teal-500 to-cyan-600' : 'bg-sand-200'}`}
              />
            ))}
          </div>
          <span className="shrink-0 text-xs font-semibold text-stone-400">
            {lessonStep}/{lastLessonStep}
          </span>
        </div>

        {lessonStep === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-700 px-6 py-8 text-white shadow-sm">
              <span className="pointer-events-none absolute -right-4 -top-4 text-8xl opacity-20">{lesson.emoji}</span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
                Listening · Part {partNum}
              </span>
              <h1 className="relative mt-3 text-2xl font-extrabold leading-snug">
                {lesson.emoji} {lesson.titleTh}
              </h1>
              <p className="relative mt-2 text-sm text-white/85">{lesson.formatTh}</p>
            </div>
            <Card className="border-teal-200 bg-teal-50">
              <p className="leading-relaxed text-stone-700">{lesson.introTh}</p>
            </Card>
            <Card>
              <p className="mb-3 text-sm font-semibold text-stone-500">เทคนิคที่จะได้เรียน {tips.length} ข้อ</p>
              <ol className="space-y-2">
                {tips.map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-stone-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                      {i + 1}
                    </span>
                    {t.label}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs text-stone-400">
                จากนั้นฝึกจริง {totalQuestions} ข้อ — ได้ {Math.round(PASS_THRESHOLD * 100)}% ขึ้นไปเพื่อผ่านด่านนี้
              </p>
            </Card>
            <Card className="space-y-2">
              <p className="text-sm font-semibold text-stone-500">ตั้งค่าเสียง</p>
              {settings}
            </Card>
          </div>
        )}

        {tip && (
          <TipStep
            key={lessonStep}
            tip={tip}
            number={lessonStep}
            accent={accent}
            answer={tipAnswers[lessonStep - 1]}
            onAnswer={(i) => {
              setTipAnswers((prev) => ({ ...prev, [lessonStep - 1]: i }))
              if (i === tip.check.answerIndex) playCorrectSound()
              else playIncorrectSound()
            }}
          />
        )}

        {lessonStep === lastLessonStep && (
          <div className="space-y-4 animate-fadeIn">
            <Card>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-400">📋 สรุปเทคนิค Part {partNum}</p>
              <div className="divide-y divide-sand-100">
                {tips.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goLesson(i + 1)}
                    className="flex w-full items-start gap-3 py-2.5 text-left transition hover:bg-sand-50"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-stone-800">{t.label}</span>
                      <span className="block text-xs text-teal-700">{t.pattern}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Card>
            <Card className="flex items-start gap-3 border-amber-200 bg-amber-50">
              <span className="text-2xl">💡</span>
              <p className="text-sm text-stone-700">{lesson.tipTh}</p>
            </Card>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {lessonStep > 0 && (
            <Button variant="secondary" onClick={() => goLesson(lessonStep - 1)} className="py-3" aria-label="ย้อนกลับ">
              <ChevronLeft size={18} />
            </Button>
          )}
          {lessonStep === lastLessonStep ? (
            <Button onClick={startPractice} className="flex-1 py-3 text-base">
              🎧 เริ่มฝึก {totalQuestions} ข้อ →
            </Button>
          ) : (
            <Button onClick={() => goLesson(lessonStep + 1)} disabled={tipNeedsAnswer} className="flex-1 py-3 text-base">
              {lessonStep === 0 ? 'เริ่มเรียนเทคนิค →' : tipNeedsAnswer ? 'ตอบคำถามก่อนไปต่อ' : 'ต่อไป →'}
            </Button>
          )}
        </div>
        {lessonStep === 0 && (
          <button type="button" onClick={startPractice} className="block w-full text-center text-sm text-stone-400 hover:text-stone-600">
            ข้ามไปฝึกเลย →
          </button>
        )}
      </div>
    )
  }

  // ---------- Summary ----------
  if (phase === 'summary') {
    return (
      <div className="mx-auto max-w-2xl space-y-4 pb-10">
        <Card className="space-y-2 py-8 text-center">
          <p className="text-4xl">{passed ? '🎉' : '🎧'}</p>
          <h1 className="text-xl font-extrabold text-stone-800">
            {!passed ? 'ยังไม่ผ่าน ลองอีกครั้งนะ' : setIndex !== null ? `ผ่านชุดที่ ${setIndex + 1} ของ Part ${partNum} แล้ว!` : `ผ่าน Part ${partNum} แล้ว!`}
          </h1>
          <p className="text-3xl font-bold text-brand-600">
            {score} / {totalQuestions}
          </p>
          <p className="text-sm text-stone-500">
            {passed
              ? setIndex !== null && setIndex + 1 < practiceSets.length
                ? `ชุดที่ ${setIndex + 2} ปลดล็อกแล้ว`
                : 'ด่านถัดไปในแผนการเรียนปลดล็อกแล้ว'
              : `ต้องได้อย่างน้อย ${Math.ceil(totalQuestions * PASS_THRESHOLD)} ข้อ — ทบทวนเทคนิคแล้วลองใหม่`}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <Button onClick={startPractice}>ฝึกอีกครั้ง</Button>
            <Button variant="secondary" onClick={() => setShowReview((v) => !v)}>
              {showReview ? 'ซ่อนเฉลย' : '📋 ดูเฉลยทุกข้อ'}
            </Button>
            {lesson && (
              <Button
                variant="secondary"
                onClick={() => {
                  setPhase('lesson')
                  setLessonStep(0)
                }}
              >
                ทบทวนเทคนิค
              </Button>
            )}
            {passed && setIndex !== null && setIndex + 1 < practiceSets.length && (
              <Link to={`/listening/${partNum}?set=${setIndex + 1}`} onClick={startPractice}>
                <Button>ชุดถัดไป →</Button>
              </Link>
            )}
            <Link to={passed || setIndex !== null ? '/study-plan' : '/listening'}>
              <Button variant="secondary">{passed || setIndex !== null ? 'ไปแผนการเรียน' : 'เลือก Part อื่น'}</Button>
            </Link>
          </div>
        </Card>

        {showReview &&
          groups.map((g) => (
            <Card key={g.id} className="space-y-3">
              <pre className="whitespace-pre-wrap rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 font-sans text-sm text-stone-600">
                {scriptOf(g)}
              </pre>
              {g.questions.map((q) => {
                const mine = answers[q.id]
                const right = mine === q.answerIndex
                return (
                  <div key={q.id} className="space-y-1 text-sm">
                    {!audioOnly && <p className="font-semibold text-stone-800">{q.question}</p>}
                    <p className={right ? 'text-emerald-700' : 'text-rose-700'}>
                      {right ? '✓ ' : '✗ '}
                      คำตอบของคุณ: {mine === undefined ? '—' : letter(mine)}
                      {!right && ` · เฉลย: ${letter(q.answerIndex)}${audioOnly ? '' : ` ${q.choices[q.answerIndex]}`}`}
                    </p>
                    {q.explanationTh && <p className="text-stone-600">{q.explanationTh}</p>}
                  </div>
                )
              })}
            </Card>
          ))}
      </div>
    )
  }

  // ---------- Practice ----------
  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Link to="/listening" className="text-stone-400 hover:text-stone-600" aria-label="ออก">
            <X size={22} />
          </Link>
          <h1 className="text-lg font-bold text-stone-800">Listening Part {partNum}</h1>
        </div>
        {settings}
      </div>

      <div>
        <div className="mb-1 flex justify-between text-xs text-stone-500">
          <span>
            ข้อที่ {questionsBefore + 1}
            {group.questions.length > 1 ? `–${questionsBefore + group.questions.length}` : ''} / {totalQuestions}
          </span>
          {mode === 'practice' && <span>ถูก {score} ข้อ</span>}
        </div>
        <ProgressBar value={questionsBefore} max={totalQuestions} />
      </div>

      <Card className="space-y-4">
        {group.imageId && <SceneIllustration id={group.imageId} />}

        <Button variant="secondary" onClick={playGroupAudio} disabled={isSpeaking || (mode === 'exam' && hasPlayed)}>
          {isSpeaking
            ? '🔊 กำลังเล่น...'
            : mode === 'exam' && hasPlayed
              ? '🔇 ฟังได้ครั้งเดียวในโหมดจำลองสอบ'
              : partNum <= 2
                ? '▶️ ฟังเสียง'
                : `▶️ ฟัง${partNum === 3 ? 'บทสนทนา' : 'ประกาศ'}`}
        </Button>

        {audioOnly ? (
          <div className={`grid gap-3 ${group.questions[0].choices.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
            {group.questions[0].choices.map((_, i) => {
              const q = group.questions[0]
              const selected = answers[q.id]
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(q.id, i)}
                  disabled={selected !== undefined}
                  className={`aspect-square rounded-2xl border-2 text-xl font-bold transition ${choiceStyle(
                    selected !== undefined,
                    i === q.answerIndex,
                    i === selected,
                    mode,
                  )}`}
                >
                  {letter(i)}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-5">
            {group.questions.map((q) => {
              const selected = answers[q.id]
              return (
                <div key={q.id}>
                  <p className="mb-2 text-sm font-semibold text-stone-800">{q.question}</p>
                  <div className="grid gap-2">
                    {q.choices.map((choice, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelect(q.id, i)}
                        disabled={selected !== undefined}
                        className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition ${choiceStyle(
                          selected !== undefined,
                          i === q.answerIndex,
                          i === selected,
                          mode,
                        )}`}
                      >
                        {letter(i)}. {choice}
                      </button>
                    ))}
                  </div>
                  {mode === 'practice' && selected !== undefined && q.explanationTh && (
                    <p
                      className={`mt-2 rounded-xl px-4 py-2.5 text-sm animate-fadeIn ${
                        selected === q.answerIndex ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      {q.explanationTh}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {audioOnly && mode === 'practice' && groupAnswered && group.questions[0].explanationTh && (
          <p
            className={`rounded-xl px-4 py-2.5 text-sm animate-fadeIn ${
              answers[group.questions[0].id] === group.questions[0].answerIndex
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-rose-50 text-rose-800'
            }`}
          >
            <span className="font-bold">เฉลย {letter(group.questions[0].answerIndex)} — </span>
            {group.questions[0].explanationTh}
          </p>
        )}

        {groupAnswered && (
          <div className="space-y-3">
            {mode === 'practice' && (
              <>
                <button type="button" onClick={() => setShowScript((r) => !r)} className="text-sm text-brand-600 hover:underline">
                  {showScript ? 'ซ่อนสคริปต์' : 'แสดงสคริปต์'}
                </button>
                {showScript && (
                  <pre className="whitespace-pre-wrap rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 font-sans text-sm text-stone-600">
                    {scriptOf(group)}
                  </pre>
                )}
              </>
            )}
            <Button onClick={nextGroup} className="w-full py-3">
              {groupIndex + 1 >= groups.length ? 'ดูผลคะแนน' : 'ข้อถัดไป →'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
