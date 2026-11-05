/** Formulaire de candidature (équipe) : décrit une seule fois, utilisé par la page publique ET par l'administration. */
export type FieldType = 'text' | 'tel' | 'email' | 'url' | 'textarea' | 'select' | 'radio' | 'check'

export interface Field {
  key: string
  label: string
  type: FieldType
  required?: boolean
  min?: number
  options?: string[]
  placeholder?: string
  hint?: string
  rows?: number
}
export interface Section { id: string; title: string; intro?: string; fields: Field[] }

const YES_NO = ['Oui', 'Non']

export const APPLICATION_SECTIONS: Section[] = [
  {
    id: 'identite', title: 'Toi et ton contact',
    intro: "Ces informations ne sont jamais publiées. Elles servent uniquement à te recontacter.",
    fields: [
      { key: 'name', label: 'Nom et prénom', type: 'text', required: true, min: 2, placeholder: 'Ex. Aminata Traoré' },
      { key: 'phone', label: 'Numéro WhatsApp', type: 'tel', required: true, min: 8, placeholder: 'Ex. +226 70 00 00 00' },
      { key: 'email', label: 'Adresse e-mail', type: 'email', required: true },
      { key: 'city', label: 'Ville et pays où tu habites', type: 'text', required: true, min: 2 },
      { key: 'languages', label: 'Langues que tu parles et écris', type: 'text', required: true, min: 2, placeholder: 'Ex. Français, anglais, mooré' },
      { key: 'adult', label: "Je confirme avoir 18 ans ou plus.", type: 'check', required: true },
    ],
  },
  {
    id: 'poste', title: 'Le poste qui t\'intéresse',
    fields: [
      { key: 'role', label: 'Poste visé', type: 'select', required: true, options: ['Développeur(se) web', 'Développeur(se) mobile', 'Design graphique et UI / UX', 'Marketing digital et réseaux sociaux', 'Rédaction et création de contenu', 'Montage vidéo et motion', 'Prospection et vente', 'Gestion de projet et support client', 'Autre'] },
      { key: 'role_other', label: 'Si « Autre », lequel ?', type: 'text' },
      { key: 'collab', label: 'Type de collaboration souhaité', type: 'select', required: true, options: ['Associé(e)', 'Collaborateur(trice) régulier(ère)', 'Missions ponctuelles en freelance', 'Stage ou apprentissage'] },
      { key: 'pay', label: 'Rémunération ou mode de paiement que tu attends', type: 'text', required: true, min: 3, placeholder: 'Ex. À la mission, au pourcentage, mensuel…' },
    ],
  },
  {
    id: 'competences', title: 'Tes compétences et ton expérience',
    intro: "Sois précis(e) et honnête : tout sera vérifié pendant l'entretien et le test.",
    fields: [
      { key: 'skills', label: 'Tes compétences principales', type: 'textarea', required: true, min: 30, rows: 4, hint: 'Ce que tu sais faire concrètement, pas seulement des mots-clés.' },
      { key: 'tools', label: 'Outils, logiciels et technologies que tu maîtrises', type: 'text', required: true, min: 3, placeholder: 'Ex. Figma, React, Photoshop, CapCut, Meta Ads…' },
      { key: 'level', label: 'Ton niveau actuel', type: 'select', required: true, options: ['Débutant(e) (moins d\'un an de pratique)', 'Intermédiaire (déjà des projets terminés)', 'Avancé(e) (travail régulier, autonome)', 'Expert(e) (je peux former les autres)'] },
      { key: 'years', label: 'Depuis combien de temps pratiques-tu ?', type: 'select', required: true, options: ['Moins d\'un an', '1 à 2 ans', '3 à 5 ans', 'Plus de 5 ans'] },
      { key: 'experience', label: 'Tes expériences', type: 'textarea', required: true, min: 50, rows: 5, hint: 'Où, quand, pendant combien de temps, et ce que tu as fait (stages, clients, projets, associations).' },
      { key: 'clients', label: 'As-tu déjà travaillé pour de vrais clients ?', type: 'radio', required: true, options: YES_NO },
      { key: 'education', label: 'Ta formation', type: 'text', required: true, min: 3, placeholder: 'École, autodidacte, certificats, formations en ligne…' },
    ],
  },
  {
    id: 'preuves', title: 'Les preuves de ton travail',
    intro: "Montre-nous des choses réelles que tu as faites. Sans exemple vérifiable, le dossier est très difficile à retenir.",
    fields: [
      { key: 'link1', label: 'Lien vers un de tes meilleurs travaux', type: 'url', required: true, placeholder: 'https://… (portfolio, GitHub, Behance, site, page, vidéo)' },
      { key: 'link1_desc', label: 'Ce que tu as fait précisément dans ce travail', type: 'textarea', required: true, min: 30, rows: 3, hint: 'Seul(e) ou en équipe ? Quelle était ta part ? Quels outils ?' },
      { key: 'link2', label: 'Un deuxième travail (facultatif)', type: 'url', placeholder: 'https://…' },
      { key: 'link3', label: 'Un troisième travail (facultatif)', type: 'url', placeholder: 'https://…' },
      { key: 'cv', label: 'Lien vers ton CV (facultatif)', type: 'url', placeholder: 'Google Drive, Dropbox…' },
      { key: 'social', label: 'Ton profil LinkedIn ou réseau professionnel (facultatif)', type: 'text' },
    ],
  },
  {
    id: 'dispo', title: 'Disponibilité et matériel',
    fields: [
      { key: 'hours', label: 'Temps que tu peux consacrer chaque semaine', type: 'select', required: true, options: ['Moins de 10 heures', '10 à 20 heures', '20 à 40 heures', 'Temps plein'] },
      { key: 'start', label: 'Quand peux-tu commencer ?', type: 'select', required: true, options: ['Immédiatement', 'Sous 2 semaines', 'Sous 1 mois', 'Plus tard'] },
      { key: 'equipment', label: 'Ton matériel', type: 'select', required: true, options: ['Ordinateur personnel et internet stable', 'Ordinateur, mais internet instable', 'Téléphone seulement', 'Je dois utiliser un cybercafé'] },
      { key: 'situation', label: 'Ta situation actuelle (emploi, études, autre)', type: 'text', required: true, min: 3, placeholder: 'Et comment elle influence ta disponibilité' },
    ],
  },
  {
    id: 'references', title: 'Personnes qui peuvent confirmer ton travail',
    intro: "Ancien client, enseignant, responsable ou collègue. Préviens-les : nous pourrons les contacter.",
    fields: [
      { key: 'ref1_name', label: 'Référence 1 : nom et lien avec toi', type: 'text', placeholder: 'Ex. Moussa Ouédraogo, ancien client' },
      { key: 'ref1_contact', label: 'Référence 1 : téléphone ou e-mail', type: 'text' },
      { key: 'ref2_name', label: 'Référence 2 : nom et lien avec toi', type: 'text' },
      { key: 'ref2_contact', label: 'Référence 2 : téléphone ou e-mail', type: 'text' },
    ],
  },
  {
    id: 'situations', title: 'Mises en situation',
    intro: "Il n'y a pas de bonne réponse toute faite : réponds avec tes propres mots, comme tu agirais vraiment.",
    fields: [
      { key: 'hard', label: 'Raconte un problème difficile que tu as résolu dans ton travail et comment tu t\'y es pris(e)', type: 'textarea', required: true, min: 60, rows: 5 },
      { key: 'sc1', label: 'Un client te demande de refaire entièrement un travail déjà validé, sans payer en plus. Que fais-tu ?', type: 'textarea', required: true, min: 40, rows: 3 },
      { key: 'sc2', label: "Tu es bloqué(e) sur une tâche à deux jours de la livraison. Comment réagis-tu ?", type: 'textarea', required: true, min: 40, rows: 3 },
      { key: 'sc3', label: 'Le client découvre une erreur dans un travail que tu as livré. Que fais-tu ?', type: 'textarea', required: true, min: 40, rows: 3 },
      { key: 'why', label: 'Pourquoi veux-tu travailler avec AMINE DIGITAL, et que peux-tu nous apporter ?', type: 'textarea', required: true, min: 60, rows: 4 },
      { key: 'goal', label: 'Où veux-tu en être professionnellement dans un an ? (facultatif)', type: 'textarea', rows: 2 },
    ],
  },
  {
    id: 'engagements', title: 'Tes engagements',
    fields: [
      { key: 'c_true', label: 'Je confirme que ces informations sont exactes et que les travaux présentés sont bien les miens.', type: 'check', required: true },
      { key: 'c_conf', label: 'Je m\'engage à respecter la confidentialité des projets et des données des clients.', type: 'check', required: true },
      { key: 'c_test', label: "Je comprends que l'envoi de ce dossier ne garantit pas une place : AMINE DIGITAL peut me demander un entretien et un test pratique avant toute collaboration.", type: 'check', required: true },
      { key: 'c_data', label: "J'accepte qu'AMINE DIGITAL conserve ces informations, de manière privée, pour étudier ma candidature et me contacter. Elles ne sont pas publiées sur le site.", type: 'check', required: true },
    ],
  },
]

export const ALL_FIELDS: Field[] = APPLICATION_SECTIONS.flatMap((s) => s.fields)
export const FIELD_LABEL: Record<string, string> = Object.fromEntries(ALL_FIELDS.map((f) => [f.key, f.label]))

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i

/** Renvoie le message d'erreur d'un champ, ou '' s'il est correct. */
export function checkField(f: Field, v: unknown): string {
  const s = typeof v === 'string' ? v.trim() : ''
  if (f.type === 'check') return f.required && v !== true ? 'À cocher pour continuer.' : ''
  if (!s) return f.required ? 'Ce champ est obligatoire.' : ''
  if (f.min && s.length < f.min) return `Réponds avec un peu plus de détails (au moins ${f.min} caractères).`
  if (f.type === 'email' && !EMAIL.test(s)) return 'Adresse e-mail invalide.'
  if (f.type === 'url' && !URL_RE.test(s)) return 'Lien invalide : il doit commencer par https://'
  return ''
}

/** Points d'attention pour t'aider à trier les dossiers (indications, pas un verdict). */
export function flags(d: Record<string, unknown>): { warn: string[]; good: string[] } {
  const s = (k: string) => (typeof d[k] === 'string' ? (d[k] as string).trim() : '')
  const warn: string[] = [], good: string[] = []
  const links = ['link1', 'link2', 'link3'].filter((k) => s(k)).length
  if (links >= 2) good.push(`${links} travaux à vérifier`); else warn.push(links ? 'Un seul travail présenté' : 'Aucun travail présenté')
  if (s('ref1_name') && s('ref1_contact')) good.push('Au moins une référence'); else warn.push('Aucune référence contactable')
  if (/^Moins/.test(s('years'))) warn.push("Moins d'un an de pratique")
  if (/^Débutant/.test(s('level'))) warn.push('Niveau débutant')
  if (s('clients') === 'Non') warn.push('Jamais travaillé pour un client')
  if (s('clients') === 'Oui') good.push('A déjà eu des clients')
  if (/^(Téléphone|Je dois)/.test(s('equipment'))) warn.push('Matériel limité')
  if (/Moins de 10/.test(s('hours'))) warn.push('Moins de 10 h par semaine')
  const long = ['hard', 'sc1', 'sc2', 'sc3', 'why'].filter((k) => s(k).length >= 150).length
  if (long >= 4) good.push('Réponses développées'); else if (long <= 1) warn.push('Réponses très courtes')
  return { warn, good }
}
