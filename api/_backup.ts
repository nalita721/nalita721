import { gzipSync } from 'node:zlib'
import { kv } from './_redis.js'

const RESEND_API_URL = 'https://api.resend.com/emails'

/** Short-lived or security-sensitive keys that are never backed up (logins can simply be redone). */
const SKIP_PREFIXES = ['session:', 'authtoken:', 'ratelimit:']

export interface BackupEntry {
  type: 'string' | 'set'
  value: unknown
}

export interface Backup {
  createdAt: string
  keyCount: number
  data: Record<string, BackupEntry>
}

async function allKeys(): Promise<string[]> {
  const keys: string[] = []
  let cursor: string | number = 0
  do {
    const [next, batch]: [string | number, string[]] = await kv.scan(cursor, { count: 500 })
    keys.push(...batch)
    cursor = next
  } while (String(cursor) !== '0')
  return keys.filter((k) => !SKIP_PREFIXES.some((p) => k.startsWith(p)))
}

/** Reads every learner-data key (progress, users, friends, duels, reminders) into one JSON object. */
export async function exportData(): Promise<Backup> {
  const keys = await allKeys()
  const data: Record<string, BackupEntry> = {}
  for (let i = 0; i < keys.length; i += 200) {
    const batch = keys.slice(i, i + 200)
    const types = kv.pipeline()
    batch.forEach((k) => types.type(k))
    const kinds = (await types.exec()) as string[]
    const reads = kv.pipeline()
    batch.forEach((k, j) => (kinds[j] === 'set' ? reads.smembers(k) : reads.get(k)))
    const values = await reads.exec()
    batch.forEach((k, j) => {
      if (kinds[j] === 'string' || kinds[j] === 'set') data[k] = { type: kinds[j] as BackupEntry['type'], value: values[j] }
    })
  }
  return { createdAt: new Date().toISOString(), keyCount: Object.keys(data).length, data }
}

/**
 * Emails a gzipped copy of all learner data to BACKUP_EMAIL. Every day's mail
 * stays in the inbox, so older copies remain available for restoring.
 */
export async function runBackup(): Promise<{ ok: boolean; keys?: number; reason?: string }> {
  const to = process.env.BACKUP_EMAIL
  if (!to) return { ok: false, reason: 'BACKUP_EMAIL is not set' }
  const backup = await exportData()
  const day = backup.createdAt.slice(0, 10)
  const file = gzipSync(Buffer.from(JSON.stringify(backup)))
  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? 'LinguaMaster <onboarding@resend.dev>',
      to,
      subject: `LinguaMaster backup ${day} (${backup.keyCount} keys)`,
      text: `ไฟล์สำรองข้อมูลผู้เรียนประจำวันที่ ${day} จำนวน ${backup.keyCount} รายการ\nเก็บอีเมลนี้ไว้ ถ้าต้องกู้คืนให้ใช้: npm run backup:restore -- <ไฟล์>`,
      attachments: [{ filename: `linguamaster-backup-${day}.json.gz`, content: file.toString('base64') }],
    }),
  })
  if (!response.ok) return { ok: false, reason: `email failed: ${response.status}` }
  return { ok: true, keys: backup.keyCount }
}
