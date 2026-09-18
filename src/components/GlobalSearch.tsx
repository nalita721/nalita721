import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { vocabChapters } from '../data/vocabulary'
import { grammarTopics } from '../data/grammar'

interface SearchResult {
  key: string
  icon: string
  title: string
  subtitle: string
  to: string
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = []

  for (const chapter of vocabChapters) {
    results.push({ key: `chapter:${chapter.id}`, icon: '📚', title: chapter.titleTh, subtitle: 'บทคำศัพท์', to: `/vocabulary/${chapter.id}` })
    for (const word of chapter.words) {
      results.push({
        key: `word:${word.id}`,
        icon: '📖',
        title: word.term,
        subtitle: `${word.meaningTh} · ${chapter.titleTh}`,
        to: `/vocabulary/${chapter.id}`,
      })
    }
  }

  for (const topic of grammarTopics) {
    results.push({ key: `topic:${topic.id}`, icon: '✍️', title: topic.titleTh, subtitle: 'ไวยากรณ์', to: `/grammar/${topic.id}` })
  }

  return results
}

const SEARCH_INDEX = buildIndex()

export default function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return SEARCH_INDEX.filter((r) => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)).slice(0, 8)
  }, [query])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function goTo(to: string) {
    setOpen(false)
    setQuery('')
    navigate(to)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-sm">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results[0]) goTo(results[0].to)
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder="ค้นหาคำศัพท์ หัวข้อไวยากรณ์..."
          className="w-full rounded-full border border-sand-200 bg-sand-50 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition"
        />
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-sand-200 bg-white shadow-lg overflow-hidden z-30 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-stone-400">ไม่พบผลลัพธ์สำหรับ "{query}"</p>
          ) : (
            results.map((r) => (
              <button
                key={r.key}
                onClick={() => goTo(r.to)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-sand-50 transition"
              >
                <span className="text-lg shrink-0">{r.icon}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-stone-800 truncate">{r.title}</span>
                  <span className="block text-xs text-stone-400 truncate">{r.subtitle}</span>
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
