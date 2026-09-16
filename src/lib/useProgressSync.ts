import { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/auth'
import { useProgressStore, type ProgressSnapshot } from '../store/progress'

const SYNC_DEBOUNCE_MS = 1500

function snapshotOf(): ProgressSnapshot {
  const { xp, streak, lastActiveDay, srsMap, partStats, mockResults, levelTestResult } = useProgressStore.getState()
  return { xp, streak, lastActiveDay, srsMap, partStats, mockResults, levelTestResult }
}

async function pushProgress() {
  try {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(snapshotOf()),
    })
  } catch {
    // offline or request failed — local progress keeps working, next change will retry
  }
}

/** Pulls remote progress on login (or seeds it from local data), then keeps it in sync on every change. */
export function useProgressSync() {
  const status = useAuthStore((s) => s.status)
  const hydratedRef = useRef(false)
  const skipNextPushRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (status !== 'authenticated' || hydratedRef.current) return
    hydratedRef.current = true

    ;(async () => {
      try {
        const res = await fetch('/api/progress', { credentials: 'include' })
        const { data } = (await res.json()) as { data: ProgressSnapshot | null }
        if (data) {
          skipNextPushRef.current = true
          useProgressStore.getState().hydrate(data)
        } else {
          await pushProgress()
        }
      } catch {
        // offline or request failed — keep using local progress
      }
    })()
  }, [status])

  useEffect(() => {
    if (status !== 'authenticated') return
    const unsubscribe = useProgressStore.subscribe(() => {
      if (skipNextPushRef.current) {
        skipNextPushRef.current = false
        return
      }
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(pushProgress, SYNC_DEBOUNCE_MS)
    })
    return () => {
      unsubscribe()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [status])
}
