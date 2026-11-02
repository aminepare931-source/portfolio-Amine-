export type TeamGroup = 'Fondateur' | 'Associés' | 'Collaborateurs'

export interface Member {
  name: string
  role: string
  group: TeamGroup
  /** Photo dans public/assets/team/ (carré de préférence) */
  photo?: string
  /** Une phrase de présentation (facultatif) */
  bio?: string
}

// Uniquement de vraies personnes, avec leur accord pour apparaître sur le site.
export const TEAM: Member[] = [
  {
    name: 'Mouhamed Amine Paré',
    role: 'Fondateur — développement & direction',
    group: 'Fondateur',
    photo: '/assets/founder.jpg',
    bio: 'Développeur autodidacte basé à Bobo-Dioulasso.',
  },
]
