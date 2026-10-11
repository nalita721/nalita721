import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Lightbulb, Plus, Trash2, Volume2 } from 'lucide-react'
import { iqTestVocab, type CustomIqWord } from '../../data/iqTest'
import { getIqWordIcon } from '../../data/iqWordIcons'
import { Button, Card, Modal } from '../../components/ui'
import { WordIcon, WORD_ICON_KEYS, type WordIconKey } from '../../components/WordIcon'
import { useProgressStore } from '../../store/progress'
import { speak } from '../../lib/tts'
import type { VocabWord } from '../../lib/types'

const POS_OPTIONS = ['n.', 'v.', 'adj.', 'adv.']

function emptyForm() {
  return {
    term: '',
    pronunciationTh: '',
    pos: 'n.',
    meaningTh: '',
    exampleEn: '',
    exampleTh: '',
    mnemonicTh: '',
    iconKey: 'star' as WordIconKey,
  }
}

export default function IQTestVocabPage() {
  const customIqWords = useProgressStore((s) => s.customIqWords)
  const addCustomIqWord = useProgressStore((s) => s.addCustomIqWord)
  const removeCustomIqWord = useProgressStore((s) => s.removeCustomIqWord)

  const words: (VocabWord | CustomIqWord)[] = useMemo(() => [...iqTestVocab, ...customIqWords], [customIqWords])
  const customIds = useMemo(() => new Set(customIqWords.map((w) => w.id)), [customIqWords])

  const [index, setIndex] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState(emptyForm())

  const word = words[index]
  const isCustom = customIds.has(word.id)
  const iconKey = isCustom ? (word as CustomIqWord).iconKey : getIqWordIcon(word.id)

  function openAddForm() {
    setForm(emptyForm())
    setShowAddForm(true)
  }

  function submitAddForm() {
    if (!form.term.trim() || !form.meaningTh.trim()) return
    const newWord: CustomIqWord = {
      id: `custom-${Date.now()}`,
      term: form.term.trim(),
      pronunciationTh: form.pronunciationTh.trim() || '-',
      pos: form.pos,
      meaningTh: form.meaningTh.trim(),
      exampleEn: form.exampleEn.trim() || form.term.trim(),
      exampleTh: form.exampleTh.trim() || form.meaningTh.trim(),
      mnemonicTh: form.mnemonicTh.trim() || `จำคำว่า "${form.term.trim()}" แปลว่า ${form.meaningTh.trim()}`,
      iconKey: form.iconKey,
    }
    addCustomIqWord(newWord)
    setShowAddForm(false)
    setIndex(words.length) // jump to the newly added word
  }

  function handleDelete() {
    if (!isCustom) return
    removeCustomIqWord(word.id)
    setIndex((i) => Math.max(0, Math.min(i, words.length - 2)))
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to="/iq-test" className="text-sm text-brand-600 hover:underline">← กลับ</Link>
          <h1 className="text-xl font-bold text-stone-800 mt-2">คำศัพท์ในข้อสอบ IQ Test</h1>
          <p className="text-stone-500 text-sm mt-1">คำศัพท์ที่ปรากฏในชุดข้อสอบ ทบทวนก่อนไปลองทำแบบทดสอบ</p>
        </div>
        <Button onClick={openAddForm} className="shrink-0">
          <Plus size={16} /> เพิ่มคำศัพท์
        </Button>
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
            <span className="text-xs text-stone-400">{index + 1} / {words.length}</span>
            <div className="flex items-center gap-2">
              {isCustom && (
                <>
                  <span className="rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1">ของฉัน</span>
                  <button onClick={handleDelete} type="button" aria-label="ลบคำศัพท์นี้" className="text-stone-300 hover:text-rose-500 transition">
                    <Trash2 size={16} />
                  </button>
                </>
              )}
              <span className="rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 uppercase tracking-wide">{word.pos}</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <WordIcon iconKey={iconKey} />
            <h2 className="text-3xl font-bold text-stone-800 mt-1">{word.term}</h2>
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

          {word.mnemonicTh && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-start gap-2.5">
              <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-700 mb-1">เคล็ดลับจำคำนี้</p>
                <p className="text-sm text-amber-800">{word.mnemonicTh}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 sm:hidden">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="flex-1 rounded-xl border border-sand-200 py-2 text-sm text-stone-500 disabled:opacity-30"
            >
              ← คำก่อนหน้า
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(words.length - 1, i + 1))}
              disabled={index >= words.length - 1}
              className="flex-1 rounded-xl border border-sand-200 py-2 text-sm text-stone-500 disabled:opacity-30"
            >
              คำถัดไป →
            </button>
          </div>
        </Card>

        <button
          onClick={() => setIndex((i) => Math.min(words.length - 1, i + 1))}
          disabled={index >= words.length - 1}
          type="button"
          className="hidden sm:flex flex-col items-center gap-1.5 shrink-0 disabled:opacity-30"
        >
          <span className="w-11 h-11 rounded-full bg-white border border-sand-200 shadow-sm flex items-center justify-center text-stone-500 hover:border-brand-400 transition">
            <ChevronRight size={20} />
          </span>
        </button>
      </div>

      {index >= words.length - 1 && (
        <Card className="text-center py-6">
          <p className="text-stone-700 font-medium">ทบทวนครบทุกคำแล้ว 🎉</p>
          <Link to="/iq-test/quiz" className="text-brand-600 text-sm hover:underline mt-1 inline-block">
            ไปลองทำแบบทดสอบ →
          </Link>
        </Card>
      )}

      {showAddForm && (
        <Modal size="lg">
          <Card className="space-y-4 max-h-[85vh] overflow-y-auto">
            <h2 className="font-semibold text-stone-800">เพิ่มคำศัพท์ของฉัน</h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">คำศัพท์ (ภาษาอังกฤษ) *</label>
                <input
                  autoFocus
                  value={form.term}
                  onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
                  placeholder="เช่น schedule"
                  className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">คำอ่าน</label>
                  <input
                    value={form.pronunciationTh}
                    onChange={(e) => setForm((f) => ({ ...f, pronunciationTh: e.target.value }))}
                    placeholder="เช่น สเก-จูล"
                    className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 mb-1 block">ชนิดคำ</label>
                  <select
                    value={form.pos}
                    onChange={(e) => setForm((f) => ({ ...f, pos: e.target.value }))}
                    className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {POS_OPTIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">ความหมาย (ภาษาไทย) *</label>
                <input
                  value={form.meaningTh}
                  onChange={(e) => setForm((f) => ({ ...f, meaningTh: e.target.value }))}
                  placeholder="เช่น ตารางเวลา"
                  className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">ตัวอย่างประโยค (อังกฤษ)</label>
                <input
                  value={form.exampleEn}
                  onChange={(e) => setForm((f) => ({ ...f, exampleEn: e.target.value }))}
                  placeholder="เช่น Please check the schedule before you go."
                  className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">ตัวอย่างประโยค (ไทย)</label>
                <input
                  value={form.exampleTh}
                  onChange={(e) => setForm((f) => ({ ...f, exampleTh: e.target.value }))}
                  placeholder="เช่น กรุณาตรวจสอบตารางเวลาก่อนไป"
                  className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-500 mb-1 block">เคล็ดลับจำคำนี้</label>
                <textarea
                  value={form.mnemonicTh}
                  onChange={(e) => setForm((f) => ({ ...f, mnemonicTh: e.target.value }))}
                  placeholder="วิธีจำคำนี้ในแบบของคุณเอง"
                  rows={2}
                  className="w-full rounded-xl border border-sand-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-500 mb-2 block">เลือกรูปภาพประจำคำนี้</label>
                <div className="grid grid-cols-8 gap-2">
                  {WORD_ICON_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, iconKey: key }))}
                      className={`rounded-xl p-1 transition ${form.iconKey === key ? 'ring-2 ring-brand-500' : 'hover:bg-sand-50'}`}
                      aria-label={key}
                    >
                      <WordIcon iconKey={key} className="!p-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowAddForm(false)} className="flex-1 justify-center">
                ยกเลิก
              </Button>
              <Button onClick={submitAddForm} disabled={!form.term.trim() || !form.meaningTh.trim()} className="flex-1 justify-center">
                บันทึก
              </Button>
            </div>
          </Card>
        </Modal>
      )}
    </div>
  )
}
