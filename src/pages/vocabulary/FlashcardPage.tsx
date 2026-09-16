import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { useProgressStore } from '../../store/progress'
import { isDue } from '../../lib/srs'
import { speak } from '../../lib/tts'
import { Button, Card, ProgressBar } from '../../components/ui'
import { WordIcon } from '../../components/WordIcon'
import { getWordIcon } from '../../data/wordIcons'
import { playCompleteSound } from '../../lib/sound'
import type { QuizQuality } from '../../lib/types'

export default function FlashcardPage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const srsMap = useProgressStore((s) => s.srsMap)
  const reviewWord = useProgressStore((s) => s.reviewWord)
  const touchStreak = useProgressStore((s) => s.touchStreak)

  const backTo = isGlobal ? '/games' : `/vocabulary/${chapterId}`
  const title = isGlobal ? 'ทุกบท' : chapter?.titleTh ?? ''

  const queue = useMemo(() => {
    const sourceWords = isGlobal ? allWords() : chapter?.words
    if (!sourceWords) return []
    const due = sourceWords.filter((w) => isDue(srsMap[w.id] ?? { wordId: w.id, interval: 0, ease: 2.5, repetitions: 0, dueDate: new Date(0).toISOString() }))
    return due.length > 0 ? due : sourceWords
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, isGlobal])

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewedCount, setReviewedCount] = useState(0)

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />

  const word = queue[index]
  const done = index >= queue.length

  function handleAnswer(quality: QuizQuality) {
    if (!word) return
    reviewWord(word.id, quality)
    touchStreak()
    setReviewedCount((c) => c + 1)
    setFlipped(false)
    const isLast = index + 1 >= queue.length
    setIndex((i) => i + 1)
    if (isLast) playCompleteSound()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">Flashcard SRS — {title}</h1>
      </div>

      <ProgressBar value={reviewedCount} max={queue.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">🎉</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">ทบทวนครบแล้ว {reviewedCount} คำ</p>
          <p className="text-sm text-stone-500 mt-1">ระบบจะเตือนให้กลับมาทบทวนคำที่ยังไม่แม่นตามรอบเวลา</p>
          <Link to={backTo}>
            <Button className="mt-4">กลับไปหน้าเลือกเกม</Button>
          </Link>
        </Card>
      ) : (
        <Card className="min-h-[280px] flex flex-col items-center justify-center text-center gap-4">
          <WordIcon iconKey={getWordIcon(word.id)} />
          <span className="text-xs uppercase tracking-wide text-stone-400">{word.pos}</span>
          <h2 className="text-3xl font-bold text-stone-800">{word.term}</h2>
          <button
            onClick={() => speak(word.term)}
            className="text-brand-600 text-sm hover:underline"
            type="button"
          >
            🔊 ฟังเสียง
          </button>

          {!flipped ? (
            <Button variant="secondary" onClick={() => setFlipped(true)}>เปิดดูความหมาย</Button>
          ) : (
            <div className="space-y-2">
              <p className="text-lg text-stone-700">{word.meaningTh}</p>
              {word.synonym && <p className="text-sm text-stone-500">คำใกล้เคียง: {word.synonym}</p>}
              <p className="text-sm text-stone-600 italic mt-2">"{word.exampleEn}"</p>
              <p className="text-sm text-stone-500">{word.exampleTh}</p>
            </div>
          )}
        </Card>
      )}

      {!done && flipped && (
        <div className="grid grid-cols-3 gap-3">
          <Button variant="danger" onClick={() => handleAnswer(1)}>ยังไม่ได้</Button>
          <Button variant="secondary" onClick={() => handleAnswer(3)}>พอจำได้</Button>
          <Button variant="success" onClick={() => handleAnswer(5)}>จำได้ง่าย</Button>
        </div>
      )}
    </div>
  )
}
