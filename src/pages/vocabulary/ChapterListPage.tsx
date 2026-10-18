import { useState } from 'react'
import {
  Building,
  Building2,
  Factory,
  Headset,
  HeartPulse,
  Home,
  Landmark,
  Megaphone,
  MessageSquare,
  Monitor,
  Plane,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { vocabChapters } from '../../data/vocabulary'
import { useProgressStore } from '../../store/progress'
import { isVocabChapterFree } from '../../lib/access'
import { LevelSection, SkillHero, SkillRow } from '../../components/SkillPage'
import { groupOnPath, useStepStatus } from '../../lib/useStepStatus'

const CHAPTER_ICON: Record<string, LucideIcon> = {
  travel: Plane,
  'office-hr': Building2,
  meetings: Users,
  communication: MessageSquare,
  'health-safety': HeartPulse,
  'customer-service': Headset,
  finance: Landmark,
  marketing: Megaphone,
  technology: Monitor,
  logistics: Truck,
  'real-estate': Home,
  manufacturing: Factory,
  'advanced-business': Building,
}

type Bucket = 'all' | 'notStarted' | 'inProgress' | 'completed'
const BUCKET_LABEL: Record<Bucket, string> = {
  all: 'ทั้งหมด',
  notStarted: 'ยังไม่เริ่ม',
  inProgress: 'กำลังเรียน',
  completed: 'เรียนจบ',
}

const groups = groupOnPath('vocabulary', vocabChapters, (c) => c.id)
const totalWords = vocabChapters.reduce((s, c) => s + c.words.length, 0)

export default function ChapterListPage() {
  const srsMap = useProgressStore((s) => s.srsMap)
  const { statusOf, lockedLabel } = useStepStatus()
  const [filter, setFilter] = useState<Bucket>('all')

  const learnedOf = (words: { id: string }[]) => words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
  const bucketOf = (words: { id: string }[]): Bucket => {
    const learned = learnedOf(words)
    return learned === 0 ? 'notStarted' : learned >= words.length ? 'completed' : 'inProgress'
  }
  const counts: Record<Bucket, number> = { all: vocabChapters.length, notStarted: 0, inProgress: 0, completed: 0 }
  vocabChapters.forEach((c) => counts[bucketOf(c.words)]++)
  const learnedTotal = learnedOf(vocabChapters.flatMap((c) => c.words))

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <SkillHero
        emoji="📚"
        eyebrow="คำศัพท์ TOEIC"
        title="คำศัพท์"
        description="คำศัพท์ธุรกิจตามหัวข้อที่ TOEIC ออกบ่อย เรียงจากง่ายไปยาก แต่ละบทมีเส้นทางเกมคำศัพท์และแบบทดสอบท้ายบท (ลองฟรีได้ที่บทที่ 1)"
        gradient="from-sky-500 to-brand-700"
        stats={[
          { value: `${vocabChapters.length}`, label: 'บท' },
          { value: `${learnedTotal}/${totalWords}`, label: 'คำที่เรียนแล้ว' },
          { value: `${counts.completed}`, label: 'บทที่เรียนจบ' },
        ]}
      />

      <div className="flex flex-wrap gap-2">
        {(Object.keys(BUCKET_LABEL) as Bucket[]).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setFilter(b)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === b ? 'bg-sand-900 text-white' : 'border border-sand-200 bg-white text-stone-600 hover:border-brand-400'
            }`}
          >
            {BUCKET_LABEL[b]} ({counts[b]})
          </button>
        ))}
      </div>

      {groups.map(({ level, items }) => {
        const shown = items.filter((c) => filter === 'all' || bucketOf(c.words) === filter)
        if (shown.length === 0) return null
        return (
          <LevelSection key={level} level={level} count={shown.length}>
            {shown.map((chapter) => {
              const Icon = CHAPTER_ICON[chapter.id] ?? Building2
              const learned = learnedOf(chapter.words)
              return (
                <SkillRow
                  key={chapter.id}
                  to={`/vocabulary/${chapter.id}`}
                  icon={<Icon size={22} />}
                  level={chapter.cefrLevel}
                  title={chapter.titleTh}
                  subtitle={chapter.description}
                  meta={
                    <span>
                      เรียนแล้ว {learned}/{chapter.words.length} คำ
                    </span>
                  }
                  progress={learned / chapter.words.length}
                  status={statusOf('vocabulary', chapter.id, isVocabChapterFree(chapter.id))}
                  lockedLabel={lockedLabel}
                />
              )
            })}
          </LevelSection>
        )
      })}
    </div>
  )
}
