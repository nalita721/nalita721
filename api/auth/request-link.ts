import { createLoginToken, isRateLimited, isValidEmail, normalizeEmail } from '../_auth'

const RESEND_API_URL = 'https://api.resend.com/emails'
const SITE_URL = process.env.SITE_URL ?? 'https://toeic-nu.vercel.app'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
  const { email } = body

  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'invalid email' })
    return
  }

  const normalizedEmail = normalizeEmail(email)

  if (await isRateLimited(normalizedEmail)) {
    res.status(429).json({ error: 'ขอลิงก์บ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่' })
    return
  }

  const token = await createLoginToken(normalizedEmail)
  const link = `${SITE_URL}/api/auth/verify?token=${token}`

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? 'TOEIC Vocab Master <onboarding@resend.dev>',
      to: [normalizedEmail],
      subject: '🔑 ลิงก์เข้าสู่ระบบ TOEIC Vocab Master',
      html: `<p>สวัสดีครับ 👋</p><p>คลิกลิงก์ด้านล่างเพื่อเข้าสู่ระบบ TOEIC Vocab Master (ลิงก์มีอายุ 15 นาที และใช้ได้ครั้งเดียว)</p><p><a href="${link}">เข้าสู่ระบบ</a></p><p style="color:#898781;font-size:12px">หากคุณไม่ได้ขอลิงก์นี้ สามารถเพิกเฉยต่ออีเมลฉบับนี้ได้ ไม่มีผลใดๆ ต่อบัญชีของคุณ</p>`,
    }),
  })

  if (!response.ok) {
    res.status(502).json({ error: 'ส่งอีเมลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' })
    return
  }

  res.status(200).json({ ok: true })
}
