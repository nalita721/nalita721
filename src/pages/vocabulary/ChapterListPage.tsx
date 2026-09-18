import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building,
  Building2,
  CheckCircle2,
  ChevronRight,
  Home,
  LayoutGrid,
  List,
  Lock,
  Landmark,
  Megaphone,
  MessageSquare,
  Plane,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { vocabChapters } from '../../data/vocabulary'
import { Card, ProgressBar } from '../../components/ui'
import { PageHero } from '../../components/PageHero'
import { useProgressStore } from '../../store/progress'
import { useAuthStore } from '../../store/auth'
import { CEFR_LEVELS } from '../../data/cefr'
import { isVocabChapterFree } from '../../lib/access'
import { getEffectivePathIndex, isStepUnlocked, pathStepKey, stepIndexOfContent } from '../../data/learningPath'

const CHAPTER_ICON: Record<string, LucideIcon> = {
  'office-hr': Building2,
  meetings: Users,
  travel: Plane,
  finance: Landmark,
  marketing: Megaphone,
  'advanced-business': Building,
  communication: MessageSquare,
}

const CHAPTER_NUMBER: Record<string, number> = Object.fromEntries(vocabChapters.map((c, i) => [c.id, i + 1]))

type Bucket = 'all' | 'notStarted' | 'inProgress' | 'completed'
const BUCKET_LABEL: Record<Bucket, string> = {
  all: 'ทั้งหมด',
  notStarted: 'ยังไม่เริ่ม',
  inProgress: 'กำลังเรียน',
  completed: 'เรียนจบ',
}

type SortMode = 'order' | 'alpha'

const cefrSortedChapters = [...vocabChapters].sort(
  (a, b) => CEFR_LEVELS.findIndex((l) => l.code === a.cefrLevel) - CEFR_LEVELS.findIndex((l) => l.code === b.cefrLevel),
)

export default function ChapterListPage() {
  const srsMap = useProgressStore((s) => s.srsMap)
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const pathPassedSteps = useProgressStore((s) => s.pathPassedSteps)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  const authStatus = useAuthStore((s) => s.status)
  const effectiveIndex = getEffectivePathIndex(pathUnlockedIndex, levelCefr)

  const [filter, setFilter] = useState<Bucket>('all')
  const [sortMode, setSortMode] = useState<SortMode>('order')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const chapters = useMemo(() => {
    return cefrSortedChapters.map((chapter) => {
      const learned = chapter.words.filter((w) => (srsMap[w.id]?.repetitions ?? 0) > 0).length
      const total = chapter.words.length
      const bucket: Bucket = learned === 0 ? 'notStarted' : learned >= total ? 'completed' : 'inProgress'
      const level = CEFR_LEVELS.find((l) => l.code === chapter.cefrLevel)!
      const locked =
        authStatus === 'authenticated'
          ? !isStepUnlocked('vocabulary', chapter.id, effectiveIndex)
          : !isVocabChapterFree(chapter.id)
      const isCurrent = authStatus === 'authenticated' && stepIndexOfContent('vocabulary', chapter.id) === effectiveIndex
      const isPassed = pathPassedSteps.includes(pathStepKey('vocabulary', chapter.id))
      return { chapter, learned, total, bucket, level, locked, isCurrent, isPassed }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srsMap, authStatus, effectiveIndex, pathPassedSteps])

  const counts: Record<Bucket, number> = {
    all: chapters.length,
    notStarted: chapters.filter((c) => c.bucket === 'notStarted').length,
    inProgress: chapters.filter((c) => c.bucket === 'inProgress').length,
    completed: chapters.filter((c) => c.bucket === 'completed').length,
  }

  const visible = chapters
    .filter((c) => filter === 'all' || c.bucket === filter)
    .sort((a, b) => (sortMode === 'alpha' ? a.chapter.titleTh.localeCompare(b.chapter.titleTh, 'th') : 0))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1.5 text-xs text-stone-400">
        <Home size={14} />
        <ChevronRight size={12} />
        <span className="text-stone-600 font-medium">คำศัพท์</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px] items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">คลังคำศัพท์ TOEIC</h1>
          <p className="text-stone-500 mt-1">เลือกบทที่ต้องการฝึก แต่ละบทมีคำศัพท์ตามหัวข้อที่ออกสอบบ่อย (ลองฟรีได้ที่บทที่ 1)</p>
          <p className="italic text-stone-400 text-sm mt-2">"Better Vocabulary, A Brighter You."</p>
        </div>
        <PageHero
          lines={['Learn', 'Practice', 'Progress', 'A Brighter You']}
          note="Good English Good Life"
          icon={Building2}
          gradient="from-amber-100 via-orange-50 to-sky-50"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(BUCKET_LABEL) as Bucket[]).map((b) => (
            <button
              key={b}
              onClick={() => setFilter(b)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filter === b ? 'bg-sand-900 text-white' : 'bg-white border border-sand-200 text-stone-600 hover:border-brand-400'
              }`}
            >
              {BUCKET_LABEL[b]} ({counts[b]})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-sm text-stone-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="order">เรียงตามลำดับบทเรียน</option>
            <option value="alpha">เรียงตามชื่อ ก-ฮ</option>
          </select>
          <div className="flex rounded-xl border border-sand-200 bg-white overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 transition ${view === 'grid' ? 'bg-sand-900 text-white' : 'text-stone-400 hover:text-stone-700'}`}
              aria-label="มุมมองตาราง"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 transition ${view === 'list' ? 'bg-sand-900 text-white' : 'text-stone-400 hover:text-stone-700'}`}
              aria-label="มุมมองรายการ"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-3'}>
        {visible.map(({ chapter, learned, total, level, locked, isCurrent }) => {
          const Icon = CHAPTER_ICON[chapter.id] ?? Building2
          const number = CHAPTER_NUMBER[chapter.id]
          const statusIcon = locked ? (
            <Lock size={14} style={{ color: level.color }} />
          ) : (
            <CheckCircle2 size={16} className="text-emerald-600" />
          )
          const ctaLabel = locked ? 'ยังไม่เริ่ม' : learned === 0 ? 'เริ่มเรียน' : learned >= total ? 'ทบทวนอีกครั้ง' : 'เริ่มเรียนต่อ'

          if (view === 'list') {
            return (
              <Link key={chapter.id} to={`/vocabulary/${chapter.id}`}>
                <Card
                  className={`flex items-center gap-4 hover:shadow-md transition cursor-pointer ${isCurrent ? 'ring-2 ring-brand-400' : ''}`}
                >
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{ backgroundColor: level.bgColor, color: level.color }}
                  >
                    <Icon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-400">{number}</span>
                      <h2 className="font-semibold text-stone-800 truncate">{chapter.titleTh}</h2>
                      {statusIcon}
                      <span
                        className="rounded-full text-xs font-semibold px-2 py-0.5 shrink-0"
                        style={{ backgroundColor: level.bgColor, color: level.color }}
                      >
                        {level.code}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">ความคืบหน้า {learned}/{total} คำ</p>
                  </div>
                  <div className="w-32 shrink-0 hidden sm:block">
                    <ProgressBar value={learned} max={total} />
                  </div>
                  <span
                    className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium ${
                      locked ? 'bg-sand-100 text-stone-400' : 'bg-brand-600 text-white'
                    }`}
                  >
                    {ctaLabel}
                  </span>
                </Card>
              </Link>
            )
          }

          return (
            <Link key={chapter.id} to={`/vocabulary/${chapter.id}`}>
              <Card
                className={`h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer ${isCurrent ? 'ring-2 ring-brand-400' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                    style={{ backgroundColor: level.bgColor, color: level.color }}
                  >
                    <Icon size={20} />
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    {statusIcon}
                    <span
                      className="rounded-full text-xs font-semibold px-2 py-0.5"
                      style={{ backgroundColor: level.bgColor, color: level.color }}
                    >
                      {level.code}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="text-xs font-bold text-stone-400">{number}</span>
                  <h2 className="font-semibold text-stone-800">{chapter.titleTh}</h2>
                </div>
                <p className="text-sm text-stone-500 mt-1">{chapter.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>ความคืบหน้า</span>
                    <span>{learned}/{total} คำ</span>
                  </div>
                  <ProgressBar value={learned} max={total} />
                </div>
                <span
                  className={`block text-center mt-4 rounded-xl px-4 py-2 text-sm font-medium ${
                    locked ? 'bg-sand-100 text-stone-400' : 'bg-brand-600 text-white'
                  }`}
                >
                  {ctaLabel} {!locked && '→'}
                </span>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card className="text-center py-8 bg-sand-50 border-sand-100">
        <p className="italic text-stone-500 text-sm sm:text-base">"Discipline today creates the result you want tomorrow."</p>
        <p className="text-xs text-stone-400 mt-2">เรียนคำศัพท์อย่างสม่ำเสมอ เพื่อเป้าหมาย TOEIC 800+</p>
      </Card>
    </div>
  )
}
