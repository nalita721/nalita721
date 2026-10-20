import { Link, Navigate } from 'react-router-dom'
import { Check, ChevronRight, Clock } from 'lucide-react'
import { LessonBubbles } from '../../components/LessonBubbles'
import { lessonStatuses, nextLessonIndex, type LessonNode } from '../../lib/miniLesson'
import { LANG_TEST_PASS, langGrammarLessons, langVocabLessons } from '../../data/langLessons'
import { Card } from '../../components/ui'
import { useProgressStore } from '../../store/progress'
import type { LangCode } from '../../lib/langTypes'
import { bestKey, useLangLevel } from './useLangLevel'

function BestBadge({ ratio }: { ratio: number | undefined }) {
  if (ratio === undefined) return null
  const pct = Math.round(ratio * 100)
  return (
    <span
      className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
        ratio >= 0.7 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
      }`}
    >
      {ratio >= 0.7 && <Check size={12} strokeWidth={3} />}
      {pct}%
    </span>
  )
}

export default function LangLevelPage({ lang }: { lang: LangCode }) {
  const { track, meta, content, loading } = useLangLevel(lang)
  const langBest = useProgressStore((s) => s.langBest)
  const passedLessons = useProgressStore((s) => s.passedLessons)

  if (!meta) return <Navigate to={track.path} replace />

  const base = `${track.path}/${meta.slug}`
  const totalQuestions = meta.format.reduce((s, f) => s + f.questions, 0)
  const totalMinutes = meta.format.reduce((s, f) => s + f.minutes, 0)
  const wordCount = content?.chapters.reduce((s, c) => s + c.words.length, 0) ?? 0

  // Each chapter/topic is split into short lessons; its test counts as passed at LANG_TEST_PASS.
  const plan = (nodes: LessonNode[], best: number | undefined) => {
    const statuses = lessonStatuses(nodes, passedLessons, (best ?? 0) >= LANG_TEST_PASS, true)
    return { nodes, statuses }
  }
  const vocabPlans = content?.chapters.map((c) => plan(langVocabLessons(base, lang, meta.slug, c), langBest[bestKey(lang, meta.slug, `v:${c.id}`)])) ?? []
  const grammarPlans = content?.grammar.map((g) => plan(langGrammarLessons(base, lang, meta.slug, g), langBest[bestKey(lang, meta.slug, `g:${g.id}`)])) ?? []
  // continue a chapter already started, otherwise start the first unfinished one
  const allPlans = [...vocabPlans, ...grammarPlans]
  const unfinished = allPlans.filter((p) => p.statuses.some((st) => st !== 'passed'))
  const startedFirst = unfinished.find((p) => p.statuses.some((st) => st === 'passed'))
  const resumePlan = startedFirst ?? unfinished[0]
  const resumeNode = resumePlan?.nodes[nextLessonIndex(resumePlan.statuses)]

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <Link to={track.path} className="text-sm text-brand-600 hover:underline">
        ← {track.flag} {track.nameTh}
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">{track.examName}</p>
        <h1 className="text-2xl font-extrabold text-stone-800">
          {meta.code} · {meta.nameTh}
        </h1>
        <p className="mt-1 text-stone-500">{meta.summaryTh}</p>
      </div>

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold text-stone-800">📋 รูปแบบข้อสอบจริง</h2>
          <span className="flex items-center gap-1 text-xs text-stone-500">
            <Clock size={14} /> {totalQuestions} ข้อ · ประมาณ {totalMinutes} นาที
          </span>
        </div>
        <div className="divide-y divide-sand-100">
          {meta.format.map((f) => (
            <div key={f.sectionTh} className="flex items-start justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-800">{f.sectionTh}</p>
                <p className="text-xs text-stone-500">{f.detailTh}</p>
              </div>
              <p className="shrink-0 text-right text-xs text-stone-500">
                {f.questions} ข้อ
                <br />
                {f.minutes} นาที
              </p>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-sand-50 px-3 py-2 text-xs text-stone-600">🎯 เกณฑ์ผ่าน: {meta.passTh}</p>
      </Card>

      {!meta.load && (
        <Card className="border-amber-200 bg-amber-50 text-center">
          <p className="text-2xl">🚧</p>
          <p className="mt-1 font-semibold text-stone-800">เนื้อหา {meta.code} กำลังจัดทำ</p>
          <p className="text-sm text-stone-500">
            ระดับนี้ใช้คำศัพท์สะสม {meta.examWords.toLocaleString()} คำ — ระหว่างนี้เรียนระดับก่อนหน้าให้แน่นก่อนได้เลย
          </p>
        </Card>
      )}

      {loading && <p className="py-10 text-center text-stone-400">กำลังโหลดเนื้อหา…</p>}

      {content && (
        <>
          {resumeNode && (
            <Link
              to={resumeNode.to}
              className="flex items-center gap-3 rounded-2xl bg-brand-600 px-5 py-4 text-white shadow-[0_5px_0] shadow-brand-800 transition active:translate-y-1 active:shadow-none"
            >
              <span className="text-2xl">▶</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold opacity-80">{startedFirst ? 'เรียนต่อจากที่ค้างไว้' : 'เริ่มเรียน'}</p>
                <p className="truncate font-bold">
                  {resumeNode.kind === 'test' ? '📝 ' : ''}
                  {resumeNode.titleTh} · ≈ {resumeNode.minutes} นาที
                </p>
              </div>
              <ChevronRight className="shrink-0" />
            </Link>
          )}

          <section className="space-y-3">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-stone-800">📚 คำศัพท์ ({wordCount} คำ)</h2>
              {lang === 'ja' && (
                <Link to={`${base}/kanji`} className="text-sm font-semibold text-pink-600 hover:underline">
                  คันจิ {meta.code} →
                </Link>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.chapters.map((c, i) => (
                <Card key={c.id} className="space-y-3">
                  <Link to={`${base}/vocab/${c.id}`} className="flex items-center gap-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-stone-800">{c.titleTh}</p>
                      <p className="text-xs text-stone-500">{c.words.length} คำ · Flashcard ทั้งบท →</p>
                    </div>
                    <BestBadge ratio={langBest[bestKey(lang, meta.slug, `v:${c.id}`)]} />
                  </Link>
                  <LessonBubbles nodes={vocabPlans[i].nodes} statuses={vocabPlans[i].statuses} />
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-bold text-stone-800">✍️ ไวยากรณ์ ({content.grammar.length} หัวข้อ)</h2>
            <div className="space-y-2">
              {content.grammar.map((g, i) => (
                <Card key={g.id} className="space-y-3">
                  <Link to={`${base}/grammar/${g.id}`} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-stone-500">
                      {i + 1}
                    </span>
                    <span className="text-xl">{g.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-stone-800">{g.titleTh}</p>
                      <p className="truncate text-xs text-stone-500">{g.description}</p>
                    </div>
                    <BestBadge ratio={langBest[bestKey(lang, meta.slug, `g:${g.id}`)]} />
                  </Link>
                  <LessonBubbles nodes={grammarPlans[i].nodes} statuses={grammarPlans[i].statuses} />
                </Card>
              ))}
            </div>
          </section>

          <Link to={`${base}/mock`} className="block">
            <Card className="flex items-center gap-4 border-2 border-brand-200 bg-brand-50 transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-3xl">🏆</span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-stone-800">ข้อสอบจำลอง {meta.code}</p>
                <p className="text-sm text-stone-500">
                  {content.mock.sections.reduce((s, sec) => s + sec.questions.length, 0)} ข้อ · {content.mock.minutes} นาที ·
                  รูปแบบเดียวกับข้อสอบจริง
                </p>
              </div>
              <BestBadge ratio={langBest[bestKey(lang, meta.slug, 'mock')]} />
              <ChevronRight className="shrink-0 text-stone-300" />
            </Card>
          </Link>
        </>
      )}
    </div>
  )
}
