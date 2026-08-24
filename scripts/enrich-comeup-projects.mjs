// Enrichit les réalisations déjà en base (voir scripts/seed-comeup.mjs) avec les descriptions
// solutions factuelles paraphrasées uniquement à partir des descriptions de projets conservées
// dans les sources locales du dépôt. Aucun défi, témoignage ou résultat chiffré n’est injecté.
// Ne touche jamais un champ déjà rempli (pas d’écrasement d’une édition faite depuis /admin).
// Le mode par défaut est une simulation en lecture seule. Avant toute application, exporter/sauvegarder
// la collection projects ; le rollback consiste à restaurer cet export.
//
// Simulation : node scripts/enrich-comeup-projects.mjs
// Application : node scripts/enrich-comeup-projects.mjs --apply --confirm=<nom_base>
// MONGODB_URI ou NUXT_MONGO_URL doit être fourni par l’environnement d’exécution.

import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI || process.env.NUXT_MONGO_URL
if (!uri) { console.error('Aucune URI MongoDB trouvée.'); process.exit(1) }
const applyChanges = process.argv.includes('--apply')
const confirmation = process.argv.find(arg => arg.startsWith('--confirm='))?.slice('--confirm='.length)

function sanitizedTarget(mongoUri) {
  try {
    const parsed = new URL(mongoUri)
    const database = decodeURIComponent(parsed.pathname.replace(/^\//, '').split('/')[0] || '')
    return { host: parsed.host, database }
  } catch {
    return { host: '(URI invalide)', database: '' }
  }
}

const target = sanitizedTarget(uri)
if (!target.database) {
  console.error('La base cible doit être explicitement présente dans l’URI MongoDB.')
  process.exit(1)
}
if (applyChanges && confirmation !== target.database) {
  console.error(`Application refusée : utilisez --apply --confirm=${target.database} pour confirmer la base cible.`)
  process.exit(1)
}

const { Schema } = mongoose
const ProjectModel = mongoose.models.Project || mongoose.model('Project', new Schema({}, { strict: false }))

const enrichments = {
  'site-vitrine-agence-wingoai': {
    solution: 'Un site vitrine a été réalisé pour présenter l’agence WingoAI et ses services.',
    solutionEn: 'A showcase website was built to present WingoAI and its services.',
  },
  'jeefox-moteur-de-recherche-intelligent': {
    solution: 'On a construit le moteur de recherche et les applications qui l’entourent : interface de recherche, plateforme publicitaire et back-office d’administration.',
    solutionEn: 'We built the search engine and the applications around it: search interface, ad platform and admin back-office.',
  },
  'mesmarches-fr-site-annonces-evenements': {
    solution: 'On a développé mesmarches.fr, une plateforme d’annonces qui réunit organisateurs et exposants autour des événements.',
    solutionEn: 'We built mesmarches.fr, a listings platform bringing together organizers and exhibitors around events.',
  },
  'comparateur-mutuelles-senior': {
    solution: 'On a développé un comparateur en ligne qui évalue et classe les offres de mutuelle santé senior selon le profil de l’utilisateur.',
    solutionEn: 'We built an online comparison tool that evaluates and ranks senior health insurance offers based on the user’s profile.',
  },
  'proranker-classement-candidatures-nlp': {
    solution: 'ProRanker analyse et classe les CV et candidatures avec le NLP et un LLM.',
    solutionEn: 'ProRanker analyzes and ranks CVs and applications using NLP and an LLM.',
  },
  'automatisation-crm-agent-ia-n8n': {
    solution: 'Un agent IA branché sur n8n met à jour le CRM et déclenche les actions de suivi sans intervention manuelle.',
    solutionEn: 'An AI agent wired into n8n updates the CRM and triggers follow-up actions without manual work.',
  },
  'creation-contenu-ia-n8n-gpt': {
    solution: 'Une automatisation n8n connectée à GPT et plusieurs API génère images, vidéos et audio à la demande.',
    solutionEn: 'An n8n automation connected to GPT and several APIs generates images, videos and audio on demand.',
  },
  'envoi-automatique-document-a-signer': {
    solution: 'L’automatisation remplit les variables du contrat depuis un modèle prédéfini et l’envoie directement à la signature électronique.',
    solutionEn: 'The automation fills in the contract variables from a predefined template and sends it straight to e-signature.',
  },
  'automatisation-calendly': {
    solution: 'L’automatisation ajoute automatiquement le rendez-vous à l’agenda et invite les participants prévus, dès la prise de rendez-vous.',
    solutionEn: 'The automation automatically adds the appointment to the calendar and invites the expected attendees as soon as it’s booked.',
  },
  'creation-automatique-dossiers-drive': {
    solution: 'Dès la signature du contrat, l’automatisation crée et organise automatiquement le dossier Drive de l’employé.',
    solutionEn: 'As soon as the contract is signed, the automation creates and organizes the employee’s Drive folder automatically.',
  },
  'automatisation-stripe-mail': {
    solution: 'L’automatisation récupère les données de transaction Stripe et envoie l’historique par email, sans intervention.',
    solutionEn: 'The automation retrieves Stripe transaction data and sends the history by email, with no manual work.',
  },
  'automatisation-gmail-openai': {
    solution: 'L’automatisation connecte Gmail à l’API OpenAI pour rédiger et enrichir les réponses avant envoi.',
    solutionEn: 'The automation connects Gmail to the OpenAI API to draft and enrich replies before they’re sent.',
  },
  'detection-ouverture-mail-stats': {
    solution: 'L’automatisation détecte l’ouverture des emails et redirige les statistiques vers un tableau de suivi centralisé.',
    solutionEn: 'The automation detects email opens and routes the statistics to a centralized tracking dashboard.',
  },
  'solution-rh-automatisee': {
    solution: 'L’automatisation génère les contrats et les dossiers employés en un clic, de la signature à l’archivage.',
    solutionEn: 'The automation generates contracts and employee files in one click, from signature to archiving.',
  },
  'analyse-csv-ia-crm': {
    solution: 'L’automatisation analyse et traite les fichiers CSV avec l’IA avant de les intégrer automatiquement dans le CRM.',
    solutionEn: 'The automation analyzes and processes CSV files with AI before integrating them into the CRM automatically.',
  },
  'redaction-gestion-contrats': {
    solution: 'L’automatisation génère contrats et avenants à partir de plusieurs modèles, prêts à envoyer.',
    solutionEn: 'The automation generates contracts and amendments from several templates, ready to send.',
  },
  'publication-wordpress-ia': {
    solution: 'L’automatisation rédige et publie automatiquement du contenu généré par IA sur WordPress.',
    solutionEn: 'The automation writes and publishes AI-generated content on WordPress automatically.',
  },
  'chatbot-support-prise-rendez-vous': {
    solution: 'Un chatbot dédié au support et à la prise de rendez-vous a été réalisé.',
    solutionEn: 'A chatbot dedicated to support and appointment booking was built.',
  },
  'generation-automatique-facture': {
    solution: 'Les commandes arrivent dans une feuille de calcul et l’automatisation génère la facture personnalisée dans Google Docs.',
    solutionEn: 'Orders land in a spreadsheet and the automation generates the personalized invoice in Google Docs.',
  },
  'agent-ia-gestion-agenda': {
    solution: 'Un agent IA gère et optimise l’agenda de façon autonome, selon les priorités définies.',
    solutionEn: 'An AI agent manages and optimizes the calendar autonomously, based on defined priorities.',
  },
  'relance-paniers-abandonnes-shopify-twilio': {
    solution: 'L’automatisation détecte l’abandon de panier sur Shopify et relance le client par SMS via Twilio, sans intervention humaine.',
    solutionEn: 'The automation detects cart abandonment on Shopify and follows up with the client by SMS via Twilio, with no human involved.',
  },
  'publication-ecommerce-multicanal': {
    solution: 'L’automatisation publie les produits e-commerce simultanément sur les trois canaux, depuis une seule source.',
    solutionEn: 'The automation publishes e-commerce products simultaneously across all three channels, from a single source.',
  },
  'publication-contenu-multicanal-reseaux': {
    solution: 'Dès qu’une nouvelle vidéo est détectée, l’automatisation génère titres, hashtags et accroches, puis publie sur Facebook, X, LinkedIn, Instagram et YouTube.',
    solutionEn: 'As soon as a new video is detected, the automation generates titles, hashtags and hooks, then publishes on Facebook, X, LinkedIn, Instagram and YouTube.',
  },
  'automatisation-publication-tiktok': {
    solution: 'L’automatisation publie le contenu court directement depuis la base de données vers TikTok.',
    solutionEn: 'The automation publishes short-form content straight from the database to TikTok.',
  },
  'recuperation-donnees-instantly-crm': {
    solution: 'L’automatisation récupère les données de campagne Instantly et les intègre automatiquement dans le CRM.',
    solutionEn: 'The automation retrieves Instantly campaign data and integrates it into the CRM automatically.',
  },
  'gestion-appels-manques-sms-rappel': {
    solution: 'Le système détecte les appels manqués et envoie automatiquement un SMS de rappel personnalisé.',
    solutionEn: 'The system detects missed calls and automatically sends a personalized SMS callback.',
  },
  'automatisation-facebook-leads-systeme-io': {
    solution: 'L’automatisation récupère les leads Facebook, crée les contacts, applique les tags et les inscrit directement en campagne dans Systeme.io.',
    solutionEn: 'The automation retrieves Facebook leads, creates the contacts, applies tags and enrolls them straight into a Systeme.io campaign.',
  },
  'automatisation-trello-instantly-slack': {
    solution: 'L’automatisation centralise automatiquement les données clients issues de Trello et des emails, avec notification sur Slack.',
    solutionEn: 'The automation automatically centralizes client data from Trello and email, with notifications sent to Slack.',
  },
  'extraction-annonces-immobilieres-gpt': {
    solution: 'L’automatisation extrait et structure les annonces immobilières grâce à GPT, prêtes à être exploitées.',
    solutionEn: 'The automation extracts and structures real-estate listings using GPT, ready to use.',
  },
  'envoi-mails-avis-google-ia': {
    solution: 'L’automatisation envoie les emails et sollicite les avis Google grâce à l’IA, connectée à Airtable et Make.',
    solutionEn: 'The automation sends emails and requests Google reviews using AI, connected to Airtable and Make.',
  },
}

function isEmpty(v) {
  if (v === undefined || v === null) return true
  if (typeof v === 'string') return v.trim() === ''
  if (Array.isArray(v)) return v.length === 0
  return false
}

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log(`Cible MongoDB : hôte=${target.host}, base=${target.database}`)
  console.log(applyChanges ? 'Mode APPLICATION confirmé.' : 'Mode DRY-RUN : aucune écriture ne sera effectuée.')

  const entries = Object.entries(enrichments)
  const documents = await ProjectModel.find({ slug: { $in: entries.map(([slug]) => slug) } }).lean()
  const documentsBySlug = new Map(documents.map(document => [document.slug, document]))
  const operations = []
  let skippedNotFound = 0, skippedAlreadyFilled = 0

  for (const [slug, fields] of entries) {
    const doc = documentsBySlug.get(slug)
    if (!doc) { console.log(`— introuvable : ${slug}`); skippedNotFound++; continue }

    const toSet = {}
    for (const [key, value] of Object.entries(fields)) {
      if (isEmpty(doc[key])) toSet[key] = value
    }
    if (Object.keys(toSet).length === 0) { skippedAlreadyFilled++; continue }

    operations.push({ updateOne: { filter: { slug }, update: { $set: toSet } } })
    console.log(`${applyChanges ? 'À appliquer' : 'Prévu'} : ${slug} — champs : ${Object.keys(toSet).join(', ')}`)
  }

  if (applyChanges && operations.length > 0) {
    const result = await ProjectModel.bulkWrite(operations, { ordered: true })
    console.log(`Application effectuée en une opération groupée : ${result.modifiedCount} réalisations modifiées.`)
  } else if (!applyChanges) {
    console.log(`\nSimulation terminée : ${operations.length} réalisations à enrichir, aucune écriture.`)
  }
  console.log(`${skippedAlreadyFilled} déjà complètes, ${skippedNotFound} introuvables.`)
}

run()
  .catch(error => {
    const message = error instanceof Error ? error.message.replaceAll(uri, '[URI masquée]') : 'Erreur MongoDB non détaillée.'
    console.error(`Échec : ${message}`)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())
