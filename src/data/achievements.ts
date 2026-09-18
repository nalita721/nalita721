import { BookOpen, Library, GraduationCap, Flame, Star, Target, Trophy, Route } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { allWords } from './vocabulary'
import { LEARNING_PATH } from './learningPath'
import type { ProgressSnapshot } from '../store/progress'

export interface Achievement {
  id: string
  titleTh: string
  descriptionTh: string
  icon: LucideIcon
  isUnlocked: (s: ProgressSnapshot) => boolean
}

function learnedCount(s: ProgressSnapshot): number {
  return allWords().filter((w) => (s.srsMap[w.id]?.repetitions ?? 0) > 0).length
}

function overallAccuracy(s: ProgressSnapshot): { correct: number; total: number } {
  const parts = ['vocabulary', 'grammar', 'listening', 'reading'] as const
  return parts.reduce(
    (acc, p) => ({ correct: acc.correct + s.partStats[p].correct, total: acc.total + s.partStats[p].total }),
    { correct: 0, total: 0 },
  )
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'words-20',
    titleTh: 'เริ่มต้นนักเรียน',
    descriptionTh: 'เรียนคำศัพท์ครบ 20 คำ',
    icon: BookOpen,
    isUnlocked: (s) => learnedCount(s) >= 20,
  },
  {
    id: 'words-100',
    titleTh: 'นักสะสมคำศัพท์',
    descriptionTh: 'เรียนคำศัพท์ครบ 100 คำ',
    icon: Library,
    isUnlocked: (s) => learnedCount(s) >= 100,
  },
  {
    id: 'words-all',
    titleTh: 'ปรมาจารย์คำศัพท์',
    descriptionTh: `เรียนคำศัพท์ครบทั้งหมด ${allWords().length} คำ`,
    icon: GraduationCap,
    isUnlocked: (s) => learnedCount(s) >= allWords().length,
  },
  {
    id: 'streak-7',
    titleTh: 'ไฟลุกโชน 7 วัน',
    descriptionTh: 'ฝึกต่อเนื่องครบ 7 วัน',
    icon: Flame,
    isUnlocked: (s) => s.streak >= 7,
  },
  {
    id: 'streak-30',
    titleTh: 'วินัยเหล็ก 30 วัน',
    descriptionTh: 'ฝึกต่อเนื่องครบ 30 วัน',
    icon: Flame,
    isUnlocked: (s) => s.streak >= 30,
  },
  {
    id: 'xp-500',
    titleTh: 'นักสะสมคะแนน',
    descriptionTh: 'สะสม XP ครบ 500 แต้ม',
    icon: Star,
    isUnlocked: (s) => s.xp >= 500,
  },
  {
    id: 'accuracy-80',
    titleTh: 'แม่นยำระดับเทพ',
    descriptionTh: 'ความแม่นยำรวมตั้งแต่ 80% ขึ้นไป (ทำอย่างน้อย 20 ข้อ)',
    icon: Target,
    isUnlocked: (s) => {
      const { correct, total } = overallAccuracy(s)
      return total >= 20 && correct / total >= 0.8
    },
  },
  {
    id: 'mock-1',
    titleTh: 'นักสู้ Mock Test',
    descriptionTh: 'ทำ Full Mock Test สำเร็จครั้งแรก',
    icon: Trophy,
    isUnlocked: (s) => s.mockResults.length >= 1,
  },
  {
    id: 'path-started',
    titleTh: 'ก้าวแรกของเส้นทาง',
    descriptionTh: 'ผ่านเส้นทางการเรียนไปแล้ว 5 ขั้น',
    icon: Route,
    isUnlocked: (s) => s.pathUnlockedIndex >= 5,
  },
  {
    id: 'path-complete',
    titleTh: 'TOEIC Master',
    descriptionTh: 'เรียนครบทุกขั้นตอนในเส้นทางการเรียน',
    icon: GraduationCap,
    isUnlocked: (s) => s.pathUnlockedIndex >= LEARNING_PATH.length,
  },
]
