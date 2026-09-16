export const FREE_VOCAB_CHAPTER_ID = 'office-hr'
export const FREE_GRAMMAR_TOPIC_ID = 'basic-sentence'
export const FREE_LISTENING_PART = 1
export const FREE_READING_PASSAGE_ID = 'r6-1'

export function isVocabChapterFree(chapterId: string | undefined): boolean {
  return chapterId === FREE_VOCAB_CHAPTER_ID
}

export function isGrammarTopicFree(topicId: string | undefined): boolean {
  return topicId === FREE_GRAMMAR_TOPIC_ID
}

export function isListeningPartFree(part: string | undefined): boolean {
  return Number(part) === FREE_LISTENING_PART
}

export function isReadingPassageFree(passageId: string | undefined): boolean {
  return passageId === FREE_READING_PASSAGE_ID
}
