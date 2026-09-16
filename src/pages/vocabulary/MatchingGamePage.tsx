import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { Button, Card } from '../../components/ui'
import { useProgressStore } from '../../store/progress'

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

const ROUND_SIZE = 6

export default function MatchingGamePage() {
  const { chapterId } = useParams()
  const isGlobal = chapterId === undefined
  const chapter = isGlobal ? undefined : vocabChapters.find((c) => c.id === chapterId)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const addXp = useProgressStore((s) => s.addXp)

  const backTo = isGlobal ? '/games' : `/vocabulary/${chapterId}`
  const title = isGlobal ? 'ทุกบท' : chapter?.titleTh ?? ''

  const words = useMemo(() => {
    const sourceWords = isGlobal ? allWords() : chapter?.words
    if (!sourceWords) return []
    return shuffle(sourceWords).slice(0, Math.min(ROUND_SIZE, sourceWords.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, isGlobal])

  const [terms] = useState(() => shuffle(words))
  const [meanings] = useState(() => shuffle(words))
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [mistakes, setMistakes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [finished])

  useEffect(() => {
    if (words.length > 0 && matched.size === words.length) {
      setFinished(true)
      const accuracy = words.length / (words.length + mistakes)
      recordAnswer('vocabulary', true)
      addXp(Math.round(accuracy * 20))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched])

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />
  if (words.length === 0) return <Navigate to={backTo} replace />

  function tryMatch(termId: string, meaningId: string) {
    if (termId === meaningId) {
      setMatched((prev) => new Set(prev).add(termId))
    } else {
      setMistakes((m) => m + 1)
    }
    setSelectedTerm(null)
    setSelectedMeaning(null)
  }

  function handleTermClick(id: string) {
    if (matched.has(id)) return
    setSelectedTerm(id)
    if (selectedMeaning) tryMatch(id, selectedMeaning)
  }

  function handleMeaningClick(id: string) {
    if (matched.has(id)) return
    setSelectedMeaning(id)
    if (selectedTerm) tryMatch(selectedTerm, id)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Link to={backTo} className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">Matching Game — {title}</h1>
        <p className="text-sm text-stone-500 mt-1">เวลา: {seconds}s • พลาด: {mistakes} ครั้ง</p>
      </div>

      {finished ? (
        <Card className="text-center py-12">
          <p className="text-2xl">✅</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">จับคู่ครบใน {seconds} วินาที (พลาด {mistakes} ครั้ง)</p>
          <Link to={backTo}>
            <Button className="mt-4">กลับไปหน้าเลือกเกม</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {terms.map((w) => (
              <button
                key={w.id}
                disabled={matched.has(w.id)}
                onClick={() => handleTermClick(w.id)}
                className={`w-full text-left rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  matched.has(w.id)
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-600 opacity-60'
                    : selectedTerm === w.id
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'bg-white border-sand-200 hover:border-brand-400'
                }`}
              >
                {w.term}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {meanings.map((w) => (
              <button
                key={w.id}
                disabled={matched.has(w.id)}
                onClick={() => handleMeaningClick(w.id)}
                className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition ${
                  matched.has(w.id)
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-600 opacity-60'
                    : selectedMeaning === w.id
                    ? 'bg-brand-600 border-brand-600 text-white'
                    : 'bg-white border-sand-200 hover:border-brand-400'
                }`}
              >
                {w.meaningTh}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
