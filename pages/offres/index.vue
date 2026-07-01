<template>
  <div ref="revealRoot">
    <PageHero kicker="nos offres" description="Trois systèmes indépendants. Une même exigence : relier le travail au résultat. Chaque offre forme une boucle complète, pas une prestation isolée.">
      Trois systèmes.<br><span class="text-gradient">Un seul objectif.</span>
    </PageHero>

    <!-- Grille des offres -->
    <section class="section-pad">
      <div class="container-shell">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(offer, i) in offers" :key="offer.tag" class="reveal-scale" :data-reveal-delay="i * 120">
            <OfferCard v-bind="offer" />
          </div>
        </div>
      </div>
    </section>

    <!-- Méthode -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <div class="reveal">
          <SectionHeading kicker="méthode" center description="Chaque phase a un livrable et une porte de sortie. On n'avance pas sur une hypothèse non testée.">
            De la réalité au <span class="text-gradient">système vivant.</span>
          </SectionHeading>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
          <div v-for="(item, i) in process" :key="item.step" class="card card-hover reveal" :data-reveal-delay="i * 100">
            <span class="font-heading text-4xl font-bold text-violet-600/15 sm:text-5xl">{{ item.step }}</span>
            <h3 class="mt-4 text-lg font-bold sm:text-xl">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-pad">
      <div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div class="reveal-left"><SectionHeading kicker="questions fréquentes">Clair avant de <span class="text-gradient">commencer.</span></SectionHeading></div>
        <div class="reveal-right"><FaqAccordion :items="faqs" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
import { Bot, Code2, Cpu } from 'lucide-vue-next'
usePageSeo('Nos offres — systèmes IA, acquisition et applications', "Trois systèmes NovatrixAI : acquisition automatisée, agents IA de pilotage et création web & applications. Des boucles complètes reliées au résultat.")
const revealRoot = useScrollReveal()
const offers = [
  { tag: 'A', title: 'Système d’Acquisition', description: 'Créatifs, campagnes, tunnel, CRM, relances et closing réunis dans une seule chaîne.', result: 'des leads qualifiés en automatique', features: ['Campagnes Meta, TikTok et Google', 'Tunnel et tracking sur mesure', 'CRM, email, SMS et WhatsApp', 'Closing relié aux données'], to: '/offres/acquisition', icon: Cpu },
  { tag: 'B', title: 'Agents IA de pilotage', description: 'Une équipe d’agents pilotable depuis WhatsApp ou Telegram, branchée sur vos outils.', result: 'des dizaines d’heures libérées', features: ['Finance, agenda et reporting', 'Juridique et documents assistés', 'Réseaux sociaux et opérations', 'Validations humaines sensibles'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: 'C', title: 'Web & applications', description: 'Sites, applications web et mobiles, APIs et intégrations construits autour de vos flux métier.', result: 'un process fiable et maintenable', features: ['Cadrage produit et UX', 'Développement web et mobile', 'APIs et intégrations métier', 'Déploiement et évolution'], to: '/offres/creation-web-apps', icon: Code2 },
]
const process = [
  { step: '01', title: 'Découverte', text: 'Nous partons de l’activité, des données et du vrai problème business.' },
  { step: '02', title: 'Architecture', text: 'Nous dessinons les flux, les responsabilités et les validations.' },
  { step: '03', title: 'Déploiement', text: 'Nous construisons, connectons et testons avec des cas réels.' },
  { step: '04', title: 'Pilotage', text: 'Nous suivons le résultat, corrigeons les ruptures et faisons évoluer.' },
]
const faqs = [
  { question: 'Peut-on commencer par une seule offre ?', answer: 'Oui. Le périmètre peut être progressif, mais chaque phase doit former une boucle fonctionnelle reliée à un résultat mesurable.' },
  { question: 'Les trois systèmes fonctionnent-ils ensemble ?', answer: 'Oui, c’est même l’intérêt : l’acquisition alimente le pilotage, les agents opèrent vos applications, et tout reste relié de bout en bout.' },
  { question: 'Faut-il remplacer nos outils actuels ?', answer: 'Pas forcément. Nous cartographions l’existant et conservons ce qui est fiable ; les connexions sont choisies selon votre maturité et vos contraintes.' },
]
</script>
