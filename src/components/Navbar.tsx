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

export default function Navbar() {
  const xp = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <NavLink to="/" className="font-bold text-brand-700 text-lg shrink-0">
          TOEIC Vocab Master
        </NavLink>

        <nav className="flex flex-wrap gap-1 text-sm">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg font-medium transition ${
                  isActive ? 'bg-brand-600 text-white' : 'text-stone-600 hover:bg-sand-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm shrink-0">
          <span className="flex items-center gap-1 text-amber-600 font-semibold">🔥 {streak}</span>
          <span className="flex items-center gap-1 text-brand-600 font-semibold">⭐ {xp} XP</span>
          <Link to="/settings" title="ตั้งค่าการแจ้งเตือน" className="text-stone-500 hover:text-brand-600 transition">
            🔔
          </Link>
        </div>
      </div>
    </header>
  )
}
