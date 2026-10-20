import { Navigate, useParams } from 'react-router-dom'
import type { LangCode } from '../../lib/langTypes'
import { balancedChunks, buildWordQuiz, POINTS_PER_LESSON, WORDS_PER_LESSON } from '../../lib/miniLesson'
import { langGrammarLessons, langVocabLessons } from '../../data/langLessons'
import { MiniLesson, type LessonCard, type WordCard } from '../../components/MiniLesson'
import { useLangLevel } from '../lang/useLangLevel'

/** One bite-sized lesson of a Chinese/Japanese chapter or grammar topic: …/:level/lesson/:kind/:itemId/:n */
export default function LangLessonPage({ lang }: { lang: LangCode }) {
  const { kind, itemId, n } = useParams()
  const { track, meta, content, loading } = useLangLevel(lang)

  if (!meta) return <Navigate to={track.path} replace />
  if (loading || !content) return <p className="py-10 text-center text-stone-400">กำลังโหลดเนื้อหา…</p>

  const base = `${track.path}/${meta.slug}`
  const index = Number(n)
  const chapter = kind === 'v' ? content.chapters.find((c) => c.id === itemId) : undefined
  const topic = kind === 'g' ? content.grammar.find((g) => g.id === itemId) : undefined
  const nodes = chapter ? langVocabLessons(base, lang, meta.slug, chapter) : topic ? langGrammarLessons(base, lang, meta.slug, topic) : []
  const node = nodes[index]
  if (!node || node.kind !== 'learn') return <Navigate to={base} replace />

  let cards: LessonCard[] = []
  let quiz
  if (chapter) {
    const words: WordCard[] = balancedChunks(chapter.words, WORDS_PER_LESSON)[index].map((w) => ({
      kind: 'word',
      id: w.id,
      word: w.word,
      reading: w.reading,
      romaji: w.romaji,
      pos: w.pos,
      meaningTh: w.meaningTh,
      example: w.example,
      exampleReading: w.exampleReading,
      exampleTh: w.exampleTh,
      mnemonicTh: w.mnemonicTh,
    }))
    cards = words
    quiz = buildWordQuiz(words, chapter.words)
  } else if (topic) {
    cards = balancedChunks(topic.keyPoints, POINTS_PER_LESSON)[index].map((k) => ({
      kind: 'point',
      label: k.label,
      pattern: k.pattern,
      explanation: k.explanation,
      example: k.example,
      exampleReading: k.exampleReading,
      exampleTh: k.exampleTh,
      highlight: k.highlight,
      check: k.check,
    }))
  }

  const following = nodes[index + 1]
  return (
    <MiniLesson
      key={node.key}
      lessonKey={node.key}
      eyebrow={`${track.flag} ${meta.code} · ${chapter ? `${chapter.emoji} ${chapter.titleTh}` : `${topic!.emoji} ${topic!.titleTh}`}`}
      title={node.titleTh}
      position={`ด่านย่อย ${index + 1}/${nodes.length}`}
      minutes={node.minutes}
      tts={track.ttsLang}
      cards={cards}
      quiz={quiz}
      exitTo={base}
      next={following && { to: following.to, label: following.kind === 'test' ? 'ทำแบบทดสอบท้ายบท' : following.titleTh }}
    />
  )
}
