import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { hasVoiceFor, isTtsSupported, speakLang } from '../lib/tts'

const LANG_NAME: Record<string, string> = { 'zh-CN': 'ภาษาจีน', 'ja-JP': 'ภาษาญี่ปุ่น' }
const SAMPLE: Record<string, string> = { 'zh-CN': '你好', 'ja-JP': 'こんにちは' }

/**
 * Warns when the browser has no voice for `lang` (common on iPad/iPhone until a
 * voice is downloaded) and offers a test button, so silence isn't mistaken for a bug.
 */
export function VoiceCheck({ lang }: { lang: string }) {
  const [available, setAvailable] = useState<boolean | undefined>(() => hasVoiceFor(lang))

  useEffect(() => {
    if (!isTtsSupported()) return
    const update = () => setAvailable(hasVoiceFor(lang))
    update()
    window.speechSynthesis.addEventListener?.('voiceschanged', update)
    // some browsers never fire voiceschanged; check again shortly after load
    const t = setTimeout(update, 1500)
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', update)
      clearTimeout(t)
    }
  }, [lang])

  const name = LANG_NAME[lang] ?? lang

  if (!isTtsSupported() || available === false) {
    return (
      <div className="space-y-2 rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3 text-sm text-stone-700">
        <p className="font-bold text-amber-800">🔇 เครื่องนี้ยังไม่มีเสียงอ่าน{name}</p>
        <p>เว็บใช้เสียงอ่านที่ติดมากับเครื่อง ต้องติดตั้งเสียง{name}ก่อนถึงจะได้ยิน:</p>
        <ul className="list-disc space-y-0.5 pl-5 text-xs">
          <li>
            <b>iPad / iPhone:</b> การตั้งค่า → การช่วยการเข้าถึง → เนื้อหาที่พูด → เสียง → เลือก{name} แล้วดาวน์โหลด จากนั้นปิดแล้วเปิดเบราว์เซอร์ใหม่
          </li>
          <li>
            <b>Android:</b> การตั้งค่า → การช่วยเหลือพิเศษ → เอาต์พุตการอ่านออกเสียง → ติดตั้งข้อมูลเสียง{name}
          </li>
          <li>
            <b>คอมพิวเตอร์:</b> ใช้ Chrome หรือ Edge รุ่นล่าสุดจะมีเสียง{name}ให้ทันที
          </li>
        </ul>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => speakLang(SAMPLE[lang] ?? '', lang)}
      className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600"
    >
      <Volume2 size={14} /> ไม่ได้ยินเสียง? แตะเพื่อทดสอบเสียง{name} (ตรวจว่าไม่ได้ปิดเสียงเครื่องหรือเปิดโหมดเงียบ)
    </button>
  )
}
