import { getSessionEmail } from './_auth.js'
import { getOrCreateUser, updateDisplayName } from './_account.js'

export default async function handler(req: any, res: any) {
  const email = await getSessionEmail(req)
  if (!email) {
    res.status(401).json({ error: 'not authenticated' })
    return
  }

  if (req.method === 'GET') {
    const user = await getOrCreateUser(email)
    res.status(200).json(user)
    return
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
    const displayName = typeof body.displayName === 'string' ? body.displayName.trim().slice(0, 40) : ''
    if (!displayName) {
      res.status(400).json({ error: 'invalid displayName' })
      return
    }
    const updated = await updateDisplayName(email, displayName)
    res.status(200).json(updated)
    return
  }

  res.status(405).json({ error: 'method not allowed' })
}
