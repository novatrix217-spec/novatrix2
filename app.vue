<template>
  <NuxtLoadingIndicator color="#6D28D9" />
  <NuxtLayout><NuxtPage /></NuxtLayout>
  <BookingDialog />
</template>

<script setup lang="ts">
const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
const { locale } = useI18n()
const i18nHead = useLocaleHead()
const { englishAlternateAvailable } = useEnglishAlternateAvailability()
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link?.filter((link) => {
    const hreflang = String(link.hreflang || '').toLowerCase()
    const isEnglishAlternate = link.rel === 'alternate' && (hreflang === 'en' || hreflang.startsWith('en-'))
    return englishAlternateAvailable.value || !isEnglishAlternate
  }),
  meta: i18nHead.value.meta,
}))
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization', '@id': `${site}#organization`, name: 'NovatrixAI', url: site,
          logo: { '@type': 'ImageObject', url: `${site}/favicon-192x192.png` },
          address: { '@type': 'PostalAddress', addressLocality: 'Cotonou', addressCountry: 'BJ' },
          email: 'contact@novatrixai.com',
          description: locale.value === 'en'
            ? 'NovatrixAI connects acquisition, AI-assisted operations and custom digital products from Cotonou for local and remote teams.'
            : 'NovatrixAI relie acquisition, opérations assistées par IA et produits numériques sur mesure depuis Cotonou, sur place et à distance.',
          areaServed: locale.value === 'en' ? ['Benin', 'West Africa', 'Remote'] : ['Bénin', 'Afrique de l’Ouest', 'À distance'],
          knowsLanguage: ['fr', 'en'],
        },
        {
          '@type': 'WebSite', '@id': `${site}#website`, url: site, name: 'NovatrixAI',
          publisher: { '@id': `${site}#organization` }, inLanguage: locale.value === 'en' ? 'en-US' : 'fr-FR',
        },
      ],
    }),
  }],
}))
</script>
