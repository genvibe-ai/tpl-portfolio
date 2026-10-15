import { useEffect, useState } from 'react'
import { timeIn } from '../lib/format'

/** Live "HH:MM" in a time zone, updated every 15 seconds. */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => timeIn(timeZone))
  useEffect(() => {
    const id = window.setInterval(() => setTime(timeIn(timeZone)), 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return time
}
