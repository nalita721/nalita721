import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { useProgressStore } from '../../store/progress'
import { WordScrambleGame } from '../../components/WordScrambleGame'

const ROUND_SIZE = 10

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function WordScramblePage() {
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
    const singleWord = sourceWords.filter((w) => /^[a-zA-Z]+$/.test(w.term))
    return shuffle(singleWord).slice(0, Math.min(ROUND_SIZE, singleWord.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter, isGlobal])

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />
  if (words.length === 0) return <Navigate to={backTo} replace />

  return (
    <WordScrambleGame
      words={words}
      title={title}
      backTo={backTo}
      onAnswer={(correct) => recordAnswer('vocabulary', correct)}
      onComplete={(score, total) => addXp(Math.round((score / total) * 20))}
    />
  )
}
