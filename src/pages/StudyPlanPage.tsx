import { Link } from 'react-router-dom'
import { CheckCircle2, Lock, Route as RouteIcon } from 'lucide-react'
import { Button, Card, ProgressBar } from '../components/ui'
import { useProgressStore } from '../store/progress'
import { CEFR_LEVELS } from '../data/cefr'
import { LEARNING_PATH, TYPE_ICON, getEffectivePathIndex, pathStepKey } from '../data/learningPath'

export default function StudyPlanPage() {
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelTestResult = useProgressStore((s) => s.levelTestResult)

  const effectivePathIndex = getEffectivePathIndex(pathUnlockedIndex, levelTestResult?.cefr)
  const pathDone = effectivePathIndex >= LEARNING_PATH.length

  const groups = CEFR_LEVELS.map((level) => ({
    level,
    steps: LEARNING_PATH.map((step, index) => ({ step, index })).filter(({ step }) => step.cefrLevel === level.code),
  })).filter((g) => g.steps.length > 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
          <RouteIcon size={24} className="text-brand-600" />
          แผนการเรียน
        </h1>
        <p className="text-stone-500 mt-1">
          เรียนไปทีละขั้นตามลำดับ จัดกลุ่มตามระดับ CEFR — ทำแบบทดสอบท้ายขั้นให้ผ่าน 70% ขึ้นไปเพื่อปลดล็อกขั้นถัดไป
        </p>
      </div>

      <Card>
        <div className="flex justify-between text-xs text-stone-500 mb-1">
          <span>ความคืบหน้ารวม</span>
          <span>{Math.min(effectivePathIndex, LEARNING_PATH.length)}/{LEARNING_PATH.length} ขั้น</span>
        </div>
        <ProgressBar value={effectivePathIndex} max={LEARNING_PATH.length} />
        {pathDone && (
          <p className="text-sm font-medium text-emerald-700 mt-3">🎉 คุณเรียนครบทุกขั้นตอนในเส้นทางแล้ว!</p>
        )}
      </Card>

      {groups.map(({ level, steps }) => (
        <Card key={level.code}>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm"
              style={{ backgroundColor: level.bgColor, color: level.color }}
            >
              {level.code}
            </span>
            <div>
              <p className="font-semibold text-stone-800">{level.nameTh}</p>
              <p className="text-xs text-stone-400">{level.name}</p>
            </div>
          </div>

          <div className="space-y-2">
            {steps.map(({ step, index }) => {
              const passed = pathPassedSteps.includes(pathStepKey(step.type, step.id))
              const isCurrent = !pathDone && index === effectivePathIndex
              const locked = index > effectivePathIndex

              return (
                <Link
                  key={`${step.type}:${step.id}`}
                  to={locked ? '#' : step.to}
                  onClick={(e) => locked && e.preventDefault()}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    isCurrent
                      ? 'border-brand-400 bg-brand-50 hover:shadow-sm'
                      : passed
                        ? 'border-emerald-200 bg-emerald-50/50 hover:shadow-sm'
                        : locked
                          ? 'border-sand-100 bg-sand-50/50 cursor-not-allowed'
                          : 'border-sand-100 hover:shadow-sm'
                  }`}
                >
                  {passed ? (
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                  ) : locked ? (
                    <Lock size={18} className="text-stone-300 shrink-0" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border-2 border-brand-500 shrink-0" />
                  )}
                  <span className={`flex-1 text-sm font-medium ${locked ? 'text-stone-400' : 'text-stone-800'}`}>
                    {TYPE_ICON[step.type]} {step.labelTh}
                  </span>
                  {isCurrent && <span className="text-xs font-semibold text-brand-600 shrink-0">กำลังเรียน</span>}
                </Link>
              )
            })}
          </div>
        </Card>
      ))}

      {!pathDone && (
        <Link to={LEARNING_PATH[Math.min(effectivePathIndex, LEARNING_PATH.length - 1)].to} className="block">
          <Button className="w-full">เรียนต่อจากที่ค้างไว้ →</Button>
        </Link>
      )}
    </div>
  )
}
