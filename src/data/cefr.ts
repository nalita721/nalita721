import type { CefrCode } from '../lib/types'

export interface CefrLevel {
  code: CefrCode
  name: string
  nameTh: string
  color: string
  bgColor: string
  minScore: number
  maxScore: number
  descriptionTh: string
  tipTh: string
}

/**
 * Score bands follow ETS's own published TOEIC Listening & Reading-to-CEFR
 * correlation table. TOEIC L&R alone tops out at C1 in that table — C2
 * requires assessing productive skills (Speaking & Writing), which this
 * app doesn't test.
 */
export const CEFR_LEVELS: CefrLevel[] = [
  {
    code: 'A1',
    name: 'Beginner',
    nameTh: 'เริ่มต้น',
    color: '#b45309',
    bgColor: '#fef3c7',
    minScore: 10,
    maxScore: 224,
    descriptionTh:
      'เข้าใจและใช้คำศัพท์หรือประโยคง่ายๆ ในชีวิตประจำวันได้ แนะนำตัวเอง ถามและตอบข้อมูลพื้นฐานเกี่ยวกับตัวเองได้',
    tipTh: 'เริ่มจากคำศัพท์พื้นฐานหมวดสำนักงาน/ธุรกิจ และไวยากรณ์เบื้องต้นก่อน ยังไม่ต้องรีบทำ Mock Test',
  },
  {
    code: 'A2',
    name: 'Elementary',
    nameTh: 'พื้นฐาน',
    color: '#b45309',
    bgColor: '#fde68a',
    minScore: 225,
    maxScore: 549,
    descriptionTh:
      'เข้าใจประโยคและสำนวนที่ใช้บ่อยเกี่ยวกับเรื่องใกล้ตัว เช่น ข้อมูลส่วนตัว การซื้อของ สื่อสารเรื่องง่ายๆ ในชีวิตประจำวันได้',
    tipTh: 'ฝึกคำศัพท์ TOEIC ให้ครบทุกบท และฝึกไวยากรณ์จุดที่ออกสอบบ่อยให้แม่นก่อนเริ่ม Mock Test',
  },
  {
    code: 'B1',
    name: 'Intermediate',
    nameTh: 'ปานกลาง',
    color: '#1a4fb5',
    bgColor: '#d9ebff',
    minScore: 550,
    maxScore: 784,
    descriptionTh:
      'เข้าใจใจความสำคัญของเรื่องทั่วไปทั้งในที่ทำงาน โรงเรียน หรือการพักผ่อน จัดการสถานการณ์ส่วนใหญ่ระหว่างเดินทางได้',
    tipTh: 'เริ่มฝึก Mini/Full Mock Test เป็นประจำ แล้วดูสถิติในแดชบอร์ดว่าทักษะไหนยังอ่อนเพื่อโฟกัสเพิ่ม',
  },
  {
    code: 'B2',
    name: 'Upper-Intermediate',
    nameTh: 'ปานกลางค่อนข้างสูง',
    color: '#1a4fb5',
    bgColor: '#bcdcff',
    minScore: 785,
    maxScore: 944,
    descriptionTh:
      'เข้าใจใจความสำคัญของเนื้อหาที่ซับซ้อนทั้งเรื่องธุรกิจและวิชาการ สื่อสารได้อย่างคล่องแคล่วเป็นธรรมชาติในหลายสถานการณ์',
    tipTh: 'ฝึก Full Mock Test ภายใต้เวลาจริงสม่ำเสมอ เน้นบริหารเวลาและความแม่นยำใน Part ที่ยังพลาดบ่อย',
  },
  {
    code: 'C1',
    name: 'Advanced',
    nameTh: 'ขั้นสูง',
    color: '#166534',
    bgColor: '#d1fae5',
    minScore: 945,
    maxScore: 990,
    descriptionTh:
      'เข้าใจเนื้อหาที่ยากและหลากหลายได้ดี ใช้ภาษาได้อย่างคล่องแคล่วเป็นธรรมชาติในบริบทสังคม การเรียน และวิชาชีพ',
    tipTh: 'รักษาระดับด้วยการฝึก Full Mock Test ภายใต้เวลาจริงสม่ำเสมอ เพื่อคงความเร็วและความแม่นยำ',
  },
]

export function scoreToCefr(totalScore: number): CefrLevel {
  return CEFR_LEVELS.find((l) => totalScore >= l.minScore && totalScore <= l.maxScore) ?? CEFR_LEVELS[0]
}
