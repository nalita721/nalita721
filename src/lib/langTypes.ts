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
