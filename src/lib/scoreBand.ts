export function toScoreBand(correct: number, total: number): number {
  if (total === 0) return 0
  const raw = (correct / total) * 495
  return Math.min(495, Math.max(5, Math.round(raw / 5) * 5))
}
