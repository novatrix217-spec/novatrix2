// Publie les premiers vrais articles du blog NovatrixAI dans MongoDB.
// Contenu original, sans statistique ni citation client inventée.
// Usage : node scripts/seed-articles.mjs   (depuis le dossier novatrix/)

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import dns from 'node:dns'
import mongoose from 'mongoose'

dns.setServers(['1.1.1.1', '8.8.8.8'])

const __dirname = dirname(fileURLToPath(import.meta.url))
function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, '../.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim()
    }
  } catch {}
}
loadEnv()

const uri = process.env.MONGODB_URI || process.env.NUXT_MONGO_URL
if (!uri) { console.error('Aucune URI MongoDB trouvée.'); process.exit(1) }

function slugifyFr(value) {
  return value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90)
}
function readingTime(body) {
  return Math.max(1, Math.ceil(body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220))
}

const { Schema } = mongoose
const ArticleSchema = new Schema({
  title: String, slug: { type: String, unique: true, index: true }, excerpt: String, body: String,
  coverImageKey: String, category: String, tags: [String], readingTime: Number,
  seo: { metaTitle: String, metaDescription: String, ogImage: String, canonical: String },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  source: { type: String, enum: ['manual', 'automation'], default: 'manual' }, publishedAt: Date,
}, { timestamps: true })
const ArticleModel = mongoose.models.Article || mongoose.model('Article', ArticleSchema)

const articles = [
  {
    title: 'Le diagnostic en 5 points pour repérer où votre acquisition fuit',
    category: 'Acquisition',
    tags: ['CRM', 'Automatisation', 'Diagnostic'],
    excerpt: "Une campagne qui tourne ne garantit rien. Voici les cinq points de rupture les plus fréquents entre le premier clic et la vente signée — et comment les repérer avant qu'ils ne vous coûtent des clients.",
    body: `## Le problème n'est presque jamais la campagne

Une entreprise qui perd des clients ne le voit pas toujours d'où ça vient. Le réflexe est de blâmer la publicité : mauvais ciblage, créatif fatigué, budget insuffisant. Dans la majorité des cas, le vrai problème est ailleurs — entre deux outils qui ne se parlent pas.

Voici les cinq endroits où une chaîne d'acquisition se casse le plus souvent.

## 1. Le décalage entre la promesse de l'annonce et la page de destination

Un clic sur une publicité crée une attente précise. Si la page d'atterrissage ne répond pas à cette attente en quelques secondes, le visiteur repart. Vérifiez : le titre de votre page reprend-il la même promesse que l'annonce ? La preuve sociale est-elle visible sans défiler ?

## 2. Le formulaire qui décourage plus qu'il ne qualifie

Chaque champ supplémentaire réduit le taux de complétion. Un formulaire à dix champs pour capter un simple lead filtre surtout les visiteurs pressés — souvent les plus qualifiés. Demandez le minimum pour amorcer la conversation ; le reste se qualifie à l'appel.

## 3. Le lead qui arrive dans une boîte mail, pas dans un système

Si un lead atterrit dans une boîte mail partagée avant d'être saisi manuellement dans le CRM, deux choses se produisent : le délai de réponse grimpe, et une partie des leads se perd purement et simplement. Le lead doit entrer directement dans le CRM, avec la source et le contexte attachés.

## 4. La relance qui n'existe pas, ou qui arrive trop tard

La majorité des ventes ne se concluent pas au premier contact. Sans séquence de relance automatique — email, SMS, WhatsApp selon le canal où le prospect est le plus réactif — chaque lead non converti immédiatement est un lead perdu en silence.

## 5. Aucune donnée pour savoir ce qui marche vraiment

Sans suivi de bout en bout — de la source du clic jusqu'au contrat signé — impossible de savoir quelle campagne rapporte réellement des clients, et laquelle ne rapporte que des clics. Beaucoup d'entreprises optimisent sur le coût par lead alors que la seule mesure qui compte est le coût par client.

## Comment le vérifier chez vous

Prenez un lead réel, entré la semaine dernière, et suivez-le à la main : du clic jusqu'à la décision finale. Chaque ressaisie manuelle, chaque silence de plus de 24 heures, chaque étape où personne ne sait qui est responsable — c'est un maillon à reconstruire.

Un système d'acquisition qui tient relie ces cinq points en une seule chaîne, pas en cinq outils séparés.`,
  },
  {
    title: "Trois niveaux d'autonomie pour vos agents IA — et où mettre le curseur",
    category: 'Pilotage IA',
    tags: ['Agents IA', 'Gouvernance', 'Automatisation'],
    excerpt: "Un agent IA n'est pas tout ou rien. Le vrai choix n'est pas « faut-il automatiser », mais « jusqu'où ». Voici un cadre à trois niveaux pour décider, domaine par domaine, où l'IA agit seule et où l'humain garde la main.",
    body: `## L'autonomie n'est pas un interrupteur

Beaucoup d'entreprises abordent les agents IA avec une question binaire : on automatise, ou on n'automatise pas. C'est la mauvaise question. La bonne question est : à quel niveau d'autonomie cet agent doit-il opérer, pour cette tâche précise ?

Trois niveaux suffisent pour couvrir la quasi-totalité des cas.

## Niveau 1 — Observation

L'agent surveille, résume et alerte. Il ne prend aucune action. C'est le niveau adapté à tout ce qui touche à l'analyse : détecter une anomalie dans un tableau de bord, résumer les échanges d'une boîte mail, signaler un client qui n'a pas répondu depuis dix jours. Le risque d'erreur est nul, puisque rien n'est exécuté.

## Niveau 2 — Proposition

L'agent prépare une action et la soumet à validation avant exécution. Un brouillon de réponse client, un projet de facture, une relance rédigée mais pas envoyée. L'humain garde la décision finale, mais gagne le temps de rédaction et de préparation — souvent la partie la plus longue de la tâche.

## Niveau 3 — Exécution autonome

L'agent agit seul, sans validation préalable, dans un périmètre strictement défini. C'est le niveau adapté aux tâches répétitives à faible enjeu et à règles claires : confirmer un rendez-vous, envoyer un accusé de réception, mettre à jour un statut dans le CRM après une action connue.

## Où poser la limite

La règle est simple : plus une erreur coûte cher ou est difficile à corriger, plus on descend d'un niveau. Sur le juridique, le fiscal et le financier, le niveau 3 est à éviter par défaut — un agent peut préparer un contrat ou une déclaration, jamais les valider seul. Sur les réseaux sociaux et le service client de premier niveau, le niveau 3 est souvent le bon choix, à condition de prévoir une porte de sortie claire vers un humain dès que la situation sort du cadre prévu.

## Un système, pas une bascule unique

Le bon pilotage IA ne met pas tous les domaines au même niveau. Le reporting peut tourner en niveau 3, la rédaction de contrats en niveau 2, la stratégie financière en niveau 1. Le curseur se règle domaine par domaine, avec le client, avant le premier déploiement — pas après le premier incident.`,
  },
  {
    title: "Pourquoi WhatsApp est le bon canal pour un agent IA en Afrique francophone",
    category: 'Pilotage IA',
    tags: ['WhatsApp', 'Agents IA', 'Afrique'],
    excerpt: "Aux États-Unis, un agent IA se pilote depuis Slack ou un dashboard. En Afrique de l'Ouest francophone, c'est WhatsApp. Ce choix n'est pas un compromis technique — c'est le bon point de départ.",
    body: `## Le canal détermine l'adoption

Un agent IA techniquement excellent mais installé sur un canal que personne n'ouvre reste inutilisé. La question du canal n'est donc pas secondaire : elle décide si l'outil sera réellement utilisé au quotidien.

En Afrique de l'Ouest francophone, ce canal existe déjà, et tout le monde l'a déjà ouvert aujourd'hui : WhatsApp.

## Ce que ça change concrètement

Piloter un agent IA depuis WhatsApp plutôt que depuis un dashboard change plusieurs choses à la fois :

- Pas de nouvel outil à apprendre. Le dirigeant, l'assistant ou le commercial utilise déjà l'application. Zéro friction d'onboarding.
- Pas de connexion à maintenir. Un dashboard oublié dans un onglet ne sert à rien. Un message WhatsApp arrive là où l'attention est déjà.
- Une commande en langage naturel, pas un formulaire. « Envoie-moi le résumé des ventes de la semaine » remplace un menu à trois niveaux de clics.
- Un canal qui fonctionne aussi bien en 3G qu'en fibre. L'infrastructure réseau varie fortement selon les zones ; WhatsApp reste utilisable là où une application web plus lourde peinerait.

## Les cas d'usage qui en profitent le plus

Le pilotage par WhatsApp est particulièrement pertinent pour :

- la prise de rendez-vous et la gestion d'agenda,
- le reporting quotidien ou hebdomadaire envoyé sans qu'on ait à le demander,
- la qualification de leads entrants, avant transfert à un commercial,
- le support client de premier niveau, sur les questions qui reviennent chaque semaine.

## Une limite à connaître

WhatsApp n'est pas adapté à tout. Une analyse complexe avec plusieurs tableaux, un historique long à consulter, une configuration technique détaillée — ces usages restent mieux servis par une interface dédiée. Le bon système combine les deux : WhatsApp pour l'usage quotidien et les commandes rapides, un espace web pour ce qui demande plus d'espace visuel.

## Le vrai enjeu n'est pas la technologie

L'API WhatsApp Business, les modèles de langage capables de comprendre une commande en français familier, l'intégration aux outils métier existants — tout cela est aujourd'hui accessible. Le vrai travail est ailleurs : cartographier les commandes réellement utiles à un dirigeant précis, et construire l'agent autour de son usage réel, pas autour d'une liste de fonctionnalités génériques.`,
  },
  {
    title: 'Cinq questions à trancher avant de cadrer une application métier',
    category: 'Web & applications',
    tags: ['Application', 'Cadrage', 'Produit'],
    excerpt: "La majorité des applications métier abandonnées après un an ne l'ont pas été à cause du code, mais du cadrage initial. Cinq questions permettent d'éviter l'essentiel des erreurs, avant la première ligne de développement.",
    body: `## Le code n'est presque jamais le problème

Une application métier mal cadrée finit presque toujours de la même façon : trop de fonctionnalités secondaires, pas assez de profondeur sur le cœur du besoin, et une équipe qui finit par revenir à son ancien tableur au bout de quelques mois.

Voici les cinq questions qui évitent ce scénario, à trancher avant de développer quoi que ce soit.

## 1. Quelle décision cette application doit-elle permettre de prendre plus vite ?

Une application n'existe pas pour stocker de la donnée, mais pour permettre une décision : accorder un crédit, valider une commande, prioriser une intervention. Si la décision visée n'est pas claire, l'application dérive vers un simple outil de saisie.

## 2. Qui l'utilise vraiment, tous les jours ?

Pas « qui pourrait s'en servir un jour », mais qui l'ouvrira chaque matin. Concevoir pour cet utilisateur précis — son niveau technique, son contexte, ses contraintes de terrain — vaut mieux que concevoir pour un profil moyen qui n'existe pas.

## 3. Quelle boucle complète faut-il livrer en premier ?

Une première version ne doit pas couvrir toutes les fonctionnalités à moitié : elle doit couvrir une seule boucle métier entièrement, du déclencheur jusqu'au résultat. Une gestion de stock qui ne gère que l'entrée sans la sortie n'est pas une version incomplète, c'est un outil qui ne sert à rien.

## 4. Avec quoi ça doit déjà parler ?

Une application qui vit isolée de la comptabilité, du CRM ou de l'outil de facturation recrée exactement le problème qu'elle devait résoudre : de la ressaisie manuelle et des données qui divergent. Les intégrations nécessaires se décident au cadrage, pas en fin de projet.

## 5. Qui la fait évoluer dans six mois ?

Un besoin métier change. Une application non documentée, construite sans architecture claire, devient un poids dès que quelqu'un d'autre que son créateur doit y toucher. La question n'est pas seulement « est-ce que ça marche aujourd'hui », mais « est-ce que ça se répare et s'étend facilement dans six mois ».

## Le bon cadrage tient sur une page

Un cadrage qui répond clairement à ces cinq questions tient rarement plus d'une page. C'est un bon signe : la clarté du cadrage se voit à sa capacité à être expliqué simplement, pas à son épaisseur.`,
  },
  {
    title: 'Le référencement pour les IA : ce qui compte quand ChatGPT répond à votre place',
    category: 'Stratégie',
    tags: ['SEO', 'IA', 'Référencement'],
    excerpt: "Une partie croissante des recherches ne passe plus par une liste de liens bleus, mais par une réponse générée directement. Ce que ça change pour un site qui veut être trouvé — et cité — par les moteurs conversationnels.",
    body: `## Une recherche sur deux ne clique plus

Quand un utilisateur pose une question à ChatGPT, Perplexity ou à l'IA intégrée à un moteur de recherche, il obtient une réponse directement — parfois sans jamais visiter un site. Pour être présent dans cette réponse, un site doit être compris différemment de la façon dont Google le comprenait il y a dix ans.

Voici ce qui compte réellement.

## Le contenu doit être lisible sans JavaScript

Les modèles de langage qui alimentent ces réponses lisent le contenu brut envoyé par le serveur, pas ce qui apparaît après exécution du JavaScript dans un navigateur. Un site dont le contenu principal n'existe que côté client — chargé après coup par une application — est souvent invisible ou mal compris par ces systèmes. Le rendu serveur (SSR) n'est plus seulement une question de vitesse : c'est une condition d'existence.

## Les données structurées valent une explication écrite

Les balises JSON-LD — Organization, FAQPage, Article, Product — donnent aux modèles une version explicite et non ambiguë de l'information : qui vous êtes, ce que vous proposez, quelles questions vous répondez. Un modèle de langage préfère toujours une donnée structurée à une déduction faite depuis du texte libre. C'est la différence entre « probablement une agence » et « Organization, localisée à Cotonou, proposant trois services nommés ».

## La cohérence compte plus que le volume

Un modèle qui trouve deux versions différentes d'un même prix ou d'un même chiffre sur un site ne choisit pas au hasard : il devient prudent, ou cite l'information la moins engageante. Un site avec dix pages cohérentes vaut mieux qu'un site avec cent pages qui se contredisent entre elles.

## Le contenu vérifiable prime sur le contenu qui se vante

Les modèles sont entraînés à repérer le ton promotionnel et à le pondérer différemment du contenu factuel. Un article qui explique un raisonnement, une méthode ou un choix technique a plus de chances d'être cité qu'une page qui empile des superlatifs sans les justifier.

## Un nouveau fichier à connaître : llms.txt

Une convention émergente propose qu'un site expose, à la racine, un fichier llms.txt : un résumé textuel, structuré et à jour, pensé pour être lu directement par un modèle de langage plutôt que déduit d'une page HTML complète. Ce n'est pas un remplacement du reste — c'est un point d'entrée supplémentaire, complémentaire au SEO classique.

## Ce qui ne change pas

Le référencement pour les IA n'annule pas le référencement classique : les deux s'appuient sur les mêmes fondations — un contenu clair, une structure logique, une information exacte. La différence est que ces fondations comptent désormais pour deux publics à la fois : les visiteurs humains, et les systèmes qui répondent à leur place.`,
  },
]

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log('Connecté à MongoDB.')
  let created = 0, skipped = 0
  const now = Date.now()
  for (const [i, a] of articles.entries()) {
    const slug = slugifyFr(a.title)
    const publishedAt = new Date(now - (articles.length - i) * 86400000)
    const res = await ArticleModel.updateOne(
      { slug },
      { $setOnInsert: {
        ...a, slug, readingTime: readingTime(a.body), status: 'published', source: 'manual', publishedAt,
        seo: { metaTitle: a.title.slice(0, 70), metaDescription: a.excerpt.slice(0, 170) },
      } },
      { upsert: true },
    )
    if (res.upsertedCount) created++; else skipped++
  }
  console.log(`Articles : ${created} créés, ${skipped} déjà présents.`)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })
