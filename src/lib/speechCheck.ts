const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
  'to', 'of', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'as', 'that', 'this', 'these', 'those',
  'it', 'its', 'i', 'you', 'he', 'she', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'their',
  'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'can', 'could', 'should', 'shall',
  'may', 'might', 'must', 'not', 'so', 'very', 'just', 'also', 'if', 'because', 'about',
])

function extractKeywords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  )
}

export interface SpeechAnalysis {
  wordCount: number
  matchedKeywords: string[]
  sampleKeywordCount: number
  messages: string[]
}

/**
 * Best-effort, free feedback on an open-ended spoken answer — there's no single "correct" answer
 * to these questions, so this compares vocabulary overlap with the sample answer and basic
 * length/fluency signals rather than grading right/wrong.
 */
export function analyzeSpeech(transcript: string, sampleAnswer: string): SpeechAnalysis {
  const words = transcript.trim().split(/\s+/).filter(Boolean)
  const transcriptKeywords = extractKeywords(transcript)
  const sampleKeywords = extractKeywords(sampleAnswer)
  const matched = [...sampleKeywords].filter((k) => transcriptKeywords.has(k))

  const messages: string[] = []
  if (words.length < 5) {
    messages.push('คำตอบค่อนข้างสั้น ลองขยายความเพิ่มอีกนิด เช่น ให้เหตุผลหรือยกตัวอย่างประกอบ')
  } else if (words.length >= 12) {
    messages.push('พูดได้ยาวและมีรายละเอียดดี 👍')
  }

  if (sampleKeywords.size > 0) {
    const ratio = matched.length / sampleKeywords.size
    if (ratio >= 0.4) {
      messages.push('คำศัพท์ที่ใช้ใกล้เคียงกับหัวข้อของตัวอย่างคำตอบดี')
    } else {
      messages.push('ลองใช้คำศัพท์ที่เกี่ยวข้องกับหัวข้อเพิ่มเติม ลองเทียบกับตัวอย่างคำตอบด้านล่าง')
    }
  }

  return { wordCount: words.length, matchedKeywords: matched, sampleKeywordCount: sampleKeywords.size, messages }
}
