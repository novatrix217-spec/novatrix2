<script setup>
import Hero from "~/components/hero/index.vue";
import Category from "~/components/category/index.vue";
import Destinations from "~/components/destinations/index.vue";
import Bookings from "~/components/bookings/index.vue";
import Testimonials from "~/components/testimonials/index.vue";
import Companies from "~/components/companies/index.vue";
import Subscribe from "~/components/subscribe/index.vue";

onMounted(() => {
  if (import.meta.client) {
    ScrollReveal().reveal(".headline", { delay: 650 });
    ScrollReveal().reveal(".headline2", {
      delay: 650,
    });
  }
  ScrollReveal().reveal(".headline1", {
    delay: 650,
  });
});

useHead({
  script: [
    {
      src: "https://unpkg.com/scrollreveal",
    },
  ],
  htmlAttrs: {
    lang: "fr",
  },
  meta: [
    {
      property: "og:title",
      content: `Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
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
      content: `Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
    },
    {
      name: "twitter:description",
      content:
        "Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA  et l'innovation technologique. Nous développons des applications web et mobiles, des modèles IA, des solutions d'automatisation et d'intégration IA.",
    },
    { name: "twitter:site", content: "https://novatrixai.com" },
  ],
  title: `Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
});
</script>

<template>
  <Hero />
  <Category class="headline1" />
  <Destinations class="headline2" />
  <Bookings class="headline" />
  <!-- <LazyTestimonials />
  <LazyCompanies /> -->
  <Subscribe class="headline" />
</template>
