import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { CEFR_LEVELS } from '../data/cefr'
import { vocabChapters } from '../data/vocabulary'
import type { CefrCode } from '../lib/types'

interface FriendRow {
  email: string
  displayName: string
  xp: number
  streak: number
  cefr: CefrCode | null
}

interface DuelSummary {
  id: string
  chapterTitleTh: string
  opponentName: string
  status: 'pending' | 'finished'
  myTurn: boolean
  myScore: number | null
  opponentScore: number | null
  questionCount: number
}

function levelBadge(code: CefrCode | null) {
  if (!code) return null
  const level = CEFR_LEVELS.find((l) => l.code === code)
  if (!level) return null
  return (
    <span
      className="rounded-full text-xs font-semibold px-2 py-0.5"
      style={{ backgroundColor: level.bgColor, color: level.color }}
    >
      {level.code}
    </span>
  )
}

export default function FriendsPage() {
  const [friendCode, setFriendCode] = useState('')
  const [friends, setFriends] = useState<FriendRow[]>([])
  const [duels, setDuels] = useState<DuelSummary[]>([])
  const [loading, setLoading] = useState(true)

  const [addCodeInput, setAddCodeInput] = useState('')
  const [addStatus, setAddStatus] = useState<'idle' | 'saving' | 'error'>('idle')
  const [addError, setAddError] = useState('')

  const [challengingEmail, setChallengingEmail] = useState<string | null>(null)
  const [challengeChapterId, setChallengeChapterId] = useState(vocabChapters[0]?.id ?? '')
  const [challengeStatus, setChallengeStatus] = useState<'idle' | 'sending'>('idle')

  async function loadFriends() {
    const res = await fetch('/api/friends', { credentials: 'include' })
    if (!res.ok) return
    const data = await res.json()
    setFriendCode(data.friendCode ?? '')
    setFriends(data.friends ?? [])
  }

  async function loadDuels() {
    const res = await fetch('/api/duels', { credentials: 'include' })
    if (!res.ok) return
    const data = await res.json()
    setDuels(data.duels ?? [])
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await Promise.all([loadFriends(), loadDuels()])
      setLoading(false)
    })()
  }, [])

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(friendCode)
    } catch {
      // clipboard access denied — user can still select and copy the text manually
    }
  }

  async function addFriend() {
    if (!addCodeInput.trim()) return
    setAddStatus('saving')
    setAddError('')
    try {
      const res = await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friendCode: addCodeInput.trim() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as { error?: string })
        setAddStatus('error')
        setAddError(data.error ?? 'เพิ่มเพื่อนไม่สำเร็จ')
        return
      }
      setAddCodeInput('')
      setAddStatus('idle')
      await loadFriends()
    } catch {
      setAddStatus('error')
      setAddError('เกิดข้อผิดพลาด กรุณาลองใหม่')
    }
  }

  async function removeFriend(friendEmail: string) {
    await fetch('/api/friends', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ friendEmail }),
    })
    await loadFriends()
  }

  async function sendChallenge(friendEmail: string) {
    setChallengeStatus('sending')
    try {
      const res = await fetch('/api/duels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friendEmail, chapterId: challengeChapterId }),
      })
      if (res.ok) {
        const data = await res.json()
        window.location.href = `/duels/${data.id}`
      }
    } finally {
      setChallengeStatus('idle')
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">👥 เพื่อนและแรงก์</h1>
        <p className="text-stone-500 mt-1">เพิ่มเพื่อนด้วยโค้ด เทียบระดับ และท้าแข่งเกมแฟลชการ์ด</p>
      </div>

      <Card className="space-y-3">
        <p className="text-sm text-stone-500">โค้ดเพื่อนของคุณ — แชร์ให้เพื่อนกรอกเพื่อเชื่อมกัน</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-widest text-brand-700">{friendCode || '------'}</span>
          <Button variant="secondary" onClick={copyCode} disabled={!friendCode}>
            คัดลอก
          </Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <p className="text-sm font-medium text-stone-700">เพิ่มเพื่อนด้วยโค้ด</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={addCodeInput}
            onChange={(e) => setAddCodeInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && addFriend()}
            placeholder="กรอกโค้ดเพื่อน เช่น AB12CD"
            className="flex-1 rounded-xl border border-sand-300 px-4 py-2.5 tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Button onClick={addFriend} disabled={!addCodeInput.trim() || addStatus === 'saving'}>
            เพิ่มเพื่อน
          </Button>
        </div>
        {addStatus === 'error' && <p className="text-sm text-rose-600">❌ {addError}</p>}
      </Card>

      <Card className="space-y-3">
        <h2 className="font-semibold text-stone-800">🏆 แรงก์เพื่อน (เรียงตาม XP)</h2>
        {loading ? (
          <p className="text-sm text-stone-400">กำลังโหลด...</p>
        ) : friends.length === 0 ? (
          <p className="text-sm text-stone-500">ยังไม่มีเพื่อน — เพิ่มเพื่อนด้วยโค้ดด้านบนเพื่อเริ่มเทียบระดับกัน</p>
        ) : (
          <div className="space-y-2">
            {friends.map((f, i) => (
              <div key={f.email} className="flex items-center justify-between rounded-xl border border-sand-200 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-stone-400 w-5">#{i + 1}</span>
                  <div>
                    <p className="font-medium text-stone-800">{f.displayName}</p>
                    <p className="text-xs text-stone-500">
                      ⭐ {f.xp} XP • 🔥 {f.streak} วัน
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {levelBadge(f.cefr)}
                  <Button
                    variant="secondary"
                    className="text-xs px-2.5 py-1.5"
                    onClick={() => setChallengingEmail(challengingEmail === f.email ? null : f.email)}
                  >
                    ท้าแข่ง
                  </Button>
                  <button
                    onClick={() => removeFriend(f.email)}
                    title="ลบเพื่อน"
                    className="text-stone-300 hover:text-rose-500 transition text-sm px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {challengingEmail && (
        <Card className="space-y-3">
          <p className="font-semibold text-stone-800">
            ท้าแข่งแฟลชการ์ดกับ {friends.find((f) => f.email === challengingEmail)?.displayName}
          </p>
          <label className="text-sm text-stone-600 block">เลือกบทคำศัพท์</label>
          <select
            value={challengeChapterId}
            onChange={(e) => setChallengeChapterId(e.target.value)}
            className="w-full rounded-xl border border-sand-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {vocabChapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.titleTh}
              </option>
            ))}
          </select>
          <Button onClick={() => sendChallenge(challengingEmail)} disabled={challengeStatus === 'sending'}>
            {challengeStatus === 'sending' ? 'กำลังสร้าง...' : 'เริ่มท้าแข่ง'}
          </Button>
        </Card>
      )}

      <Card className="space-y-3">
        <h2 className="font-semibold text-stone-800">🎮 การท้าแข่ง</h2>
        {loading ? (
          <p className="text-sm text-stone-400">กำลังโหลด...</p>
        ) : duels.length === 0 ? (
          <p className="text-sm text-stone-500">ยังไม่มีการท้าแข่ง ลองกดท้าแข่งเพื่อนจากรายชื่อด้านบน</p>
        ) : (
          <div className="space-y-2">
            {duels.map((d) => (
              <Link key={d.id} to={`/duels/${d.id}`}>
                <div className="flex items-center justify-between rounded-xl border border-sand-200 px-4 py-3 hover:border-brand-400 transition">
                  <div>
                    <p className="font-medium text-stone-800">vs {d.opponentName}</p>
                    <p className="text-xs text-stone-500">{d.chapterTitleTh}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
                      d.status === 'finished'
                        ? 'bg-emerald-50 text-emerald-700'
                        : d.myTurn
                        ? 'bg-brand-50 text-brand-700'
                        : 'bg-sand-100 text-sand-700'
                    }`}
                  >
                    {d.status === 'finished' ? `จบแล้ว ${d.myScore}-${d.opponentScore}` : d.myTurn ? 'ถึงตาคุณ' : 'รอเพื่อน'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
