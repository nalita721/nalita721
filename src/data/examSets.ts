import * as set1 from './fullMockExam'
import * as set2 from './fullMockExamSet2'
import * as set3 from './fullMockExamSet3'
import type { ExamItem } from '../lib/types'

export interface ExamSet {
  id: string
  label: string
  fullExamItems: ExamItem[]
  totalCount: number
  listeningCount: number
  readingCount: number
  durationSec: number
}

export const EXAM_SETS: ExamSet[] = [
  {
    id: 'set1',
    label: 'ชุดที่ 1',
    fullExamItems: set1.fullExamItems,
    totalCount: set1.FULL_EXAM_TOTAL_COUNT,
    listeningCount: set1.FULL_EXAM_LISTENING_COUNT,
    readingCount: set1.FULL_EXAM_READING_COUNT,
    durationSec: set1.FULL_EXAM_DURATION_SEC,
  },
  {
    id: 'set2',
    label: 'ชุดที่ 2',
    fullExamItems: set2.fullExamItems,
    totalCount: set2.FULL_EXAM_TOTAL_COUNT,
    listeningCount: set2.FULL_EXAM_LISTENING_COUNT,
    readingCount: set2.FULL_EXAM_READING_COUNT,
    durationSec: set2.FULL_EXAM_DURATION_SEC,
  },
  {
    id: 'set3',
    label: 'ชุดที่ 3',
    fullExamItems: set3.fullExamItems,
    totalCount: set3.FULL_EXAM_TOTAL_COUNT,
    listeningCount: set3.FULL_EXAM_LISTENING_COUNT,
    readingCount: set3.FULL_EXAM_READING_COUNT,
    durationSec: set3.FULL_EXAM_DURATION_SEC,
  },
]

export function getExamSet(setId: string | undefined): ExamSet {
  return EXAM_SETS.find((s) => s.id === setId) ?? EXAM_SETS[0]
}
