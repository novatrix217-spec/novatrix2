<script setup>
const steps = [
  {
    number: '01',
    title: 'Consultation Gratuite',
    description: 'Échangeons sur votre projet, vos besoins et vos objectifs. Nous analysons ensemble la meilleure solution pour vous.',
    icon: 'chat'
  },
  {
    number: '02',
    title: 'Développement',
    description: 'Notre équipe conçoit et développe votre solution sur mesure avec les dernières technologies IA et web.',
    icon: 'code'
  },
  {
    number: '03',
    title: 'Livraison & Support',
    description: 'Nous livrons votre projet dans les délais convenus et assurons un suivi personnalisé pour votre réussite.',
    icon: 'rocket'
  }
];
</script>

<template>
  <section class="py-16 px-5 sm:px-20 bg-white font-poppins">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <p class="uppercase font-semibold text-blue-600 mb-2">Notre Processus</p>
        <h2 class="text-4xl sm:text-5xl font-bold text-[#14183E] mb-4 font-volkhov">
          Comment ça marche ?
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Un processus simple et transparent pour transformer vos idées en réalité
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Ligne de connexion -->
        <div class="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform -translate-y-1/2" style="width: calc(100% - 200px); margin: 0 100px;"></div>

        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-600"
        >
          <!-- Numéro -->
          <div class="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            {{ step.number }}
          </div>

          <!-- Icône -->
          <div class="text-6xl mb-4 mt-4 flex items-center justify-center">
            <svg v-if="step.icon === 'chat'" class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <svg v-if="step.icon === 'code'" class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <svg v-if="step.icon === 'rocket'" class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>

          <!-- Contenu -->
          <h3 class="text-2xl font-bold text-gray-800 mb-3">
            {{ step.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ step.description }}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <a
          href="https://wa.me/2290163774295?text=Bonjour,%20je%20souhaite%20démarrer%20un%20projet"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-xl transition-all"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Démarrer mon projet
        </a>
      </div>
    </div>
  </section>
</template>
