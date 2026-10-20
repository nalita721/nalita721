import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { newCard, reviewCard } from '../lib/srs'
import { LEARNING_PATH, pathStepKey, reconcileUnlockedIndex, stepIndexOfContent, type PathStepType } from '../data/learningPath'
import { GAME_PATH_PASS_THRESHOLD } from '../data/vocabularyGamePath'
import { DEFAULT_DAILY_GOAL, LESSON_XP } from '../lib/miniLesson'
import type { CustomIqWord } from '../data/iqTest'
import type {
  GameStageResult,
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

/** Today's count of finished lessons, starting from 0 on a new day. */
function lessonsToday(s: ProgressSnapshot, today: string): number {
  return s.dailyLessonsDate === today ? s.dailyLessons : 0
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
  wordPathStageResults: Record<string, GameStageResult>
  customIqWords: CustomIqWord[]
  claimedChests: string[]
  /** Best score ratio (0–1) per Chinese/Japanese quiz, lesson or mock, keyed like 'zh:hsk1:mock' */
  langBest: Record<string, number>
  /** Bite-sized lessons completed, keyed like 'grammar:tense#0' or 'zh:hsk1:v:ch1#2' */
  passedLessons: string[]
  /** Card to reopen a lesson at when the learner left it halfway */
  lessonResume: Record<string, number>
  /** Lessons per day the learner aims for */
  dailyGoal: number
  dailyLessonsDate: string | null
  dailyLessons: number
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
  completeStage: (stageKey: string, scoreFraction: number, bonusXp: number) => void
  addCustomIqWord: (word: CustomIqWord) => void
  removeCustomIqWord: (id: string) => void
  claimChest: (key: string, xp: number) => void
  recordLangBest: (key: string, ratio: number) => void
  completeLesson: (key: string) => void
  setLessonResume: (key: string, card: number | null) => void
  setDailyGoal: (goal: number) => void
  /** Counts one finished lesson or test toward today's goal */
  countDailyLesson: () => void
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
      wordPathStageResults: {},
      customIqWords: [],
      claimedChests: [],
      langBest: {},
      passedLessons: [],
      lessonResume: {},
      dailyGoal: DEFAULT_DAILY_GOAL,
      dailyLessonsDate: null,
      dailyLessons: 0,

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
          const today = todayKey()
          return { pathPassedSteps, pathUnlockedIndex, dailyLessonsDate: today, dailyLessons: lessonsToday(s, today) + 1 }
        }),

      completeStage: (stageKeyArg, scoreFraction, bonusXp) =>
        set((s) => {
          const prev = s.wordPathStageResults[stageKeyArg]
          const alreadyPassed = prev?.passed ?? false
          const passed = alreadyPassed || scoreFraction >= GAME_PATH_PASS_THRESHOLD
          const newlyPassed = !alreadyPassed && passed
          const bestScore = Math.max(prev?.bestScore ?? 0, scoreFraction)
          return {
            wordPathStageResults: {
              ...s.wordPathStageResults,
              [stageKeyArg]: {
                bestScore,
                passed,
                attempts: (prev?.attempts ?? 0) + 1,
                lastPlayedAt: new Date().toISOString(),
              },
            },
            xp: s.xp + (newlyPassed ? bonusXp : 0),
          }
        }),

      addCustomIqWord: (word) => set((s) => ({ customIqWords: [...s.customIqWords, word] })),

      removeCustomIqWord: (id) => set((s) => ({ customIqWords: s.customIqWords.filter((w) => w.id !== id) })),

      claimChest: (key, xp) =>
        set((s) => (s.claimedChests.includes(key) ? s : { claimedChests: [...s.claimedChests, key], xp: s.xp + xp })),

      recordLangBest: (key, ratio) =>
        set((s) => (ratio <= (s.langBest[key] ?? -1) ? s : { langBest: { ...s.langBest, [key]: ratio } })),

      completeLesson: (key) =>
        set((s) => {
          const today = todayKey()
          const isNew = !s.passedLessons.includes(key)
          const lessonResume = { ...s.lessonResume }
          delete lessonResume[key]
          return {
            passedLessons: isNew ? [...s.passedLessons, key] : s.passedLessons,
            lessonResume,
            xp: s.xp + (isNew ? LESSON_XP : 0),
            dailyLessonsDate: today,
            dailyLessons: lessonsToday(s, today) + 1,
          }
        }),

      setLessonResume: (key, card) =>
        set((s) => {
          if ((s.lessonResume[key] ?? null) === card) return s
          const lessonResume = { ...s.lessonResume }
          if (card === null) delete lessonResume[key]
          else lessonResume[key] = card
          return { lessonResume }
        }),

      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      countDailyLesson: () =>
        set((s) => {
          const today = todayKey()
          return { dailyLessonsDate: today, dailyLessons: lessonsToday(s, today) + 1 }
        }),

      hydrate: (snapshot) =>
        set({
          ...snapshot,
          // snapshots saved before these fields existed don't carry them
          claimedChests: snapshot.claimedChests ?? [],
          langBest: snapshot.langBest ?? {},
          passedLessons: snapshot.passedLessons ?? [],
          lessonResume: snapshot.lessonResume ?? {},
          dailyGoal: snapshot.dailyGoal ?? DEFAULT_DAILY_GOAL,
          dailyLessonsDate: snapshot.dailyLessonsDate ?? null,
          dailyLessons: snapshot.dailyLessons ?? 0,
          pathUnlockedIndex: reconcileUnlockedIndex(snapshot.pathUnlockedIndex, snapshot.pathPassedSteps),
        }),

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
          wordPathStageResults: {},
          customIqWords: [],
          claimedChests: [],
          langBest: {},
          passedLessons: [],
          lessonResume: {},
          dailyLessonsDate: null,
          dailyLessons: 0,
        }),
    }),
    {
      name: 'toeic-vocab-progress',
      merge: (persisted, current) => {
        const merged = { ...current, ...(persisted as Partial<ProgressState>) }
        return { ...merged, pathUnlockedIndex: reconcileUnlockedIndex(merged.pathUnlockedIndex, merged.pathPassedSteps) }
      },
    },
  ),
)
