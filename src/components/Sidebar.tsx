import { NavLink } from 'react-router-dom'
import {
  Award,
  BookOpen,
  Brain,
  FileText,
  Gamepad2,
  Headphones,
  Home,
  Mic,
  PenLine,
  Route as RouteIcon,
  Settings,
  TrendingUp,
  Trophy,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useAuthStore } from '../store/auth'
import { Logo } from './Logo'

interface SidebarLink {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const LINKS: SidebarLink[] = [
  { to: '/progress', label: 'ความก้าวหน้า', icon: TrendingUp },
  { to: '/study-plan', label: 'แผนการเรียน', icon: RouteIcon },
  { to: '/vocabulary', label: 'คำศัพท์', icon: BookOpen },
  { to: '/grammar', label: 'ไวยากรณ์', icon: PenLine },
  { to: '/listening', label: 'ฟัง', icon: Headphones },
  { to: '/reading', label: 'อ่าน', icon: FileText },
  { to: '/games', label: 'เกม', icon: Gamepad2 },
  { to: '/speaking', label: 'พูด', icon: Mic },
  { to: '/mock-test', label: 'Mock Test', icon: Trophy },
  { to: '/iq-test', label: 'IQ Test', icon: Brain },
  { to: '/achievements', label: 'เหรียญรางวัล', icon: Award },
  { to: '/friends', label: 'เพื่อน', icon: Users },
]

interface LanguageLink {
  to: string
  label: string
  flag: string
}

const LANGUAGE_LINKS: LanguageLink[] = [
  { to: '/vocabulary', label: 'English (TOEIC)', flag: '🇬🇧' },
  { to: '/chinese', label: '中文 (HSK)', flag: '🇨🇳' },
  { to: '/japanese', label: '日本語 (JLPT)', flag: '🇯🇵' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const authStatus = useAuthStore((s) => s.status)
  const homeLink: SidebarLink = authStatus === 'authenticated'
    ? { to: '/dashboard', label: 'แดชบอร์ด', icon: Home, end: true }
    : { to: '/', label: 'หน้าแรก', icon: Home, end: true }
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
          <NavLink to={homeLink.to} className="text-white">
            <Logo size={28} />
          </NavLink>
          <button
            onClick={onClose}
            className="md:hidden text-sand-300 hover:text-white leading-none"
            aria-label="ปิดเมนู"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-3 pb-3">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-sand-400 mb-1.5">เลือกภาษาที่เรียน</p>
          <div className="grid grid-cols-3 gap-1.5">
            {LANGUAGE_LINKS.map((lang) => (
              <NavLink
                key={lang.to}
                to={lang.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition ${
                    isActive ? 'bg-white/15 text-white' : 'text-sand-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span className="leading-tight text-center">{lang.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1 border-t border-white/10 pt-3">
          {links.map((link) => {
            const Icon = link.icon
            return (
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
                <Icon size={20} strokeWidth={2} />
                {link.label}
              </NavLink>
            )
          })}
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
            <Settings size={20} strokeWidth={2} />
            ตั้งค่า
          </NavLink>
        </div>
      </aside>
    </>
  )
}
