/**
 * Présentations préparées à partir du code réel des dépôts GitHub d'Amine.
 * Importées dans l'administration comme BROUILLONS (invisibles sur le site) : le type, le statut
 * et les textes sont à vérifier puis à publier par Amine. Rien ici n'affirme un client, un chiffre
 * d'utilisateurs ou un résultat : uniquement ce que le code prouve.
 */
export interface ProjectDraft {
  title: string
  /** '' = à choisir par Amine (aucune preuve dans le code) */
  kind: 'client' | 'saas' | 'interne' | 'personnel' | ''
  status: 'en_ligne' | 'en_developpement' | 'prototype' | ''
  sector: string
  description: string
  long_desc: string
  features: string[]
  stack: string[]
  tags: string[]
  image?: string
}

const RAW = 'https://raw.githubusercontent.com/aminepare931-source'

export const PROJECT_DRAFTS: ProjectDraft[] = [
  {
    title: 'Resto BF',
    kind: 'saas',
    status: '',
    sector: 'Restauration',
    description: "Plateforme SaaS pour restaurants, maquis et fast-foods du Burkina : site avec menu digital, commandes par WhatsApp, réservations, espace cuisine en temps réel, stocks et facturation.",
    long_desc:
      "Resto BF permet à un restaurateur de disposer d'un site professionnel et d'un tableau de bord de gestion sans compétence technique. Chaque restaurant obtient sa propre adresse publique avec son menu, ses photos et ses prix en FCFA. Les clients composent un panier et envoient leur commande directement sur WhatsApp, sans commission.\n\nDerrière le site public, le restaurateur dispose d'un tableau de bord : gestion du menu, commandes, réservations et plan de salle, espace cuisine avec statuts de commande en direct, gestion des stocks avec alertes, facturation en PDF, avis clients, galerie, QR codes (restaurant ou par table), messagerie et chat interne entre les membres du personnel.\n\nLa plateforme est multi-restaurants : un espace super-administrateur gère les restaurants, les utilisateurs et un catalogue de fonctionnalités rattachées à des formules d'abonnement (basique, standard, premium). Le registre interne distingue honnêtement ce qui est actif de ce qui est encore prévu : 45 fonctionnalités sont actives, d'autres (campagnes WhatsApp, programme de fidélité, planning du personnel) restent à développer.\n\nCôté technique, l'application fonctionne comme une application web installable (PWA) avec une bannière hors ligne, des données isolées par restaurant grâce aux règles de sécurité de la base, une connexion du personnel par rôle (administrateur, manager, cuisinier, serveur) et une double authentification par e-mail pour le super-administrateur.",
    features: [
      "Menu digital avec photos, catégories et prix en FCFA",
      "Panier et commande envoyée par WhatsApp",
      "Réservations et plan de salle interactif avec état des tables",
      "Espace cuisine en temps réel pour les commandes",
      "Gestion des stocks avec seuils d'alerte",
      "Facturation PDF avec logo et personnalisation",
      "Statistiques de ventes, rapports et export des données",
      "QR codes du restaurant et par table",
      "Plusieurs gabarits de site (standard et premium) personnalisables",
      "Gestion du personnel par rôles et chat interne",
      "Avis clients et galerie photos et vidéos",
      "Espace super-administrateur avec formules d'abonnement",
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'PWA'],
    tags: ['SaaS', 'Restauration', 'WhatsApp', 'PWA'],
    image: `${RAW}/resto-bf-saas/main/public/landing/preview-soleil.webp`,
  },
  {
    title: 'BoutikBF',
    kind: 'saas',
    status: '',
    sector: 'Commerce',
    description: "Logiciel de gestion de boutique : caisse tactile, produits avec codes-barres, stock, clients à crédit, fournisseurs, comptabilité simple et gestion des employés.",
    long_desc:
      "BoutikBF est un logiciel de gestion pour commerçants. Le gérant enregistre ses produits (avec codes-barres et import CSV), suit son stock avec des seuils d'alerte, encaisse ses ventes depuis une caisse tactile et suit ses clients, y compris leur solde de crédit.\n\nL'application distingue plusieurs rôles : caissier, gérant, comptable, magasinier, commercial et superviseur. Les employés se connectent avec un identifiant et un code PIN, disposent de leur propre espace et d'un chat d'équipe. Un module de balayage à distance permet d'utiliser le téléphone comme lecteur de codes-barres : l'ordinateur affiche un QR code, le téléphone scanne et envoie le code en direct à la caisse.\n\nLe tableau de bord et les pages comptabilité et rapports présentent les entrées et sorties d'argent sur 30, 90, 180 ou 365 jours avec export CSV. Les reçus et factures sont générés avec un code-barres. Un espace super-administrateur gère les boutiques, les utilisateurs et dispose d'un journal d'audit des actions des administrateurs.\n\nÀ noter : la page de présentation du produit annonce plus de choses que l'application ne contient aujourd'hui (par exemple le multi-dépôts ou un mode sans réseau). Cette fiche ne décrit que ce qui est réellement présent dans le code.",
    features: [
      "Caisse tactile avec plusieurs moyens de paiement (espèces, Mobile Money)",
      "Produits avec catégories, codes-barres et import CSV",
      "Lecteur de codes-barres par caméra, y compris depuis un téléphone à distance",
      "Suivi du stock avec alertes de stock bas",
      "Clients avec solde de crédit",
      "Fournisseurs et mouvements de stock",
      "Reçus et factures avec code-barres",
      "Comptabilité simple : argent qui entre et qui sort, export CSV",
      "Employés avec 6 rôles, connexion par code PIN et chat d'équipe",
      "Espace super-administrateur avec journal d'audit",
      "Interface bilingue français / anglais sur la page de présentation",
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    tags: ['SaaS', 'Caisse', 'Stock', 'Commerce'],
  },
  {
    title: 'Rachida, assistante IA pour boutiques',
    kind: 'saas',
    status: '',
    sector: 'E-commerce',
    description: "Assistante de vente par IA que l'on ajoute à une boutique en ligne : elle conseille les clients, répond sur WhatsApp, suit les prospects et prépare des campagnes.",
    long_desc:
      "Rachida est une assistante conversationnelle pour boutiques en ligne. Elle se branche sur le site d'un commerçant, lit son catalogue et répond aux visiteurs : recherche de produits, questions sur les prix, accompagnement jusqu'à la commande. Elle s'appuie sur le modèle Gemini de Google, avec une clé gardée côté serveur.\n\nLe commerçant dispose d'un tableau de bord avec plusieurs modules : conversations et fiches clients, fidélité, marketing et publications programmées, paiements, suivi des installations sur son site et import intelligent des produits depuis un site existant. Le code prévoit aussi une connexion WhatsApp, un rapport quotidien automatique, un score de prospect et la détection de la langue (français, avec des repères pour le mooré et le dioula).\n\nLes données sont séparées par boutique grâce aux règles de sécurité de la base Supabase, et les points d'accès publics sont limités. Le projet a été rendu indépendant de la plateforme de création initiale : l'IA est appelée directement via Google, sans intermédiaire.",
    features: [
      "Chat de vente intégrable sur le site d'une boutique",
      "Recherche de produits dans le catalogue et conseils personnalisés",
      "Score de prospect et mémoire des préférences du client",
      "Connexion WhatsApp et rapport quotidien automatique",
      "Import intelligent des produits depuis un site existant",
      "Programme de fidélité, codes promo et parrainage",
      "Campagnes et publications programmées",
      "Analyse d'images envoyées par les clients",
      "Tableau de bord par boutique avec suivi des installations",
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Supabase', 'Google Gemini', 'Vercel AI SDK'],
    tags: ['IA', 'SaaS', 'WhatsApp', 'E-commerce'],
  },
  {
    title: 'Ma Volaille',
    kind: 'saas',
    status: '',
    sector: 'Élevage',
    description: "Application de gestion d'élevage (volailles et autres espèces) : lots, bâtiments, santé, alimentation, ventes, finances et assistant IA capable d'enregistrer les données.",
    long_desc:
      "Ma Volaille aide un éleveur à suivre son exploitation au quotidien. Il crée ses bâtiments et ses lots d'animaux, enregistre l'alimentation, les soins, les pesées et la mortalité, suit ses stocks d'aliments et de médicaments, ses équipements, ses fournisseurs, ses clients et ses ventes, et consulte un tableau de bord et des analyses financières.\n\nUn assistant conversationnel, basé sur un modèle Groq, comprend des demandes en langage courant (par exemple créer un lot, noter des pertes ou enregistrer une vente) et exécute les actions correspondantes après confirmation. L'application affiche aussi la météo locale, génère des documents PDF et fonctionne comme une application web installable avec mise en cache des données.\n\nLa base de données (Neon / PostgreSQL) prévoit de nombreuses tables : lots, races, maladies, médicaments, environnement, qualité, commandes. Un plan d'évolution détaille plus de soixante fonctionnalités d'intelligence artificielle envisagées (capteurs, prédictions, etc.) : ce sont des objectifs, pas des fonctions déjà livrées.",
    features: [
      "Gestion des lots d'animaux et des bâtiments",
      "Suivi de l'alimentation, de la santé, de la mortalité et de la croissance",
      "Stocks d'aliments et de médicaments avec alertes",
      "Clients, fournisseurs, commandes et ventes",
      "Finances : dépenses, revenus et analyses",
      "Tâches, notifications et équipements",
      "Assistant IA qui exécute des actions après confirmation",
      "Météo locale et export PDF",
      "Application installable avec cache des données",
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Neon (PostgreSQL)', 'Groq', 'Vercel AI SDK', 'PWA'],
    tags: ['Élevage', 'IA', 'Gestion', 'Agritech'],
  },
  {
    title: 'Drive Forward',
    kind: 'saas',
    status: 'prototype',
    sector: 'Auto-écoles',
    description: "Interface complète d'une plateforme multi-auto-écoles (élèves, moniteurs, examens, planning, véhicules, paiements), réalisée avec des données de démonstration.",
    long_desc:
      "Drive Forward est la conception complète de l'interface d'une plateforme destinée aux auto-écoles. Elle est pensée en multi-établissements : chaque auto-école aurait ses propres élèves, moniteurs et données, avec un espace de super-administration pour l'ensemble de la plateforme.\n\nLes écrans couvrent le quotidien d'une auto-école : dossier de chaque élève, groupes de formation, moniteurs, cours théoriques, banque de questions, devoirs et examens avec chronomètre, séances de conduite, planning, véhicules, documents, paiements, messagerie, notifications et un espace élève adapté au mobile.\n\nÀ ce stade, il s'agit d'un front-end : les données sont des données de démonstration et il n'y a pas encore de serveur ni de vrai paiement. Le code est organisé en services séparés pour pouvoir brancher ensuite une vraie base de données.",
    features: [
      "Tableaux de bord administrateur, moniteur et élève",
      "Dossier numérique de l'élève et groupes de formation",
      "Cours, banque de questions, devoirs et examens chronométrés",
      "Séances de conduite, planning jour / semaine / mois",
      "Véhicules, documents et présences",
      "Paiements (interface avec données de démonstration)",
      "Messagerie et centre de notifications",
      "Espace super-administrateur multi-auto-écoles",
    ],
    stack: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'shadcn/ui', 'Zod'],
    tags: ['SaaS', 'Auto-écoles', 'Prototype'],
  },
  {
    title: 'PermisUP',
    kind: 'personnel',
    status: 'prototype',
    sector: 'Éducation',
    description: "Plateforme d'apprentissage du code de la route en Afrique de l'Ouest : cours, panneaux, simulateur 3D, annuaire d'auto-écoles et assistant IA.",
    long_desc:
      "PermisUP aide les candidats au permis à préparer le code de la route. Les cours sont organisés en modules adaptés à l'Afrique de l'Ouest, avec des situations concrètes tirées du contexte local (circulation à Ouagadougou, routes nationales, marchés) et des quiz.\n\nLa plateforme comprend une galerie de panneaux de signalisation, un simulateur de conduite en 3D, un visualiseur de véhicule à 360 degrés, un annuaire d'auto-écoles, un espace blog et communauté, un parcours d'inscription en plusieurs étapes, un tableau de bord utilisateur et un tableau de bord administrateur. Un assistant conversationnel basé sur Gemini répond aux questions des apprenants.\n\nL'application est un prototype : le contenu est embarqué dans le code et il n'y a pas de base de données connectée.",
    features: [
      "Cours du code de la route en modules, avec quiz",
      "Galerie de panneaux de signalisation",
      "Simulateur de conduite en 3D",
      "Annuaire d'auto-écoles",
      "Parcours d'inscription en plusieurs étapes",
      "Tableaux de bord utilisateur et administrateur",
      "Assistant IA pour les questions des apprenants",
      "Interface multilingue",
    ],
    stack: ['React', 'TypeScript', 'Three.js', 'Vite', 'Google Gemini'],
    tags: ['Éducation', '3D', 'IA'],
  },
  {
    title: 'Electro Market BF (boutique en ligne)',
    kind: '',
    status: '',
    sector: 'E-commerce',
    description: "Boutique en ligne d'équipement électronique avec paiement Mobile Money, programme d'affiliation, demandes d'import sur mesure, administration et assistante IA.",
    long_desc:
      "Cette boutique vend des smartphones, ordinateurs et accessoires au Burkina Faso, avec livraison à Bobo-Dioulasso, Ouagadougou et dans d'autres villes. Les clients parcourent le catalogue, ajoutent des produits au panier et règlent avec Orange Money, Moov Money ou Wave.\n\nLe site propose un programme d'affiliation : chaque affilié obtient un code et un espace avec ses liens, ses clics, ses ventes, ses gains et une demande de retrait. Une page de demande permet de commander un produit absent du catalogue, importé à la demande. Une administration permet de gérer les produits, les promotions et les commandes, avec un assistant IA qui exécute des actions pour le gérant. Une assistante d'achat, Rachida, guide aussi les clients et peut prendre une commande.\n\nLe site est une application web installable, avec des fonctions serveur sur Vercel et une base Firebase. Les pages légales (conditions de vente, livraison, confidentialité) sont rédigées.",
    features: [
      "Catalogue produits avec panier",
      "Paiement Orange Money, Moov Money et Wave",
      "Programme d'affiliation avec espace affilié et demandes de retrait",
      "Demande de produit sur mesure (import)",
      "Administration : produits, promotions, commandes",
      "Assistant IA pour l'administration",
      "Assistante d'achat pour les clients",
      "Application installable avec notifications",
    ],
    stack: ['HTML / CSS / JavaScript', 'Firebase Realtime Database', 'Vercel Edge Functions', 'Groq', 'PWA'],
    tags: ['E-commerce', 'Mobile Money', 'Affiliation'],
  },
  {
    title: 'Amine Digital Produits (première plateforme)',
    kind: 'interne',
    status: '',
    sector: 'Produits numériques',
    description: "Première plateforme d'AMINE DIGITAL pour vendre des formations, ebooks et outils numériques, avec validation manuelle des paiements et assistante IA.",
    long_desc:
      "Avant le site de services actuel, AMINE DIGITAL disposait d'une plateforme de vente de produits numériques : formations vidéo, ebooks, livres audio, podcasts, modèles et logiciels. Le client choisit un produit, règle par Mobile Money, carte ou PayPal, puis envoie sa capture de paiement.\n\nAprès validation du paiement dans l'administration, le lien de téléchargement apparaît directement sur la page du client. La plateforme comprend un espace d'administration, un programme d'affiliation, des notifications push (OneSignal) et l'assistante IA Rachida pour répondre aux visiteurs.\n\nCe projet est un outil interne d'AMINE DIGITAL, aujourd'hui remplacé par le site de services.",
    features: [
      "Catalogue de produits numériques par catégories",
      "Paiement Mobile Money, carte et PayPal avec validation manuelle",
      "Lien de téléchargement débloqué après validation",
      "Administration des produits et des paiements",
      "Programme d'affiliation",
      "Notifications push",
      "Assistante IA pour les visiteurs",
    ],
    stack: ['HTML / CSS / JavaScript', 'Firebase', 'Vercel Edge Functions', 'OneSignal'],
    tags: ['Interne', 'E-commerce', 'Formations'],
  },
  {
    title: 'DomainCompare Afrique',
    kind: 'personnel',
    status: 'prototype',
    sector: 'Hébergement web',
    description: "Comparateur de noms de domaine et d'hébergeurs pour l'Afrique francophone, financé par l'affiliation, avec scan de performance par pays.",
    long_desc:
      "DomainCompare Afrique vise à aider les entrepreneurs d'Afrique francophone (Burkina Faso, Côte d'Ivoire, Sénégal) à choisir un nom de domaine et un hébergeur. Le modèle prévu est 100 % affiliation, avec une page de statistiques de transparence.\n\nLe dépôt contient quatre écrans convertis en composants React : accueil et recherche, comparateur, scan de performance par pays, statistiques et transparence. Les maquettes d'origine, conçues avec Google Stitch, sont conservées en référence.\n\nLe projet est au stade de prototype : le suivi des clics d'affiliation et l'historique des prix sont prévus mais pas encore branchés à une base de données.",
    features: [
      "Recherche de nom de domaine",
      "Comparateur de prix entre extensions et hébergeurs",
      "Scan de performance par pays",
      "Page de statistiques et transparence",
      "Maquettes de référence conservées",
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    tags: ['Comparateur', 'Affiliation', 'Prototype'],
    image: `${RAW}/good-domain/main/mockups/statistiques-transparence-screenshot.png`,
  },
  {
    title: 'Compare Tout',
    kind: 'personnel',
    status: '',
    sector: 'Outils IA',
    description: "Comparateur universel : on envoie deux produits ou plus (photos ou noms) et l'IA produit une comparaison détaillée avec les prix en FCFA.",
    long_desc:
      "Compare Tout permet de comparer n'importe quels objets ou produits. L'utilisateur fournit au moins deux éléments, sous forme de photos ou de noms, et choisit le type de comparaison, la langue et la devise (FCFA par défaut). Un serveur appelle le modèle Gemini de Google, avec la clé gardée côté serveur, et renvoie une comparaison structurée.\n\nLes résultats sont présentés avec des graphiques, et l'interface propose un mode clair et sombre ainsi que des éléments de comparaison prédéfinis.",
    features: [
      "Comparaison à partir de photos ou de noms",
      "Choix de la langue et de la devise",
      "Résultats structurés avec graphiques",
      "Mode clair et sombre",
      "Éléments de comparaison prédéfinis",
    ],
    stack: ['React', 'TypeScript', 'Express', 'Google Gemini', 'Recharts'],
    tags: ['IA', 'Comparateur'],
  },
  {
    title: 'Livre Magique',
    kind: 'personnel',
    status: '',
    sector: 'Éducation',
    description: "Générateur d'histoires illustrées pour enfants : l'IA écrit l'histoire, illustre les pages et propose un quiz et un compagnon de lecture.",
    long_desc:
      "Livre Magique crée des livres d'histoires pour enfants. À partir d'une idée, l'IA génère le récit page par page, les illustrations, un quiz de compréhension et un compagnon de discussion. Les histoires sont enregistrées dans une bibliothèque, les images peuvent être régénérées et les textes modifiés.\n\nLe projet utilise Gemini côté serveur pour le texte, les images et la voix, et propose une interface multilingue.",
    features: [
      "Génération d'histoires illustrées page par page",
      "Quiz de compréhension après la lecture",
      "Compagnon de discussion autour de l'histoire",
      "Bibliothèque d'histoires, modification et régénération des images",
      "Interface multilingue",
    ],
    stack: ['React', 'TypeScript', 'Express', 'Google Gemini'],
    tags: ['IA', 'Éducation', 'Enfants'],
  },
  {
    title: 'Math Companion Pro',
    kind: 'personnel',
    status: 'en_ligne',
    sector: 'Éducation',
    description: "Calculatrice tout-en-un à trois modes (simple, scientifique, graphique et calcul symbolique), dans une application web installable.",
    long_desc:
      "Math Companion Pro est une application de calcul complète dans une seule page web. Elle propose un mode simple, un mode scientifique (trigonométrie, logarithmes, puissances, mémoire) et un mode graphique avec tracé de fonctions et calcul symbolique, ainsi que des outils de statistiques, de matrices et de conversion.\n\nL'application fonctionne sur téléphone comme sur ordinateur, peut s'installer comme une application et utilise un thème sombre.",
    features: [
      "Calculatrice simple avec historique",
      "Mode scientifique : trigonométrie, logarithmes, puissances, mémoire",
      "Tracé de fonctions et calcul symbolique",
      "Statistiques, matrices et conversions",
      "Application installable sur téléphone",
    ],
    stack: ['HTML / CSS / JavaScript', 'PWA'],
    tags: ['Outil', 'Éducation'],
  },
  {
    title: 'Jarvis, assistant vocal',
    kind: 'personnel',
    status: '',
    sector: 'Assistant personnel',
    description: "Assistant vocal en français qui tourne sur son propre ordinateur : il comprend la voix, pilote le PC, l'agenda, la domotique et répond à voix haute.",
    long_desc:
      "Jarvis est un assistant vocal personnel pour Windows. On l'active avec un mot d'éveil, on lui parle naturellement, et il utilise un modèle de langage et une boîte à outils extensible pour agir : contrôle du PC, agenda Google, e-mails, domotique, streaming (OBS), réservations web, vision de l'écran, etc. Deux modes existent : cloud (modèle Claude et synthèse vocale ElevenLabs) ou entièrement local hors ligne (Ollama et Piper).\n\nLe projet est publié en open source sous licence MIT. La transcription se fait en local avec Whisper et la plupart des intégrations sont optionnelles.",
    features: [
      "Mot d'éveil et transcription vocale locale",
      "Réponses parlées en français",
      "Contrôle du PC et des applications",
      "Agenda Google, e-mails, Discord",
      "Domotique et scènes d'ambiance",
      "Vision de l'écran",
      "Mode cloud ou mode local hors ligne",
    ],
    stack: ['Python', 'Whisper', 'Ollama', 'Claude', 'ElevenLabs'],
    tags: ['IA', 'Voix', 'Open source'],
  },
]
