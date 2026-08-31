/**
 * Lien WhatsApp public, construit à partir de `runtimeConfig.public.whatsappUrl`
 * (cf. nuxt.config.ts). Valide que l'URL configurée pointe bien vers wa.me/whatsapp.com
 * avant de l'exposer, pour éviter d'ouvrir une URL arbitraire si la variable d'env est
 * mal formée.
 */
const DEFAULT_WHATSAPP_URL = 'https://wa.me/22900000000'

export function useWhatsapp() {
  const configuredUrl = useRuntimeConfig().public.whatsappUrl
  const whatsappUrl = (() => {
    if (typeof configuredUrl !== 'string' || !configuredUrl.trim()) return DEFAULT_WHATSAPP_URL
    try {
      const parsed = new URL(configuredUrl.trim())
      const isWhatsappHost = parsed.hostname === 'wa.me' || parsed.hostname.endsWith('.whatsapp.com')
      return parsed.protocol === 'https:' && isWhatsappHost ? parsed.toString() : DEFAULT_WHATSAPP_URL
    } catch {
      return DEFAULT_WHATSAPP_URL
    }
  })()

  return { whatsappUrl }
}
