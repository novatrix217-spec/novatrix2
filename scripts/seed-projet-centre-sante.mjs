// Crée la réalisation « pilotage d’un centre de santé » (hors catalogue ComeUp, contrairement
// aux projets importés par scripts/seed-comeup.mjs). Le contenu est paraphrasé à partir du
// cahier des charges et du modèle de consolidation RH conservés dans le Drive interne.
//
// Le client n’est pas nommé : secteur santé, données patients, et aucun accord écrit de
// référencement public n’a été recueilli. Aucun résultat chiffré n’est publié — les seules
// valeurs du dossier (tarif de téléconsultation, volumes de CA) sont des données client.
// Insertion uniquement si le slug n’existe pas ; une fiche déjà présente n’est jamais écrasée.
// Le mode par défaut est une simulation en lecture seule.
//
// Simulation : node scripts/seed-projet-centre-sante.mjs
// Application : node scripts/seed-projet-centre-sante.mjs --apply --confirm=<nom_base>
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

const project = {
  title: 'Pilotage automatisé d’un centre de santé',
  titleEn: 'Automated reporting for a health centre',
  slug: 'pilotage-automatise-centre-sante',
  category: 'Pilotage IA',
  categoryEn: 'AI Piloting',
  summary: 'Tableau de bord d’activité et consolidation des heures alimentés automatiquement, à partir du logiciel métier et des relevés de l’équipe.',
  summaryEn: 'Activity dashboard and hours consolidation fed automatically, from the practice software and the team’s own records.',
  challenge: 'Le suivi de l’activité reposait sur des relevés manuels : ouvrir le logiciel métier chaque matin, recopier les actes de la veille, ventiler les recettes par catégorie, puis rassembler séparément les heures travaillées avant chaque paie. Des ressaisies quotidiennes, sur plusieurs sources qui ne se parlaient pas, avec le risque d’erreur et de retard que cela suppose.',
  challengeEn: 'Activity tracking relied on manual records: opening the practice software every morning, copying the previous day’s procedures, splitting revenue by category, then separately gathering worked hours before each payroll run. Daily re-entry, across several sources that did not talk to each other, with the risk of error and delay that implies.',
  solution: 'L’extraction des actes de la veille est automatisée depuis le logiciel métier, puis ventilée par type de recette dans un tableau de bord consolidé, mis à jour chaque jour. Les actes réalisés à distance sont identifiés et comptés automatiquement selon leur tarif. En parallèle, les relevés d’heures issus des différents outils sont importés, consolidés par employé et par mois, puis exportés au format attendu par le logiciel de paie.',
  solutionEn: 'Extraction of the previous day’s procedures is automated from the practice software, then split by revenue type into a consolidated dashboard, refreshed daily. Remote procedures are identified and counted automatically based on their fee. In parallel, time records from the various tools are imported, consolidated per employee and per month, then exported in the format the payroll software expects.',
  features: [
    'Extraction quotidienne des actes depuis le logiciel métier',
    'Ventilation des recettes par catégorie et cumul mensuel',
    'Comptage automatique des actes réalisés à distance',
    'Consolidation des heures travaillées par employé et par mois',
    'Export au format attendu par le logiciel de paie',
  ],
  featuresEn: [
    'Daily extraction of procedures from the practice software',
    'Revenue split by category with monthly totals',
    'Automatic counting of remote procedures',
    'Worked hours consolidated per employee and per month',
    'Export in the format expected by the payroll software',
  ],
  tools: ['Make', 'Google Sheets'],
  status: 'draft',
  featured: false,
  source: 'manual',
}

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log(`Cible MongoDB : hôte=${target.host}, base=${target.database}`)
  console.log(applyChanges ? 'Mode APPLICATION confirmé.' : 'Mode DRY-RUN : aucune écriture ne sera effectuée.')

  const existing = await ProjectModel.findOne({ slug: project.slug }).lean()
  if (existing) {
    console.log(`La réalisation « ${project.slug} » existe déjà : aucune écriture, aucun écrasement.`)
    return
  }

  if (!applyChanges) {
    console.log(`Prévu : création de « ${project.slug} » (statut ${project.status}, client non nommé).`)
    console.log('\nSimulation terminée : 1 réalisation à créer, aucune écriture.')
    return
  }

  await ProjectModel.create(project)
  console.log(`Création effectuée : « ${project.slug} » en statut ${project.status}.`)
  console.log('Relire et compléter depuis /admin/realisations, puis publier une fois validé.')
}

run()
  .catch(error => {
    const message = error instanceof Error ? error.message.replaceAll(uri, '[URI masquée]') : 'Erreur MongoDB non détaillée.'
    console.error(`Échec : ${message}`)
    process.exitCode = 1
  })
  .finally(() => mongoose.disconnect())
