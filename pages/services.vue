<script setup>
import servicesData from '~/comeup_extraction_finale.json';

const services = servicesData.services;

// Function to clean service titles
const cleanTitle = (title) => {
  return title.replace(/^(Je vais |je vais )/i, '').replace(/^([a-z])/, (match) => match.toUpperCase());
};

const title = "Nos Services IA & Automatisation | Chatbots, Make, Zapier, Développement - Novatrix AI";
const description = "Services IA professionnels : création d'applications SaaS IA, chatbots intelligents, automatisation Make/Zapier, développement WordPress, configuration serveurs Linux, intégration GPT, web scraping. Solutions sur mesure pour votre business.";
const siteUrl = "https://novatrixai.com/services";

useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl
    }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Intelligence Artificielle et Automatisation",
        "provider": {
          "@type": "Organization",
          "name": "Novatrix AI",
          "url": "https://novatrixai.com"
        },
        "areaServed": "FR",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services IA et Automatisation",
          "itemListElement": services.map((service, index) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": service.title,
              "image": service.image
            }
          }))
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
      content: title,
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "keywords",
      content: "Services IA, Automatisation Make, Automatisation Zapier, Chatbot IA, Application SaaS IA, WordPress, Bot Discord, Bot Telegram, API NodeJS, GPT-4, Web scraping, Serveur Linux VPS, Agent IA, Génération de leads, E-commerce IA, Assistant GPT, Tunnel de vente, Automatisation Python, Site web Odoo, Intégration Shopify, SEO IA",
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: siteUrl,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
  ],
  title: title,
});

useSeoMeta({
  title,
  ogTitle: title,
  twitterTitle: title,
  description,
  ogDescription: description,
  twitterDescription: description,
  ogUrl: siteUrl,
  twitterSite: "@novatrix_ai",
  twitterCard: "summary_large_image",
  ogSiteName: "Novatrix AI",
  ogType: "website",
  ogLocale: "fr_FR",
});
</script>

<template>
  <div class="min-h-screen bg-white font-poppins mb-8">
    <!-- Hero Section -->
    <section class="py-20 px-5 sm:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in font-volkhov">
          Nos Services d'IA et d'Automatisation
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90 font-poppins">
          Des solutions innovantes pour automatiser votre business et booster votre productivité
        </p>
        <div class="flex flex-wrap gap-4 text-sm md:text-base">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{{ services.length }} Services Disponibles</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span>Solutions Sur Mesure</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Support Dédié</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16 px-5 sm:px-16">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="(service, index) in services"
            :key="index"
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
          >
            <div class="relative overflow-hidden h-48">
              <img
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                {{ cleanTitle(service.title) }}
              </h2>
              <div v-if="service.rating" class="flex items-center gap-2 mb-3">
                <div class="flex text-yellow-400">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <span class="text-sm text-gray-600">{{ service.rating }}</span>
              </div>
              <a
                :href="service.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                En savoir plus
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-5 sm:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6 font-volkhov">Prêt à transformer votre business ?</h2>
        <p class="text-xl mb-8 opacity-90">
          Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nos services peuvent vous aider.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/2290163774295"
            target="_blank"
            class="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Nous contacter sur WhatsApp
          </a>
          <a
            href="https://comeup.com/fr/@novatrixai"
            target="_blank"
            class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-colors"
          >
            Voir notre profil ComeUp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
