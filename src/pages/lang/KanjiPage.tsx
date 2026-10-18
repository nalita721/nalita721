import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Volume2, X } from 'lucide-react'
import { Button, Card, ProgressBar } from '../../components/ui'
import { n5Kanji } from '../../data/langs/ja-n5-kanji'
import { speakLang } from '../../lib/tts'
import { useProgressStore } from '../../store/progress'
import { playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { Kanji } from '../../lib/langTypes'

const QUIZ_LENGTH = 20

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function KanjiDetail({ k, onClose }: { k: Kanji; onClose: () => void }) {
  return (
    <Card className="space-y-4 border-2 border-pink-200 animate-fadeIn">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="text-6xl font-medium text-stone-800">{k.kanji}</span>
          <div>
            <p className="text-lg font-bold text-stone-800">{k.meaningTh}</p>
            <p className="text-xs text-stone-400">{k.strokes} ขีด</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-600" aria-label="ปิด">
          <X size={20} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-sand-50 px-3 py-2">
          <p className="text-xs text-stone-400">อง-โยมิ (เสียงจีน)</p>
          <p className="font-semibold text-stone-800">{k.onyomi || '—'}</p>
        </div>
        <div className="rounded-xl bg-sand-50 px-3 py-2">
          <p className="text-xs text-stone-400">คุง-โยมิ (เสียงญี่ปุ่น)</p>
          <p className="font-semibold text-stone-800">{k.kunyomi || '—'}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {k.examples.map((e) => (
          <button
            key={e.word}
            type="button"
            onClick={() => speakLang(e.word, 'ja-JP')}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-sand-200 px-3 py-2 text-left hover:border-pink-300"
          >
            <span>
              <span className="text-lg text-stone-800">{e.word}</span>
              <span className="ml-2 text-sm text-pink-600">{e.reading}</span>
              <span className="ml-2 text-sm text-stone-500">{e.meaningTh}</span>
            </span>
            <Volume2 size={16} className="shrink-0 text-stone-400" />
          </button>
        ))}
      </div>
    </Card>
  )
}

function KanjiQuiz({ onFinish }: { onFinish: (ratio: number) => void }) {
  const [round, setRound] = useState(0)
  const quiz = useMemo(
    () =>
      shuffle(n5Kanji)
        .slice(0, QUIZ_LENGTH)
        .map((k) => ({ k, choices: shuffle([k, ...shuffle(n5Kanji.filter((o) => o.id !== k.id)).slice(0, 3)]) })),
    // a new round reshuffles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [round],
  )
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (index >= quiz.length) {
    return (
      <Card className="space-y-3 py-8 text-center">
        <p className="text-4xl">{score / quiz.length >= 0.7 ? '🎉' : '📝'}</p>
        <p className="text-2xl font-bold text-pink-600">
          {score} / {quiz.length}
        </p>
        <Button
          onClick={() => {
            setRound((r) => r + 1)
            setIndex(0)
            setScore(0)
          }}
        >
          ทำอีกครั้ง
        </Button>
      </Card>
    )
  }

  const q = quiz[index]
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-stone-500">
        <span>
          ข้อ {index + 1}/{quiz.length}
        </span>
        <span>ถูก {score}</span>
      </div>
      <ProgressBar value={index} max={quiz.length} />
      <Card className="space-y-4 text-center">
        <p className="text-sm text-stone-500">คันจินี้แปลว่าอะไร</p>
        <p className="text-7xl font-medium text-stone-800">{q.k.kanji}</p>
        {picked && <p className="text-sm text-pink-600 animate-fadeIn">{[q.k.kunyomi, q.k.onyomi].filter(Boolean).join(' · ')}</p>}
        <div className="grid grid-cols-2 gap-2">
          {q.choices.map((c) => {
            const style = !picked
              ? 'border-sand-200 bg-white hover:border-pink-400'
              : c.id === q.k.id
                ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                : c.id === picked
                  ? 'border-rose-400 bg-rose-50 text-rose-800'
                  : 'border-sand-200 bg-white opacity-50'
            return (
              <button
                key={c.id}
                type="button"
                disabled={!!picked}
                onClick={() => {
                  setPicked(c.id)
                  if (c.id === q.k.id) {
                    setScore((s) => s + 1)
                    playCorrectSound()
                  } else playIncorrectSound()
                }}
                className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold transition ${style}`}
              >
                {c.meaningTh}
              </button>
            )
          })}
        </div>
        {picked && (
          <Button
            className="w-full py-3"
            onClick={() => {
              const last = index + 1 >= quiz.length
              setPicked(null)
              setIndex((i) => i + 1)
              if (last) {
                playCompleteSound()
                onFinish(score / quiz.length)
              }
            }}
          >
            {index + 1 >= quiz.length ? 'ดูผล' : 'ข้อถัดไป →'}
          </Button>
        )}
      </Card>
    </div>
  )
}

export default function KanjiPage() {
  const recordLangBest = useProgressStore((s) => s.recordLangBest)
  const [tab, setTab] = useState<'list' | 'quiz'>('list')
  const [selected, setSelected] = useState<Kanji | null>(null)

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-10">
      <Link to="/japanese/n5" className="text-sm text-brand-600 hover:underline">
        ← N5
      </Link>
      <div>
        <h1 className="text-2xl font-extrabold text-stone-800">คันจิ N5 ({n5Kanji.length} ตัว)</h1>
        <p className="mt-1 text-stone-500">แตะคันจิเพื่อดูความหมาย คำอ่าน และคำศัพท์ตัวอย่างพร้อมเสียง</p>
      </div>

      <div className="flex overflow-hidden rounded-xl border border-sand-200 bg-white text-sm">
        {(['list', 'quiz'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setTab(m)}
            className={`flex-1 py-2 font-semibold transition ${tab === m ? 'bg-sand-900 text-white' : 'text-stone-500'}`}
          >
            {m === 'list' ? '📋 รายการคันจิ' : '📝 แบบทดสอบ'}
          </button>
        ))}
      </div>

      {tab === 'list' ? (
        <>
          {selected && <KanjiDetail k={selected} onClose={() => setSelected(null)} />}
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
            {n5Kanji.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => {
                  setSelected(k)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`aspect-square rounded-xl border-2 text-3xl transition hover:border-pink-400 ${
                  selected?.id === k.id ? 'border-pink-500 bg-pink-50' : 'border-sand-200 bg-white'
                }`}
                title={k.meaningTh}
              >
                {k.kanji}
              </button>
            ))}
          </div>
        </>
      ) : (
        <KanjiQuiz onFinish={(r) => recordLangBest('ja:n5:kanji', r)} />
      )}
    </div>
  )
}
