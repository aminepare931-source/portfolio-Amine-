import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Minimize2, Maximize2, Play, Sparkles } from 'lucide-react'

interface TerminalDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandLog {
  cmd: string
  output: React.ReactNode
}

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [input, setInput] = useState('')
  const [isMaximized, setIsMaximized] = useState(false)
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      cmd: 'welcome',
      output: (
        <div className="space-y-1 text-xs text-emerald-400 font-mono">
          <p>⚡ Amine.Dev CLI v2.6.0 [Bobo-Dioulasso, Burkina Faso 🇧🇫]</p>
          <p className="text-white/70">Tapez <span className="text-clay font-bold">help</span> pour afficher la liste des commandes interactives.</p>
        </div>
      ),
    },
  ])

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const raw = input.trim()
    if (!raw) return
    const cmd = raw.toLowerCase()
    setInput('')

    let output: React.ReactNode = null

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-xs font-mono space-y-1 text-white/80">
            <p className="text-clay font-bold">Commandes disponibles :</p>
            <p><span className="text-emerald-400">whoami</span> — Présentation globale d'Amine</p>
            <p><span className="text-emerald-400">skills</span> — Liste des compétences clés &amp; stack</p>
            <p><span className="text-emerald-400">projects</span> — Liste des projets phares en production</p>
            <p><span className="text-emerald-400">cv</span> — Lien direct pour ouvrir le CV</p>
            <p><span className="text-emerald-400">contact</span> — Informations de contact &amp; réseaux</p>
            <p><span className="text-emerald-400">hire</span> — Pourquoi recruter Amine.Dev ?</p>
            <p><span className="text-emerald-400">clear</span> — Effacer l'écran</p>
          </div>
        )
        break

      case 'whoami':
        output = (
          <div className="text-xs font-mono space-y-1 text-white/90">
            <p><strong className="text-clay">Mouhamed Amine Paré</strong> (Amine.Dev)</p>
            <p>📍 Bobo-Dioulasso, Burkina Faso 🇧🇫</p>
            <p>🎓 Développeur Fullstack, Designer, Marketeur &amp; Formateur autodidacte.</p>
            <p>🔥 3 ans d'apprentissage continu &amp; de livraisons en production.</p>
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="text-xs font-mono space-y-1 text-white/80">
            <p className="text-clay font-bold">Stack Principale :</p>
            <p>• <span className="text-white">Frontend:</span> React, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3</p>
            <p>• <span className="text-white">Backend &amp; DB:</span> Node.js, Python, Supabase (PostgreSQL), Cloudflare Workers, MongoDB</p>
            <p>• <span className="text-white">Design &amp; UI:</span> Figma, Identité visuelle, Prototypage UX</p>
            <p>• <span className="text-white">Integrations:</span> CinetPay (Mobile Money), WhatsApp API, Webhooks, Gemini AI SDK</p>
          </div>
        )
        break

      case 'projects':
        output = (
          <div className="text-xs font-mono space-y-2 text-white/90">
            <p className="text-clay font-bold">Projets Majeurs :</p>
            <p>🛒 <strong>EMBF Boutique</strong> — E-Commerce Tech avec paiement Mobile Money &amp; WhatsApp</p>
            <p>🏗️ <strong>TechBF</strong> — Marketplace de services connectant artisans et clients</p>
            <p>📰 <strong>FASOKO</strong> — Aggrégateur d'actualités burkinabè sur Cloudflare Pages</p>
            <p>🤖 <strong>Amine AutoBot</strong> — Suite d'automatisation client WhatsApp avec IA</p>
          </div>
        )
        break

      case 'cv':
        output = (
          <div className="text-xs font-mono text-emerald-400">
            📄 Ouverture du CV en cours...{' '}
            <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer" className="underline font-bold text-clay">
              Cliquez ici pour télécharger cv.pdf
            </a>
          </div>
        )
        window.open('/assets/cv.pdf', '_blank')
        break

      case 'contact':
        output = (
          <div className="text-xs font-mono space-y-1 text-white/90">
            <p>✉ Email: <a href="mailto:aminepare931@gmail.com" className="text-clay underline">aminepare931@gmail.com</a></p>
            <p>💬 WhatsApp: <a href="https://wa.me/22655300858" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">+226 55 30 08 58</a></p>
            <p>📍 Localisation: Bobo-Dioulasso, Burkina Faso</p>
          </div>
        )
        break

      case 'hire':
        output = (
          <div className="text-xs font-mono space-y-1 text-emerald-300">
            <p>✓ Polyvalent : Code, Design, Rédaction, Marketing, Automatisation</p>
            <p>✓ Orientation Résultats : Produits conçus pour résoudre des vrais problèmes</p>
            <p>✓ Autonomie complète : Du premier wireframe au déploiement DNS/Cloud</p>
          </div>
        )
        break

      case 'clear':
        setLogs([])
        return

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            Commande inconnue: "{raw}". Tapez <span className="text-clay font-bold">help</span> pour la liste des commandes.
          </div>
        )
    }

    setLogs((prev) => [...prev, { cmd: raw, output }])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className={`relative z-10 w-full transition-all duration-300 bg-[#090d16] border border-clay/40 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col ${
            isMaximized ? 'max-w-5xl h-[85vh]' : 'max-w-2xl h-[480px]'
          }`}
        >
          {/* Terminal Titlebar */}
          <div className="bg-[#0f172a] px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-xs font-mono text-white/60 flex items-center gap-1.5">
                <Terminal size={14} className="text-clay" /> aminedev@portfolio:~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-white/50 hover:text-white p-1 rounded transition-colors"
              >
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white p-1 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs text-white/90">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-white/50">
                  <span className="text-emerald-400">aminedev@portfolio:~$</span>
                  <span className="text-white font-semibold">{log.cmd}</span>
                </div>
                <div className="pl-3 border-l border-white/10">{log.output}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Command Chips */}
          <div className="px-4 py-2 bg-[#0d1322] border-t border-white/5 flex flex-wrap gap-1.5 shrink-0">
            {['help', 'whoami', 'skills', 'projects', 'cv', 'hire'].map((shortcut) => (
              <button
                key={shortcut}
                onClick={() => {
                  setInput(shortcut)
                }}
                className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-clay/20 hover:text-clay text-white/70 border border-white/10 transition-colors"
              >
                ${shortcut}
              </button>
            ))}
          </div>

          {/* Terminal Input Form */}
          <form onSubmit={handleCommand} className="bg-[#0a0e18] px-4 py-3 border-t border-white/10 flex items-center gap-2 shrink-0">
            <span className="text-emerald-400 font-mono text-xs">aminedev@portfolio:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez une commande (ex: help, skills, hire)..."
              autoFocus
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-white/30"
            />
            <button type="submit" className="text-clay hover:text-white transition-colors">
              <Play size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
