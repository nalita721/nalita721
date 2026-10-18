import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Eye, EyeOff, Lightbulb, Volume2 } from 'lucide-react'
import { Button, Card, ProgressBar } from '../../components/ui'
import { speakLang } from '../../lib/tts'
import { useProgressStore } from '../../store/progress'
import { playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { LangCode, LangWord } from '../../lib/langTypes'
import { bestKey, useLangLevel } from './useLangLevel'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function Flashcards({ words, tts, readingLabel }: { words: LangWord[]; tts: string; readingLabel: string }) {
  const [index, setIndex] = useState(0)
  const [showReading, setShowReading] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const word = words[index]

  function go(to: number) {
    setIndex(to)
    setRevealed(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          {index + 1} / {words.length}
        </span>
        <button type="button" onClick={() => setShowReading((v) => !v)} className="flex items-center gap-1 hover:text-stone-700">
          {showReading ? <EyeOff size={14} /> : <Eye size={14} />} {showReading ? 'ซ่อน' : 'แสดง'}{readingLabel}
        </button>
      </div>
      <ProgressBar value={index + 1} max={words.length} />

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{word.pos}</span>
          <button
            type="button"
            onClick={() => speakLang(word.word, tts)}
            className="flex items-center gap-1.5 text-sm text-stone-400 transition hover:text-brand-600"
          >
            <Volume2 size={16} /> ฟังเสียง
          </button>
        </div>

        <button type="button" onClick={() => setRevealed(true)} className="block w-full py-4 text-center">
          <p className="text-5xl font-bold text-stone-800">{word.word}</p>
          {showReading && (
            <p className="mt-2 text-base font-medium text-brand-500">
              {word.reading}
              {word.romaji && <span className="text-stone-400"> · {word.romaji}</span>}
            </p>
          )}
          {revealed ? (
            <p className="mt-3 text-xl text-stone-700 animate-fadeIn">{word.meaningTh}</p>
          ) : (
            <p className="mt-3 text-sm text-stone-400">แตะเพื่อดูความหมาย</p>
          )}
        </button>

        {revealed && (
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-start justify-between gap-3 rounded-xl border border-sand-200 bg-sand-50 px-4 py-3">
              <div>
                <p className="text-lg text-stone-800">{word.example}</p>
                {showReading && <p className="text-sm italic text-stone-500">{word.exampleReading}</p>}
                <p className="mt-1 text-sm text-stone-500">{word.exampleTh}</p>
              </div>
              <button
                type="button"
                onClick={() => speakLang(word.example, tts)}
                className="mt-1 shrink-0 text-stone-400 transition hover:text-brand-600"
                aria-label="ฟังประโยคตัวอย่าง"
              >
                <Volume2 size={16} />
              </button>
            </div>
            {word.mnemonicTh && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                <p className="text-sm text-stone-700">{word.mnemonicTh}</p>
              </div>
            )}
          </div>
        )}
      </Card>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0} className="py-3">
          <ChevronLeft size={18} />
        </Button>
        <Button onClick={() => go(Math.min(words.length - 1, index + 1))} disabled={index === words.length - 1} className="flex-1 py-3">
          คำถัดไป <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

function Quiz({ words, tts, onFinish }: { words: LangWord[]; tts: string; onFinish: (ratio: number) => void }) {
  const [round, setRound] = useState(0)
  const quiz = useMemo(
    () =>
      shuffle(words).map((w) => {
        const choices = shuffle([w, ...shuffle(words.filter((o) => o.id !== w.id && o.meaningTh !== w.meaningTh)).slice(0, 3)])
        return { word: w, choices }
      }),
    // a new round reshuffles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [words, round],
  )
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const done = index >= quiz.length

  if (done) {
    const ratio = score / quiz.length
    return (
      <Card className="space-y-3 py-10 text-center">
        <p className="text-4xl">{ratio >= 0.7 ? '🎉' : '📝'}</p>
        <p className="text-2xl font-bold text-brand-600">
          {score} / {quiz.length}
        </p>
        <p className="text-sm text-stone-500">{ratio >= 0.7 ? 'จำได้ดีมาก!' : 'ลองทบทวนด้วย Flashcard แล้วทำใหม่'}</p>
        <Button
          onClick={() => {
            setRound((r) => r + 1)
            setIndex(0)
            setScore(0)
            setSelected(null)
          }}
        >
          ทำอีกครั้ง
        </Button>
      </Card>
    )
  }

  const q = quiz[index]

  function choose(id: string) {
    if (selected) return
    setSelected(id)
    const correct = id === q.word.id
    if (correct) {
      setScore((s) => s + 1)
      playCorrectSound()
    } else playIncorrectSound()
    speakLang(q.word.word, tts)
  }

  function next() {
    const last = index + 1 >= quiz.length
    setSelected(null)
    setIndex((i) => i + 1)
    if (last) {
      playCompleteSound()
      onFinish(score / quiz.length)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-stone-500">
        <span>
          ข้อ {index + 1} / {quiz.length}
        </span>
        <span>ถูก {score}</span>
      </div>
      <ProgressBar value={index} max={quiz.length} />
      <Card className="space-y-4">
        <p className="text-center text-sm text-stone-500">คำนี้แปลว่าอะไร</p>
        <p className="text-center text-5xl font-bold text-stone-800">{q.word.word}</p>
        {selected && <p className="text-center text-brand-500 animate-fadeIn">{q.word.reading}</p>}
        <div className="grid gap-2 sm:grid-cols-2">
          {q.choices.map((c) => {
            const style = !selected
              ? 'border-sand-200 bg-white hover:border-brand-400'
              : c.id === q.word.id
                ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                : c.id === selected
                  ? 'border-rose-400 bg-rose-50 text-rose-800'
                  : 'border-sand-200 bg-white opacity-50'
            return (
              <button
                key={c.id}
                type="button"
                disabled={!!selected}
                onClick={() => choose(c.id)}
                className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${style}`}
              >
                {c.meaningTh}
              </button>
            )
          })}
        </div>
        {selected && (
          <Button onClick={next} className="w-full py-3">
            {index + 1 >= quiz.length ? 'ดูผล' : 'ข้อถัดไป →'}
          </Button>
        )}
      </Card>
    </div>
  )
}

export default function LangVocabPage({ lang }: { lang: LangCode }) {
  const { chapterId } = useParams()
  const { track, meta, content, loading } = useLangLevel(lang)
  const recordLangBest = useProgressStore((s) => s.recordLangBest)
  const [mode, setMode] = useState<'cards' | 'quiz'>('cards')

  if (!meta) return <Navigate to={track.path} replace />
  if (loading || !content) return <p className="py-10 text-center text-stone-400">กำลังโหลดเนื้อหา…</p>
  const chapter = content.chapters.find((c) => c.id === chapterId)
  if (!chapter) return <Navigate to={`${track.path}/${meta.slug}`} replace />

  return (
    <div className="mx-auto max-w-xl space-y-5 pb-10">
      <div>
        <Link to={`${track.path}/${meta.slug}`} className="text-sm text-brand-600 hover:underline">
          ← {meta.code}
        </Link>
        <h1 className="mt-2 text-xl font-bold text-stone-800">
          {chapter.emoji} {chapter.titleTh}
        </h1>
        <p className="text-sm text-stone-500">{chapter.description}</p>
      </div>

      <div className="flex overflow-hidden rounded-xl border border-sand-200 bg-white text-sm">
        {(['cards', 'quiz'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-2 font-semibold transition ${mode === m ? 'bg-sand-900 text-white' : 'text-stone-500'}`}
          >
            {m === 'cards' ? '🃏 Flashcard' : '📝 แบบทดสอบ'}
          </button>
        ))}
      </div>

      {mode === 'cards' ? (
        <Flashcards words={chapter.words} tts={track.ttsLang} readingLabel={track.readingLabel} />
      ) : (
        <Quiz
          words={chapter.words}
          tts={track.ttsLang}
          onFinish={(ratio) => recordLangBest(bestKey(lang, meta.slug, `v:${chapter.id}`), ratio)}
        />
      )}
    </div>
  )
}
