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

  function snapBack() {
    animate(x, 0, { type: 'spring', stiffness: 180, damping: 11 })
    animate(y, 0, { type: 'spring', stiffness: 160, damping: 13 })
  }

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center select-none" style={{ paddingTop: 58 }}>
      {/* Lanière + clip — fixes, le badge pend depuis ce point */}
      <div className="absolute top-0 flex flex-col items-center z-0 pointer-events-none">
        <motion.div
          className="w-8 rounded-[3px]"
          style={{
            height: useTransform(strapStretch, (v) => 46 + v),
            background:
              'repeating-linear-gradient(127deg, #1d4ed8 0px, #1d4ed8 7px, #3B82F6 7px, #3B82F6 14px)',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.25), 0 3px 8px rgba(15,23,42,0.15)',
          }}
        />
        {/* clip métallique */}
        <div
          className="w-5 h-5 -mt-px rounded-[2px] shrink-0"
          style={{
            background: 'linear-gradient(165deg,#f1f5f9 0%,#cbd5e1 45%,#64748b 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        />
        <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400 -mt-0.5" style={{ background: '#e2e8f0' }} />
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
        className="relative z-10 cursor-grab"
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

            {/* FACE ARRIÈRE — logo / branding */}
            <div
              className="absolute inset-0 rounded-[26px] overflow-hidden border-[3px] border-[#0b1226] flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                boxShadow: '0 22px 50px rgba(15,23,42,0.28)',
                background: 'linear-gradient(160deg,#0b1226 0%,#13244a 55%,#1d4ed8 100%)',
              }}
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0b1226] border border-white/10 z-10" />

              <div className="flex-1 flex items-center justify-center">
                <span className="font-display font-black text-white text-[7rem] sm:text-[8rem] leading-none tracking-tighter opacity-95">
                  A<span className="text-[#60A5FA]">D</span>
                </span>
              </div>

              <div className="p-5 sm:p-6 text-right">
                <p className="font-display font-bold text-white text-sm sm:text-base leading-tight">AMINE</p>
                <p className="text-white/50 text-[9px] uppercase tracking-[0.25em]">Digital &amp; Dev</p>
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
