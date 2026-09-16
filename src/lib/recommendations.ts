import { CEFR_LEVELS, scoreToCefr } from '../data/cefr'
import { grammarTopics } from '../data/grammar'
import { vocabChapters } from '../data/vocabulary'
import type { LevelTestResult } from './types'

export interface RecommendationCard {
  id: string
  title: string
  description: string
  to: string
  icon: string
}

type SkillKey = keyof LevelTestResult['skillBreakdown']

const SKILL_META: Record<SkillKey, { label: string; to: string; icon: string }> = {
  vocabulary: { label: 'คำศัพท์', to: '/vocabulary', icon: '📚' },
  grammar: { label: 'ไวยากรณ์', to: '/grammar', icon: '✍️' },
  listening: { label: 'การฟัง', to: '/listening', icon: '🎧' },
  reading: { label: 'การอ่าน', to: '/reading', icon: '📝' },
}

function levelIndexOf(code: string): number {
  return CEFR_LEVELS.findIndex((l) => l.code === code)
}

export function getRecommendations(result: LevelTestResult): RecommendationCard[] {
  const level = scoreToCefr(result.totalScore)
  const levelIndex = levelIndexOf(level.code)
  const cards: RecommendationCard[] = []

  const skillsByAccuracy = (Object.entries(result.skillBreakdown) as [SkillKey, { correct: number; total: number }][])
    .filter(([, stat]) => stat.total > 0)
    .map(([key, stat]) => ({ key, accuracy: stat.correct / stat.total }))
    .sort((a, b) => a.accuracy - b.accuracy)

  if (skillsByAccuracy.length > 0) {
    const weakest = skillsByAccuracy[0]
    const meta = SKILL_META[weakest.key]
    cards.push({
      id: `weak-${weakest.key}`,
      title: `เสริมทักษะ${meta.label}`,
      description: `จากแบบทดสอบวัดระดับ คุณทำได้ ${Math.round(weakest.accuracy * 100)}% ในทักษะนี้ — เป็นจุดที่ควรฝึกเพิ่มเป็นอันดับแรก`,
      to: meta.to,
      icon: meta.icon,
    })
  }

  const grammarCandidates = grammarTopics
    .filter((t) => levelIndexOf(t.cefrLevel) <= levelIndex)
    .sort((a, b) => levelIndexOf(b.cefrLevel) - levelIndexOf(a.cefrLevel))
    .slice(0, 2)
  grammarCandidates.forEach((topic) => {
    cards.push({
      id: `grammar-${topic.id}`,
      title: `บทเรียนไวยากรณ์: ${topic.titleTh}`,
      description: topic.description,
      to: `/grammar/${topic.id}`,
      icon: topic.lesson.emoji,
    })
  })

  const vocabCandidate =
    vocabChapters.find((c) => c.cefrLevel === level.code) ??
    [...vocabChapters].sort((a, b) => levelIndexOf(a.cefrLevel) - levelIndexOf(b.cefrLevel))[0]
  if (vocabCandidate) {
    cards.push({
      id: `vocab-${vocabCandidate.id}`,
      title: `คำศัพท์: ${vocabCandidate.titleTh}`,
      description: vocabCandidate.description,
      to: `/vocabulary/${vocabCandidate.id}`,
      icon: '📖',
    })
  }

  if (levelIndex >= 2) {
    cards.push({
      id: 'mock-full',
      title: 'ฝึก Full Mock Test',
      description: 'ลองทำข้อสอบจำลองเต็มรูปแบบ 200 ข้อ ภายใต้เวลาจริง เพื่อประเมินความพร้อมสำหรับการสอบจริง',
      to: '/mock-test/full/set1',
      icon: '🎯',
    })
  } else {
    cards.push({
      id: 'mock-mini',
      title: 'ลองฝึก Mini Mock Test',
      description: 'เมื่อพื้นฐานแน่นขึ้นแล้ว ลองทำ Mini Mock Test สั้นๆ เพื่อวัดความก้าวหน้าของคุณ',
      to: '/mock-test/mini',
      icon: '🎯',
    })
  }

  const seen = new Set<string>()
  return cards.filter((card) => {
    if (seen.has(card.to)) return false
    seen.add(card.to)
    return true
  }).slice(0, 5)
}
