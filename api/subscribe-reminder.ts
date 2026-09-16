import { kv } from './_redis'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_SLOTS = new Set(['morning', 'evening'])

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
  const { email, slot, enabled } = body

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'invalid email' })
    return
  }

  const normalizedEmail = email.trim().toLowerCase()
  const key = `reminder:${normalizedEmail}`

  if (enabled === false) {
    await kv.del(key)
    await kv.srem('reminder:emails', normalizedEmail)
    res.status(200).json({ ok: true, subscribed: false })
    return
  }

  if (typeof slot !== 'string' || !VALID_SLOTS.has(slot)) {
    res.status(400).json({ error: 'invalid slot' })
    return
  }

  await kv.set(key, { email: normalizedEmail, slot, lastSentDate: null })
  await kv.sadd('reminder:emails', normalizedEmail)

  res.status(200).json({ ok: true, subscribed: true })
}
