/**
 * Bite-sized lessons. Every big step (a 40-word chapter, an 8-point grammar
 * topic, a whole listening part) is split into short lessons of a few minutes
 * each, followed by the step's test. Shared by the English path and the
 * Chinese/Japanese level pages.
 */

export const WORDS_PER_LESSON = 10
export const POINTS_PER_LESSON = 3
export const TIPS_PER_LESSON = 2
export const QUESTIONS_PER_PRACTICE = 10
/** Score needed to pass a lesson's word quiz */
export const LESSON_PASS_RATIO = 0.7
export const LESSON_XP = 10
export const DAILY_GOAL_OPTIONS = [1, 3, 5] as const
export const DEFAULT_DAILY_GOAL = 3

export type LessonKind = 'learn' | 'practice' | 'test'
export type LessonStatus = 'passed' | 'open' | 'locked'

export interface LessonNode {
  /** Stored in passedLessons once completed. Test nodes are tracked by their step instead. */
  key: string
  kind: LessonKind
  titleTh: string
  minutes: number
  to: string
}

/** Splits items into the fewest chunks of at most `max`, keeping chunk sizes within one of each other. */
export function balancedChunks<T>(items: T[], max: number): T[][] {
  const n = Math.max(1, Math.ceil(items.length / max))
  const out: T[][] = []
  let at = 0
  for (let i = 0; i < n; i++) {
    const size = Math.floor(items.length / n) + (i < items.length % n ? 1 : 0)
    out.push(items.slice(at, at + size))
    at += size
  }
  return out
}

/** Rough minutes for a lesson: cards take longer than single questions. */
export function estimateMinutes(cards: number, questions: number, secondsPerCard = 25, secondsPerQuestion = 12): number {
  return Math.max(2, Math.round((cards * secondsPerCard + questions * secondsPerQuestion) / 60))
}

/**
 * Lessons open one after another. Once the whole step is passed (including by
 * learners who passed it before lessons existed) every lesson counts as passed.
 */
export function lessonStatuses(
  nodes: LessonNode[],
  passedLessons: string[],
  stepPassed: boolean,
  stepUnlocked: boolean,
): LessonStatus[] {
  let previousDone = true
  return nodes.map((node) => {
    const passed = stepPassed || (node.kind !== 'test' && passedLessons.includes(node.key))
    const status: LessonStatus = passed ? 'passed' : stepUnlocked && previousDone ? 'open' : 'locked'
    previousDone = passed
    return status
  })
}

/** The lesson to continue with: the first one not passed yet, or the last one when all are done. */
export function nextLessonIndex(statuses: LessonStatus[]): number {
  const i = statuses.findIndex((s) => s !== 'passed')
  return i === -1 ? statuses.length - 1 : i
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

/** Four meaning choices for each word, with distractors from the wider pool. */
export function buildWordQuiz(
  words: { id: string; word: string; reading?: string; meaningTh: string }[],
  pool: { id: string; meaningTh: string }[],
): { id: string; prompt: string; reading?: string; choices: string[]; answerIndex: number }[] {
  return words.map((w) => {
    const distractors = shuffle(pool.filter((o) => o.id !== w.id && o.meaningTh !== w.meaningTh))
      .filter((o, i, arr) => arr.findIndex((x) => x.meaningTh === o.meaningTh) === i)
      .slice(0, 3)
      .map((o) => o.meaningTh)
    const choices = shuffle([w.meaningTh, ...distractors])
    return { id: w.id, prompt: w.word, reading: w.reading, choices, answerIndex: choices.indexOf(w.meaningTh) }
  })
}
