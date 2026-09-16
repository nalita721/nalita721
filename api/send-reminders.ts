import { Redis } from '@upstash/redis'

const kv = Redis.fromEnv()

const RESEND_API_URL = 'https://api.resend.com/emails'
const SITE_URL = process.env.SITE_URL ?? 'https://toeic-nu.vercel.app'

interface Subscriber {
  email: string
  slot: 'morning' | 'evening'
  lastSentDate: string | null
}

/**
 * Triggered daily by two Vercel Cron entries (one per slot, see vercel.json).
 * Vercel automatically sends `Authorization: Bearer $CRON_SECRET` on cron
 * invocations when the CRON_SECRET env var is set — we verify it here so
 * this endpoint can't be used to spam subscribers if the URL leaks.
 */
export default async function handler(req: any, res: any) {
  if (process.env.CRON_SECRET) {
    const authHeader = req.headers['authorization']
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      res.status(401).json({ error: 'unauthorized' })
      return
    }
  }

  const slot = req.query?.slot === 'evening' ? 'evening' : 'morning'
  const todayKey = new Date().toISOString().slice(0, 10)

  const emails: string[] = (await kv.smembers('reminder:emails')) ?? []
  let sent = 0

  for (const email of emails) {
    const key = `reminder:${email}`
    const sub = await kv.get<Subscriber>(key)
    if (!sub || sub.slot !== slot || sub.lastSentDate === todayKey) continue

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? 'TOEIC Vocab Master <onboarding@resend.dev>',
        to: [email],
        subject: '⏰ ถึงเวลาฝึก TOEIC แล้ว!',
        html: `<p>สวัสดีครับ 👋</p><p>นี่คือการแจ้งเตือนให้กลับมาฝึกคำศัพท์ ไวยากรณ์ หรือทำ Mock Test ประจำวันนี้ ฝึกอย่างสม่ำเสมอคือกุญแจสำคัญของคะแนน TOEIC ที่ดีขึ้นครับ 🎯</p><p><a href="${SITE_URL}">เปิด TOEIC Vocab Master</a></p><p style="color:#898781;font-size:12px">หากไม่ต้องการรับอีเมลนี้อีก สามารถยกเลิกการแจ้งเตือนได้ที่หน้าตั้งค่าในเว็บไซต์</p>`,
      }),
    })

    if (response.ok) {
      await kv.set(key, { ...sub, lastSentDate: todayKey })
      sent++
    }
  }

  res.status(200).json({ ok: true, slot, checked: emails.length, sent })
}
