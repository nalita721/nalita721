import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { useAuthStore } from '../store/auth'

const ERROR_MESSAGES: Record<string, string> = {
  expired: 'ลิงก์หมดอายุหรือถูกใช้ไปแล้ว กรุณาขอลิงก์ใหม่',
  missing_token: 'ลิงก์ไม่ถูกต้อง กรุณาขอลิงก์ใหม่',
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
