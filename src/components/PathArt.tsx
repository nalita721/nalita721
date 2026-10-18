/**
 * Decorations for the study-plan path: a round mascot that stands beside the
 * trail holding a prop for its unit's theme, and the mid-unit treasure chest.
 * Drawn as inline SVG so they need no image assets and take the unit color.
 */

export type MascotProp = 'suitcase' | 'book' | 'briefcase' | 'trophy' | 'cheer' | 'headphones'

interface MascotProps {
  color: string
  prop: MascotProp
  size?: number
}

export function PathMascot({ color, prop, size = 96 }: MascotProps) {
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} aria-hidden="true">
      <ellipse cx="50" cy="104" rx="26" ry="5" fill="#000" opacity="0.12" />
      {/* feet */}
      <ellipse cx="38" cy="98" rx="9" ry="5" fill="#f59e0b" />
      <ellipse cx="62" cy="98" rx="9" ry="5" fill="#f59e0b" />
      {/* arms behind body when cheering */}
      {prop === 'cheer' && (
        <>
          <path d="M22 58 Q10 40 14 26" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M78 58 Q90 40 86 26" stroke={color} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M8 18 l3 6 6 1 -5 4 1 6 -5 -3 -5 3 1 -6 -5 -4 6 -1z" fill="#fbbf24" />
          <path d="M90 14 l2 5 5 1 -4 3 1 5 -4 -3 -4 3 1 -5 -4 -3 5 -1z" fill="#fbbf24" />
        </>
      )}
      {/* body */}
      <ellipse cx="50" cy="62" rx="34" ry="36" fill={color} />
      <ellipse cx="50" cy="72" rx="22" ry="22" fill="#fff" opacity="0.35" />
      {/* tuft */}
      <path d="M44 28 Q48 16 52 27 Q56 18 58 29" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* eyes */}
      <circle cx="38" cy="52" r="10" fill="#fff" />
      <circle cx="62" cy="52" r="10" fill="#fff" />
      <circle cx="40" cy="54" r="5.5" fill="#1f2937" />
      <circle cx="60" cy="54" r="5.5" fill="#1f2937" />
      <circle cx="42" cy="52" r="2" fill="#fff" />
      <circle cx="62" cy="52" r="2" fill="#fff" />
      {/* cheeks + mouth */}
      <ellipse cx="28" cy="66" rx="5" ry="3" fill="#fb7185" opacity="0.55" />
      <ellipse cx="72" cy="66" rx="5" ry="3" fill="#fb7185" opacity="0.55" />
      <path d="M43 68 Q50 75 57 68" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" fill="#fff" />
      {prop === 'suitcase' && (
        <g>
          <path d="M80 72 h6 a3 3 0 0 1 3 3 v2" stroke="#78350f" strokeWidth="3" fill="none" />
          <rect x="74" y="76" width="22" height="20" rx="3" fill="#b45309" />
          <rect x="74" y="84" width="22" height="3" fill="#78350f" />
          <circle cx="78" cy="68" r="5" fill={color} />
        </g>
      )}
      {prop === 'book' && (
        <g>
          <rect x="30" y="74" width="40" height="22" rx="2" fill="#fff" stroke="#1f2937" strokeWidth="2" />
          <line x1="50" y1="74" x2="50" y2="96" stroke="#1f2937" strokeWidth="2" />
          <line x1="35" y1="81" x2="46" y2="81" stroke="#94a3b8" strokeWidth="2" />
          <line x1="54" y1="81" x2="65" y2="81" stroke="#94a3b8" strokeWidth="2" />
          <line x1="35" y1="87" x2="46" y2="87" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="28" cy="84" r="5" fill={color} />
          <circle cx="72" cy="84" r="5" fill={color} />
        </g>
      )}
      {prop === 'briefcase' && (
        <g>
          <path d="M8 74 v-4 a3 3 0 0 1 3 -3 h6 a3 3 0 0 1 3 3 v4" stroke="#1f2937" strokeWidth="3" fill="none" />
          <rect x="2" y="74" width="24" height="18" rx="3" fill="#334155" />
          <rect x="12" y="80" width="4" height="4" fill="#fbbf24" />
          <circle cx="22" cy="70" r="5" fill={color} />
          <path d="M44 28 h12 l-6 6z" fill="#1f2937" />
        </g>
      )}
      {prop === 'trophy' && (
        <g>
          <path d="M34 26 h32 l-4 -8 h-24z" fill="#1f2937" />
          <rect x="30" y="24" width="40" height="4" rx="1" fill="#1f2937" />
          <line x1="66" y1="26" x2="72" y2="34" stroke="#fbbf24" strokeWidth="2" />
          <path d="M74 66 h18 v6 a9 9 0 0 1 -18 0z" fill="#fbbf24" />
          <rect x="80" y="80" width="6" height="8" fill="#f59e0b" />
          <rect x="76" y="88" width="14" height="4" rx="1" fill="#b45309" />
          <circle cx="76" cy="74" r="5" fill={color} />
        </g>
      )}
      {prop === 'headphones' && (
        <g>
          <path d="M18 54 Q18 20 50 20 Q82 20 82 54" stroke="#1f2937" strokeWidth="5" fill="none" />
          <rect x="11" y="48" width="12" height="18" rx="5" fill="#1f2937" />
          <rect x="77" y="48" width="12" height="18" rx="5" fill="#1f2937" />
        </g>
      )}
    </svg>
  )
}

export type ChestState = 'locked' | 'ready' | 'opened'

export function TreasureChest({ state, size = 88 }: { state: ChestState; size?: number }) {
  const wood = state === 'locked' ? '#d6d3d1' : '#b45309'
  const woodDark = state === 'locked' ? '#a8a29e' : '#78350f'
  const metal = state === 'locked' ? '#e7e5e4' : '#fbbf24'
  return (
    <svg viewBox="0 0 100 90" width={size} height={size * 0.9} aria-hidden="true">
      <ellipse cx="50" cy="84" rx="38" ry="5" fill="#000" opacity="0.12" />
      {state === 'opened' && (
        <g>
          <path d="M14 40 L50 6 L86 40" fill="#fde68a" opacity="0.6" />
          <circle cx="40" cy="38" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <circle cx="54" cy="34" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <circle cx="62" cy="40" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          {/* lid tipped back */}
          <path d="M14 30 Q50 6 86 30 L86 22 Q50 -2 14 22z" fill={wood} stroke={woodDark} strokeWidth="2" />
        </g>
      )}
      <rect x="12" y="40" width="76" height="40" rx="5" fill={wood} stroke={woodDark} strokeWidth="2.5" />
      <rect x="12" y="52" width="76" height="5" fill={woodDark} opacity="0.5" />
      {state !== 'opened' && (
        <path d="M12 42 Q50 10 88 42z" fill={wood} stroke={woodDark} strokeWidth="2.5" strokeLinejoin="round" />
      )}
      <rect x="22" y="40" width="6" height="40" fill={metal} />
      <rect x="72" y="40" width="6" height="40" fill={metal} />
      <rect x="42" y="44" width="16" height="16" rx="3" fill={metal} stroke={woodDark} strokeWidth="2" />
      <circle cx="50" cy="51" r="2.5" fill={woodDark} />
      <rect x="49" y="51" width="2" height="5" fill={woodDark} />
      {state === 'ready' && (
        <g fill="#fde047">
          <path d="M8 22 l2 5 5 1 -4 3 1 5 -4 -3 -4 3 1 -5 -4 -3 5 -1z" />
          <path d="M88 14 l2 4 4 1 -3 3 1 4 -4 -2 -3 2 0 -4 -3 -3 4 -1z" />
        </g>
      )}
    </svg>
  )
}
