/**
 * Lien WhatsApp public, construit à partir de `runtimeConfig.public.whatsappUrl`
 * (cf. nuxt.config.ts). Valide que l'URL configurée pointe bien vers wa.me/whatsapp.com
 * avant de l'exposer, pour éviter d'ouvrir une URL arbitraire si la variable d'env est
 * mal formée.
 *
 * Aucun numéro par défaut : tant que NUXT_PUBLIC_WHATSAPP_URL n'est pas renseignée,
 * `whatsappUrl` vaut '' et `hasWhatsapp` est faux. Les CTA doivent alors être masqués
 * plutôt que d'envoyer les prospects vers un numéro inexistant.
 */
export function useWhatsapp() {
  const configuredUrl = useRuntimeConfig().public.whatsappUrl
  const whatsappUrl = (() => {
    if (typeof configuredUrl !== 'string' || !configuredUrl.trim()) return ''
    try {
      const parsed = new URL(configuredUrl.trim())
      const isWhatsappHost = parsed.hostname === 'wa.me' || parsed.hostname.endsWith('.whatsapp.com')
      if (parsed.protocol !== 'https:' || !isWhatsappHost) return ''
      // Un wa.me sans numéro exploitable (placeholder à zéros) ne doit pas être affiché.
      const digits = parsed.pathname.replace(/\D/g, '')
      if (parsed.hostname === 'wa.me' && (digits.length < 8 || /^0+$/.test(digits.replace(/^229/, '')))) return ''
      return parsed.toString()
    } catch {
      return ''
    }
  })()

  return { whatsappUrl, hasWhatsapp: Boolean(whatsappUrl) }
}
