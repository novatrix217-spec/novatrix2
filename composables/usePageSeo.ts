import type { MaybeRefOrGetter } from 'vue'

/**
 * Métadonnées SEO d'une page : title, description, canonical, Open Graph et Twitter Card.
 *
 * Accepte des valeurs réactives (ref/computed/getter) : les pages sont bilingues et leurs
 * titres changent avec la locale — passer des chaînes figées gèlerait les métadonnées sur
 * la langue du premier rendu.
 *
 * `ogLocale` suit la locale courante : annoncer `fr_FR` sur une page `/en` induit en erreur
 * les aperçus de partage et les moteurs.
 */
export function usePageSeo(
  title: MaybeRefOrGetter<string>,
  description: MaybeRefOrGetter<string>,
  image: MaybeRefOrGetter<string> = '/og-default.png',
  type: MaybeRefOrGetter<'website' | 'article'> = 'website',
) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { locale } = useI18n()
  const base = String(config.public.siteUrl).replace(/\/$/, '')
  const canonical = computed(() => `${base}${route.path}`)
  const absoluteImage = computed(() => {
    const src = toValue(image)
    return /^https?:\/\//i.test(src) ? src : `${base}${src}`
  })

  useSeoMeta({
    title: () => toValue(title),
    description: () => toValue(description),
    ogTitle: () => toValue(title),
    ogDescription: () => toValue(description),
    // `article` sur les pages d'article : les réseaux et les moteurs distinguent un contenu
    // éditorial daté d'une page de site, et l'aperçu de partage n'est pas le même.
    ogType: () => toValue(type),
    ogUrl: canonical,
    ogImage: absoluteImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    // Le type n'est annoncé que pour les formats que `useSeoMeta` accepte. Il était figé à
    // image/png, ce qui décrivait faussement les couvertures d'article en .webp ; mieux
    // vaut ne rien annoncer que d'annoncer un format erroné, les réseaux le détectant seuls.
    ogImageType: () => {
      const src = toValue(image)
      if (/\.jpe?g($|\?)/i.test(src)) return 'image/jpeg'
      if (/\.png($|\?)/i.test(src)) return 'image/png'
      return undefined
    },
    ogLocale: () => (locale.value === 'en' ? 'en_US' : 'fr_FR'),
    ogSiteName: 'NovatrixAI',
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(title),
    twitterDescription: () => toValue(description),
    twitterImage: absoluteImage,
  })
  // Pas de <link rel="canonical"> ici : @nuxtjs/i18n l'émet déjà à partir de `baseUrl`
  // (cf. nuxt.config.ts). En ajouter un second créerait un doublon dans le <head>.
}
