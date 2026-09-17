import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Button, Card } from '../../components/ui'
import { CEFR_LEVELS } from '../../data/cefr'
import { speak } from '../../lib/tts'
import type { CefrCode } from '../../lib/types'

const LEVEL_GRADIENT: Record<CefrCode, string> = {
  A1: 'from-amber-400 to-amber-600',
  A2: 'from-amber-500 to-orange-600',
  B1: 'from-brand-500 to-brand-700',
  B2: 'from-brand-600 to-indigo-700',
  C1: 'from-emerald-500 to-emerald-700',
}

export default function GrammarLessonPage() {
  const { topicId } = useParams()
  const topic = grammarTopics.find((t) => t.id === topicId)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  if (!topic) return <Navigate to="/grammar" replace />

  const { lesson } = topic
  const level = CEFR_LEVELS.find((l) => l.code === topic.cefrLevel)!
  const gradient = LEVEL_GRADIENT[topic.cefrLevel]

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      <Link to="/grammar" className="text-sm text-brand-600 hover:underline">← กลับ</Link>

      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} px-6 py-8 text-white shadow-sm`}>
        <span className="pointer-events-none absolute -right-4 -top-4 text-8xl opacity-20">{lesson.emoji}</span>
        <span
          className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold"
          style={{ color: 'white' }}
        >
          ระดับ {level.code} · {level.nameTh}
        </span>
        <h1 className="relative mt-3 text-2xl font-extrabold leading-snug">
          {lesson.emoji} {topic.titleTh}
        </h1>
        <p className="relative mt-2 text-sm text-white/85">{topic.description}</p>
      </div>

      <Card className="bg-brand-50 border-brand-200">
        <p className="text-stone-700 leading-relaxed">{lesson.introTh}</p>
      </Card>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
          💡 จุดสำคัญ {lesson.keyPoints.length} ข้อ — แตะเพื่อดูตัวอย่าง
        </p>
        <div className="space-y-2">
          {lesson.keyPoints.map((kp, i) => {
            const isOpen = activeIndex === i
            return (
              <Card key={i} className="!p-0 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sand-50 transition"
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold shrink-0 bg-gradient-to-br ${gradient}`}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 font-semibold text-stone-800">{kp.label}</span>
                  <span className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 animate-fadeIn">
                    <p className="text-sm text-stone-600">{kp.explanation}</p>
                    <div className="bg-sand-50 border border-sand-200 rounded-lg px-3 py-2.5 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-stone-800 italic">"{kp.exampleEn}"</p>
                        <button
                          type="button"
                          onClick={() => speak(kp.exampleEn)}
                          className="shrink-0 text-brand-600 hover:text-brand-700"
                          aria-label="ฟังเสียงตัวอย่าง"
                        >
                          🔊
                        </button>
                      </div>
                      <p className="text-xs text-stone-500">{kp.exampleTh}</p>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="bg-amber-50 border-amber-200 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <p className="text-sm text-stone-700">{lesson.tipTh}</p>
      </Card>

      <Link to={`/grammar/${topic.id}/practice`}>
        <Button className="w-full py-3 text-base shadow-sm">🚀 พร้อมแล้ว! เริ่มฝึกหัด {topic.questions.length} ข้อ →</Button>
      </Link>
    </div>
  )
}
