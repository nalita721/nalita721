import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { useAuthStore } from '../store/auth'

const ERROR_MESSAGES: Record<string, string> = {
  expired: 'ลิงก์หมดอายุหรือถูกใช้ไปแล้ว กรุณาขอลิงก์ใหม่',
  missing_token: 'ลิงก์ไม่ถูกต้อง กรุณาขอลิงก์ใหม่',
  google_failed: 'เข้าสู่ระบบด้วย Google ไม่สำเร็จ กรุณาลองใหม่',
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const requestLink = useAuthStore((s) => s.requestLink)

  const urlError = searchParams.get('error')

  async function submit() {
    if (!email.trim()) return
    setStatus('sending')
    setErrorMsg('')
    const result = await requestLink(email.trim())
    if (result.ok) {
      setStatus('sent')
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <p className="text-3xl">🔑</p>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">เข้าสู่ระบบ</h1>
        <p className="text-stone-500 mt-1">
          เข้าสู่ระบบด้วยอีเมล เพื่อบันทึกความคืบหน้าไว้บนคลาวด์ และใช้งานได้ต่อเนื่องทุกอุปกรณ์
        </p>
      </div>

      <Card className="space-y-4">
        {status === 'sent' ? (
          <div className="text-center space-y-2 py-4">
            <p className="text-3xl">📬</p>
            <p className="font-semibold text-stone-800">ส่งลิงก์เข้าสู่ระบบแล้ว</p>
            <p className="text-sm text-stone-500">
              ตรวจสอบอีเมล <span className="font-medium text-stone-700">{email}</span> แล้วคลิกลิงก์เพื่อเข้าสู่ระบบ (ลิงก์มีอายุ 15 นาที)
            </p>
          </div>
        ) : (
          <>
            <a href="/api/auth/google/start" className="block">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-sand-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-sand-50 transition"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.79-2.12-6.74-4.96H1.27v3.1A12 12 0 0 0 12 24Z"
                  />
                  <path fill="#FBBC05" d="M5.26 14.28A7.2 7.2 0 0 1 4.88 12c0-.79.14-1.56.38-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l3.99-3.1Z" />
                  <path
                    fill="#EA4335"
                    d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.27 6.62l3.99 3.1C6.21 6.88 8.86 4.77 12 4.77Z"
                  />
                </svg>
                เข้าสู่ระบบด้วย Google
              </button>
            </a>

            <div className="flex items-center gap-3 text-xs text-stone-400">
              <div className="h-px flex-1 bg-sand-200" />
              หรือ
              <div className="h-px flex-1 bg-sand-200" />
            </div>

            <div>
              <label className="text-sm font-medium text-stone-700 block mb-1">อีเมลของคุณ</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-sand-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <Button onClick={submit} disabled={!email.trim() || status === 'sending'} className="w-full justify-center">
              {status === 'sending' ? 'กำลังส่งลิงก์...' : 'ส่งลิงก์เข้าสู่ระบบ'}
            </Button>

            {status === 'error' && <p className="text-sm text-rose-600">❌ {errorMsg}</p>}
            {status !== 'error' && urlError && (
              <p className="text-sm text-rose-600">❌ {ERROR_MESSAGES[urlError] ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่'}</p>
            )}
          </>
        )}
      </Card>

      <p className="text-xs text-stone-400 text-center">
        ไม่ต้องตั้งรหัสผ่าน — ระบบจะส่งลิงก์เข้าสู่ระบบไปที่อีเมลของคุณทุกครั้ง หากไม่เข้าสู่ระบบ
        ความคืบหน้าจะยังถูกบันทึกไว้ในเบราว์เซอร์นี้ตามปกติ
      </p>
    </div>
  )
}
