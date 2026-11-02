import { useState } from 'react'
import { Fade } from './Reveal'
import { Quote, MessageCircle, Image as ImageIcon, X } from 'lucide-react'
import { useEffect } from 'react'
import { fetchReviews } from '../lib/supabase'
import { useSettings, waUrl } from '../lib/settings'
import { REVIEWS as STATIC_REVIEWS, type Review } from '../data/reviews'

const REVIEW_TEXT = "Bonjour AMINE DIGITAL, je souhaite laisser un avis sur votre travail.\n\nMon nom :\nLe service reçu :\nMon avis :\n\nJ'autorise la publication de cet avis sur le site : oui / non"

export function ReviewButton({ className = '' }: { className?: string }) {
  const REVIEW_URL = waUrl(useSettings(), REVIEW_TEXT)
  return (
    <a
      href={REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-gov text-white text-sm font-medium rounded-sm px-5 py-3 hover:opacity-90 transition-opacity ${className}`}
    >
      <MessageCircle size={16} /> Laisser un avis
    </a>
  )
}

export default function Testimonials() {
  const [shot, setShot] = useState<string | null>(null)
  const [remote, setRemote] = useState<Review[]>([])
  useEffect(() => {
    fetchReviews().then((rows) => setRemote(rows.map((r) => ({ name: r.name, role: r.role ?? undefined, service: r.service ?? undefined, date: r.date_label ?? undefined, text: r.text }))))
  }, [])
  const REVIEWS = [...remote, ...STATIC_REVIEWS]

  return (
    <section className="bg-bg py-16 sm:py-20 lg:pb-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">5</span>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-sm px-3 sm:px-4 py-1 sm:py-1.5">Avis clients</span>
          </div>
          {REVIEWS.length > 0 && <ReviewButton />}
        </div>

        {REVIEWS.length === 0 ? (
          <Fade className="border-2 border-dashed border-gray-300 rounded-md py-14 px-8 text-center bg-surface2/40">
            <Quote size={26} className="text-gov/40 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-600 max-w-sm mx-auto mb-6">
              Vous avez travaillé avec AMINE DIGITAL ? Votre avis aidera les prochains clients à nous faire confiance.
            </p>
            <ReviewButton />
          </Fade>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <Fade key={i} delay={i * 0.05}>
                <figure className="h-full flex flex-col border border-stroke rounded-md bg-white/70 p-6">
                  <Quote size={20} className="text-gov/40 mb-3" />
                  <blockquote className="text-[15px] leading-relaxed text-gray-800 flex-1">« {r.text} »</blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-stroke text-sm">
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="text-xs text-muted">{[r.role, r.service, r.date].filter(Boolean).join(' · ')}</div>
                    {r.screenshot && (
                      <button onClick={() => setShot(r.screenshot!)} className="mt-3 inline-flex items-center gap-1.5 text-xs text-gov hover:underline">
                        <ImageIcon size={13} /> Voir le message d'origine
                      </button>
                    )}
                  </figcaption>
                </figure>
              </Fade>
            ))}
          </div>
        )}
      </div>

      {shot && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setShot(null)} role="dialog" aria-modal="true">
          <button aria-label="Fermer" className="absolute top-4 right-4 text-white"><X size={26} /></button>
          <img src={shot} alt="Message d'origine du client" className="max-h-[90vh] max-w-full rounded-md" />
        </div>
      )}
    </section>
  )
}
