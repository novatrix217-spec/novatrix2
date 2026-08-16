<template>
  <NuxtLoadingIndicator color="#6D28D9" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const site = useRuntimeConfig().public.siteUrl
const i18nHead = useLocaleHead({ addSeoAttributes: true })
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
}))
useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${site}#organization`,
          name: 'NovatrixAI',
          url: site,
          logo: { '@type': 'ImageObject', url: `${site}/favicon-192x192.png` },
          address: { '@type': 'PostalAddress', addressLocality: 'Cotonou', addressCountry: 'BJ' },
          email: 'contact@novatrixai.com',
          description: "Agence de systèmes IA pour l'acquisition, le pilotage et la création d'applications sur mesure. Basée à Cotonou, au service d'une clientèle francophone et internationale.",
          areaServed: ['Bénin', 'Afrique de l\'Ouest', 'Francophonie'],
          knowsLanguage: 'fr',
        },
        {
          '@type': 'WebSite',
          '@id': `${site}#website`,
          url: site,
          name: 'NovatrixAI',
          publisher: { '@id': `${site}#organization` },
          inLanguage: 'fr',
        },
      ],
    }),
  }],
})
</script>
