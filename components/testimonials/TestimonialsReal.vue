<script setup>
import testimonialsData from '~/comeup_extraction_finale.json';

// Filter reviews with text content
const reviews = testimonialsData.reviews.filter(review => review.text && review.text.length > 20);

// Current active testimonial
const currentIndex = ref(0);

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.length;
};

const prevTestimonial = () => {
  currentIndex.value = currentIndex.value === 0 ? reviews.length - 1 : currentIndex.value - 1;
};

// Auto-rotate testimonials
let autoplayInterval = null;

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextTestimonial();
  }, 5000); // Change every 5 seconds
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const handleManualChange = (callback) => {
  stopAutoplay();
  callback();
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <section class="p-6 sm:p-20 sm:-mt-32 font-poppins">
    <div class="lg:grid lg:grid-cols-8 space-y-6 gap-20">
      <div class="space-y-6 col-span-1 sm:col-span-3">
        <p class="uppercase font-semibold text-blue-600">Témoignages</p>
        <p class="text-[#14183E] font-bold text-4xl sm:text-5xl font-volkhov">
          Ce que nos clients disent de nous
        </p>
        <NuxtLink 
          to="/services"
          class="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Découvrir nos services
        </NuxtLink>
      </div>
      <div class="col-span-5 grid grid-cols-1 sm:grid-cols-5 gap-12">
        <div class="relative col-span-4">
          <div class="relative shadow-xl rounded-xl bg-white">
            <div class="absolute top-0 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {{ reviews[currentIndex].author.charAt(0) }}
            </div>
            <div class="space-y-7 p-10">
              <p class="text-gray-600 text-[#5E6282] italic">
                {{ reviews[currentIndex].text }}
              </p>
              <div>
                <p class="text-gray-600 text-[#5E6282] font-bold">
                  {{ reviews[currentIndex].author }}
                </p>
                <div class="flex items-center gap-1 mt-2">
                  <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="reviews.length > 1"
            class="absolute -right-3 sm:-right-12 top-[4.5rem] sm:top-24 -z-10 max-w-[19.3rem] opacity-50"
          >
            <div class="relative border rounded-xl bg-white">
              <div class="absolute top-0 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {{ reviews[(currentIndex + 1) % reviews.length].author.charAt(0) }}
              </div>
              <div class="space-y-7 p-10">
                <p class="text-gray-600 text-[#5E6282] italic line-clamp-3">
                  {{ reviews[(currentIndex + 1) % reviews.length].text }}
                </p>
                <div>
                  <p class="text-gray-600 text-[#5E6282] font-bold">
                    {{ reviews[(currentIndex + 1) % reviews.length].author }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-1 flex flex-row sm:flex-col space-x-8 sm:space-x-0 sm:space-y-8 items-center justify-center my-20 sm:my-0"
        >
          <button @click="handleManualChange(prevTestimonial)" class="hover:text-blue-600 transition-colors" aria-label="Témoignage précédent">
            <Icon name="ion:chevron-up" class="w-6 h-auto" />
          </button>
          <button @click="handleManualChange(nextTestimonial)" class="hover:text-blue-600 transition-colors" aria-label="Témoignage suivant">
            <Icon name="ion:chevron-down" class="w-6 h-auto" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
