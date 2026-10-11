import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { chineseVocabChapters, chineseGrammarTopics } from '../../data/chineseContent'

export default function ChineseHubPage() {
  const chapter = chineseVocabChapters[0]
  const topic = chineseGrammarTopics[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🇨🇳 ภาษาจีน (HSK)</h1>
        <p className="text-stone-500 mt-1">เรียนภาษาจีนเพื่อการสื่อสาร เตรียมพร้อมสำหรับข้อสอบ HSK</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/chinese/vocabulary">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <div className="text-3xl">📚</div>
            <h2 className="font-semibold text-stone-800 mt-2">คำศัพท์ {chapter.hskLevel}</h2>
            <p className="text-sm text-stone-500 mt-1">{chapter.titleTh} • {chapter.words.length} คำ พร้อมพินอิน เคล็ดลับจำ และตัวอย่างประโยค</p>
          </Card>
        </Link>

        <Link to="/chinese/grammar">
          <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
            <div className="text-3xl">✍️</div>
            <h2 className="font-semibold text-stone-800 mt-2">ไวยากรณ์พื้นฐาน</h2>
            <p className="text-sm text-stone-500 mt-1">{topic.titleTh} • บทเรียนพร้อมแบบฝึกหัด {topic.questions.length} ข้อ</p>
          </Card>
        </Link>
      </div>

      <Card className="text-center py-6 bg-sand-50 border-sand-100">
        <p className="text-xs text-stone-400">
          เวอร์ชันแรก: ครอบคลุมระดับ HSK 1 พื้นฐาน — จะทยอยเพิ่มคำศัพท์และหัวข้อไวยากรณ์ระดับสูงขึ้นในเวอร์ชันถัดไป
        </p>
      </Card>
    </div>
  )
}
