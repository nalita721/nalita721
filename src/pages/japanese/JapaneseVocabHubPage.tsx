import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { japaneseVocabChapters } from '../../data/japaneseContent'

export default function JapaneseVocabHubPage() {
  const chapter = japaneseVocabChapters[0]

  return (
    <div className="space-y-6">
      <div>
        <Link to="/japanese" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">{chapter.titleTh}</h1>
        <p className="text-stone-500 mt-1">{chapter.description} • {chapter.words.length} คำศัพท์</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/japanese/vocabulary/flashcards">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <div className="text-3xl">🗂️</div>
            <h2 className="font-semibold text-stone-800 mt-2">Flashcard</h2>
            <p className="text-sm text-stone-500 mt-1">ทบทวนคำศัพท์ทีละคำ พร้อมโรมาจิ เสียงอ่าน และตัวอย่างประโยค</p>
          </Card>
        </Link>

        <Link to="/japanese/vocabulary/quiz">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer border-brand-200 bg-brand-50">
            <div className="text-3xl">📝</div>
            <h2 className="font-semibold text-stone-800 mt-2">แบบทดสอบ</h2>
            <p className="text-sm text-stone-500 mt-1">เลือกความหมายที่ถูกต้องของคำศัพท์ {chapter.words.length} ข้อ</p>
          </Card>
        </Link>
      </div>

      <Card>
        <h3 className="font-semibold text-stone-800 mb-3">รายการคำศัพท์</h3>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {chapter.words.map((w) => (
            <div key={w.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-sand-50">
              <span className="text-base font-medium text-stone-700 shrink-0">{w.term}</span>
              <span className="text-xs text-stone-400 shrink-0">{w.romaji}</span>
              <span className="text-xs text-stone-400 truncate">{w.meaningTh}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
