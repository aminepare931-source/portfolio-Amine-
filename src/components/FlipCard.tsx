import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false)
  const didDrag = useRef(false)

  // Position du badge (glisse comme une vraie carte accrochée à une lanière)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-120, 0, 120], [-16, 0, 16])
  const strapStretch = useTransform(y, [0, 150], [0, 70])
  const strapHeight = useTransform(strapStretch, (v) => 108 + v)

  function snapBack() {
    animate(x, 0, { type: 'spring', stiffness: 180, damping: 11 })
    animate(y, 0, { type: 'spring', stiffness: 160, damping: 13 })
  }

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center select-none" style={{ paddingTop: 128 }}>
      {/* Lanière + clip — fixes, le badge pend depuis ce point */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-0 pointer-events-none">
        <motion.div
          className="w-10 rounded-[4px] relative border border-[#1e3a8a]/40"
          style={{
            height: strapHeight,
            background:
              'repeating-linear-gradient(124deg, #1d4ed8 0px, #1d4ed8 9px, #2563eb 9px, #2563eb 16px, #60A5FA 16px, #60A5FA 18px)',
            boxShadow: '0 6px 14px rgba(29,78,216,0.35), inset 0 0 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* liseré central façon lanière tissée */}
          <span className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/25" />
        </motion.div>
        {/* clip métallique */}
        <div
          className="w-6 h-6 -mt-px rounded-[3px] shrink-0 relative z-10"
          style={{
            background: 'linear-gradient(165deg,#f8fafc 0%,#cbd5e1 45%,#64748b 100%)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.35)',
          }}
        />
        <div className="w-3 h-3 rounded-full border-2 border-slate-400 -mt-0.5" style={{ background: '#e2e8f0' }} />
      </div>

      {/* Badge — déplaçable, pivote depuis le haut comme suspendu */}
      <motion.div
        drag
        dragElastic={0.55}
        dragConstraints={{ top: 0, bottom: 150, left: -130, right: 130 }}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
        onDragStart={() => { didDrag.current = false }}
        onDrag={() => { didDrag.current = true }}
        onDragEnd={snapBack}
        onClick={() => { if (!didDrag.current) setFlipped((f) => !f) }}
        style={{ x, y, rotate, transformOrigin: 'top center', touchAction: 'none' }}
        whileTap={{ cursor: 'grabbing' }}
        className="relative z-10 cursor-grab w-full"
      >
        <div className="relative w-full aspect-[4/5]" style={{ perspective: '1600px' }}>
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* FACE AVANT — photo, style badge d'accréditation */}
            <div
              className="absolute inset-0 rounded-[26px] overflow-hidden border-[3px] border-[#0b1226]"
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: '0 22px 50px rgba(15,23,42,0.28)',
                background: 'linear-gradient(160deg,#0b1226 0%,#13244a 55%,#1d4ed8 100%)',
              }}
            >
              <img src="/assets/hero.jpg" alt="Mouhamed Amine Paré" className="absolute inset-0 w-full h-full object-cover opacity-95" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a16] via-[#060a16]/55 to-transparent" />

              {/* Trou de la lanière */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0b1226] border border-white/10 z-10" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-display font-bold text-white text-xl sm:text-2xl leading-tight tracking-tight">
                  Mouhamed Amine
                </p>
                <div className="h-px bg-white/15 my-2.5" />
                <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-0.5">Position</p>
                <p className="text-white font-bold text-sm sm:text-base">Développeur Fullstack</p>
                <div className="h-px bg-white/15 my-2.5" />
                <div className="flex items-center gap-2.5 text-[9px] uppercase tracking-wider text-white/50 font-mono">
                  <span>Web</span>
                  <span className="text-white/20">•</span>
                  <span>Mobile</span>
                  <span className="text-white/20">•</span>
                  <span>IA</span>
                </div>
              </div>
            </div>

            {/* FACE ARRIÈRE — terminal / JSON profil */}
            <div
              className="absolute inset-0 rounded-[26px] overflow-hidden border-[3px] border-[#0b1226] bg-[#0b0f19] p-5 flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: '0 22px 50px rgba(15,23,42,0.28)',
              }}
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0b1226] border border-white/10 z-10" />

              <div className="flex items-center gap-2 mb-4 shrink-0 pt-1">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="flex-1 text-center text-[11px] text-white/40 font-mono">aminedev@portfolio:~ — zsh</span>
              </div>
              <div className="font-mono text-[11px] sm:text-[12px] leading-relaxed overflow-hidden">
                <p><span className="text-[#5fd3ff]">→</span> <span className="text-white/70">~ node init-profile.js</span></p>
                <p><span className="text-[#c792ea]">const</span> <span className="text-[#f78c6c]">développeur</span> <span className="text-white/70">= {'{'}</span></p>
                <p className="pl-4"><span className="text-[#f78c6c]">nom</span><span className="text-white/50">:</span> <span className="text-[#c3e88d]">'Mouhamed Amine Paré'</span><span className="text-white/50">,</span></p>
                <p className="pl-4"><span className="text-[#f78c6c]">alias</span><span className="text-white/50">:</span> <span className="text-[#c3e88d]">'Amine.Dev'</span><span className="text-white/50">,</span></p>
                <p className="pl-4"><span className="text-[#f78c6c]">mission</span><span className="text-white/50">:</span> <span className="text-[#c3e88d]">« Transformer le digital africain, un projet à la fois »</span><span className="text-white/50">,</span></p>
                <p className="pl-4"><span className="text-[#f78c6c]">localisation</span><span className="text-white/50">:</span> <span className="text-[#c3e88d]">'Bobo-Dioulasso, Burkina Faso'</span><span className="text-white/50">,</span></p>
                <p className="pl-4"><span className="text-[#f78c6c]">domaines</span><span className="text-white/50">:</span> <span className="text-white/70">[</span> <span className="text-[#c3e88d]">'Développement'</span><span className="text-white/50">,</span> <span className="text-[#c3e88d]">'Design'</span><span className="text-white/50">,</span> <span className="text-[#c3e88d]">'Marketing'</span><span className="text-white/50">,</span> <span className="text-[#c3e88d]">'Automatisation'</span> <span className="text-white/70">]</span></p>
                <p><span className="text-white/70">{'}'}</span></p>
                <p><span className="text-[#c792ea]">attendre</span> <span className="text-white/70">développeur</span><span className="text-white/50">.</span><span className="text-[#82aaff]">impactAfrique</span><span className="text-white/70">();</span></p>
                <p className="text-[#c3e88d] mt-1">✓ Profil initialisé avec succès !</p>
                <p className="mt-2"><span className="text-[#5fd3ff]">→</span> <span className="text-white/70">~ _</span></p>
              </div>
              <div className="mt-auto pt-3 text-center text-white/30 text-[10px] uppercase tracking-widest shrink-0">
                Clique pour revenir ↻
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-4 text-[10px] text-slate-900/35 uppercase tracking-widest font-mono">
        Glisse ou clique le badge ↻
      </p>
    </div>
  )
}
