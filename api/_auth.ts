import { randomBytes } from 'crypto'
import { kv } from './_redis'

export const SESSION_COOKIE = 'toeic_session'
const SESSION_TTL_SEC = 60 * 60 * 24 * 30
const TOKEN_TTL_SEC = 60 * 15
const RATE_LIMIT_WINDOW_SEC = 60 * 10
const RATE_LIMIT_MAX = 3

export function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function randomToken(): string {
  return randomBytes(32).toString('hex')
}

export async function createLoginToken(email: string): Promise<string> {
  const token = randomToken()
  await kv.set(`authtoken:${token}`, email, { ex: TOKEN_TTL_SEC })
  return token
}

/** Single-use: deletes the token as soon as it's read so a link can't be replayed. */
export async function consumeLoginToken(token: string): Promise<string | null> {
  const key = `authtoken:${token}`
  const email = await kv.get<string>(key)
  if (!email) return null
  await kv.del(key)
  return email
}

export async function createSession(email: string): Promise<string> {
  const sessionId = randomToken()
  await kv.set(`session:${sessionId}`, email, { ex: SESSION_TTL_SEC })
  return sessionId
}

function parseCookie(cookieHeader: string, name: string): string | null {
  const match = cookieHeader
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}

export async function getSessionEmail(req: any): Promise<string | null> {
  const cookieHeader = req.headers?.cookie
  if (!cookieHeader) return null
  const sessionId = parseCookie(cookieHeader, SESSION_COOKIE)
  if (!sessionId) return null
  return (await kv.get<string>(`session:${sessionId}`)) ?? null
}

export async function destroySession(req: any): Promise<void> {
  const cookieHeader = req.headers?.cookie
  const sessionId = cookieHeader ? parseCookie(cookieHeader, SESSION_COOKIE) : null
  if (sessionId) await kv.del(`session:${sessionId}`)
}

export function setSessionCookie(res: any, sessionId: string): void {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${sessionId}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SEC}`,
  )
}

export function clearSessionCookie(res: any): void {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`)
}

/** Caps login-link requests per email so the send-email endpoint can't be used to spam an inbox. */
export async function isRateLimited(email: string): Promise<boolean> {
  const key = `ratelimit:login:${email}`
  const count = await kv.incr(key)
  if (count === 1) await kv.expire(key, RATE_LIMIT_WINDOW_SEC)
  return count > RATE_LIMIT_MAX
}
