import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function ScrambleIn({
  text, delay = 0, className = '',
}: { text: string; delay?: number; className?: string }) {
  const [triggered, setTriggered] = useState(false)
  const [display, setDisplay] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setTriggered(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!triggered) return
    let cursor = 0
    const interval = setInterval(() => {
      cursor += 0.5
      const revealCount = Math.floor(cursor)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue }
        if (i < revealCount) out += text[i]
        else if (i < revealCount + 3) out += CHARS[Math.floor(Math.random() * CHARS.length)]
        else out += ''
      }
      setDisplay(out)
      if (revealCount >= text.length) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [triggered, text])

  return <span className={className}>{triggered ? display : '\u00A0'}</span>
}
