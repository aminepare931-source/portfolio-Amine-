import { Quote } from 'lucide-react'
import Reveal from './Reveal'
import { useLanguage } from '../context/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> {t('Avis clients', 'Client feedback')}
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-10">
          {t('Ce qu\'on en dit', 'What people say')}<span className="text-[#3B82F6]">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="text-center py-14 px-8 border-2 border-dashed border-slate-900/15 rounded-3xl bg-surface/30">
          <Quote size={26} className="text-clay/40 mx-auto mb-4" />
          <p className="text-sm font-medium text-slate-900/60 max-w-sm mx-auto">
            {t(
              'Les premiers avis clients apparaîtront ici dès les prochains projets livrés.',
              'The first client testimonials will appear here as soon as upcoming projects are delivered.'
            )}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
