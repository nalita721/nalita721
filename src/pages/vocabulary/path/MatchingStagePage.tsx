import { Navigate, useParams } from 'react-router-dom'
import { useProgressStore } from '../../../store/progress'
import { MatchingGame } from '../../../components/MatchingGame'
import { resolveGameSetContext, isStageUnlocked, stageKey, STAGE_BONUS_XP } from '../../../data/vocabularyGamePath'

export default function MatchingStagePage() {
  const { chapterId, setIndex: setIndexParam } = useParams()
  const results = useProgressStore((s) => s.wordPathStageResults)
  const completeStage = useProgressStore((s) => s.completeStage)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const ctx = resolveGameSetContext(chapterId, setIndexParam)
  if (!ctx) return <Navigate to="/vocabulary" replace />
  const { chapter, setIndex, words } = ctx
  const pathTo = `/vocabulary/${chapter.id}/path`

  if (!isStageUnlocked(results, chapter.id, setIndex, 2)) return <Navigate to={pathTo} replace />

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
