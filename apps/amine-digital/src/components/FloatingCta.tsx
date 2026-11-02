import { useSettings, waUrl } from '../lib/settings'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { EASE_OUT } from '../lib/anim'


export default function FloatingCta() {
  const WHATSAPP = waUrl(useSettings())
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
          aria-label="Écrire sur WhatsApp"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center justify-center md:gap-2.5 h-12 w-12 md:h-auto md:w-auto rounded-full md:rounded-sm bg-[#25D366] md:bg-gray-900 md:px-6 md:py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[0_18px_50px_rgba(24,21,16,0.35)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-sm md:bg-[#25D366] text-white">
            <MessageCircle className="h-6 w-6 md:h-3.5 md:w-3.5" />
          </span>
          <span className="hidden md:inline">WhatsApp — réponse ~2h</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
