import { consumeLoginToken, createSession, setSessionCookie } from '../_auth.js'

const SITE_URL = process.env.SITE_URL ?? 'https://toeic-nu.vercel.app'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const token = typeof req.query?.token === 'string' ? req.query.token : null
  if (!token) {
    res.writeHead(302, { Location: `${SITE_URL}/login?error=missing_token` })
    res.end()
    return
  }

  const email = await consumeLoginToken(token)
  if (!email) {
    res.writeHead(302, { Location: `${SITE_URL}/login?error=expired` })
    res.end()
    return
  }

  const sessionId = await createSession(email)
  setSessionCookie(res, sessionId)
  res.writeHead(302, { Location: `${SITE_URL}/` })
  res.end()
}
