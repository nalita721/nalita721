import { listeningByPart } from './listening'
import { grammarTopics } from './grammar'
import { readingPassages } from './reading'
import { vocabChapters } from './vocabulary'
import { PATH_UNITS } from './learningPath'
import type { MockQuestion } from './mockTest'
import type { CefrCode, VocabWord } from '../lib/types'

const LISTENING_COUNT = 4
const GRAMMAR_AND_VOCAB_COUNT = 8
const READING_COUNT = 3
export const CHECKPOINT_LENGTH = LISTENING_COUNT + GRAMMAR_AND_VOCAB_COUNT + READING_COUNT

/** Units without listening steps of their own (C1) still get TOEIC listening practice. */
const FALLBACK_LISTENING_PARTS: (1 | 2 | 3 | 4)[] = [3, 4]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** TOEIC Part 5 style: blank the word out of its own example sentence, distractors from the same chapter. */
function vocabQuestion(word: VocabWord, chapterWords: VocabWord[]): MockQuestion | null {
  const pattern = new RegExp(`\\b${escapeRegExp(word.term)}\\b`, 'i')
  if (!pattern.test(word.exampleEn)) return null
  const samePos = chapterWords.filter((w) => w.id !== word.id && w.pos === word.pos)
  const distractors = shuffle(samePos.length >= 3 ? samePos : chapterWords.filter((w) => w.id !== word.id)).slice(0, 3)
  const choices = shuffle([word, ...distractors])
  return {
    id: `cp-${word.id}`,
    section: 'reading',
    context: word.exampleEn.replace(pattern, '____'),
    question: 'เลือกคำที่เหมาะสมที่สุดเพื่อเติมประโยคให้สมบูรณ์',
    choices: choices.map((w) => w.term),
    answerIndex: choices.indexOf(word),
  }
}

/** Takes items round-robin across groups so every lesson in the unit is represented. */
function spread<T>(groups: T[][], count: number): T[] {
  const queues = groups.map((g) => shuffle(g))
  const out: T[] = []
  while (out.length < count && queues.some((q) => q.length > 0)) {
    for (const q of queues) {
      const item = q.shift()
      if (item !== undefined && out.length < count) out.push(item)
    }
  }
  return out
}

/**
 * Builds a fresh mixed Listening + Reading test from the content of one unit
 * of the learning path. Sections that run short are topped up from the others
 * so the test length stays the same.
 */
export function buildCheckpointTest(cefrLevel: CefrCode): MockQuestion[] {
  const unit = PATH_UNITS.find((u) => u.cefrLevel === cefrLevel)
  if (!unit) return []
  const steps = unit.steps.map(({ step }) => step)
  const idsOf = (type: string) => steps.filter((s) => s.type === type).map((s) => s.id)

  const parts = idsOf('listening').map(Number) as (1 | 2 | 3 | 4)[]
  const listening = spread(
    (parts.length > 0 ? parts : FALLBACK_LISTENING_PARTS).map((part) =>
      listeningByPart(part)
        .filter((item) => item.script.length > 0)
        .map<MockQuestion>((item) => ({
          id: `cp-${item.id}`,
          section: 'listening',
          passageOrImage: item.imageDescription,
          audioScript: item.script,
          question: item.question,
          choices: item.choices,
          answerIndex: item.answerIndex,
        })),
    ),
    LISTENING_COUNT,
  )

  const grammarPools = grammarTopics
    .filter((t) => idsOf('grammar').includes(t.id))
    .map((topic) =>
      topic.questions.map<MockQuestion>((q) => ({
        id: `cp-${q.id}`,
        section: 'reading',
        context: q.sentence,
        question: 'เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมประโยคให้สมบูรณ์',
        choices: q.choices,
        answerIndex: q.answerIndex,
      })),
    )

  const vocabPools = vocabChapters
    .filter((c) => idsOf('vocabulary').includes(c.id))
    .map((chapter) => chapter.words.map((w) => vocabQuestion(w, chapter.words)).filter((q): q is MockQuestion => q !== null))

  const readingPools = readingPassages
    .filter((p) => idsOf('reading').includes(p.id))
    .map((passage) =>
      passage.questions.map<MockQuestion>((q) => ({
        id: `cp-${q.id}`,
        section: 'reading',
        context: passage.text,
        question: q.question,
        choices: q.choices,
        answerIndex: q.answerIndex,
      })),
    )

  const reading = spread(readingPools, READING_COUNT)
  const remaining = CHECKPOINT_LENGTH - listening.length - reading.length
  const grammar = spread(grammarPools, remaining)
  const vocab = spread(vocabPools, remaining)
  const middle = spread([grammar, vocab], remaining)

  return [...listening, ...middle, ...reading]
}
