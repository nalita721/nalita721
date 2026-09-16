import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { listeningByPart } from '../../data/listening'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { speak, type Accent } from '../../lib/tts'
import { SceneIllustration } from '../../components/SceneIllustration'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

const ACCENTS: Accent[] = ['US', 'UK', 'AU', 'CA']

export default function ListeningPracticePage() {
  const { part } = useParams()
  const partNum = Number(part) as 1 | 2 | 3 | 4
  const items = listeningByPart(partNum)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const [accent, setAccent] = useState<Accent>('US')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [revealed, setRevealed] = useState(false)

  if (![1, 2, 3, 4].includes(partNum) || items.length === 0) return <Navigate to="/listening" replace />

  const item = items[index]
  const done = index >= items.length
  const audioOnly = partNum <= 2

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    const correct = i === item.answerIndex
    recordAnswer('listening', correct)
    if (correct) {
      setScore((s) => s + 1)
      playCorrectSound()
    } else {
      playIncorrectSound()
    }
  }

  function next() {
    setSelected(null)
    setRevealed(false)
    const isLast = index + 1 >= items.length
    setIndex((i) => i + 1)
    if (isLast) playCompleteSound()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <Link to="/listening" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
          <h1 className="text-xl font-bold text-stone-800 mt-2">Listening Part {partNum}</h1>
        </div>
        <div className="flex gap-1">
          {ACCENTS.map((a) => (
            <button
              key={a}
              onClick={() => setAccent(a)}
              className={`text-xs px-2.5 py-1 rounded-full border ${accent === a ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-sand-200 text-stone-500'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <ProgressBar value={index} max={items.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">🎧</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{items.length}</p>
          <Link to="/listening">
            <Button className="mt-4">กลับไปเลือก Part อื่น</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-stone-400">ข้อที่ {index + 1}/{items.length}</p>

          {item.imageId && <SceneIllustration id={item.imageId} />}
          {item.imageDescription && (
            <p className="text-center text-xs text-stone-500">{item.imageDescription}</p>
          )}

          {!audioOnly && (
            <Button variant="secondary" onClick={() => speak(item.script, accent)}>
              ▶️ ฟัง{partNum === 3 ? 'บทสนทนา' : 'ประกาศ'}
            </Button>
          )}

          <p className="text-stone-800 font-medium">{item.question}</p>

          <div className="grid gap-2">
            {item.choices.map((choice, i) => (
              <div key={i} className="flex items-center gap-2">
                {audioOnly && (
                  <button
                    type="button"
                    onClick={() => speak(choice, accent)}
                    className="shrink-0 rounded-lg border border-sand-200 px-2 py-2 text-sm hover:bg-sand-50"
                    aria-label={`ฟังตัวเลือก ${String.fromCharCode(65 + i)}`}
                  >
                    🔊
                  </button>
                )}
                <button
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`flex-1 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selected === null
                      ? 'bg-white border-sand-200 hover:border-brand-400'
                      : i === item.answerIndex
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                      : i === selected
                      ? 'bg-rose-50 border-rose-400 text-rose-700'
                      : 'bg-white border-sand-200 opacity-60'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {audioOnly && selected === null ? '••• (ฟังเสียงก่อนเลือก)' : choice}
                </button>
              </div>
            ))}
          </div>

          {selected !== null && (
            <div className="space-y-2">
              <button onClick={() => setRevealed((r) => !r)} className="text-sm text-brand-600 hover:underline" type="button">
                {revealed ? 'ซ่อน Transcript' : 'แสดง Transcript'}
              </button>
              {revealed && (
                <pre className="whitespace-pre-wrap rounded-xl bg-sand-50 border border-sand-200 px-4 py-3 text-sm text-stone-600 font-sans">
                  {item.transcript}
                </pre>
              )}
              <div>
                <Button onClick={next}>ข้อถัดไป →</Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
