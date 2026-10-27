import { Link } from 'react-router-dom'
import { Check, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui'
import { useProgressStore } from '../store/progress'
import { useAuthStore } from '../store/auth'
import { CEFR_LEVELS } from '../data/cefr'
import { UNIT_THEME } from '../data/pathTheme'
import { LEARNING_PATH, PATH_UNITS, getEffectivePathIndex, pathStepKey } from '../data/learningPath'
import { vocabChapters } from '../data/vocabulary'
import { grammarTopics } from '../data/grammar'
import { readingPassages } from '../data/reading'
import { EXAM_SETS } from '../data/examSets'

const TOEIC_FORMAT = [
  { sectionTh: 'การฟัง (Listening)', detailTh: 'Part 1 บรรยายภาพ · Part 2 ถาม–ตอบ · Part 3 บทสนทนา · Part 4 ประกาศ/บทพูด', questions: 100, minutes: 45 },
  { sectionTh: 'การอ่าน (Reading)', detailTh: 'Part 5 เติมประโยค · Part 6 เติมข้อความ · Part 7 อ่านจับใจความ (เดี่ยว/คู่/สามส่วน)', questions: 100, minutes: 75 },
]

export default function EnglishHubPage() {
  const authStatus = useAuthStore((s) => s.status)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)
  const isMember = authStatus === 'authenticated'

  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelTestResult?.cefr)
  const activeIndex = Math.min(effectiveIndex, LEARNING_PATH.length - 1)
  const currentUnit = PATH_UNITS.findIndex((u) => u.steps.some(({ index }) => index === activeIndex))
  const wordCount = vocabChapters.reduce((s, c) => s + c.words.length, 0)

  const skills = [
    { to: '/vocabulary', emoji: '📚', title: 'คำศัพท์', detail: `${vocabChapters.length} บท · ${wordCount} คำ` },
    { to: '/grammar', emoji: '✍️', title: 'ไวยากรณ์', detail: `${grammarTopics.length} หัวข้อ · Part 5–6` },
    { to: '/listening', emoji: '🎧', title: 'การฟัง', detail: 'Part 1–4 พร้อมเทคนิค' },
    { to: '/reading', emoji: '📖', title: 'การอ่าน', detail: `${readingPassages.length} บท · Part 6–7` },
    { to: '/mock-test', emoji: '🏆', title: 'Mock Test', detail: `${EXAM_SETS.length} ชุด · ชุดละ 200 ข้อ` },
    { to: '/games', emoji: '🎮', title: 'เกมทบทวน', detail: 'Flashcard SRS และเกมคำศัพท์' },
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 to-brand-700 px-6 py-8 text-white shadow-sm">
        <span className="pointer-events-none absolute -right-2 -top-4 text-8xl opacity-25">🇬🇧</span>
        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">เตรียมสอบ TOEIC</p>
        <h1 className="mt-1 text-2xl font-extrabold">🇬🇧 ภาษาอังกฤษ</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">
          เตรียมสอบ TOEIC Listening & Reading เรียนไล่ระดับจาก A1 ถึง C1 ตามแผนการเรียน {LEARNING_PATH.length} ด่าน หรือเลือกฝึกแยกทักษะ
          แล้ววัดผลด้วยข้อสอบจำลองเต็มรูปแบบ
        </p>
      </div>

      <Link to="/level-test" className="block">
        <Card className="flex items-center gap-4 border-2 border-sky-200 transition hover:-translate-y-0.5 hover:shadow-md">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-lg font-extrabold text-sky-700">
            {levelTestResult?.cefr ?? 'A?'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-sky-600">ขั้นที่ 0 · เริ่มตรงนี้</p>
            <p className="font-bold text-stone-800">{levelTestResult ? `ระดับของคุณ: ${levelTestResult.cefr} · ${levelTestResult.totalScore}/990` : 'วัดระดับก่อนเริ่มเรียน'}</p>
            <p className="text-sm text-stone-500">
              {levelTestResult ? 'ทดสอบใหม่ได้ทุกเมื่อ แผนการเรียนจะข้ามไปเริ่มที่ระดับของคุณ' : 'แบบทดสอบ 25 นาที แผนการเรียนจะข้ามไปเริ่มที่ระดับของคุณ'}
            </p>
          </div>
          <ChevronRight className="shrink-0 text-stone-300" />
        </Card>
      </Link>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold text-stone-800">📋 รูปแบบข้อสอบจริง</h2>
          <span className="text-xs text-stone-500">200 ข้อ · 120 นาที</span>
        </div>
        <div className="divide-y divide-sand-100">
          {TOEIC_FORMAT.map((f) => (
            <div key={f.sectionTh} className="flex items-start justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-800">{f.sectionTh}</p>
                <p className="text-xs text-stone-500">{f.detailTh}</p>
              </div>
              <p className="shrink-0 text-right text-xs text-stone-500">
                {f.questions} ข้อ
                <br />
                {f.minutes} นาที
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-sand-50 px-3 py-2 text-xs text-stone-600">
          🎯 คะแนนเต็ม 990 (ส่วนละ 495) ไม่มีสอบตก — หน่วยงานกำหนดเกณฑ์เอง เช่น 550+ สำหรับสมัครงานทั่วไป, 750+ สำหรับงานที่ใช้ภาษาอังกฤษบ่อย
        </p>
      </Card>

      <div>
        <h2 className="mb-3 font-bold text-stone-800">เรียนตามระดับ</h2>
        <div className="space-y-3">
          {PATH_UNITS.map((unit, i) => {
            const theme = UNIT_THEME[i % UNIT_THEME.length]
            const level = CEFR_LEVELS.find((l) => l.code === unit.cefrLevel)!
            const low = i === 0 ? CEFR_LEVELS[0] : level
            const passed = unit.steps.filter(({ step }) => pathPassedSteps.includes(pathStepKey(step.type, step.id))).length
            const complete = passed === unit.steps.length
            const current = isMember && i === currentUnit && effectiveIndex < LEARNING_PATH.length
            return (
              <Link key={unit.cefrLevel} to="/study-plan" className="block">
                <div
                  className={`flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-[0_2px_16px_rgba(86,61,44,0.07)] transition hover:-translate-y-0.5 hover:shadow-md ${
                    current ? 'border-2' : 'border-sand-100'
                  }`}
                  style={current ? { borderColor: theme.hex } : undefined}
                >
                  <span
                    className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl text-white"
                    style={{ backgroundColor: theme.hex }}
                  >
                    <span className="text-[12px] font-semibold opacity-80">CEFR</span>
                    <span className="text-base font-extrabold leading-none">{i === 0 ? 'A1–A2' : unit.cefrLevel}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-stone-800">
                      หน่วยที่ {i + 1} · {level.nameTh}
                      {current && (
                        <span className="ml-2 text-xs font-semibold" style={{ color: theme.hex }}>
                          กำลังเรียน
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-stone-500">
                      TOEIC ประมาณ {low.minScore}–{level.maxScore} · {unit.steps.length} ด่าน
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand-100">
                      <div className="h-full rounded-full" style={{ width: `${(passed / unit.steps.length) * 100}%`, backgroundColor: theme.hex }} />
                    </div>
                  </div>
                  {complete ? (
                    <Check className="shrink-0 text-emerald-600" strokeWidth={3} />
                  ) : (
                    <span className="shrink-0 text-xs text-stone-400">
                      {passed}/{unit.steps.length}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-bold text-stone-800">ฝึกแยกทักษะ</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {skills.map((s) => (
            <Link key={s.to} to={s.to}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-3xl">{s.emoji}</span>
                <p className="mt-2 font-bold text-stone-800">{s.title}</p>
                <p className="text-xs text-stone-500">{s.detail}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
