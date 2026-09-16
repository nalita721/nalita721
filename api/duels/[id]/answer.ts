import { getSessionEmail } from '../../_auth'
import { getDuel, redactForViewer, saveDuel } from '../../_duel'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
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

  const myProgress = duel.progress[email]
  if (myProgress.completedAt) {
    res.status(409).json({ error: 'คุณตอบไปแล้ว' })
    return
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
  const answers = Array.isArray(body.answers) ? body.answers : null
  if (!answers || answers.length !== duel.questions.length) {
    res.status(400).json({ error: 'invalid answers' })
    return
  }

  const normalizedAnswers = answers.map((a: unknown) => (typeof a === 'number' ? a : null))
  const score = duel.questions.reduce(
    (sum, q, i) => sum + (normalizedAnswers[i] === q.answerIndex ? 1 : 0),
    0,
  )

  duel.progress[email] = { answers: normalizedAnswers, score, completedAt: new Date().toISOString() }

  const opponentEmail = duel.players.find((p) => p !== email)!
  if (duel.progress[opponentEmail]?.completedAt) {
    duel.status = 'finished'
  }

  await saveDuel(duel)
  res.status(200).json(redactForViewer(duel, email))
}
