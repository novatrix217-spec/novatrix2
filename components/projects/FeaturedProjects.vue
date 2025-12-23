<script setup>
import data from '~/rendu.json'
import { ref } from 'vue';

// Get first 3 projects from rendu.json
const portfolio = data.portfolio || []
const featuredProjects = portfolio.slice(0, 3);

const selectedProject = ref(null);

const openModal = (project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};

const categories = ['IA', 'Web', 'Automatisation', 'CRM'];
const getCategory = (index) => categories[index % categories.length];
</script>

<template>
  <section class="py-16 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <p class="uppercase font-semibold text-blue-600 mb-2">Portfolio</p>
        <h2 class="text-4xl sm:text-5xl font-bold text-[#14183E] mb-4 font-volkhov">
          Nos Dernières Réalisations
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          Découvrez quelques-uns des projets que nous avons réalisés pour nos clients
        </p>
        <NuxtLink
          to="/realisations"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl transition-all"
        >
          Voir toutes nos réalisations
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <article
        v-for="(project, index) in featuredProjects"
        :key="index"
        class="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-[400px] cursor-pointer relative"
        @click="openModal(project)"
      >
        <!-- Badge catégorie -->
        <div class="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          {{ getCategory(index) }}
        </div>

        <div class="relative overflow-hidden h-[220px] flex-shrink-0">
          <nuxt-img
            :src="project.image"
            :alt="project.title"
            format="webp"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          <!-- Overlay au hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div class="text-white text-center px-4">
              <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <p class="font-semibold">Voir les détails</p>
            </div>
          </div>
        </div>
        
        <div class="px-4 py-3 flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <p class="font-medium text-gray-700 text-[15px] leading-tight line-clamp-2">{{ project.title }}</p>
            <span class="text-xs text-gray-400 flex-shrink-0 ml-2">Projet</span>
          </div>
          <p class="text-gray-500 text-[13.5px] leading-snug line-clamp-3 whitespace-pre-wrap">
            {{ project.shortDescription || project.description }}
          </p>
        </div>
      </article>
    </div>

    <!-- Modal -->
    <teleport to="body">
      <div
        v-if="selectedProject"
        class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl p-8 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto">
          <button
            class="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            @click="closeModal"
          >
            ✕
          </button>

          <nuxt-img
            :src="selectedProject.image"
            :alt="selectedProject.title"
            format="webp"
            class="w-full h-80 object-contain rounded-xl mb-6"
          />

          <h3 class="text-3xl font-bold mb-4 text-[#14183E] font-volkhov">
            {{ selectedProject.title }}
          </h3>

          <p class="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {{ selectedProject.description }}
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/2290163774295?text=Bonjour,%20je%20suis%20intéressé%20par%20un%20projet%20similaire"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Projet similaire ?
            </a>
          </div>
        </div>
      </div>
    </teleport>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
