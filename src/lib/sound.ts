// Short synthesized sound effects (Web Audio API) — no audio files needed.
// A single AudioContext is reused and resumed lazily on first user-gesture playback.

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audioCtx = new Ctor()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

function playTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  gainValue = 0.15,
  type: OscillatorType = 'sine',
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.02)
}

/** Short upbeat two-note chime for a correct answer. */
export function playCorrectSound() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  playTone(ctx, 523.25, now, 0.12) // C5
  playTone(ctx, 783.99, now + 0.1, 0.18) // G5
}

/** Short low buzz for an incorrect answer. */
export function playIncorrectSound() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  playTone(ctx, 220, now, 0.2, 0.12, 'square') // A3
  playTone(ctx, 196, now + 0.12, 0.22, 0.12, 'square') // G3
}

/** Rising four-note arpeggio for finishing a quiz, test, or game. */
export function playCompleteSound() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  playTone(ctx, 523.25, now, 0.12) // C5
  playTone(ctx, 659.25, now + 0.11, 0.12) // E5
  playTone(ctx, 783.99, now + 0.22, 0.12) // G5
  playTone(ctx, 1046.5, now + 0.33, 0.25) // C6
}
