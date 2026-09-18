import type { LucideIcon } from 'lucide-react'

interface PageHeroProps {
  lines: string[]
  note: string
  icon: LucideIcon
  gradient?: string
}

/** Decorative "photo banner" built from CSS + icons only — no stock images, no external cost. */
export function PageHero({ lines, note, icon: Icon, gradient = 'from-amber-100 via-orange-50 to-sand-100' }: PageHeroProps) {
  return (
    <div
      className={`relative hidden lg:flex items-center justify-end gap-6 rounded-3xl bg-gradient-to-br ${gradient} border border-sand-200 overflow-hidden h-40 px-8 shrink-0`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle at 15% 25%, #78350f 0, transparent 45%)' }}
      />
      <div className="relative flex flex-col gap-1.5">
        {lines.map((line, i) => (
          <div
            key={line}
            className="flex items-center rounded-md bg-white/80 backdrop-blur px-3 py-1.5 shadow-sm border border-white/60"
            style={{ width: `${132 + i * 20}px` }}
          >
            <span className="text-xs font-serif italic text-stone-700 truncate">{line}</span>
          </div>
        ))}
      </div>
      <div className="relative hidden xl:flex flex-col items-center justify-center bg-white rounded-2xl shadow-md border border-sand-200 px-4 py-3 text-center gap-1 shrink-0 w-28">
        <Icon size={22} className="text-brand-600" />
        <p className="text-[11px] font-serif italic text-stone-500 leading-tight">{note}</p>
      </div>
    </div>
  )
}
