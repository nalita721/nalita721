import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findLevel, LANG_TRACKS, type LangLevelMeta, type LangTrack } from '../../data/langs'
import type { LangCode, LangLevelContent } from '../../lib/langTypes'

const cache = new Map<string, LangLevelContent>()

export interface LangLevelState {
  track: LangTrack
  meta: LangLevelMeta | undefined
  content: LangLevelContent | null
  loading: boolean
}

/** Resolves the track and `:level` param, and loads that level's content module on demand. */
export function useLangLevel(lang: LangCode): LangLevelState {
  const { level } = useParams()
  const track = LANG_TRACKS[lang]
  const meta = findLevel(track, level)
  const key = `${lang}:${meta?.slug}`
  const [content, setContent] = useState<LangLevelContent | null>(() => cache.get(key) ?? null)
  const [loading, setLoading] = useState(!cache.has(key) && !!meta?.load)

  useEffect(() => {
    if (!meta?.load) return
    const cached = cache.get(key)
    if (cached) {
      setContent(cached)
      setLoading(false)
      return
    }
    let alive = true
    setLoading(true)
    meta.load().then((c) => {
      cache.set(key, c)
      if (alive) {
        setContent(c)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [key, meta])

  return { track, meta, content, loading }
}

export function bestKey(lang: LangCode, level: string, item: string): string {
  return `${lang}:${level}:${item}`
}
