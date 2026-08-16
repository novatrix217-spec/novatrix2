// Ajoute la traduction anglaise (titleEn/categoryEn/summaryEn) aux 31 réalisations déjà en base.
// Met à jour par slug — ne touche à aucun champ français existant.
// Usage : node scripts/seed-en-projects.mjs

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

const { Schema } = mongoose
const ProjectModel = mongoose.models.Project || mongoose.model('Project', new Schema({}, { strict: false }))

const categoryEn = { 'Web & applications': 'Web & Apps', 'Pilotage IA': 'AI Piloting', 'Acquisition': 'Acquisition' }

const translations = {
  'site-vitrine-agence-wingoai': { titleEn: 'WingoAI Agency Showcase Website', summaryEn: 'Showcase website built to present WingoAI agency’s activity and services.' },
  'jeefox-moteur-de-recherche-intelligent': { titleEn: 'Jeefox, an intelligent search engine', summaryEn: 'Intelligent search engine designed to index and retrieve relevant information quickly.' },
  'mesmarches-fr-site-annonces-evenements': { titleEn: 'mesmarches.fr: event listings website', summaryEn: 'Listings website for publishing and browsing events online.' },
  'comparateur-mutuelles-senior': { titleEn: 'Senior health insurance comparison tool', summaryEn: 'Online comparison tool to evaluate and compare senior health insurance offers.' },
  'site-vitrine-agence-novatrixai': { titleEn: 'NovatrixAI Agency Showcase Website', summaryEn: 'NovatrixAI’s own showcase website, designed to present the agency and its systems.' },
  'proranker-classement-candidatures-nlp': { titleEn: 'ProRanker — automatic candidate ranking', summaryEn: 'Automatic candidate ranking system powered by natural language processing (NLP).' },
  'automatisation-crm-agent-ia-n8n': { titleEn: 'AI agent-driven CRM automation', summaryEn: 'AI agent wired into n8n that updates the CRM and triggers follow-up actions without manual work.' },
  'creation-contenu-ia-n8n-gpt': { titleEn: 'AI content creation (images, videos, audio)', summaryEn: 'Automation that generates images, videos and audio via n8n, GPT and several connected APIs.' },
  'envoi-automatique-document-a-signer': { titleEn: 'Automatic signature-ready document delivery', summaryEn: 'Automation that generates and sends a document for signature from a predefined template.' },
  'automatisation-calendly': { titleEn: 'Calendly automation', summaryEn: 'Automation connected to Calendly to sync appointment bookings with other tools.' },
  'creation-automatique-dossiers-drive': { titleEn: 'Automatic Drive folder creation', summaryEn: 'Automation that creates and organizes folders on Google Drive automatically.' },
  'automatisation-stripe-mail': { titleEn: 'Stripe-to-email automation', summaryEn: 'Automation connecting Stripe payments to email delivery.' },
  'automatisation-gmail-openai': { titleEn: 'Gmail-to-OpenAI automation', summaryEn: 'Automation connecting Gmail to the OpenAI API to process incoming messages.' },
  'detection-ouverture-mail-stats': { titleEn: 'Email open detection and stats routing', summaryEn: 'Automation that detects email opens and routes the statistics to a tracking dashboard.' },
  'solution-rh-automatisee': { titleEn: 'Automated HR solution', summaryEn: 'Automated HR solution that generates contracts and employee files in one click.' },
  'analyse-csv-ia-crm': { titleEn: 'CSV analysis and processing with AI for CRM', summaryEn: 'Automation that analyzes and processes CSV files with AI before integration into the CRM.' },
  'redaction-gestion-contrats': { titleEn: 'Contract drafting and management', summaryEn: 'Automation that drafts and manages the contract lifecycle.' },
  'publication-wordpress-ia': { titleEn: 'AI-powered WordPress content publishing', summaryEn: 'Automation that writes and publishes content on WordPress using AI.' },
  'chatbot-support-prise-rendez-vous': { titleEn: 'Support and appointment-booking chatbot', summaryEn: 'Chatbot dedicated to customer support and appointment booking.' },
  'generation-automatique-facture': { titleEn: 'Automatic invoice generation', summaryEn: 'Automation that generates client invoices automatically.' },
  'agent-ia-gestion-agenda': { titleEn: 'AI agenda management agent', summaryEn: 'AI agent that manages and optimizes a calendar autonomously.' },
  'relance-paniers-abandonnes-shopify-twilio': { titleEn: 'Automatic abandoned cart recovery', summaryEn: 'Automation that detects abandoned carts on Shopify and follows up with the client by SMS via Twilio.' },
  'publication-ecommerce-multicanal': { titleEn: 'Multichannel e-commerce publishing', summaryEn: 'Automation that publishes e-commerce products simultaneously on Pinterest, Facebook and Instagram.' },
  'publication-contenu-multicanal-reseaux': { titleEn: 'Multichannel content publishing', summaryEn: 'Automation that publishes the same content on Facebook, X, LinkedIn, Instagram and YouTube.' },
  'automatisation-publication-tiktok': { titleEn: 'TikTok publishing automation', summaryEn: 'Automation dedicated to publishing content on TikTok.' },
  'recuperation-donnees-instantly-crm': { titleEn: 'Instantly campaign data to CRM', summaryEn: 'Automation that retrieves Instantly campaign data and integrates it automatically into a CRM.' },
  'gestion-appels-manques-sms-rappel': { titleEn: 'Missed call management with SMS callback', summaryEn: 'Automated system that detects missed calls and sends a personalized SMS callback.' },
  'automatisation-facebook-leads-systeme-io': { titleEn: 'Facebook Leads → Systeme.io', summaryEn: 'Automation that retrieves Facebook leads, creates contacts, applies tags and enrolls them in a Systeme.io campaign.' },
  'automatisation-trello-instantly-slack': { titleEn: 'Trello, Instantly and Slack automation', summaryEn: 'AI automation that connects Trello, Instantly and Slack to sync tasks and notifications.' },
  'extraction-annonces-immobilieres-gpt': { titleEn: 'Real estate listing extraction with GPT', summaryEn: 'Automation that extracts and structures real estate listings using GPT.' },
  'envoi-mails-avis-google-ia': { titleEn: 'Email and Google review automation with AI', summaryEn: 'Automation that sends emails and requests Google reviews using AI, connected to Airtable and Make.' },
}

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log('Connecté à MongoDB.')
  let updated = 0, missing = 0
  const all = await ProjectModel.find({}).select('slug category').lean()
  for (const doc of all) {
    const t = translations[doc.slug]
    if (!t) { missing++; console.warn('Pas de traduction pour', doc.slug); continue }
    await ProjectModel.updateOne({ _id: doc._id }, { $set: { titleEn: t.titleEn, summaryEn: t.summaryEn, categoryEn: categoryEn[doc.category] || doc.category } })
    updated++
  }
  console.log(`Projets : ${updated} mis à jour, ${missing} sans traduction.`)
  await mongoose.disconnect()
}
run().catch(err => { console.error(err); process.exit(1) })
