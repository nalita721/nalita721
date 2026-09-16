import { Link } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Card } from '../../components/ui'
import { useProgressStore } from '../../store/progress'

export default function GrammarTopicListPage() {
  const stats = useProgressStore((s) => s.partStats.grammar)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Grammar Practice (Part 5 / 6)</h1>
        <p className="text-slate-500 mt-1">
          ฝึกจุดไวยากรณ์ที่ TOEIC ออกสอบซ้ำบ่อยที่สุด พร้อมคำอธิบายทุกข้อ
          {stats.total > 0 && ` • ความแม่นยำสะสม ${Math.round((stats.correct / stats.total) * 100)}%`}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grammarTopics.map((topic) => (
          <Link key={topic.id} to={`/grammar/${topic.id}`}>
            <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
              <h2 className="font-semibold text-slate-800">{topic.titleTh}</h2>
              <p className="text-sm text-slate-500 mt-1">{topic.description}</p>
              <p className="text-xs text-slate-400 mt-3">{topic.questions.length} ข้อฝึกหัด</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
