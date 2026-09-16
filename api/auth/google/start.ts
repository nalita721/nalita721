import { randomBytes } from 'crypto'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const SITE_URL = process.env.SITE_URL ?? 'https://toeic-nu.vercel.app'
const STATE_COOKIE = 'google_oauth_state'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  if (!clientId) {
    res.status(500).json({ error: 'Google login is not configured' })
    return
  }

  const state = randomBytes(16).toString('hex')
  res.setHeader(
    'Set-Cookie',
    `${STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
  )

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${SITE_URL}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'online',
    prompt: 'select_account',
    state,
  })

  res.writeHead(302, { Location: `${GOOGLE_AUTH_URL}?${params.toString()}` })
  res.end()
}
