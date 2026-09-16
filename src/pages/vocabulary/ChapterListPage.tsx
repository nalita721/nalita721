import { Link } from 'react-router-dom'
import { vocabChapters } from '../../data/vocabulary'
import { Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'

export default function ChapterListPage() {
  const srsMap = useProgressStore((s) => s.srsMap)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">คลังคำศัพท์ TOEIC</h1>
        <p className="text-slate-500 mt-1">เลือกบทที่ต้องการฝึก แต่ละบทมีคำศัพท์ตามหัวข้อที่ออกสอบบ่อย</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vocabChapters.map((chapter) => {
          const learned = chapter.words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
          return (
            <Link key={chapter.id} to={`/vocabulary/${chapter.id}`}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                <h2 className="font-semibold text-slate-800">{chapter.titleTh}</h2>
                <p className="text-sm text-slate-500 mt-1">{chapter.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>ความคืบหน้า</span>
                    <span>{learned}/{chapter.words.length} คำ</span>
                  </div>
                  <ProgressBar value={learned} max={chapter.words.length} />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
