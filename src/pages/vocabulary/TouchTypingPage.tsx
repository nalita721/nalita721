import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { getWordIcon } from '../../data/wordIcons'
import { WordIcon } from '../../components/WordIcon'
import { Keyboard, HandsDiagram } from '../../components/TouchTypingKeyboard'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function TouchTypingPage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const backTo = isGlobal ? '/games' : `/vocabulary/${chapterId}`
  const title = isGlobal ? 'ทุกบท' : chapter?.titleTh ?? ''

  const words = useMemo(() => shuffle(isGlobal ? allWords() : chapter?.words ?? []), [chapter, isGlobal])
  const [index, setIndex] = useState(0)
  const [typedCount, setTypedCount] = useState(0)
  const [wordMistakes, setWordMistakes] = useState(0)
  const [perfectWords, setPerfectWords] = useState(0)
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null)

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />

  const word = words[index]
  const done = index >= words.length
  const target = word ? word.term.toLowerCase() : ''
  const currentChar = target[typedCount] ?? ''

  useEffect(() => {
    if (done || !word) return
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const activeEl = e.target as HTMLElement | null
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key === 'Spacebar' ? ' ' : null
      if (key === null) return
      e.preventDefault()
      if (key === currentChar) {
        setFlash('correct')
        const nextCount = typedCount + 1
        setTypedCount(nextCount)
        if (nextCount >= target.length) {
          const isLast = index + 1 >= words.length
          recordAnswer('vocabulary', wordMistakes === 0)
          if (wordMistakes === 0) setPerfectWords((p) => p + 1)
          playCorrectSound()
          setTimeout(() => {
            setTypedCount(0)
            setWordMistakes(0)
            setFlash(null)
            setIndex((i) => i + 1)
            if (isLast) playCompleteSound()
          }, 450)
        }
      } else {
        setFlash('wrong')
        setWordMistakes((m) => m + 1)
        playIncorrectSound()
        setTimeout(() => setFlash(null), 200)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, word, typedCount, currentChar, target, index, words.length, wordMistakes])

  function restart() {
    setIndex(0)
    setTypedCount(0)
    setWordMistakes(0)
    setPerfectWords(0)
    setFlash(null)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">พิมพ์สัมผัส — {title}</h1>
        <p className="text-stone-500 text-sm mt-1">ฝึกพิมพ์คำศัพท์แบบสัมผัส ดูว่านิ้วไหนกดปุ่มไหน แล้วพิมพ์ตามให้ถูกต้อง</p>
      </div>

      <ProgressBar value={index} max={words.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">⌨️</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">พิมพ์ครบแล้ว {perfectWords}/{words.length} คำ (ไม่พิมพ์ผิดเลย)</p>
          <p className="text-sm text-stone-500 mt-1">ฝึกบ่อยๆ จะพิมพ์ได้เร็วและแม่นขึ้นโดยไม่ต้องมองแป้นพิมพ์</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={restart}>เล่นอีกครั้ง</Button>
            <Link to={backTo}>
              <Button variant="secondary">กลับไปหน้าเลือกเกม</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="space-y-5">
          <div className="flex flex-col items-center text-center gap-2">
            <WordIcon iconKey={getWordIcon(word.id)} className="w-12 h-12 text-brand-600" />
            <p className="text-2xl font-bold tracking-wide">
              {target.split('').map((ch, i) => (
                <span
                  key={i}
                  className={
                    i < typedCount
                      ? 'text-brand-600'
                      : i === typedCount
                        ? `underline decoration-2 underline-offset-4 ${flash === 'wrong' ? 'text-rose-500' : 'text-stone-800'}`
                        : 'text-stone-300'
                  }
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </p>
            <p className="text-sm text-stone-500">{word.meaningTh}</p>
          </div>

          <div className="rounded-xl bg-sand-50 border border-sand-200 py-4 flex flex-col items-center gap-4">
            <HandsDiagram activeKey={currentChar} />
            <Keyboard activeKey={currentChar} />
          </div>

          <p className="text-center text-xs text-stone-400">
            {wordMistakes > 0 ? `พิมพ์ผิดไปแล้ว ${wordMistakes} ครั้งในคำนี้` : 'พิมพ์ตัวอักษรที่ขีดเส้นใต้ตามแป้นพิมพ์จริง'}
          </p>
        </Card>
      )}
    </div>
  )
}
