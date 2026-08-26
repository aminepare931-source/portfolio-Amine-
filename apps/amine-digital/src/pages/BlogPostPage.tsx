import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ARTICLES } from '../data/articles'

export default function BlogPostPage() {
  const { slug } = useParams()
  const article = ARTICLES.find((a) => a.slug === slug)

  if (!article) return <Navigate to="/journal" replace />

  return (
    <div className="px-6 pt-36 pb-24 max-w-[700px] mx-auto">
      <Link to="/journal" className="inline-flex items-center gap-2 text-sm text-muted hover:text-clay transition-colors mb-8">
        <ArrowLeft size={15} /> Tous les articles
      </Link>

      <div className="text-xs font-mono text-muted mb-3">{article.date}</div>
      <h1 className="font-display text-3xl sm:text-4xl mb-8 leading-tight">{article.title}</h1>

      <div className="space-y-5 text-slate-900/80 leading-relaxed text-base sm:text-lg mb-14">
        {article.content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="border-t border-stroke pt-8 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity"
        >
          Un projet en tête ? Discutons-en <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
