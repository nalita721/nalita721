import { getSessionEmail } from '../_auth'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }
  const email = await getSessionEmail(req)
  res.status(200).json({ email })
}
