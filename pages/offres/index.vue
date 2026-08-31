<template>
  <div ref="revealRoot">
    <PageHero :kicker="t.kicker" :description="t.description">
      {{ t.title1 }}<br><span class="text-gradient">{{ t.title2 }}</span>
      <template #actions>
        <button type="button" class="btn-primary" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
      </template>
    </PageHero>

    <!-- Grille des 6 familles officielles (architecture validée le 29/08/2026) -->
    <section class="section-pad">
      <div class="container-shell">
        <div class="rounded-3xl border-2 border-violet-500/35 bg-violet-500/5 p-2 shadow-lg"><p class="kicker px-5 pt-4">{{ t.priority }}</p><OfferCard v-bind="offers[0]" class="mt-3"/></div>
        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <OfferCard v-for="offer in offers.slice(1)" :key="offer.tag" v-bind="offer"/>
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
import { ArrowRight, Bot, Clapperboard, Code2, Cpu, Rocket, ShoppingCart } from 'lucide-vue-next'
const { locale } = useI18n()
const { openCalendly } = useCalendly()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Six systems to acquire, operate and grow', description: 'Acquisition, AI piloting, Novatrix Launch, e-commerce retention, AI video creative and custom web & apps — six connected systems, scoped around your actual bottleneck.' }
  : { title: 'Six systèmes pour acquérir, piloter et grandir', description: 'Acquisition, pilotage IA, Novatrix Launch, rétention e-commerce, créatifs vidéo IA et web & applications sur mesure — six systèmes connectés, cadrés autour de votre blocage réel.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const revealRoot = useScrollReveal()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'six connected systems', description: 'Six intervention systems built around a business flow: acquisition first, then piloting, growth, retention, creative content and the digital products that support them.',
  title1: 'Choose the system that fixes', title2: 'your current bottleneck.',
  faqKicker: 'frequently asked questions', faqTitle1: 'Clear before the', faqTitle2: 'audit.', priority:'Recommended starting point · acquisition',
} : {
  kicker: 'six systèmes connectés', description: 'Six systèmes d’intervention construits autour d’un flux métier : l’acquisition d’abord, puis le pilotage, la croissance, la rétention, le contenu créatif et les produits numériques qui les soutiennent.',
  title1: 'Choisissez le système qui corrige', title2: 'votre blocage actuel.',
  faqKicker: 'questions fréquentes', faqTitle1: 'Clair avant', faqTitle2: 'l’audit.', priority:'Point de départ recommandé · acquisition',
})
const offers = computed(() => locale.value === 'en' ? [
  { tag: '1', title: 'Client Acquisition System', description: 'Connect campaigns, conversion, CRM, follow-up and closing in one readable flow.', result: 'a prospect journey your team can operate', features: ['Campaigns and conversion journey', 'Lead context centralized', 'Follow-up rules connected', 'Sales handoff made explicit'], to: '/offres/acquisition', icon: Cpu },
  { tag: '2', title: 'AI Piloting Agents', description: 'Connect repetitive administrative and operational tasks to controlled agents on WhatsApp or Telegram.', result: 'a controlled operating flow', features: ['Tasks mapped before automation', 'Existing tools connected', 'Sensitive actions validated', 'Clear escalation rules'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: '3', title: 'Novatrix Launch', description: 'A complete, staged support program — Start, Growth, Scale — that adapts to where your system stands today.', result: 'a progressive path to a scaled system', features: ['Start: first system live', 'Growth: follow-up, CRM and reporting connected', 'Scale: channels and automation expanded', 'A checkpoint before each stage'], to: '/offres/novatrix-launch', icon: Rocket },
  { tag: '4', title: 'E-commerce Retention & Conversion', description: 'Email/SMS abandoned-cart recovery, segmentation and AI CRM for e-commerce.', result: 'more recovered carts, customers who come back', features: ['Abandoned-cart detection and recovery', 'Email and SMS follow-up sequences', 'Behavior and value segmentation', 'AI-assisted CRM'], to: '/offres/retention-ecommerce', icon: ShoppingCart },
  { tag: '5', title: 'AI Creative & Video Content', description: 'AI avatar UGC, script and voice, multilingual dubbing, automatic cutdown and performance prediction.', result: 'video content produced at a steady pace', features: ['AI avatar UGC', 'Multilingual dubbing', 'Automatic cutdown of long videos', 'Pre-release performance prediction'], to: '/video-lab', icon: Clapperboard },
  { tag: '6', title: 'Web, Applications & SaaS Development', description: 'Showcase sites, MVPs, multi-user SaaS and custom APIs and integrations.', result: 'a product designed around usage', features: ['Product and UX scoping', 'Web and mobile development', 'Business APIs and integrations', 'Documented delivery'], to: '/offres/creation-web-apps', icon: Code2 },
] : [
  { tag: '1', title: 'Système d’acquisition client', description: 'Relier campagnes, conversion, CRM, relances et closing dans un flux lisible.', result: 'un parcours prospect que l’équipe peut piloter', features: ['Campagnes et parcours de conversion', 'Contexte du lead centralisé', 'Règles de relance connectées', 'Passage aux ventes explicite'], to: '/offres/acquisition', icon: Cpu },
  { tag: '2', title: 'Agents IA de pilotage interne', description: 'Relier les tâches administratives et opérationnelles répétitives à des agents contrôlés sur WhatsApp ou Telegram.', result: 'un flux d’opérations maîtrisé', features: ['Tâches cartographiées avant automatisation', 'Outils existants connectés', 'Actions sensibles validées', 'Règles d’escalade claires'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: '3', title: 'Novatrix Launch', description: 'Un accompagnement complet et progressif — Start, Growth, Scale — qui s’adapte à l’état actuel de votre système.', result: 'un parcours progressif vers un système à l’échelle', features: ['Start : premier système opérationnel', 'Growth : relances, CRM et reporting connectés', 'Scale : canaux et automatisation étendus', 'Un point de revue avant chaque palier'], to: '/offres/novatrix-launch', icon: Rocket },
  { tag: '4', title: 'Rétention & conversion e-commerce', description: 'Relance email/SMS des paniers abandonnés, segmentation et CRM IA pour l’e-commerce.', result: 'plus de paniers récupérés, des clients qui reviennent', features: ['Détection et relance des paniers abandonnés', 'Séquences de relance email et SMS', 'Segmentation par comportement et valeur', 'CRM assisté par IA'], to: '/offres/retention-ecommerce', icon: ShoppingCart },
  { tag: '5', title: 'Créatifs & contenu vidéo IA', description: 'UGC IA avatar, script et voix, doublage multilingue, découpage automatique et prédiction de performance.', result: 'du contenu vidéo produit à un rythme régulier', features: ['UGC IA avatar', 'Doublage multilingue', 'Découpage automatique de vidéos longues', 'Prédiction de performance avant diffusion'], to: '/video-lab', icon: Clapperboard },
  { tag: '6', title: 'Développement web, applications & SaaS', description: 'Sites vitrine, MVP, SaaS multi-utilisateurs et APIs ou intégrations sur mesure.', result: 'un produit conçu autour de l’usage', features: ['Cadrage produit et UX', 'Développement web et mobile', 'APIs et intégrations métier', 'Livraison documentée'], to: '/offres/creation-web-apps', icon: Code2 },
])
const faqs = computed(() => locale.value === 'en' ? [
  { question: 'Can we start with a single offer?', answer: 'Yes. We start with a bounded first building block and define the observable result that will be measured before expanding the scope.' },
  { question: 'Do the six systems work together?', answer: 'Yes. Acquisition feeds piloting and retention, Novatrix Launch sequences the whole path, and each step passes the useful context to the next.' },
  { question: 'How are scope and price set?', answer: 'They depend on the current journey, existing tools and required connections. The free audit identifies the useful starting scope before a proposal is prepared.' },
] : [
  { question: 'Peut-on commencer par une seule offre ?', answer: 'Oui. Nous commençons par une première brique délimitée et définissons le résultat observable qui sera mesuré avant d’étendre le périmètre.' },
  { question: 'Les six systèmes fonctionnent-ils ensemble ?', answer: 'Oui. L’acquisition nourrit le pilotage et la rétention, Novatrix Launch séquence l’ensemble du parcours, et chaque étape transmet le contexte utile à la suivante.' },
  { question: 'Comment le périmètre et le prix sont-ils fixés ?', answer: 'Ils dépendent du parcours actuel, des outils existants et des connexions nécessaires. L’audit gratuit identifie le point de départ utile avant la préparation d’une proposition.' },
])
</script>
