import { Navigate, useParams } from 'react-router-dom'
import { useProgressStore } from '../../../store/progress'
import { MatchingGame } from '../../../components/MatchingGame'
import { resolveGameSetContext, stageKey, STAGE_BONUS_XP } from '../../../data/vocabularyGamePath'
import { useSetLearned } from './useSetLearned'

export default function MatchingStagePage() {
  const { chapterId, setIndex: setIndexParam } = useParams()
  const learned = useSetLearned(chapterId, Number(setIndexParam))
  const completeStage = useProgressStore((s) => s.completeStage)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const ctx = resolveGameSetContext(chapterId, setIndexParam)
  if (!ctx) return <Navigate to="/vocabulary" replace />
  const { chapter, setIndex, words } = ctx
  const pathTo = `/vocabulary/${chapter.id}`

  if (!learned) return <Navigate to={pathTo} replace />

  return (
    <MatchingGame
      words={words}
      title={`ชุดที่ ${setIndex + 1}`}
      backTo={pathTo}
      onComplete={(accuracy) => {
        recordAnswer('vocabulary', true)
        completeStage(stageKey(chapter.id, setIndex, 2), accuracy, STAGE_BONUS_XP[2])
      }}
    />
  )
}
