import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Check, ChevronRight, Flame, Route as RouteIcon, Star, Target, Trophy } from 'lucide-react'
import { allWords } from '../data/vocabulary'
import { Card, ProgressBar } from '../components/ui'
import { PathMascot } from '../components/PathArt'
import { ProgressOverview } from '../components/ProgressOverview'
import { useProgressStore } from '../store/progress'
import { useAuthStore } from '../store/auth'
import { isDue } from '../lib/srs'
import { CEFR_LEVELS, scoreToCefr } from '../data/cefr'
import { levelProgressForXp } from '../data/levelTitles'
import { UNIT_THEME } from '../data/pathTheme'
import {
  LEARNING_PATH,
  PATH_UNITS,
  TYPE_ICON,
  currentPathStep,
  getEffectivePathIndex,
  pathStepKey,
} from '../data/learningPath'
import { currentLessonEntry, pathLessonEntries } from '../data/pathLessons'
import { DAILY_GOAL_OPTIONS } from '../lib/miniLesson'

const THAI_DAY_ABBR = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function StatTile({ icon, value, label, to, tone }: { icon: ReactNode; value: ReactNode; label: string; to?: string; tone: string }) {
  const body = (
    <div className="flex h-full items-center gap-3 rounded-2xl border border-sand-200 bg-white px-4 py-3 transition hover:shadow-sm">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-lg font-extrabold leading-tight text-stone-800">{value}</p>
        <p className="truncate text-xs text-stone-500">{label}</p>
      </div>
    </div>
  )
  return to ? <Link to={to}>{body}</Link> : body
}

function WeekStreak({ streak }: { streak: number }) {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d
  })
  const activeFromIndex = 7 - Math.min(streak, 7)

  return (
    <div className="flex justify-between">
      {days.map((d, i) => {
        const active = i >= activeFromIndex
        const isToday = i === 6
        return (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span className={`text-[10px] ${isToday ? 'font-bold text-stone-700' : 'text-stone-400'}`}>
              {THAI_DAY_ABBR[d.getDay()]}
            </span>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                active ? 'bg-orange-500 text-white' : 'bg-sand-100 text-stone-400'
              } ${isToday ? 'ring-2 ring-orange-300 ring-offset-2 ring-offset-white' : ''}`}
            >
              {active ? <Flame size={14} /> : d.getDate()}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function DashboardPage() {
  const { hash } = useLocation()
  // the old /progress page now lives here as a section; follow #progress links to it
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])
  const email = useAuthStore((s) => s.email)
  const authStatus = useAuthStore((s) => s.status)
  const xp = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)
  const srsMap = useProgressStore((s) => s.srsMap)
  const mockResults = useProgressStore((s) => s.mockResults)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const dailyMissionDate = useProgressStore((s) => s.dailyMissionDate)
  const dailyWordsReviewed = useProgressStore((s) => s.dailyWordsReviewed)
  const dailyQuestionsAnswered = useProgressStore((s) => s.dailyQuestionsAnswered)
  const passedLessons = useProgressStore((s) => s.passedLessons)
  const dailyGoal = useProgressStore((s) => s.dailyGoal)
  const dailyLessons = useProgressStore((s) => s.dailyLessons)
  const dailyLessonsDate = useProgressStore((s) => s.dailyLessonsDate)
  const setDailyGoal = useProgressStore((s) => s.setDailyGoal)

  const isMember = authStatus === 'authenticated'
  const displayName = email ? email.split('@')[0] : null

  // Only words the learner has already studied can be due; never-seen words aren't reviews.
  const dueCount = allWords().filter((w) => srsMap[w.id] && isDue(srsMap[w.id])).length

  const effectivePathIndex = getEffectivePathIndex(pathUnlockedIndex, levelTestResult?.cefr)
  const pathDone = effectivePathIndex >= LEARNING_PATH.length
  const lessonEntries = pathLessonEntries(pathPassedSteps, passedLessons, effectivePathIndex)
  const currentLesson = currentLessonEntry(lessonEntries, effectivePathIndex)
  const activeStep = currentLesson?.step ?? currentPathStep(effectivePathIndex)
  const passedCount = LEARNING_PATH.filter((s) => pathPassedSteps.includes(pathStepKey(s.type, s.id))).length

  const activeIndex = Math.min(effectivePathIndex, LEARNING_PATH.length - 1)
  const unitIdx = Math.max(0, PATH_UNITS.findIndex((u) => u.steps.some(({ index }) => index === activeIndex)))
  const unit = PATH_UNITS[unitIdx]
  const theme = UNIT_THEME[unitIdx % UNIT_THEME.length]
  const unitLevel = CEFR_LEVELS.find((l) => l.code === unit.cefrLevel)!
  const unitPassed = unit.steps.filter(({ step }) => pathPassedSteps.includes(pathStepKey(step.type, step.id))).length

  // Only Full Mock Test results count toward the best score — Mini Mock Test is too short (fewer
  // questions) to be a reliable measure. Older results saved before this field existed default to
  // counting, so past scores aren't silently dropped.
  const bestMockScore = mockResults.filter((r) => r.type !== 'mini').reduce((best, r) => Math.max(best, r.totalScore), 0)
  const currentScore = Math.max(levelTestResult?.totalScore ?? 0, bestMockScore)

  const { title: xpTitle } = levelProgressForXp(xp)

  const isMissionToday = dailyMissionDate === todayKey()
  const wordsToday = isMissionToday ? dailyWordsReviewed : 0
  const questionsToday = isMissionToday ? dailyQuestionsAnswered : 0
  const mockToday = mockResults.filter((r) => r.date.slice(0, 10) === todayKey()).length
  const lessonsToday = dailyLessonsDate === todayKey() ? dailyLessons : 0
  const missions = [
    { emoji: '🧩', label: 'เรียนด่านย่อย', current: lessonsToday, target: dailyGoal, unit: 'ด่าน' },
    { emoji: '📚', label: 'ทบทวนคำศัพท์', current: wordsToday, target: 20, unit: 'คำ' },
    { emoji: '✍️', label: 'ตอบคำถามฝึกฝน', current: questionsToday, target: 10, unit: 'ข้อ' },
    { emoji: '🏆', label: 'ทำ Mock Test', current: mockToday, target: 1, unit: 'ครั้ง' },
  ]
  const missionsDone = missions.filter((m) => m.current >= m.target).length

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Hero: where to continue */}
      <section
        className="relative overflow-hidden rounded-3xl px-6 py-6 text-white shadow-md sm:px-8"
        style={{ background: `linear-gradient(135deg, ${theme.hex}, ${theme.hex}cc)` }}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-5">
          <div className="hidden shrink-0 animate-bob sm:block">
            <PathMascot color="#ffffff" prop={pathDone ? 'trophy' : 'cheer'} size={110} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold opacity-90">สวัสดี{displayName ? `, ${displayName}` : ''}! 👋</p>
            {pathDone ? (
              <>
                <h1 className="mt-1 text-2xl font-extrabold">เรียนครบทุกด่านแล้ว 🎉</h1>
                <p className="mt-1 text-sm opacity-90">ฝึก Full Mock Test เพื่อเช็กความพร้อมก่อนสอบจริง</p>
              </>
            ) : isMember ? (
              <>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-80">
                  หน่วยที่ {unitIdx + 1} • {unitLevel.nameTh} • ด่านที่ {effectivePathIndex + 1}/{LEARNING_PATH.length}
                </p>
                <h1 className="mt-0.5 text-xl font-extrabold sm:text-2xl">
                  {TYPE_ICON[activeStep.type]} {activeStep.labelTh}
                </h1>
                {currentLesson && currentLesson.count > 1 && (
                  <p className="mt-1 text-sm font-semibold opacity-90">
                    ด่านย่อย {currentLesson.n + 1}/{currentLesson.count}: {currentLesson.node.titleTh} · ⏱ ≈ {currentLesson.node.minutes} นาที
                  </p>
                )}
                <div className="mt-3 max-w-sm">
                  <div className="mb-1 flex justify-between text-xs opacity-90">
                    <span>ความคืบหน้าหน่วยนี้</span>
                    <span>
                      {unitPassed}/{unit.steps.length}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/25">
                    <div className="h-full rounded-full bg-white" style={{ width: `${(unitPassed / unit.steps.length) * 100}%` }} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="mt-1 text-2xl font-extrabold">เริ่มเรียน TOEIC ทีละด่าน</h1>
                <p className="mt-1 text-sm opacity-90">ลองบทที่ 1 ได้ฟรี สมัครสมาชิกเพื่อปลดล็อกแผนการเรียน {LEARNING_PATH.length} ด่าน</p>
              </>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={pathDone ? '/mock-test' : isMember ? (currentLesson?.node.to ?? activeStep.to) : '/vocabulary/travel'}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-extrabold shadow-[0_5px_0] shadow-black/20 transition active:translate-y-1 active:shadow-none"
                style={{ color: theme.hex }}
              >
                {pathDone ? 'ไปที่ Mock Test' : isMember ? 'เรียนต่อ →' : 'ลองบทที่ 1 ฟรี →'}
              </Link>
              <Link
                to={isMember ? '/study-plan' : '/login'}
                className="rounded-2xl border-2 border-white/60 px-5 py-2.5 text-sm font-bold transition hover:bg-white/10"
              >
                {isMember ? 'ดูแผนการเรียน' : 'สมัครสมาชิกฟรี'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={<Flame size={20} />} tone="bg-orange-100 text-orange-600" value={`${streak} วัน`} label="Streak ต่อเนื่อง" />
        <StatTile icon={<Star size={20} />} tone="bg-amber-100 text-amber-600" value={`${xp} XP`} label={xpTitle} to="/achievements" />
        {currentScore > 0 ? (
          <StatTile
            icon={<Target size={20} />}
            tone="bg-sky-100 text-sky-600"
            value={currentScore}
            label={`คะแนนโดยประมาณ • ${scoreToCefr(currentScore).code}`}
            to="/dashboard#progress"
          />
        ) : (
          <StatTile icon={<Target size={20} />} tone="bg-sky-100 text-sky-600" value="วัดระดับ" label="ใช้เวลา 25 นาที" to="/level-test" />
        )}
        <StatTile
          icon={<Trophy size={20} />}
          tone="bg-emerald-100 text-emerald-600"
          value={`${passedCount}/${LEARNING_PATH.length}`}
          label="ด่านที่ผ่านแล้ว"
          to="/study-plan"
        />
      </div>

      {dueCount > 0 && (
        <Link
          to={isMember ? '/games/flashcards' : '/vocabulary'}
          className="flex items-center gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3 transition hover:shadow-sm"
        >
          <span className="text-2xl">🔔</span>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-stone-800">มีคำศัพท์ {dueCount} คำถึงเวลาทบทวน</p>
            <p className="text-xs text-stone-500">ทบทวนตอนนี้ก่อนลืม (Spaced Repetition)</p>
          </div>
          <ChevronRight className="shrink-0 text-amber-500" />
        </Link>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-stone-800">🎯 ภารกิจวันนี้</h2>
            <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-semibold text-stone-600">
              สำเร็จ {missionsDone}/{missions.length}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span>เป้าหมายรายวัน:</span>
            {DAILY_GOAL_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setDailyGoal(g)}
                className={`rounded-full border-2 px-3 py-1 font-bold transition ${
                  dailyGoal === g ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-sand-200 text-stone-500 hover:border-emerald-300'
                }`}
              >
                {g} ด่าน/วัน
              </button>
            ))}
            <span className="text-stone-400">≈ {dailyGoal * 4} นาที</span>
          </div>
          <div className="space-y-4">
            {missions.map((m) => {
              const done = m.current >= m.target
              return (
                <div key={m.label} className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                      done ? 'bg-emerald-500 text-white' : 'bg-sand-100'
                    }`}
                  >
                    {done ? <Check size={20} strokeWidth={3} /> : m.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex justify-between gap-2 text-sm">
                      <span className={done ? 'text-stone-400' : 'font-medium text-stone-700'}>
                        {m.label} {m.target} {m.unit}
                      </span>
                      <span className="shrink-0 text-xs text-stone-400">
                        {Math.min(m.current, m.target)}/{m.target}
                      </span>
                    </div>
                    <ProgressBar value={Math.min(m.current, m.target)} max={m.target} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="mb-1 font-bold text-stone-800">🔥 สัปดาห์นี้</h2>
          <p className="mb-4 text-xs text-stone-500">
            {streak > 0 ? `เรียนต่อเนื่อง ${streak} วันแล้ว อย่าให้ไฟดับ!` : 'เริ่มเรียนวันนี้เพื่อจุดไฟ streak แรก'}
          </p>
          <WeekStreak streak={streak} />
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-bold text-stone-800">
            <RouteIcon size={18} className="text-brand-600" />
            เส้นทางสู่ TOEIC
          </h2>
          <Link to="/study-plan" className="shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700">
            ดูแผนทั้งหมด →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PATH_UNITS.map((u, i) => {
            const t = UNIT_THEME[i % UNIT_THEME.length]
            const passed = u.steps.filter(({ step }) => pathPassedSteps.includes(pathStepKey(step.type, step.id))).length
            const complete = passed === u.steps.length
            const current = isMember && !pathDone && i === unitIdx
            return (
              <div
                key={u.cefrLevel}
                className="rounded-2xl border-2 p-3"
                style={{ borderColor: current ? t.hex : undefined }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg px-2 py-0.5 text-xs font-extrabold text-white" style={{ backgroundColor: t.hex }}>
                    {i === 0 ? 'A1–A2' : u.cefrLevel}
                  </span>
                  {complete && <Check size={16} className="text-emerald-600" strokeWidth={3} />}
                  {current && <span className="text-[10px] font-bold" style={{ color: t.hex }}>กำลังเรียน</span>}
                </div>
                <p className="mt-2 text-sm font-bold text-stone-800">หน่วยที่ {i + 1}</p>
                <p className="mb-2 text-xs text-stone-500">
                  {passed}/{u.steps.length} ด่าน
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-sand-100">
                  <div className="h-full rounded-full" style={{ width: `${(passed / u.steps.length) * 100}%`, backgroundColor: t.hex }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <ProgressOverview />
    </div>
  )
}
