export interface Review {
  name: string
  /** Activité ou ville, ex. « Commerçante, Bobo-Dioulasso » */
  role?: string
  /** Service concerné, ex. « Site web », « CV professionnel » */
  service?: string
  /** Mois, ex. « 2026-10 » */
  date?: string
  /** Message du client, tel qu'il l'a écrit (seules les fautes de frappe se corrigent) */
  text: string
  /** Capture d'écran du message d'origine, dans public/assets/avis/ (optionnel) */
  screenshot?: string
}

// Uniquement de vrais avis, avec l'accord du client.
// Pour en ajouter : déposer la capture dans public/assets/avis/ et ajouter un bloc ci-dessous.
export const REVIEWS: Review[] = []
