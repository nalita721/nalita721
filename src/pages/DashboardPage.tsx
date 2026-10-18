import { Link } from 'react-router-dom'
import { Check, Circle, CheckCircle2 } from 'lucide-react'
import { allWords } from '../data/vocabulary'
import { Button, Card, ProgressBar } from '../components/ui'
import { GoalRing, GOAL_SCORE } from '../components/GoalRing'
import { useProgressStore } from '../store/progress'
import { useAuthStore } from '../store/auth'
import { isDue } from '../lib/srs'
import { scoreToCefr } from '../data/cefr'
import { LEARNING_PATH, TYPE_ICON, currentPathStep, getEffectivePathIndex } from '../data/learningPath'



const THAI_DAY_ABBR = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function StreakCalendar({ streak }: { streak: number }) {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d
  })
  const activeFromIndex = 7 - Math.min(streak, 7)

  return (
    <Card>
      <p className="text-sm text-stone-500 mb-3">🔥 Streak ต่อเนื่อง {streak} วัน</p>
      <div className="flex justify-between">
        {days.map((d, i) => {
          const active = i >= activeFromIndex
          const isToday = d.toDateString() === today.toDateString()
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-stone-400">{THAI_DAY_ABBR[d.getDay()]}</span>
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition ${
                  active ? 'bg-amber-500 text-white' : 'bg-sand-100 text-stone-400'
                } ${isToday ? 'ring-2 ring-brand-400 ring-offset-2 ring-offset-white' : ''}`}
              >
                {active ? <Check size={14} /> : d.getDate()}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  const email = useAuthStore((s) => s.email)
  const streak = useProgressStore((s) => s.streak)
  const srsMap = useProgressStore((s) => s.srsMap)
  const mockResults = useProgressStore((s) => s.mockResults)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const dailyMissionDate = useProgressStore((s) => s.dailyMissionDate)
  const dailyWordsReviewed = useProgressStore((s) => s.dailyWordsReviewed)
  const dailyQuestionsAnswered = useProgressStore((s) => s.dailyQuestionsAnswered)

  const words = allWords()
  const dueCount = words.filter((w) => isDue(srsMap[w.id] ?? { wordId: w.id, interval: 0, ease: 2.5, repetitions: 0, dueDate: new Date(0).toISOString() })).length
  const displayName = email ? email.split('@')[0] : null

  const effectivePathIndex = getEffectivePathIndex(pathUnlockedIndex, levelTestResult?.cefr)
  const pathDone = effectivePathIndex >= LEARNING_PATH.length
  const activeStep = currentPathStep(effectivePathIndex)
  const upcomingSteps = LEARNING_PATH.slice(effectivePathIndex + 1, effectivePathIndex + 3)

  // Only Full Mock Test results count toward the best score — Mini Mock Test is too short (fewer
  // questions) to be a reliable measure. Older results saved before this field existed default to
  // counting, so past scores aren't silently dropped.
  const bestMockScore = mockResults.filter((r) => r.type !== 'mini').reduce((best, r) => Math.max(best, r.totalScore), 0)
  const currentScore = Math.max(levelTestResult?.totalScore ?? 0, bestMockScore)
  const goalPercent = Math.min(100, Math.round((currentScore / GOAL_SCORE) * 100))

  const isMissionToday = dailyMissionDate === todayKey()
  const wordsToday = isMissionToday ? dailyWordsReviewed : 0
  const questionsToday = isMissionToday ? dailyQuestionsAnswered : 0
  const mockToday = mockResults.filter((r) => r.date.slice(0, 10) === todayKey()).length
  const missions = [
    { label: 'ทบทวนคำศัพท์ 20 คำ', current: wordsToday, target: 20 },
    { label: 'ตอบคำถามฝึกฝน 10 ข้อ', current: questionsToday, target: 10 },
    { label: 'ทำ Mock Test อย่างน้อย 1 ครั้ง', current: mockToday, target: 1 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">
          สวัสดี{displayName ? `, ${displayName}` : ''}! 👋
        </h1>
        <p className="text-stone-500 mt-1">ก้าวเล็กๆ ในทุกวัน นำไปสู่ผลลัพธ์ที่ยิ่งใหญ่</p>
      </div>

      {levelTestResult ? (
        <Card className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-xl font-extrabold text-lg"
              style={{ backgroundColor: scoreToCefr(levelTestResult.totalScore).bgColor, color: scoreToCefr(levelTestResult.totalScore).color }}
            >
              {levelTestResult.cefr}
            </span>
            <div>
              <p className="font-semibold text-stone-800">ระดับภาษาของคุณ: {scoreToCefr(levelTestResult.totalScore).nameTh}</p>
              <p className="text-sm text-stone-500">คะแนนโดยประมาณ {levelTestResult.totalScore}/990</p>
            </div>
          </div>
          <Link to="/level-test">
            <Button variant="secondary">ทดสอบอีกครั้ง</Button>
          </Link>
        </Card>
      ) : (
        <Card className="flex items-center justify-between flex-wrap gap-3 bg-brand-50 border-brand-200">
          <div>
            <p className="font-semibold text-stone-800">ยังไม่รู้ระดับภาษาของตัวเอง?</p>
            <p className="text-sm text-stone-500">ลองทำแบบทดสอบวัดระดับตามมาตรฐาน CEFR (A1–C1) ใช้เวลาประมาณ 25 นาที</p>
          </div>
          <Link to="/level-test">
            <Button>วัดระดับตอนนี้</Button>
          </Link>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <StreakCalendar streak={streak} />
        <GoalRing percent={goalPercent} currentScore={currentScore} />
      </div>

      <Card>
        <h2 className="font-semibold text-stone-800 mb-3">🎯 ภารกิจวันนี้</h2>
        <div className="space-y-2.5">
          {missions.map((m) => {
            const done = m.current >= m.target
            return (
              <div key={m.label} className="flex items-center gap-3">
                {done ? <CheckCircle2 className="text-emerald-600 shrink-0" size={20} /> : <Circle className="text-sand-300 shrink-0" size={20} />}
                <span className={`flex-1 text-sm ${done ? 'text-stone-400 line-through' : 'text-stone-700'}`}>{m.label}</span>
                <span className="text-xs text-stone-400 shrink-0">{Math.min(m.current, m.target)}/{m.target}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {dueCount > 0 && (
        <Card className="flex items-center justify-between flex-wrap gap-3 bg-brand-50 border-brand-200">
          <div>
            <p className="font-semibold text-stone-800">มีคำศัพท์ {dueCount} คำถึงเวลาทบทวนแล้ว</p>
            <p className="text-sm text-stone-500">ทบทวนตอนนี้เพื่อไม่ให้ลืม (Spaced Repetition)</p>
          </div>
          <Link to="/vocabulary">
            <Button>ไปทบทวนเลย</Button>
          </Link>
        </Card>
      )}

      <Card className="space-y-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-gradient-to-br from-brand-100 to-brand-300 opacity-40" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-stone-800">🧭 เรียนต่อจากที่ค้างไว้</h2>
            <p className="text-sm text-stone-500 mt-1">
              เรียนไปทีละขั้นตามลำดับ ไม่ต้องเดาว่าควรเริ่มตรงไหน — ทำแบบทดสอบท้ายขั้นให้ผ่าน 70% ขึ้นไปเพื่อปลดล็อกขั้นถัดไป
            </p>
          </div>
          <Link to="/study-plan" className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0 whitespace-nowrap">
            ดูแผนทั้งหมด →
          </Link>
        </div>

        {pathDone ? (
          <div className="relative rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center">
            <p className="font-semibold text-emerald-700">🎉 คุณเรียนครบทุกขั้นตอนในเส้นทางแล้ว!</p>
            <p className="text-sm text-stone-500 mt-1">ลองฝึก Full Mock Test เพื่อประเมินความพร้อมก่อนสอบจริง</p>
            <Link to="/mock-test" className="inline-block mt-3">
              <Button variant="secondary">ไปที่ Mock Test</Button>
            </Link>
          </div>
        ) : (
          <div className="relative space-y-4">
            <div>
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>ความคืบหน้าเส้นทาง</span>
                <span>ขั้นที่ {effectivePathIndex + 1}/{LEARNING_PATH.length}</span>
              </div>
              <ProgressBar value={effectivePathIndex} max={LEARNING_PATH.length} />
            </div>

            <Link to={activeStep.to}>
              <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 hover:shadow-sm hover:border-brand-400 transition">
                <p className="text-xs text-brand-600 font-semibold">ขั้นตอนปัจจุบันของคุณ</p>
                <p className="font-semibold text-stone-800 mt-0.5">
                  {TYPE_ICON[activeStep.type]} {activeStep.labelTh}
                </p>
              </div>
            </Link>
            <Link to={activeStep.to}>
              <Button className="w-full">เรียนต่อ →</Button>
            </Link>

            {upcomingSteps.length > 0 && (
              <div>
                <p className="text-xs text-stone-400 mb-2">ขั้นถัดไป (ปลดล็อกเมื่อผ่านขั้นปัจจุบัน)</p>
                <div className="space-y-1.5">
                  {upcomingSteps.map((step) => (
                    <div key={`${step.type}:${step.id}`} className="flex items-center gap-2 text-sm text-stone-400">
                      <span>🔒</span>
                      <span>{TYPE_ICON[step.type]} {step.labelTh}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      <Link to="/progress" className="block text-center text-sm font-semibold text-brand-600 hover:text-brand-700">
        ดูสถิติทักษะและคะแนน Mock Test ทั้งหมดที่หน้าความก้าวหน้า →
      </Link>
    </div>
  )
}
