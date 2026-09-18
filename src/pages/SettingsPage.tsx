import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Toggle } from '../components/ui'
import { useAuthStore } from '../store/auth'

type Slot = 'morning' | 'evening'

const SLOTS: { id: Slot; label: string; time: string }[] = [
  { id: 'morning', label: '🌅 ช่วงเช้า', time: '08:00 น.' },
  { id: 'evening', label: '🌙 ช่วงเย็น', time: '19:00 น.' },
]

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [slot, setSlot] = useState<Slot>('morning')
  const [enabled, setEnabled] = useState(false)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const authStatus = useAuthStore((s) => s.status)
  const accountEmail = useAuthStore((s) => s.email)
  const logout = useAuthStore((s) => s.logout)

  async function subscribe(nextEnabled: boolean, nextSlot: Slot = slot) {
    if (!email.trim()) return
    setStatus('saving')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), slot: nextSlot, enabled: nextEnabled }),
      })
      if (!res.ok) throw new Error(await res.text())
      setEnabled(nextEnabled)
      setSlot(nextSlot)
      setStatus('saved')
    } catch {
      setStatus('error')
      setErrorMsg('เกิดข้อผิดพลาด ลองใหม่อีกครั้ง หรือระบบแจ้งเตือนอาจยังไม่พร้อมใช้งาน')
    }
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">👤 บัญชีผู้ใช้</h1>
      </div>

      <Card className="space-y-3">
        {authStatus === 'authenticated' ? (
          <>
            <p className="text-sm text-stone-500">เข้าสู่ระบบด้วย</p>
            <p className="font-semibold text-stone-800">{accountEmail}</p>
            <p className="text-xs text-stone-400">ความคืบหน้าของคุณจะถูกบันทึกและซิงก์อัตโนมัติกับบัญชีนี้</p>
            <Button variant="secondary" onClick={logout}>
              ออกจากระบบ
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-stone-500">
              คุณยังไม่ได้เข้าสู่ระบบ — ความคืบหน้าจะถูกบันทึกไว้ในเบราว์เซอร์นี้เท่านั้น เข้าสู่ระบบเพื่อบันทึกไว้บนคลาวด์และใช้งานต่อเนื่องทุกอุปกรณ์
            </p>
            <Link to="/login">
              <Button>เข้าสู่ระบบ</Button>
            </Link>
          </>
        )}
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-stone-800">🔔 แจ้งเตือนทางอีเมล</h2>
        <p className="text-stone-500 mt-1">ตั้งเวลาแจ้งเตือนให้กลับมาฝึก TOEIC ทุกวัน เลือกได้ 1 ช่วงเวลา</p>
      </div>

      <Card className="space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700 block mb-1">อีเมลของคุณ</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-sand-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-sand-100 px-4 py-3">
          <div>
            <p className="font-medium text-stone-800">เปิดการแจ้งเตือนรายวัน</p>
            <p className="text-xs text-stone-400">รับอีเมลเตือนให้กลับมาฝึก TOEIC ทุกวัน</p>
          </div>
          <Toggle
            checked={enabled}
            onChange={(next) => subscribe(next)}
            label="เปิดการแจ้งเตือนรายวัน"
          />
        </div>

        <div className={enabled ? '' : 'opacity-40 pointer-events-none'}>
          <p className="text-sm font-medium text-stone-700 mb-2">เลือกเวลาที่อยากให้แจ้งเตือน</p>
          <div className="divide-y divide-sand-100 rounded-xl border border-sand-100 overflow-hidden">
            {SLOTS.map((s) => (
              <label
                key={s.id}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition ${
                  slot === s.id ? 'bg-brand-50' : 'bg-white hover:bg-sand-50'
                }`}
              >
                <div>
                  <p className={`font-medium ${slot === s.id ? 'text-brand-700' : 'text-stone-700'}`}>{s.label}</p>
                  <p className="text-xs text-stone-400">{s.time}</p>
                </div>
                <input
                  type="radio"
                  name="slot"
                  checked={slot === s.id}
                  onChange={() => subscribe(true, s.id)}
                  className="w-4 h-4 accent-brand-600"
                />
              </label>
            ))}
          </div>
        </div>

        {status === 'saving' && <p className="text-sm text-stone-400">กำลังบันทึก...</p>}
        {status === 'saved' && <p className="text-sm text-emerald-600">✅ บันทึกการตั้งค่าเรียบร้อยแล้ว</p>}
        {status === 'error' && <p className="text-sm text-rose-600">❌ {errorMsg}</p>}
      </Card>

      <p className="text-xs text-stone-400">
        ระบบจะส่งอีเมลเตือนวันละครั้งตามช่วงเวลาที่เลือก (เวลาประเทศไทย) คุณสามารถยกเลิกได้ตลอดเวลาจากหน้านี้
      </p>
    </div>
  )
}
