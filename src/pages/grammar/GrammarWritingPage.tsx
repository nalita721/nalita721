import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { grammarTopics } from '../../data/grammar'
import { Button, Card, ProgressBar } from '../../components/ui'
import { playCompleteSound } from '../../lib/sound'
import { checkWriting, type WritingCheckResult } from '../../lib/writingCheck'

export default function GrammarWritingPage() {
  const { topicId } = useParams()
  const topic = grammarTopics.find((t) => t.id === topicId)
  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [checkResult, setCheckResult] = useState<WritingCheckResult | null>(null)

  if (!topic) return <Navigate to="/grammar" replace />

  const prompts = topic.writingPrompts
  const prompt = prompts[index]
  const done = index >= prompts.length

  function handleAttemptChange(value: string) {
    setAttempt(value)
    setCheckResult(null)
  }

  function check() {
    setCheckResult(checkWriting(prompt.id, attempt))
  }

  function reveal() {
    setRevealed(true)
  }

  function next() {
    setAttempt('')
    setRevealed(false)
    setCheckResult(null)
    const isLast = index + 1 >= prompts.length
    setIndex((i) => i + 1)
    if (isLast) playCompleteSound()
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Link to={`/grammar/${topic.id}`} className="text-sm text-brand-600 hover:underline">← กลับไปบทเรียน</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">✍️ ฝึกแต่งประโยค — {topic.titleTh}</h1>
        <p className="text-sm text-stone-500 mt-1">ลองแต่งประโยคของตัวเองก่อนไปทำแบบฝึกหัดแบบเลือกตอบ</p>
      </div>

      <ProgressBar value={index} max={prompts.length} />

      {done ? (
        <Card className="text-center py-12">
          <p className="text-2xl">✅</p>
          <p className="text-lg font-semibold text-stone-800 mt-2">ฝึกแต่งประโยคครบแล้ว {prompts.length} ข้อ</p>
          <p className="text-sm text-stone-500 mt-1">พร้อมแล้ว! ไปลองทำแบบฝึกหัดกันต่อ</p>
          <Link to={`/grammar/${topic.id}/practice`}>
            <Button className="mt-4">🚀 เริ่มฝึกหัด {topic.questions.length} ข้อ →</Button>
          </Link>
        </Card>
      ) : (
        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-stone-400">ข้อที่ {index + 1}/{prompts.length}</p>
          <p className="text-stone-800 font-medium">{prompt.promptTh}</p>
          <p className="text-xs text-brand-600 bg-brand-50 border border-brand-100 rounded-lg px-3 py-1.5 inline-block">
            💭 ใช้: {prompt.hintEn}
          </p>

          <textarea
            value={attempt}
            onChange={(e) => handleAttemptChange(e.target.value)}
            disabled={revealed}
            rows={3}
            placeholder="ลองแต่งประโยคภาษาอังกฤษของคุณเองตรงนี้..."
            className="w-full rounded-xl border border-sand-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-sand-50"
          />

          {!revealed ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={check} disabled={!attempt.trim()}>
                  ✅ ตรวจสอบประโยค
                </Button>
                <Button variant="ghost" onClick={reveal} disabled={!attempt.trim()}>
                  👀 ดูตัวอย่างประโยค
                </Button>
              </div>
              {!attempt.trim() && (
                <p className="text-xs text-stone-400">✏️ พิมพ์ประโยคของคุณเองก่อนด้านบน แล้วปุ่มเหล่านี้จะกดได้</p>
              )}

              {checkResult && (
                <div
                  className={`rounded-xl border px-4 py-3 space-y-1.5 ${
                    checkResult.status === 'good' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  {checkResult.status === 'good' ? (
                    <p className="text-sm text-emerald-700 font-medium">✅ ดูดีแล้ว! โครงสร้างประโยคตรงกับที่โจทย์ต้องการ</p>
                  ) : (
                    <>
                      <p className="text-sm text-amber-700 font-medium">💡 ลองปรับดูอีกนิด:</p>
                      <ul className="text-sm text-stone-700 space-y-1">
                        {checkResult.messages.map((m) => (
                          <li key={m}>• {m}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="text-[11px] text-stone-400 pt-1">
                    *เป็นการตรวจสอบเบื้องต้นจากรูปแบบประโยคเท่านั้น ไม่ครอบคลุมทุกกรณี ลองเทียบกับตัวอย่างประโยคเพื่อความมั่นใจ
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 space-y-1">
                <p className="text-xs font-semibold text-emerald-700">ตัวอย่างประโยค</p>
                <p className="text-sm text-stone-800 italic">"{prompt.sampleAnswer}"</p>
                <p className="text-xs text-stone-500">{prompt.sampleAnswerTh}</p>
              </div>
              <Button onClick={next}>{index + 1 >= prompts.length ? 'เสร็จสิ้น →' : 'ข้อถัดไป →'}</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
