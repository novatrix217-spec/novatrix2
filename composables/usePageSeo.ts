export function usePageSeo(title: string, description: string, image = '/og-default.png') {
  const config = useRuntimeConfig()
  const route = useRoute()
  const base = String(config.public.siteUrl).replace(/\/$/, '')
  const canonical = computed(() => `${base}${route.path}`)
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage: () => `${base}${image}`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    ogLocale: 'fr_FR',
    ogSiteName: 'NovatrixAI',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: () => `${base}${image}`,
  })
  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
