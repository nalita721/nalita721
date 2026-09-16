import { kv } from './_redis'
import { getSessionEmail } from './_auth'
import { getOrCreateUser } from './_account'
import { buildDuelQuestions, randomDuelId, saveDuel, type DuelState } from './_duel'
import { vocabChapters } from '../src/data/vocabulary'

export default async function handler(req: any, res: any) {
  const email = await getSessionEmail(req)
  if (!email) {
    res.status(401).json({ error: 'not authenticated' })
    return
  }

  if (req.method === 'GET') {
    const duelIds: string[] = (await kv.smembers(`duels:${email}`)) ?? []
    const duels = (
      await Promise.all(duelIds.map((id) => kv.get<DuelState>(`duel:${id}`)))
    ).filter((d): d is DuelState => d !== null)

    const summaries = duels
      .map((duel) => {
        const opponentIndex = duel.players[0] === email ? 1 : 0
        const myProgress = duel.progress[email]
        const opponentProgress = duel.progress[duel.players[opponentIndex]]
        return {
          id: duel.id,
          chapterTitleTh: duel.chapterTitleTh,
          opponentName: duel.displayNames[opponentIndex],
          status: duel.status,
          myTurn: !myProgress?.completedAt,
          myScore: myProgress?.completedAt ? myProgress.score : null,
          opponentScore: duel.status === 'finished' ? opponentProgress?.score ?? null : null,
          questionCount: duel.questions.length,
          createdAt: duel.createdAt,
        }
      })
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

    res.status(200).json({ duels: summaries })
    return
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {}
    const friendEmail = typeof body.friendEmail === 'string' ? body.friendEmail.trim().toLowerCase() : ''
    const chapterId = typeof body.chapterId === 'string' ? body.chapterId : ''

    if (!friendEmail || !chapterId) {
      res.status(400).json({ error: 'invalid request' })
      return
    }

    const isFriend = await kv.sismember(`friends:${email}`, friendEmail)
    if (!isFriend) {
      res.status(403).json({ error: 'ต้องเป็นเพื่อนกันก่อนถึงจะท้าแข่งได้' })
      return
    }

    const chapter = vocabChapters.find((c) => c.id === chapterId)
    const questions = buildDuelQuestions(chapterId)
    if (!chapter || !questions) {
      res.status(400).json({ error: 'invalid chapter' })
      return
    }

    const [me, opponent] = await Promise.all([getOrCreateUser(email), getOrCreateUser(friendEmail)])

    const duelId = randomDuelId()
    const emptyProgress = () => ({ answers: Array(questions.length).fill(null), score: null, completedAt: null })
    const duel: DuelState = {
      id: duelId,
      chapterId,
      chapterTitleTh: chapter.titleTh,
      questions,
      players: [email, friendEmail],
      displayNames: [me.displayName, opponent.displayName],
      progress: { [email]: emptyProgress(), [friendEmail]: emptyProgress() },
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    await saveDuel(duel)
    await kv.sadd(`duels:${email}`, duelId)
    await kv.sadd(`duels:${friendEmail}`, duelId)

    res.status(200).json({ id: duelId })
    return
  }

  res.status(405).json({ error: 'method not allowed' })
}
