<template>
  <div ref="revealRoot">
    <PageHero :kicker="t.kicker" :description="t.description">
      {{ t.title1 }}<br><span class="text-gradient">{{ t.title2 }}</span>
      <template #actions>
        <button type="button" class="btn-primary" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
      </template>
    </PageHero>

    <!-- Grille des offres -->
    <section class="section-pad">
      <div class="container-shell">
        <div class="rounded-3xl border-2 border-violet-500/35 bg-violet-500/5 p-2 shadow-lg"><p class="kicker px-5 pt-4">{{ t.priority }}</p><OfferCard v-bind="offers[0]" class="mt-3"/></div>
        <div class="mt-8 grid gap-6 md:grid-cols-2"><OfferCard v-for="offer in offers.slice(1)" :key="offer.tag" v-bind="offer"/></div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-pad">
      <div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div class="reveal-left"><SectionHeading :kicker="t.faqKicker">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading></div>
        <div class="reveal-right"><FaqAccordion :items="faqs" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Bot, Code2, Cpu } from 'lucide-vue-next'
const { locale } = useI18n()
const { openCalendly } = useCalendly()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Complete systems for acquisition and operations', description: 'Start with the acquisition system, then connect controlled AI agents or a custom digital product when the bottleneck requires it.' }
  : { title: 'Des systèmes complets pour l’acquisition et les opérations', description: 'Commencez par le système d’acquisition, puis reliez des agents IA contrôlés ou un produit numérique sur mesure lorsque le blocage le demande.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const revealRoot = useScrollReveal()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'complete systems', description: 'Three intervention systems built around a business flow: acquisition first, then operations and the digital products that support them.',
  title1: 'Choose the system that fixes', title2: 'your current bottleneck.',
  faqKicker: 'frequently asked questions', faqTitle1: 'Clear before the', faqTitle2: 'audit.', priority:'Recommended starting point · acquisition',
} : {
  kicker: 'systèmes complets', description: 'Trois systèmes d’intervention construits autour d’un flux métier : l’acquisition d’abord, puis les opérations et les produits numériques qui les soutiennent.',
  title1: 'Choisissez le système qui corrige', title2: 'votre blocage actuel.',
  faqKicker: 'questions fréquentes', faqTitle1: 'Clair avant', faqTitle2: 'l’audit.', priority:'Point de départ recommandé · acquisition',
})
const offers = computed(() => locale.value === 'en' ? [
  { tag: 'A', title: 'Acquisition System', description: 'Connect campaigns, conversion, CRM, follow-up and sales handoff in one readable flow.', result: 'a prospect journey your team can operate', features: ['Campaigns and conversion journey', 'Lead context centralized', 'Follow-up rules connected', 'Sales handoff made explicit'], to: '/offres/acquisition', icon: Cpu },
  { tag: 'B', title: 'AI Piloting Agents', description: 'Connect repetitive operational tasks to controlled agents and your existing tools.', result: 'a controlled operating flow', features: ['Tasks mapped before automation', 'Existing tools connected', 'Sensitive actions validated', 'Clear escalation rules'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: 'C', title: 'Web & Applications', description: 'Build the interface, application or integration your real business flow requires.', result: 'a product designed around usage', features: ['Product and UX scoping', 'Web and mobile development', 'Business APIs and integrations', 'Documented delivery'], to: '/offres/creation-web-apps', icon: Code2 },
] : [
  { tag: 'A', title: 'Système d’acquisition', description: 'Relier campagnes, conversion, CRM, relances et passage aux ventes dans un flux lisible.', result: 'un parcours prospect que l’équipe peut piloter', features: ['Campagnes et parcours de conversion', 'Contexte du lead centralisé', 'Règles de relance connectées', 'Passage aux ventes explicite'], to: '/offres/acquisition', icon: Cpu },
  { tag: 'B', title: 'Agents IA de pilotage', description: 'Relier les tâches opérationnelles répétitives à des agents contrôlés et à vos outils existants.', result: 'un flux d’opérations maîtrisé', features: ['Tâches cartographiées avant automatisation', 'Outils existants connectés', 'Actions sensibles validées', 'Règles d’escalade claires'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: 'C', title: 'Web & applications', description: 'Construire l’interface, l’application ou l’intégration dont votre flux métier a réellement besoin.', result: 'un produit conçu autour de l’usage', features: ['Cadrage produit et UX', 'Développement web et mobile', 'APIs et intégrations métier', 'Livraison documentée'], to: '/offres/creation-web-apps', icon: Code2 },
])
const faqs = computed(() => locale.value === 'en' ? [
  { question: 'Can we start with a single offer?', answer: 'Yes. We start with a bounded first building block and define the observable result that will be measured before expanding the scope.' },
  { question: 'Do the three systems work together?', answer: 'Yes. Acquisition feeds piloting, agents connect to your applications, and each step passes the useful context to the next.' },
  { question: 'How are scope and price set?', answer: 'They depend on the current journey, existing tools and required connections. The free audit identifies the useful starting scope before a proposal is prepared.' },
] : [
  { question: 'Peut-on commencer par une seule offre ?', answer: 'Oui. Nous commençons par une première brique délimitée et définissons le résultat observable qui sera mesuré avant d’étendre le périmètre.' },
  { question: 'Les trois systèmes fonctionnent-ils ensemble ?', answer: 'Oui. L’acquisition nourrit le pilotage, les agents se connectent à vos applications et chaque étape transmet le contexte utile à la suivante.' },
  { question: 'Comment le périmètre et le prix sont-ils fixés ?', answer: 'Ils dépendent du parcours actuel, des outils existants et des connexions nécessaires. L’audit gratuit identifie le point de départ utile avant la préparation d’une proposition.' },
])
</script>
