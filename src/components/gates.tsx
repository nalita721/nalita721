import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { CheckingAccess, LockedFeature } from './LockedFeature'
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

export function GatedVocabChapter({ children }: { children: ReactNode }) {
  const { chapterId } = useParams()
  const status = useAuthStore((s) => s.status)
  if (isVocabChapterFree(chapterId)) return <>{children}</>
  if (status === 'loading') return <CheckingAccess />
  if (status !== 'authenticated') {
    return <LockedFeature title="บทเรียนนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกคำศัพท์ทุกบท (ลองฟรีได้ที่บทที่ 1)" />
  }
  return <>{children}</>
}

export function GatedGrammarTopic({ children }: { children: ReactNode }) {
  const { topicId } = useParams()
  const status = useAuthStore((s) => s.status)
  if (isGrammarTopicFree(topicId)) return <>{children}</>
  if (status === 'loading') return <CheckingAccess />
  if (status !== 'authenticated') {
    return <LockedFeature title="บทเรียนนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกไวยากรณ์ทุกหัวข้อ (ลองฟรีได้ที่บทพื้นฐาน)" />
  }
  return <>{children}</>
}

export function GatedListeningPart({ children }: { children: ReactNode }) {
  const { part } = useParams()
  const status = useAuthStore((s) => s.status)
  if (isListeningPartFree(part)) return <>{children}</>
  if (status === 'loading') return <CheckingAccess />
  if (status !== 'authenticated') {
    return <LockedFeature title="แบบฝึกนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกการฟังทุก Part (ลองฟรีได้ที่ Part 1)" />
  }
  return <>{children}</>
}

export function GatedReadingPassage({ children }: { children: ReactNode }) {
  const { passageId } = useParams()
  const status = useAuthStore((s) => s.status)
  if (isReadingPassageFree(passageId)) return <>{children}</>
  if (status === 'loading') return <CheckingAccess />
  if (status !== 'authenticated') {
    return <LockedFeature title="บทความนี้สำหรับสมาชิก" description="สมัครสมาชิกฟรีเพื่อปลดล็อกบทอ่านทั้งหมด" />
  }
  return <>{children}</>
}
