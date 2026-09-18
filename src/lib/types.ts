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
  cefrLevel: CefrCode
  words: VocabWord[]
}

export interface GrammarQuestion {
  id: string
  sentence: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export interface GrammarKeyPoint {
  label: string
  explanation: string
  exampleEn: string
  exampleTh: string
}

export interface GrammarLesson {
  emoji: string
  introTh: string
  keyPoints: GrammarKeyPoint[]
  tipTh: string
}

export interface WritingPrompt {
  id: string
  promptTh: string
  hintEn: string
  sampleAnswer: string
  sampleAnswerTh: string
}

export interface GrammarTopic {
  id: string
  title: string
  titleTh: string
  description: string
  cefrLevel: CefrCode
  lesson: GrammarLesson
  writingPrompts: WritingPrompt[]
  questions: GrammarQuestion[]
}

export type ListeningPartNumber = 1 | 2 | 3 | 4

export interface ListeningItem {
  id: string
  part: ListeningPartNumber
  script: string
  imageDescription?: string
  imageId?: string
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

export type CefrCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface LevelTestResult {
  date: string
  cefr: CefrCode
  totalScore: number
  listeningScore: number
  readingScore: number
  skillBreakdown: Record<'vocabulary' | 'grammar' | 'listening' | 'reading', PartStat>
}

export type ExamPart = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface ExamSubQuestion {
  id: string
  question: string
  choices: string[]
  answerIndex: number
}

/**
 * One screen of the full mock exam. Parts 1/2/5 have a single sub-question;
 * Parts 3/4 (conversations/talks) and 6/7 (passages) share one audio script
 * or one/more passage texts across several sub-questions, matching how the
 * real TOEIC groups them.
 */
export interface ExamItem {
  id: string
  part: ExamPart
  section: 'listening' | 'reading'
  imageDescription?: string
  imageId?: string
  audioScript?: string
  sentence?: string
  passageTexts?: string[]
  transcript?: string
  questions: ExamSubQuestion[]
}
