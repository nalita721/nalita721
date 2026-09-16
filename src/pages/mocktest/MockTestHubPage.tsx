import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { FULL_EXAM_READING_COUNT, FULL_EXAM_LISTENING_COUNT, FULL_EXAM_TOTAL_COUNT } from '../../data/fullMockExam'
import { mockTestQuestions, MOCK_TEST_DURATION_SEC } from '../../data/mockTest'

export default function MockTestHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mock Test</h1>
        <p className="text-slate-500 mt-1">เลือกรูปแบบข้อสอบจำลองที่เหมาะกับเวลาที่คุณมี</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/mock-test/mini">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <span className="text-3xl">⚡</span>
            <h2 className="font-semibold text-slate-800 mt-2">Mini Mock Test</h2>
            <p className="text-sm text-slate-500 mt-1">
              {mockTestQuestions.length} ข้อ • {MOCK_TEST_DURATION_SEC / 60} นาที — เหมาะสำหรับฝึกช่วงสั้นๆ ระหว่างวัน
            </p>
          </Card>
        </Link>

        <Link to="/mock-test/full">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <span className="text-3xl">🏆</span>
            <h2 className="font-semibold text-slate-800 mt-2">Full Mock Test (เต็มรูปแบบ)</h2>
            <p className="text-sm text-slate-500 mt-1">
              {FULL_EXAM_TOTAL_COUNT} ข้อ (Listening {FULL_EXAM_LISTENING_COUNT} + Reading {FULL_EXAM_READING_COUNT}) • 120 นาที —
              จำลองโครงสร้างข้อสอบ TOEIC จริงครบทั้ง 7 Part
            </p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
