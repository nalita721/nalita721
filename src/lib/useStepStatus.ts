import { useAuthStore } from '../store/auth'
import { useProgressStore } from '../store/progress'
import {
  LEARNING_PATH,
  getEffectivePathIndex,
  isStepUnlocked,
  pathStepKey,
  stepIndexOfContent,
  type PathStepType,
} from '../data/learningPath'
import type { CefrCode } from './types'
import type { SkillStatus } from '../components/SkillPage'

/**
 * Where a lesson stands on the learning path for the current learner. Guests
 * can only open the free sample of each skill, so `isFree` decides their lock.
 */
export function useStepStatus() {
  const authStatus = useAuthStore((s) => s.status)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelCefr)
  const isMember = authStatus === 'authenticated'

  function statusOf(type: PathStepType, id: string, isFree: boolean): SkillStatus {
    if (pathPassedSteps.includes(pathStepKey(type, id))) return 'passed'
    if (!isMember) return isFree ? 'open' : 'locked'
    if (stepIndexOfContent(type, id) === effectiveIndex) return 'current'
    return isStepUnlocked(type, id, effectiveIndex) ? 'open' : 'locked'
  }

  return { statusOf, lockedLabel: isMember ? 'ยังไม่ถึงคิว' : 'สมาชิก' }
}

/** Groups lessons by the CEFR level of their learning-path step, in path order. */
export function groupOnPath<T>(type: PathStepType, items: T[], idOf: (item: T) => string): { level: CefrCode; items: T[] }[] {
  const placed = items
    .map((item) => {
      const index = stepIndexOfContent(type, idOf(item))
      return { item, index, level: index >= 0 ? LEARNING_PATH[index].cefrLevel : null }
    })
    .filter((p): p is { item: T; index: number; level: CefrCode } => p.level !== null)
    .sort((a, b) => a.index - b.index)
  const groups: { level: CefrCode; items: T[] }[] = []
  for (const p of placed) {
    const last = groups[groups.length - 1]
    if (last && last.level === p.level) last.items.push(p.item)
    else groups.push({ level: p.level, items: [p.item] })
  }
  return groups
}
