import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, CheckCircle, Cpu, BarChart3, Layers, Sparkles } from 'lucide-react'
import { Project } from '../lib/supabase'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-white/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-stroke rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.18)] text-text"
        >
          {/* Top Banner Image / Graphic */}
          <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-slate-900/10">
            {project.img ? (
              <img src={project.img} alt={project.name} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                style={{ background: `linear-gradient(135deg, #f8fafc 0%, ${project.color || '#3B82F6'}33 100%)` }}
              >
                <span className="text-5xl mb-2">{project.emoji || '🚀'}</span>
                <span className="font-display text-3xl text-slate-900">{project.name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-slate-900/20 flex items-center justify-center text-slate-900 hover:bg-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Title & Tagline */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-clay/20 text-clay border border-clay/30">
                Étude de Cas
              </span>
              {(project.tags || []).map((tag) => (
                <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/5 text-slate-900/70">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-slate-900 mt-2">
              {project.name}
            </h2>
            <p className="text-sm sm:text-base text-clay font-medium mt-1">
              {project.tagline || project.description}
            </p>
          </div>

          {/* Key Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-surface border border-stroke p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                    <BarChart3 size={14} className="text-clay" /> {m.label}
                  </div>
                  <div className="font-display text-xl sm:text-2xl text-slate-900">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-clay font-bold mb-2">
              Présentation détaillée
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-clay font-bold mb-3 flex items-center gap-2">
                <Sparkles size={14} /> Fonctionnalités majeures
              </h3>
              <div className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-900/90 bg-surface/40 p-3 rounded-xl border border-slate-900/5">
                    <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-clay font-bold mb-3 flex items-center gap-2">
                <Cpu size={14} /> Stack Technique &amp; Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.architecture.map((arch, idx) => (
                  <span key={idx} className="text-xs font-mono bg-surface border border-stroke px-3 py-1.5 rounded-lg text-slate-900/80">
                    ⚡ {arch}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-stroke flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs text-muted hover:text-slate-900 transition-colors"
            >
              Fermer l'aperçu
            </button>

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3B82F6] text-black font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform text-sm"
              >
                Visiter la plateforme live <ExternalLink size={16} />
              </a>
            ) : (
              <a
                href={`https://wa.me/22655300858?text=Bonjour%20Amine,%20je%20souhaite%20en%20savoir%20plus%20sur%20le%20projet%20${encodeURIComponent(project.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-clay text-black font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform text-sm"
              >
                Demander une démo <ExternalLink size={16} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
