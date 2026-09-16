import { getSessionEmail } from '../_auth.js'
import { getDuel, redactForViewer } from '../_duel.js'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const email = await getSessionEmail(req)
  if (!email) {
    res.status(401).json({ error: 'not authenticated' })
    return
  }

  const id = typeof req.query?.id === 'string' ? req.query.id : null
  if (!id) {
    res.status(400).json({ error: 'invalid duel id' })
    return
  }

  const duel = await getDuel(id)
  if (!duel || !duel.players.includes(email)) {
    res.status(404).json({ error: 'not found' })
    return
  }

  res.status(200).json(redactForViewer(duel, email))
}
