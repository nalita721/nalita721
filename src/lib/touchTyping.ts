export type FingerId = 'L-pinky' | 'L-ring' | 'L-middle' | 'L-index' | 'R-index' | 'R-middle' | 'R-ring' | 'R-pinky' | 'thumb'

export const KEYBOARD_ROWS: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '-'],
]

const FINGER_MAP: Record<string, FingerId> = {
  q: 'L-pinky', a: 'L-pinky', z: 'L-pinky',
  w: 'L-ring', s: 'L-ring', x: 'L-ring',
  e: 'L-middle', d: 'L-middle', c: 'L-middle',
  r: 'L-index', f: 'L-index', v: 'L-index', t: 'L-index', g: 'L-index', b: 'L-index',
  y: 'R-index', h: 'R-index', n: 'R-index', u: 'R-index', j: 'R-index', m: 'R-index',
  i: 'R-middle', k: 'R-middle',
  o: 'R-ring', l: 'R-ring',
  p: 'R-pinky', '-': 'R-pinky',
  ' ': 'thumb',
}

export function fingerForChar(ch: string): FingerId {
  return FINGER_MAP[ch.toLowerCase()] ?? 'R-index'
}

export function normalizeTypingChar(ch: string): string {
  return ch.toLowerCase()
}
