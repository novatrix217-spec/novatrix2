// Importe dans MongoDB les réalisations et avis réels de NovatrixAI extraits de ComeUp
// (comeup_extraction_finale.json). Aucune donnée n'est inventée : les projets sans détail
// connu (résultats chiffrés, citations client) restent volontairement vides — à compléter
// depuis /admin/realisations une fois les informations réunies.
//
// Usage : node scripts/seed-comeup.mjs   (depuis le dossier novatrix/)

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import dns from 'node:dns'
import mongoose from 'mongoose'

// L'environnement local résout le DNS via 127.0.0.1, qui ne répond pas aux requêtes SRV
// (nécessaires pour mongodb+srv://). On bascule sur des résolveurs publics pour ce script.
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
if (!uri) { console.error('Aucune URI MongoDB trouvée (MONGODB_URI ou NUXT_MONGO_URL).'); process.exit(1) }

const { Schema } = mongoose
const MetricSchema = new Schema({ value: String, label: String }, { _id: false })
const QuoteSchema = new Schema({ text: String, author: String }, { _id: false })
const ProjectSchema = new Schema({
  title: String, slug: { type: String, unique: true, index: true }, category: String, summary: String,
  challenge: String, solution: String, features: [String], quoteBefore: QuoteSchema, quoteAfter: QuoteSchema,
  resultsMetrics: [MetricSchema], tools: [String], deliveryDays: Number, coverImageKey: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' }, featured: Boolean, sortOrder: Number,
  source: { type: String, enum: ['comeup', 'manual'], default: 'manual' },
}, { timestamps: true })
const TestimonialSchema = new Schema({
  name: String, role: String, text: String, rating: Number,
  status: { type: String, enum: ['pending', 'published', 'rejected'], default: 'pending' },
  source: { type: String, enum: ['comeup', 'site'], default: 'site' }, reviewDate: Date, sortOrder: Number,
}, { timestamps: true })
const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema)
const TestimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)

// --- Réalisations réelles (titres ComeUp), catégorisées par fonction. Champs narratifs
// (challenge/solution/citations/métriques) laissés vides : pas de donnée source fiable.
// Slugs fixés explicitement (identiques à shared/demo.ts) plutôt qu'auto-générés depuis
// le titre, pour que les URLs restent stables même si les titres sont reformulés ensuite.
const projects = [
  // Web & applications
  { title: 'Site vitrine de l’agence WingoAI', slug: 'site-vitrine-agence-wingoai', category: 'Web & applications', summary: 'Site vitrine développé pour présenter l’activité et les services de l’agence WingoAI.', tools: [], featured: true, status: 'published' },
  { title: 'Jeefox, moteur de recherche intelligent', slug: 'jeefox-moteur-de-recherche-intelligent', category: 'Web & applications', summary: 'Moteur de recherche intelligent conçu pour indexer et retrouver l’information pertinente rapidement.', tools: [], featured: true, status: 'published' },
  { title: 'mesmarches.fr : site d’annonces pour les évènements', slug: 'mesmarches-fr-site-annonces-evenements', category: 'Web & applications', summary: 'Site d’annonces permettant de publier et consulter des événements en ligne.', tools: [], status: 'published' },
  { title: 'Comparateur mutuelles senior', slug: 'comparateur-mutuelles-senior', category: 'Web & applications', summary: 'Comparateur en ligne permettant d’évaluer et de comparer des offres de mutuelle santé senior.', tools: [], status: 'published' },
  { title: 'Site vitrine de l’agence NovatrixAI', slug: 'site-vitrine-agence-novatrixai', category: 'Web & applications', summary: 'Le site vitrine de NovatrixAI, conçu pour présenter l’agence et ses systèmes.', tools: ['Nuxt'], status: 'draft' },
  // Pilotage IA
  { title: 'ProRanker — classement automatique des candidatures', slug: 'proranker-classement-candidatures-nlp', category: 'Pilotage IA', summary: 'Système de classement automatique des candidatures grâce au traitement du langage naturel (NLP).', tools: ['NLP'], featured: true, status: 'published' },
  { title: 'Automatisation CRM pilotée par agent IA', slug: 'automatisation-crm-agent-ia-n8n', category: 'Pilotage IA', summary: 'Agent IA branché sur n8n qui met à jour le CRM et déclenche les actions de suivi sans intervention manuelle.', tools: ['n8n'], featured: true, status: 'published' },
  { title: 'Création de contenu IA (images, vidéos, audio)', slug: 'creation-contenu-ia-n8n-gpt', category: 'Pilotage IA', summary: 'Automatisation qui génère images, vidéos et audio via n8n, GPT et plusieurs API connectées.', tools: ['n8n', 'GPT'], status: 'published' },
  { title: 'Envoi automatique de document à signer', slug: 'envoi-automatique-document-a-signer', category: 'Pilotage IA', summary: 'Automatisation qui génère et envoie un document à signer à partir d’un modèle prédéfini.', tools: [], status: 'published' },
  { title: 'Automatisation Calendly', slug: 'automatisation-calendly', category: 'Pilotage IA', summary: 'Automatisation connectée à Calendly pour synchroniser les prises de rendez-vous avec les autres outils.', tools: ['Calendly'], status: 'published' },
  { title: 'Création automatique de dossiers Drive', slug: 'creation-automatique-dossiers-drive', category: 'Pilotage IA', summary: 'Automatisation qui crée et organise automatiquement des dossiers sur Google Drive.', tools: ['Google Drive'], status: 'published' },
  { title: 'Automatisation Stripe → e-mail', slug: 'automatisation-stripe-mail', category: 'Pilotage IA', summary: 'Automatisation reliant les paiements Stripe à l’envoi d’e-mails.', tools: ['Stripe'], status: 'published' },
  { title: 'Automatisation Gmail → OpenAI', slug: 'automatisation-gmail-openai', category: 'Pilotage IA', summary: 'Automatisation connectant Gmail à l’API OpenAI pour traiter les messages entrants.', tools: ['Gmail', 'OpenAI'], status: 'published' },
  { title: 'Détection d’ouverture mail et redirection des stats', slug: 'detection-ouverture-mail-stats', category: 'Pilotage IA', summary: 'Automatisation qui détecte l’ouverture des e-mails et redirige les statistiques vers un tableau de suivi.', tools: [], status: 'published' },
  { title: 'Solution RH automatisée', slug: 'solution-rh-automatisee', category: 'Pilotage IA', summary: 'Solution RH automatisée qui génère les contrats et les dossiers employés en un clic.', tools: [], status: 'published' },
  { title: 'Analyse et traitement de CSV avec IA pour CRM', slug: 'analyse-csv-ia-crm', category: 'Pilotage IA', summary: 'Automatisation qui analyse et traite des fichiers CSV avec l’IA avant intégration dans le CRM.', tools: ['CRM'], status: 'published' },
  { title: 'Rédaction et gestion de contrats', slug: 'redaction-gestion-contrats', category: 'Pilotage IA', summary: 'Automatisation qui rédige et gère le cycle de vie des contrats.', tools: [], status: 'published' },
  { title: 'Publication de contenus WordPress avec IA', slug: 'publication-wordpress-ia', category: 'Pilotage IA', summary: 'Automatisation qui rédige et publie des contenus sur WordPress grâce à l’IA.', tools: ['WordPress'], status: 'published' },
  { title: 'Chatbot de support et de prise de rendez-vous', slug: 'chatbot-support-prise-rendez-vous', category: 'Pilotage IA', summary: 'Chatbot dédié au support client et à la prise de rendez-vous.', tools: [], status: 'published' },
  { title: 'Génération automatique de facture', slug: 'generation-automatique-facture', category: 'Pilotage IA', summary: 'Automatisation qui génère automatiquement les factures clients.', tools: [], status: 'published' },
  { title: 'Agent IA de gestion intelligente d’agenda', slug: 'agent-ia-gestion-agenda', category: 'Pilotage IA', summary: 'Agent IA qui gère et optimise l’agenda de manière autonome.', tools: [], featured: true, status: 'published' },
  // Acquisition
  { title: 'Relance automatique des paniers abandonnés', slug: 'relance-paniers-abandonnes-shopify-twilio', category: 'Acquisition', summary: 'Automatisation qui détecte les paniers abandonnés sur Shopify et relance le client par SMS via Twilio.', tools: ['Shopify', 'Twilio'], featured: true, status: 'published' },
  { title: 'Publication e-commerce multicanal', slug: 'publication-ecommerce-multicanal', category: 'Acquisition', summary: 'Automatisation qui publie les produits e-commerce simultanément sur Pinterest, Facebook et Instagram.', tools: ['Pinterest', 'Facebook', 'Instagram'], status: 'published' },
  { title: 'Publication de contenu multicanal', slug: 'publication-contenu-multicanal-reseaux', category: 'Acquisition', summary: 'Automatisation qui publie un même contenu sur Facebook, X, LinkedIn, Instagram et YouTube.', tools: ['Facebook', 'X', 'LinkedIn', 'Instagram', 'YouTube'], status: 'published' },
  { title: 'Automatisation de publication TikTok', slug: 'automatisation-publication-tiktok', category: 'Acquisition', summary: 'Automatisation dédiée à la publication de contenu sur TikTok.', tools: ['TikTok'], status: 'published' },
  { title: 'Récupération des données de campagne Instantly → CRM', slug: 'recuperation-donnees-instantly-crm', category: 'Acquisition', summary: 'Automatisation qui récupère les données de campagne Instantly et les intègre automatiquement dans un CRM.', tools: ['Instantly', 'CRM'], status: 'published' },
  { title: 'Gestion des appels manqués avec SMS de rappel', slug: 'gestion-appels-manques-sms-rappel', category: 'Acquisition', summary: 'Système automatisé qui détecte les appels manqués et envoie un SMS de rappel personnalisé.', tools: [], status: 'published' },
  { title: 'Facebook Leads → Systeme.io', slug: 'automatisation-facebook-leads-systeme-io', category: 'Acquisition', summary: 'Automatisation qui récupère les leads Facebook, crée les contacts, applique les tags et les inscrit en campagne dans Systeme.io.', tools: ['Facebook Leads', 'Systeme.io'], featured: true, status: 'published' },
  { title: 'Automatisation Trello, Instantly et Slack', slug: 'automatisation-trello-instantly-slack', category: 'Acquisition', summary: 'Automatisation IA qui relie Trello, Instantly et Slack pour synchroniser les tâches et les notifications.', tools: ['Trello', 'Instantly', 'Slack'], status: 'published' },
  { title: 'Extraction d’annonces immobilières avec GPT', slug: 'extraction-annonces-immobilieres-gpt', category: 'Acquisition', summary: 'Automatisation qui extrait et structure des annonces immobilières grâce à GPT.', tools: ['GPT'], status: 'published' },
  { title: 'Envoi de mails et avis Google avec IA', slug: 'envoi-mails-avis-google-ia', category: 'Acquisition', summary: 'Automatisation qui envoie des e-mails et sollicite des avis Google grâce à l’IA, connectée à Airtable et Make.', tools: ['Airtable', 'Make', 'GPT'], status: 'published' },
]

// --- Avis réels (texte non vide uniquement). Aucune note n'a été capturée par
// l'extraction ComeUp : le champ `rating` reste vide plutôt qu'inventé.
const testimonials = [
  { name: 'Donald Alban Petrus', role: 'Président, DSAP – LDR Group', text: 'Je tiens à vous remercier sincèrement pour votre efficacité et votre réactivité face à une demande urgente. Votre travail est remarquable, réalisé avec sérieux, écoute du client et une véritable force de proposition.', source: 'comeup', status: 'published' },
  { name: 'Francisco SC', role: 'Client ComeUp', text: 'Excellent travail et très bonne communication. Un grand merci.', source: 'comeup', status: 'published' },
  { name: 'Francisco SC', role: 'Client ComeUp', text: 'Excellent travail et très bonne communication. Merci.', source: 'comeup', status: 'published' },
  { name: 'Robin Drezet', role: 'Client ComeUp', text: 'Un travail d’une qualité exemplaire !', source: 'comeup', status: 'published' },
  { name: 'Francisco SC', role: 'Client ComeUp', text: 'Très bon travail et bonne communication.', source: 'comeup', status: 'published' },
  { name: 'WINGO', role: 'Agence WingoAI', text: 'Merci à Dane pour son professionnalisme', source: 'comeup', status: 'published' },
  { name: 'WINGO', role: 'Agence WingoAI', text: 'Merveilleux travail', source: 'comeup', status: 'published' },
  { name: 'Thierry Phitoussi', role: 'Client ComeUp', text: 'Très bon suivi et très bon travail. À recommander !', source: 'comeup', status: 'published' },
]

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log('Connecté à MongoDB.')

  let pCreated = 0, pSkipped = 0
  for (const [i, p] of projects.entries()) {
    const res = await ProjectModel.updateOne(
      { slug: p.slug },
      { $setOnInsert: { ...p, sortOrder: i, source: 'comeup' } },
      { upsert: true },
    )
    if (res.upsertedCount) pCreated++; else pSkipped++
  }
  console.log(`Réalisations : ${pCreated} créées, ${pSkipped} déjà présentes.`)

  let tCreated = 0, tSkipped = 0
  for (const [i, t] of testimonials.entries()) {
    const res = await TestimonialModel.updateOne(
      { name: t.name, text: t.text },
      { $setOnInsert: { ...t, sortOrder: i } },
      { upsert: true },
    )
    if (res.upsertedCount) tCreated++; else tSkipped++
  }
  console.log(`Avis : ${tCreated} créés, ${tSkipped} déjà présents.`)

  await mongoose.disconnect()
  console.log('Terminé.')
}

run().catch(err => { console.error(err); process.exit(1) })
