import { Link, NavLink } from 'react-router-dom'
import { useProgressStore } from '../store/progress'

const LINKS = [
  { to: '/', label: 'แดชบอร์ด', end: true },
  { to: '/vocabulary', label: 'คำศัพท์' },
  { to: '/grammar', label: 'ไวยากรณ์' },
  { to: '/listening', label: 'ฟัง' },
  { to: '/reading', label: 'อ่าน' },
  { to: '/games', label: 'เกม' },
  { to: '/mock-test', label: 'Mock Test' },
]

function UserBadges() {
  const xp = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)

  return (
    <div className="flex items-center gap-3 text-sm shrink-0">
      <span className="flex items-center gap-1 text-amber-600 font-semibold">🔥 {streak}</span>
      <span className="flex items-center gap-1 text-brand-600 font-semibold">⭐ {xp} XP</span>
      <Link to="/settings" title="ตั้งค่าการแจ้งเตือน" className="text-stone-500 hover:text-brand-600 transition">
        🔔
      </Link>
    </div>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="font-bold text-brand-700 text-lg shrink-0">
            TOEIC Vocab Master
          </NavLink>
          <div className="sm:hidden">
            <UserBadges />
          </div>
        </div>

        <nav className="flex items-center gap-1 text-sm overflow-x-auto -mx-1 px-1 sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition ${
                  isActive ? 'bg-brand-600 text-white' : 'text-stone-600 hover:bg-sand-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:block">
          <UserBadges />
        </div>
      </div>
    </header>
  )
}
