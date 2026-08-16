<template>
  <div ref="revealRoot">
    <PageHero :kicker="t.kicker" :description="t.description">
      {{ t.title1 }}<br><span class="text-gradient">{{ t.title2 }}</span>
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
          <SectionHeading :kicker="t.methodKicker" center :description="t.methodDescription">
            {{ t.methodTitle1 }} <span class="text-gradient">{{ t.methodTitle2 }}</span>
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
        <div class="reveal-left"><SectionHeading :kicker="t.faqKicker">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading></div>
        <div class="reveal-right"><FaqAccordion :items="faqs" /></div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
import { Bot, Code2, Cpu } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Our services — more clients, less load, a system that holds', description: 'Automated acquisition, AI agents that run your daily work, custom web and applications. NovatrixAI connects your entire chain to the result. Book a call.' }
  : { title: 'Nos offres — plus de clients, moins de charge, un système qui tient', description: 'Acquisition automatisée, agents IA qui pilotent votre quotidien, web et applications sur mesure. NovatrixAI relie toute votre chaîne au résultat. Réservez un appel.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const revealRoot = useScrollReveal()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'our services', description: 'Three systems that work for you, even while you sleep. No more tools that don’t talk to each other: every offer connects the whole chain to the result you cash in.',
  title1: 'Sell more.', title2: 'Work less.',
  methodKicker: 'method', methodDescription: 'At every step, a concrete deliverable and an exit point. You always know where your money goes and why.',
  methodTitle1: 'From your problem to a', methodTitle2: 'result that runs.',
  faqKicker: 'frequently asked questions', faqTitle1: 'Clear before you', faqTitle2: 'start.',
} : {
  kicker: 'nos offres', description: 'Trois systèmes qui travaillent pour vous, même quand vous dormez. Fini les outils qui ne se parlent pas : chaque offre relie toute la chaîne jusqu’au résultat que vous encaissez.',
  title1: 'Vendre plus.', title2: 'Travailler moins.',
  methodKicker: 'méthode', methodDescription: 'À chaque étape, un livrable concret et un point de sortie. Vous savez toujours où va votre argent et pourquoi.',
  methodTitle1: 'De votre problème au', methodTitle2: 'résultat qui tourne.',
  faqKicker: 'questions fréquentes', faqTitle1: 'Clair avant de', faqTitle2: 'commencer.',
})
const offers = computed(() => locale.value === 'en' ? [
  { tag: 'A', title: 'Acquisition System', description: 'A flow of clients that never stops: creatives, campaigns, funnel, CRM, follow-ups and closing in a single chain.', result: 'qualified meetings every week', features: ['Profitable Meta, TikTok and Google campaigns', 'A funnel that converts and clear tracking', 'Automatic email, SMS and WhatsApp follow-ups', 'No lead forgotten, no sale lost'], to: '/offres/acquisition', icon: Cpu },
  { tag: 'B', title: 'AI Piloting Agents', description: 'Delegate your repetitive tasks to a team of agents you pilot from WhatsApp, wired into your tools.', result: 'your evenings and weekends back', features: ['Finance, agenda and reporting without thinking about it', 'Contracts and documents handled in minutes', 'Social media and operations piloted', 'You keep control of what’s sensitive'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: 'C', title: 'Web & Applications', description: 'Websites, web and mobile apps, APIs and integrations built to run your business, not to decorate it.', result: 'a tool that saves you time', features: ['We scope it to avoid paying twice', 'Solid web and mobile development', 'Connected to all your business tools', 'Delivered, tracked and ready to grow'], to: '/offres/creation-web-apps', icon: Code2 },
] : [
  { tag: 'A', title: 'Système d’Acquisition', description: 'Un flux de clients qui ne s’arrête jamais : créatifs, campagnes, tunnel, CRM, relances et closing dans une seule chaîne.', result: 'des rendez-vous qualifiés chaque semaine', features: ['Campagnes Meta, TikTok et Google rentables', 'Tunnel qui convertit et tracking clair', 'Relances email, SMS et WhatsApp automatiques', 'Aucun lead oublié, aucune vente perdue'], to: '/offres/acquisition', icon: Cpu },
  { tag: 'B', title: 'Agents IA de pilotage', description: 'Déléguez vos tâches répétitives à une équipe d’agents pilotable depuis WhatsApp, branchée sur vos outils.', result: 'vos soirées et vos week-ends récupérés', features: ['Finance, agenda et reporting sans y penser', 'Contrats et documents traités en minutes', 'Réseaux sociaux et opérations pilotés', 'Vous gardez la main sur le sensible'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: 'C', title: 'Web & applications', description: 'Sites, applications web et mobiles, APIs et intégrations taillés pour faire tourner votre business, pas pour décorer.', result: 'un outil qui vous fait gagner du temps', features: ['On cadre pour éviter de payer deux fois', 'Développement web et mobile solide', 'Connecté à tous vos outils métier', 'Livré, suivi et prêt à grandir'], to: '/offres/creation-web-apps', icon: Code2 },
])
const process = computed(() => locale.value === 'en' ? [
  { step: '01', title: 'We target', text: 'We start from your business and your numbers to aim at what really pays off.' },
  { step: '02', title: 'We design', text: 'We map a clear system: every flow, every validation, nothing left to chance.' },
  { step: '03', title: 'We deploy', text: 'We build, connect your tools and test on your real cases before launch.' },
  { step: '04', title: 'We scale', text: 'We track your results, fix fast and improve the system as you grow.' },
] : [
  { step: '01', title: 'On cible', text: 'On part de votre activité et de vos chiffres pour viser ce qui vous rapporte vraiment.' },
  { step: '02', title: 'On conçoit', text: 'On dessine un système clair : chaque flux, chaque validation, rien laissé au hasard.' },
  { step: '03', title: 'On déploie', text: 'On construit, on connecte vos outils et on teste sur vos vrais cas avant le lancement.' },
  { step: '04', title: 'On fait grossir', text: 'On suit vos résultats, on corrige vite et on améliore le système au fil de votre croissance.' },
])
const faqs = computed(() => locale.value === 'en' ? [
  { question: 'Can we start with a single offer?', answer: 'Yes, and it’s often the smartest move: we start where you’re losing the most, with a measurable result from the first building block. We expand from there.' },
  { question: 'Do the three systems work together?', answer: 'That’s the whole strength: acquisition feeds piloting, agents run your applications, and nothing gets lost between steps. That’s what changes everything.' },
  { question: 'Do we need to replace our current tools?', answer: 'No. We keep what already works for you and connect it to the rest. You don’t start from zero, you just stop losing time between your tools.' },
] : [
  { question: 'Peut-on commencer par une seule offre ?', answer: 'Oui, et c’est souvent le plus malin : on démarre là où vous perdez le plus, avec un résultat mesurable dès la première brique. On agrandit ensuite.' },
  { question: 'Les trois systèmes fonctionnent-ils ensemble ?', answer: 'C’est là toute la force : l’acquisition nourrit le pilotage, les agents font tourner vos applications, et rien ne se perd entre les étapes. C’est ça qui change tout.' },
  { question: 'Faut-il remplacer nos outils actuels ?', answer: 'Non. On garde ce qui marche déjà chez vous et on le relie au reste. Vous ne repartez pas de zéro, vous arrêtez juste de perdre du temps entre vos outils.' },
])
</script>
