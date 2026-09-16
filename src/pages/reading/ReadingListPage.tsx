import { Link } from 'react-router-dom'
import { readingPassages } from '../../data/reading'
import { Card } from '../../components/ui'
import { useAuthStore } from '../../store/auth'
import { isReadingPassageFree } from '../../lib/access'

export default function ReadingListPage() {
  const authStatus = useAuthStore((s) => s.status)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Reading Practice (Part 6 / 7)</h1>
        <p className="text-stone-500 mt-1">ฝึกเติมข้อความและอ่านจับใจความจากบทความสไตล์ TOEIC (ลองฟรีได้ที่บทแรก)</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {readingPassages.map((p) => {
          const locked = authStatus !== 'authenticated' && !isReadingPassageFree(p.id)
          return (
            <Link key={p.id} to={`/reading/${p.id}`}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-brand-600">Part {p.part}</span>
                  {locked && <span title="สำหรับสมาชิก">🔒</span>}
                </div>
                <h2 className="font-semibold text-stone-800 mt-1">{p.title}</h2>
                <p className="text-xs text-stone-400 mt-3">{p.questions.length} คำถาม</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
