import { useEffect, useState } from 'react'

export default function TypewriterHeading({
  text, speed = 35, startDelay = 400, splitAt, className = '', accentClassName = '',
}: { text: string; speed?: number; startDelay?: number; splitAt?: number; className?: string; accentClassName?: string }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setCount(i)
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, speed, startDelay])

  const shown = text.slice(0, count)
  const cut = splitAt ?? text.length
  const first = shown.slice(0, Math.min(cut, shown.length))
  const rest = shown.slice(Math.min(cut, shown.length))

  return (
    <h1 className={className}>
      <span>{first}</span>
      <span className={accentClassName}>{rest}</span>
      {!done && <span className="typewriter-cursor text-clay">|</span>}
    </h1>
  )
}
