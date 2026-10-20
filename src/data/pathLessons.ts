import { vocabChapters } from './vocabulary'
import { grammarTopics } from './grammar'
import { readingPassages } from './reading'
import { listeningGroupsByPart } from './listening'
import { listeningLessonFor } from './listeningLessons'
import { CHECKPOINT_LENGTH } from './checkpointTest'
import { LEARNING_PATH, pathStepKey, type PathStep } from './learningPath'
import type { ExamItem } from '../lib/types'
import {
  balancedChunks,
  estimateMinutes,
  POINTS_PER_LESSON,
  QUESTIONS_PER_PRACTICE,
  TIPS_PER_LESSON,
  WORDS_PER_LESSON,
  lessonStatuses,
  type LessonNode,
  type LessonStatus,
} from '../lib/miniLesson'

export function lessonKey(step: PathStep, n: number | string): string {
  return `${pathStepKey(step.type, step.id)}#${n}`
}

function testNode(step: PathStep, titleTh: string, minutes: number, to: string): LessonNode {
  return { key: lessonKey(step, 'test'), kind: 'test', titleTh, minutes, to }
}

/** Listening practice sets: whole question groups (a conversation keeps its 3 questions), about 10 questions each. */
export function listeningPracticeSets(part: 1 | 2 | 3 | 4): ExamItem[][] {
  const groups = listeningGroupsByPart(part)
  const total = groups.reduce((s, g) => s + g.questions.length, 0)
  const setCount = Math.max(1, Math.round(total / QUESTIONS_PER_PRACTICE))
  const perSet = total / setCount
  const sets: ExamItem[][] = Array.from({ length: setCount }, () => [])
  let seen = 0
  for (const g of groups) {
    sets[Math.min(setCount - 1, Math.floor(seen / perSet))].push(g)
    seen += g.questions.length
  }
  return sets.filter((s) => s.length > 0)
}

function buildLessons(step: PathStep): LessonNode[] {
  switch (step.type) {
    case 'vocabulary': {
      const chapter = vocabChapters.find((c) => c.id === step.id)!
      const sets = balancedChunks(chapter.words, WORDS_PER_LESSON)
      let first = 1
      const learn = sets.map((words, i): LessonNode => {
        const titleTh = `คำที่ ${first}–${first + words.length - 1}`
        first += words.length
        return { key: lessonKey(step, i), kind: 'learn', titleTh, minutes: estimateMinutes(words.length, words.length, 18, 8), to: `/lesson/vocabulary/${step.id}/${i}` }
      })
      return [...learn, testNode(step, `ทดสอบท้ายบท ${chapter.words.length} คำ`, estimateMinutes(0, chapter.words.length, 0, 9), `/vocabulary/${step.id}/quiz`)]
    }
    case 'grammar': {
      const topic = grammarTopics.find((t) => t.id === step.id)!
      const parts = balancedChunks(topic.lesson.keyPoints, POINTS_PER_LESSON)
      let first = 1
      const learn = parts.map((kps, i): LessonNode => {
        const titleTh = kps.length === 1 ? `จุดที่ ${first}` : `จุดที่ ${first}–${first + kps.length - 1}`
        first += kps.length
        return { key: lessonKey(step, i), kind: 'learn', titleTh, minutes: estimateMinutes(kps.length, kps.length, 70, 20), to: `/lesson/grammar/${step.id}/${i}` }
      })
      return [...learn, testNode(step, `ทดสอบ ${topic.questions.length} ข้อ`, estimateMinutes(0, topic.questions.length, 0, 25), `/grammar/${step.id}/practice`)]
    }
    case 'listening': {
      const part = Number(step.id) as 1 | 2 | 3 | 4
      const tips = listeningLessonFor(part)?.tips ?? []
      let first = 1
      const learn = balancedChunks(tips, TIPS_PER_LESSON)
        .filter((c) => c.length > 0)
        .map((chunk, i): LessonNode => {
          const titleTh = chunk.length === 1 ? `เทคนิคที่ ${first}` : `เทคนิคที่ ${first}–${first + chunk.length - 1}`
          first += chunk.length
          return { key: lessonKey(step, i), kind: 'learn', titleTh, minutes: estimateMinutes(chunk.length, chunk.length, 80, 30), to: `/lesson/listening/${part}/${i}` }
        })
      const practice = listeningPracticeSets(part).map((groups, k): LessonNode => {
        const n = groups.reduce((s, g) => s + g.questions.length, 0)
        return {
          key: lessonKey(step, `p${k}`),
          kind: 'practice',
          titleTh: `ฝึกโจทย์ชุดที่ ${k + 1} (${n} ข้อ)`,
          minutes: estimateMinutes(0, n, 0, part <= 2 ? 25 : 40),
          to: `/listening/${part}?set=${k}`,
        }
      })
      return [...learn, ...practice]
    }
    case 'reading': {
      const passage = readingPassages.find((p) => p.id === step.id)!
      return [testNode(step, `อ่านแล้วตอบ ${passage.questions.length} ข้อ`, estimateMinutes(1, passage.questions.length, 120, 60), step.to)]
    }
    case 'checkpoint':
      return [testNode(step, `ข้อสอบแนว TOEIC ${CHECKPOINT_LENGTH} ข้อ`, estimateMinutes(0, CHECKPOINT_LENGTH, 0, 50), step.to)]
  }
}

const cache = new Map<string, LessonNode[]>()

/** The bite-sized lessons of one path step, in order, ending with its test. */
export function stepLessons(step: PathStep): LessonNode[] {
  const key = pathStepKey(step.type, step.id)
  let nodes = cache.get(key)
  if (!nodes) {
    nodes = buildLessons(step)
    cache.set(key, nodes)
  }
  return nodes
}

export function findStep(type: string | undefined, id: string | undefined): PathStep | undefined {
  return LEARNING_PATH.find((s) => s.type === type && s.id === id)
}

export const TOTAL_PATH_LESSONS = LEARNING_PATH.reduce((sum, s) => sum + stepLessons(s).length, 0)

export interface PathLessonEntry {
  step: PathStep
  /** Index of the step in LEARNING_PATH */
  index: number
  node: LessonNode
  /** Index of the lesson inside its step */
  n: number
  count: number
  status: LessonStatus
}

/** Every lesson on the path with its status, in order. */
export function pathLessonEntries(pathPassedSteps: string[], passedLessons: string[], effectiveIndex: number): PathLessonEntry[] {
  return LEARNING_PATH.flatMap((step, index) => {
    const nodes = stepLessons(step)
    const statuses = lessonStatuses(nodes, passedLessons, pathPassedSteps.includes(pathStepKey(step.type, step.id)), index <= effectiveIndex)
    return nodes.map((node, n) => ({ step, index, node, n, count: nodes.length, status: statuses[n] }))
  })
}

/** The lesson to continue with: the first open lesson of the current step, else the first open one anywhere. */
export function currentLessonEntry(entries: PathLessonEntry[], effectiveIndex: number): PathLessonEntry | undefined {
  return entries.find((e) => e.index === effectiveIndex && e.status === 'open') ?? entries.find((e) => e.status === 'open')
}
