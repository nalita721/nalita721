import { randomBytes } from 'crypto'
import { kv } from './_redis'

export interface UserRecord {
  email: string
  displayName: string
  friendCode: string
  createdAt: string
}

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const CODE_LENGTH = 6

function randomFriendCode(): string {
  const bytes = randomBytes(CODE_LENGTH)
  let code = ''
  for (let i = 0; i < CODE_LENGTH; i++) code += CODE_CHARS[bytes[i] % CODE_CHARS.length]
  return code
}

export async function getOrCreateUser(email: string): Promise<UserRecord> {
  const existing = await kv.get<UserRecord>(`user:${email}`)
  if (existing) return existing

  let code = randomFriendCode()
  for (let attempt = 0; attempt < 5; attempt++) {
    const taken = await kv.get(`friendcode:${code}`)
    if (!taken) break
    code = randomFriendCode()
  }

  const record: UserRecord = {
    email,
    displayName: email.split('@')[0],
    friendCode: code,
    createdAt: new Date().toISOString(),
  }
  await kv.set(`user:${email}`, record)
  await kv.set(`friendcode:${code}`, email)
  return record
}

export async function updateDisplayName(email: string, displayName: string): Promise<UserRecord> {
  const user = await getOrCreateUser(email)
  const updated: UserRecord = { ...user, displayName }
  await kv.set(`user:${email}`, updated)
  return updated
}

export async function getUserByFriendCode(code: string): Promise<string | null> {
  return (await kv.get<string>(`friendcode:${code.toUpperCase()}`)) ?? null
}
