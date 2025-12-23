<script setup>
const packages = [
  {
    name: 'Starter',
    price: '500€',
    description: 'Idéal pour démarrer',
    features: [
      'Chatbot IA simple',
      'Intégration GPT basique',
      'Site vitrine WordPress',
      'Automatisation simple',
      'Support 1 mois'
    ],
    popular: false,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Business',
    price: '1 500€',
    description: 'Le plus populaire',
    features: [
      'Application SaaS complète',
      'Chatbot IA avancé',
      'Automatisations complexes',
      'APIs personnalisées',
      'Intégrations multiples',
      'Support 3 mois'
    ],
    popular: true,
    color: 'from-purple-600 to-pink-600'
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    description: 'Solution complète',
    features: [
      'Développement sur mesure',
      'Agent IA autonome',
      'Architecture complexe',
      'Intégration système',
      'Formation équipe',
      'Support illimité'
    ],
    popular: false,
    color: 'from-blue-600 to-purple-600'
  }
];
</script>

<template>
  <section class="py-16 px-5 sm:px-20 bg-white font-poppins">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <p class="uppercase font-semibold text-blue-600 mb-2">Nos Offres</p>
        <h2 class="text-4xl sm:text-5xl font-bold text-[#14183E] mb-4 font-volkhov">
          Choisissez votre formule
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Des solutions adaptées à tous les budgets et tous les besoins
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(pkg, index) in packages"
          :key="index"
          class="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105"
          :class="{ 'ring-4 ring-purple-600 transform scale-105': pkg.popular }"
        >
          <!-- Badge Popular -->
          <div
            v-if="pkg.popular"
            class="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-bold"
          >
            POPULAIRE
          </div>

          <!-- Header -->
          <div
            class="p-8 bg-gradient-to-r text-white"
            :class="pkg.color"
          >
            <h3 class="text-2xl font-bold mb-2">{{ pkg.name }}</h3>
            <p class="text-sm opacity-90 mb-4">{{ pkg.description }}</p>
            <div class="text-4xl font-bold">{{ pkg.price }}</div>
            <div v-if="pkg.price !== 'Sur devis'" class="text-sm opacity-80">À partir de</div>
          </div>

          <!-- Features -->
          <div class="p-8">
            <ul class="space-y-4">
              <li
                v-for="(feature, idx) in pkg.features"
                :key="idx"
                class="flex items-start gap-3"
              >
                <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>

            <a
              href="https://wa.me/2290163774295?text=Bonjour,%20je%20suis%20intéressé%20par%20la%20formule"
              target="_blank"
              rel="noopener noreferrer"
              class="block mt-8 w-full text-center px-6 py-3 rounded-full font-bold transition-all"
              :class="pkg.popular 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
            >
              Choisir cette formule
            </a>
          </div>
        </div>
      </div>

      <!-- Note -->
      <div class="text-center mt-12 text-gray-600">
        <p class="text-lg">✓ Tous nos projets sont personnalisables selon vos besoins</p>
        <p class="mt-2">Contactez-nous pour un devis sur mesure</p>
      </div>
    </div>
  </section>
</template>
