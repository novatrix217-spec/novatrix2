// Ajoute la traduction anglaise (textEn/roleEn) aux 8 avis déjà en base.
// Usage : node scripts/seed-en-testimonials.mjs

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
const TestimonialModel = mongoose.models.Testimonial || mongoose.model('Testimonial', new Schema({}, { strict: false }))

const translations = [
  { name: 'Donald Alban Petrus', text: 'Je tiens à vous remercier sincèrement pour votre efficacité et votre réactivité face à une demande urgente. Votre travail est remarquable, réalisé avec sérieux, écoute du client et une véritable force de proposition.',
    textEn: 'I sincerely want to thank you for your efficiency and responsiveness in handling an urgent request. Your work is remarkable, carried out with seriousness, attentiveness to the client, and real initiative.', roleEn: 'President, DSAP – LDR Group' },
  { name: 'Francisco SC', text: 'Excellent travail et très bonne communication. Un grand merci.', textEn: 'Excellent work and very good communication. Many thanks.', roleEn: 'ComeUp client' },
  { name: 'Francisco SC', text: 'Excellent travail et très bonne communication. Merci.', textEn: 'Excellent work and very good communication. Thank you.', roleEn: 'ComeUp client' },
  { name: 'Robin Drezet', text: 'Un travail d’une qualité exemplaire !', textEn: 'Work of exemplary quality!', roleEn: 'ComeUp client' },
  { name: 'Francisco SC', text: 'Très bon travail et bonne communication.', textEn: 'Very good work and good communication.', roleEn: 'ComeUp client' },
  { name: 'WINGO', text: 'Merci à Dane pour son professionnalisme', textEn: 'Thanks to Dane for his professionalism', roleEn: 'WingoAI Agency' },
  { name: 'WINGO', text: 'Merveilleux travail', textEn: 'Wonderful work', roleEn: 'WingoAI Agency' },
  { name: 'Thierry Phitoussi', text: 'Très bon suivi et très bon travail. À recommander !', textEn: 'Very good follow-up and very good work. Highly recommended!', roleEn: 'ComeUp client' },
]

async function run() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log('Connecté à MongoDB.')
  let updated = 0, missing = 0
  for (const t of translations) {
    const res = await TestimonialModel.updateOne({ name: t.name, text: t.text }, { $set: { textEn: t.textEn, roleEn: t.roleEn } })
    if (res.matchedCount) updated++; else { missing++; console.warn('Pas trouvé :', t.name, t.text.slice(0, 30)) }
  }
  console.log(`Avis : ${updated} mis à jour, ${missing} non trouvés.`)
  await mongoose.disconnect()
}
run().catch(err => { console.error(err); process.exit(1) })
