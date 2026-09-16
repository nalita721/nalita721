import { useEffect, useRef, useState } from 'react'

export function useCountdown(initialSeconds: number, onExpire?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!running) return
    if (secondsLeft <= 0) {
      setRunning(false)
      onExpireRef.current?.()
      return
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [running, secondsLeft])

  function start() {
    setSecondsLeft(initialSeconds)
    setRunning(true)
  }

  function reset(seconds = initialSeconds) {
    setSecondsLeft(seconds)
    setRunning(false)
  }

  function stop() {
    setRunning(false)
  }

  return { secondsLeft, running, start, reset, stop }
}
