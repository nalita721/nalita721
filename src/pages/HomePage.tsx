import { Link } from 'react-router-dom'
import { Check, Flame, Star } from 'lucide-react'
import { Button } from '../components/ui'
import { Logo, LogoMark } from '../components/Logo'

const CHECKLIST = ['คำศัพท์ครบทุกระดับ (Vocabulary)', 'ฝึกข้อสอบ TOEIC จริง (TOEIC Practice)', 'ฝึกฟังและพูด (Listening & Speaking)', 'ติดตามความก้าวหน้า (Track Your Progress)']

const STATS = [
  { value: '280+', label: 'คำศัพท์' },
  { value: '3', label: 'ชุด Full Mock Test' },
  { value: '7', label: 'Part ข้อสอบ TOEIC' },
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
    emoji: '🎙️',
    title: 'ฝึกพูดจริง',
    description: 'อัดเสียงตอบคำถาม แล้วเทียบกับตัวอย่างคำตอบ ฝึกความมั่นใจก่อนใช้งานจริง',
    gradient: 'from-rose-500 to-pink-700',
  },
  {
    emoji: '🏆',
    title: 'Full Mock Test 3 ชุด',
    description: 'ข้อสอบจำลองเต็มรูปแบบ 200 ข้อ อ้างอิงแนวข้อสอบจริง จับเวลาเสมือนสอบจริง',
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    emoji: '🧭',
    title: 'เส้นทางการเรียนส่วนตัว',
    description: 'วัดระดับแล้วเรียนไปทีละขั้นตามลำดับ ไม่ต้องเดาว่าควรเริ่มตรงไหน',
    gradient: 'from-amber-500 to-orange-700',
  },
]

const STEPS = [
  { step: '1', title: 'วัดระดับภาษา', description: 'เริ่มด้วยแบบทดสอบ CEFR เพื่อรู้จุดแข็ง-จุดอ่อนของตัวเอง' },
  { step: '2', title: 'ฝึกฝนทุกวัน', description: 'เรียนคำศัพท์ ไวยากรณ์ ฟัง พูด อ่าน ผ่านบทเรียนและเกมที่ออกแบบมาให้จำง่าย' },
  { step: '3', title: 'ลองสอบจริง', description: 'ทำ Full Mock Test จับเวลาเพื่อประเมินความพร้อมก่อนสอบจริง' },
]

function HeroIllustration() {
  return (
    <div className="relative mx-auto max-w-sm">
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-200/60 blur-2xl" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-amber-200/60 blur-2xl" />

      <div className="relative rounded-3xl bg-white shadow-xl border border-sand-200 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-400">Vocabulary</span>
          <span className="text-rose-400">♥</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-stone-800">negotiate</p>
          <p className="text-xs text-stone-400">/nɪˈɡəʊʃieɪt/</p>
          <p className="text-sm text-stone-600 mt-1">เจรจาต่อรอง</p>
        </div>
        <div className="rounded-xl bg-sand-50 border border-sand-200 px-3 py-2">
          <p className="text-xs text-stone-600 italic">"We need to negotiate the contract with the supplier."</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-1">Business</span>
          <span className="rounded-full bg-sand-100 text-sand-800 text-xs font-semibold px-2.5 py-1">Verb</span>
        </div>
      </div>

      <div className="absolute -right-4 top-16 rounded-2xl bg-white shadow-lg border border-sand-200 px-3 py-2 flex items-center gap-1.5">
        <Flame size={16} className="text-amber-500" />
        <span className="text-xs font-bold text-stone-700">7 Day Streak</span>
      </div>
      <div className="absolute -left-6 -bottom-4 rounded-2xl bg-white shadow-lg border border-sand-200 px-3 py-2 flex items-center gap-1.5">
        <Star size={16} className="text-brand-500 fill-brand-500" />
        <span className="text-xs font-bold text-stone-700">+5 XP</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="border-b border-sand-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Logo size={30} />
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-brand-600 transition hidden sm:block">
              เข้าสู่ระบบ
            </Link>
            <Link to="/login">
              <Button className="px-4 py-2 text-sm shadow-sm">เริ่มต้นใช้งานฟรี</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <section className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-stone-800">
              Better English<br />A Brighter You
            </h1>
            <p className="text-stone-500 sm:text-lg max-w-md mx-auto lg:mx-0">
              เรียนคำศัพท์ ฝึกข้อสอบ พัฒนาทักษะครบ จบในที่เดียว — พิชิตคะแนน TOEIC ในแบบที่คุณเรียนสนุกและจดจำได้จริง
            </p>
            <ul className="space-y-2 inline-block text-left">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-stone-700">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link to="/login">
                <Button className="!bg-sand-900 hover:!bg-sand-800 px-6 py-3 text-base shadow-lg">
                  เริ่มเรียนฟรี →
                </Button>
              </Link>
            </div>
          </div>

          <HeroIllustration />
        </section>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 pb-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-sand-200 bg-white px-4 py-6 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="pb-16 text-center">
          <p className="italic text-stone-500 text-sm sm:text-base">
            🌱 "วินัยในวันนี้ สร้างผลลัพธ์ที่ใช่ในวันพรุ่งนี้"
          </p>
        </section>

        <section className="space-y-8 pb-16">
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

        <section className="space-y-8 pb-16">
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

        <section className="rounded-3xl bg-sand-900 px-6 py-14 text-center text-white sm:py-16 mb-16">
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
      </main>

      <footer className="border-t border-sand-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <LogoMark size={22} />
          <p className="text-xs text-stone-400">Learn Today, A Brighter Tomorrow</p>
        </div>
      </footer>
    </div>
  )
}
