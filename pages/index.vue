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

const title = "Novatrix AI - Agence IA, Développement Web & Mobile, Automatisation & Innovation Technologique";
const description = "Novatrix AI est une agence de développement informatique spécialisée en Intelligence Artificielle (IA) et innovation. Création d'applications web/mobile, modèles IA, automatisation et intégration sur mesure.";
const siteUrl = "https://novatrixai.com";
const siteName = "Novatrix AI";
const image = "https://novatrixai.com/logo.png";
const favicon = "/favicon.ico";


useHead({
  script: [
    {
      src: "https://unpkg.com/scrollreveal",
    },
    ,
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
        logo: image,
        sameAs: [
          "https://www.linkedin.com/company/novatrix-ai",
          "https://twitter.com/novatrix_ai"
        ],
        description,
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR"
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+229 01 52 74 69 12",
          contactType: "customer support",
          areaServed: "FR",
          availableLanguage: ["French", "English"]
        }
      }),
    }
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
        "Nous développons des applications web et mobiles, des modèles IA, des solutions d'automatisation et d'intégration IA. Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique. ",
    },
    {
      name: "keywords",
      content:
        "Développement Web,  Applications Mobiles, Création de Modèles IA, Automatisation & Intégration IA, Des solutions adaptées à vos besoins, Développement d'applications IA, Développement d'applications web, Développement d'applications mobiles, Développement de modèles IA, Automatisation et intégration IA",
    },
    {
      name: "favicon",
      content: "/favicon.ico",
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



useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,

  description,
  ogDescription: description,
  twitterDescription: description,

  ogUrl: siteUrl,
  twitterSite: "@novatrix_ai", // handle Twitter
  twitterCard: "summary_large_image",

  ogSiteName: siteName,
  ogType: "website",
  ogLocale: "fr_FR",

  keywords:
    "Développement Web, Applications Mobiles, Intelligence Artificielle, Modèles IA, Automatisation, Intégration IA, Agence IA, Développement IA, IA sur mesure, Solutions IA, Startups IA",

  ogImage: image,
  ogImageUrl: image,
  twitterImage: image,
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
