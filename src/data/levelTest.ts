import { allWords, vocabChapters } from './vocabulary'
import { grammarTopics } from './grammar'
import { listeningItems } from './listening'
import { readingPassages } from './reading'
import type { VocabWord } from '../lib/types'

export type LevelTestSkill = 'vocabulary' | 'grammar' | 'listening' | 'reading'

export interface LevelTestSubQuestion {
  id: string
  question: string
  choices: string[]
  answerIndex: number
}

export interface LevelTestItem {
  id: string
  skill: LevelTestSkill
  section: 'listening' | 'reading'
  audioScript?: string
  audioOnly?: boolean
  sentence?: string
  passageTexts?: string[]
  questions: LevelTestSubQuestion[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildVocabItems(): LevelTestItem[] {
  const pool = allWords()
  const sampled = vocabChapters.flatMap((c) => shuffle(c.words).slice(0, 2))
  return sampled.map((word, i) => {
    const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)
    const choices = shuffle([word, ...distractors] as VocabWord[])
    return {
      id: `lvl-vocab-${i}`,
      skill: 'vocabulary',
      section: 'reading',
      sentence: `คำว่า "${word.term}" หมายความว่าอย่างไร?`,
      questions: [
        {
          id: `lvl-vocab-${i}-q`,
          question: '',
          choices: choices.map((c) => c.meaningTh),
          answerIndex: choices.findIndex((c) => c.id === word.id),
        },
      ],
    }
  })
}

function buildGrammarItems(): LevelTestItem[] {
  const perTopic: Record<string, number> = {
    'basic-sentence': 1,
    'present-tenses': 1,
    'word-form': 2,
    tense: 2,
    preposition: 1,
    conjunction: 1,
    'relative-clause': 1,
    comparative: 1,
  }
  const items: LevelTestItem[] = []
  grammarTopics.forEach((topic) => {
    const count = perTopic[topic.id] ?? 1
    shuffle(topic.questions)
      .slice(0, count)
      .forEach((q, i) => {
        items.push({
          id: `lvl-grammar-${topic.id}-${i}`,
          skill: 'grammar',
          section: 'reading',
          sentence: q.sentence,
          questions: [{ id: `lvl-grammar-${topic.id}-${i}-q`, question: '', choices: q.choices, answerIndex: q.answerIndex }],
        })
      })
  })
  return items
}

function buildListeningItems(): LevelTestItem[] {
  const part2 = shuffle(listeningItems.filter((item) => item.part === 2)).slice(0, 10)
  return part2.map((item, i) => ({
    id: `lvl-listening-${i}`,
    skill: 'listening',
    section: 'listening',
    audioScript: item.script,
    audioOnly: true,
    questions: [{ id: `lvl-listening-${i}-q`, question: item.question, choices: item.choices, answerIndex: item.answerIndex }],
  }))
}

function buildReadingItems(): LevelTestItem[] {
  const passageIds = ['r6-1', 'r7-1', 'r7-2']
  return passageIds
    .map((id) => readingPassages.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .map((passage) => ({
      id: `lvl-reading-${passage.id}`,
      skill: 'reading' as const,
      section: 'reading' as const,
      passageTexts: [passage.text],
      questions: passage.questions.map((q) => ({ id: q.id, question: q.question, choices: q.choices, answerIndex: q.answerIndex })),
    }))
}

export const levelTestItems: LevelTestItem[] = [
  ...buildVocabItems(),
  ...buildGrammarItems(),
  ...buildListeningItems(),
  ...buildReadingItems(),
]

export const LEVEL_TEST_TOTAL_QUESTIONS = levelTestItems.reduce((sum, item) => sum + item.questions.length, 0)
export const LEVEL_TEST_DURATION_SEC = 25 * 60

export const SKILL_LABELS: Record<LevelTestSkill, string> = {
  vocabulary: 'คำศัพท์',
  grammar: 'ไวยากรณ์',
  listening: 'การฟัง',
  reading: 'การอ่าน',
}
