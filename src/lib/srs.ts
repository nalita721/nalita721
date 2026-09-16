import type { QuizQuality, SrsCardState } from './types'

const DAY_MS = 24 * 60 * 60 * 1000

export function newCard(wordId: string): SrsCardState {
  return {
    wordId,
    interval: 0,
    ease: 2.5,
    repetitions: 0,
    dueDate: new Date().toISOString(),
  }
}

/**
 * Simplified SM-2. quality 0-2 = "ยังไม่ได้" (resets), 3-5 = "จำได้" (grows interval).
 */
export function reviewCard(card: SrsCardState, quality: QuizQuality): SrsCardState {
  let { interval, ease, repetitions } = card

  if (quality < 3) {
    repetitions = 0
    interval = 1
  } else {
    repetitions += 1
    if (repetitions === 1) interval = 1
    else if (repetitions === 2) interval = 6
    else interval = Math.round(interval * ease)
  }

  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  const dueDate = new Date(Date.now() + interval * DAY_MS).toISOString()

  return { wordId: card.wordId, interval, ease, repetitions, dueDate }
}

export function isDue(card: SrsCardState): boolean {
  return new Date(card.dueDate).getTime() <= Date.now()
}
