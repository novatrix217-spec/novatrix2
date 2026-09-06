/**
 * Envoie les vidéos de démonstration du Video Lab sur Cloudinary, plutôt que de
 * versionner ~30 Mo de binaires dans le dépôt et de les servir en statique par Vercel.
 *
 *   node scripts/upload-video-lab.mjs            # envoie et écrit le manifeste
 *   node scripts/upload-video-lab.mjs --dry-run  # liste ce qui serait envoyé
 *
 * Le manifeste `shared/video-lab-assets.json` (public_id + URLs) est commité ;
 * les .mp4 sources restent hors dépôt.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { v2 as cloudinary } from 'cloudinary'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = resolve(root, 'public/media/video-lab')
const MANIFEST = resolve(root, 'shared/video-lab-assets.json')
const FOLDER = 'novatrix/video-lab'
const dryRun = process.argv.includes('--dry-run')

// Lecture minimale du .env : ce script tourne hors du runtime Nuxt.
for (const line of existsSync(resolve(root, '.env')) ? readFileSync(resolve(root, '.env'), 'utf8').split('\n') : []) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
}

const cloudName = process.env.NUXT_CLOUDINARY_CLOUD_NAME
const apiKey = process.env.NUXT_CLOUDINARY_API_KEY
const apiSecret = process.env.NUXT_CLOUDINARY_API_SECRET
if (!cloudName || !apiKey || !apiSecret) {
  console.error('Cloudinary non configuré : renseignez NUXT_CLOUDINARY_* dans .env')
  process.exit(1)
}
cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true })

const files = existsSync(SRC_DIR) ? readdirSync(SRC_DIR).filter(f => f.endsWith('.mp4')).sort() : []
if (!files.length) {
  console.error(`Aucun .mp4 dans ${SRC_DIR}`)
  process.exit(1)
}

const manifest = {}
for (const file of files) {
  const slug = basename(file, '.mp4')
  const publicId = `${FOLDER}/${slug}`
  if (dryRun) { console.log(`[dry-run] ${file} -> ${publicId}`); continue }
  process.stdout.write(`↑ ${file} … `)
  // `overwrite` + public_id stable : relancer le script met à jour au lieu de dupliquer.
  const res = await cloudinary.uploader.upload(resolve(SRC_DIR, file), {
    resource_type: 'video', public_id: publicId, overwrite: true, invalidate: true,
  })
  manifest[slug] = {
    publicId: res.public_id,
    // q_auto/f_auto : Cloudinary sert le meilleur codec/débit selon le navigateur.
    src: cloudinary.url(res.public_id, { resource_type: 'video', secure: true, transformation: [{ quality: 'auto', fetch_format: 'auto' }] }),
    // Poster dérivé de la vidéo elle-même (frame à 1 s), en WebP.
    poster: cloudinary.url(`${res.public_id}.webp`, { resource_type: 'video', secure: true, transformation: [{ start_offset: '1', width: 640, crop: 'scale', quality: 'auto' }] }),
    duration: res.duration ?? null,
    bytes: res.bytes,
  }
  console.log(`ok (${(res.bytes / 1e6).toFixed(1)} Mo)`)
}

if (!dryRun) {
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`\n${Object.keys(manifest).length} vidéos envoyées. Manifeste : shared/video-lab-assets.json`)
}
