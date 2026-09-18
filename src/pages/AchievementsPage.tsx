import { useState } from 'react'
import { Lock } from 'lucide-react'
import { ACHIEVEMENTS } from '../data/achievements'
import { useProgressStore } from '../store/progress'
import { Card } from '../components/ui'

type Filter = 'all' | 'unlocked' | 'locked'

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'unlocked', label: 'ปลดล็อกแล้ว' },
  { key: 'locked', label: 'ยังไม่ปลดล็อก' },
]

export default function AchievementsPage() {
  const progress = useProgressStore((s) => s)
  const [filter, setFilter] = useState<Filter>('all')

  const unlockedFlags = ACHIEVEMENTS.map((a) => a.isUnlocked(progress))
  const unlockedCount = unlockedFlags.filter(Boolean).length

  const visible = ACHIEVEMENTS.filter((_, i) => {
    if (filter === 'unlocked') return unlockedFlags[i]
    if (filter === 'locked') return !unlockedFlags[i]
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🏅 เหรียญรางวัล</h1>
        <p className="text-stone-500 mt-1">
          ปลดล็อกแล้ว {unlockedCount}/{ACHIEVEMENTS.length} เหรียญ — ฝึกฝนต่อเนื่องเพื่อสะสมให้ครบ
        </p>
      </div>

      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === tab.key ? 'bg-brand-600 text-white' : 'bg-white border border-sand-200 text-stone-600 hover:border-brand-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((achievement) => {
          const unlocked = achievement.isUnlocked(progress)
          const Icon = achievement.icon
          return (
            <Card
              key={achievement.id}
              className={`flex items-center gap-4 ${unlocked ? '' : 'opacity-60 grayscale'}`}
            >
              <span
                className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 ${
                  unlocked ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' : 'bg-sand-100 text-stone-400'
                }`}
              >
                {unlocked ? <Icon size={26} /> : <Lock size={22} />}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-stone-800">{achievement.titleTh}</p>
                <p className="text-xs text-stone-500 mt-0.5">{achievement.descriptionTh}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
