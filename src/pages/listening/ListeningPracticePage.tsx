import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { listeningGroupsByPart } from '../../data/listening'
import { Button, Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { speak, type Accent } from '../../lib/tts'
import { SceneIllustration } from '../../components/SceneIllustration'
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../../lib/sound'
import { PASS_THRESHOLD } from '../../data/learningPath'

const ACCENTS: Accent[] = ['US', 'UK', 'AU', 'CA']
type Mode = 'practice' | 'exam'

export default function ListeningPracticePage() {
  const { part } = useParams()
  const partNum = Number(part) as 1 | 2 | 3 | 4
  const groups = listeningGroupsByPart(partNum)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const passStep = useProgressStore((s) => s.passStep)

  const [mode, setMode] = useState<Mode>('practice')
  const [accent, setAccent] = useState<Accent>('US')
  const [groupIndex, setGroupIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [score, setScore] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  if (![1, 2, 3, 4].includes(partNum) || groups.length === 0) return <Navigate to="/listening" replace />

  const group = groups[groupIndex]
  const done = groupIndex >= groups.length
  const audioOnly = partNum <= 2
  const totalQuestions = groups.reduce((sum, g) => sum + g.questions.length, 0)
  const questionsBeforeCurrent = groups.slice(0, groupIndex).reduce((sum, g) => sum + g.questions.length, 0)
  const allCurrentAnswered = group ? group.questions.every((q) => answers[q.id] !== undefined) : false

  async function playGroupAudio() {
    if (!group || isSpeaking) return
    setIsSpeaking(true)
    try {
      if (partNum === 1) {
        const choices = group.questions[0].choices
        for (let i = 0; i < choices.length; i++) {
          await speak(`${String.fromCharCode(65 + i)}. ${choices[i]}`, accent, 0.85)
        }
      } else if (partNum === 2) {
        await speak(group.audioScript ?? '', accent, 0.9)
        const choices = group.questions[0].choices
        for (let i = 0; i < choices.length; i++) {
          await speak(`${String.fromCharCode(65 + i)}. ${choices[i]}`, accent, 0.85)
        }
      } else {
        await speak(group.audioScript ?? '', accent, 0.9)
      }
    } finally {
      setHasPlayed(true)
      setIsSpeaking(false)
    }
  }

  function handleSelect(questionId: string, choiceIndex: number) {
    if (answers[questionId] !== undefined) return
    const question = group.questions.find((q) => q.id === questionId)!
    const correct = choiceIndex === question.answerIndex
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }))
    recordAnswer('listening', correct)
    if (correct) setScore((s) => s + 1)
    if (mode === 'practice') {
      if (correct) playCorrectSound()
      else playIncorrectSound()
    }
  }

  function next() {
    setAnswers({})
    setRevealed(false)
    setHasPlayed(false)
    const isLast = groupIndex + 1 >= groups.length
    setGroupIndex((i) => i + 1)
    if (isLast) {
      playCompleteSound()
      if (totalQuestions > 0 && score / totalQuestions >= PASS_THRESHOLD) passStep('listening', String(partNum))
    }
  }

  if (done) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-2xl">🎧</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">คะแนน {score}/{totalQuestions}</p>
          <Link to="/listening">
            <Button className="mt-4">กลับไปเลือก Part อื่น</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <Link to="/listening" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
          <h1 className="text-xl font-bold text-stone-800 mt-2">Listening Part {partNum}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-sand-200 bg-white overflow-hidden text-xs">
            <button
              onClick={() => setMode('practice')}
              className={`px-3 py-1.5 font-medium transition ${mode === 'practice' ? 'bg-brand-600 text-white' : 'text-stone-500'}`}
            >
              โหมดฝึก
            </button>
            <button
              onClick={() => setMode('exam')}
              className={`px-3 py-1.5 font-medium transition ${mode === 'exam' ? 'bg-brand-600 text-white' : 'text-stone-500'}`}
            >
              โหมดจำลองสอบ
            </button>
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
      </div>

      <ProgressBar value={questionsBeforeCurrent} max={totalQuestions} />

      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-wide text-stone-400">
          ข้อที่ {questionsBeforeCurrent + 1}
          {group.questions.length > 1 ? `-${questionsBeforeCurrent + group.questions.length}` : ''} / {totalQuestions}
        </p>

        {group.imageId && <SceneIllustration id={group.imageId} />}

        <Button
          variant="secondary"
          onClick={playGroupAudio}
          disabled={isSpeaking || (mode === 'exam' && hasPlayed)}
        >
          {isSpeaking
            ? '🔊 กำลังเล่น...'
            : mode === 'exam' && hasPlayed
              ? '🔇 ฟังได้ครั้งเดียวในโหมดจำลองสอบ'
              : partNum <= 2
                ? '▶️ ฟังเสียง'
                : `▶️ ฟัง${partNum === 3 ? 'บทสนทนา' : 'ประกาศ'}`}
        </Button>

        {audioOnly ? (
          <div className={`grid gap-3 ${group.questions[0].choices.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
            {group.questions[0].choices.map((_, i) => {
              const qId = group.questions[0].id
              const selected = answers[qId]
              const isSelected = selected === i
              const isCorrect = i === group.questions[0].answerIndex
              let cls = 'bg-white border-sand-200 hover:border-brand-400 text-stone-700'
              if (selected !== undefined) {
                if (mode === 'practice') {
                  cls = isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : isSelected
                      ? 'bg-rose-50 border-rose-400 text-rose-700'
                      : 'bg-white border-sand-200 opacity-60'
                } else {
                  cls = isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-sand-200 opacity-60'
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(qId, i)}
                  disabled={selected !== undefined}
                  className={`aspect-square rounded-2xl border text-xl font-bold transition ${cls}`}
                >
                  {String.fromCharCode(65 + i)}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-5">
            {group.questions.map((q) => (
              <div key={q.id}>
                <p className="text-sm font-semibold text-stone-800 mb-2">{q.question}</p>
                <div className="grid gap-2">
                  {q.choices.map((choice, i) => {
                    const selected = answers[q.id]
                    const isSelected = selected === i
                    const isCorrect = i === q.answerIndex
                    let cls = 'bg-white border-sand-200 hover:border-brand-400'
                    if (selected !== undefined) {
                      if (mode === 'practice') {
                        cls = isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                          : isSelected
                            ? 'bg-rose-50 border-rose-400 text-rose-700'
                            : 'bg-white border-sand-200 opacity-60'
                      } else {
                        cls = isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-sand-200 opacity-60'
                      }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(q.id, i)}
                        disabled={selected !== undefined}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${cls}`}
                      >
                        {String.fromCharCode(65 + i)}. {choice}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {allCurrentAnswered && (
          <div className="space-y-2">
            {mode === 'practice' && (
              <button onClick={() => setRevealed((r) => !r)} className="text-sm text-brand-600 hover:underline" type="button">
                {revealed ? 'ซ่อนสคริปต์' : 'แสดงสคริปต์'}
              </button>
            )}
            {mode === 'practice' && revealed && (
              <pre className="whitespace-pre-wrap rounded-xl bg-sand-50 border border-sand-200 px-4 py-3 text-sm text-stone-600 font-sans">
                {audioOnly
                  ? group.questions[0].choices
                      .map((c, i) => `${String.fromCharCode(65 + i)}. ${c}${i === group.questions[0].answerIndex ? '  ✓ เฉลย' : ''}`)
                      .join('\n')
                  : group.transcript}
              </pre>
            )}
            <div>
              <Button onClick={next}>{groupIndex + 1 >= groups.length ? 'ดูผลคะแนน' : 'ข้อถัดไป →'}</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
