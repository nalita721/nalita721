import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Volume2 } from 'lucide-react'
import { Button, Card, ProgressBar } from '../../components/ui'
import { zhFoundations } from '../../data/langs/zh-foundations'
import { speakLang } from '../../lib/tts'
import { useProgressStore } from '../../store/progress'
import { playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { PinyinDrillItem, PinyinGroup, ToneInfo } from '../../lib/langTypes'

type Tab = 'pinyin' | 'tones' | 'drill' | 'hanzi'
const TABS: { id: Tab; label: string }[] = [
  { id: 'pinyin', label: '🔤 พินอิน' },
  { id: 'tones', label: '🎵 วรรณยุกต์' },
  { id: 'drill', label: '🎧 ฝึกฟัง' },
  { id: 'hanzi', label: '✍️ อักษรจีน' },
]
const DRILL_LENGTH = 15
const TONE_COLOR = ['', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#a8a29e']

const say = (hanzi: string) => speakLang(hanzi, 'zh-CN', 0.7)

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function SoundGroups({ groups }: { groups: PinyinGroup[] }) {
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <Card key={g.titleTh} className="space-y-3">
          <p className="text-sm font-semibold text-stone-600">{g.titleTh}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {g.sounds.map((s) => (
              <button
                key={s.pinyin}
                type="button"
                onClick={() => say(s.hanzi)}
                className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-left transition hover:border-rose-400 hover:bg-rose-50 active:scale-95"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xl font-bold text-stone-800">{s.pinyin}</span>
                  <span className="text-xs text-stone-400">
                    {s.hanzi} {s.example}
                  </span>
                </div>
                <p className="text-sm text-rose-700">{s.thai}</p>
                {s.noteTh && <p className="mt-0.5 text-xs text-stone-500">{s.noteTh}</p>}
              </button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

/** Pitch contour drawn on the 5-level Chao scale. */
function ToneContour({ tone }: { tone: ToneInfo }) {
  const w = 80
  const h = 50
  const y = (level: number) => h - 5 - ((level - 1) / 4) * (h - 10)
  const pts = tone.contour.map((lvl, i) => `${tone.contour.length === 1 ? w / 2 : 8 + (i * (w - 16)) / (tone.contour.length - 1)},${y(lvl)}`)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-20 shrink-0" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((l) => (
        <line key={l} x1="2" x2={w - 2} y1={y(l)} y2={y(l)} stroke="#e7e5e4" strokeWidth="1" />
      ))}
      {pts.length === 1 ? (
        <circle cx={w / 2} cy={y(tone.contour[0])} r="4" fill={TONE_COLOR[tone.tone]} />
      ) : (
        <polyline points={pts.join(' ')} fill="none" stroke={TONE_COLOR[tone.tone]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function Drill({ onFinish }: { onFinish: (ratio: number) => void }) {
  const [mode, setMode] = useState<'tone' | 'pinyin'>('tone')
  const [round, setRound] = useState(0)
  const items = useMemo(
    () =>
      shuffle(zhFoundations.drill)
        .slice(0, DRILL_LENGTH)
        .map((it: PinyinDrillItem) => ({
          it,
          choices: mode === 'tone' ? ['1', '2', '3', '4'] : shuffle([it.pinyin, ...it.confusables.slice(0, 3)]),
        })),
    // a new round or mode reshuffles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, round],
  )
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  function reset(m = mode) {
    setMode(m)
    setRound((r) => r + 1)
    setIndex(0)
    setScore(0)
    setPicked(null)
  }

  const modeSwitch = (
    <div className="flex overflow-hidden rounded-xl border border-sand-200 bg-white text-sm">
      {(['tone', 'pinyin'] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => reset(m)}
          className={`flex-1 py-2 font-semibold transition ${mode === m ? 'bg-rose-600 text-white' : 'text-stone-500'}`}
        >
          {m === 'tone' ? 'ฟังแล้วเลือกเสียงวรรณยุกต์' : 'ฟังแล้วเลือกพินอิน'}
        </button>
      ))}
    </div>
  )

  if (index >= items.length) {
    return (
      <div className="space-y-4">
        {modeSwitch}
        <Card className="space-y-3 py-8 text-center">
          <p className="text-4xl">{score / items.length >= 0.8 ? '🎉' : '🎧'}</p>
          <p className="text-2xl font-bold text-rose-600">
            {score} / {items.length}
          </p>
          <Button onClick={() => reset()}>ฝึกอีกรอบ</Button>
        </Card>
      </div>
    )
  }

  const { it, choices } = items[index]
  const correct = mode === 'tone' ? String(it.tone) : it.pinyin

  return (
    <div className="space-y-4">
      {modeSwitch}
      <div className="flex justify-between text-xs text-stone-500">
        <span>
          ข้อ {index + 1}/{items.length}
        </span>
        <span>ถูก {score}</span>
      </div>
      <ProgressBar value={index} max={items.length} />
      <Card className="space-y-4 text-center">
        <button
          type="button"
          onClick={() => say(it.hanzi)}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition hover:bg-rose-200 active:scale-95"
          aria-label="ฟังเสียง"
        >
          <Volume2 size={40} />
        </button>
        <p className="text-sm text-stone-500">{mode === 'tone' ? 'เสียงนี้เป็นวรรณยุกต์ที่เท่าไร' : 'เสียงนี้เขียนพินอินว่าอะไร'}</p>
        {picked && (
          <p className="animate-fadeIn">
            <span className="text-4xl text-stone-800">{it.hanzi}</span>{' '}
            <span className="text-lg font-semibold text-rose-600">{it.pinyin}</span>{' '}
            <span className="text-sm text-stone-500">{it.meaningTh}</span>
          </p>
        )}
        <div className={`grid gap-2 ${mode === 'tone' ? 'grid-cols-4' : 'grid-cols-2'}`}>
          {choices.map((c) => {
            const style = !picked
              ? 'border-sand-200 bg-white hover:border-rose-400'
              : c === correct
                ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                : c === picked
                  ? 'border-rose-400 bg-rose-50 text-rose-800'
                  : 'border-sand-200 bg-white opacity-50'
            return (
              <button
                key={c}
                type="button"
                disabled={!!picked}
                onClick={() => {
                  setPicked(c)
                  if (c === correct) {
                    setScore((s) => s + 1)
                    playCorrectSound()
                  } else playIncorrectSound()
                }}
                className={`rounded-xl border-2 py-3 text-lg font-bold transition ${style}`}
              >
                {mode === 'tone' ? `เสียง ${c}` : c}
              </button>
            )
          })}
        </div>
        {picked && (
          <Button
            className="w-full py-3"
            onClick={() => {
              const last = index + 1 >= items.length
              setPicked(null)
              setIndex((i) => i + 1)
              if (last) {
                playCompleteSound()
                onFinish(score / items.length)
              }
            }}
          >
            {index + 1 >= items.length ? 'ดูผล' : 'ข้อถัดไป →'}
          </Button>
        )}
      </Card>
    </div>
  )
}

export default function PinyinPage() {
  const recordLangBest = useProgressStore((s) => s.recordLangBest)
  const [tab, setTab] = useState<Tab>('pinyin')
  const [showIntro, setShowIntro] = useState(false)
  const f = zhFoundations

  return (
    <div className="mx-auto max-w-2xl space-y-5 pb-10">
      <Link to="/chinese" className="text-sm text-brand-600 hover:underline">
        ← 🇨🇳 ภาษาจีน
      </Link>
      <div>
        <p className="text-xs font-semibold text-rose-600">ขั้นที่ 0 · ปูพื้นฐานก่อนเรียน HSK</p>
        <h1 className="text-2xl font-extrabold text-stone-800">พินอิน วรรณยุกต์ และอักษรจีนเบื้องต้น</h1>
        <p className={`mt-1 text-stone-500 ${showIntro ? '' : 'line-clamp-3'}`}>{f.introTh}</p>
        <button type="button" onClick={() => setShowIntro((v) => !v)} className="text-sm font-semibold text-rose-600">
          {showIntro ? 'ย่อ' : 'อ่านต่อ'}
        </button>
      </div>

      <div className="grid grid-cols-4 overflow-hidden rounded-xl border border-sand-200 bg-white text-xs sm:text-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`py-2.5 font-semibold transition ${tab === t.id ? 'bg-sand-900 text-white' : 'text-stone-500'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'pinyin' && (
        <div className="space-y-5">
          <p className="text-sm text-stone-500">พินอิน = พยัญชนะต้น + สระ + วรรณยุกต์ · แตะแต่ละเสียงเพื่อฟังจากตัวอักษรตัวอย่าง</p>
          <h2 className="font-bold text-stone-800">พยัญชนะต้น (声母)</h2>
          <SoundGroups groups={f.initials} />
          <h2 className="font-bold text-stone-800">สระ (韵母)</h2>
          <SoundGroups groups={f.finals} />
        </div>
      )}

      {tab === 'tones' && (
        <div className="space-y-4">
          {f.tones.map((t) => (
            <Card key={t.tone} className="flex items-center gap-4">
              <ToneContour tone={t} />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-stone-800" style={{ color: TONE_COLOR[t.tone] }}>
                  {t.nameTh} <span className="text-stone-400">{t.mark}</span>
                </p>
                <p className="text-sm text-stone-600">{t.thaiCompare}</p>
              </div>
              <button
                type="button"
                onClick={() => say(t.hanzi)}
                className="shrink-0 rounded-xl border border-sand-200 px-3 py-2 text-center hover:border-rose-400"
              >
                <span className="block text-2xl text-stone-800">{t.hanzi}</span>
                <span className="block text-xs text-rose-600">{t.example}</span>
                <span className="block text-[11px] text-stone-400">{t.meaningTh}</span>
              </button>
            </Card>
          ))}
          <Button variant="secondary" className="w-full" onClick={async () => { for (const t of f.tones) await say(t.hanzi) }}>
            ▶️ ฟังเทียบทั้ง 5 เสียงติดกัน
          </Button>

          <h2 className="pt-2 font-bold text-stone-800">กฎการเปลี่ยนเสียง (变调)</h2>
          {f.toneRules.map((r) => (
            <Card key={r.titleTh} className="space-y-2">
              <p className="font-semibold text-stone-800">{r.titleTh}</p>
              <p className="text-sm text-stone-600">{r.explanation}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {r.examples.map((e) => (
                  <button
                    key={e.hanzi}
                    type="button"
                    onClick={() => say(e.hanzi)}
                    className="flex items-center justify-between gap-2 rounded-xl bg-sand-50 px-3 py-2 text-left hover:bg-rose-50"
                  >
                    <span>
                      <span className="text-lg text-stone-800">{e.hanzi}</span>{' '}
                      <span className="text-xs text-stone-500">{e.meaningTh}</span>
                      <span className="block text-xs">
                        <span className="text-stone-400 line-through">{e.written}</span> →{' '}
                        <span className="font-semibold text-rose-600">{e.spoken}</span>
                      </span>
                    </span>
                    <Volume2 size={16} className="shrink-0 text-stone-400" />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'drill' && <Drill onFinish={(r) => recordLangBest('zh:foundations:drill', r)} />}

      {tab === 'hanzi' && (
        <div className="space-y-5">
          <h2 className="font-bold text-stone-800">เส้นพื้นฐาน 8 แบบ (笔画)</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {f.strokes.map((s) => (
              <Card key={s.nameZh} className="space-y-1 text-center">
                <p className="text-4xl text-stone-800">{s.stroke}</p>
                <p className="text-sm font-semibold text-stone-700">{s.nameTh}</p>
                <p className="text-xs text-stone-400">{s.nameZh}</p>
                <p className="text-xs text-stone-500">{s.descriptionTh}</p>
                <p className="text-xs text-rose-600">เช่น {s.exampleHanzi}</p>
              </Card>
            ))}
          </div>

          <h2 className="font-bold text-stone-800">กฎลำดับการเขียน (笔顺)</h2>
          <Card className="divide-y divide-sand-100">
            {f.strokeOrder.map((r, i) => (
              <div key={r.ruleTh} className="flex items-start gap-3 py-2.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-800">{r.ruleTh}</p>
                  <p className="text-xs text-stone-500">{r.explanation}</p>
                </div>
                <span className="shrink-0 text-3xl text-stone-800">{r.exampleHanzi}</span>
              </div>
            ))}
          </Card>

          <h2 className="font-bold text-stone-800">หมวดนำที่ใช้บ่อย (部首) — ช่วยเดาความหมาย</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {f.radicals.map((r) => (
              <Card key={r.radical} className="flex items-start gap-3">
                <div className="shrink-0 text-center">
                  <p className="text-3xl text-rose-700">{r.variant ?? r.radical}</p>
                  {r.variant && <p className="text-xs text-stone-400">มาจาก {r.radical}</p>}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-800">
                    {r.meaningTh} <span className="font-normal text-stone-400">{r.pinyin}</span>
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {r.examples.map((e) => (
                      <button
                        key={e.hanzi}
                        type="button"
                        onClick={() => say(e.hanzi)}
                        className="rounded-lg bg-sand-50 px-2 py-1 text-left hover:bg-rose-50"
                        title={e.meaningTh}
                      >
                        <span className="text-lg text-stone-800">{e.hanzi}</span>{' '}
                        <span className="text-[11px] text-stone-500">
                          {e.pinyin} {e.meaningTh}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="space-y-2 border-amber-200 bg-amber-50">
            <p className="text-sm font-semibold text-stone-700">💡 เทคนิคการจำ</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-stone-700">
              {f.tipsTh.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
