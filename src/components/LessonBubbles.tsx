import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ClipboardCheck, Lock } from 'lucide-react'
import { playClickSound, playLockedSound } from '../lib/sound'
import { nextLessonIndex, type LessonNode, type LessonStatus } from '../lib/miniLesson'

/**
 * A chapter's bite-sized lessons as a row of small stepping stones, ending in
 * its test, with the next lesson's length spelled out underneath.
 */
export function LessonBubbles({ nodes, statuses }: { nodes: LessonNode[]; statuses: LessonStatus[] }) {
  const navigate = useNavigate()
  const next = nextLessonIndex(statuses)
  const allDone = statuses.every((s) => s === 'passed')

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        {nodes.map((node, i) => {
          const status = statuses[i]
          const isNext = !allDone && i === next
          const Icon = status === 'locked' ? Lock : status === 'passed' ? Check : node.kind === 'test' ? ClipboardCheck : null
          return (
            <Fragment key={node.key}>
              {i > 0 && <span className={`h-1 flex-1 rounded-full ${statuses[i - 1] === 'passed' ? 'bg-amber-300' : 'bg-sand-200'}`} />}
              <button
                type="button"
                title={`${node.titleTh} · ≈ ${node.minutes} นาที`}
                aria-label={`${node.titleTh} (${status === 'passed' ? 'ผ่านแล้ว' : status === 'locked' ? 'ยังล็อก' : 'เริ่มได้'})`}
                onClick={(e) => {
                  e.preventDefault()
                  if (status === 'locked') {
                    playLockedSound()
                    return
                  }
                  playClickSound()
                  navigate(node.to)
                }}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition active:translate-y-0.5 ${
                  status === 'passed'
                    ? 'bg-amber-400 text-white shadow-[0_3px_0] shadow-amber-600'
                    : status === 'locked'
                      ? 'bg-sand-100 text-stone-300'
                      : 'bg-brand-600 text-white shadow-[0_3px_0] shadow-brand-800'
                } ${isNext ? 'ring-4 ring-brand-200' : ''}`}
              >
                {Icon ? <Icon size={16} strokeWidth={3} /> : i + 1}
              </button>
            </Fragment>
          )
        })}
      </div>
      <p className="text-xs text-stone-500">
        {allDone ? (
          '✓ ผ่านครบทุกด่านย่อยแล้ว'
        ) : (
          <>
            ถัดไป: <span className="font-semibold text-stone-700">{nodes[next].titleTh}</span> · ⏱ ≈ {nodes[next].minutes} นาที
          </>
        )}
      </p>
    </div>
  )
}
