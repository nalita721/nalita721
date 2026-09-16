import { clearSessionCookie, destroySession } from '../_auth.js'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }
  await destroySession(req)
  clearSessionCookie(res)
  res.status(200).json({ ok: true })
}
