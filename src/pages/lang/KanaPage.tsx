import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, ProgressBar } from '../../components/ui'
import { kanaTables } from '../../data/langs/ja-kana'
import { speakLang } from '../../lib/tts'
import { useProgressStore } from '../../store/progress'
import { playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { KanaChar, KanaRow, KanaTable } from '../../lib/langTypes'

const QUIZ_LENGTH = 20

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function allChars(table: KanaTable, withVoiced: boolean): KanaChar[] {
  const rows = withVoiced ? [...table.basic, ...table.voiced] : table.basic
  return rows.flatMap((r) => r.chars.filter((c): c is KanaChar => c !== null))
}

function Grid({ rows, cols }: { rows: KanaRow[]; cols: number }) {
  return (
    <div className="space-y-1.5">
      {rows.map((row) => (
        <div key={row.label} className="grid items-center gap-1.5" style={{ gridTemplateColumns: `4.5rem repeat(${cols}, minmax(0, 1fr))` }}>
          <span className="truncate text-xs text-stone-400">{row.label}</span>
          {row.chars.map((c, i) =>
            c ? (
              <button
                key={i}
                type="button"
                onClick={() => speakLang(c.kana, 'ja-JP', 0.8)}
                className="flex flex-col items-center rounded-xl border border-sand-200 bg-white py-1.5 transition hover:border-pink-400 hover:bg-pink-50 active:scale-95"
              >
                <span className="text-2xl font-medium text-stone-800">{c.kana}</span>
                <span className="text-xs text-stone-400">{c.romaji}</span>
              </button>
            ) : (
              <span key={i} />
            ),
          )}
        </div>
      ))}
    </div>
  )
}

function KanaQuiz({ table, onFinish }: { table: KanaTable; onFinish: (ratio: number) => void }) {
  const [withVoiced, setWithVoiced] = useState(false)
  const [round, setRound] = useState(0)
  const pool = allChars(table, withVoiced)
  const quiz = useMemo(
    () =>
      shuffle(pool)
        .slice(0, QUIZ_LENGTH)
        .map((c) => ({ c, choices: shuffle([c, ...shuffle(pool.filter((o) => o.romaji !== c.romaji)).slice(0, 3)]) })),
    // reshuffle per round or option change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.id, withVoiced, round],
  )
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  function restart(voiced = withVoiced) {
    setWithVoiced(voiced)
    setRound((r) => r + 1)
    setIndex(0)
    setScore(0)
    setPicked(null)
  }

  if (index >= quiz.length) {
    return (
      <Card className="space-y-3 py-8 text-center">
        <p className="text-4xl">{score / quiz.length >= 0.8 ? '🎉' : '📝'}</p>
        <p className="text-2xl font-bold text-pink-600">
          {score} / {quiz.length}
        </p>
        <Button onClick={() => restart()}>ทำอีกครั้ง</Button>
      </Card>
    )
  }

  const q = quiz[index]
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-stone-600">
        <input type="checkbox" checked={withVoiced} onChange={(e) => restart(e.target.checked)} className="accent-pink-600" />
        รวมเสียงขุ่น (が ざ だ ば ぱ)
      </label>
      <div className="flex justify-between text-xs text-stone-500">
        <span>
          ข้อ {index + 1}/{quiz.length}
        </span>
        <span>ถูก {score}</span>
      </div>
      <ProgressBar value={index} max={quiz.length} />
      <Card className="space-y-4 text-center">
        <p className="text-7xl font-medium text-stone-800">{q.c.kana}</p>
        <div className="grid grid-cols-2 gap-2">
          {q.choices.map((c) => {
            const style = !picked
              ? 'border-sand-200 bg-white hover:border-pink-400'
              : c.romaji === q.c.romaji
                ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                : c.romaji === picked
                  ? 'border-rose-400 bg-rose-50 text-rose-800'
                  : 'border-sand-200 bg-white opacity-50'
            return (
              <button
                key={c.kana}
                type="button"
                disabled={!!picked}
                onClick={() => {
                  setPicked(c.romaji)
                  speakLang(q.c.kana, 'ja-JP', 0.8)
                  if (c.romaji === q.c.romaji) {
                    setScore((s) => s + 1)
                    playCorrectSound()
                  } else playIncorrectSound()
                }}
                className={`rounded-xl border-2 py-3 text-lg font-semibold transition ${style}`}
              >
                {c.romaji}
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

export default function KanaPage() {
  const recordLangBest = useProgressStore((s) => s.recordLangBest)
  const [tableId, setTableId] = useState<KanaTable['id']>('hiragana')
  const [tab, setTab] = useState<'table' | 'quiz'>('table')
  const table = kanaTables.find((t) => t.id === tableId)!

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-10">
      <Link to="/japanese" className="text-sm text-brand-600 hover:underline">
        ← 🇯🇵 ภาษาญี่ปุ่น
      </Link>
      <div>
        <h1 className="text-2xl font-extrabold text-stone-800">ตัวอักษรฮิรางานะ และคาตาคานะ</h1>
        <p className="mt-1 text-stone-500">{table.introTh}</p>
      </div>

      <div className="flex gap-2">
        {kanaTables.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTableId(t.id)}
            className={`flex-1 rounded-xl border-2 py-2.5 font-bold transition ${
              tableId === t.id ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-sand-200 bg-white text-stone-500'
            }`}
          >
            {t.titleTh}
          </button>
        ))}
      </div>

      <div className="flex overflow-hidden rounded-xl border border-sand-200 bg-white text-sm">
        {(['table', 'quiz'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setTab(m)}
            className={`flex-1 py-2 font-semibold transition ${tab === m ? 'bg-sand-900 text-white' : 'text-stone-500'}`}
          >
            {m === 'table' ? '📋 ตาราง + เสียง' : '📝 แบบฝึกจำตัวอักษร'}
          </button>
        ))}
      </div>

      {tab === 'table' ? (
        <>
          <Card className="space-y-3">
            <p className="text-sm font-semibold text-stone-600">ตัวพื้นฐาน 46 ตัว — แตะเพื่อฟังเสียง</p>
            <Grid rows={table.basic} cols={5} />
          </Card>
          <Card className="space-y-3">
            <p className="text-sm font-semibold text-stone-600">เสียงขุ่น (゛) และเสียงกึ่งขุ่น (゜)</p>
            <Grid rows={table.voiced} cols={5} />
          </Card>
          <Card className="space-y-3">
            <p className="text-sm font-semibold text-stone-600">เสียงควบ (ตัวเล็ก ゃ ゅ ょ)</p>
            <Grid rows={table.combos} cols={3} />
          </Card>
          <Card className="space-y-2 border-amber-200 bg-amber-50">
            <p className="text-sm font-semibold text-stone-700">💡 เกร็ดสำคัญ</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700">
              {table.tipsTh.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        </>
      ) : (
        <KanaQuiz key={table.id} table={table} onFinish={(r) => recordLangBest(`ja:kana:${table.id}`, r)} />
      )}
    </div>
  )
}
