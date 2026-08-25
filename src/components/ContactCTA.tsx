import { Link } from 'react-router-dom'
import { Send, ArrowRight, Mail, MessageCircle, Linkedin, Facebook } from 'lucide-react'
import Reveal from './Reveal'
import { playClickSound } from '../lib/sound'
import { useLanguage } from '../context/LanguageContext'

export default function ContactCTA() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-6 max-w-[1320px] mx-auto z-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-surface/70 backdrop-blur-xl shadow-2xl px-6 sm:px-14 py-14 sm:py-20 text-center">
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none select-none uppercase whitespace-nowrap text-slate-900/5 font-display"
            style={{ fontSize: 'clamp(60px, 16vw, 220px)', lineHeight: 1 }}
          >
            {t('CONTACT', 'CONTACT')}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-3 text-xs text-clay font-mono uppercase tracking-[0.3em] mb-4">
              <span className="w-8 h-px bg-clay" /> {t('Démarrer une collaboration', 'Start a collaboration')}
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 mb-5 max-w-2xl">
              {t('Inscrivons vos idées dans le réel', "Let's turn your ideas into reality")}
              <span className="text-[#3B82F6]">.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-900/70 max-w-xl mb-9 font-sans">
              {t(
                'Un projet en tête, une opportunité à discuter ? Réponse généralement sous 2 heures.',
                'A project in mind, an opportunity to discuss? I usually reply within 2 hours.'
              )}
            </p>

            <Link
              to="/contact"
              onClick={playClickSound}
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-black font-bold py-4 px-8 text-sm hover:scale-[1.03] transition-transform shadow-[0_10px_25px_rgba(59,130,246,0.4)]"
            >
              <Send size={16} />
              {t('Envoyer un message', 'Send a message')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-4 mt-8 text-slate-900/40">
              <Mail size={16} />
              <MessageCircle size={16} />
              <Linkedin size={16} />
              <Facebook size={16} />
              <span className="text-xs font-mono uppercase tracking-widest">
                {t('+ tous les moyens de me joindre', '+ all the ways to reach me')}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
