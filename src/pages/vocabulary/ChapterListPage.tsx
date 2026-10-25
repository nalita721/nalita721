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
import { findStep, stepLessons } from '../../data/pathLessons'
import { pathStepKey } from '../../data/learningPath'
import { lessonStatuses } from '../../lib/miniLesson'

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
  const passedLessons = useProgressStore((s) => s.passedLessons)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const { statusOf, lockedLabel } = useStepStatus()
  const [filter, setFilter] = useState<Bucket>('all')

  const learnedOf = (words: { id: string }[]) => words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
  // progress is counted in the chapter's short lessons (4 word sets + the chapter test)
  const lessonsOf = (chapterId: string) => {
    const nodes = stepLessons(findStep('vocabulary', chapterId)!)
    const statuses = lessonStatuses(nodes, passedLessons, pathPassedSteps.includes(pathStepKey('vocabulary', chapterId)), true)
    return { nodes, statuses, passed: statuses.filter((st) => st === 'passed').length }
  }
  const bucketOf = (chapterId: string): Bucket => {
    const { nodes, passed } = lessonsOf(chapterId)
    return passed === 0 ? 'notStarted' : passed >= nodes.length ? 'completed' : 'inProgress'
  }
  const counts: Record<Bucket, number> = { all: vocabChapters.length, notStarted: 0, inProgress: 0, completed: 0 }
  vocabChapters.forEach((c) => counts[bucketOf(c.id)]++)
  const learnedTotal = learnedOf(vocabChapters.flatMap((c) => c.words))

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <SkillHero
        emoji="📚"
        eyebrow="คำศัพท์ TOEIC"
        title="คำศัพท์"
        description="คำศัพท์ธุรกิจตามหัวข้อที่ TOEIC ออกบ่อย เรียงจากง่ายไปยาก แต่ละบทแบ่งเป็น 4 ชุด ชุดละ 10 คำ (ชุดละ ~4 นาที) มีเกมฝึกเพิ่ม แล้วปิดด้วยแบบทดสอบท้ายบท (ลองฟรีได้ที่บทที่ 1)"
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
        const shown = items.filter((c) => filter === 'all' || bucketOf(c.id) === filter)
        if (shown.length === 0) return null
        return (
          <LevelSection key={level} level={level} count={shown.length}>
            {shown.map((chapter) => {
              const Icon = CHAPTER_ICON[chapter.id] ?? Building2
              const { nodes, statuses, passed } = lessonsOf(chapter.id)
              return (
                <SkillRow
                  key={chapter.id}
                  to={`/vocabulary/${chapter.id}`}
                  icon={<Icon size={22} />}
                  level={chapter.cefrLevel}
                  title={chapter.titleTh}
                  subtitle={chapter.description}
                  meta={
                    <>
                      <span className="flex gap-1">
                        {statuses.map((st, i) => (
                          <span
                            key={nodes[i].key}
                            className={`h-2 rounded-full ${i === nodes.length - 1 ? 'w-4' : 'w-2'} ${st === 'passed' ? 'bg-amber-400' : 'bg-sand-200'}`}
                          />
                        ))}
                      </span>
                      <span>
                        ผ่าน {passed}/{nodes.length} ด่านย่อย · {chapter.words.length} คำ
                      </span>
                    </>
                  }
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
