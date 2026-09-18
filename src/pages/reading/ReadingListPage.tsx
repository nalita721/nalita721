import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, FileText, Home, Mail, Target, TrendingUp } from 'lucide-react'
import { readingPassages } from '../../data/reading'
import { Card, ProgressBar } from '../../components/ui'
import { PageHero } from '../../components/PageHero'
import { useAuthStore } from '../../store/auth'
import { useProgressStore } from '../../store/progress'
import { isReadingPassageFree } from '../../lib/access'
import { getEffectivePathIndex, isStepUnlocked, pathStepKey, stepIndexOfContent } from '../../data/learningPath'
import type { Difficulty } from '../../lib/types'

const DIFFICULTY_META: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'bg-emerald-100 text-emerald-700' },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-700' },
  hard: { label: 'Hard', className: 'bg-rose-100 text-rose-700' },
}

const PART_META = {
  6: { title: 'Part 6: Text Completion', desc: 'เติมคำในช่องว่างให้ถูกต้อง จากบทความหลากหลายหัวข้อ', icon: Mail },
  7: { title: 'Part 7: Single Passage', desc: 'อ่านบทความยาวและตอบคำถามจากข้อมูล', icon: FileText },
} as const

export default function ReadingListPage() {
  const authStatus = useAuthStore((s) => s.status)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  const readingStats = useProgressStore((s) => s.partStats.reading)
  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelCefr)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1.5 text-xs text-stone-400">
        <Home size={14} />
        <ChevronRight size={12} />
        <span>อ่าน</span>
        <ChevronRight size={12} />
        <span className="text-stone-600 font-medium">Reading Practice</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Reading Practice (Part 6 / 7)</h1>
          <p className="text-stone-500 mt-1">ฝึกเติมข้อความและอ่านจับใจความจากบทความสไตล์ TOEIC (ลองฟรีได้ที่บทแรก)</p>
          <p className="italic text-stone-400 text-sm mt-2">"Practice reading, expand your opportunities."</p>
        </div>
        <PageHero
          lines={['Read', 'Understand', 'Achieve']}
          note="Better English A Brighter You"
          icon={BookOpen}
          gradient="from-sky-100 via-sky-50 to-amber-50"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {([6, 7] as const).map((part) => {
          const Icon = PART_META[part].icon
          return (
            <a
              key={part}
              href={`#part-${part}`}
              className="flex items-center gap-2 rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 hover:border-brand-400 hover:shadow-sm transition"
            >
              <Icon size={16} className="text-brand-600" />
              Part {part}
              <span className="text-xs text-stone-400">{part === 6 ? 'เติมข้อความในบทความ' : 'อ่านจับใจความ'}</span>
            </a>
          )
        })}
      </div>

      {([6, 7] as const).map((part) => {
        const meta = PART_META[part]
        const passages = readingPassages.filter((p) => p.part === part)
        return (
          <div key={part} id={`part-${part}`} className="scroll-mt-20">
            <div className="flex items-end justify-between mb-1">
              <h2 className="font-semibold text-stone-800">{meta.title}</h2>
            </div>
            <p className="text-sm text-stone-500 mb-3">{meta.desc}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {passages.map((p) => {
                const locked =
                  authStatus === 'authenticated'
                    ? !isStepUnlocked('reading', p.id, effectiveIndex)
                    : !isReadingPassageFree(p.id)
                const isCurrent = authStatus === 'authenticated' && stepIndexOfContent('reading', p.id) === effectiveIndex
                const isPassed = pathPassedSteps.includes(pathStepKey('reading', p.id))
                const diff = DIFFICULTY_META[p.difficulty]
                return (
                  <Link key={p.id} to={`/reading/${p.id}`}>
                    <Card
                      className={`h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer ${isCurrent ? 'ring-2 ring-brand-400' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-1">Part {p.part}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          {isPassed && <span title="ผ่านแล้ว">✅</span>}
                          {locked && <span title={authStatus === 'authenticated' ? 'ยังไม่ถึงคิว' : 'สำหรับสมาชิก'}>🔒</span>}
                        </div>
                      </div>
                      <h3 className="font-semibold text-stone-800 mt-2">{p.title.split('— ')[1] ?? p.title}</h3>
                      <p className="text-xs text-stone-400 mt-1">{p.part === 6 ? 'เติมคำในช่องว่างให้ถูกต้อง' : 'อ่านและตอบคำถามจากบทความ'}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-stone-400">{p.questions.length} คำถาม</span>
                        <span className={`rounded-full text-xs font-semibold px-2 py-0.5 ${diff.className}`}>{diff.label}</span>
                      </div>
                      <span
                        className={`block text-center mt-3 rounded-xl px-4 py-2 text-sm font-medium ${
                          locked ? 'bg-sand-100 text-stone-400' : 'bg-brand-600 text-white'
                        }`}
                      >
                        {locked ? 'ยังไม่เริ่ม' : 'เริ่มทำแบบฝึกหัด →'}
                      </span>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}

      <Card className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600 shrink-0">
            <Target size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-stone-800">เป้าหมายของคุณ</p>
            <p className="text-xs text-stone-400">ฝึกให้ครบทุกหัวข้อ แล้วคุณจะอ่านได้เร็วและแม่นยำขึ้น!</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-800 mb-1">ความคืบหน้า Reading (Part 6 / 7)</p>
          <ProgressBar value={readingStats.correct} max={Math.max(readingStats.total, 1)} />
          <p className="text-xs text-stone-400 mt-1">{readingStats.correct} / {readingStats.total}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <TrendingUp size={18} />
          </span>
          <p className="text-sm text-stone-600">ยิ่งฝึกมาก ยิ่งมั่นใจในสนามจริง</p>
        </div>
      </Card>
    </div>
  )
}
