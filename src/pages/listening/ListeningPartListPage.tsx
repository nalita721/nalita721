import { listeningByPart } from '../../data/listening'
import { listeningLessonFor } from '../../data/listeningLessons'
import { isTtsSupported } from '../../lib/tts'
import { useProgressStore } from '../../store/progress'
import { isListeningPartFree } from '../../lib/access'
import { pathStepKey } from '../../data/learningPath'
import { LevelSection, SkillHero, SkillRow } from '../../components/SkillPage'
import { groupOnPath, useStepStatus } from '../../lib/useStepStatus'

const PARTS = [
  { part: 1 as const, emoji: '🖼️', title: 'Part 1: Photographs', desc: 'ฟังประโยคบรรยายภาพ 4 ตัวเลือก แล้วเลือกข้อที่ตรงกับภาพ' },
  { part: 2 as const, emoji: '💬', title: 'Part 2: Question-Response', desc: 'ฟังคำถามแล้วเลือกคำตอบที่เหมาะสมที่สุดจาก 3 ตัวเลือก' },
  { part: 3 as const, emoji: '👥', title: 'Part 3: Conversations', desc: 'ฟังบทสนทนาสั้นๆ แล้วตอบคำถามเกี่ยวกับเนื้อหา' },
  { part: 4 as const, emoji: '📢', title: 'Part 4: Talks', desc: 'ฟังประกาศ/บทพูดสั้นๆ แล้วตอบคำถาม' },
]

const groups = groupOnPath('listening', PARTS, (p) => String(p.part))

export default function ListeningPartListPage() {
  const stats = useProgressStore((s) => s.partStats.listening)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const { statusOf, lockedLabel } = useStepStatus()
  const passed = PARTS.filter((p) => pathPassedSteps.includes(pathStepKey('listening', String(p.part)))).length

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <SkillHero
        emoji="🎧"
        eyebrow="TOEIC Part 1–4"
        title="การฟัง"
        description="แต่ละ Part เริ่มด้วยบทเรียนเทคนิค แล้วฝึกในรูปแบบเดียวกับข้อสอบจริง มีคำอธิบายทุกข้อ เลือกสำเนียง US/UK/AU/CA และโหมดจำลองสอบได้ (ลองฟรีได้ที่ Part 1)"
        gradient="from-teal-500 to-cyan-700"
        stats={[
          { value: `${PARTS.reduce((s, p) => s + listeningByPart(p.part).length, 0)}`, label: 'ข้อฝึก' },
          { value: `${passed}/${PARTS.length}`, label: 'Part ที่ผ่าน' },
          ...(stats.total > 0 ? [{ value: `${Math.round((stats.correct / stats.total) * 100)}%`, label: 'ความแม่นยำสะสม' }] : []),
        ]}
      />

      {!isTtsSupported() && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง (Web Speech API) — บทฝึกยังใช้งานได้แต่จะไม่มีเสียง
        </p>
      )}

      {groups.map(({ level, items }) => (
        <LevelSection key={level} level={level} count={items.length}>
          {items.map((p) => (
            <SkillRow
              key={p.part}
              to={`/listening/${p.part}`}
              icon={p.emoji}
              level={level}
              title={p.title}
              subtitle={p.desc}
              meta={
                <>
                  <span>เทคนิค {listeningLessonFor(p.part)?.tips.length ?? 0} ข้อ</span>·<span>{listeningByPart(p.part).length} ข้อฝึก</span>
                </>
              }
              status={statusOf('listening', String(p.part), isListeningPartFree(String(p.part)))}
              lockedLabel={lockedLabel}
            />
          ))}
        </LevelSection>
      ))}
    </div>
  )
}
