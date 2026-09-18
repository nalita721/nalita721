export interface LevelTitle {
  minXp: number
  titleTh: string
}

export const LEVEL_TITLES: LevelTitle[] = [
  { minXp: 0, titleTh: 'ผู้เริ่มต้น' },
  { minXp: 100, titleTh: 'นักเรียนมือใหม่' },
  { minXp: 300, titleTh: 'นักเรียนขยัน' },
  { minXp: 700, titleTh: 'นักเรียนเก่ง' },
  { minXp: 1500, titleTh: 'ผู้เชี่ยวชาญ' },
  { minXp: 3000, titleTh: 'ปรมาจารย์ TOEIC' },
]

export interface LevelProgress {
  title: string
  currentMinXp: number
  nextMinXp: number | null
}

export function levelProgressForXp(xp: number): LevelProgress {
  let current = LEVEL_TITLES[0]
  let next: LevelTitle | null = null
  for (let i = 0; i < LEVEL_TITLES.length; i++) {
    if (xp >= LEVEL_TITLES[i].minXp) {
      current = LEVEL_TITLES[i]
      next = LEVEL_TITLES[i + 1] ?? null
    }
  }
  return { title: current.titleTh, currentMinXp: current.minXp, nextMinXp: next?.minXp ?? null }
}
