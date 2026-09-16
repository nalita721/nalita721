import { Link } from 'react-router-dom'
import { listeningByPart } from '../../data/listening'
import { Card } from '../../components/ui'
import { isTtsSupported } from '../../lib/tts'
import { useAuthStore } from '../../store/auth'
import { isListeningPartFree } from '../../lib/access'

const PARTS = [
  { part: 1 as const, title: 'Part 1: Photographs', desc: 'ฟังประโยคบรรยายภาพ 4 ตัวเลือก แล้วเลือกข้อที่ตรงกับภาพ' },
  { part: 2 as const, title: 'Part 2: Question-Response', desc: 'ฟังคำถามแล้วเลือกคำตอบที่เหมาะสมที่สุดจาก 3 ตัวเลือก' },
  { part: 3 as const, title: 'Part 3: Conversations', desc: 'ฟังบทสนทนาสั้นๆ แล้วตอบคำถามเกี่ยวกับเนื้อหา' },
  { part: 4 as const, title: 'Part 4: Talks', desc: 'ฟังประกาศ/สุนทรพจน์สั้นๆ แล้วตอบคำถาม' },
]

export default function ListeningPartListPage() {
  const authStatus = useAuthStore((s) => s.status)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Listening Practice</h1>
        <p className="text-stone-500 mt-1">
          ฝึกฟังทั้ง 4 Part ด้วยเสียงสังเคราะห์ในเบราว์เซอร์ (รองรับสำเนียง US/UK/AU/CA) — ลองฟรีได้ที่ Part 1
        </p>
        {!isTtsSupported() && (
          <p className="mt-2 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง (Web Speech API) — บทฝึกยังใช้งานได้แต่จะไม่มีเสียง
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PARTS.map((p) => {
          const locked = authStatus !== 'authenticated' && !isListeningPartFree(String(p.part))
          return (
            <Link key={p.part} to={`/listening/${p.part}`}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-stone-800">{p.title}</h2>
                  {locked && <span title="สำหรับสมาชิก">🔒</span>}
                </div>
                <p className="text-sm text-stone-500 mt-1">{p.desc}</p>
                <p className="text-xs text-stone-400 mt-3">{listeningByPart(p.part).length} ข้อฝึกหัด</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
