<script setup>
import Hero from "~/components/hero/index.vue";
import Category from "~/components/category/index.vue";
import FeaturedServices from "~/components/services/FeaturedServices.vue";
import Bookings from "~/components/bookings/index.vue";
import TestimonialsReal from "~/components/testimonials/TestimonialsReal.vue";
import FeaturedProjects from "~/components/projects/FeaturedProjects.vue";
import Companies from "~/components/companies/index.vue";
import Subscribe from "~/components/subscribe/index.vue";
import StatsSection from "~/components/stats/StatsSection.vue";
import ProcessSection from "~/components/process/ProcessSection.vue";
import FaqSection from "~/components/faq/FaqSection.vue";
import WhatsAppWidget from "~/components/whatsapp/WhatsAppWidget.vue";

onMounted(() => {
  if (import.meta.client) {
    const isMobile = window.innerWidth < 768;
    const revealConfig = {
      delay: isMobile ? 50 : 100,
      distance: isMobile ? '15px' : '20px',
      origin: 'bottom',
      duration: isMobile ? 800 : 1200,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      opacity: 0,
      scale: 0.99,
      interval: isMobile ? 50 : 100,
      reset: false,
      mobile: true,
      viewFactor: isMobile ? 0.1 : 0.2
    };
    
    ScrollReveal().reveal(".headline", revealConfig);
    ScrollReveal().reveal(".headline2", {
      ...revealConfig,
      interval: 0
    });
    ScrollReveal().reveal(".headline1", {
      ...revealConfig,
      interval: 0
    });
  }
});

const title = "Novatrix AI - Agence IA & Automatisation | Développement Web & Mobile, Chatbots IA, Make, Zapier, n8n";
const description = "Agence spécialisée en Intelligence Artificielle et automatisation. Création d'applications web/mobile, chatbots IA, automatisation Make/Zapier/n8n, développement WordPress. Solutions IA sur mesure pour entreprises et entrepreneurs.";
const siteUrl = "https://novatrixai.com";
const siteName = "Novatrix AI";
const image = "https://novatrixai.com/logo.png";
const favicon = "/favicon.ico";


useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl
    }
  ],
  script: [
    {
      src: "https://unpkg.com/scrollreveal",
    },
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
          telephone: "+229 01 63 77 42 95",
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
        "Agence IA, Intelligence Artificielle, Automatisation, Make, Zapier, n8n, Chatbot IA, Développement Web, Applications Mobiles, SaaS IA, Modèles GPT, API NodeJS, WordPress, Bot Discord, Bot Telegram, Web Scraping, Serveur Linux, Agent IA, Automatisation entreprise, Solutions IA, Développement sur mesure, Transformation digitale",
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
  <StatsSection class="headline1" />
  <FeaturedServices class="headline2" />
  <ProcessSection class="headline" />
  <FeaturedProjects class="headline" />
  <TestimonialsReal class="headline" />
  <FaqSection class="headline" />
  <Bookings class="headline" />
  <!-- <LazyCompanies /> -->
  <Subscribe class="headline" />
  <WhatsAppWidget />
</template>
