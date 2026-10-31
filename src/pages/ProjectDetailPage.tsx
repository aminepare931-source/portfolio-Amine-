import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, CheckCircle, Cpu, BarChart3, Sparkles } from 'lucide-react'
import { fetchProjects, Project } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

function statusMeta(status: Project['status'] | undefined, t: (fr: string, en: string) => string) {
  switch (status) {
    case 'in_progress': return { label: t('En cours', 'In progress'), dot: '#eab308' }
    case 'paused': return { label: t('En pause', 'Paused'), dot: '#f97316' }
    case 'done': return { label: t('Terminé', 'Done'), dot: '#64748b' }
    case 'deployed':
    default: return { label: t('Déployé', 'Deployed'), dot: '#22c55e' }
  }
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useLanguage()
  const [project, setProject] = useState<Project | null | undefined>(undefined)

  useEffect(() => {
    fetchProjects().then((data) => {
      setProject(data.find((p) => String(p.id) === String(id)) || null)
    })
  }, [id])

  if (project === undefined) {
    return (
      <div className="pt-28 md:pt-36 px-4 sm:px-6 max-w-[1100px] mx-auto">
        <div className="aspect-video rounded-3xl bg-surface border border-stroke shimmer relative overflow-hidden" />
      </div>
    )
  }

  if (project === null) {
    return (
      <div className="pt-28 md:pt-36 min-h-[50vh] flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-muted mb-6">{t('Projet introuvable.', 'Project not found.')}</p>
          <Link to="/projets" className="inline-flex items-center gap-2 text-clay font-medium">
            <ArrowLeft size={16} /> {t('Retour aux projets', 'Back to projects')}
          </Link>
        </div>
      </div>
    )
  }

  const status = statusMeta(project.status, t)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 max-w-[1100px] mx-auto"
    >
      <Link
        to="/projets"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> {t('Retour aux projets', 'Back to projects')}
      </Link>

      {/* Screenshot — full, uncropped */}
      <div className="w-full rounded-3xl overflow-hidden border border-stroke bg-surface mb-8">
        {project.img ? (
          <img
            src={project.img}
            alt={project.name}
            className="w-full max-h-[75vh] object-contain mx-auto"
          />
        ) : (
          <div
            className="w-full aspect-[16/9] flex flex-col items-center justify-center p-6 text-center"
            style={{ background: `linear-gradient(135deg, #f8fafc 0%, ${project.color || '#3B82F6'}33 100%)` }}
          >
            <span className="text-6xl mb-3">{project.emoji || '🚀'}</span>
            <span className="font-display text-3xl text-slate-900">{project.name}</span>
          </div>
        )}
      </div>

      {/* Title & meta */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full border border-stroke">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
            {status.label}
          </span>
          {(project.tags || []).map((tag) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/5 text-slate-900/70">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-slate-900">
          {project.name}
        </h1>
        {project.tagline && project.tagline !== project.description && (
          <p className="text-base sm:text-lg text-clay font-medium mt-2">
            {project.tagline}
          </p>
        )}
      </div>

      {/* Key Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
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
      <div className="mb-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-clay font-bold mb-3">
          {t('Présentation détaillée', 'Detailed overview')}
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed whitespace-pre-line">
          {project.fullDescription || project.description}
        </p>
      </div>

      {/* Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-clay font-bold mb-3 flex items-center gap-2">
            <Sparkles size={14} /> {t('Fonctionnalités majeures', 'Key features')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-900/90 bg-surface/40 p-3 rounded-xl border border-slate-900/5">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture */}
      {project.architecture && project.architecture.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-clay font-bold mb-3 flex items-center gap-2">
            <Cpu size={14} /> {t('Stack Technique & Architecture', 'Tech stack & architecture')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.architecture.map((arch, idx) => (
              <span key={idx} className="text-xs font-mono bg-surface border border-stroke px-3 py-1.5 rounded-lg text-slate-900/80">
                ⚡ {arch}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="pt-6 border-t border-stroke flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/projets"
          className="text-xs sm:text-sm text-muted hover:text-slate-900 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} /> {t('Tous les projets', 'All projects')}
        </Link>

        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#3B82F6] text-black font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform text-sm"
          >
            {t('Visiter la plateforme live', 'Visit live platform')} <ExternalLink size={16} />
          </a>
        ) : (
          <a
            href={`https://wa.me/22655300868?text=Bonjour%20Amine,%20je%20souhaite%20en%20savoir%20plus%20sur%20le%20projet%20${encodeURIComponent(project.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-clay text-black font-medium px-6 py-3 rounded-full hover:scale-105 transition-transform text-sm"
          >
            {t('Demander une démo', 'Request a demo')} <ExternalLink size={16} />
          </a>
        )}
      </div>
    </motion.div>
  )
}
