import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { EXAM_SETS } from '../../data/examSets'
import { mockTestQuestions, MOCK_TEST_DURATION_SEC } from '../../data/mockTest'
import { LEVEL_TEST_TOTAL_QUESTIONS, LEVEL_TEST_DURATION_SEC } from '../../data/levelTest'

export default function MockTestHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Mock Test</h1>
        <p className="text-stone-500 mt-1">เลือกรูปแบบข้อสอบจำลองที่เหมาะกับเวลาที่คุณมี</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/level-test">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer border-brand-200 bg-brand-50">
            <span className="text-3xl">🌐</span>
            <h2 className="font-semibold text-stone-800 mt-2">แบบทดสอบวัดระดับ (CEFR)</h2>
            <p className="text-sm text-stone-500 mt-1">
              {LEVEL_TEST_TOTAL_QUESTIONS} ข้อ • {LEVEL_TEST_DURATION_SEC / 60} นาที — รู้ระดับภาษาของตัวเองตามมาตรฐานสากล A1–C1
            </p>
          </Card>
        </Link>

        <Link to="/mock-test/mini">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <span className="text-3xl">⚡</span>
            <h2 className="font-semibold text-stone-800 mt-2">Mini Mock Test</h2>
            <p className="text-sm text-stone-500 mt-1">
              {mockTestQuestions.length} ข้อ • {MOCK_TEST_DURATION_SEC / 60} นาที — เหมาะสำหรับฝึกช่วงสั้นๆ ระหว่างวัน
            </p>
          </Card>
        </Link>
      </div>

      <div>
        <h2 className="font-semibold text-stone-800 mb-1">🏆 Full Mock Test (เต็มรูปแบบ)</h2>
        <p className="text-sm text-stone-500 mb-3">จำลองโครงสร้างข้อสอบ TOEIC จริงครบทั้ง 7 Part มี 3 ชุด เนื้อหาไม่ซ้ำกัน ลองทำได้ทุกชุด</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {EXAM_SETS.map((set) => (
            <Link key={set.id} to={`/mock-test/full/${set.id}`}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                <span className="text-3xl">🏆</span>
                <h3 className="font-semibold text-stone-800 mt-2">Full Mock Test — {set.label}</h3>
                <p className="text-sm text-stone-500 mt-1">
                  {set.totalCount} ข้อ (Listening {set.listeningCount} + Reading {set.readingCount}) • {set.durationSec / 60} นาที
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
