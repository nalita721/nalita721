import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { vocabChapters } from '../../data/vocabulary'
import { grammarTopics } from '../../data/grammar'
import { listeningLessonFor } from '../../data/listeningLessons'
import { LEARNING_PATH, TYPE_ICON, type PathStep } from '../../data/learningPath'
import { findStep, stepLessons } from '../../data/pathLessons'
import { balancedChunks, buildWordQuiz, POINTS_PER_LESSON, TIPS_PER_LESSON, WORDS_PER_LESSON } from '../../lib/miniLesson'
import { useProgressStore } from '../../store/progress'
import { MiniLesson, type LessonCard, type QuizItem, type WordCard } from '../../components/MiniLesson'

function lessonContent(step: PathStep, n: number): { cards: LessonCard[]; quiz?: QuizItem[] } | null {
  if (step.type === 'vocabulary') {
    const chapter = vocabChapters.find((c) => c.id === step.id)
    const words = chapter && balancedChunks(chapter.words, WORDS_PER_LESSON)[n]
    if (!chapter || !words) return null
    const cards: WordCard[] = words.map((w) => ({
      kind: 'word',
      id: w.id,
      word: w.term,
      reading: w.pronunciationTh,
      pos: w.pos,
      meaningTh: w.meaningTh,
      example: w.exampleEn,
      exampleTh: w.exampleTh,
      mnemonicTh: w.mnemonicTh,
    }))
    return { cards, quiz: buildWordQuiz(cards, chapter.words) }
  }
  if (step.type === 'grammar') {
    const topic = grammarTopics.find((t) => t.id === step.id)
    const kps = topic && balancedChunks(topic.lesson.keyPoints, POINTS_PER_LESSON)[n]
    if (!kps) return null
    return {
      cards: kps.map((k) => ({
        kind: 'point',
        label: k.label,
        pattern: k.pattern,
        explanation: k.explanation,
        example: k.exampleEn,
        exampleTh: k.exampleTh,
        highlight: k.highlight,
        check: k.check,
      })),
    }
  }
  if (step.type === 'listening') {
    const tips = balancedChunks(listeningLessonFor(Number(step.id) as 1 | 2 | 3 | 4)?.tips ?? [], TIPS_PER_LESSON)[n]
    if (!tips?.length) return null
    return {
      cards: tips.map((t) => ({
        kind: 'point',
        label: t.label,
        pattern: t.pattern,
        explanation: t.explanation,
        example: t.exampleEn,
        exampleTh: t.exampleTh,
        highlight: t.highlight,
        check: { audio: t.check.audio, sentence: t.check.question, choices: t.check.choices, answerIndex: t.check.answerIndex, explanation: t.check.explanation },
      })),
    }
  }
  return null
}

/** One bite-sized lesson of an English learning-path step: /lesson/:type/:id/:n */
export default function PathLessonPage() {
  const { type, id, n } = useParams()
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const reviewWord = useProgressStore((s) => s.reviewWord)
  const step = findStep(type, id)
  const index = Number(n)
  const content = useMemo(() => (step ? lessonContent(step, index) : null), [step, index])

  if (!step || !content || !Number.isInteger(index)) return <Navigate to="/study-plan" replace />

  const nodes = stepLessons(step)
  const node = nodes[index]
  const stepIndex = LEARNING_PATH.indexOf(step)
  const following = index + 1 < nodes.length ? nodes[index + 1] : stepIndex + 1 < LEARNING_PATH.length ? stepLessons(LEARNING_PATH[stepIndex + 1])[0] : undefined
  const part = step.type === 'vocabulary' ? 'vocabulary' : step.type === 'grammar' ? 'grammar' : 'listening'

  return (
    <MiniLesson
      key={node.key}
      lessonKey={node.key}
      eyebrow={`${TYPE_ICON[step.type]} ${step.labelTh}`}
      title={node.titleTh}
      position={`ด่านย่อย ${index + 1}/${nodes.length}`}
      minutes={node.minutes}
      tts="en-US"
      cards={content.cards}
      quiz={content.quiz}
      exitTo="/study-plan"
      next={following && { to: following.to, label: index + 1 < nodes.length ? following.titleTh : 'ด่านถัดไป' }}
      onCheck={(correct) => recordAnswer(part, correct)}
      onQuizAnswer={(wordId, correct) => {
        reviewWord(wordId, correct ? 4 : 1)
        recordAnswer('vocabulary', correct)
      }}
    />
  )
}
