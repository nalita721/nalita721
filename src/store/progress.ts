import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { newCard, reviewCard } from '../lib/srs'
import { LEARNING_PATH, pathStepKey, stepIndexOfContent, type PathStepType } from '../data/learningPath'
import type {
  LevelTestResult,
  MockTestResult,
  PartStat,
  QuizQuality,
  SrsCardState,
  StatPart,
} from '../lib/types'

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function dailyBase(s: ProgressSnapshot, today: string) {
  return s.dailyMissionDate === today
    ? { wordsReviewed: s.dailyWordsReviewed, questionsAnswered: s.dailyQuestionsAnswered }
    : { wordsReviewed: 0, questionsAnswered: 0 }
}

export interface ProgressSnapshot {
  xp: number
  streak: number
  lastActiveDay: string | null
  srsMap: Record<string, SrsCardState>
  partStats: Record<StatPart, PartStat>
  mockResults: MockTestResult[]
  levelTestResult: LevelTestResult | null
  pathUnlockedIndex: number
  pathPassedSteps: string[]
  dailyMissionDate: string | null
  dailyWordsReviewed: number
  dailyQuestionsAnswered: number
}

interface ProgressState extends ProgressSnapshot {
  addXp: (amount: number) => void
  touchStreak: () => void
  getCard: (wordId: string) => SrsCardState
  reviewWord: (wordId: string, quality: QuizQuality) => void
  recordAnswer: (part: StatPart, correct: boolean) => void
  addMockResult: (result: MockTestResult) => void
  setLevelTestResult: (result: LevelTestResult) => void
  passStep: (type: PathStepType, id: string) => void
  hydrate: (snapshot: ProgressSnapshot) => void
  resetProgress: () => void
}

const emptyStats: Record<StatPart, PartStat> = {
  vocabulary: { correct: 0, total: 0 },
  grammar: { correct: 0, total: 0 },
  listening: { correct: 0, total: 0 },
  reading: { correct: 0, total: 0 },
  mock: { correct: 0, total: 0 },
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastActiveDay: null,
      srsMap: {},
      partStats: emptyStats,
      mockResults: [],
      levelTestResult: null,
      pathUnlockedIndex: 0,
      pathPassedSteps: [],
      dailyMissionDate: null,
      dailyWordsReviewed: 0,
      dailyQuestionsAnswered: 0,

      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      touchStreak: () =>
        set((s) => {
          const today = todayKey()
          if (s.lastActiveDay === today) return s
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
          const nextStreak = s.lastActiveDay === yesterday ? s.streak + 1 : 1
          return { lastActiveDay: today, streak: nextStreak }
        }),

      getCard: (wordId) => get().srsMap[wordId] ?? newCard(wordId),

      reviewWord: (wordId, quality) =>
        set((s) => {
          const current = s.srsMap[wordId] ?? newCard(wordId)
          const updated = reviewCard(current, quality)
          const today = todayKey()
          const base = dailyBase(s, today)
          return {
            srsMap: { ...s.srsMap, [wordId]: updated },
            xp: s.xp + (quality >= 3 ? 5 : 1),
            dailyMissionDate: today,
            dailyWordsReviewed: base.wordsReviewed + 1,
            dailyQuestionsAnswered: base.questionsAnswered,
          }
        }),

      recordAnswer: (part, correct) =>
        set((s) => {
          const prev = s.partStats[part]
          const today = todayKey()
          const base = dailyBase(s, today)
          return {
            partStats: {
              ...s.partStats,
              [part]: { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 },
            },
            xp: s.xp + (correct ? 3 : 0),
            dailyMissionDate: today,
            dailyWordsReviewed: base.wordsReviewed,
            dailyQuestionsAnswered: base.questionsAnswered + 1,
          }
        }),

      addMockResult: (result) => set((s) => ({ mockResults: [...s.mockResults, result] })),

      setLevelTestResult: (result) => set({ levelTestResult: result }),

      passStep: (type, id) =>
        set((s) => {
          const idx = stepIndexOfContent(type, id)
          if (idx === -1) return s
          const key = pathStepKey(type, id)
          const pathPassedSteps = s.pathPassedSteps.includes(key) ? s.pathPassedSteps : [...s.pathPassedSteps, key]
          const pathUnlockedIndex = Math.min(Math.max(s.pathUnlockedIndex, idx + 1), LEARNING_PATH.length)
          return { pathPassedSteps, pathUnlockedIndex }
        }),

      hydrate: (snapshot) => set(snapshot),

      resetProgress: () =>
        set({
          xp: 0,
          streak: 0,
          lastActiveDay: null,
          srsMap: {},
          partStats: emptyStats,
          mockResults: [],
          levelTestResult: null,
          pathUnlockedIndex: 0,
          pathPassedSteps: [],
          dailyMissionDate: null,
          dailyWordsReviewed: 0,
          dailyQuestionsAnswered: 0,
        }),
    }),
    { name: 'toeic-vocab-progress' },
  ),
)
