import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  BarChart3,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Plane,
  RotateCcw,
  Target,
  Volume2,
  X,
} from 'lucide-react'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { useProgressStore } from '../../store/progress'
import { isDue } from '../../lib/srs'
import { speak } from '../../lib/tts'
import { Button, Card, Modal, ProgressBar } from '../../components/ui'
import { PageHero } from '../../components/PageHero'
import { playCompleteSound, playCorrectSound, playIncorrectSound } from '../../lib/sound'
import type { QuizQuality } from '../../lib/types'

export default function FlashcardPage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const srsMap = useProgressStore((s) => s.srsMap)
  const reviewWord = useProgressStore((s) => s.reviewWord)
  const touchStreak = useProgressStore((s) => s.touchStreak)
  const dailyWordsReviewed = useProgressStore((s) => s.dailyWordsReviewed)

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
  const [reviewedCount, setReviewedCount] = useState(0)
  const [favorited, setFavorited] = useState<Record<string, boolean>>({})
  const [recallOpen, setRecallOpen] = useState(false)
  const [pendingQuality, setPendingQuality] = useState<QuizQuality | null>(null)
  const [recallInput, setRecallInput] = useState('')
  const [recallChecked, setRecallChecked] = useState(false)
  const [recallCorrect, setRecallCorrect] = useState(false)

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />

  const word = queue[index]
  const done = index >= queue.length

  function startRecall(quality: QuizQuality) {
    setPendingQuality(quality)
    setRecallOpen(true)
  }

  function checkRecall() {
    if (!word || !recallInput.trim()) return
    const correct = recallInput.trim().toLowerCase() === word.term.toLowerCase()
    setRecallCorrect(correct)
    setRecallChecked(true)
    if (correct) playCorrectSound()
    else playIncorrectSound()
  }

  function handleAnswer() {
    if (!word || pendingQuality === null) return
    reviewWord(word.id, pendingQuality)
    touchStreak()
    setReviewedCount((c) => c + 1)
    setRecallOpen(false)
    setPendingQuality(null)
    setRecallInput('')
    setRecallChecked(false)
    setRecallCorrect(false)
    const isLast = index + 1 >= queue.length
    setIndex((i) => i + 1)
    if (isLast) playCompleteSound()
  }

  function goPrev() {
    setIndex((i) => Math.max(0, i - 1))
  }

  function goNext() {
    setIndex((i) => Math.min(queue.length - 1, i + 1))
  }

  useEffect(() => {
    if (done || recallOpen || !word) return
    function onKey(e: KeyboardEvent) {
      if (e.key === '1') startRecall(1)
      else if (e.key === '2') startRecall(3)
      else if (e.key === '3') startRecall(5)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, recallOpen, word])

  return (
    <div className="space-y-6">
      <PageHero
        lines={['Explore', 'New Words', 'A Brighter You']}
        note="Good Ideas Better Results"
        icon={Plane}
        gradient="from-sky-100 via-amber-50 to-sand-100"
      />

      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
          <h1 className="text-xl font-bold text-stone-800 mt-2">Flashcard SRS — {title}</h1>
          <p className="text-stone-500 text-sm mt-1">ทบทวนคำศัพท์ด้วยแฟลชการ์ด จำง่าย ใช้ได้จริงในสถานการณ์ TOEIC</p>
        </div>

        <div>
          <ProgressBar value={reviewedCount} max={queue.length} />
          <p className="text-xs text-stone-400 mt-1">{reviewedCount} / {queue.length} คำ</p>
        </div>

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
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={index === 0}
              type="button"
              className="hidden sm:flex flex-col items-center gap-1.5 shrink-0 disabled:opacity-30"
            >
              <span className="w-11 h-11 rounded-full bg-white border border-sand-200 shadow-sm flex items-center justify-center text-stone-500 hover:border-brand-400 transition">
                <ChevronLeft size={20} />
              </span>
              <span className="text-[10px] text-stone-400 text-center leading-tight">คำก่อนหน้า<br />(prev)</span>
            </button>

            <Card className="flex-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">{index + 1} / {queue.length}</span>
                <button
                  type="button"
                  onClick={() => setFavorited((f) => ({ ...f, [word.id]: !f[word.id] }))}
                  aria-label="เพิ่มลงในคำที่ชอบ"
                  className="text-stone-300 hover:text-rose-500 transition"
                >
                  <Heart size={18} className={favorited[word.id] ? 'text-rose-500 fill-rose-500' : ''} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <span className="rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">{word.pos}</span>
                <h2 className="text-3xl font-bold text-stone-800">{word.term}</h2>
                <button onClick={() => speak(word.term)} type="button" className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-brand-600 transition">
                  <Volume2 size={16} /> ฟังเสียง
                </button>
                <p className="text-lg text-stone-700 mt-1">{word.meaningTh}</p>
              </div>

              <div className="rounded-xl bg-sand-50 border border-sand-200 px-4 py-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-brand-600 mb-1">Example Sentence</p>
                  <p className="text-sm text-stone-600 italic">"{word.exampleEn}"</p>
                  <p className="text-xs text-stone-400 mt-1">{word.exampleTh}</p>
                </div>
                <button onClick={() => speak(word.exampleEn)} type="button" className="shrink-0 text-stone-400 hover:text-brand-600 transition mt-4">
                  <Volume2 size={16} />
                </button>
              </div>

              {word.synonym && (
                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center gap-1.5 text-sm font-medium text-stone-600">
                    <ChevronDown size={14} className="transition group-open:rotate-180" />
                    Synonyms: <span className="text-stone-800 font-normal">{word.synonym}</span>
                  </summary>
                </details>
              )}

              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="flex flex-col items-center gap-1">
                  <Button variant="danger" className="w-full justify-center" onClick={() => startRecall(1)}>
                    <X size={14} /> จำไม่ได้
                  </Button>
                  <span className="text-[10px] text-stone-300">1</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="secondary" className="w-full justify-center" onClick={() => startRecall(3)}>
                    <RotateCcw size={14} /> ทบทวนอีกครั้ง
                  </Button>
                  <span className="text-[10px] text-stone-300">2</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="success" className="w-full justify-center" onClick={() => startRecall(5)}>
                    <Check size={14} /> จำได้
                  </Button>
                  <span className="text-[10px] text-stone-300">3</span>
                </div>
              </div>
            </Card>

            <button
              onClick={goNext}
              disabled={index >= queue.length - 1}
              type="button"
              className="hidden sm:flex flex-col items-center gap-1.5 shrink-0 disabled:opacity-30"
            >
              <span className="w-11 h-11 rounded-full bg-white border border-sand-200 shadow-sm flex items-center justify-center text-stone-500 hover:border-brand-400 transition">
                <ChevronRight size={20} />
              </span>
              <span className="text-[10px] text-stone-400 text-center leading-tight">คำถัดไป<br />(next)</span>
            </button>
          </div>
        )}

        {!done && (
          <Card className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5">
                <Target size={14} className="text-brand-600" /> เป้าหมายของคุณ
              </p>
              <p className="text-[11px] text-stone-400 mt-1">ฝึกให้ครบ {queue.length} คำ แล้วคุณจะเก่งขึ้นอีกขั้น!</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1.5">ความคืบหน้า {title}</p>
              <ProgressBar value={reviewedCount} max={queue.length} />
              <p className="text-[11px] text-stone-400 mt-1">{reviewedCount} / {queue.length}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5">
                <BarChart3 size={14} className="text-emerald-600" /> สถิติวันนี้
              </p>
              <p className="text-[11px] text-stone-400 mt-1">คุณทบทวนแล้ว {dailyWordsReviewed} คำ เก่งมาก! 🎉</p>
            </div>
          </Card>
        )}
      </div>

      {!done && recallOpen && word && (
        <Modal>
          <Card className="space-y-4">
            <div>
              <p className="font-semibold text-stone-800">✍️ เขียนทบทวนคำศัพท์</p>
              <p className="text-xs text-stone-500 mt-1">พิมพ์คำศัพท์ภาษาอังกฤษของคำที่เพิ่งเรียนก่อนไปคำถัดไป</p>
            </div>
            <p className="text-sm text-stone-600">ความหมาย: <span className="font-medium text-stone-800">{word.meaningTh}</span></p>
            <input
              autoFocus
              value={recallInput}
              disabled={recallChecked}
              onChange={(e) => setRecallInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (recallChecked ? handleAnswer() : checkRecall())}
              placeholder="พิมพ์คำศัพท์แล้วกด Enter"
              className="w-full rounded-xl border border-sand-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {recallChecked && (
              <p className={`text-sm ${recallCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                {recallCorrect ? '✅ ถูกต้อง! เขียนได้แม่นยำ' : `❌ คำตอบที่ถูกต้องคือ "${word.term}"`}
              </p>
            )}
            {!recallChecked ? (
              <Button onClick={checkRecall} disabled={!recallInput.trim()} className="w-full justify-center">ตรวจคำตอบ</Button>
            ) : (
              <Button onClick={handleAnswer} className="w-full justify-center">ถัดไป →</Button>
            )}
          </Card>
        </Modal>
      )}
    </div>
  )
}
