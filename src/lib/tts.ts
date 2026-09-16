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

export function speak(text: string, accent: Accent = 'US', rate = 0.95): Promise<void> {
  return new Promise((resolve) => {
    if (!isTtsSupported()) {
      resolve()
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = ACCENT_LANG[accent]
    utterance.rate = rate
    utterance.onend = () => resolve()
    utterance.onerror = () => resolve()
    window.speechSynthesis.speak(utterance)
  })
}

export function stopSpeaking(): void {
  if (isTtsSupported()) window.speechSynthesis.cancel()
}
