// Complète le champ « défi » des réalisations déjà en base (voir scripts/seed-comeup.mjs et
// scripts/enrich-comeup-projects.mjs, qui a rempli les « solution »). Les textes ci-dessous sont
// paraphrasés à partir des descriptions de projet conservées dans le portefeuille interne : ils
// décrivent la situation de départ, sans nommer de client, sans chiffre et sans témoignage.
// Aucun résultat chiffré n’est injecté : les métriques restent saisies depuis /admin/realisations.
// Ne touche jamais un champ déjà rempli (pas d’écrasement d’une édition faite depuis /admin).
// Le mode par défaut est une simulation en lecture seule. Avant toute application, exporter/sauvegarder
// la collection projects ; le rollback consiste à restaurer cet export.
//
// Simulation : node scripts/enrich-comeup-challenges.mjs
// Application : node scripts/enrich-comeup-challenges.mjs --apply --confirm=<nom_base>
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

// Quatre réalisations dont la description d’origine documente explicitement la situation de départ.
// Les autres slugs restent volontairement absents : sans source fiable, le défi reste vide.
const enrichments = {
  'automatisation-crm-agent-ia-n8n': {
    challenge: 'Tenir un CRM à jour suppose d’ouvrir l’interface et de répéter les mêmes gestes : créer un contact, corriger un deal, retrouver une fiche. Ces allers-retours prennent du temps et finissent par être repoussés, jusqu’à ce que la base ne reflète plus la réalité commerciale.',
    challengeEn: 'Keeping a CRM up to date means opening the interface and repeating the same steps: create a contact, fix a deal, find a record. Those round trips take time and end up postponed, until the database no longer reflects what is actually happening commercially.',
  },
  'creation-contenu-ia-n8n-gpt': {
    challenge: 'Produire régulièrement des visuels, des vidéos et des voix off demande d’enchaîner plusieurs outils à la main, à chaque contenu. Le volume devient vite le facteur limitant, bien avant les idées.',
    challengeEn: 'Producing visuals, videos and voice-overs regularly means chaining several tools by hand, for every single piece. Volume quickly becomes the limiting factor, well before ideas do.',
  },
  'automatisation-publication-tiktok': {
    challenge: 'Publier court et souvent sur TikTok suppose de reprendre chaque vidéo une par une : écrire le titre, choisir les hashtags, programmer l’envoi. La régularité repose alors sur la disponibilité de quelqu’un, et cède dès que le rythme monte.',
    challengeEn: 'Posting short and often on TikTok means handling each video one by one: writing the title, picking hashtags, scheduling the upload. Consistency then rests on someone being available, and breaks as soon as the pace picks up.',
  },
  'publication-ecommerce-multicanal': {
    challenge: 'Une boutique en ligne qui veut exister sur plusieurs réseaux doit republier les mêmes produits partout, en adaptant le visuel et le texte à chaque canal, puis noter ce qui est déjà passé. La ressaisie est répétitive et les oublis deviennent inévitables.',
    challengeEn: 'An online store that wants a presence on several networks has to repost the same products everywhere, adapting visuals and copy per channel, then track what has already gone out. The re-entry is repetitive and things inevitably slip through.',
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
