import { randomBytes } from 'crypto'
import { kv } from './_redis.js'
import { allWords, vocabChapters } from '../src/data/vocabulary.js'
import type { VocabWord } from '../src/lib/types.js'

const DUEL_WORD_COUNT = 8

export interface DuelQuestion {
  wordId: string
  term: string
  choices: string[]
  answerIndex: number
}

export interface DuelPlayerProgress {
  answers: (number | null)[]
  score: number | null
  completedAt: string | null
}

export interface DuelState {
  id: string
  chapterId: string
  chapterTitleTh: string
  questions: DuelQuestion[]
  players: [string, string]
  displayNames: [string, string]
  progress: Record<string, DuelPlayerProgress>
  status: 'pending' | 'finished'
  createdAt: string
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function buildDuelQuestions(chapterId: string): DuelQuestion[] | null {
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  if (!chapter) return null
  const pool = allWords()
  const picked = shuffle(chapter.words).slice(0, Math.min(DUEL_WORD_COUNT, chapter.words.length))
  return picked.map((word) => {
    const distractors = shuffle(pool.filter((w) => w.id !== word.id)).slice(0, 3)
    const choices = shuffle([word, ...distractors] as VocabWord[])
    return {
      wordId: word.id,
      term: word.term,
      choices: choices.map((c) => c.meaningTh),
      answerIndex: choices.findIndex((c) => c.id === word.id),
    }
  })
}

export function randomDuelId(): string {
  return randomBytes(12).toString('hex')
}

export async function getDuel(id: string): Promise<DuelState | null> {
  return (await kv.get<DuelState>(`duel:${id}`)) ?? null
}

export async function saveDuel(duel: DuelState): Promise<void> {
  await kv.set(`duel:${duel.id}`, duel)
}

/** Hides the opponent's picks until the requester has submitted their own answers, so no one can peek early. */
export function redactForViewer(duel: DuelState, viewerEmail: string): DuelState {
  const myProgress = duel.progress[viewerEmail]
  if (myProgress?.completedAt) return duel

  const redacted: DuelState = { ...duel, progress: { ...duel.progress } }
  for (const playerEmail of duel.players) {
    if (playerEmail === viewerEmail) continue
    const theirs = redacted.progress[playerEmail]
    if (theirs) {
      redacted.progress[playerEmail] = {
        answers: theirs.answers.map(() => null),
        score: null,
        completedAt: theirs.completedAt,
      }
    }
  }
  return redacted
}
