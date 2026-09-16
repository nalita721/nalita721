import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

const STATS = [
  { value: '280+', label: 'คำศัพท์พร้อมไอคอน' },
  { value: '3', label: 'ชุด Full Mock Test' },
  { value: '600+', label: 'ข้อสอบเสมือนจริง' },
  { value: 'A1–C1', label: 'ครอบคลุมทุกระดับ CEFR' },
]

const FEATURES = [
  {
    emoji: '📚',
    title: 'คำศัพท์ครบทุกระดับ',
    description: 'คำศัพท์ธุรกิจ การสื่อสาร ไปจนถึงระดับ C1 พร้อมไอคอนช่วยจำและระบบ Spaced Repetition',
    gradient: 'from-brand-500 to-brand-700',
  },
  {
    emoji: '✍️',
    title: 'ไวยากรณ์เจาะลึก',
    description: 'ตั้งแต่พื้นฐานไปจนถึงหัวข้อระดับสูง เช่น Inversion, Mixed Conditionals, Cleft Sentences',
    gradient: 'from-violet-500 to-violet-700',
  },
  {
    emoji: '🎧',
    title: 'ฝึกฟัง-อ่านสไตล์ TOEIC',
    description: 'แบบฝึกหัด Part 1-7 พร้อมเสียงอ่านหลายสำเนียง (US/UK/AU/CA)',
    gradient: 'from-teal-500 to-cyan-700',
  },
  {
    emoji: '🏆',
    title: 'Full Mock Test 3 ชุด',
    description: 'ข้อสอบจำลองเต็มรูปแบบ 200 ข้อ อ้างอิงแนวข้อสอบจริง จับเวลาเสมือนสอบจริง',
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    emoji: '🌐',
    title: 'วัดระดับภาษาแบบ CEFR',
    description: 'ทำแบบทดสอบวัดระดับแล้วรับคำแนะนำบทเรียนที่เหมาะกับจุดอ่อนของคุณโดยเฉพาะ',
    gradient: 'from-amber-500 to-orange-700',
  },
  {
    emoji: '🎮',
    title: 'เกมทบทวนสนุก ๆ',
    description: 'Word Rush, Matching, Typing Challenge, Grammar Blitz พร้อมเอฟเฟกต์เสียงเมื่อตอบถูก-ผิด',
    gradient: 'from-rose-500 to-pink-700',
  },
]

const STEPS = [
  { step: '1', title: 'วัดระดับภาษา', description: 'เริ่มด้วยแบบทดสอบ CEFR เพื่อรู้จุดแข็ง-จุดอ่อนของตัวเอง' },
  { step: '2', title: 'ฝึกฝนทุกวัน', description: 'เรียนคำศัพท์ ไวยากรณ์ ฟัง อ่าน ผ่านบทเรียนและเกมที่ออกแบบมาให้จำง่าย' },
  { step: '3', title: 'ลองสอบจริง', description: 'ทำ Full Mock Test จับเวลาเพื่อประเมินความพร้อมก่อนสอบจริง' },
]

export default function HomePage() {
  return (
    <div className="space-y-20 pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 px-6 py-16 text-center text-white sm:py-24">
        <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl space-y-6">
          <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide">
            ✨ แพลตฟอร์มเตรียมสอบ TOEIC ครบวงจร
          </span>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            พิชิตคะแนน TOEIC ในแบบที่คุณเรียนสนุก จดจำได้จริง
          </h1>
          <p className="mx-auto max-w-xl text-white/85 sm:text-lg">
            คำศัพท์ ไวยากรณ์ การฟัง การอ่าน และข้อสอบจำลองเสมือนจริง ครบทุกระดับตั้งแต่ A1 ถึง C1 พร้อมระบบติดตามความคืบหน้าและเกมทบทวนที่ทำให้การเตรียมสอบไม่น่าเบื่ออีกต่อไป
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/login">
              <Button className="bg-white !text-brand-700 hover:bg-sand-50 px-6 py-3 text-base shadow-lg">
                เริ่มเรียนฟรี
              </Button>
            </Link>
            <Link to="/vocabulary">
              <Button variant="secondary" className="bg-white/10 !text-white hover:bg-white/20 px-6 py-3 text-base">
                ดูตัวอย่างคำศัพท์
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-sand-200 bg-white px-4 py-6 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-stone-500 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-800 sm:text-3xl">ทุกสิ่งที่ต้องใช้เตรียมสอบ ในที่เดียว</h2>
          <p className="text-stone-500">ออกแบบเนื้อหาโดยอ้างอิงแนวข้อสอบ TOEIC จริง ครอบคลุมทุกทักษะที่ใช้สอบและใช้สื่อสารจริง</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-xl text-white`}>
                {f.emoji}
              </span>
              <h3 className="mt-3 font-semibold text-stone-800">{f.title}</h3>
              <p className="mt-1 text-sm text-stone-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-800 sm:text-3xl">เริ่มต้นง่าย ๆ ใน 3 ขั้นตอน</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center space-y-2">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                {s.step}
              </span>
              <h3 className="font-semibold text-stone-800">{s.title}</h3>
              <p className="text-sm text-stone-500">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-sand-900 px-6 py-14 text-center text-white sm:py-16">
        <div className="mx-auto max-w-xl space-y-4">
          <h2 className="text-2xl font-bold sm:text-3xl">พร้อมเริ่มต้นเส้นทางสู่คะแนน TOEIC ที่ดีขึ้นหรือยัง?</h2>
          <p className="text-white/70">สมัครฟรี ไม่มีค่าใช้จ่าย เริ่มฝึกได้ทันที</p>
          <Link to="/login" className="inline-block pt-2">
            <Button className="bg-white !text-sand-900 hover:bg-sand-100 px-6 py-3 text-base shadow-lg">
              สมัครสมาชิกฟรี
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
