import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { VIDEOS } from '../config/videos'

/* Outils réellement utilisés dans les projets — icônes via simple-icons CDN */
const TOOLS = [
  { slug: 'supabase', name: 'Supabase', color: '3ECF8E' },
  { slug: 'cloudflare', name: 'Cloudflare', color: 'F38020' },
  { slug: 'figma', name: 'Figma', color: 'F24E1E' },
  { slug: 'whatsapp', name: 'WhatsApp', color: '25D366' },
  { slug: 'nodedotjs', name: 'Node.js', color: '5FA04E' },
  { slug: 'mongodb', name: 'MongoDB', color: '47A248' },
  { slug: 'firebase', name: 'Firebase', color: 'FFCA28' },
  { slug: 'python', name: 'Python', color: '3776AB' },
]

function ToolCard({ tool }: { tool: typeof TOOLS[0] }) {
  return (
    <div className="group relative h-20 w-32 md:h-24 md:w-40 shrink-0 flex items-center justify-center rounded-full bg-surface border border-stroke shadow-sm hover:border-clay/40 transition-all overflow-hidden">
      <div
        className="absolute inset-0 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-20 transition-all duration-500"
        style={{ background: `#${tool.color}` }}
      />
      <img
        src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
        alt={tool.name}
        className="relative w-8 h-8 md:w-10 md:h-10 opacity-70 group-hover:opacity-100 transition-opacity"
      />
    </div>
  )
}

export default function ProjectsHeroCard() {
  const doubled = [...TOOLS, ...TOOLS]

  return (
    <div className="px-4 sm:px-6 max-w-[1400px] mx-auto mb-10">
      {/* Hero card */}
      <div className="relative w-full rounded-[28px] sm:rounded-[40px] md:rounded-[48px] bg-surface border border-stroke shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden h-[440px] sm:h-[520px] md:h-[600px] flex flex-col">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover scale-105"
            src={VIDEOS.projectsHeroCard}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="relative z-20 flex-1 px-6 sm:px-10 md:px-16 pt-10 sm:pt-14 md:pt-16 flex flex-col items-start"
        >
          <div className="text-xs text-clay uppercase tracking-[0.3em] mb-4">Réalisations</div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-white mb-4">
            Des idées,<br />livrées en production.
          </h2>
          <p className="text-[13px] sm:text-[15px] text-white/60 max-w-md leading-relaxed mb-6">
            Marketplaces, e-commerces et plateformes construites de bout en bout pour des clients
            africains — du concept au déploiement.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium"
            >
              Contactez-moi
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating bottom pill */}
        <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-auto">
          <motion.nav
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-between sm:justify-start bg-black/70 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.3)] border border-white/10"
          >
            <div className="w-9 h-9 rounded-full bg-black border border-white/10 shadow-sm overflow-hidden shrink-0">
              <img src="/assets/logo.png" alt="Amine.Dev" className="w-full h-full object-cover scale-125" />
            </div>
            <Link to="/competences" className="hidden sm:block text-[12px] font-semibold text-white/60 hover:text-white px-4 transition-colors">
              Compétences
            </Link>
            <Link to="/a-propos" className="hidden sm:block text-[12px] font-semibold text-white/60 hover:text-white px-2 transition-colors">
              Profil
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 bg-white px-4 sm:px-5 py-2 rounded-full text-[12px] font-semibold text-black border border-white/60 shadow-sm hover:scale-105 transition-all ml-1"
            >
              Me contacter <ChevronRight size={13} />
            </Link>
          </motion.nav>
        </div>
      </div>

      {/* Tech logo marquee */}
      <div className="relative overflow-hidden mt-6 py-2" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
        <div className="flex gap-4 w-max" style={{ animation: 'marquee 26s linear infinite' }}>
          {doubled.map((t, i) => <ToolCard key={i} tool={t} />)}
        </div>
      </div>
    </div>
  )
}
