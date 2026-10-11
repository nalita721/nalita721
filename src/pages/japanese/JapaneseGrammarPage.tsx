import { useState } from 'react'
import { Link } from 'react-router-dom'
import { japaneseGrammarTopics } from '../../data/japaneseContent'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'

const topic = japaneseGrammarTopics[0]

export default function JapaneseGrammarPage() {
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)

  const [phase, setPhase] = useState<'lesson' | 'quiz' | 'done'>('lesson')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const q = topic.questions[index]

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    const correct = i === q.answerIndex
    recordAnswer('grammar', correct)
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
    const isLast = index + 1 >= topic.questions.length
    if (isLast) {
      setPhase('done')
      playCompleteSound()
    } else {
      setIndex((i) => i + 1)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link to="/japanese" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">{topic.titleTh}</h1>
      </div>

      {phase === 'lesson' && (
        <div className="space-y-4">
          <Card>
            <p className="text-sm text-stone-600 leading-relaxed">{topic.introTh}</p>
          </Card>
          {topic.keyPoints.map((kp, i) => (
            <Card key={i} className="space-y-2">
              <h3 className="font-semibold text-stone-800">{kp.label}</h3>
              <p className="text-sm text-stone-600">{kp.explanation}</p>
              <div className="rounded-xl bg-sand-50 border border-sand-200 px-4 py-3">
                <p className="text-base text-stone-700">{kp.exampleJa}</p>
                <p className="text-sm text-stone-500 italic">{kp.exampleRomaji}</p>
                <p className="text-xs text-stone-400 mt-1">{kp.exampleTh}</p>
              </div>
            </Card>
          ))}
          <Button onClick={() => setPhase('quiz')} className="w-full justify-center">เริ่มทำแบบฝึกหัด →</Button>
        </div>
      )}

      {phase === 'quiz' && (
        <div className="space-y-4">
          <ProgressBar value={index} max={topic.questions.length} />
          <Card className="space-y-4">
            <p className="text-xs text-stone-400">ข้อที่ {index + 1}/{topic.questions.length}</p>
            <p className="text-lg text-stone-800">{q.sentence}</p>
            <div className="grid gap-2">
              {q.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`rounded-xl border px-4 py-3 text-left text-base transition ${
                    selected === null
                      ? 'bg-white border-sand-200 hover:border-brand-400'
                      : i === q.answerIndex
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                      : i === selected
                      ? 'bg-rose-50 border-rose-400 text-rose-700'
                      : 'bg-white border-sand-200 opacity-60'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className="space-y-2">
                <p className="text-sm text-stone-500">{q.explanation}</p>
                <Button onClick={next}>{index + 1 >= topic.questions.length ? 'ดูผลคะแนน' : 'ข้อถัดไป →'}</Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {phase === 'done' && (
        <Card className="text-center py-12">
          <p className="text-2xl">{score / topic.questions.length >= 0.8 ? '🏆' : '📝'}</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{topic.questions.length}</p>
          <Link to="/japanese">
            <Button className="mt-4">กลับหน้าภาษาญี่ปุ่น</Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
