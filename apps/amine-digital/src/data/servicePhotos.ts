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
  'e-commerce': [
    p('e-commerce', 1, 'Ordinateur portable affichant une boutique en ligne, avec un casque audio'),
    p('e-commerce', 2, 'Smartphone affichant « Paiement réussi »'),
    p('e-commerce', 3, 'Chariot avec colis devant un ordinateur'),
    p('e-commerce', 4, 'Cartes bancaires et terminal de paiement'),
  ],
  'community-management': [
    p('community-management', 1, 'Smartphone entouré d’icônes de réseaux sociaux'),
    p('community-management', 2, 'Ordinateur affichant des statistiques d’audience'),
    p('community-management', 3, 'Anneau lumineux et smartphone sur trépied'),
    p('community-management', 4, 'Icônes « j’aime » et commentaires'),
  ],
  digitalisation: [
    p('digitalisation', 1, 'Homme d’affaires devant un ordinateur'),
    p('digitalisation', 2, 'Schéma « Transformation digitale »'),
    p('digitalisation', 3, 'Main touchant une interface de processus numériques'),
    p('digitalisation', 4, 'Bureau moderne ouvert'),
  ],
  'suivi-entreprise': [
    p('suivi-entreprise', 1, 'Tableau de bord affiché à l’écran'),
    p('suivi-entreprise', 2, 'Tablette affichant objectifs, performances et rapports'),
    p('suivi-entreprise', 3, 'Carnet « Plan d’action » et café'),
    p('suivi-entreprise', 4, 'Réunion devant des graphiques'),
  ],
  conseil: [
    p('conseil', 1, 'Consultant en discussion avec un client'),
    p('conseil', 2, 'Carnet « stratégie, innovation, performance »'),
    p('conseil', 3, 'Ampoule tenue en main'),
    p('conseil', 4, 'Pousse de plante sur des pièces de monnaie'),
  ],
  formation: [
    p('formation', 1, 'Formateur devant une salle'),
    p('formation', 2, 'Ordinateur affichant « Formation en ligne »'),
    p('formation', 3, 'Étudiante qui écrit'),
    p('formation', 4, 'Attestation de formation'),
  ],
}

/** Photos de couverture (cartes) et bannières des services illustrés par des photos. */
const COVERED = ['e-commerce', 'community-management', 'digitalisation', 'suivi-entreprise', 'conseil', 'formation']
export const serviceCard = (slug: string) => (COVERED.includes(slug) ? `/assets/services-cards/${slug}.jpg` : null)
export const serviceBanner = (slug: string) => (COVERED.includes(slug) ? `/assets/services-banners/${slug}.jpg` : null)
