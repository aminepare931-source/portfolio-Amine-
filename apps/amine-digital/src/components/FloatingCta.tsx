import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { EASE_OUT } from '../lib/anim'

const WHATSAPP = 'https://wa.me/22655300868'

export default function FloatingCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 900
      setShow(window.scrollY > 520 && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          data-hover
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(24,21,16,0.35)] transition-all duration-300 hover:-translate-y-0.5 md:px-6"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
          WhatsApp — réponse ~2h
        </motion.a>
      )}
    </AnimatePresence>
  )
}
