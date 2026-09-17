import { vocabChapters } from './vocabulary'
import { grammarTopics } from './grammar'
import { readingPassages } from './reading'
import { CEFR_LEVELS } from './cefr'
import type { CefrCode } from '../lib/types'

export type PathStepType = 'vocabulary' | 'grammar' | 'listening' | 'reading'

export interface PathStep {
  type: PathStepType
  id: string
  cefrLevel: CefrCode
  labelTh: string
  to: string
}

const TYPE_LABEL: Record<PathStepType, string> = {
  vocabulary: 'คำศัพท์',
  grammar: 'ไวยากรณ์',
  listening: 'ฝึกฟัง',
  reading: 'ฝึกอ่าน',
}

export const TYPE_ICON: Record<PathStepType, string> = {
  vocabulary: '📚',
  grammar: '✍️',
  listening: '🎧',
  reading: '📝',
}

function chapterStep(id: string): PathStep {
  const chapter = vocabChapters.find((c) => c.id === id)
  if (!chapter) throw new Error(`Unknown vocab chapter in learning path: ${id}`)
  return { type: 'vocabulary', id, cefrLevel: chapter.cefrLevel, labelTh: `${TYPE_LABEL.vocabulary}: ${chapter.titleTh}`, to: `/vocabulary/${id}` }
}

function topicStep(id: string): PathStep {
  const topic = grammarTopics.find((t) => t.id === id)
  if (!topic) throw new Error(`Unknown grammar topic in learning path: ${id}`)
  return { type: 'grammar', id, cefrLevel: topic.cefrLevel, labelTh: `${TYPE_LABEL.grammar}: ${topic.titleTh}`, to: `/grammar/${id}` }
}

function listeningStep(part: 1 | 2 | 3 | 4, cefrLevel: CefrCode, titleTh: string): PathStep {
  return { type: 'listening', id: String(part), cefrLevel, labelTh: `${TYPE_LABEL.listening}: ${titleTh}`, to: `/listening/${part}` }
}

function readingStep(id: string, cefrLevel: CefrCode): PathStep {
  const passage = readingPassages.find((p) => p.id === id)
  if (!passage) throw new Error(`Unknown reading passage in learning path: ${id}`)
  return { type: 'reading', id, cefrLevel, labelTh: `${TYPE_LABEL.reading}: ${passage.title}`, to: `/reading/${id}` }
}

/**
 * The default step-by-step curriculum, ordered A1 -> C1. After the level
 * test, learners start at the first step matching their tested level
 * instead of A1 (see startIndexForLevel), then must proceed in order.
 */
export const LEARNING_PATH: PathStep[] = [
  topicStep('basic-sentence'),
  topicStep('preposition'),
  topicStep('comparative'),
  topicStep('present-tenses'),
  chapterStep('travel'),
  listeningStep(1, 'A2', 'Part 1: Photographs'),
  listeningStep(2, 'A2', 'Part 2: Question-Response'),
  topicStep('word-form'),
  topicStep('tense'),
  topicStep('conjunction'),
  chapterStep('office-hr'),
  chapterStep('meetings'),
  chapterStep('communication'),
  listeningStep(3, 'B1', 'Part 3: Conversations'),
  readingStep('r6-1', 'B1'),
  readingStep('r6-2', 'B1'),
  topicStep('relative-clause'),
  chapterStep('finance'),
  chapterStep('marketing'),
  listeningStep(4, 'B2', 'Part 4: Talks'),
  readingStep('r7-1', 'B2'),
  readingStep('r7-2', 'B2'),
  topicStep('inversion'),
  topicStep('mixed-conditionals'),
  topicStep('cleft-sentences'),
  chapterStep('advanced-business'),
]

export const PASS_THRESHOLD = 0.7

export function pathStepKey(type: PathStepType, id: string): string {
  return `${type}:${id}`
}

export function stepIndexOfContent(type: PathStepType, id: string | undefined): number {
  if (id === undefined) return -1
  return LEARNING_PATH.findIndex((s) => s.type === type && s.id === id)
}

function cefrRank(code: CefrCode): number {
  return CEFR_LEVELS.findIndex((l) => l.code === code)
}

/** First step index whose level is at or above the given CEFR level. */
export function startIndexForLevel(cefr: CefrCode | undefined): number {
  if (!cefr) return 0
  const rank = cefrRank(cefr)
  const idx = LEARNING_PATH.findIndex((s) => cefrRank(s.cefrLevel) >= rank)
  return idx === -1 ? LEARNING_PATH.length - 1 : idx
}

/** The furthest index a learner can access: the higher of what they've earned by passing steps, and their level-test placement. */
export function getEffectivePathIndex(pathUnlockedIndex: number, levelCefr: CefrCode | undefined): number {
  return Math.max(pathUnlockedIndex, startIndexForLevel(levelCefr))
}

export function isStepUnlocked(type: PathStepType, id: string | undefined, effectiveIndex: number): boolean {
  const idx = stepIndexOfContent(type, id)
  if (idx === -1) return true
  return idx <= effectiveIndex
}

/** Clamped to a real step, even once every step has been passed. */
export function currentPathStep(effectiveIndex: number): PathStep {
  return LEARNING_PATH[Math.min(Math.max(effectiveIndex, 0), LEARNING_PATH.length - 1)]
}
