import { runBackup } from './_backup.js'

/**
 * Runs the data backup on demand (the daily one runs with the morning cron).
 * Only callable with `Authorization: Bearer $CRON_SECRET`, since the backup
 * contains every learner's data.
 */
export default async function handler(req: any, res: any) {
  if (!process.env.CRON_SECRET || req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  const result = await runBackup()
  res.status(result.ok ? 200 : 500).json(result)
}
