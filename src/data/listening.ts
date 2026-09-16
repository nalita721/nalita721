import { listeningExamItems } from './fullMockExam'
import type { ListeningItem, ListeningPartNumber } from '../lib/types'

/**
 * Practice-mode listening bank, derived from the full mock exam's listening
 * items. Grouped items (Part 3 conversations, Part 4 talks) are flattened
 * into one entry per sub-question, each replaying the same shared audio.
 */
export const listeningItems: ListeningItem[] = listeningExamItems.flatMap((item) =>
  item.questions.map((q, qi) => ({
    id: `${item.id}-${qi}`,
    part: item.part as ListeningPartNumber,
    script: item.audioScript ?? '',
    imageDescription: item.imageDescription,
    imageId: item.imageId,
    question: q.question,
    choices: q.choices,
    answerIndex: q.answerIndex,
    transcript: item.transcript ?? '',
  })),
)

export function listeningByPart(part: 1 | 2 | 3 | 4) {
  return listeningItems.filter((item) => item.part === part)
}
