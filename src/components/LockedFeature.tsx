import { Link } from 'react-router-dom'
import { Button, Card } from './ui'

export function LockedFeature({
  title = 'ฟีเจอร์นี้สำหรับสมาชิก',
  description = 'สมัครสมาชิกฟรีเพื่อปลดล็อกบทเรียน แบบทดสอบ เกม และระบบเพื่อน/แรงก์ทั้งหมด',
}: {
  title?: string
  description?: string
}) {
  return (
    <Card className="max-w-lg mx-auto text-center py-10 space-y-3">
      <p className="text-3xl">🔒</p>
      <h2 className="text-lg font-bold text-stone-800">{title}</h2>
      <p className="text-sm text-stone-500">{description}</p>
      <Link to="/login" className="inline-block">
        <Button>สมัครสมาชิกฟรี</Button>
      </Link>
    </Card>
  )
}

export function CheckingAccess() {
  return <div className="text-center text-sm text-stone-400 py-10">กำลังตรวจสอบสิทธิ์การเข้าถึง...</div>
}
