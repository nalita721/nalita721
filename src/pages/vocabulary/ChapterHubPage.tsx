import { Link, Navigate, useParams } from 'react-router-dom'
import { vocabChapters } from '../../data/vocabulary'
import { Card } from '../../components/ui'

const GAMES = [
  { path: 'flashcards', icon: '🗂️', title: 'Flashcard SRS', desc: 'ทบทวนคำศัพท์ตามระบบ Spaced Repetition จำได้จริงในระยะยาว' },
  { path: 'matching', icon: '🧩', title: 'Matching Game', desc: 'จับคู่คำศัพท์กับความหมาย แข่งกับเวลา' },
  { path: 'typing', icon: '⌨️', title: 'Typing Challenge', desc: 'พิมพ์คำศัพท์จากความหมายที่กำหนดให้' },
  { path: 'wordrush', icon: '⚡', title: 'Word Rush', desc: 'ตอบให้เร็วและแม่นที่สุดก่อนเวลาหมด' },
  { path: 'quiz', icon: '📝', title: 'แบบทดสอบท้ายบท', desc: 'ทดสอบความเข้าใจแบบเลือกตอบสไตล์ TOEIC' },
]

export default function ChapterHubPage() {
  const { chapterId } = useParams()
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  if (!chapter) return <Navigate to="/vocabulary" replace />

  return (
    <div className="space-y-6">
      <div>
        <Link to="/vocabulary" className="text-sm text-brand-600 hover:underline">← กลับไปเลือกบท</Link>
        <h1 className="text-2xl font-bold text-slate-800 mt-2">{chapter.titleTh}</h1>
        <p className="text-slate-500 mt-1">{chapter.description} • {chapter.words.length} คำศัพท์</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((g) => (
          <Link key={g.path} to={`/vocabulary/${chapter.id}/${g.path}`}>
            <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
              <div className="text-3xl">{g.icon}</div>
              <h3 className="font-semibold text-slate-800 mt-2">{g.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{g.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
