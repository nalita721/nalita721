import { WRITING_CHECKS } from '../data/writingChecks'

export interface WritingCheckResult {
  status: 'good' | 'issues'
  messages: string[]
}

const MODAL_OR_BE_VERBS = new Set([
  'is', 'was', 'has', 'does', 'goes',
  'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
])

const NATURAL_S_ENDING_VERBS = new Set(['discuss', 'focus', 'address', 'process', 'access', 'pass', 'miss', 'press', 'cross'])

const IRREGULAR_PAST_VERBS = [
  'went', 'had', 'did', 'said', 'came', 'took', 'gave', 'knew', 'saw', 'got', 'left', 'felt', 'kept',
  'wrote', 'spoke', 'built', 'sent', 'bought', 'thought', 'brought', 'caught', 'taught', 'paid', 'met',
  'made', 'began', 'ran', 'ate', 'drank', 'flew', 'grew', 'held', 'lost', 'meant', 'read', 'rode',
  'rose', 'sold', 'told', 'understood', 'won', 'chose', 'became', 'found', 'heard', 'led',
]

const COMMON_VERB_HINTS = [
  'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'has', 'have', 'had', 'do', 'does', 'did',
  'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might', 'must',
]

// Common base verbs seen in business/TOEIC-style writing prompts. Matched with their -s/-ed/-ing
// forms so plain noun-subject sentences ("The employees work...") and imperatives ("Send the...")
// aren't mistaken for missing a verb.
const COMMON_BASE_VERBS = [
  'work', 'send', 'complete', 'submit', 'meet', 'contact', 'manage', 'need', 'want', 'provide',
  'report', 'review', 'discuss', 'prepare', 'schedule', 'launch', 'finish', 'start', 'receive',
  'request', 'offer', 'plan', 'use', 'help', 'join', 'attend', 'apply', 'hire', 'train', 'support',
  'improve', 'increase', 'reduce', 'achieve', 'deliver', 'follow', 'ensure', 'require', 'suggest',
  'believe', 'think', 'know', 'understand', 'remember', 'decide', 'choose', 'avoid', 'prevent',
  'allow', 'enable', 'continue', 'maintain', 'develop', 'build', 'create', 'design', 'implement',
  'operate', 'handle', 'address', 'resolve', 'solve', 'check', 'confirm', 'verify', 'update',
  'install', 'remove', 'add', 'change', 'arrive', 'leave', 'return', 'move', 'travel', 'stay',
  'live', 'visit', 'call', 'email', 'sign', 'announce', 'collaborate', 'negotiate', 'assign',
  'monitor', 'evaluate', 'analyze', 'present', 'organize', 'coordinate', 'promote', 'expand',
]
const COMMON_VERB_PATTERN = new RegExp(`\\b(${COMMON_BASE_VERBS.join('|')})(e?s|ed|ing)?\\b`, 'i')

function wordBoundaryTest(lower: string, phrase: string): boolean {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`\\b${escaped}\\b`, 'i').test(lower)
}

function hasVerbLike(lower: string): boolean {
  if (COMMON_VERB_HINTS.some((v) => wordBoundaryTest(lower, v))) return true
  if (/\b\w+ing\b/.test(lower)) return true
  if (/\b\w+ed\b/.test(lower)) return true
  if (IRREGULAR_PAST_VERBS.some((v) => wordBoundaryTest(lower, v))) return true
  if (COMMON_VERB_PATTERN.test(lower)) return true
  // a base-form or third-person verb after a pronoun/simple subject is common enough to accept
  if (/\b(i|you|we|they|he|she|it)\s+[a-z]+/.test(lower)) return true
  // imperative sentences ("Please send...", "Send the report...")
  if (/\bplease\s+[a-z]+/.test(lower)) return true
  return false
}

/** True if the sentence uses the pronoun + verb agreement the prompt asked for (or the pattern isn't present to check). */
function subjectVerbAgreementOk(lower: string, subjects: RegExp, wantsS: boolean): boolean {
  const match = lower.match(subjects)
  if (!match) return true
  const verb = match[2]
  if (MODAL_OR_BE_VERBS.has(verb)) return true
  const endsWithS = verb.endsWith('s') && !NATURAL_S_ENDING_VERBS.has(verb)
  return wantsS ? endsWithS : !endsWithS
}

const SPECIAL_CHECKS: Record<string, { test: (lower: string) => boolean; hint: string }> = {
  'wf-w2': {
    test: (lower) => /\b\w+ly\b/.test(lower),
    hint: 'ลองใช้คำวิเศษณ์ (adverb) ที่ลงท้ายด้วย -ly เช่น "quickly", "efficiently", "carefully"',
  },
  'bs-w2': {
    test: (lower) => subjectVerbAgreementOk(lower, /\b(he|she|it)\s+([a-z]+)\b/, true),
    hint: 'ประธานเอกพจน์ (he/she/it) กริยาต้องเติม -s เช่น "She manages the team."',
  },
  'bs-w3': {
    test: (lower) => subjectVerbAgreementOk(lower, /\b(they|we)\s+([a-z]+)\b/, false),
    hint: 'ประธานพหูพจน์ (they/we) กริยาไม่ต้องเติม -s เช่น "They work from home."',
  },
  'pt-w2': {
    test: (lower) => /\b(is|are|am)\s+\w+ing\b/.test(lower),
    hint: 'ใช้ Present Continuous: is/are/am + กริยาเติม -ing เช่น "is fixing"',
  },
  'pt-w3': {
    test: (lower) => /\b(is|are|am)\s+\w+ing\b/.test(lower),
    hint: 'ใช้ Present Continuous: is/are/am + กริยาเติม -ing เช่น "are launching"',
  },
  'tn-w2': {
    test: (lower) => /\b\w+ed\b/.test(lower) || IRREGULAR_PAST_VERBS.some((v) => wordBoundaryTest(lower, v)),
    hint: 'ใช้ Past Simple: กริยาเติม -ed หรือกริยาช่องที่ 2 ของ irregular verb เช่น "signed", "went"',
  },
  'cp-w2': {
    test: (lower) => wordBoundaryTest(lower, 'the most') || /\b\w+est\b/.test(lower),
    hint: 'ใช้โครงสร้าง superlative: "the ...est" หรือ "the most ..." เช่น "the most efficient"',
  },
  'cp-w3': {
    test: (lower) => (lower.match(/\bthe\s+(more|less|\w+er)\b/g) ?? []).length >= 2,
    hint: 'ใช้โครงสร้าง "The more..., the more..." ซ้ำสองครั้งในประโยคเดียว',
  },
}

function keywordGroupsSatisfied(lower: string, groups: string[][]): boolean {
  return groups.every((group) => group.some((kw) => wordBoundaryTest(lower, kw)))
}

/**
 * Best-effort, rule-based feedback on a free-text writing attempt — not a full grammar checker.
 * Combines a few universal sanity checks with a per-prompt structure check (does the sentence
 * actually use the grammar point the prompt asked for).
 */
export function checkWriting(promptId: string, sentence: string): WritingCheckResult {
  const trimmed = sentence.trim()
  const messages: string[] = []

  const words = trimmed.split(/\s+/).filter(Boolean)
  if (words.length < 3) {
    messages.push('ประโยคสั้นเกินไป ลองแต่งให้ครบทั้งประธาน กริยา และส่วนขยาย')
  }
  if (trimmed && !/^[A-Z]/.test(trimmed)) {
    messages.push('ควรขึ้นต้นประโยคด้วยตัวพิมพ์ใหญ่')
  }
  if (trimmed && !/[.!?]$/.test(trimmed)) {
    messages.push('ควรจบประโยคด้วยเครื่องหมาย . ! หรือ ?')
  }

  const lower = trimmed.toLowerCase()
  if (words.length >= 3) {
    if (!hasVerbLike(lower)) {
      messages.push('ประโยคนี้อาจขาดคำกริยา (verb) ลองตรวจสอบอีกครั้ง')
    }

    const special = SPECIAL_CHECKS[promptId]
    if (special) {
      if (!special.test(lower)) messages.push(special.hint)
    } else {
      const check = WRITING_CHECKS[promptId]
      if (check && !keywordGroupsSatisfied(lower, check.keywordGroups)) {
        messages.push(check.hint)
      }
    }
  }

  return { status: messages.length ? 'issues' : 'good', messages }
}
