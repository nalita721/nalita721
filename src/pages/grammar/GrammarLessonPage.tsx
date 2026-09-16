import { Link, Navigate, useParams } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Button, Card } from '../../components/ui'

export default function GrammarLessonPage() {
  const { topicId } = useParams()
  const topic = grammarTopics.find((t) => t.id === topicId)
  if (!topic) return <Navigate to="/grammar" replace />

  const { lesson } = topic

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link to="/grammar" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">
          {lesson.emoji} {topic.titleTh}
        </h1>
      </div>

      <Card className="bg-brand-50 border-brand-200">
        <p className="text-stone-700 leading-relaxed">{lesson.introTh}</p>
      </Card>

      <div className="space-y-3">
        {lesson.keyPoints.map((kp, i) => (
          <Card key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <h3 className="font-semibold text-stone-800">{kp.label}</h3>
            </div>
            <p className="text-sm text-stone-600">{kp.explanation}</p>
            <div className="bg-sand-50 border border-sand-200 rounded-lg px-3 py-2 space-y-0.5">
              <p className="text-sm text-stone-800 italic">"{kp.exampleEn}"</p>
              <p className="text-xs text-stone-500">{kp.exampleTh}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-amber-50 border-amber-200">
        <p className="text-sm text-stone-700">
          <span className="font-semibold">💡 {lesson.tipTh}</span>
        </p>
      </Card>

      <Link to={`/grammar/${topic.id}/practice`}>
        <Button className="w-full">เริ่มฝึกหัด {topic.questions.length} ข้อ →</Button>
      </Link>
    </div>
  )
}
