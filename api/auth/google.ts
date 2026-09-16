import { randomBytes } from 'crypto'
import { createSession, setSessionCookie } from '../_auth.js'

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SITE_URL = process.env.SITE_URL ?? 'https://toeic-nu.vercel.app'
const REDIRECT_URI = `${SITE_URL}/api/auth/google`
const STATE_COOKIE = 'google_oauth_state'

function parseCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null
  const match = cookieHeader
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}

function decodeIdToken(idToken: string): { email?: string; email_verified?: boolean } {
  const payload = idToken.split('.')[1]
  const json = Buffer.from(payload, 'base64').toString('utf8')
  return JSON.parse(json)
}

function failAndRedirect(res: any) {
  res.writeHead(302, { Location: `${SITE_URL}/login?error=google_failed` })
  res.end()
}

/** Handles both legs of the OAuth flow on one endpoint: no `code` yet = kick off the redirect to Google; `code` present = the callback Google sends the browser back to. */
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const code = typeof req.query?.code === 'string' ? req.query.code : null

  if (!code) {
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
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'online',
      prompt: 'select_account',
      state,
    })

    res.writeHead(302, { Location: `${GOOGLE_AUTH_URL}?${params.toString()}` })
    res.end()
    return
  }

  const state = typeof req.query?.state === 'string' ? req.query.state : null
  const cookieState = parseCookie(req.headers?.cookie, STATE_COOKIE)

  res.setHeader('Set-Cookie', `${STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`)

  if (!state || !cookieState || state !== cookieState || !clientId || !clientSecret) {
    failAndRedirect(res)
    return
  }

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenResponse.ok) {
    console.error('Google token exchange failed', tokenResponse.status, await tokenResponse.text().catch(() => ''))
    failAndRedirect(res)
    return
  }

  const tokenData = (await tokenResponse.json()) as { id_token?: string }
  if (!tokenData.id_token) {
    failAndRedirect(res)
    return
  }

  const claims = decodeIdToken(tokenData.id_token)
  if (!claims.email || claims.email_verified !== true) {
    failAndRedirect(res)
    return
  }

  const normalizedEmail = claims.email.trim().toLowerCase()
  const sessionId = await createSession(normalizedEmail)
  setSessionCookie(res, sessionId)
  res.writeHead(302, { Location: `${SITE_URL}/` })
  res.end()
}
