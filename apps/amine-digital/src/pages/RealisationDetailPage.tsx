import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react'
import { useRealisation, KIND_NOTE, STATUS_LABEL } from '../lib/content'
import { KindBadge } from '../components/RealisationCard'
import Seo from '../components/Seo'

export default function RealisationDetailPage() {
  const { id } = useParams()
  const { item: r, loading } = useRealisation(id)

  if (loading) return <div className="min-h-[70vh]" />
  if (!r) {
    return (
      <div className="px-6 pt-40 pb-24 max-w-[600px] mx-auto text-center">
        <h1 className="font-display text-3xl mb-4">Projet introuvable</h1>
        <Link to="/realisations" className="text-clay font-semibold hover:underline">Voir tous les projets →</Link>
      </div>
    )
  }
  const paragraphs = (r.long_desc ?? '').split(/\n{2,}|\n/).map((x) => x.trim()).filter(Boolean)
  return (
    <div className="px-5 sm:px-8 pt-36 pb-24 max-w-[980px] mx-auto">
      <Seo path={`/realisations/${r.id}`} title={`${r.title} — AMINE DIGITAL`} description={r.description} image={r.image?.startsWith('/') ? r.image : undefined} />
      <Link to="/realisations" className="inline-flex items-center gap-2 text-sm text-muted hover:text-clay transition-colors mb-8"><ArrowLeft size={15} /> Tous les projets</Link>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <KindBadge kind={r.kind} />
        {r.status && <span className="text-[10px] font-mono uppercase tracking-wider border border-stroke rounded-sm px-2 py-1">{STATUS_LABEL[r.status]}</span>}
      </div>
      <h1 className="font-display text-3xl sm:text-5xl leading-tight mb-4">{r.title}</h1>
      <p className="text-slate-900/75 text-lg leading-relaxed mb-3">{r.description}</p>
      {r.kind && (
        <p className="text-sm text-muted mb-8">
          {KIND_NOTE[r.kind]}{r.client ? ` Client : ${r.client}.` : ''}{r.sector ? ` Secteur : ${r.sector}.` : ''}
        </p>
      )}

      {r.image && <img src={r.image} alt={r.title} onError={(e) => { e.currentTarget.style.display = 'none' }} className="w-full h-auto rounded-md border border-stroke shadow-[0_20px_50px_rgba(10,61,145,0.12)] mb-10" />}

      {paragraphs.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl mb-4">Le projet en détail</h2>
          <div className="space-y-4 text-slate-900/80 leading-relaxed">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
        </section>
      )}

      {r.features && r.features.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl mb-4">Fonctionnalités</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {r.features.map((f) => <li key={f} className="flex gap-3 text-slate-900/80"><Check size={18} className="text-gov shrink-0 mt-0.5" /><span>{f}</span></li>)}
          </ul>
        </section>
      )}

      {r.result && (
        <section className="mb-10 border-l-4 border-gov pl-5 py-1">
          <div className="text-xs font-mono uppercase tracking-widest text-clay mb-1">Résultat</div>
          <p className="text-slate-900/85">{r.result}</p>
        </section>
      )}

      {r.stack && r.stack.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-2">{r.stack.map((t) => <span key={t} className="text-xs font-mono border border-stroke rounded-full px-3 py-1.5 bg-white/60">{t}</span>)}</div>
        </section>
      )}

      {r.gallery && r.gallery.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl mb-4">Aperçus</h2>
          <div className="grid sm:grid-cols-2 gap-4">{r.gallery.map((g, i) => <img key={i} src={g} alt={`${r.title} — aperçu ${i + 1}`} loading="lazy" className="w-full h-auto rounded-md border border-stroke" />)}</div>
        </section>
      )}

      <div className="flex flex-wrap gap-3 border-t border-stroke pt-8">
        {r.link && <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-stroke px-6 py-3 rounded-sm text-gov hover:border-gov/50 transition-colors">Voir le projet en ligne <ExternalLink size={15} /></a>}
        <Link to="/devis" className="inline-flex items-center gap-2 bg-clay text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">Un projet similaire ? Demander un devis <ArrowRight size={15} /></Link>
      </div>
    </div>
  )
}
