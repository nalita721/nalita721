import { kv } from './_redis'
import { getSessionEmail } from './_auth'
import { getOrCreateUser, getUserByFriendCode } from './_account'
import type { CefrCode } from '../src/lib/types'

interface ProgressSnapshotLite {
  xp?: number
  streak?: number
  levelTestResult?: { cefr?: CefrCode } | null
}

export default async function handler(req: any, res: any) {
  const email = await getSessionEmail(req)
  if (!email) {
    res.status(401).json({ error: 'not authenticated' })
    return
  }

  if (req.method === 'GET') {
    const me = await getOrCreateUser(email)
    const friendEmails: string[] = (await kv.smembers(`friends:${email}`)) ?? []

    const friends = await Promise.all(
      friendEmails.map(async (friendEmail) => {
        const [user, progress] = await Promise.all([
          kv.get<{ displayName: string }>(`user:${friendEmail}`),
          kv.get<ProgressSnapshotLite>(`progress:${friendEmail}`),
        ])
        return {
          email: friendEmail,
          displayName: user?.displayName ?? friendEmail.split('@')[0],
          xp: progress?.xp ?? 0,
          streak: progress?.streak ?? 0,
          cefr: progress?.levelTestResult?.cefr ?? null,
        }
      }),
    )
    friends.sort((a, b) => b.xp - a.xp)

    res.status(200).json({ friendCode: me.friendCode, displayName: me.displayName, friends })
    return
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
    const code = typeof body.friendCode === 'string' ? body.friendCode.trim() : ''
    if (!code) {
      res.status(400).json({ error: 'กรุณากรอกโค้ดเพื่อน' })
      return
    }
    const friendEmail = await getUserByFriendCode(code)
    if (!friendEmail) {
      res.status(404).json({ error: 'ไม่พบผู้ใช้ที่ใช้โค้ดนี้' })
      return
    }
    if (friendEmail === email) {
      res.status(400).json({ error: 'ใช้โค้ดของตัวเองไม่ได้' })
      return
    }
    await kv.sadd(`friends:${email}`, friendEmail)
    await kv.sadd(`friends:${friendEmail}`, email)
    res.status(200).json({ ok: true })
    return
  }

  if (req.method === 'DELETE') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
    const friendEmail = typeof body.friendEmail === 'string' ? body.friendEmail : ''
    if (!friendEmail) {
      res.status(400).json({ error: 'invalid friendEmail' })
      return
    }
    await kv.srem(`friends:${email}`, friendEmail)
    await kv.srem(`friends:${friendEmail}`, email)
    res.status(200).json({ ok: true })
    return
  }

  res.status(405).json({ error: 'method not allowed' })
}
