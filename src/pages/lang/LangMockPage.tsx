import { useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Clock, X } from 'lucide-react'
import { Button, Card, ProgressBar } from '../../components/ui'
import { speakLang } from '../../lib/tts'
import { useCountdown } from '../../lib/useCountdown'
import { useProgressStore } from '../../store/progress'
import { playClickSound, playCompleteSound } from '../../lib/sound'
import type { LangCode, LangExamQuestion, LangExamSection } from '../../lib/langTypes'
import { bestKey, useLangLevel } from './useLangLevel'

const SECTION_ICON: Record<LangExamSection['kind'], string> = {
  listening: '🎧',
  reading: '📖',
  vocab: '🔤',
  grammar: '✍️',
  writing: '✏️',
}

function formatTime(sec: number) {
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`
}

export default function LangMockPage({ lang }: { lang: LangCode }) {
  const { track, meta, content, loading } = useLangLevel(lang)
  const recordLangBest = useProgressStore((s) => s.recordLangBest)
  const [phase, setPhase] = useState<'intro' | 'running' | 'done'>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [plays, setPlays] = useState<Record<string, number>>({})
  const [speaking, setSpeaking] = useState(false)
  const [reviewSection, setReviewSection] = useState<string | null>(null)
  const finishedRef = useRef(false)
  const minutes = content?.mock.minutes ?? 0
  const { secondsLeft, start, stop } = useCountdown(minutes * 60, () => finish())

  if (!meta) return <Navigate to={track.path} replace />
  if (loading || !content) return <p className="py-10 text-center text-stone-400">กำลังโหลดเนื้อหา…</p>

  const { mock } = content
  const levelPath = `${track.path}/${meta.slug}`
  const flat = mock.sections.flatMap((section) => section.questions.map((q) => ({ section, q })))
  const total = flat.length
  const maxPlays = lang === 'zh' ? 2 : 1
  const correctIn = (qs: LangExamQuestion[]) => qs.filter((q) => answers[q.id] === q.answerIndex).length
  const score = correctIn(flat.map((f) => f.q))
  const passed = score / total >= mock.passRatio

  function begin() {
    playClickSound()
    finishedRef.current = false
    setAnswers({})
    setPlays({})
    setIndex(0)
    setReviewSection(null)
    setPhase('running')
    start()
  }

  function finish() {
    if (finishedRef.current) return
    finishedRef.current = true
    stop()
    window.speechSynthesis?.cancel()
    recordLangBest(bestKey(lang, meta!.slug, 'mock'), score / total)
    playCompleteSound()
    setPhase('done')
    window.scrollTo({ top: 0 })
  }

  async function play(q: LangExamQuestion) {
    if (!q.audio || speaking || (plays[q.id] ?? 0) >= maxPlays) return
    setSpeaking(true)
    setPlays((p) => ({ ...p, [q.id]: (p[q.id] ?? 0) + 1 }))
    try {
      await speakLang(q.audio, track.ttsLang, lang === 'zh' ? 0.8 : 0.85)
    } finally {
      setSpeaking(false)
    }
  }

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-xl space-y-5 pb-10">
        <Link to={levelPath} className="text-sm text-brand-600 hover:underline">
          ← {meta.code}
        </Link>
        <Card className="space-y-4 text-center">
          <p className="text-4xl">🏆</p>
          <h1 className="text-2xl font-extrabold text-stone-800">
            ข้อสอบจำลอง {track.examName} {meta.code.replace(/^HSK /, '')}
          </h1>
          <p className="text-stone-500">
            {total} ข้อ · จับเวลา {minutes} นาที · ทำต่อเนื่องเหมือนวันสอบจริง
          </p>
          <div className="divide-y divide-sand-100 rounded-xl border border-sand-200 text-left">
            {mock.sections.map((s) => (
              <div key={s.id} className="flex items-start gap-3 px-4 py-2.5">
                <span className="text-xl">{SECTION_ICON[s.kind]}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-800">{s.titleTh}</p>
                  <p className="text-xs text-stone-500">{s.instructionsTh}</p>
                </div>
                <span className="shrink-0 text-xs text-stone-400">{s.questions.length} ข้อ</span>
              </div>
            ))}
          </div>
          <p className="rounded-xl bg-sand-50 px-3 py-2 text-xs text-stone-600">🎯 {mock.passTh}</p>
          {mock.sections.some((s) => s.kind === 'listening') && (
            <p className="text-xs text-stone-400">
              ข้อฟังกดฟังได้ {maxPlays} ครั้งต่อข้อ{lang === 'zh' ? ' (ข้อสอบ HSK จริงเล่นเสียง 2 รอบ)' : ' (ข้อสอบ JLPT จริงเล่นเสียงรอบเดียว)'}
            </p>
          )}
          <Button onClick={begin} className="w-full py-3 text-base">
            เริ่มทำข้อสอบ
          </Button>
        </Card>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="mx-auto max-w-2xl space-y-4 pb-10">
        <Card className="space-y-3 py-8 text-center">
          <p className="text-4xl">{passed ? '🎉' : '📝'}</p>
          <h1 className="text-xl font-extrabold text-stone-800">
            {passed ? `ผ่านเกณฑ์ ${meta.code}!` : 'ยังไม่ถึงเกณฑ์ผ่าน'}
          </h1>
          <p className="text-3xl font-bold text-brand-600">
            {score} / {total}
            <span className="ml-2 text-base text-stone-400">({Math.round((score / total) * 100)}%)</span>
          </p>
          <p className="text-xs text-stone-500">เกณฑ์ในแอปนี้: {Math.round(mock.passRatio * 100)}% · {mock.passTh}</p>
          <div className="mx-auto grid max-w-md gap-2 pt-2 text-left">
            {mock.sections.map((s) => {
              const got = correctIn(s.questions)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setReviewSection((cur) => (cur === s.id ? null : s.id))}
                  className="rounded-xl border border-sand-200 px-3 py-2 transition hover:bg-sand-50"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-stone-700">
                      {SECTION_ICON[s.kind]} {s.titleTh}
                    </span>
                    <span className="text-stone-500">
                      {got}/{s.questions.length}
                    </span>
                  </div>
                  <ProgressBar value={got} max={s.questions.length} />
                </button>
              )
            })}
          </div>
          <p className="text-xs text-stone-400">แตะแต่ละส่วนเพื่อดูเฉลย</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button onClick={begin}>ทำอีกครั้ง</Button>
            <Link to={levelPath}>
              <Button variant="secondary">กลับหน้า {meta.code}</Button>
            </Link>
          </div>
        </Card>

        {mock.sections
          .filter((s) => s.id === reviewSection)
          .flatMap((s) => s.questions)
          .map((q, i) => {
            const mine = answers[q.id]
            const right = mine === q.answerIndex
            return (
              <Card key={q.id} className="space-y-2 text-sm">
                <p className="text-xs text-stone-400">ข้อ {i + 1}</p>
                {q.audio && <p className="rounded-lg bg-sand-50 px-3 py-2 text-stone-600">🎧 {q.audio}</p>}
                {q.passage && <p className="whitespace-pre-wrap rounded-lg bg-sand-50 px-3 py-2 text-stone-600">{q.passage}</p>}
                <p className="font-medium text-stone-800">{q.prompt}</p>
                <p className={right ? 'text-emerald-700' : 'text-rose-700'}>
                  {right ? '✓' : '✗'} คำตอบของคุณ: {mine === undefined ? '— (ไม่ได้ตอบ)' : q.choices[mine]}
                  {!right && ` · เฉลย: ${q.choices[q.answerIndex]}`}
                </p>
                <p className="text-stone-600">{q.explanationTh}</p>
              </Card>
            )
          })}
      </div>
    )
  }

  const { section, q } = flat[index]
  const firstOfSection = index === 0 || flat[index - 1].section.id !== section.id
  const answered = answers[q.id] !== undefined
  const usedPlays = plays[q.id] ?? 0

  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-10">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            if (!window.confirm('ออกจากข้อสอบ? คำตอบจะไม่ถูกบันทึก')) return
            stop()
            window.speechSynthesis?.cancel()
            setPhase('intro')
          }}
          className="text-stone-400 hover:text-stone-600"
          aria-label="ออก"
        >
          <X size={22} />
        </button>
        <span className="text-sm text-stone-500">
          ข้อ {index + 1}/{total}
        </span>
        <span className={`flex items-center gap-1 font-semibold ${secondsLeft <= 60 ? 'text-rose-600' : 'text-brand-600'}`}>
          <Clock size={16} /> {formatTime(secondsLeft)}
        </span>
      </div>
      <ProgressBar value={index} max={total} />

      <Card className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
            {SECTION_ICON[section.kind]} {section.titleTh}
          </p>
          {firstOfSection && <p className="mt-1 rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">{section.instructionsTh}</p>}
        </div>

        {q.audio && (
          <Button variant="secondary" onClick={() => play(q)} disabled={speaking || usedPlays >= maxPlays}>
            {speaking ? '🔊 กำลังเล่น…' : usedPlays >= maxPlays ? '🔇 ฟังครบแล้ว' : `▶️ ฟังเสียง (${maxPlays - usedPlays} ครั้ง)`}
          </Button>
        )}

        {q.passage && (
          <div className="whitespace-pre-wrap rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 text-lg leading-relaxed text-stone-800">
            {q.passage}
          </div>
        )}

        <p className="text-lg font-medium text-stone-800">{q.prompt}</p>

        <div className="grid gap-2">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
              className={`rounded-xl border-2 px-4 py-3 text-left text-base transition ${
                answers[q.id] === i ? 'border-brand-600 bg-brand-50 font-semibold text-brand-800' : 'border-sand-200 bg-white hover:border-brand-400'
              }`}
            >
              {String.fromCharCode(65 + i)}. {choice}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0} className="py-3">
          ← ก่อนหน้า
        </Button>
        {index + 1 < total ? (
          <Button onClick={() => setIndex((i) => i + 1)} className="flex-1 py-3">
            {answered ? 'ข้อถัดไป →' : 'ข้ามไปก่อน →'}
          </Button>
        ) : (
          <Button
            onClick={() => {
              const left = total - Object.keys(answers).length
              if (left === 0 || window.confirm(`ยังไม่ได้ตอบ ${left} ข้อ ส่งข้อสอบเลยไหม?`)) finish()
            }}
            className="flex-1 py-3"
          >
            ส่งข้อสอบ
          </Button>
        )}
      </div>
    </div>
  )
}
