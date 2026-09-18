import { Link } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { useAuthStore } from '../store/auth'
import { useProgressStore } from '../store/progress'
import GlobalSearch from './GlobalSearch'

export default function TopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const xp = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)
  const authStatus = useAuthStore((s) => s.status)
  const email = useAuthStore((s) => s.email)

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-sand-200">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-stone-500 hover:text-stone-800 leading-none shrink-0"
          aria-label="เปิดเมนู"
        >
          <Menu size={22} />
        </button>

        <GlobalSearch />

        <div className="ml-auto flex items-center gap-3 text-sm shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-amber-600 font-semibold">🔥 {streak}</span>
          <span className="hidden sm:flex items-center gap-1 text-brand-600 font-semibold">⭐ {xp} XP</span>
          <Link to="/settings" title="ตั้งค่าการแจ้งเตือน" className="text-stone-500 hover:text-brand-600 transition">
            <Bell size={20} />
          </Link>
          {authStatus === 'authenticated' ? (
            <Link
              to="/profile"
              title={email ?? ''}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-sand-900 text-white text-sm font-semibold"
            >
              {(email ?? '?').charAt(0).toUpperCase()}
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-brand-600 text-white px-3 py-1.5 text-xs font-semibold hover:bg-brand-700 transition"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
