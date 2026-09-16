import { Link } from 'react-router-dom'
import { allWords } from '../data/vocabulary'
import { Badge, Button, Card, ProgressBar } from '../components/ui'
import { useProgressStore } from '../store/progress'
import { isDue } from '../lib/srs'
import type { PartStat, StatPart } from '../lib/types'

const PART_LABELS: Record<StatPart, string> = {
  vocabulary: 'คำศัพท์',
  grammar: 'ไวยากรณ์',
  listening: 'การฟัง',
  reading: 'การอ่าน',
  mock: 'Mock Test',
}

function accuracy(stat: PartStat) {
  return stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : null
}

export default function DashboardPage() {
  const xp = useProgressStore((s) => s.xp)
  const streak = useProgressStore((s) => s.streak)
  const srsMap = useProgressStore((s) => s.srsMap)
  const partStats = useProgressStore((s) => s.partStats)
  const mockResults = useProgressStore((s) => s.mockResults)

  const words = allWords()
  const dueCount = words.filter((w) => isDue(srsMap[w.id] ?? { wordId: w.id, interval: 0, ease: 2.5, repetitions: 0, dueDate: new Date(0).toISOString() })).length
  const learnedCount = words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
  const lastMock = mockResults[mockResults.length - 1]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">สวัสดี! พร้อมฝึกสอบ TOEIC วันนี้หรือยัง</h1>
        <p className="text-slate-500 mt-1">ติดตามความคืบหน้าและฝึกฝนต่อเนื่องเพื่อผลลัพธ์ที่ดีที่สุด</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Streak ต่อเนื่อง</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">🔥 {streak} วัน</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">คะแนนสะสม (XP)</p>
          <p className="text-3xl font-bold text-brand-600 mt-1">⭐ {xp}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">คำศัพท์ที่จำได้แล้ว</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{learnedCount}/{words.length}</p>
        </Card>
      </div>

      {dueCount > 0 && (
        <Card className="flex items-center justify-between flex-wrap gap-3 bg-brand-50 border-brand-200">
          <div>
            <p className="font-semibold text-slate-800">มีคำศัพท์ {dueCount} คำถึงเวลาทบทวนแล้ว</p>
            <p className="text-sm text-slate-500">ทบทวนตอนนี้เพื่อไม่ให้ลืม (Spaced Repetition)</p>
          </div>
          <Link to="/vocabulary">
            <Button>ไปทบทวนเลย</Button>
          </Link>
        </Card>
      )}

      <div>
        <h2 className="font-semibold text-slate-800 mb-3">ความแม่นยำแยกตามทักษะ</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(PART_LABELS) as StatPart[])
            .filter((k) => k !== 'mock')
            .map((key) => {
              const stat = partStats[key]
              const acc = accuracy(stat)
              return (
                <Card key={key}>
                  <p className="text-sm text-slate-500">{PART_LABELS[key]}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{acc === null ? '—' : `${acc}%`}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.total} ข้อที่ทำแล้ว</p>
                  {acc !== null && <ProgressBar value={acc} max={100} colorClass={acc >= 70 ? 'bg-emerald-500' : 'bg-amber-500'} />}
                </Card>
              )
            })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-slate-800 mb-2">ผล Mock Test ล่าสุด</h2>
          {lastMock ? (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-brand-600">{lastMock.totalScore} / 990</p>
              <div className="flex gap-4 text-sm text-slate-600">
                <span>Listening {lastMock.listeningScore}</span>
                <span>Reading {lastMock.readingScore}</span>
              </div>
              <Badge>{new Date(lastMock.date).toLocaleDateString('th-TH')}</Badge>
            </div>
          ) : (
            <p className="text-sm text-slate-500">ยังไม่เคยทำ Mock Test ลองทำดูเพื่อประเมินระดับปัจจุบัน</p>
          )}
          <Link to="/mock-test" className="inline-block mt-4">
            <Button variant="secondary">{lastMock ? 'ทำ Mock Test อีกครั้ง' : 'เริ่ม Mock Test'}</Button>
          </Link>
        </Card>

        <Card>
          <h2 className="font-semibold text-slate-800 mb-3">เมนูฝึกฝน</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/vocabulary"><Button variant="ghost" className="w-full justify-start">📚 คำศัพท์รายบท</Button></Link>
            <Link to="/grammar"><Button variant="ghost" className="w-full justify-start">✍️ ฝึกไวยากรณ์</Button></Link>
            <Link to="/listening"><Button variant="ghost" className="w-full justify-start">🎧 ฝึกฟัง</Button></Link>
            <Link to="/reading"><Button variant="ghost" className="w-full justify-start">📝 ฝึกอ่าน</Button></Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
