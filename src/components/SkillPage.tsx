import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronRight, Lock } from 'lucide-react'
import { CEFR_LEVELS } from '../data/cefr'
import type { CefrCode } from '../lib/types'

/**
 * Shared layout for the English skill list pages (vocabulary, grammar,
 * listening, reading) so they read the same as the language hubs.
 */

export function SkillHero({
  emoji,
  eyebrow,
  title,
  description,
  gradient,
  stats,
}: {
  emoji: string
  eyebrow: string
  title: string
  description: string
  gradient: string
  stats: { label: string; value: string }[]
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} px-6 py-7 text-white shadow-sm`}>
      <span className="pointer-events-none absolute -right-3 -top-5 text-8xl opacity-25">{emoji}</span>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{eyebrow}</p>
      <h1 className="mt-1 text-2xl font-extrabold">
        {emoji} {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">{description}</p>
      {stats.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {stats.map((s) => (
            <span key={s.label} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              {s.value} <span className="font-normal opacity-85">{s.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export type SkillStatus = 'passed' | 'current' | 'open' | 'locked'

function StatusPill({ status, lockedLabel }: { status: SkillStatus; lockedLabel: string }) {
  if (status === 'passed')
    return (
      <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
        <Check size={12} strokeWidth={3} /> ผ่านแล้ว
      </span>
    )
  if (status === 'current')
    return <span className="shrink-0 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">เรียนต่อ</span>
  if (status === 'locked')
    return (
      <span className="flex shrink-0 items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold text-stone-400">
        <Lock size={12} /> {lockedLabel}
      </span>
    )
  return null
}

export function SkillRow({
  to,
  icon,
  level,
  title,
  subtitle,
  meta,
  progress,
  status,
  lockedLabel = 'ล็อก',
}: {
  to: string
  icon: ReactNode
  level: CefrCode
  title: string
  subtitle?: string
  meta?: ReactNode
  /** 0–1, shown as a thin bar under the text */
  progress?: number
  status: SkillStatus
  lockedLabel?: string
}) {
  const cefr = CEFR_LEVELS.find((l) => l.code === level)!
  return (
    <Link to={to} className="block">
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-[0_2px_16px_rgba(86,61,44,0.07)] transition hover:-translate-y-0.5 hover:shadow-md ${
          status === 'current' ? 'border-2 border-brand-400' : 'border-sand-100'
        } ${status === 'locked' ? 'opacity-70' : ''}`}
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{ backgroundColor: cefr.bgColor, color: cefr.color }}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug text-stone-800">{title}</p>
          {subtitle && <p className="truncate text-xs text-stone-500">{subtitle}</p>}
          {meta && <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-stone-400">{meta}</div>}
          {progress !== undefined && (
            <div className="mt-1.5 h-1.5 max-w-xs overflow-hidden rounded-full bg-sand-100">
              <div className="h-full rounded-full" style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: cefr.color }} />
            </div>
          )}
        </div>
        <StatusPill status={status} lockedLabel={lockedLabel} />
        <ChevronRight className="hidden shrink-0 text-stone-300 sm:block" size={18} />
      </div>
    </Link>
  )
}

/** Items grouped under a CEFR level heading, in learning order. */
export function LevelSection({ level, count, children }: { level: CefrCode; count: number; children: ReactNode }) {
  const cefr = CEFR_LEVELS.find((l) => l.code === level)!
  return (
    <section className="space-y-2.5">
      <div className="flex items-center gap-2">
        <span className="rounded-lg px-2 py-0.5 text-xs font-extrabold" style={{ backgroundColor: cefr.bgColor, color: cefr.color }}>
          {cefr.code}
        </span>
        <h2 className="font-bold text-stone-800">{cefr.nameTh}</h2>
        <span className="text-xs text-stone-400">{count} รายการ</span>
      </div>
      {children}
    </section>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`rounded-full px-2 py-0.5 font-semibold ${className}`}>{children}</span>
}
