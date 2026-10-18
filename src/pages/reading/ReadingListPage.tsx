import { readingPassages } from '../../data/reading'
import { useProgressStore } from '../../store/progress'
import { isReadingPassageFree } from '../../lib/access'
import { pathStepKey } from '../../data/learningPath'
import { Chip, LevelSection, SkillHero, SkillRow } from '../../components/SkillPage'
import { groupOnPath, useStepStatus } from '../../lib/useStepStatus'
import type { Difficulty } from '../../lib/types'

const DIFFICULTY_META: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'bg-emerald-100 text-emerald-700' },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-700' },
  hard: { label: 'Hard', className: 'bg-rose-100 text-rose-700' },
}

function kindOf(title: string): { emoji: string; label: string } {
  if (title.includes('Triple')) return { emoji: '📚', label: 'สามบทความ' }
  if (title.includes('Double')) return { emoji: '📑', label: 'สองบทความ' }
  if (title.startsWith('Part 6')) return { emoji: '✉️', label: 'เติมข้อความ' }
  return { emoji: '📄', label: 'บทความเดี่ยว' }
}

const groups = groupOnPath('reading', readingPassages, (p) => p.id)

export default function ReadingListPage() {
  const stats = useProgressStore((s) => s.partStats.reading)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const { statusOf, lockedLabel } = useStepStatus()
  const passed = readingPassages.filter((p) => pathPassedSteps.includes(pathStepKey('reading', p.id))).length

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <SkillHero
        emoji="📖"
        eyebrow="TOEIC Part 6–7"
        title="การอ่าน"
        description="ฝึกเติมข้อความ (Part 6) และอ่านจับใจความ (Part 7) ทั้งบทความเดี่ยว สองบทความ และสามบทความ เหมือนข้อสอบจริง (ลองฟรีได้ที่บทแรก)"
        gradient="from-amber-500 to-orange-600"
        stats={[
          { value: `${readingPassages.length}`, label: 'บทอ่าน' },
          { value: `${passed}/${readingPassages.length}`, label: 'ผ่านแล้ว' },
          ...(stats.total > 0 ? [{ value: `${Math.round((stats.correct / stats.total) * 100)}%`, label: 'ความแม่นยำสะสม' }] : []),
        ]}
      />

      {groups.map(({ level, items }) => (
        <LevelSection key={level} level={level} count={items.length}>
          {items.map((p) => {
            const kind = kindOf(p.title)
            const diff = DIFFICULTY_META[p.difficulty]
            return (
              <SkillRow
                key={p.id}
                to={`/reading/${p.id}`}
                icon={kind.emoji}
                level={level}
                title={p.title.split('— ')[1] ?? p.title}
                meta={
                  <>
                    <Chip className="bg-brand-50 text-brand-700">Part {p.part}</Chip>
                    <span>{kind.label}</span>·<span>{p.questions.length} คำถาม</span>
                    <Chip className={diff.className}>{diff.label}</Chip>
                  </>
                }
                status={statusOf('reading', p.id, isReadingPassageFree(p.id))}
                lockedLabel={lockedLabel}
              />
            )
          })}
        </LevelSection>
      ))}
    </div>
  )
}
