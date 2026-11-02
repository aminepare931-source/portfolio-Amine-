import { useEffect, useState } from 'react'
import { restSelect, fetchProjects } from './supabase'
import { PUBLICATIONS, type Publication, type PubCategory } from '../data/publications'

/* ───────── Contenus gérés depuis l'administration (avec repli sur des valeurs par défaut) ───────── */

export interface Realisation { id: string; title: string; client: string | null; sector: string | null; description: string; result: string | null; link: string | null; tags: string[]; image: string | null; fit?: 'cover' | 'contain' }
export interface Faq { id: string; question: string; answer: string }
export interface Plan { id: string; name: string; price: string; tagline: string | null; features: string[]; highlight: boolean }

export const DEFAULT_FAQ: Faq[] = [
  { id: 'd1', question: 'Combien de temps faut-il pour avoir son site ?', answer: 'Un site vitrine de la formule Starter est livré en 5 à 7 jours.' },
  { id: 'd2', question: 'Le nom de domaine est-il inclus ?', answer: 'Oui : la formule Starter comprend un nom de domaine pour 1 an.' },
  { id: 'd3', question: 'Puis-je vendre en ligne avec Mobile Money ?', answer: 'Oui. La formule Pro inclut une boutique en ligne avec paiement Mobile Money.' },
  { id: 'd4', question: 'Pourrai-je gérer mon site moi-même ?', answer: 'Oui. Nos sites sont pensés pour rester faciles à gérer une fois livrés, et nous restons disponibles en cas de besoin.' },
  { id: 'd5', question: 'Y a-t-il un suivi après la livraison ?', answer: 'La formule Pro inclut 1 mois de support. Pour les applications mobiles, nous proposons aussi la maintenance et les mises à jour.' },
  { id: 'd6', question: 'Comment obtenir un devis ?', answer: 'Remplissez la page Devis ou écrivez-nous sur WhatsApp : nous revenons vers vous avec une proposition adaptée à votre projet et à votre budget.' },
]

export const DEFAULT_PLANS: Plan[] = [
  { id: 'p1', name: 'Starter', price: '20 000 FCFA', tagline: 'Pour démarrer en ligne', features: ["Site vitrine (jusqu'à 5 pages)", 'Design responsive mobile', 'Nom de domaine (1 an)', 'Livraison en 5-7 jours'], highlight: false },
  { id: 'p2', name: 'Pro', price: '50 000 FCFA', tagline: 'Pour vendre en ligne', features: ['Tout Starter, plus :', 'Boutique en ligne + Mobile Money', 'Réseaux sociaux configurés', 'Support 1 mois inclus'], highlight: true },
  { id: 'p3', name: 'Sur-mesure', price: 'À partir de 100 000 FCFA', tagline: 'Application, automatisation, projet spécifique', features: ['Application mobile ou web métier', 'Automatisation / IA', 'Accompagnement complet', 'Devis personnalisé'], highlight: false },
]

/** Petit cache partagé : une seule requête par type de contenu et par visite. */
const cache = new Map<string, unknown>()
const pending = new Map<string, Promise<unknown>>()

function useRemote<T>(key: string, fetcher: () => Promise<T>, initial: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(cache.has(key) ? (cache.get(key) as T) : initial)
  const [loading, setLoading] = useState(!cache.has(key))
  useEffect(() => {
    let on = true
    if (cache.has(key)) { setData(cache.get(key) as T); setLoading(false); return }
    if (!pending.has(key)) pending.set(key, fetcher().then((v) => { cache.set(key, v); return v }))
    ;(pending.get(key) as Promise<T>).then((v) => { if (on) { setData(v); setLoading(false) } })
    return () => { on = false }
  }, [key]) // eslint-disable-line
  return { data, loading }
}

interface PubRow { slug: string; title: string; category: PubCategory; excerpt: string; price: string | null; intro: string; points: string[]; service_slug: string | null; image: string; alt: string | null; w: number; h: number }

/** Publications : celles ajoutées depuis l'administration en premier, puis celles du site. */
export function usePublications(): { list: Publication[]; loading: boolean } {
  const { data, loading } = useRemote<Publication[]>('publications', async () => {
    const rows = await restSelect<PubRow>('publications', 'select=*&order=created_at.desc')
    return (rows ?? []).map((r) => ({
      slug: r.slug, title: r.title, category: r.category, excerpt: r.excerpt, price: r.price ?? undefined,
      intro: r.intro, points: Array.isArray(r.points) ? r.points : [], serviceSlug: r.service_slug ?? undefined,
      image: r.image, alt: r.alt ?? r.title, w: r.w, h: r.h,
    }))
  }, [])
  const slugs = new Set(data.map((p) => p.slug))
  return { list: [...data, ...PUBLICATIONS.filter((p) => !slugs.has(p.slug))], loading }
}

export function useRealisations(): { list: Realisation[]; loading: boolean } {
  const { data, loading } = useRemote<Realisation[]>('realisations', async () => {
    const [rows, projects] = await Promise.all([restSelect<Realisation>('realisations', 'select=*&order=position.asc,created_at.desc'), fetchProjects()])
    const own = (rows ?? []).map((r) => ({ ...r, tags: Array.isArray(r.tags) ? r.tags : [] }))
    // Projets du portfolio (même base) : affichés aussi ici, après ceux ajoutés dans l'administration
    const fromPortfolio: Realisation[] = projects.map((p) => ({
      id: `pf-${p.id}`, title: p.name, client: null, sector: null, description: p.description, result: null, link: null,
      tags: Array.isArray(p.tags) ? p.tags : [], image: p.img, fit: 'contain',
    }))
    return [...own, ...fromPortfolio]
  }, [])
  return { list: data, loading }
}

export function useFaqs(): Faq[] {
  const { data } = useRemote<Faq[] | null>('faqs', () => restSelect<Faq>('faqs', 'select=*&order=position.asc,created_at.asc'), null)
  return data ?? DEFAULT_FAQ
}

export function usePlans(): Plan[] {
  const { data } = useRemote<Plan[] | null>('plans', async () => {
    const rows = await restSelect<Plan>('plans', 'select=*&order=position.asc,created_at.asc')
    return rows && rows.length ? rows.map((r) => ({ ...r, features: Array.isArray(r.features) ? r.features : [] })) : null
  }, null)
  return data ?? DEFAULT_PLANS
}
