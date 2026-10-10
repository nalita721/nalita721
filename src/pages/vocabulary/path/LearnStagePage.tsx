import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Volume2 } from 'lucide-react'
import { Button, Card, ProgressBar } from '../../../components/ui'
import { useProgressStore } from '../../../store/progress'
import { speak } from '../../../lib/tts'
import { resolveGameSetContext, isStageUnlocked, stageKey, STAGE_BONUS_XP } from '../../../data/vocabularyGamePath'

export default function LearnStagePage() {
  const { chapterId, setIndex: setIndexParam } = useParams()
  const results = useProgressStore((s) => s.wordPathStageResults)
  const completeStage = useProgressStore((s) => s.completeStage)
  const [cardIndex, setCardIndex] = useState(0)
  const [done, setDone] = useState(false)

  const ctx = resolveGameSetContext(chapterId, setIndexParam)
  if (!ctx) return <Navigate to="/vocabulary" replace />
  const { chapter, setIndex, words } = ctx
  const pathTo = `/vocabulary/${chapter.id}/path`

  if (!isStageUnlocked(results, chapter.id, setIndex, 1)) return <Navigate to={pathTo} replace />

  const word = words[cardIndex]

  function finish() {
    completeStage(stageKey(chapter.id, setIndex, 1), 1, STAGE_BONUS_XP[1])
    setDone(true)
  }

  if (done) {
    return (
      <Card className="max-w-xl mx-auto text-center py-12 space-y-3">
        <p className="text-2xl">🎉</p>
        <p className="text-lg font-semibold text-stone-800">เรียนครบ {words.length} คำแล้ว!</p>
        <Link to={pathTo}>
          <Button className="mt-2">กลับไปหน้าเส้นทางเกม</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={pathTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">📖 Learn 10 Words — ชุดที่ {setIndex + 1}</h1>
      </div>

      <ProgressBar value={cardIndex} max={words.length} />

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">{cardIndex + 1} / {words.length}</span>
          <span className="rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 uppercase">{word.pos}</span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-3xl font-bold text-stone-800">{word.term}</h2>
          <p className="text-sm text-brand-500 font-medium">อ่านว่า "{word.pronunciationTh}"</p>
          <button onClick={() => speak(word.term)} type="button" className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-brand-600 transition">
            <Volume2 size={16} /> ฟังเสียง
          </button>
          <p className="text-lg text-stone-700 mt-1">{word.meaningTh}</p>
        </div>

        <div className="rounded-xl bg-sand-50 border border-sand-200 px-4 py-3">
          <p className="text-xs font-semibold text-brand-600 mb-1">Example Sentence</p>
          <p className="text-sm text-stone-600 italic">"{word.exampleEn}"</p>
          <p className="text-xs text-stone-400 mt-1">{word.exampleTh}</p>
        </div>

        {word.mnemonicTh && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">เคล็ดลับจำคำนี้</p>
            <p className="text-sm text-amber-800">{word.mnemonicTh}</p>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setCardIndex((i) => Math.max(0, i - 1))} disabled={cardIndex === 0}>
            ← คำก่อนหน้า
          </Button>
          {cardIndex + 1 >= words.length ? (
            <Button onClick={finish} className="flex-1 justify-center">เรียนจบแล้ว 🎉</Button>
          ) : (
            <Button onClick={() => setCardIndex((i) => i + 1)} className="flex-1 justify-center">คำถัดไป →</Button>
          )}
        </div>
      </Card>
    </div>
  )
}
