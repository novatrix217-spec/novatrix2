<template>
  <NuxtLoadingIndicator color="#6D28D9" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NovatrixAI',
      url: useRuntimeConfig().public.siteUrl,
      address: { '@type': 'PostalAddress', addressLocality: 'Cotonou', addressCountry: 'BJ' },
      description: "Agence de systèmes IA pour l'acquisition, le pilotage et la création d'applications sur mesure.",
    }),
  }],
})
</script>
