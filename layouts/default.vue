<script setup>
import Footer from "~/components/global/Footer.vue";
useHead({
  htmlAttrs: {
    lang: "fr",
  },
  meta: [
    {
      property: "og:title",
      content: `Novatrix AI - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
    },
    {
      property: "og:site:name",
      content: `Novatrix AI - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
    },
    {
      name: "description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique. Nous développons des applications web et mobiles, des modèles IA, des solutions d'automatisation et d'intégration IA.",
    },
    {
      name: "keywords",
      content:
        "Développement Web,  Applications Mobiles, Création de Modèles IA, Automatisation & Intégration IA, Des solutions adaptées à vos besoins, Développement d'applications IA, Développement d'applications web, Développement d'applications mobiles, Développement de modèles IA, Automatisation et intégration IA",
    },
    {
      property: "og:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique. Nous développons des applications web et mobiles, des modèles IA, des solutions d'automatisation et d'intégration IA.",
    },
    { property: "og:url", content: "https://novatrixai.com" },
    {
      name: "twitter:title",
      content:
        "Novatrix AI - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA",
    },
    {
      name: "twitter:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique. Nous développons des applications web et mobiles, des modèles IA, des solutions d'automatisation et d'intégration IA.",
    },
    { name: "twitter:site", content: "https://novatrixai.com" },
  ],
  title: `Novatrix AI - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
});
</script>

<template>
  <main class="max-w-8xl">
    <slot />
    <Footer />
  </main>
</template>
