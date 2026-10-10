import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Volume2 } from 'lucide-react'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { speak } from '../../lib/tts'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'
import type { VocabWord } from '../../lib/types'

const ROUND_SIZE = 10

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function scrambleLetters(term: string): string[] {
  const letters = term.split('')
  let attempt = shuffle(letters)
  let tries = 0
  while (attempt.join('') === letters.join('') && tries < 10) {
    attempt = shuffle(letters)
    tries++
  }
  return attempt
}

interface Tile {
  id: number
  char: string
}

export default function WordScramblePage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)

  const backTo = isGlobal ? '/games' : `/vocabulary/${chapterId}`
  const title = isGlobal ? 'ทุกบท' : chapter?.titleTh ?? ''

  const words: VocabWord[] = useMemo(() => {
    const sourceWords = isGlobal ? allWords() : chapter?.words
    if (!sourceWords) return []
    const singleWord = sourceWords.filter((w) => /^[a-zA-Z]+$/.test(w.term))
    return shuffle(singleWord).slice(0, Math.min(ROUND_SIZE, singleWord.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, isGlobal])

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [usedHint, setUsedHint] = useState(false)
  const word = words[index]

  const [pool, setPool] = useState<Tile[]>(() => (word ? scrambleLetters(word.term).map((char, id) => ({ id, char })) : []))
  const [answer, setAnswer] = useState<Tile[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />
  if (words.length === 0) return <Navigate to={backTo} replace />

  const done = index >= words.length

  function loadWord(i: number) {
    const w = words[i]
    setPool(scrambleLetters(w.term).map((char, id) => ({ id, char })))
    setAnswer([])
    setFeedback(null)
    setUsedHint(false)
  }

  function pickLetter(tile: Tile, isHint = false) {
    if (feedback !== null) return
    setPool((p) => p.filter((t) => t.id !== tile.id))
    const nextAnswer = [...answer, tile]
    setAnswer(nextAnswer)
    const hinted = usedHint || isHint

    if (nextAnswer.length === word.term.length) {
      const guess = nextAnswer.map((t) => t.char).join('')
      const correct = guess.toLowerCase() === word.term.toLowerCase()
      setFeedback(correct ? 'correct' : 'wrong')
      recordAnswer('vocabulary', correct && !hinted)
      if (correct) {
        setScore((s) => s + (hinted ? 0.5 : 1))
        playCorrectSound()
      } else {
        playIncorrectSound()
      }
    }
  }

  function removeLetter(tile: Tile) {
    if (feedback !== null) return
    setAnswer((a) => a.filter((t) => t.id !== tile.id))
    setPool((p) => [...p, tile])
  }

  function reshuffle() {
    if (feedback !== null) return
    setPool((p) => shuffle(p))
  }

  function giveHint() {
    if (feedback !== null) return
    const nextChar = word.term[answer.length]
    const tileIndex = pool.findIndex((t) => t.char.toLowerCase() === nextChar.toLowerCase())
    if (tileIndex === -1) return
    setUsedHint(true)
    const tile = pool[tileIndex]
    pickLetter(tile)
  }

  function next() {
    const isLast = index + 1 >= words.length
    if (isLast) {
      setIndex((i) => i + 1)
      const accuracy = score / words.length
      addXp(Math.round(accuracy * 20))
      playCompleteSound()
    } else {
      setIndex((i) => i + 1)
      loadWord(index + 1)
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">🔤 Word Scramble — {title}</h1>
      </div>

      <ProgressBar value={index} max={words.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">🔤</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">ทำถูก {score}/{words.length} คำ</p>
          <Link to={backTo}>
            <Button className="mt-4">กลับไปหน้าเลือกเกม</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-stone-500">เรียงตัวอักษรให้เป็นคำศัพท์ที่ตรงกับความหมายนี้</p>
              <p className="text-xl font-semibold text-stone-800 mt-1">{word.meaningTh}</p>
              <p className="text-xs text-stone-400">({word.pos})</p>
            </div>
            <button
              onClick={() => speak(word.term)}
              className="shrink-0 rounded-full p-2 bg-sand-100 text-brand-600 hover:bg-sand-200"
              aria-label="ฟังเสียง"
            >
              <Volume2 size={18} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[3rem] rounded-xl border-2 border-dashed border-sand-300 p-3">
            {answer.length === 0 && <span className="text-sm text-stone-400">แตะตัวอักษรด้านล่างเพื่อเริ่มสะกดคำ</span>}
            {answer.map((tile) => (
              <button
                key={tile.id}
                onClick={() => removeLetter(tile)}
                disabled={feedback !== null}
                className={`w-10 h-10 rounded-lg border font-bold uppercase text-lg transition ${
                  feedback === 'correct'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : feedback === 'wrong'
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-brand-600 border-brand-600 text-white'
                }`}
              >
                {tile.char}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {pool.map((tile) => (
              <button
                key={tile.id}
                onClick={() => pickLetter(tile)}
                className="w-10 h-10 rounded-lg border border-sand-300 bg-white font-bold uppercase text-lg hover:border-brand-400 hover:bg-sand-50 transition"
              >
                {tile.char}
              </button>
            ))}
          </div>

          {feedback && (
            <div className={feedback === 'correct' ? 'text-emerald-600 text-center' : 'text-rose-600 text-center'}>
              {feedback === 'correct' ? '✅ ถูกต้อง!' : `❌ คำตอบคือ "${word.term}"`}
            </div>
          )}

          <div className="flex gap-3 justify-center">
            {feedback === null ? (
              <>
                <Button variant="secondary" onClick={reshuffle}>🔀 สลับใหม่</Button>
                <Button variant="secondary" onClick={giveHint}>💡 ใบ้ตัวอักษร</Button>
              </>
            ) : (
              <Button onClick={next}>{index + 1 >= words.length ? 'ดูผลคะแนน' : 'ข้อถัดไป →'}</Button>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
