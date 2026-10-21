/**
 * Restores learner data from a daily backup file (the .json.gz attached to
 * the backup email). Dry run by default: it only reports what it would write.
 *
 *   npm run backup:restore -- linguamaster-backup-2026-10-21.json.gz          # dry run
 *   npm run backup:restore -- linguamaster-backup-2026-10-21.json.gz --write  # restore
 *
 * Needs the same Redis credentials as the site:
 * UPSTASH_REDIS_REST_KV_REST_API_URL and UPSTASH_REDIS_REST_KV_REST_API_TOKEN
 * (copy them from Vercel → Settings → Environment Variables).
 * Keys in the backup overwrite the current ones; keys not in it are left alone.
 */
import { readFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { Redis } from '@upstash/redis'

interface Backup {
  createdAt: string
  keyCount: number
  data: Record<string, { type: 'string' | 'set'; value: unknown }>
}

async function main() {
  const [file, flag] = process.argv.slice(2)
  if (!file) throw new Error('usage: npm run backup:restore -- <backup.json.gz> [--write]')
  const raw = readFileSync(file)
  const backup = JSON.parse((file.endsWith('.gz') ? gunzipSync(raw) : raw).toString('utf8')) as Backup
  const entries = Object.entries(backup.data)
  const byPrefix: Record<string, number> = {}
  for (const [key] of entries) byPrefix[key.split(':')[0]] = (byPrefix[key.split(':')[0]] ?? 0) + 1
  console.log(`backup from ${backup.createdAt}: ${entries.length} keys`, byPrefix)

  if (flag !== '--write') {
    console.log('dry run only — add --write to restore')
    return
  }
  const kv = new Redis({
    url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
  })
  for (const [key, entry] of entries) {
    if (entry.type === 'set') {
      const members = entry.value as string[]
      await kv.del(key)
      if (members.length) await kv.sadd(key, members[0], ...members.slice(1))
    } else {
      await kv.set(key, entry.value)
    }
  }
  console.log(`restored ${entries.length} keys`)
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
