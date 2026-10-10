import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { iqTestVocab, iqTestQuestions } from '../../data/iqTest'

export default function IQTestHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🧠 IQ Test</h1>
        <p className="text-stone-500 mt-1">แบบทดสอบและคำศัพท์จากเอกสารข้อสอบที่อัปโหลดไว้</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/iq-test/vocab">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <div className="text-3xl">🗂️</div>
            <h2 className="font-semibold text-stone-800 mt-2">ทบทวนคำศัพท์</h2>
            <p className="text-sm text-stone-500 mt-1">{iqTestVocab.length} คำศัพท์ที่ปรากฏในชุดข้อสอบ พร้อมคำอ่าน เคล็ดลับจำ และตัวอย่างประโยค</p>
          </Card>
        </Link>

        <Link to="/iq-test/quiz">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer border-brand-200 bg-brand-50">
            <div className="text-3xl">📝</div>
            <h2 className="font-semibold text-stone-800 mt-2">ทำแบบทดสอบ</h2>
            <p className="text-sm text-stone-500 mt-1">{iqTestQuestions.length} ข้อ ตามเอกสารต้นฉบับ (อ่านป้ายประกาศและตอบสถานการณ์)</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
