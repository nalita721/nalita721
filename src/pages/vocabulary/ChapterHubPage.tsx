import { Link, Navigate, useParams } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { vocabChapters } from '../../data/vocabulary'
import { Card, ProgressBar } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import { getWordSets, isStagePassed, STAGE_DEFS } from '../../data/vocabularyGamePath'

const GAMES = [
  { path: 'quiz', icon: '📝', title: 'แบบทดสอบท้ายบท', desc: 'ทดสอบความเข้าใจแบบเลือกตอบสไตล์ TOEIC' },
]

export default function ChapterHubPage() {
  const { chapterId } = useParams()
  const chapter = vocabChapters.find((c) => c.id === chapterId)
  const srsMap = useProgressStore((s) => s.srsMap)
  const stageResults = useProgressStore((s) => s.wordPathStageResults)
  if (!chapter) return <Navigate to="/vocabulary" replace />

  const learnedCount = chapter.words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
  const sets = getWordSets(chapter)
  const totalStages = sets.length * STAGE_DEFS.length
  const passedStages = sets.reduce(
    (sum, _set, setIndex) => sum + STAGE_DEFS.filter((d) => isStagePassed(stageResults, chapter.id, setIndex, d.stage)).length,
    0,
  )

  return (
    <div className="space-y-6">
      <div>
        <Link to="/vocabulary" className="text-sm text-brand-600 hover:underline">← กลับไปเลือกบท</Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-2">{chapter.titleTh}</h1>
        <p className="text-stone-500 mt-1">{chapter.description} • {chapter.words.length} คำศัพท์</p>
      </div>

      <Link to={`/vocabulary/${chapter.id}/path`}>
        <Card className="bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <h2 className="font-bold text-lg">เส้นทางเกมคำศัพท์</h2>
                <span className="rounded-full bg-white/20 text-xs font-semibold px-2 py-0.5">ใหม่</span>
              </div>
              <p className="text-sm text-white/80 mt-1">เรียนคำศัพท์ทีละ 10 คำ ผ่าน 5 ด่าน ปลดล็อกทีละขั้น พร้อมสะสม XP</p>
            </div>
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>ความคืบหน้า</span>
                <span>{passedStages}/{totalStages} ด่าน</span>
              </div>
              <ProgressBar value={passedStages} max={totalStages} colorClass="bg-white" />
            </div>
          </div>
        </Card>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 content-start">
          {GAMES.map((g) => (
            <Link key={g.path} to={`/vocabulary/${chapter.id}/${g.path}`}>
              <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
                <div className="text-3xl">{g.icon}</div>
                <h3 className="font-semibold text-stone-800 mt-2">{g.title}</h3>
                <p className="text-sm text-stone-500 mt-1">{g.desc}</p>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="lg:col-span-1 flex flex-col max-h-[640px]">
          <h2 className="font-semibold text-stone-800 mb-2">รายการคำศัพท์</h2>
          <div className="flex justify-between text-xs text-stone-500 mb-1">
            <span>ความคืบหน้า</span>
            <span>{learnedCount}/{chapter.words.length} คำ</span>
          </div>
          <ProgressBar value={learnedCount} max={chapter.words.length} />
          <div className="mt-4 overflow-y-auto space-y-1 pr-1">
            {chapter.words.map((w) => {
              const learned = (srsMap[w.id]?.repetitions ?? 0) > 0
              return (
                <div key={w.id} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-sand-50">
                  {learned ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Circle size={16} className="text-sand-300 shrink-0" />
                  )}
                  <span className="text-sm font-medium text-stone-700 shrink-0">{w.term}</span>
                  <span className="text-xs text-stone-400 truncate">{w.meaningTh}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
