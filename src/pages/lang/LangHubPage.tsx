import { Link } from 'react-router-dom'
import { ChevronRight, Lock } from 'lucide-react'
import { Card } from '../../components/ui'
import { LANG_TRACKS } from '../../data/langs'
import type { LangCode } from '../../lib/langTypes'

export default function LangHubPage({ lang }: { lang: LangCode }) {
  const track = LANG_TRACKS[lang]
  const accent = lang === 'zh' ? 'from-rose-500 to-red-700' : 'from-pink-500 to-fuchsia-700'

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent} px-6 py-8 text-white shadow-sm`}>
        <span className="pointer-events-none absolute -right-2 -top-4 text-8xl opacity-25">{track.flag}</span>
        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">เตรียมสอบ {track.examName}</p>
        <h1 className="mt-1 text-2xl font-extrabold">
          {track.flag} {track.nameTh}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">{track.introTh}</p>
      </div>

      {lang === 'zh' && (
        <Link to="/chinese/pinyin" className="block">
          <Card className="flex items-center gap-4 border-2 border-rose-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-xl font-bold text-rose-700">
              mā
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-rose-600">ขั้นที่ 0 · เริ่มตรงนี้</p>
              <p className="font-bold text-stone-800">พินอิน วรรณยุกต์ และอักษรจีนเบื้องต้น</p>
              <p className="text-sm text-stone-500">เสียงพยัญชนะ–สระพร้อมเสียงอ่าน 4 วรรณยุกต์ แบบฝึกฟัง เส้นพื้นฐาน และหมวดนำ ก่อนเริ่ม HSK 1</p>
            </div>
            <ChevronRight className="shrink-0 text-stone-300" />
          </Card>
        </Link>
      )}

      {lang === 'ja' && (
        <Link to="/japanese/kana" className="block">
          <Card className="flex items-center gap-4 border-2 border-pink-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-2xl font-bold text-pink-700">
              あア
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-pink-600">ขั้นที่ 0 · เริ่มตรงนี้</p>
              <p className="font-bold text-stone-800">ตัวอักษรฮิรางานะ และคาตาคานะ</p>
              <p className="text-sm text-stone-500">ตารางตัวอักษรพร้อมเสียง และแบบฝึกจำตัวอักษร ก่อนเริ่มเรียน N5</p>
            </div>
            <ChevronRight className="shrink-0 text-stone-300" />
          </Card>
        </Link>
      )}

      <div>
        <h2 className="mb-3 font-bold text-stone-800">เลือกระดับที่จะสอบ</h2>
        <div className="space-y-3">
          {track.levels.map((level) => {
            const ready = !!level.load
            const body = (
              <Card
                className={`flex items-center gap-4 transition hover:-translate-y-0.5 hover:shadow-md ${ready ? '' : 'opacity-75'}`}
              >
                <span
                  className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl text-white ${
                    ready ? `bg-gradient-to-br ${accent}` : 'bg-stone-300'
                  }`}
                >
                  <span className="text-[12px] font-semibold opacity-80">{track.examName}</span>
                  <span className="text-lg font-extrabold leading-none">{level.code.replace(/^HSK /, '')}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-stone-800">
                    {level.code} · {level.nameTh}
                  </p>
                  <p className="text-sm text-stone-500">{level.summaryTh}</p>
                  <p className="mt-1 text-xs text-stone-400">
                    คำศัพท์สะสม {level.examWords.toLocaleString()} คำ ·{' '}
                    {level.format.reduce((s, f) => s + f.questions, 0)} ข้อ · {level.format.reduce((s, f) => s + f.minutes, 0)} นาที
                  </p>
                </div>
                {ready ? (
                  <ChevronRight className="shrink-0 text-stone-300" />
                ) : (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold text-stone-500">
                    <Lock size={12} /> เร็วๆ นี้
                  </span>
                )}
              </Card>
            )
            return (
              <Link key={level.slug} to={`${track.path}/${level.slug}`} className="block">
                {body}
              </Link>
            )
          })}
        </div>
        <p className="mt-3 px-1 text-xs text-stone-400">
          ระดับที่ขึ้นว่า "เร็วๆ นี้" ยังกดดูรูปแบบข้อสอบได้ เนื้อหาจะทยอยเพิ่มทีละระดับ
        </p>
      </div>
    </div>
  )
}
