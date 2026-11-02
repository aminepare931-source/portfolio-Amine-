import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useFaqs } from '../lib/content'

export default function Faq({ title = 'Questions fréquentes' }: { title?: string }) {
  const faqs = useFaqs()
  const [open, setOpen] = useState<string | null>(null)

  // Données structurées pour Google (résultats enrichis « questions-réponses »)
  useEffect(() => {
    if (!faqs.length) return
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    })
    document.head.appendChild(s)
    return () => s.remove()
  }, [faqs])

  if (!faqs.length) return null
  return (
    <section className="max-w-[760px] mx-auto mt-24">
      <div className="text-center mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-clay mb-3">FAQ</div>
        <h2 className="font-display text-3xl">{title}</h2>
      </div>
      <div className="border-t border-stroke">
        {faqs.map((f) => {
          const on = open === f.id
          return (
            <div key={f.id} className="border-b border-stroke">
              <button
                onClick={() => setOpen(on ? null : f.id)}
                aria-expanded={on}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium text-[15px] sm:text-base">{f.question}</span>
                <Plus size={18} className={`shrink-0 text-gov transition-transform duration-300 ${on ? 'rotate-45' : ''}`} />
              </button>
              <div className={`grid transition-all duration-300 ${on ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
                <p className="overflow-hidden text-sm text-slate-900/70 leading-relaxed">{f.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
