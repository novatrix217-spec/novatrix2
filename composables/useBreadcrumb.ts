/**
 * Fil d'Ariane en JSON-LD (BreadcrumbList).
 *
 * Google affiche ce fil à la place de l'URL brute dans ses résultats : c'est l'un des rares
 * schémas encore exploités pour l'apparence en SERP (FAQPage et HowTo ne le sont plus).
 *
 * L'accueil est ajouté automatiquement en première position — il ne faut donc pas le passer
 * dans `trail`. Les URLs sont absolues et préfixées par la locale, comme l'exige Google.
 *
 * Usage :
 *   useBreadcrumb(() => [{ name: t.value.title, path: '/offres/acquisition' }])
 */
export function useBreadcrumb(
  trail: MaybeRefOrGetter<{ name: string; path: string }[]>,
) {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const site = String(config.public.siteUrl).replace(/\/$/, '')

  useHead(() => {
    const prefix = locale.value === 'en' ? '/en' : ''
    const items = [
      { '@type': 'ListItem', position: 1, name: locale.value === 'en' ? 'Home' : 'Accueil', item: `${site}${prefix || '/'}` },
      ...toValue(trail).map((entry, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: entry.name,
        item: `${site}${prefix}${entry.path}`,
      })),
    ]
    return {
      script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }),
      }],
    }
  })
}
