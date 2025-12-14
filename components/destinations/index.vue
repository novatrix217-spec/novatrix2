<script setup>
import 'vue3-carousel/carousel.css'
import data from '~/rendu.json'

const portfolio = data.portfolio || []

const selectedItem = ref(null)
function openModal(item) {
  selectedItem.value = item
}
function closeModal() {
  selectedItem.value = null
}

/* carousel settings */
const settings = {
  itemsToShow: 4,
  wrapAround: true,
  autoplay: 2500,
  pauseAutoplayOnHover: true,
  breakpoints: {
    0: {
      itemsToShow: 1
    },
    640: {
      itemsToShow: 2
    },
    1024: {
      itemsToShow: 4
    }
  }
}
</script>

<template>
<section id="realisations" class="p-6 sm:p-20 font-poppins">

  <div class="text-center space-y-3 mb-12">
    <p class="capitalize font-semibold text-gray-600">Nos Réalisations</p>
    <h2 class="text-[#14183E] font-bold text-4xl sm:text-5xl font-volkhov">
      Ce que nous avons accompli
    </h2>
  </div>

  <Carousel v-bind="settings">

    <Slide v-for="item in portfolio.slice(0,12)" :key="item.id">
      <div class="cursor-pointer" @click="openModal(item)">
        <nuxt-img
          format="webp"
          :src="item.image"
          :alt="item.title"
          class="w-full h-64 object-contain rounded-t-3xl"
        />
        <div class="p-4 bg-white shadow-md rounded-b-3xl">
          <div class="flex justify-between mb-2">
            <p class="font-medium text-gray-700">{{ item.title }}</p>
            <span class="text-xs text-gray-400">Projet</span>
          </div>
          <p class="text-gray-500 truncate">
            {{ item.shortDescription || item.description }}
          </p>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>

  </Carousel>

  <teleport to="body">
    <div
      v-if="selectedItem"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-xl p-8 max-w-3xl w-full relative">
        <button
          class="absolute top-4 right-4 text-lg"
          @click="closeModal"
        >✕</button>

        <nuxt-img
          :src="selectedItem.image"
          :alt="selectedItem.title"
          class="w-full h-80 object-cover rounded-md mb-4"
        />

        <h3 class="text-2xl font-bold mb-2">{{ selectedItem.title }}</h3>
        <p class="text-gray-600">
          {{ selectedItem.description }}
        </p>
      </div>
    </div>
  </teleport>

</section>
</template>
