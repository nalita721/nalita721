import { listeningItems } from './listening'
import { grammarTopics } from './grammar'
import { readingPassages } from './reading'

export type MockSection = 'listening' | 'reading'

export interface MockQuestion {
  id: string
  section: MockSection
  passageOrImage?: string
  audioScript?: string
  context?: string
  question: string
  choices: string[]
  answerIndex: number
}

function buildMockTest(): MockQuestion[] {
  const listening: MockQuestion[] = listeningItems
    .filter((item) => item.script.length > 0)
    .slice(0, 6)
    .map((item) => ({
      id: `mock-${item.id}`,
      section: 'listening' as const,
      passageOrImage: item.imageDescription,
      audioScript: item.script,
      question: item.question,
      choices: item.choices,
      answerIndex: item.answerIndex,
    }))

  const grammarQuestions: MockQuestion[] = grammarTopics.slice(0, 4).map((topic) => {
    const q = topic.questions[0]
    return {
      id: `mock-${q.id}`,
      section: 'reading' as const,
      context: q.sentence,
      question: 'เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมประโยคให้สมบูรณ์',
      choices: q.choices,
      answerIndex: q.answerIndex,
    }
  })

  const readingQuestions: MockQuestion[] = readingPassages
    .filter((p) => p.part === 7)
    .flatMap((passage) =>
      passage.questions.slice(0, 2).map((q) => ({
        id: `mock-${q.id}`,
        section: 'reading' as const,
        context: passage.text,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
      })),
    )

  return [...listening, ...grammarQuestions, ...readingQuestions]
}

export const mockTestQuestions = buildMockTest()

export const MOCK_TEST_DURATION_SEC = 15 * 60
