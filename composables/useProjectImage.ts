import type { PublicProject } from '~/shared/types'

const localProjectImageSlugs = new Set([
  'creation-contenu-ia-n8n-gpt',
  'site-vitrine-agence-wingoai',
  'relance-paniers-abandonnes-shopify-twilio',
  'jeefox-moteur-de-recherche-intelligent',
  'mesmarches-fr-site-annonces-evenements',
  'comparateur-mutuelles-senior',
  'proranker-classement-candidatures-nlp',
  'publication-ecommerce-multicanal',
  'publication-contenu-multicanal-reseaux',
  'automatisation-crm-agent-ia-n8n',
  'automatisation-publication-tiktok',
  'recuperation-donnees-instantly-crm',
  'envoi-automatique-document-a-signer',
  'automatisation-calendly',
  'creation-automatique-dossiers-drive',
  'automatisation-stripe-mail',
  'automatisation-gmail-openai',
  'detection-ouverture-mail-stats',
  'gestion-appels-manques-sms-rappel',
  'solution-rh-automatisee',
  'analyse-csv-ia-crm',
  'automatisation-facebook-leads-systeme-io',
  'redaction-gestion-contrats',
  'publication-wordpress-ia',
  'chatbot-support-prise-rendez-vous',
  'generation-automatique-facture',
  'automatisation-trello-instantly-slack',
  'extraction-annonces-immobilieres-gpt',
  'envoi-mails-avis-google-ia',
  'agent-ia-gestion-agenda',
])

export function useProjectImage() {
  const cld = useCloudinaryUrl()

  return (project?: Pick<PublicProject, 'slug' | 'coverImageKey'>, transform = 'q_auto,f_auto') => {
    if (!project) return ''
    const coverImageKey = project.coverImageKey?.trim()
    if (coverImageKey) {
      if (/^https?:\/\//i.test(coverImageKey)) return coverImageKey
      const cloudinaryUrl = cld(coverImageKey, transform)
      if (cloudinaryUrl) return cloudinaryUrl
    }
    return localProjectImageSlugs.has(project.slug) ? `/projects/${project.slug}.webp` : ''
  }
}
