import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

interface SidebarLink {
  to: string
  label: string
  icon: string
  end?: boolean
}

const LINKS: SidebarLink[] = [
  { to: '/vocabulary', label: 'คำศัพท์', icon: '📚' },
  { to: '/grammar', label: 'ไวยากรณ์', icon: '✍️' },
  { to: '/listening', label: 'ฟัง', icon: '🎧' },
  { to: '/reading', label: 'อ่าน', icon: '📝' },
  { to: '/games', label: 'เกม', icon: '🎮' },
  { to: '/mock-test', label: 'Mock Test', icon: '🏆' },
  { to: '/friends', label: 'เพื่อน', icon: '👥' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const authStatus = useAuthStore((s) => s.status)
  const homeLink: SidebarLink = authStatus === 'authenticated'
    ? { to: '/', label: 'แดชบอร์ด', icon: '🏠', end: true }
    : { to: '/', label: 'หน้าแรก', icon: '🏠', end: true }
  const links = [homeLink, ...LINKS]

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-stone-900/40 md:hidden" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-sand-900 text-sand-100 flex flex-col transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <NavLink to="/" className="font-bold text-white text-lg leading-tight">
            TOEIC<br />Vocab Master
          </NavLink>
          <button
            onClick={onClose}
            className="md:hidden text-sand-300 hover:text-white text-xl leading-none"
            aria-label="ปิดเมนู"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-white/15 text-white' : 'text-sand-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-5 pt-2 border-t border-white/10">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-white/15 text-white' : 'text-sand-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="text-lg">⚙️</span>
            ตั้งค่า
          </NavLink>
        </div>
      </aside>
    </>
  )
}
