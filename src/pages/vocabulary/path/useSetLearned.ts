import { useProgressStore } from '../../../store/progress'
import { isSetLearned } from '../../../data/vocabularyGamePath'

/** Whether the practice games of a word set are open (see isSetLearned). */
export function useSetLearned(chapterId: string | undefined, setIndex: number): boolean {
  const passedLessons = useProgressStore((s) => s.passedLessons)
  const results = useProgressStore((s) => s.wordPathStageResults)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  return chapterId ? isSetLearned(passedLessons, results, pathPassedSteps, chapterId, setIndex) : false
}
