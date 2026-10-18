/**
 * Structural checks for all learning content (English, Chinese, Japanese).
 * Catches the mistakes that slip into hand-written data: duplicate ids or
 * words, answer keys out of range, duplicate choices, highlights that are not
 * in their example, listening items without audio and questions without an
 * explanation. It cannot judge whether content is *correct* — that still
 * needs a careful read.
 *
 * Run: npm run validate:content
 */
import { vocabChapters } from '../src/data/vocabulary'
import { grammarTopics } from '../src/data/grammar'
import { readingPassages } from '../src/data/reading'
import { listeningLessons } from '../src/data/listeningLessons'
import { EXAM_SETS } from '../src/data/examSets'
import { LEARNING_PATH } from '../src/data/learningPath'
import { LANG_TRACKS } from '../src/data/langs'
import { zhFoundations } from '../src/data/langs/zh-foundations'
import { kanaTables } from '../src/data/langs/ja-kana'
import { n5Kanji } from '../src/data/langs/ja-n5-kanji'
import type { LangLevelContent } from '../src/lib/langTypes'

const errors: string[] = []
const warnings: string[] = []

function choices(where: string, list: string[], answerIndex: number) {
  if (new Set(list).size !== list.length) errors.push(`${where}: duplicate choices`)
  if (answerIndex < 0 || answerIndex >= list.length) errors.push(`${where}: answerIndex ${answerIndex} out of range`)
}

function unique(where: string, ids: string[]) {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${where}: duplicate "${id}"`)
    seen.add(id)
  }
}

// ---------- English ----------
const enWords = vocabChapters.flatMap((c) => c.words)
unique('EN vocab ids', enWords.map((w) => w.id))
unique('EN vocab terms', enWords.map((w) => w.term.toLowerCase()))
for (const w of enWords) {
  for (const f of ['term', 'meaningTh', 'exampleEn', 'exampleTh', 'pronunciationTh'] as const) if (!w[f]) errors.push(`EN ${w.id}: empty ${f}`)
}

for (const t of grammarTopics) {
  t.lesson.keyPoints.forEach((k, i) => {
    if (k.highlight && !k.exampleEn.includes(k.highlight)) errors.push(`EN grammar ${t.id} kp${i + 1}: highlight not in example`)
    if (k.check) choices(`EN grammar ${t.id} kp${i + 1} check`, k.check.choices, k.check.answerIndex)
    else warnings.push(`EN grammar ${t.id} kp${i + 1}: no quick check`)
  })
  t.questions.forEach((q) => choices(`EN grammar ${q.id}`, q.choices, q.answerIndex))
}
unique('EN grammar question ids', grammarTopics.flatMap((t) => t.questions.map((q) => q.id)))

for (const p of readingPassages) p.questions.forEach((q) => choices(`EN reading ${q.id}`, q.choices, q.answerIndex))
unique('EN reading ids', readingPassages.flatMap((p) => [p.id, ...p.questions.map((q) => q.id)]))

for (const l of listeningLessons)
  l.tips.forEach((t, i) => {
    if (!t.exampleEn.includes(t.highlight)) errors.push(`EN listening lesson part ${l.part} tip ${i + 1}: highlight not in example`)
    choices(`EN listening lesson part ${l.part} tip ${i + 1}`, t.check.choices, t.check.answerIndex)
  })

const EXPECTED_PARTS = { 1: 6, 2: 25, 3: 39, 4: 30, 5: 30, 6: 16, 7: 54 } as Record<number, number>
for (const set of EXAM_SETS) {
  const byPart: Record<number, number> = {}
  for (const item of set.fullExamItems)
    for (const q of item.questions) {
      byPart[item.part] = (byPart[item.part] ?? 0) + 1
      choices(`EN mock ${set.id} ${q.id}`, q.choices, q.answerIndex)
      if (set.id === 'set1' && item.section === 'listening' && !q.explanationTh) errors.push(`EN mock set1 ${q.id}: no explanation`)
    }
  for (const [part, n] of Object.entries(EXPECTED_PARTS))
    if (byPart[Number(part)] !== n) errors.push(`EN mock ${set.id}: Part ${part} has ${byPart[Number(part)] ?? 0} questions, expected ${n}`)
  unique(`EN mock ${set.id} ids`, set.fullExamItems.flatMap((i) => i.questions.map((q) => q.id)))
}

for (const step of LEARNING_PATH) if (!step.to) errors.push(`learning path ${step.type}:${step.id}: no route`)

// ---------- Chinese / Japanese ----------
function checkLevel(tag: string, l: LangLevelContent) {
  const words = l.chapters.flatMap((c) => c.words)
  unique(`${tag} word ids`, words.map((w) => w.id))
  unique(`${tag} words`, words.map((w) => `${w.word}|${w.reading}`))
  for (const w of words) {
    for (const f of ['word', 'reading', 'meaningTh', 'example', 'exampleReading', 'exampleTh'] as const) if (!w[f]) errors.push(`${tag} ${w.id}: empty ${f}`)
    // correlative pairs like 因为…所以… are split across a sentence by design
    if (!w.example.includes(w.word) && !w.word.includes('…')) warnings.push(`${tag} ${w.id}: example does not contain "${w.word}"`)
  }
  for (const g of l.grammar) {
    g.keyPoints.forEach((k, i) => {
      if (!k.example.includes(k.highlight)) errors.push(`${tag} ${g.id} kp${i + 1}: highlight not in example`)
      choices(`${tag} ${g.id} kp${i + 1} check`, k.check.choices, k.check.answerIndex)
    })
    g.questions.forEach((q) => choices(`${tag} ${q.id}`, q.choices, q.answerIndex))
  }
  const mockIds: string[] = []
  for (const s of l.mock.sections)
    for (const q of s.questions) {
      mockIds.push(q.id)
      choices(`${tag} ${q.id}`, q.choices, q.answerIndex)
      if (s.kind === 'listening' && !q.audio) errors.push(`${tag} ${q.id}: listening question without audio`)
      if (!q.explanationTh) errors.push(`${tag} ${q.id}: no explanation`)
    }
  unique(`${tag} mock ids`, mockIds)
  return words.length
}

async function main() {
  const counts: string[] = []
  for (const track of Object.values(LANG_TRACKS))
    for (const level of track.levels) {
      if (!level.load) continue
      const content = await level.load()
      counts.push(`${level.code}: ${checkLevel(`${track.lang}-${level.slug}`, content)} words`)
    }

  zhFoundations.drill.forEach((d) => {
    if (d.confusables.includes(d.pinyin) || new Set(d.confusables).size !== d.confusables.length)
      errors.push(`zh pinyin drill ${d.hanzi}: bad confusables`)
  })
  for (const t of kanaTables) {
    const basic = t.basic.flatMap((r) => r.chars).filter(Boolean).length
    if (basic !== 46) errors.push(`${t.id}: ${basic} basic characters, expected 46`)
  }
  unique('N5 kanji', n5Kanji.map((k) => k.kanji))

  console.log(`EN: ${enWords.length} words, ${grammarTopics.length} grammar topics, ${readingPassages.length} passages, ${EXAM_SETS.length} mock sets`)
  console.log(counts.join(' · '))
  console.log(`warnings: ${warnings.length}`)
  warnings.slice(0, 30).forEach((w) => console.log('  ~', w))
  console.log(`errors: ${errors.length}`)
  errors.forEach((e) => console.log('  ✗', e))
  if (errors.length > 0) process.exit(1)
}

main()
