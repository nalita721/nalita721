import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl bg-white shadow-[0_2px_16px_rgba(86,61,44,0.07)] border border-sand-100 p-5 ${className}`}>
      {children}
    </div>
  )
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20',
  secondary: 'bg-sand-100 text-sand-800 hover:bg-sand-200',
  ghost: 'bg-transparent text-brand-700 hover:bg-brand-50',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/20',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function ProgressBar({ value, max, colorClass = 'bg-brand-600' }: { value: number; max: number; colorClass?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="h-2 w-full rounded-full bg-sand-200 overflow-hidden">
      <div className={`h-full rounded-full ${colorClass} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Badge({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <span className={`inline-flex items-center rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-1 ${className}`}>
      {children}
    </span>
  )
}

export function Modal({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="text-center py-12">
      <p className="text-lg font-semibold text-stone-700">{title}</p>
      <p className="mt-1 text-sm text-stone-500">{description}</p>
    </Card>
  )
}
