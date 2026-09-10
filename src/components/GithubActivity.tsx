import { useEffect, useState } from 'react'
import { Star, GitFork, ExternalLink, Github } from 'lucide-react'
import Reveal from './Reveal'
import { useLanguage } from '../context/LanguageContext'

const GITHUB_USER = 'aminepare931-source'

interface Repo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
}

export default function GithubActivity() {
  const [repos, setRepos] = useState<Repo[] | null>(null)
  const [error, setError] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`)
      .then((r) => {
        if (!r.ok) throw new Error('fail')
        return r.json()
      })
      .then((data) => setRepos(Array.isArray(data) ? data.filter((r: Repo) => !r.name.includes('.github.io') || true).slice(0, 6) : []))
      .catch(() => setError(true))
  }, [])

  if (error) return null // pas de faux contenu si l'API échoue, on masque juste la section

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 text-xs text-clay uppercase tracking-[0.3em] mb-4">
          <span className="w-6 h-px bg-clay" /> {t('Activité en direct', 'Live Activity')}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl">
            {t('Sur GitHub', 'On GitHub')}<span className="text-[#3B82F6]">.</span>
          </h2>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-slate-900/70 hover:text-clay transition-colors"
          >
            <Github size={16} /> @{GITHUB_USER}
          </a>
        </div>
      </Reveal>

      {!repos ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl bg-surface border border-stroke shimmer relative overflow-hidden" />
          ))}
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center py-16 text-muted text-sm border border-dashed border-stroke rounded-3xl">
          {t('Aucun dépôt public trouvé.', 'No public repositories found.')}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <Reveal key={repo.id} delay={i * 0.06}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between h-full border border-stroke rounded-2xl p-5 bg-surface/30 hover:border-clay/40 hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-base text-slate-900 group-hover:text-clay transition-colors truncate">
                      {repo.name}
                    </h3>
                    <ExternalLink size={14} className="text-slate-900/30 group-hover:text-clay shrink-0 mt-1 transition-colors" />
                  </div>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 min-h-[2.5em]">
                    {repo.description || t('Pas de description.', 'No description.')}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-900/60 font-mono">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: LANG_COLORS[repo.language] || '#94a3b8' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
