const ACCENT_LANG: Record<string, string> = {
  US: 'en-US',
  UK: 'en-GB',
  AU: 'en-AU',
  CA: 'en-CA',
}

export type Accent = keyof typeof ACCENT_LANG

export function isTtsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

let voices: SpeechSynthesisVoice[] = []

function loadVoices() {
  if (!isTtsSupported()) return
  voices = window.speechSynthesis.getVoices()
}

if (isTtsSupported()) {
  loadVoices()
  // voices arrive asynchronously on Chrome and iOS Safari
  window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
}

/** Best installed voice for a language: exact match first, then same base language (zh-CN ← zh-TW/zh-HK). */
function voiceFor(lang: string): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) loadVoices()
  const norm = (l: string) => l.replace('_', '-').toLowerCase()
  const want = norm(lang)
  const base = want.split('-')[0]
  return voices.find((v) => norm(v.lang) === want) ?? voices.find((v) => norm(v.lang).startsWith(base))
}

/**
 * Whether the device can speak this language. Returns undefined while the voice
 * list has not loaded yet, so callers don't warn too early.
 */
export function hasVoiceFor(lang: string): boolean | undefined {
  if (!isTtsSupported()) return false
  if (voices.length === 0) loadVoices()
  if (voices.length === 0) return undefined
  return voiceFor(lang) !== undefined
}

// Keeping a reference stops Safari from garbage-collecting the utterance mid-speech,
// which silently drops its onend event.
let current: SpeechSynthesisUtterance | null = null

function say(text: string, lang: string, rate: number): Promise<void> {
  return new Promise((resolve) => {
    if (!isTtsSupported() || !text) {
      resolve()
      return
    }
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    const voice = voiceFor(lang)
    if (voice) utterance.voice = voice

    let done = false
    const finish = () => {
      if (done) return
      done = true
      clearTimeout(guard)
      if (current === utterance) current = null
      resolve()
    }
    utterance.onend = finish
    utterance.onerror = finish
    // some browsers never fire onend; don't leave callers stuck in a "playing" state
    const guard = setTimeout(finish, 1500 + text.length * 250)

    const start = () => {
      current = utterance
      if (synth.paused) synth.resume()
      synth.speak(utterance)
    }
    // Safari drops an utterance queued in the same tick as cancel(), so only cancel
    // when something is actually playing, and give it a moment before speaking again.
    if (synth.speaking || synth.pending) {
      synth.cancel()
      setTimeout(start, 80)
    } else {
      start()
    }
  })
}

export function speak(text: string, accent: Accent = 'US', rate = 0.95): Promise<void> {
  return say(text, ACCENT_LANG[accent], rate)
}

/** Like speak(), but takes a raw BCP-47 language code directly (e.g. 'zh-CN', 'ja-JP') for non-English tracks. */
export function speakLang(text: string, lang: string, rate = 0.9): Promise<void> {
  return say(text, lang, rate)
}

export function stopSpeaking(): void {
  if (isTtsSupported()) window.speechSynthesis.cancel()
}
