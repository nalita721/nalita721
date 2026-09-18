interface LogoProps {
  size?: number
  className?: string
}

/** Open book + leaf mark, matching the brand's brown/blue color system. */
export function LogoMark({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 10C17 7.5 12.5 6.5 8 7.2C7.4 7.3 7 7.8 7 8.4V27.4C7 28.2 7.7 28.8 8.5 28.6C12.6 27.7 16.8 28.6 20 31"
        stroke="#6B4F3A"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#E8D8C8"
      />
      <path
        d="M20 10C23 7.5 27.5 6.5 32 7.2C32.6 7.3 33 7.8 33 8.4V27.4C33 28.2 32.3 28.8 31.5 28.6C27.4 27.7 23.2 28.6 20 31V10Z"
        fill="#6B4F3A"
        stroke="#3E2C23"
        strokeWidth="1"
      />
      <path
        d="M14 3C14 6 16 8 19 8C19 5 17 3 14 3Z"
        fill="#3B82C4"
      />
    </svg>
  )
}

export function Logo({ withWordmark = true, size = 32 }: { withWordmark?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark size={size} />
      {withWordmark && (
        <span className="font-bold leading-tight">
          TOEIC<br />Vocab Master
        </span>
      )}
    </span>
  )
}
