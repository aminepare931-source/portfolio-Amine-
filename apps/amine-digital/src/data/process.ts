export interface ProcessStep {
  n: string
  title: string
  desc: string
}

export const PROCESS: ProcessStep[] = [
  { n: '01', title: 'Prise de contact & brief', desc: "On échange sur votre projet, vos objectifs, vos contraintes (budget, délai). Sur WhatsApp ou par appel, en français." },
  { n: '02', title: 'Proposition & devis', desc: "Vous recevez une proposition claire : ce qui est inclus, le délai, le prix. Pas de surprise en cours de route." },
  { n: '03', title: 'Conception', desc: "Maquette ou structure du projet, validée avec vous avant de passer au développement." },
  { n: '04', title: 'Développement', desc: "Je construis le projet par étapes, avec des points d'avancement réguliers pour ajuster si besoin." },
  { n: '05', title: 'Tests & livraison', desc: "Vérification sur mobile et desktop, corrections, puis mise en ligne du projet fini." },
  { n: '06', title: 'Suivi & support', desc: "Disponible après la livraison pour les ajustements, questions ou évolutions futures." },
]
