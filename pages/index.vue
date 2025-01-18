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
    ScrollReveal().reveal(".headline", { delay: 400 });
  }
  ScrollReveal().reveal(".headline1", { delay: 400 });
});

useHead({
  script: [
    {
      src: "https://unpkg.com/scrollreveal",
    },
  ],
});
</script>

<template>
  <Hero />
  <Category class="headline1" />
  <Destinations class="headline" />
  <Bookings class="headline" />
  <!-- <LazyTestimonials />
  <LazyCompanies /> -->
  <Subscribe class="headline" />
</template>
