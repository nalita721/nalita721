import { vocabChapters } from './vocabulary'
import { pathStepKey } from './learningPath'
import type { GameStageResult, VocabChapter, VocabWord } from '../lib/types'

export const WORDS_PER_SET = 10
export const GAME_PATH_PASS_THRESHOLD = 0.8

export type GameStage = 1 | 2 | 3 | 4 | 5

export interface StageDef {
  stage: GameStage
  key: 'learn' | 'matching' | 'spelling' | 'recall' | 'toeic'
  label: string
  icon: string
}

export const STAGE_DEFS: StageDef[] = [
  { stage: 1, key: 'learn', label: 'Learn 10 Words', icon: '📖' },
  { stage: 2, key: 'matching', label: 'Matching Game', icon: '🧩' },
  { stage: 3, key: 'spelling', label: 'Spelling Challenge', icon: '🔤' },
  { stage: 4, key: 'recall', label: 'Recall Challenge', icon: '🧠' },
  { stage: 5, key: 'toeic', label: 'TOEIC Challenge', icon: '🏆' },
]

/** XP bonus for passing a stage for the first time ever (never repeated on replay). */
export const STAGE_BONUS_XP: Record<GameStage, number> = { 1: 10, 2: 15, 3: 15, 4: 20, 5: 25 }

export function getWordSets(chapter: VocabChapter): VocabWord[][] {
  const sets: VocabWord[][] = []
  for (let i = 0; i < chapter.words.length; i += WORDS_PER_SET) {
    sets.push(chapter.words.slice(i, i + WORDS_PER_SET))
  }
  return sets
}

export function stageKey(chapterId: string, setIndex: number, stage: GameStage): string {
  return `${chapterId}:${setIndex}:${stage}`
}

/** Optional practice games for a word set; they open once the set's lesson is learned. */
export const PRACTICE_GAMES = [
  { stage: 2 as GameStage, key: 'matching', labelTh: 'จับคู่คำ', icon: '🧩' },
  { stage: 3 as GameStage, key: 'spelling', labelTh: 'สะกดคำ', icon: '🔤' },
  { stage: 4 as GameStage, key: 'recall', labelTh: 'ทวนความจำ', icon: '🧠' },
  { stage: 5 as GameStage, key: 'toeic', labelTh: 'โจทย์ TOEIC', icon: '🏆' },
]

/**
 * A set counts as learned once its bite-sized lesson is passed, the whole
 * chapter is passed, or (for progress saved before lessons existed) its old
 * "Learn 10 Words" stage was passed.
 */
export function isSetLearned(
  passedLessons: string[],
  results: Record<string, GameStageResult>,
  pathPassedSteps: string[],
  chapterId: string,
  setIndex: number,
): boolean {
  const step = pathStepKey('vocabulary', chapterId)
  return (
    passedLessons.includes(`${step}#${setIndex}`) ||
    pathPassedSteps.includes(step) ||
    (results[stageKey(chapterId, setIndex, 1)]?.passed ?? false)
  )
}

export function resolveGameSetContext(chapterId: string | undefined, setIndexParam: string | undefined) {
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  if (!chapter) return null
  const setIndex = Number(setIndexParam)
  const sets = getWordSets(chapter)
  if (!Number.isInteger(setIndex) || setIndex < 0 || setIndex >= sets.length) return null
  return { chapter, setIndex, words: sets[setIndex] }
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Blanks the target term out of its example sentence for the TOEIC Challenge
 * stage. Tries an exact whole-word match first, then falls back to a
 * stem match (term minus its last 1-2 letters) to also catch inflected
 * forms already present in the existing example data (e.g. "promote" ->
 * "...was promoted..."). Returns null when neither matches, so the caller
 * can skip that word instead of showing a broken blank.
 */
export function blankOutTerm(sentence: string, term: string): string | null {
  const exact = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i')
  if (exact.test(sentence)) return sentence.replace(exact, '_____')
  const stem = term.length > 5 ? term.slice(0, term.length - 2) : term.slice(0, Math.max(3, term.length - 1))
  const stemRe = new RegExp(`\\b${escapeRegExp(stem)}\\w*`, 'i')
  if (stemRe.test(sentence)) return sentence.replace(stemRe, '_____')
  return null
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function pickDistractors(chapter: VocabChapter, word: VocabWord, count: number): VocabWord[] {
  const samePos = chapter.words.filter((w) => w.id !== word.id && w.pos === word.pos)
  const pool = samePos.length >= count ? samePos : chapter.words.filter((w) => w.id !== word.id)
  return shuffle(pool).slice(0, count)
}
