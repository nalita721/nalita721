import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Square, Volume2 } from 'lucide-react'
import { SPEAKING_PROMPTS } from '../data/speakingPrompts'
import { Button, Card, ProgressBar } from '../components/ui'
import { speak } from '../lib/tts'
import { playCompleteSound } from '../lib/sound'
import { analyzeSpeech, type SpeechAnalysis } from '../lib/speechCheck'

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Safari's MediaRecorder doesn't support 'audio/webm' at all — it records audio/mp4 by default. */
function pickSupportedMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return undefined
  return ['audio/webm', 'audio/mp4', 'audio/aac', 'audio/ogg'].find((type) => MediaRecorder.isTypeSupported(type))
}

// The Web Speech API's SpeechRecognition — free (built into the browser, no API key), but only
// implemented by Chromium-based browsers (Chrome, Edge). Safari and Firefox don't have it.
interface MinimalSpeechRecognition {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

function getSpeechRecognitionCtor(): (new () => MinimalSpeechRecognition) | undefined {
  const w = window as unknown as { SpeechRecognition?: new () => MinimalSpeechRecognition; webkitSpeechRecognition?: new () => MinimalSpeechRecognition }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

const SPEECH_RECOGNITION_SUPPORTED = typeof window !== 'undefined' && getSpeechRecognitionCtor() !== undefined

export default function SpeakingPage() {
  const [index, setIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [micError, setMicError] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<SpeechAnalysis | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null)
  const liveTranscriptRef = useRef('')

  const prompt = SPEAKING_PROMPTS[index]
  const done = index >= SPEAKING_PROMPTS.length

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      if (timerRef.current) clearInterval(timerRef.current)
      streamRef.current?.getTracks().forEach((t) => t.stop())
      recognitionRef.current?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startRecording() {
    setMicError(null)
    setTranscript(null)
    setAnalysis(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mimeType = pickSupportedMimeType()
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeType || 'audio/webm' })
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
      mediaRecorderRef.current = recorder
      setRecording(true)
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)

      const SpeechRecognitionCtor = getSpeechRecognitionCtor()
      if (SpeechRecognitionCtor) {
        liveTranscriptRef.current = ''
        const recognition = new SpeechRecognitionCtor()
        recognition.lang = 'en-US'
        recognition.continuous = true
        recognition.interimResults = false
        recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            if (result.isFinal) liveTranscriptRef.current += `${result[0].transcript} `
          }
        }
        recognition.onerror = () => {
          // speech-to-text is a best-effort bonus — recording itself still works without it
        }
        recognition.onend = () => {
          const text = liveTranscriptRef.current.trim()
          if (text) {
            setTranscript(text)
            setAnalysis(analyzeSpeech(text, prompt.sampleAnswer))
          }
        }
        try {
          recognition.start()
          recognitionRef.current = recognition
        } catch {
          recognitionRef.current = null
        }
      }
    } catch {
      setMicError('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการใช้งานไมโครโฟนในเบราว์เซอร์')
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    recognitionRef.current?.stop()
    setRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  function next() {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setElapsed(0)
    setMicError(null)
    setTranscript(null)
    setAnalysis(null)
    const isLast = index + 1 >= SPEAKING_PROMPTS.length
    setIndex((i) => i + 1)
    if (isLast) playCompleteSound()
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-stone-800">🎙️ ฝึกพูดภาษาอังกฤษ</h1>
        <p className="text-sm text-stone-500 mt-1">อัดเสียงตอบคำถาม แล้วเทียบกับตัวอย่างคำตอบ ไม่มีการให้คะแนนอัตโนมัติ ฝึกได้อย่างอิสระ</p>
        {!SPEECH_RECOGNITION_SUPPORTED && (
          <p className="text-xs text-stone-400 mt-2">
            💡 การแปลงเสียงเป็นข้อความอัตโนมัติใช้ได้เฉพาะ Chrome/Edge เบราว์เซอร์นี้ไม่รองรับ — ยังคงบันทึกเสียงและฟังเทียบเองได้ตามปกติ
          </p>
        )}
      </div>

      <ProgressBar value={index} max={SPEAKING_PROMPTS.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">🎉</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">ฝึกพูดครบ {SPEAKING_PROMPTS.length} คำถามแล้ว</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={() => setIndex(0)}>ฝึกอีกครั้ง</Button>
            <Link to="/dashboard">
              <Button variant="secondary">กลับหน้าแดชบอร์ด</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400 mb-1">ข้อที่ {index + 1}/{SPEAKING_PROMPTS.length}</p>
            <p className="font-semibold text-stone-800">{prompt.questionTh}</p>
            <p className="text-sm text-stone-500 italic mt-1">"{prompt.questionEn}"</p>
          </div>

          <div className="flex flex-col items-center gap-3 py-4">
            {!recording ? (
              <button
                onClick={startRecording}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-600 text-white shadow-md hover:bg-brand-700 transition"
                aria-label="เริ่มอัดเสียง"
              >
                <Mic size={26} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition animate-pulse"
                aria-label="หยุดอัดเสียง"
              >
                <Square size={22} />
              </button>
            )}
            <p className="text-sm text-stone-500">{recording ? `กำลังอัดเสียง... ${formatTime(elapsed)}` : 'แตะเพื่อเริ่มพูดตอบคำถาม'}</p>
            {micError && <p className="text-xs text-rose-600 text-center">{micError}</p>}
          </div>

          {audioUrl && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-stone-500">เสียงของคุณ</p>
              <audio controls src={audioUrl} className="w-full" />
            </div>
          )}

          {transcript && (
            <div className="rounded-xl bg-brand-50 border border-brand-100 px-4 py-3 space-y-2">
              <p className="text-xs font-semibold text-brand-700">🗣️ สิ่งที่ระบบได้ยินคุณพูด</p>
              <p className="text-sm text-stone-800 italic">"{transcript}"</p>
              {analysis && (
                <ul className="text-sm text-stone-700 space-y-1 pt-1 border-t border-brand-100">
                  {analysis.messages.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              )}
              <p className="text-[11px] text-stone-400 pt-1">
                *เป็นการวิเคราะห์เบื้องต้นจากคำศัพท์เทียบกับตัวอย่างคำตอบเท่านั้น ไม่ได้ตรวจการออกเสียงหรือให้คะแนนความถูกต้อง
              </p>
            </div>
          )}

          <div className="rounded-xl bg-sand-50 border border-sand-200 px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-stone-500">ตัวอย่างคำตอบ (สำหรับเทียบ)</p>
              <button
                onClick={() => speak(prompt.sampleAnswer)}
                className="flex items-center gap-1 text-brand-600 hover:text-brand-700 text-xs font-semibold"
              >
                <Volume2 size={16} /> ฟัง
              </button>
            </div>
            <p className="text-sm text-stone-800 italic">"{prompt.sampleAnswer}"</p>
            <p className="text-xs text-stone-500">{prompt.sampleAnswerTh}</p>
          </div>

          <Button onClick={next} className="w-full">
            {index + 1 >= SPEAKING_PROMPTS.length ? 'เสร็จสิ้น →' : 'ข้อถัดไป →'}
          </Button>
        </Card>
      )}
    </div>
  )
}
