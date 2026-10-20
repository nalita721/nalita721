import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Check,
  ClipboardCheck,
  FileText,
  Headphones,
  Lock,
  PenLine,
  Route as RouteIcon,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { Button, Card, ProgressBar } from '../components/ui'
import { useProgressStore } from '../store/progress'
import { CEFR_LEVELS } from '../data/cefr'
import {
  LEARNING_PATH,
  PASS_THRESHOLD,
  PATH_UNITS,
  TYPE_ICON,
  getEffectivePathIndex,
  pathStepKey,
  type PathStepType,
} from '../data/learningPath'
import { currentLessonEntry, pathLessonEntries, type PathLessonEntry } from '../data/pathLessons'
import { LESSON_XP } from '../lib/miniLesson'
import { playClickSound, playCompleteSound, playLockedSound } from '../lib/sound'
import { PathMascot, TreasureChest, type ChestState, type MascotProp } from '../components/PathArt'
import { UNIT_THEME } from '../data/pathTheme'

const STEP_ICON: Record<PathStepType, LucideIcon> = {
  vocabulary: BookOpen,
  grammar: PenLine,
  listening: Headphones,
  reading: FileText,
  checkpoint: Trophy,
}

const STEP_KIND: Record<PathStepType, string> = {
  vocabulary: 'คำศัพท์',
  grammar: 'ไวยากรณ์',
  listening: 'ฝึกฟัง',
  reading: 'ฝึกอ่าน',
  checkpoint: 'ฝึกสอบ TOEIC',
}


/** Two mascots per unit, each holding a prop that fits the unit's theme. */
const UNIT_MASCOTS: MascotProp[][] = [
  ['suitcase', 'headphones'],
  ['book', 'cheer'],
  ['briefcase', 'headphones'],
  ['trophy', 'cheer'],
]

const CHEST_XP = 20

const dot = 'inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full text-white'

const LEGEND = [
  { label: 'ผ่านแล้ว', swatch: <span className={`${dot} bg-amber-400`}><Check size={12} strokeWidth={3} /></span> },
  { label: 'ด่านปัจจุบัน', swatch: <span className={`${dot} bg-sky-500 ring-4 ring-sky-200`} /> },
  { label: 'ยังล็อก', swatch: <span className={`${dot} bg-stone-200 text-stone-400`}><Lock size={11} strokeWidth={3} /></span> },
  { label: 'ทดสอบท้ายบท', swatch: <span className={`${dot} bg-sky-500`}><ClipboardCheck size={11} strokeWidth={3} /></span> },
  { label: 'ฝึกสอบท้ายหน่วย', swatch: <span className={`${dot} bg-sky-500`}><Trophy size={11} strokeWidth={3} /></span> },
  { label: 'หีบสมบัติ +20 XP', swatch: <TreasureChest state="ready" size={22} /> },
]

/** Horizontal offsets (px) that make the nodes wind left and right like a trail. */
const ZIGZAG = [0, 44, 72, 44, 0, -44, -72, -44]

export default function StudyPlanPage() {
  const navigate = useNavigate()
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const passedLessons = useProgressStore((s) => s.passedLessons)
  const lessonResume = useProgressStore((s) => s.lessonResume)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)
  const claimedChests = useProgressStore((s) => s.claimedChests)
  const claimChest = useProgressStore((s) => s.claimChest)
  const dailyGoal = useProgressStore((s) => s.dailyGoal)
  const dailyLessons = useProgressStore((s) => s.dailyLessons)
  const dailyLessonsDate = useProgressStore((s) => s.dailyLessonsDate)
  const [reward, setReward] = useState<string | null>(null)
  const [openKey, setOpenKey] = useState<string | null>(null)
  const currentRef = useRef<HTMLDivElement>(null)

  const effectivePathIndex = getEffectivePathIndex(pathUnlockedIndex, levelTestResult?.cefr)
  const entries = pathLessonEntries(pathPassedSteps, passedLessons, effectivePathIndex)
  const current = currentLessonEntry(entries, effectivePathIndex)
  const pathDone = !current
  const passedCount = entries.filter((e) => e.status === 'passed').length
  const today = dailyLessonsDate === new Date().toISOString().slice(0, 10) ? dailyLessons : 0

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  function handleTap(key: string, locked: boolean) {
    if (locked) playLockedSound()
    else playClickSound()
    setOpenKey((cur) => (cur === key ? null : key))
  }

  function tapChest(key: string, state: ChestState) {
    if (state === 'ready') {
      claimChest(key, CHEST_XP)
      playCompleteSound()
      setReward(key)
      setTimeout(() => setReward((cur) => (cur === key ? null : cur)), 1800)
      setOpenKey(null)
      return
    }
    if (state === 'locked') playLockedSound()
    else playClickSound()
    setOpenKey((cur) => (cur === key ? null : key))
  }

  function start(e: PathLessonEntry) {
    playClickSound()
    navigate(e.node.to)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto" onClick={() => setOpenKey(null)}>
      <div>
        <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <RouteIcon size={24} className="text-brand-600" />
          แผนการเรียน
        </h1>
        <p className="text-stone-500 mt-1">
          แต่ละบทแบ่งเป็นด่านย่อยสั้นๆ ด่านละ 3–5 นาที แล้วปิดบทด้วยแบบทดสอบ ต้องได้ {Math.round(PASS_THRESHOLD * 100)}% ขึ้นไปถึงจะไปบทถัดไปได้
          และจบแต่ละหน่วยด้วยการฝึกสอบ TOEIC 🏆
        </p>
      </div>

      <Card className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-stone-500 mb-1">
            <span>ความคืบหน้ารวม</span>
            <span>
              ผ่านแล้ว {passedCount}/{entries.length} ด่านย่อย
            </span>
          </div>
          <ProgressBar value={passedCount} max={entries.length} />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm">
          <span className="font-semibold text-emerald-800">🎯 เป้าหมายวันนี้</span>
          <span className="font-bold text-emerald-700">
            {Math.min(today, dailyGoal)}/{dailyGoal} ด่าน {today >= dailyGoal ? '🔥' : ''}
          </span>
        </div>
        {pathDone && <p className="text-sm font-medium text-emerald-700">🎉 คุณเรียนครบทุกด่านในเส้นทางแล้ว!</p>}
      </Card>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-stone-600" aria-label="คำอธิบายสัญลักษณ์">
        {LEGEND.map(({ swatch, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            {swatch}
            {label}
          </span>
        ))}
      </div>

      {PATH_UNITS.map((unit, unitIdx) => {
        const theme = UNIT_THEME[unitIdx % UNIT_THEME.length]
        const level = CEFR_LEVELS.find((l) => l.code === unit.cefrLevel)!
        const stepIndexes = unit.steps.map(({ index }) => index)
        const unitEntries = entries.filter((e) => stepIndexes.includes(e.index))
        const unitPassed = unitEntries.filter((e) => e.status === 'passed').length
        const chestAt = Math.floor(unit.steps.length / 2)
        const chestStep = unit.steps[chestAt].index
        const chestKey = `chest:${unit.cefrLevel}`
        const beforeChest = unit.steps[chestAt - 1].step
        const chestState: ChestState = claimedChests.includes(chestKey)
          ? 'opened'
          : pathPassedSteps.includes(pathStepKey(beforeChest.type, beforeChest.id))
            ? 'ready'
            : 'locked'
        const mascotSteps = [unit.steps[1]?.index, unit.steps[chestAt + 1]?.index]
        const offsetOf = (pos: number) => ZIGZAG[pos % ZIGZAG.length]
        const chestOpen = openKey === chestKey
        let pos = 0

        return (
          <section key={unit.cefrLevel} className="space-y-6">
            <div className={`sticky top-2 z-20 rounded-2xl ${theme.banner} text-white px-5 py-3 shadow-md`}>
              <p className="text-xs font-semibold opacity-80">
                หน่วยที่ {unitIdx + 1} • ระดับ {unitIdx === 0 ? 'A1–A2' : level.code}
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{level.nameTh} ({level.name})</p>
                <span className="text-xs font-semibold bg-white/20 rounded-full px-2.5 py-0.5 shrink-0">
                  {unitPassed}/{unitEntries.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 py-2">
              {unitEntries.map((e) => {
                const { step, node } = e
                const key = node.key
                const passed = e.status === 'passed'
                const locked = e.status === 'locked'
                const isCurrent = current?.node.key === key
                const isCheckpoint = step.type === 'checkpoint'
                const isTest = node.kind === 'test' && !isCheckpoint
                const BaseIcon = isCheckpoint ? Trophy : isTest && step.type !== 'reading' ? ClipboardCheck : STEP_ICON[step.type]
                const Icon = locked ? Lock : passed && !isCheckpoint ? Check : BaseIcon
                const open = openKey === key
                const size = isCheckpoint ? 'w-20 h-20' : isTest ? 'w-16 h-16' : 'w-14 h-14'
                const showChest = e.index === chestStep && e.n === 0
                if (showChest) pos += 1
                const myPos = pos++
                const mascotIdx = e.n === 0 ? mascotSteps.indexOf(e.index) : -1
                const resuming = lessonResume[key] !== undefined && !passed

                return (
                  <Fragment key={key}>
                    {showChest && (
                      <div
                        className={`relative flex flex-col items-center ${chestOpen ? 'z-30' : ''}`}
                        style={{ transform: `translateX(${offsetOf(myPos - 1)}px)` }}
                      >
                        {reward === chestKey && (
                          <span className="absolute -top-8 text-sm font-extrabold text-amber-500 animate-bounce">+{CHEST_XP} XP</span>
                        )}
                        <button
                          type="button"
                          aria-label="หีบสมบัติ"
                          onClick={(ev) => {
                            ev.stopPropagation()
                            tapChest(chestKey, chestState)
                          }}
                          className={`transition active:translate-y-1 ${chestState === 'ready' ? 'animate-wiggle' : ''}`}
                        >
                          <TreasureChest state={chestState} />
                        </button>
                        {chestOpen && (
                          <div
                            onClick={(ev) => ev.stopPropagation()}
                            className={`absolute top-full mt-3 z-30 w-64 rounded-2xl p-4 text-white shadow-xl ${
                              chestState === 'locked' ? 'bg-stone-500' : 'bg-amber-500'
                            }`}
                          >
                            <p className="font-bold">หีบสมบัติ</p>
                            <p className="text-sm mt-1 opacity-90">
                              {chestState === 'locked'
                                ? `ผ่านบทก่อนหน้าหีบให้ครบ แล้วกดเปิดรับ +${CHEST_XP} XP`
                                : `เปิดแล้ว ได้รับ +${CHEST_XP} XP`}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {e.n === 0 && e.count > 1 && (
                      <p
                        className={`-mb-3 max-w-[16rem] truncate rounded-full px-3 py-1 text-xs font-bold ${
                          e.index <= effectivePathIndex ? `bg-white border-2 border-sand-200 ${theme.text}` : 'bg-sand-100 text-stone-400'
                        }`}
                        style={{ transform: `translateX(${offsetOf(myPos)}px)` }}
                      >
                        {TYPE_ICON[step.type]} {step.labelTh}
                      </p>
                    )}
                    <div
                      ref={isCurrent ? currentRef : undefined}
                      className={`relative flex flex-col items-center ${open ? 'z-30' : ''}`}
                      style={{ transform: `translateX(${offsetOf(myPos)}px)` }}
                    >
                      {mascotIdx !== -1 && (
                        <div
                          className="pointer-events-none absolute top-1/2 animate-bob"
                          style={{
                            // stand on the side of the trail away from the bend
                            [offsetOf(myPos) > 0 ? 'right' : 'left']: '100%',
                            marginTop: -56,
                            [offsetOf(myPos) > 0 ? 'marginRight' : 'marginLeft']: 20,
                          }}
                        >
                          <PathMascot color={theme.hex} prop={UNIT_MASCOTS[unitIdx % UNIT_MASCOTS.length][mascotIdx]} />
                        </div>
                      )}
                      {isCurrent && !open && (
                        <span
                          className={`absolute -top-9 z-10 whitespace-nowrap rounded-xl bg-white border-2 border-sand-200 px-3 py-1 text-xs font-bold ${theme.text} animate-bounce`}
                        >
                          {resuming ? 'เรียนต่อ' : 'เริ่มตรงนี้'}
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label={`${step.labelTh} · ${node.titleTh}`}
                        onClick={(ev) => {
                          ev.stopPropagation()
                          handleTap(key, locked)
                        }}
                        className={`${size} rounded-full flex items-center justify-center transition active:translate-y-1 active:shadow-none ${
                          locked
                            ? 'bg-stone-200 text-stone-400 shadow-[0_6px_0] shadow-stone-300'
                            : passed && !isCheckpoint
                              ? 'bg-amber-400 text-white shadow-[0_6px_0] shadow-amber-600'
                              : `${theme.node} text-white shadow-[0_6px_0]`
                        } ${isCurrent ? `ring-8 ${theme.ring}` : ''}`}
                      >
                        <Icon size={isCheckpoint ? 34 : isTest ? 28 : 24} strokeWidth={2.5} />
                      </button>

                      {open && (
                        <div
                          onClick={(ev) => ev.stopPropagation()}
                          className={`absolute top-full mt-4 z-30 w-72 rounded-2xl p-4 text-white shadow-xl ${
                            locked ? 'bg-stone-500' : theme.popup
                          }`}
                        >
                          <p className="text-xs font-semibold opacity-80">
                            {STEP_KIND[step.type]} • {e.count > 1 ? `ด่านย่อย ${e.n + 1}/${e.count}` : `ด่านที่ ${e.index + 1}/${LEARNING_PATH.length}`}
                          </p>
                          <p className="font-bold mt-0.5">{e.count > 1 ? node.titleTh : step.labelTh}</p>
                          {e.count > 1 && <p className="text-xs opacity-80">{step.labelTh}</p>}
                          <p className="mt-1 text-xs font-semibold opacity-90">⏱ ประมาณ {node.minutes} นาที</p>
                          {locked ? (
                            <p className="text-sm mt-2 opacity-90">ผ่านด่านก่อนหน้าให้ได้ก่อน แล้วด่านนี้จะปลดล็อก</p>
                          ) : (
                            <>
                              <p className="text-sm mt-1 opacity-90">
                                {isCheckpoint
                                  ? 'ข้อสอบแนว TOEIC Listening + Reading จากเนื้อหาทั้งหน่วย'
                                  : node.kind === 'learn'
                                    ? step.type === 'vocabulary'
                                      ? 'เรียนคำศัพท์ชุดสั้นๆ แล้วตอบคำถามท้ายด่าน'
                                      : 'เรียนทีละจุด พร้อมคำถามเช็กความเข้าใจ'
                                    : `ต้องได้ ${Math.round(PASS_THRESHOLD * 100)}% ขึ้นไปถึงจะผ่าน`}
                              </p>
                              <button
                                type="button"
                                onClick={() => start(e)}
                                className={`mt-3 w-full rounded-xl bg-white py-2.5 text-sm font-bold ${theme.text} shadow-[0_4px_0] shadow-black/20 active:translate-y-0.5 active:shadow-none`}
                              >
                                {passed
                                  ? 'ทบทวน'
                                  : resuming
                                    ? 'เรียนต่อจากที่ค้างไว้'
                                    : isCheckpoint
                                      ? 'เริ่มสอบ +40 XP'
                                      : node.kind === 'learn'
                                        ? `เริ่ม +${LESSON_XP} XP`
                                        : 'เริ่มทดสอบ'}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </Fragment>
                )
              })}
            </div>

            {unitIdx < PATH_UNITS.length - 1 && (
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span className="flex-1 border-t border-sand-200" />
                ถัดไป: ระดับ {PATH_UNITS[unitIdx + 1].cefrLevel}
                <span className="flex-1 border-t border-sand-200" />
              </div>
            )}
          </section>
        )
      })}

      {current && (
        <Link to={current.node.to} className="block">
          <Button className="w-full">
            เรียนต่อ: {current.node.titleTh} · ≈ {current.node.minutes} นาที →
          </Button>
        </Link>
      )}
    </div>
  )
}
