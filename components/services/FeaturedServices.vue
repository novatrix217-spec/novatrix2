<script setup>
import servicesData from '~/comeup_extraction_finale.json';

// Get first 6 services for homepage
const featuredServices = servicesData.services.slice(0, 6);

// Function to clean service titles
const cleanTitle = (title) => {
  return title.replace(/^(Je vais |je vais )/i, '').replace(/^([a-z])/, (match) => match.toUpperCase());
};
</script>

<template>
  <section class="py-16 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <p class="uppercase font-semibold text-blue-600 mb-2">Services</p>
        <h2 class="text-4xl sm:text-5xl font-bold text-[#14183E] mb-4 font-volkhov">
          Nos Services d'IA et d'Automatisation
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Des solutions innovantes pour transformer votre business avec l'intelligence artificielle
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article
          v-for="(service, index) in featuredServices"
          :key="index"
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
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
            <h3 class="text-xl font-bold mb-3 text-gray-800 min-h-[3.5rem] line-clamp-2">
              {{ cleanTitle(service.title) }}
            </h3>
            <div v-if="service.rating" class="flex items-center gap-2 mb-3">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span class="text-sm text-gray-600">{{ service.rating }}</span>
            </div>
            <p v-if="service.description" class="text-gray-600 mb-4 text-sm">
              {{ service.description }}
            </p>
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

      <div class="text-center">
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl transition-all"
        >
          Voir tous nos services
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>
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
</style>
