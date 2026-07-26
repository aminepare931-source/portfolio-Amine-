import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Sparkles, ExternalLink, Code2, Cpu } from 'lucide-react'
import { VIDEOS } from '../config/videos'
import { playClickSound } from '../lib/sound'

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
    <div
      onClick={playClickSound}
      className="group relative h-16 w-32 md:h-20 md:w-36 shrink-0 flex items-center justify-center rounded-2xl bg-surface/80 border border-white/10 shadow-lg hover:border-[#FF5A1F]/50 transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-md"
    >
      <div
        className="absolute inset-0 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-20 transition-all duration-500"
        style={{ background: `#${tool.color}` }}
      />
      <img
        src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
        alt={tool.name}
        className="relative w-7 h-7 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
      />
      <span className="absolute bottom-1 text-[9px] font-mono text-white/40 group-hover:text-white transition-colors">
        {tool.name}
      </span>
    </div>
  )
}

export default function ProjectsHeroCard() {
  const doubled = [...TOOLS, ...TOOLS]

  return (
    <div className="px-4 sm:px-6 max-w-[1320px] mx-auto mb-12 relative z-10">
      {/* Main Glassmorphism Showcase Hero Banner */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#090807] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden h-[380px] sm:h-[460px] md:h-[520px] flex flex-col justify-between">
        
        {/* Background High-Tech Video */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-screen scale-105"
            src={VIDEOS.projectsHeroCard}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/60 to-transparent" />
        </div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 px-6 sm:px-12 pt-10 sm:pt-14 flex flex-col items-start max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#FF5A1F]/40 text-xs font-mono text-clay mb-4 backdrop-blur-md">
            <Sparkles size={13} className="text-[#FF5A1F]" /> Portfolio &amp; Projets Clés
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] text-white mb-4">
            Des idées,<br />
            <span className="text-gradient bg-gradient-to-r from-white via-white to-clay bg-clip-text text-transparent">
              livrées en production.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed mb-6 font-sans">
            Marketplaces, applications e-commerce et plateformes SaaS construites de bout en bout pour des clients africains — du concept au déploiement sécurisé.
          </p>

          <div className="flex items-center gap-3">
            <Link to="/contact" onClick={playClickSound}>
              <button className="bg-gradient-to-r from-[#FF5A1F] to-[#ff7a47] text-black font-bold rounded-full px-7 py-3.5 text-xs sm:text-sm hover:scale-105 transition-all shadow-[0_10px_20px_rgba(255,90,31,0.4)] flex items-center gap-2">
                <span>Démarrer un projet</span>
                <ChevronRight size={16} />
              </button>
            </Link>

            <a
              href="https://wa.me/22655300858"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="text-xs font-mono text-white/70 hover:text-white px-4 py-3 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md transition-colors"
            >
              WhatsApp Direct ↗
            </a>
          </div>
        </motion.div>

        {/* Floating Navigation Pill */}
        <div className="relative z-30 pb-6 px-6 flex justify-center">
          <nav className="flex items-center justify-between sm:justify-start bg-black/80 backdrop-blur-2xl px-2 py-1.5 rounded-full border border-white/15 shadow-2xl max-w-md w-full sm:w-auto gap-2">
            <div className="w-8 h-8 rounded-full bg-black border border-white/20 overflow-hidden shrink-0">
              <img src="/assets/logo.png" alt="Amine.Dev" className="w-full h-full object-cover scale-125" />
            </div>

            <Link
              to="/competences"
              onClick={playClickSound}
              className="hidden sm:block text-xs font-mono font-semibold text-white/70 hover:text-white px-3 transition-colors"
            >
              Compétences
            </Link>

            <Link
              to="/a-propos"
              onClick={playClickSound}
              className="hidden sm:block text-xs font-mono font-semibold text-white/70 hover:text-white px-3 transition-colors"
            >
              Profil
            </Link>

            <Link
              to="/contact"
              onClick={playClickSound}
              className="flex items-center gap-1.5 bg-white text-black font-bold px-4 py-2 rounded-full text-xs hover:scale-105 transition-all ml-auto sm:ml-2 shadow-md"
            >
              Me contacter <ChevronRight size={13} />
            </Link>
          </nav>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="relative overflow-hidden mt-6 py-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <ToolCard key={i} tool={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
