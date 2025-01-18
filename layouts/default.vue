<script setup>
import Footer from "~/components/global/Footer.vue";
useHead({
  htmlAttrs: {
    lang: "fr",
  },
  meta: [
    { property: "og:title", content: `Novatrix AI` },
    {
      name: "description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique.",
    },
    {
      property: "og:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique.",
    },
    { property: "og:url", content: "https://novatrixai.com" },
    { name: "twitter:title", content: "Novatrix AI" },
    {
      name: "twitter:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique.",
    },
    { name: "twitter:site", content: "https://novatrixai.com" },
  ],
  title: `Novatrix AI`,
});
</script>

<template>
  <main class="max-w-8xl">
    <slot />
    <Footer />
  </main>
</template>
