/**
 * Shared content model for the Chinese (HSK) and Japanese (JLPT) tracks.
 * Each exam level is one module under src/data/langs/ so it loads on demand.
 */

export type LangCode = 'zh' | 'ja'

export interface LangWord {
  id: string
  /** Hanzi, or the Japanese written form (kanji/kana as normally written) */
  word: string
  /** Pinyin with tone marks, or the hiragana reading */
  reading: string
  /** Romaji (Japanese only) */
  romaji?: string
  pos: string
  meaningTh: string
  mnemonicTh?: string
  example: string
  /** Pinyin / hiragana reading of the example */
  exampleReading: string
  exampleTh: string
}

export interface LangVocabChapter {
  id: string
  emoji: string
  titleTh: string
  description: string
  words: LangWord[]
}

export interface LangQuickCheck {
  /** Sentence with the gap written as ___ (or a full question) */
  sentence: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export interface LangKeyPoint {
  label: string
  explanation: string
  /** Short formula chip, e.g. "S + 是 + N" */
  pattern: string
  example: string
  exampleReading: string
  exampleTh: string
  /** Exact substring of `example` to highlight */
  highlight: string
  check: LangQuickCheck
}

export interface LangGrammarQuestion {
  id: string
  sentence: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export interface LangGrammarTopic {
  id: string
  emoji: string
  titleTh: string
  description: string
  introTh: string
  keyPoints: LangKeyPoint[]
  tipTh: string
  questions: LangGrammarQuestion[]
}

export type LangExamSectionKind = 'listening' | 'reading' | 'vocab' | 'grammar' | 'writing'

export interface LangExamQuestion {
  id: string
  /** Text read aloud with TTS before answering (listening questions) */
  audio?: string
  /** Picture description (emoji + Thai) or a reading passage shown above the prompt */
  passage?: string
  prompt: string
  choices: string[]
  answerIndex: number
  explanationTh: string
}

export interface LangExamSection {
  id: string
  kind: LangExamSectionKind
  titleTh: string
  /** Instructions as printed for this section/part */
  instructionsTh: string
  questions: LangExamQuestion[]
}

export interface LangMockExam {
  minutes: number
  /** How passing works for this exam, in Thai */
  passTh: string
  /** Fraction of correct answers treated as a pass in this app */
  passRatio: number
  sections: LangExamSection[]
}

export interface LangExamFormatRow {
  sectionTh: string
  detailTh: string
  minutes: number
  questions: number
}

/** Everything for one exam level, e.g. HSK 1 or JLPT N5. */
export interface LangLevelContent {
  chapters: LangVocabChapter[]
  grammar: LangGrammarTopic[]
  mock: LangMockExam
}

export interface KanaChar {
  kana: string
  romaji: string
}

export interface KanaRow {
  label: string
  chars: (KanaChar | null)[]
}

export interface KanaTable {
  id: 'hiragana' | 'katakana'
  titleTh: string
  introTh: string
  /** Basic 46 */
  basic: KanaRow[]
  /** Dakuten / handakuten (が, ぱ...) */
  voiced: KanaRow[]
  /** Combinations (きゃ...) */
  combos: KanaRow[]
  tipsTh: string[]
}

export interface Kanji {
  id: string
  kanji: string
  onyomi: string
  kunyomi: string
  meaningTh: string
  strokes: number
  examples: { word: string; reading: string; meaningTh: string }[]
}

/** One pinyin sound (initial or final) with a character that carries it, used for audio. */
export interface PinyinSound {
  pinyin: string
  /** Closest Thai sound, e.g. "ป (ไม่พ่นลม)" */
  thai: string
  /** Character whose reading demonstrates the sound; TTS reads the character, not the pinyin */
  hanzi: string
  /** Full pinyin of that character, with tone mark */
  example: string
  noteTh?: string
}

export interface PinyinGroup {
  titleTh: string
  sounds: PinyinSound[]
}

export interface ToneInfo {
  tone: 1 | 2 | 3 | 4 | 5
  nameTh: string
  mark: string
  /** Pitch contour on the 1–5 scale, e.g. [5, 5] or [2, 1, 4] */
  contour: number[]
  thaiCompare: string
  hanzi: string
  example: string
  meaningTh: string
}

export interface ToneRule {
  titleTh: string
  explanation: string
  examples: { hanzi: string; written: string; spoken: string; meaningTh: string }[]
}

/** A heard character for listening drills: TTS reads `hanzi`, learner picks the tone or the pinyin. */
export interface PinyinDrillItem {
  hanzi: string
  pinyin: string
  tone: 1 | 2 | 3 | 4 | 5
  /** Similar-sounding pinyin used as wrong choices */
  confusables: string[]
  meaningTh: string
}

export interface StrokeInfo {
  stroke: string
  nameZh: string
  nameTh: string
  descriptionTh: string
  exampleHanzi: string
}

export interface StrokeOrderRule {
  ruleTh: string
  exampleHanzi: string
  explanation: string
}

export interface Radical {
  radical: string
  pinyin: string
  meaningTh: string
  /** Variant form used as a component, e.g. 氵 for 水 */
  variant?: string
  examples: { hanzi: string; pinyin: string; meaningTh: string }[]
}

export interface ChineseFoundations {
  introTh: string
  initials: PinyinGroup[]
  finals: PinyinGroup[]
  tones: ToneInfo[]
  toneRules: ToneRule[]
  drill: PinyinDrillItem[]
  strokes: StrokeInfo[]
  strokeOrder: StrokeOrderRule[]
  radicals: Radical[]
  tipsTh: string[]
}
