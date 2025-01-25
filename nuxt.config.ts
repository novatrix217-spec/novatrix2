// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      meta: [
        {
          property: "og:title",
          content: `Novatrix AI est une agence de développement informatique spécialisée dans l'Intelligence Artificielle IA et l'innovation technologique - Agence de développement d'applications IA - Développement Web - Applications Mobiles - Création de Modèles IA - Automatisation & Intégration IA`,
        },
        {
          name: "favicon",
          content: "/favicon.ico",
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
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    config: {
      theme: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          volkhov: ["Volkhov", "serif"],
        },
      },
      plugins: [require("tailwind-scrollbar-hide")],
    },
  },

  compatibilityDate: "2025-01-18",
});
