<script setup>
import portfolioData from '~/rendu.json';

// Use portfolio from rendu.json
const allProjects = portfolioData.portfolio;

// Show 6 projects on homepage
const featuredProjects = allProjects.slice(0, 6);

// Modal state
const selectedProject = ref(null);
const showModal = ref(false);

const openModal = (project) => {
  selectedProject.value = project;
  showModal.value = true;
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  showModal.value = false;
  selectedProject.value = null;
  document.body.style.overflow = '';
};

// Truncate description to 120 characters
const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

const title = "Portfolio & Réalisations IA | Projets d'Automatisation & Développement - Novatrix AI";
const description = "Découvrez nos réalisations : automatisations Make/Zapier, chatbots IA, agents intelligents, intégrations GPT, sites web, applications SaaS. 14+ projets réussis pour booster la productivité de nos clients.";
const siteUrl = "https://novatrixai.com/realisations";

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
        "@type": "CollectionPage",
        "name": "Réalisations Novatrix AI",
        "description": description,
        "url": siteUrl,
        "publisher": {
          "@type": "Organization",
          "name": "Novatrix AI",
          "url": "https://novatrixai.com"
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": allProjects.map((project, index) => ({
            "@type": "CreativeWork",
            "position": index + 1,
            "name": project.title,
            "description": project.description || project.title
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
      content: "Portfolio IA, Réalisations automatisation, Projets Make, Projets Zapier, Chatbot projet, Agent IA réalisé, Application SaaS créée, Intégration GPT, CRM automatisation, Publication automatique réseaux sociaux, Web scraping projet, Bot Discord réalisé, Tunnel de vente, Facturation automatique, Signature électronique, Agenda intelligent",
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

// Categories for filtering
const categories = [
  { name: 'Tous', value: 'all' },
  { name: 'Automatisation', value: 'automatisation' },
  { name: 'IA & Chatbot', value: 'ia' },
  { name: 'Site Web', value: 'web' },
  { name: 'CRM', value: 'crm' },
];

const selectedCategory = ref('all');

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return allProjects;
  }
  
  return allProjects.filter(project => {
    const title = project.title.toLowerCase();
    const desc = (project.description || '').toLowerCase();
    const searchText = title + ' ' + desc;
    
    switch(selectedCategory.value) {
      case 'automatisation':
        return searchText.includes('automatisation') || searchText.includes('automation');
      case 'ia':
        return searchText.includes('ia') || searchText.includes('chatbot') || searchText.includes('gpt') || searchText.includes('agent');
      case 'web':
        return searchText.includes('site') || searchText.includes('web') || searchText.includes('wordpress');
      case 'crm':
        return searchText.includes('crm') || searchText.includes('contact');
      default:
        return true;
    }
  });
});
</script>

<template>
  <div class="min-h-screen bg-white font-poppins mb-8">
    <!-- Hero Section -->
    <section class="py-20 px-5 sm:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-fade-in font-volkhov">
          Nos Réalisations
        </h1>
        <p class="text-xl md:text-2xl mb-8 opacity-90 font-poppins">
          Découvrez les projets que nous avons réalisés pour nos clients
        </p>
        <div class="flex flex-wrap gap-4 text-sm md:text-base">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ allProjects.length }}+ Projets Réalisés</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
            </svg>
            <span>Clients Satisfaits</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="py-8 px-5 sm:px-16 bg-white shadow-md sticky top-0 z-10">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'px-6 py-2 rounded-full font-semibold transition-all',
              selectedCategory === category.value
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-16 px-5 sm:px-16">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="(project, index) in filteredProjects"
            :key="index"
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
            @click="openModal(project)"
          >
            <div class="relative overflow-hidden h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div v-else class="text-white text-6xl opacity-20">
                <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                  Projet #{{ index + 1 }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-xl font-bold mb-3 text-gray-800 min-h-[3.5rem]">
                {{ project.title }}
              </h2>
              <p v-if="project.description" class="text-gray-600 mb-4 text-sm">
                {{ truncateText(project.description, 120) }}
              </p>
              <div class="flex items-center gap-2 text-blue-600 mt-4">
                <span class="text-sm font-semibold">Voir plus de détails</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </article>
        </div>

        <div v-if="filteredProjects.length === 0" class="text-center py-16">
          <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-xl text-gray-600">Aucun projet trouvé dans cette catégorie</p>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showModal && selectedProject" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          @click.self="closeModal"
        >
          <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <!-- Modal Header with Image -->
            <div class="relative h-64 bg-gradient-to-br from-blue-600 to-purple-600">
              <img
                v-if="selectedProject.image"
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex items-center justify-center h-full">
                <svg class="w-24 h-24 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <button
                @click="closeModal"
                class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="p-8">
              <h2 class="text-3xl font-bold mb-4 text-gray-800 font-volkhov">
                {{ selectedProject.title }}
              </h2>
              
              <div v-if="selectedProject.shortDescription" class="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <p class="text-gray-700 font-semibold">
                  {{ selectedProject.shortDescription }}
                </p>
              </div>

              <div class="prose prose-lg max-w-none">
                <h3 class="text-xl font-semibold mb-3 text-gray-800">Description du projet</h3>
                <p class="text-gray-600 leading-relaxed whitespace-pre-line">
                  {{ selectedProject.description }}
                </p>
              </div>

              <div class="mt-8 flex items-center gap-4">
                <button
                  @click="closeModal"
                  class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Stats Section -->
    <section class="py-16 px-5 sm:px-16 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800 font-volkhov">Nos Chiffres Clés</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">{{ allProjects.length }}+</div>
            <div class="text-sm sm:text-base text-gray-700">Projets Réalisés</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-2">22</div>
            <div class="text-sm sm:text-base text-gray-700">Avis Clients</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">24</div>
            <div class="text-sm sm:text-base text-gray-700">Services Proposés</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600 mb-2">100%</div>
            <div class="text-sm sm:text-base text-gray-700">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-5 sm:px-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6 font-volkhov">Votre projet sera le prochain ?</h2>
        <p class="text-xl mb-8 opacity-90">
          Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider.
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
            Démarrer un projet
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
</style>
