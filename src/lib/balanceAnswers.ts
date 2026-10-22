import type { ExamItem } from './types'

/**
 * Spreads correct answers evenly over A/B/C/D within each part of an exam set.
 *
 * The source data was written with most keys in the same slot (e.g. every Part 2
 * answer is A), which lets a learner score by guessing one letter. For each part,
 * this assigns every question a target slot so each slot gets an equal share, in a
 * fixed pseudo-random order (seeded by `seed`, so the layout never changes between
 * visits), then swaps the correct choice into that slot. The other choices keep
 * their relative positions. Choice lists with a natural order (times, numbers,
 * weekdays) are left as written.
 */
export function balanceAnswers(items: ExamItem[], seed: string): ExamItem[] {
  const targets = new Map<string, number>()
  const groups = new Map<string, string[]>()
  for (const item of items) {
    for (const q of item.questions) {
      if (isOrderedList(q.choices)) continue
      const key = `${item.part}:${q.choices.length}`
      groups.set(key, [...(groups.get(key) ?? []), q.id])
    }
  }
  for (const [key, ids] of groups) {
    const size = Number(key.split(':')[1])
    const slots = shuffle(
      ids.map((_, i) => i % size),
      random(`${seed}:${key}`),
    )
    ids.forEach((id, i) => targets.set(id, slots[i]))
  }

  return items.map((item) => ({
    ...item,
    questions: item.questions.map((q) => {
      const target = targets.get(q.id)
      if (target === undefined || target === q.answerIndex) return q
      const choices = [...q.choices]
      ;[choices[q.answerIndex], choices[target]] = [choices[target], choices[q.answerIndex]]
      return { ...q, choices, answerIndex: target }
    }),
  }))
}

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

function isOrderedList(choices: string[]): boolean {
  return choices.every((c) => /^[\d$]/.test(c.trim()) || WEEKDAYS.includes(c.trim().toLowerCase()))
}

function shuffle<T>(list: T[], rand: () => number): T[] {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Small seeded PRNG (mulberry32 over an FNV-1a hash of the seed). */
function random(seed: string): () => number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return () => {
    h = (h + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 15), 1 | h)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
