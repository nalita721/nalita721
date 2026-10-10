import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Lightbulb, Volume2 } from 'lucide-react'
import { iqTestVocab } from '../../data/iqTest'
import { Card } from '../../components/ui'
import { speak } from '../../lib/tts'

export default function IQTestVocabPage() {
  const [index, setIndex] = useState(0)
  const word = iqTestVocab[index]

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <Link to="/iq-test" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
        <h1 className="text-xl font-bold text-stone-800 mt-2">คำศัพท์ในข้อสอบ IQ Test</h1>
        <p className="text-stone-500 text-sm mt-1">คำศัพท์ที่ปรากฏในชุดข้อสอบ ทบทวนก่อนไปลองทำแบบทดสอบ</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          type="button"
          className="hidden sm:flex flex-col items-center gap-1.5 shrink-0 disabled:opacity-30"
        >
          <span className="w-11 h-11 rounded-full bg-white border border-sand-200 shadow-sm flex items-center justify-center text-stone-500 hover:border-brand-400 transition">
            <ChevronLeft size={20} />
          </span>
        </button>

        <Card className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400">{index + 1} / {iqTestVocab.length}</span>
            <span className="rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">{word.pos}</span>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <h2 className="text-3xl font-bold text-stone-800">{word.term}</h2>
            <p className="text-sm text-brand-500 font-medium">อ่านว่า "{word.pronunciationTh}"</p>
            <button onClick={() => speak(word.term)} type="button" className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-brand-600 transition">
              <Volume2 size={16} /> ฟังเสียง
            </button>
            <p className="text-lg text-stone-700 mt-1">{word.meaningTh}</p>
          </div>

          <div className="rounded-xl bg-sand-50 border border-sand-200 px-4 py-3">
            <p className="text-xs font-semibold text-brand-600 mb-1">Example Sentence</p>
            <p className="text-sm text-stone-600 italic">"{word.exampleEn}"</p>
            <p className="text-xs text-stone-400 mt-1">{word.exampleTh}</p>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2.5">
            <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-700 mb-1">เคล็ดลับจำคำนี้</p>
              <p className="text-sm text-amber-800">{word.mnemonicTh}</p>
            </div>
          </div>

          <div className="flex gap-3 sm:hidden">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex-1 rounded-xl border border-sand-200 py-2 text-sm text-stone-500 disabled:opacity-30"
            >
              ← คำก่อนหน้า
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(iqTestVocab.length - 1, i + 1))}
              disabled={index >= iqTestVocab.length - 1}
              className="flex-1 rounded-xl border border-sand-200 py-2 text-sm text-stone-500 disabled:opacity-30"
            >
              คำถัดไป →
            </button>
          </div>
        </Card>

        <button
          onClick={() => setIndex((i) => Math.min(iqTestVocab.length - 1, i + 1))}
          disabled={index >= iqTestVocab.length - 1}
          type="button"
          className="hidden sm:flex flex-col items-center gap-1.5 shrink-0 disabled:opacity-30"
        >
          <span className="w-11 h-11 rounded-full bg-white border border-sand-200 shadow-sm flex items-center justify-center text-stone-500 hover:border-brand-400 transition">
            <ChevronRight size={20} />
          </span>
        </button>
      </div>

      {index >= iqTestVocab.length - 1 && (
        <Card className="text-center py-6">
          <p className="text-stone-700 font-medium">ทบทวนครบทุกคำแล้ว 🎉</p>
          <Link to="/iq-test/quiz" className="text-brand-600 text-sm hover:underline mt-1 inline-block">
            ไปลองทำแบบทดสอบ →
          </Link>
        </Card>
      )}
    </div>
  )
}
