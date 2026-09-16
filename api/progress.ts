import { kv } from './_redis.js'
import { getSessionEmail } from './_auth.js'

const MAX_BODY_BYTES = 200_000

export default async function handler(req: any, res: any) {
  const email = await getSessionEmail(req)
  if (!email) {
    res.status(401).json({ error: 'not authenticated' })
    return
  }

  if (req.method === 'GET') {
    const data = await kv.get(`progress:${email}`)
    res.status(200).json({ data: data ?? null })
    return
  }

  if (req.method === 'POST') {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {})
    if (raw.length > MAX_BODY_BYTES) {
      res.status(413).json({ error: 'payload too large' })
      return
    }
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
      res.status(400).json({ error: 'invalid body' })
      return
    }
    await kv.set(`progress:${email}`, body)
    res.status(200).json({ ok: true })
    return
  }

  res.status(405).json({ error: 'method not allowed' })
}
