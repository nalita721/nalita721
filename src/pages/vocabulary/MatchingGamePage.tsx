import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { allWords, vocabChapters } from '../../data/vocabulary'
import { useProgressStore } from '../../store/progress'
import { MatchingGame } from '../../components/MatchingGame'

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

  if (!isGlobal && !chapter) return <Navigate to="/vocabulary" replace />
  if (words.length === 0) return <Navigate to={backTo} replace />

  return (
    <MatchingGame
      words={words}
      title={title}
      backTo={backTo}
      onComplete={(accuracy) => {
        recordAnswer('vocabulary', true)
        addXp(Math.round(accuracy * 20))
      }}
    />
  )
}
