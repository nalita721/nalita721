/**
 * Per-prompt structure checks for the grammar writing exercise, keyed by writing-prompt id.
 * `keywordGroups` is an AND of OR-groups: every group must have at least one keyword present
 * (as a whole word/phrase, case-insensitive) for the sentence to satisfy the required structure.
 * Prompts needing a real pattern check (not a fixed word) are special-cased in `writingCheck.ts`
 * instead of listed here.
 */
export interface WritingCheckEntry {
  keywordGroups: string[][]
  hint: string
}

export const WRITING_CHECKS: Record<string, WritingCheckEntry> = {
  'wf-w1': { keywordGroups: [['decision', 'decisions']], hint: 'ลองใช้คำนามที่มาจาก "decide" เช่น "decision" ในประโยค' },
  'wf-w3': { keywordGroups: [['presentation']], hint: 'อย่าลืมใช้คำคุณศัพท์ขยายคำว่า "presentation" เช่น "impressive presentation"' },

  'tn-w3': { keywordGroups: [['has', 'have'], ['since', 'for']], hint: 'ใช้โครงสร้าง Present Perfect (has/have + กริยาช่อง 3) ร่วมกับ "since" หรือ "for"' },

  'pp-w1': { keywordGroups: [['at']], hint: 'ลองใช้ "at" บอกเวลาที่ชัดเจน เช่น "at 9 a.m."' },
  'pp-w2': { keywordGroups: [['by']], hint: 'ลองใช้ "by" บอกกำหนดเส้นตาย เช่น "by Friday"' },
  'pp-w3': { keywordGroups: [['responsible for']], hint: 'ลองใช้สำนวน "responsible for" ในประโยค' },

  'cj-w1': { keywordGroups: [['although']], hint: 'ลองใช้ "Although" นำหน้าประโยคที่แสดงความขัดแย้ง' },
  'cj-w2': { keywordGroups: [['despite']], hint: 'ลองใช้ "Despite" ตามด้วยคำนาม' },
  'cj-w3': { keywordGroups: [['however']], hint: 'ลองเชื่อมสองประโยคด้วย "however"' },

  'rc-w1': { keywordGroups: [['who']], hint: 'ลองใช้ "who" ขยายคน' },
  'rc-w2': { keywordGroups: [['which']], hint: 'ลองใช้ "which" ขยายสิ่งของ' },
  'rc-w3': { keywordGroups: [['whose']], hint: 'ลองใช้ "whose" แสดงความเป็นเจ้าของ' },

  'cp-w1': { keywordGroups: [['than']], hint: 'ลองใช้โครงสร้างเปรียบเทียบ (comparative) ร่วมกับ "than"' },

  'inv-w1': { keywordGroups: [['never']], hint: 'ลองขึ้นต้นประโยคด้วย "Never" แล้วสลับโครงสร้างประธาน-กริยา' },
  'inv-w2': { keywordGroups: [['not only'], ['also']], hint: 'ลองใช้โครงสร้าง "Not only...but also..."' },
  'inv-w3': { keywordGroups: [['no sooner'], ['than']], hint: 'ลองใช้โครงสร้าง "No sooner...than..."' },

  'mix-w1': { keywordGroups: [['if'], ['would']], hint: 'ลองใช้โครงสร้าง "If + had + กริยาช่อง 3, ...would + กริยา"' },
  'mix-w2': { keywordGroups: [['recommend', 'recommends', 'recommended', 'recommending']], hint: 'ลองใช้ "recommend that" ตามด้วยกริยารูป base form' },
  'mix-w3': { keywordGroups: [['important']], hint: 'ลองใช้โครงสร้าง "It is important that..."' },

  'clft-w1': { keywordGroups: [['it is', 'it was'], ['that']], hint: 'ลองใช้โครงสร้าง "It is/was...that..." เพื่อเน้นความ' },
  'clft-w2': { keywordGroups: [['what']], hint: 'ลองขึ้นต้นประโยคด้วย "What"' },
  'clft-w3': { keywordGroups: [['all']], hint: 'ลองใช้โครงสร้าง "All...is..."' },
}
