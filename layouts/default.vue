<script setup>
import Footer from "~/components/global/Footer.vue";
useHead({
  htmlAttrs: {
    lang: "fr",
  },
  meta: [
    {
      property: "og:title",
      content: `Novatrix AI - Agence de développement d'applications IA`,
    },
    {
      property: "og:site:name",
      content: `Novatrix AI - Agence de développement d'applications IA`,
    },
    {
      name: "description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique.",
    },
    {
      name: "keywords",
      content:
        "Développement Web,  Applications Mobiles, Création de Modèles IA, Automatisation & Intégration IA, Des solutions adaptées à vos besoins",
    },
    {
      property: "og:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique.",
    },
    { property: "og:url", content: "https://novatrixai.com" },
    {
      name: "twitter:title",
      content: "Novatrix AI - Agence de développement d'applications IA",
    },
    {
      name: "twitter:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique.",
    },
    { name: "twitter:site", content: "https://novatrixai.com" },
  ],
  title: `Novatrix AI - Agence de développement d'applications IA`,
});
</script>

<template>
  <main class="max-w-8xl">
    <slot />
    <Footer />
  </main>
</template>
