import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { chineseVocabChapters, type ChineseVocabWord } from '../../data/chineseContent'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

const allWords = chineseVocabChapters[0].words

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

interface Question {
  word: ChineseVocabWord
  choices: ChineseVocabWord[]
}

function buildQuiz(): Question[] {
  return shuffle(allWords).map((word) => {
    const distractors = shuffle(allWords.filter((w) => w.id !== word.id)).slice(0, 3)
    return { word, choices: shuffle([word, ...distractors]) }
  })
}

export default function ChineseQuizPage() {
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)
  const quiz = useMemo(buildQuiz, [])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const q = quiz[index]
  const done = index >= quiz.length

  function handleSelect(choiceId: string) {
    if (selected) return
    setSelected(choiceId)
    const correct = choiceId === q.word.id
    recordAnswer('vocabulary', correct)
    if (correct) {
      setScore((s) => s + 1)
      addXp(4)
      playCorrectSound()
    } else {
      playIncorrectSound()
    }
  }

  function next() {
    setSelected(null)
    const isLast = index + 1 >= quiz.length
    setIndex((i) => i + 1)
    if (isLast) playCompleteSound()
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to="/chinese/vocabulary" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">แบบทดสอบคำศัพท์ภาษาจีน</h1>
      </div>

      <ProgressBar value={index} max={quiz.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">{score / quiz.length >= 0.8 ? '🏆' : '📝'}</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{quiz.length}</p>
          <Link to="/chinese/vocabulary">
            <Button className="mt-4">กลับไปหน้าคำศัพท์</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-sm text-stone-500">เลือกความหมายที่ถูกต้องของคำนี้</p>
          <div className="text-center py-2">
            <h2 className="text-3xl font-bold text-stone-800">{q.word.hanzi}</h2>
            <p className="text-sm text-brand-500 mt-1">{q.word.pinyin}</p>
          </div>
          <div className="grid gap-2">
            {q.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                disabled={selected !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  selected === null
                    ? 'bg-white border-sand-200 hover:border-brand-400'
                    : c.id === q.word.id
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : c.id === selected
                    ? 'bg-rose-50 border-rose-400 text-rose-700'
                    : 'bg-white border-sand-200 opacity-60'
                }`}
              >
                {c.meaningTh}
              </button>
            ))}
          </div>
          {selected && <Button onClick={next}>ข้อถัดไป →</Button>}
        </Card>
      )}
    </div>
  )
}
