import { useState } from 'react'
import Reveal from './Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> Contact
        </div>
        <h2 className="font-display text-5xl md:text-6xl mb-12">
          Travaillons <span className="text-clay">Ensemble.</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16">
        <Reveal>
          <p className="text-sm text-muted leading-relaxed max-w-md mb-8">
            Un projet, une idée, une collaboration ? Je suis disponible pour discuter de vos besoins
            et construire quelque chose d'exceptionnel pour l'Afrique.
          </p>
          <div className="flex flex-col gap-3 mb-8">
            <a href="mailto:aminepare931@gmail.com" className="text-sm hover:text-clay transition-colors">✉ aminepare931@gmail.com</a>
            <a href="https://wa.me/22655300858" className="text-sm hover:text-clay transition-colors">💬 +226 55 30 08 58</a>
            <span className="text-sm text-muted">📍 Bobo-Dioulasso, Burkina Faso 🇧🇫</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input required placeholder="Votre nom" className="bg-surface border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-clay/50 transition-colors" />
            <input required type="email" placeholder="Votre email" className="bg-surface border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-clay/50 transition-colors" />
            <textarea required placeholder="Décrivez votre projet..." rows={4} className="bg-surface border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-clay/50 transition-colors resize-none" />
            <button className="rounded-full bg-clay text-black font-medium py-3.5 text-sm hover:opacity-90 transition-opacity">
              {sent ? '✓ Message envoyé !' : 'Envoyer le message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
