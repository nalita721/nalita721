import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useProgressStore } from '../store/progress'
import { CheckingAccess, LockedFeature, LockedPathStep } from './LockedFeature'
import { currentPathStep, getEffectivePathIndex, isStepUnlocked } from '../data/learningPath'
import {
  isGrammarTopicFree,
  isListeningPartFree,
  isReadingPassageFree,
  isVocabChapterFree,
} from '../lib/access'

export function RequireAuth({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status)
  if (status === 'loading') return <CheckingAccess />
  if (status !== 'authenticated') return <LockedFeature />
  return <>{children}</>
}

function useEffectivePathIndex(): number {
  const pathUnlockedIndex = useProgressStore((s) => s.pathUnlockedIndex)
  const levelCefr = useProgressStore((s) => s.levelTestResult?.cefr)
  return getEffectivePathIndex(pathUnlockedIndex, levelCefr)
}

export function GatedVocabChapter({ children }: { children: ReactNode }) {
  const { chapterId } = useParams()
  const status = useAuthStore((s) => s.status)
  const effectiveIndex = useEffectivePathIndex()

  if (status === 'loading') return <CheckingAccess />

  if (status !== 'authenticated') {
    if (isVocabChapterFree(chapterId)) return <>{children}</>
    return <LockedFeature title="บทเรียนนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกคำศัพท์ทุกบท (ลองฟรีได้ที่บทที่ 1)" />
  }

  if (isStepUnlocked('vocabulary', chapterId, effectiveIndex)) return <>{children}</>
  const step = currentPathStep(effectiveIndex)
  return <LockedPathStep currentTo={step.to} currentLabel={step.labelTh} />
}

export function GatedGrammarTopic({ children }: { children: ReactNode }) {
  const { topicId } = useParams()
  const status = useAuthStore((s) => s.status)
  const effectiveIndex = useEffectivePathIndex()

  if (status === 'loading') return <CheckingAccess />

  if (status !== 'authenticated') {
    if (isGrammarTopicFree(topicId)) return <>{children}</>
    return <LockedFeature title="บทเรียนนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกไวยากรณ์ทุกหัวข้อ (ลองฟรีได้ที่บทพื้นฐาน)" />
  }

  if (isStepUnlocked('grammar', topicId, effectiveIndex)) return <>{children}</>
  const step = currentPathStep(effectiveIndex)
  return <LockedPathStep currentTo={step.to} currentLabel={step.labelTh} />
}

export function GatedListeningPart({ children }: { children: ReactNode }) {
  const { part } = useParams()
  const status = useAuthStore((s) => s.status)
  const effectiveIndex = useEffectivePathIndex()

  if (status === 'loading') return <CheckingAccess />

  if (status !== 'authenticated') {
    if (isListeningPartFree(part)) return <>{children}</>
    return <LockedFeature title="แบบฝึกนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกการฟังทุก Part (ลองฟรีได้ที่ Part 1)" />
  }

  if (isStepUnlocked('listening', part, effectiveIndex)) return <>{children}</>
  const step = currentPathStep(effectiveIndex)
  return <LockedPathStep currentTo={step.to} currentLabel={step.labelTh} />
}

export function GatedReadingPassage({ children }: { children: ReactNode }) {
  const { passageId } = useParams()
  const status = useAuthStore((s) => s.status)
  const effectiveIndex = useEffectivePathIndex()

  if (status === 'loading') return <CheckingAccess />

  if (status !== 'authenticated') {
    if (isReadingPassageFree(passageId)) return <>{children}</>
    return <LockedFeature title="บทความนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกบทอ่านทั้งหมด" />
  }

  if (isStepUnlocked('reading', passageId, effectiveIndex)) return <>{children}</>
  const step = currentPathStep(effectiveIndex)
  return <LockedPathStep currentTo={step.to} currentLabel={step.labelTh} />
}
