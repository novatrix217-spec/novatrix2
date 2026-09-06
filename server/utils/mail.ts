import nodemailer, { type Transporter } from 'nodemailer'

/**
 * Envoi d'e-mails via SMTP (nodemailer).
 *
 * Configuration : SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM.
 * Tant que le SMTP n'est pas renseigné, les fonctions retournent sans rien envoyer :
 * une notification manquante ne doit jamais faire échouer la création d'un lead.
 */
let transporter: Transporter | null = null

export function mailConfigured() {
  const c = useRuntimeConfig()
  return Boolean(c.smtpHost && c.smtpUser && c.smtpPass)
}

function getTransporter() {
  if (transporter) return transporter
  const c = useRuntimeConfig()
  const port = Number(c.smtpPort) || 587
  transporter = nodemailer.createTransport({
    host: String(c.smtpHost),
    port,
    // 465 = TLS implicite ; 587/25 démarrent en clair puis passent en STARTTLS.
    secure: port === 465,
    auth: { user: String(c.smtpUser), pass: String(c.smtpPass) },
  })
  return transporter
}

async function send(options: { to: string; subject: string; html: string; replyTo?: string }) {
  if (!mailConfigured()) return
  const c = useRuntimeConfig()
  await getTransporter().sendMail({ from: String(c.mailFrom), ...options })
}

const esc = (v: unknown) => String(v ?? '').replace(/[<>&"]/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[ch] as string))

export async function sendResourceMail(to: string, firstName: string, title: string, downloadUrl: string, locale: 'fr' | 'en' = 'fr') {
  // Le mail suit la langue dans laquelle le lead a rempli le formulaire.
  const copy = locale === 'en'
    ? { subject: `Your NovatrixAI resource: ${title}`, hello: `Hi ${firstName},`, ready: 'Your resource is ready.', cta: `Download ${title}`, expiry: 'This link expires shortly.' }
    : { subject: `Votre ressource NovatrixAI : ${title}`, hello: `Bonjour ${firstName},`, ready: 'Votre ressource est prête.', cta: `Télécharger ${title}`, expiry: 'Ce lien expire rapidement.' }
  await send({
    to,
    subject: copy.subject,
    html: `<p>${esc(copy.hello)}</p><p>${copy.ready}</p><p><a href="${downloadUrl}">${esc(copy.cta)}</a></p><p>${copy.expiry}</p>`,
  })
}

// Alerte interne à chaque nouveau lead. Destinataire : réglage `lead_notification_email`
// saisi dans /admin/reglages, sinon MAIL_TO_INTERNAL, sinon MAIL_FROM (jamais silencieux
// tant qu'une adresse existe). Complète les webhooks n8n/GHL, qui peuvent ne pas être configurés.
export async function sendLeadNotificationMail(to: string, lead: { firstName: string; email: string; phone: string; domain: string; source: string; message?: string; resourceSlug?: string | null }, adminUrl: string) {
  if (!to) return
  const rows = [['Nom', lead.firstName], ['Email', lead.email], ['Téléphone', lead.phone], ['Activité', lead.domain], ['Origine', lead.source], ...(lead.resourceSlug ? [['Ressource', lead.resourceSlug]] : []), ...(lead.message ? [['Message', lead.message]] : [])]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`).join('')
  await send({
    to,
    // Répondre au mail écrit directement au prospect.
    replyTo: lead.email,
    subject: `Nouveau lead — ${lead.firstName} (${lead.domain})`,
    html: `<p>Nouveau lead reçu depuis le site.</p><table>${rows}</table><p><a href="${adminUrl}">Ouvrir dans l’admin</a></p>`,
  })
}
