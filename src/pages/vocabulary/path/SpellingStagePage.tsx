import { Navigate, useParams } from 'react-router-dom'
import { useProgressStore } from '../../../store/progress'
import { WordScrambleGame } from '../../../components/WordScrambleGame'
import { resolveGameSetContext, stageKey, STAGE_BONUS_XP } from '../../../data/vocabularyGamePath'
import { useSetLearned } from './useSetLearned'

export default function SpellingStagePage() {
  const { chapterId, setIndex: setIndexParam } = useParams()
  const learned = useSetLearned(chapterId, Number(setIndexParam))
  const completeStage = useProgressStore((s) => s.completeStage)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const reviewWord = useProgressStore((s) => s.reviewWord)

  const ctx = resolveGameSetContext(chapterId, setIndexParam)
  if (!ctx) return <Navigate to="/vocabulary" replace />
  const { chapter, setIndex, words } = ctx
  const pathTo = `/vocabulary/${chapter.id}`

  if (!learned) return <Navigate to={pathTo} replace />

  return (
    <WordScrambleGame
      words={words}
      title={`ชุดที่ ${setIndex + 1}`}
      backTo={pathTo}
      onAnswer={(correct, word) => {
        recordAnswer('vocabulary', correct)
        reviewWord(word.id, correct ? 4 : 1)
      }}
      onComplete={(score, total) => {
        completeStage(stageKey(chapter.id, setIndex, 3), total > 0 ? score / total : 0, STAGE_BONUS_XP[3])
      }}
    />
  )
}
