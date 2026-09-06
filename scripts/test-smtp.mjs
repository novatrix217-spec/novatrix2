/**
 * Vérifie la configuration SMTP du .env.
 *
 *   node scripts/test-smtp.mjs                  # connexion + authentification seulement
 *   node scripts/test-smtp.mjs --send a@b.com   # envoie en plus un mail de test
 *
 * `verify()` ouvre la connexion et authentifie sans rien envoyer : c'est le contrôle
 * à faire avant un déploiement, pour ne pas découvrir la panne sur un vrai lead.
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = resolve(root, '.env')
const env = {}
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
}
const cfg = { ...env, ...process.env }
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = cfg

const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter(k => !cfg[k])
if (missing.length) {
  console.error(`Configuration incomplète — manque : ${missing.join(', ')}`)
  process.exit(1)
}

const port = Number(SMTP_PORT) || 587
const transporter = nodemailer.createTransport({
  host: SMTP_HOST, port, secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
})

try {
  await transporter.verify()
  console.log(`✔ ${SMTP_HOST}:${port} — connexion et authentification acceptées (${SMTP_USER}).`)
} catch (error) {
  console.error(`✖ Échec sur ${SMTP_HOST}:${port} — ${error.message}`)
  process.exit(1)
}

const sendIndex = process.argv.indexOf('--send')
if (sendIndex !== -1) {
  const to = process.argv[sendIndex + 1]
  if (!to) { console.error('Usage : --send destinataire@exemple.com'); process.exit(1) }
  const info = await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER, to,
    subject: 'Test SMTP NovatrixAI',
    html: '<p>Si vous lisez ce message, la configuration SMTP du site fonctionne.</p>',
  })
  console.log(`✔ Mail de test envoyé à ${to} (id ${info.messageId}).`)
  console.log('  Vérifiez aussi le dossier spam : sans SPF/DKIM sur le domaine, la délivrabilité est mauvaise.')
}
