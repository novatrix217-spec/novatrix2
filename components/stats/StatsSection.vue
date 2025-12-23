<script setup>
import { ref } from 'vue';
import profileData from '~/comeup_extraction_finale.json';

const stats = [
  {
    number: profileData.statistics.totalPortfolioItems || 36,
    label: 'Projets Réalisés',
    icon: 'rocket',
    suffix: '+'
  },
  {
    number: profileData.statistics.totalServices || 24,
    label: 'Services Proposés',
    icon: 'bolt',
    suffix: ''
  },
  {
    number: profileData.profile.reviewCount || 22,
    label: 'Clients Satisfaits',
    icon: 'star',
    suffix: '+'
  },
  {
    number: 100,
    label: 'Satisfaction Client',
    icon: 'check',
    suffix: '%'
  }
];

const inView = ref(false);
const animatedNumbers = ref(stats.map(() => 0));

const animateNumber = (index, target) => {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      animatedNumbers.value[index] = target;
      clearInterval(timer);
    } else {
      animatedNumbers.value[index] = Math.floor(current);
    }
  }, duration / steps);
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !inView.value) {
        inView.value = true;
        stats.forEach((stat, index) => {
          setTimeout(() => animateNumber(index, stat.number), index * 100);
        });
      }
    });
  }, { threshold: 0.2 });

  const element = document.querySelector('.stats-section');
  if (element) observer.observe(element);
});
</script>

<template>
  <section class="stats-section py-16 px-5 sm:px-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-poppins">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl sm:text-5xl font-bold mb-4 font-volkhov">
          Nos Chiffres Clés
        </h2>
        <p class="text-xl opacity-90">
          Des résultats qui parlent d'eux-mêmes
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center transform hover:scale-105 transition-transform duration-300"
        >
          <div class="mb-4 flex items-center justify-center">
            <!-- Rocket icon -->
            <svg v-if="stat.icon === 'rocket'" class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <!-- Bolt icon -->
            <svg v-if="stat.icon === 'bolt'" class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
            </svg>
            <!-- Star icon -->
            <svg v-if="stat.icon === 'star'" class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <!-- Check circle icon -->
            <svg v-if="stat.icon === 'check'" class="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="text-5xl sm:text-6xl font-bold mb-2">
            {{ animatedNumbers[index] }}{{ stat.suffix }}
          </div>
          <div class="text-lg opacity-90">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
