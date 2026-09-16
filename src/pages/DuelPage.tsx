import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { useAuthStore } from '../store/auth'

interface DuelQuestion {
  wordId: string
  term: string
  choices: string[]
  answerIndex: number
}

interface DuelPlayerProgress {
  answers: (number | null)[]
  score: number | null
  completedAt: string | null
}

interface DuelState {
  id: string
  chapterId: string
  chapterTitleTh: string
  questions: DuelQuestion[]
  players: [string, string]
  displayNames: [string, string]
  progress: Record<string, DuelPlayerProgress>
  status: 'pending' | 'finished'
  createdAt: string
}

export default function DuelPage() {
  const { duelId } = useParams()
  const email = useAuthStore((s) => s.email)
  const [duel, setDuel] = useState<DuelState | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [qIndex, setQIndex] = useState(0)
  const [localAnswers, setLocalAnswers] = useState<(number | null)[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`/api/duels/${duelId}`, { credentials: 'include' })
      if (!res.ok) {
        setNotFound(true)
        setLoading(false)
        return
      }
      const data: DuelState = await res.json()
      setDuel(data)
      setLocalAnswers(Array(data.questions.length).fill(null))
      setLoading(false)
    })()
  }, [duelId])

  if (loading) return <p className="text-center text-sm text-stone-400 py-10">กำลังโหลด...</p>

  if (notFound || !duel || !email) {
    return (
      <Card className="max-w-md mx-auto text-center py-10 space-y-3">
        <p className="text-lg font-semibold text-stone-800">ไม่พบการท้าแข่งนี้</p>
        <Link to="/friends">
          <Button variant="secondary">กลับไปหน้าเพื่อน</Button>
        </Link>
      </Card>
    )
  }

  const myProgress = duel.progress[email]
  const opponentEmail = duel.players.find((p) => p !== email)!
  const opponentProgress = duel.progress[opponentEmail]
  const opponentIndex = duel.players[0] === email ? 1 : 0
  const opponentName = duel.displayNames[opponentIndex]

  async function submitAnswers(finalAnswers: (number | null)[]) {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/duels/${duelId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ answers: finalAnswers }),
      })
      if (res.ok) {
        const data: DuelState = await res.json()
        setDuel(data)
      }
    } finally {
      setSubmitting(false)
    }
  }

  function selectAnswer(choiceIndex: number) {
    const next = [...localAnswers]
    next[qIndex] = choiceIndex
    setLocalAnswers(next)
  }

  function goNext() {
    if (qIndex < duel!.questions.length - 1) {
      setQIndex((i) => i + 1)
    } else {
      submitAnswers(localAnswers)
    }
  }

  if (myProgress.completedAt) {
    const bothDone = duel.status === 'finished'
    const myScore = myProgress.score ?? 0
    const opponentScore = opponentProgress?.score ?? 0
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="text-center py-10 space-y-3">
          <p className="text-sm text-stone-500">{duel.chapterTitleTh}</p>
          {bothDone ? (
            <>
              <p className="text-3xl">{myScore > opponentScore ? '🏆' : myScore === opponentScore ? '🤝' : '😅'}</p>
              <p className="text-2xl font-bold text-stone-800">
                คุณ {myScore} — {opponentScore} {opponentName}
              </p>
              <p className="text-sm text-stone-500">
                {myScore > opponentScore ? 'คุณชนะ! 🎉' : myScore === opponentScore ? 'เสมอกัน' : `${opponentName} ชนะไปครั้งนี้`}
              </p>
            </>
          ) : (
            <>
              <p className="text-3xl">⏳</p>
              <p className="font-semibold text-stone-800">
                ส่งคำตอบแล้ว! คุณได้ {myScore}/{duel.questions.length}
              </p>
              <p className="text-sm text-stone-500">รอ {opponentName} เล่นให้จบเพื่อดูผลเปรียบเทียบ</p>
            </>
          )}
        </Card>
        <div className="text-center">
          <Link to="/friends">
            <Button variant="secondary">กลับไปหน้าเพื่อน</Button>
          </Link>
        </div>
      </div>
    )
  }

  const q = duel.questions[qIndex]
  const selected = localAnswers[qIndex]

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">
          ข้อที่ {qIndex + 1}/{duel.questions.length}
        </span>
        <span className="text-sm text-stone-500">
          vs {opponentName} • {duel.chapterTitleTh}
        </span>
      </div>
      <Card className="space-y-4">
        <p className="text-xl font-bold text-stone-800 text-center py-4">{q.term}</p>
        <div className="grid gap-2">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                selected === i ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-sand-200 hover:border-brand-400'
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
        <Button onClick={goNext} disabled={selected == null || submitting} className="w-full justify-center">
          {qIndex < duel.questions.length - 1 ? 'ถัดไป →' : submitting ? 'กำลังส่ง...' : 'ส่งคำตอบ'}
        </Button>
      </Card>
    </div>
  )
}
