import { Link } from 'react-router-dom'
import { Award, BookOpen, Route as RouteIcon, Settings, Star } from 'lucide-react'
import { Button, Card, ProgressBar } from '../components/ui'
import { useAuthStore } from '../store/auth'
import { useProgressStore } from '../store/progress'
import { levelProgressForXp } from '../data/levelTitles'

const QUICK_LINKS = [
  { to: '/study-plan', label: 'แผนการเรียน', icon: RouteIcon },
  { to: '/vocabulary', label: 'รายการคำศัพท์', icon: BookOpen },
  { to: '/achievements', label: 'เหรียญรางวัล', icon: Award },
  { to: '/settings', label: 'ตั้งค่า', icon: Settings },
] as const

export default function ProfilePage() {
  const email = useAuthStore((s) => s.email)
  const xp = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)

  const { title, currentMinXp, nextMinXp } = levelProgressForXp(xp)
  const progressPercent = nextMinXp
    ? Math.round(((xp - currentMinXp) / (nextMinXp - currentMinXp)) * 100)
    : 100

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">โปรไฟล์</h1>
        <p className="text-stone-500 mt-1">ข้อมูลบัญชีและความก้าวหน้าโดยรวมของคุณ</p>
      </div>

      <Card className="flex items-center gap-4">
        <span className="flex items-center justify-center w-16 h-16 rounded-full bg-sand-900 text-white text-2xl font-bold shrink-0">
          {(email ?? '?').charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-stone-800 truncate">{email}</p>
          <p className="text-sm text-brand-600 font-medium">{title}</p>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
            <Star size={16} className="text-brand-500 fill-brand-500" />
            {xp} XP
          </p>
          <span className="hidden sm:inline text-xs text-amber-600 font-semibold">🔥 {streak} วันติดต่อกัน</span>
        </div>
        {nextMinXp ? (
          <>
            <ProgressBar value={xp - currentMinXp} max={nextMinXp - currentMinXp} />
            <p className="text-xs text-stone-400 mt-1.5">อีก {nextMinXp - xp} XP ถึงระดับถัดไป</p>
          </>
        ) : (
          <>
            <ProgressBar value={1} max={1} />
            <p className="text-xs text-stone-400 mt-1.5">คุณถึงระดับสูงสุดแล้ว 🎉</p>
          </>
        )}
        <p className="text-xs text-stone-300 mt-1">{progressPercent}%</p>
      </Card>

      <Card>
        <h2 className="font-semibold text-stone-800 mb-3">ทางลัด</h2>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2.5 rounded-xl border border-sand-100 px-4 py-3 hover:shadow-sm hover:border-brand-300 transition"
              >
                <Icon size={18} className="text-brand-600 shrink-0" />
                <span className="text-sm font-medium text-stone-700">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </Card>

      <Link to="/settings">
        <Button variant="secondary" className="w-full">จัดการบัญชีและการแจ้งเตือน</Button>
      </Link>
    </div>
  )
}
