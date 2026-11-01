export interface ServicePhoto { src: string; alt: string }

const p = (slug: string, n: number, alt: string): ServicePhoto => ({ src: `/assets/services-photos/${slug}-${n}.jpg`, alt })

// 4 photos par service, affichées dans l'ordre le long de la page de détail.
// Pour en ajouter : déposer l'image dans public/assets/services-photos/ puis l'ajouter ici.
export const SERVICE_PHOTOS: Record<string, ServicePhoto[]> = {
  'sites-web': [
    p('sites-web', 1, 'Site vitrine AMINE DIGITAL affiché sur un ordinateur portable'),
    p('sites-web', 2, 'Boutique en ligne affichée sur un ordinateur portable'),
    p('sites-web', 3, 'Tableau de bord web avec graphiques sur un ordinateur portable'),
    p('sites-web', 4, 'Site portfolio affiché sur un ordinateur portable'),
  ],
  'applications-mobiles': [
    p('applications-mobiles', 1, 'Application mobile AMINE DIGITAL tenue en main'),
    p('applications-mobiles', 2, 'Application mobile de transfert d’argent sur smartphone'),
    p('applications-mobiles', 3, 'Écran d’accueil d’une application mobile AMINE DIGITAL'),
    p('applications-mobiles', 4, 'Application mobile de fil d’actualité sur smartphone'),
  ],
  'automatisation-ia': [
    p('automatisation-ia', 1, 'Robot interagissant avec une interface d’intelligence artificielle'),
    p('automatisation-ia', 2, 'Ordinateur portable affichant une puce IA'),
    p('automatisation-ia', 3, 'Schéma d’automatisation de processus sur un écran'),
    p('automatisation-ia', 4, 'Puce d’intelligence artificielle sur circuit imprimé'),
  ],
  cybersecurite: [
    p('cybersecurite', 1, 'Ordinateur portable affichant un bouclier de sécurité'),
    p('cybersecurite', 2, 'Cadenas numérique et saisie au clavier'),
    p('cybersecurite', 3, 'Technicien devant des serveurs sécurisés'),
    p('cybersecurite', 4, 'Bouclier et cadenas de cybersécurité'),
  ],
  design: [
    p('design', 1, 'Nuancier de couleurs et croquis de charte graphique'),
    p('design', 2, 'Dessin du logo AMINE DIGITAL sur une tablette graphique'),
    p('design', 3, 'Retouche graphique sur un écran d’ordinateur'),
    p('design', 4, 'Carte et support de marque AMINE DIGITAL'),
  ],
}
