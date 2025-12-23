<script setup>
import { ref } from 'vue';

const faqs = [
  {
    question: 'Quels types de projets réalisez-vous ?',
    answer: 'Nous réalisons des applications web SaaS, des chatbots IA, des automatisations (Make/Zapier/N8N), des sites WordPress, des APIs, des intégrations IA, du web scraping, et bien plus encore.'
  },
  {
    question: 'Combien de temps prend un projet en moyenne ?',
    answer: 'La durée dépend de la complexité du projet. Un chatbot simple peut prendre 1-2 semaines, tandis qu\'une application SaaS complète peut nécessiter 1-3 mois. Nous établissons un calendrier précis lors de notre consultation.'
  },
  {
    question: 'Proposez-vous un support après livraison ?',
    answer: 'Oui ! Nous offrons un support post-livraison pour tous nos projets. Nous restons disponibles pour les ajustements, maintenance et évolutions futures de votre solution.'
  },
  {
    question: 'Comment se déroule la tarification ?',
    answer: 'Nous établissons un devis personnalisé basé sur vos besoins spécifiques. Nos tarifs sont transparents et compétitifs. Contactez-nous pour une consultation gratuite et un devis détaillé.'
  },
  {
    question: 'Travaillez-vous avec des entreprises de toutes tailles ?',
    answer: 'Absolument ! Nous accompagnons aussi bien les startups, les PME que les grandes entreprises dans leur transformation digitale et leurs projets IA.'
  },
  {
    question: 'Puis-je voir des exemples de vos réalisations ?',
    answer: 'Bien sûr ! Consultez notre section "Réalisations" pour découvrir nos 36+ projets complétés avec succès. Nous pouvons également vous partager des études de cas détaillées lors de notre échange.'
  }
];

const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section class="py-16 px-5 sm:px-20 bg-gray-50 font-poppins">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <p class="uppercase font-semibold text-blue-600 mb-2">FAQ</p>
        <h2 class="text-4xl sm:text-5xl font-bold text-[#14183E] mb-4 font-volkhov">
          Questions Fréquentes
        </h2>
        <p class="text-gray-600 text-lg">
          Tout ce que vous devez savoir avant de démarrer
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
          :class="{ 'ring-2 ring-blue-600': openIndex === index }"
        >
          <button
            @click="toggle(index)"
            class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span class="text-lg font-semibold text-gray-800 pr-4">
              {{ faq.question }}
            </span>
            <svg
              class="w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div
            v-show="openIndex === index"
            class="px-6 pb-5 text-gray-600 leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- CTA après FAQ -->
      <div class="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
        <h3 class="text-2xl font-bold mb-3">Vous avez d'autres questions ?</h3>
        <p class="mb-6 opacity-90">Notre équipe est là pour vous répondre</p>
        <a
          href="https://wa.me/2290163774295?text=Bonjour,%20j%27ai%20une%20question"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-xl transition-all cursor-pointer select-none"
        >
          <svg class="w-5 h-5 flex-shrink-0 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span class="pointer-events-none">Nous contacter</span>
        </a>
      </div>
    </div>
  </section>
</template>
