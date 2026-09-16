export interface VocabWord {
  id: string
  term: string
  pos: string
  meaningTh: string
  synonym?: string
  antonym?: string
  exampleEn: string
  exampleTh: string
}

export interface VocabChapter {
  id: string
  title: string
  titleTh: string
  description: string
  words: VocabWord[]
}

export interface GrammarQuestion {
  id: string
  sentence: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export interface GrammarTopic {
  id: string
  title: string
  titleTh: string
  description: string
  questions: GrammarQuestion[]
}

export type ListeningPartNumber = 1 | 2 | 3 | 4

export interface ListeningItem {
  id: string
  part: ListeningPartNumber
  script: string
  imageDescription?: string
  question: string
  choices: string[]
  answerIndex: number
  transcript: string
}

export type ReadingPartNumber = 6 | 7

export interface ReadingQuestion {
  id: string
  question: string
  choices: string[]
  answerIndex: number
}

export interface ReadingPassage {
  id: string
  part: ReadingPartNumber
  title: string
  text: string
  questions: ReadingQuestion[]
}

export interface SrsCardState {
  wordId: string
  interval: number
  ease: number
  repetitions: number
  dueDate: string
}

export type QuizQuality = 0 | 1 | 2 | 3 | 4 | 5

export type StatPart =
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'reading'
  | 'mock'

export interface PartStat {
  correct: number
  total: number
}

export interface MockTestResult {
  date: string
  totalScore: number
  listeningScore: number
  readingScore: number
  durationSec: number
}
