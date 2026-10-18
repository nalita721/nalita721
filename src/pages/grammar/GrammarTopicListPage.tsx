import { grammarTopics } from '../../data/grammar'
import { useProgressStore } from '../../store/progress'
import { isGrammarTopicFree } from '../../lib/access'
import { pathStepKey } from '../../data/learningPath'
import { LevelSection, SkillHero, SkillRow } from '../../components/SkillPage'
import { groupOnPath, useStepStatus } from '../../lib/useStepStatus'

const groups = groupOnPath('grammar', grammarTopics, (t) => t.id)

export default function GrammarTopicListPage() {
  const stats = useProgressStore((s) => s.partStats.grammar)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const { statusOf, lockedLabel } = useStepStatus()
  const passed = grammarTopics.filter((t) => pathPassedSteps.includes(pathStepKey('grammar', t.id))).length

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <SkillHero
        emoji="✍️"
        eyebrow="TOEIC Part 5–6"
        title="ไวยากรณ์"
        description="จุดไวยากรณ์ที่ TOEIC ออกซ้ำบ่อยที่สุด เรียนทีละจุดพร้อมคำถามเช็กความเข้าใจ แล้วฝึกแต่งประโยคและทำแบบทดสอบ (ลองฟรีได้ที่บทพื้นฐาน)"
        gradient="from-violet-500 to-indigo-700"
        stats={[
          { value: `${grammarTopics.length}`, label: 'หัวข้อ' },
          { value: `${passed}/${grammarTopics.length}`, label: 'ผ่านแล้ว' },
          ...(stats.total > 0 ? [{ value: `${Math.round((stats.correct / stats.total) * 100)}%`, label: 'ความแม่นยำสะสม' }] : []),
        ]}
      />

      {groups.map(({ level, items }) => (
        <LevelSection key={level} level={level} count={items.length}>
          {items.map((topic) => (
            <SkillRow
              key={topic.id}
              to={`/grammar/${topic.id}`}
              icon={topic.lesson.emoji}
              level={topic.cefrLevel}
              title={topic.titleTh}
              subtitle={topic.description}
              meta={
                <>
                  <span>{topic.lesson.keyPoints.length} จุดสำคัญ</span>·<span>{topic.questions.length} ข้อฝึก</span>
                </>
              }
              status={statusOf('grammar', topic.id, isGrammarTopicFree(topic.id))}
              lockedLabel={lockedLabel}
            />
          ))}
        </LevelSection>
      ))}
    </div>
  )
}
