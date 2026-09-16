import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'

const GAMES = [
  { path: '/games/flashcards', icon: '🃏', title: 'Flashcard SRS', desc: 'พลิกบัตรคำศัพท์ทบทวนความจำ สุ่มจากคำศัพท์ทั้งหมดทุกบท ตามระบบ Spaced Repetition' },
  { path: '/games/word-rush', icon: '⚡', title: 'Word Rush', desc: 'ทบทวนคำศัพท์ทุกบทแบบจับเวลา 60 วินาที ตอบให้เร็วและแม่นที่สุด' },
  { path: '/games/matching', icon: '🧩', title: 'Matching Game', desc: 'จับคู่คำศัพท์กับความหมาย สุ่มจากคำศัพท์ทั้งหมดทุกบท' },
  { path: '/games/typing', icon: '⌨️', title: 'Typing Challenge', desc: 'พิมพ์คำศัพท์จากความหมาย สุ่มจากคำศัพท์ทั้งหมดทุกบท' },
  { path: '/games/grammar-blitz', icon: '🧠', title: 'Grammar Blitz', desc: 'ตอบคำถามไวยากรณ์แบบสุ่มจากทุกหัวข้อ แข่งกับเวลา 60 วินาที' },
]

export default function GamesHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">🎮 เกมทบทวนความรู้</h1>
        <p className="text-stone-500 mt-1">เล่นเกมสั้นๆ ทบทวนคำศัพท์และไวยากรณ์แบบรวมทุกบท ไม่ต้องเลือกบทก่อน</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {GAMES.map((g) => (
          <Link key={g.path} to={g.path}>
            <Card className="h-full hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer">
              <div className="text-3xl">{g.icon}</div>
              <h2 className="font-semibold text-stone-800 mt-2">{g.title}</h2>
              <p className="text-sm text-stone-500 mt-1">{g.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
