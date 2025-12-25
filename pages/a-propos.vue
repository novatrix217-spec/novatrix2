<script setup>
import profileData from '~/comeup_extraction_finale.json';

const profile = profileData.profile;
const stats = profileData.statistics;

const title = "À Propos | Agence IA & Automatisation - Notre Mission, Valeurs & Expertise - Novatrix AI";
const description = "NovatrixAI : agence spécialisée IA et automatisation depuis 2024. Nous aidons entrepreneurs et entreprises à gagner du temps, automatiser leurs processus et intégrer l'IA. 22 avis 5★, 24 services, 36 réalisations. Découvrez notre expertise.";
const siteUrl = "https://novatrixai.com/a-propos";

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
        "@type": "AboutPage",
        "name": "À Propos de Novatrix AI",
        "description": description,
        "url": siteUrl,
        "mainEntity": {
          "@type": "Organization",
          "name": "Novatrix AI",
          "url": "https://novatrixai.com",
          "logo": "https://novatrixai.com/logo.png",
          "description": profile.bio,
          "foundingDate": "2024",
          "slogan": profile.name,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": profile.reviewCount,
            "bestRating": "5"
          },
          "sameAs": [
            "https://www.linkedin.com/company/novatrix-ai",
            "https://twitter.com/novatrix_ai",
            "https://comeup.com/fr/@novatrixai"
          ]
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
      content: "À propos Novatrix AI, Agence IA France, Automatisation entreprise, Transformation digitale, Développement IA sur mesure, Innovation technologique, Expertise Make Zapier, Spécialiste chatbot, Agence automatisation, Intelligence artificielle PME, Solutions IA startup, Partenaire digital, Consultant IA, Avis Novatrix, Équipe IA",
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

const values = [
  {
    title: 'Innovation',
    description: 'À la pointe de la technologie pour des solutions performantes',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Résultats',
    description: 'Des projets conçus pour un impact réel et mesurable',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Proximité',
    description: 'Un accompagnement personnalisé à chaque étape',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    title: 'Efficacité',
    description: 'Optimisation de vos processus pour gagner du temps',
    gradient: 'from-violet-500 to-purple-500'
  }
];

const expertise = [
  {
    title: 'Intelligence Artificielle',
    items: ['Chatbots & Agents IA', 'Modèles GPT personnalisés', 'API ChatGPT'],
    icon: 'ai'
  },
  {
    title: 'Automatisation',
    items: ['Make & Zapier', 'Python & N8N', 'Intégration CRM'],
    icon: 'auto'
  },
  {
    title: 'Développement Web',
    items: ['Applications SaaS', 'APIs Node.js', 'Sites sur mesure'],
    icon: 'web'
  },
  {
    title: 'Services Techniques',
    items: ['Serveurs VPS', 'Web Scraping', 'SEO & Optimisation'],
    icon: 'tech'
  }
];
</script>

<template>
  <div class="min-h-screen bg-white font-poppins mb-8">
    <!-- Hero Section -->
    <section class="relative py-24 px-5 sm:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
      <div class="max-w-6xl mx-auto relative z-10">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 font-volkhov">
          À Propos de Novatrix AI
        </h1>
        <p class="text-2xl md:text-3xl mb-8 font-light opacity-95">
          {{ profile.name }}
        </p>
        <div class="flex flex-wrap gap-6 text-base">
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
            <span class="font-semibold">{{ profile.reviewCount }} Avis 5/5</span>
          </div>
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="font-semibold">{{ profile.portfolioCount }} Projets</span>
          </div>
          <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="font-semibold">{{ profile.serviceCount }} Services</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 px-5 sm:px-16">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-blue-600 font-semibold mb-3 uppercase tracking-wide">Notre Mission</p>
          <h2 class="text-4xl md:text-5xl font-bold mb-8 text-gray-900 font-volkhov">
            Transformer vos idées en solutions concrètes
          </h2>
        </div>

        <div class="space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
          <p class="text-lg sm:text-xl font-semibold text-gray-900">
            NovatrixAI aide les entrepreneurs et entreprises à gagner du temps, augmenter leur efficacité et automatiser leurs tâches grâce à l'intelligence artificielle et au développement sur mesure.
          </p>
          
          <p>
            Notre objectif : transformer vos idées en solutions concrètes qui améliorent immédiatement votre performance. Nous créons des outils qui réduisent votre charge de travail, optimisent vos processus et boostent vos résultats.
          </p>

          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 my-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Ce que nous faisons pour vous</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Bots Discord sur mesure pour dynamiser vos communautés</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Applications intégrant l'API ChatGPT</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>APIs performantes avec Node.js</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Sites WordPress optimisés SEO</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Web scraping pour vos données</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Configuration serveurs Linux (VPS)</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Modèles GPT personnalisés</span>
              </div>
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Solutions techniques sur mesure</span>
              </div>
            </div>
          </div>

          <p class="text-center text-xl font-semibold text-gray-900 pt-6">
            Chaque projet est conçu pour vous apporter des résultats réels, mesurables et durables. Vous avez une idée ? Nous la transformons en solution digitale performante.
          </p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 px-5 sm:px-16 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12">
          <p class="text-blue-600 font-semibold mb-3 uppercase tracking-wide text-center">Nos Valeurs</p>
          <h2 class="text-4xl font-bold text-gray-900 font-volkhov text-center">Ce qui nous guide</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="group relative bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            <div :class="`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity`"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-3 text-gray-800 text-left">{{ value.title }}</h3>
              <p class="text-gray-600 text-left">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Expertise Section -->
    <section class="py-20 px-5 sm:px-16">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-blue-600 font-semibold mb-3 uppercase tracking-wide">Notre Expertise</p>
          <h2 class="text-4xl font-bold text-gray-900 font-volkhov">Technologies & Services</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(area, index) in expertise"
            :key="index"
            class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
          >
            <div class="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg v-if="area.icon === 'ai'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <svg v-if="area.icon === 'auto'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <svg v-if="area.icon === 'web'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              <svg v-if="area.icon === 'tech'" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">{{ area.title }}</h3>
            <ul class="space-y-2">
              <li
                v-for="(item, idx) in area.items"
                :key="idx"
                class="flex items-center gap-2 text-sm text-gray-700"
              >
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-5 sm:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 font-volkhov">Prêt à démarrer votre projet ?</h2>
        <p class="text-xl mb-10 opacity-90">
          Transformons ensemble vos défis en opportunités de croissance
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/2290163774295"
            target="_blank"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Contactez-nous sur WhatsApp
          </a>
          <a
            href="https://comeup.com/fr/@novatrixai"
            target="_blank"
            class="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
          >
            Voir notre profil ComeUp
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
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

.prose {
  max-width: 65ch;
}
</style>
