import { Link } from 'react-router-dom'
import { MessageCircle, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-stroke mt-24">
      <div className="max-w-[1100px] mx-auto px-6 py-14 grid sm:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-xl mb-3">
            AMINE<span className="text-clay">DIGITAL</span>
          </div>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            Développement web & mobile, design, marketing digital et automatisation IA, basé à Bobo-Dioulasso.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-mono uppercase text-xs tracking-widest text-clay mb-3">Navigation</div>
          <ul className="space-y-2 text-slate-900/70">
            <li><Link to="/services" className="hover:text-clay transition-colors">Services</Link></li>
            <li><Link to="/tarifs" className="hover:text-clay transition-colors">Tarifs</Link></li>
            <li><Link to="/contact" className="hover:text-clay transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-mono uppercase text-xs tracking-widest text-clay mb-3">Me contacter</div>
          <ul className="space-y-2 text-slate-900/70">
            <li className="flex items-center gap-2"><MessageCircle size={14} /> WhatsApp</li>
            <li className="flex items-center gap-2"><Mail size={14} /> amine.dg.dev@gmail.com</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Bobo-Dioulasso, Burkina Faso</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stroke py-6 text-center text-xs text-muted font-mono">
        © {new Date().getFullYear()} AMINE DIGITAL — Tous droits réservés
      </div>
    </footer>
  )
}
