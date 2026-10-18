import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Check,
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
  getEffectivePathIndex,
  pathStepKey,
  type PathStep,
  type PathStepType,
} from '../data/learningPath'
import { playClickSound, playCompleteSound, playLockedSound } from '../lib/sound'
import { PathMascot, TreasureChest, type ChestState, type MascotProp } from '../components/PathArt'

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

const UNIT_THEME = [
  { hex: '#0ea5e9', banner: 'bg-sky-500', node: 'bg-sky-500 shadow-sky-700', ring: 'ring-sky-300', text: 'text-sky-600', popup: 'bg-sky-500' },
  { hex: '#ec4899', banner: 'bg-pink-500', node: 'bg-pink-500 shadow-pink-700', ring: 'ring-pink-300', text: 'text-pink-600', popup: 'bg-pink-500' },
  { hex: '#10b981', banner: 'bg-emerald-500', node: 'bg-emerald-500 shadow-emerald-700', ring: 'ring-emerald-300', text: 'text-emerald-600', popup: 'bg-emerald-500' },
  { hex: '#8b5cf6', banner: 'bg-violet-500', node: 'bg-violet-500 shadow-violet-700', ring: 'ring-violet-300', text: 'text-violet-600', popup: 'bg-violet-500' },
]

/** Two mascots per unit, each holding a prop that fits the unit's theme. */
const UNIT_MASCOTS: MascotProp[][] = [
  ['suitcase', 'headphones'],
  ['book', 'cheer'],
  ['briefcase', 'headphones'],
  ['trophy', 'cheer'],
]

const CHEST_XP = 20

/** Horizontal offsets (px) that make the nodes wind left and right like a trail. */
const ZIGZAG = [0, 44, 72, 44, 0, -44, -72, -44]

export default function StudyPlanPage() {
  const navigate = useNavigate()
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)
  const claimedChests = useProgressStore((s) => s.claimedChests)
  const claimChest = useProgressStore((s) => s.claimChest)
  const [reward, setReward] = useState<string | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const currentRef = useRef<HTMLDivElement>(null)

  const effectivePathIndex = getEffectivePathIndex(pathUnlockedIndex, levelTestResult?.cefr)
  const pathDone = effectivePathIndex >= LEARNING_PATH.length
  const passedCount = LEARNING_PATH.filter((s) => pathPassedSteps.includes(pathStepKey(s.type, s.id))).length

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  function handleTap(index: number, locked: boolean) {
    if (locked) playLockedSound()
    else playClickSound()
    setOpenIndex((cur) => (cur === index ? null : index))
  }

  /** Chests share the popup state with steps, using negative ids so they never clash with step indexes. */
  function tapChest(chestId: number, key: string, state: ChestState) {
    if (state === 'ready') {
      claimChest(key, CHEST_XP)
      playCompleteSound()
      setReward(key)
      setTimeout(() => setReward((cur) => (cur === key ? null : cur)), 1800)
      setOpenIndex(null)
      return
    }
    if (state === 'locked') playLockedSound()
    else playClickSound()
    setOpenIndex((cur) => (cur === chestId ? null : chestId))
  }

  function start(step: PathStep) {
    playClickSound()
    navigate(step.to)
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto" onClick={() => setOpenIndex(null)}>
      <div>
        <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <RouteIcon size={24} className="text-brand-600" />
          แผนการเรียน
        </h1>
        <p className="text-stone-500 mt-1">
          เดินตามเส้นทางทีละด่าน ทุกด่านมีแบบทดสอบ ต้องได้ {Math.round(PASS_THRESHOLD * 100)}% ขึ้นไปถึงจะไปด่านถัดไปได้
          และจบแต่ละหน่วยด้วยการฝึกสอบ TOEIC 🏆
        </p>
      </div>

      <Card>
        <div className="flex justify-between text-xs text-stone-500 mb-1">
          <span>ความคืบหน้ารวม</span>
          <span>
            ผ่านแล้ว {passedCount}/{LEARNING_PATH.length} ด่าน
          </span>
        </div>
        <ProgressBar value={passedCount} max={LEARNING_PATH.length} />
        {pathDone && <p className="text-sm font-medium text-emerald-700 mt-3">🎉 คุณเรียนครบทุกด่านในเส้นทางแล้ว!</p>}
      </Card>

      {PATH_UNITS.map((unit, unitIdx) => {
        const theme = UNIT_THEME[unitIdx % UNIT_THEME.length]
        const level = CEFR_LEVELS.find((l) => l.code === unit.cefrLevel)!
        const unitPassed = unit.steps.filter(({ step }) => pathPassedSteps.includes(pathStepKey(step.type, step.id))).length
        const chestAt = Math.floor(unit.steps.length / 2)
        const chestKey = `chest:${unit.cefrLevel}`
        const chestId = -(unitIdx + 1)
        const beforeChest = unit.steps[chestAt - 1].step
        const chestState: ChestState = claimedChests.includes(chestKey)
          ? 'opened'
          : pathPassedSteps.includes(pathStepKey(beforeChest.type, beforeChest.id))
            ? 'ready'
            : 'locked'
        const mascotAt = [1, chestAt + 1]
        const offsetOf = (pos: number) => ZIGZAG[pos % ZIGZAG.length]

        return (
          <section key={unit.cefrLevel} className="space-y-6">
            <div className={`sticky top-2 z-20 rounded-2xl ${theme.banner} text-white px-5 py-3 shadow-md`}>
              <p className="text-xs font-semibold opacity-80">
                หน่วยที่ {unitIdx + 1} • ระดับ {unitIdx === 0 ? 'A1–A2' : level.code}
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{level.nameTh} ({level.name})</p>
                <span className="text-xs font-semibold bg-white/20 rounded-full px-2.5 py-0.5 shrink-0">
                  {unitPassed}/{unit.steps.length}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-7 py-2">
              {unit.steps.map(({ step, index }, i) => {
                const passed = pathPassedSteps.includes(pathStepKey(step.type, step.id))
                const locked = index > effectivePathIndex
                const isCurrent = !pathDone && index === effectivePathIndex
                const isCheckpoint = step.type === 'checkpoint'
                const Icon = locked ? Lock : passed && !isCheckpoint ? Check : STEP_ICON[step.type]
                const open = openIndex === index
                const size = isCheckpoint ? 'w-20 h-20' : 'w-16 h-16'
                const pos = i >= chestAt ? i + 1 : i
                const mascotIdx = mascotAt.indexOf(i)
                const chestOpen = openIndex === chestId

                return (
                  <Fragment key={pathStepKey(step.type, step.id)}>
                    {i === chestAt && (
                      <div
                        className={`relative flex flex-col items-center ${chestOpen ? 'z-30' : ''}`}
                        style={{ transform: `translateX(${offsetOf(chestAt)}px)` }}
                      >
                        {reward === chestKey && (
                          <span className="absolute -top-8 text-sm font-extrabold text-amber-500 animate-bounce">+{CHEST_XP} XP</span>
                        )}
                        <button
                          type="button"
                          aria-label="หีบสมบัติ"
                          onClick={(e) => {
                            e.stopPropagation()
                            tapChest(chestId, chestKey, chestState)
                          }}
                          className={`transition active:translate-y-1 ${chestState === 'ready' ? 'animate-wiggle' : ''}`}
                        >
                          <TreasureChest state={chestState} />
                        </button>
                        {chestOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute top-full mt-3 z-30 w-64 rounded-2xl p-4 text-white shadow-xl ${
                              chestState === 'locked' ? 'bg-stone-500' : 'bg-amber-500'
                            }`}
                          >
                            <p className="font-bold">หีบสมบัติ</p>
                            <p className="text-sm mt-1 opacity-90">
                              {chestState === 'locked'
                                ? `ผ่านด่านก่อนหน้าหีบให้ครบ แล้วกดเปิดรับ +${CHEST_XP} XP`
                                : `เปิดแล้ว ได้รับ +${CHEST_XP} XP`}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      ref={isCurrent ? currentRef : undefined}
                      className={`relative flex flex-col items-center ${open ? 'z-30' : ''}`}
                      style={{ transform: `translateX(${offsetOf(pos)}px)` }}
                    >
                      {mascotIdx !== -1 && (
                        <div
                          className="pointer-events-none absolute top-1/2 animate-bob"
                          style={{
                            // stand on the side of the trail away from the bend
                            [offsetOf(pos) > 0 ? 'right' : 'left']: '100%',
                            marginTop: -56,
                            [offsetOf(pos) > 0 ? 'marginRight' : 'marginLeft']: 20,
                          }}
                        >
                          <PathMascot color={theme.hex} prop={UNIT_MASCOTS[unitIdx % UNIT_MASCOTS.length][mascotIdx]} />
                        </div>
                      )}
                      {isCurrent && !open && (
                        <span
                          className={`absolute -top-9 whitespace-nowrap rounded-xl bg-white border-2 border-sand-200 px-3 py-1 text-xs font-bold ${theme.text} animate-bounce`}
                        >
                          เริ่มตรงนี้
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label={step.labelTh}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTap(index, locked)
                        }}
                        className={`${size} rounded-full flex items-center justify-center transition active:translate-y-1 active:shadow-none ${
                          locked
                            ? 'bg-stone-200 text-stone-400 shadow-[0_6px_0] shadow-stone-300'
                            : passed && !isCheckpoint
                              ? 'bg-amber-400 text-white shadow-[0_6px_0] shadow-amber-600'
                              : `${theme.node} text-white shadow-[0_6px_0]`
                        } ${isCurrent ? `ring-8 ${theme.ring}` : ''}`}
                      >
                        <Icon size={isCheckpoint ? 34 : 28} strokeWidth={2.5} />
                      </button>

                      {open && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute top-full mt-4 z-30 w-72 rounded-2xl p-4 text-white shadow-xl ${
                            locked ? 'bg-stone-500' : theme.popup
                          }`}
                        >
                          <p className="text-xs font-semibold opacity-80">
                            {STEP_KIND[step.type]} • ด่านที่ {index + 1}/{LEARNING_PATH.length}
                          </p>
                          <p className="font-bold mt-0.5">{step.labelTh}</p>
                          {locked ? (
                            <p className="text-sm mt-2 opacity-90">ผ่านด่านก่อนหน้าให้ได้ก่อน แล้วด่านนี้จะปลดล็อก</p>
                          ) : (
                            <>
                              <p className="text-sm mt-1 opacity-90">
                                {isCheckpoint
                                  ? 'ข้อสอบแนว TOEIC Listening + Reading จากเนื้อหาทั้งหน่วย'
                                  : `เรียนแล้วทำแบบทดสอบให้ได้ ${Math.round(PASS_THRESHOLD * 100)}% ขึ้นไป`}
                              </p>
                              <button
                                type="button"
                                onClick={() => start(step)}
                                className={`mt-3 w-full rounded-xl bg-white py-2.5 text-sm font-bold ${theme.text} shadow-[0_4px_0] shadow-black/20 active:translate-y-0.5 active:shadow-none`}
                              >
                                {passed ? 'ทบทวน' : isCheckpoint ? 'เริ่มสอบ +40 XP' : 'เริ่ม'}
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

      {!pathDone && (
        <Link to={LEARNING_PATH[Math.min(effectivePathIndex, LEARNING_PATH.length - 1)].to} className="block">
          <Button className="w-full">เรียนต่อจากที่ค้างไว้ →</Button>
        </Link>
      )}
    </div>
  )
}
