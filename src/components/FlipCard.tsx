import { useState } from 'react'

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="w-full max-w-sm mx-auto" style={{ perspective: '1600px' }}>
      <div
        className="relative w-full aspect-[4/5] cursor-pointer transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* FACE AVANT — photo */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-[#0d1b2a]"
          style={{ backfaceVisibility: 'hidden', boxShadow: '0 20px 50px rgba(15,23,42,0.18)' }}
        >
          <img src="/assets/hero.jpg" alt="Mouhamed Amine Paré" className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <p className="font-bold text-slate-900 text-lg leading-tight">Mouhamed Amine Paré</p>
            <p className="text-slate-900/70 text-sm mt-0.5">Développeur Fullstack &amp; Créateur Digital</p>
            <p className="text-slate-900/40 text-[10px] uppercase tracking-widest mt-3">Clique pour explorer ↻</p>
          </div>
        </div>

        {/* FACE ARRIÈRE — terminal */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-[#0d1b2a] bg-[#0b0f19] p-5 flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', boxShadow: '0 20px 50px rgba(15,23,42,0.18)' }}
        >
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="flex-1 text-center text-[11px] text-slate-900/40 font-mono">aminedev@portfolio:~ — zsh</span>
          </div>
          <div className="font-mono text-[11px] sm:text-[12px] leading-relaxed overflow-hidden">
            <p><span className="text-[#5fd3ff]">→</span> <span className="text-slate-900/70">~ node init-profile.js</span></p>
            <p><span className="text-[#c792ea]">const</span> <span className="text-[#f78c6c]">développeur</span> <span className="text-slate-900/70">= {'{'}</span></p>
            <p className="pl-4"><span className="text-[#f78c6c]">nom</span><span className="text-slate-900/50">:</span> <span className="text-[#c3e88d]">'Mouhamed Amine Paré'</span><span className="text-slate-900/50">,</span></p>
            <p className="pl-4"><span className="text-[#f78c6c]">alias</span><span className="text-slate-900/50">:</span> <span className="text-[#c3e88d]">'Amine.Dev'</span><span className="text-slate-900/50">,</span></p>
            <p className="pl-4"><span className="text-[#f78c6c]">mission</span><span className="text-slate-900/50">:</span> <span className="text-[#c3e88d]">« Transformer le digital africain, un projet à la fois »</span><span className="text-slate-900/50">,</span></p>
            <p className="pl-4"><span className="text-[#f78c6c]">localisation</span><span className="text-slate-900/50">:</span> <span className="text-[#c3e88d]">'Bobo-Dioulasso, Burkina Faso'</span><span className="text-slate-900/50">,</span></p>
            <p className="pl-4"><span className="text-[#f78c6c]">domaines</span><span className="text-slate-900/50">:</span> <span className="text-slate-900/70">[</span> <span className="text-[#c3e88d]">'Développement'</span><span className="text-slate-900/50">,</span> <span className="text-[#c3e88d]">'Design'</span><span className="text-slate-900/50">,</span> <span className="text-[#c3e88d]">'Marketing'</span><span className="text-slate-900/50">,</span> <span className="text-[#c3e88d]">'Automatisation'</span> <span className="text-slate-900/70">]</span></p>
            <p><span className="text-slate-900/70">{'}'}</span></p>
            <p><span className="text-[#c792ea]">attendre</span> <span className="text-slate-900/70">développeur</span><span className="text-slate-900/50">.</span><span className="text-[#82aaff]">impactAfrique</span><span className="text-slate-900/70">();</span></p>
            <p className="text-[#c3e88d] mt-1">✓ Profil initialisé avec succès !</p>
            <p className="mt-2"><span className="text-[#5fd3ff]">→</span> <span className="text-slate-900/70">~ _</span></p>
          </div>
          <div className="mt-auto pt-3 text-center text-slate-900/30 text-[10px] uppercase tracking-widest shrink-0">
            Clique pour revenir ↻
          </div>
        </div>
      </div>
    </div>
  )
}
