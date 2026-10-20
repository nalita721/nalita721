import type { LangCode, LangGrammarTopic, LangVocabChapter } from '../lib/langTypes'
import { balancedChunks, estimateMinutes, POINTS_PER_LESSON, WORDS_PER_LESSON, type LessonNode } from '../lib/miniLesson'

export type LangItemKind = 'v' | 'g'

/** A chapter or grammar topic counts as passed once its test scores this much. */
export const LANG_TEST_PASS = 0.7

export function langItemKey(lang: LangCode, slug: string, kind: LangItemKind, id: string): string {
  return `${lang}:${slug}:${kind}:${id}`
}

export function langVocabLessons(base: string, lang: LangCode, slug: string, chapter: LangVocabChapter): LessonNode[] {
  const key = langItemKey(lang, slug, 'v', chapter.id)
  let first = 1
  const learn = balancedChunks(chapter.words, WORDS_PER_LESSON).map((words, i): LessonNode => {
    const titleTh = `คำที่ ${first}–${first + words.length - 1}`
    first += words.length
    return { key: `${key}#${i}`, kind: 'learn', titleTh, minutes: estimateMinutes(words.length, words.length, 18, 8), to: `${base}/lesson/v/${chapter.id}/${i}` }
  })
  return [
    ...learn,
    {
      key: `${key}#test`,
      kind: 'test',
      titleTh: `ทดสอบท้ายบท ${chapter.words.length} คำ`,
      minutes: estimateMinutes(0, chapter.words.length, 0, 9),
      to: `${base}/vocab/${chapter.id}?mode=quiz`,
    },
  ]
}

export function langGrammarLessons(base: string, lang: LangCode, slug: string, topic: LangGrammarTopic): LessonNode[] {
  const key = langItemKey(lang, slug, 'g', topic.id)
  let first = 1
  const learn = balancedChunks(topic.keyPoints, POINTS_PER_LESSON).map((kps, i): LessonNode => {
    const titleTh = kps.length === 1 ? `จุดที่ ${first}` : `จุดที่ ${first}–${first + kps.length - 1}`
    first += kps.length
    return { key: `${key}#${i}`, kind: 'learn', titleTh, minutes: estimateMinutes(kps.length, kps.length, 70, 20), to: `${base}/lesson/g/${topic.id}/${i}` }
  })
  return [
    ...learn,
    {
      key: `${key}#test`,
      kind: 'test',
      titleTh: `ทดสอบ ${topic.questions.length} ข้อ`,
      minutes: estimateMinutes(0, topic.questions.length, 0, 25),
      to: `${base}/grammar/${topic.id}?quiz=1`,
    },
  ]
}
