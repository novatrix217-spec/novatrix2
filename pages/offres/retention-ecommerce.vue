<template><OfferDetail v-bind="content" illustration="/media/video-lab/posters/ceo-face-camera.webp"><template #title><span v-html="titleHtml"/></template></OfferDetail></template>
<script setup lang="ts">
import { MailCheck, MessageSquareText, Users } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'E-commerce retention and conversion', description: 'Email and SMS abandoned-cart recovery, segmentation and AI CRM for e-commerce, built to recover more carts and keep customers coming back.' }
  : { title: 'Rétention & conversion e-commerce', description: 'Relance email/SMS des paniers abandonnés, segmentation et CRM IA e-commerce, pensés pour récupérer plus de paniers et fidéliser vos clients.' })
usePageSeo(() => seoMeta.value.title, () => seoMeta.value.description)
// Fil d Ariane affiche en SERP a la place de l URL brute.
useBreadcrumb(() => [
  { name: locale.value === 'en' ? 'Services' : 'Offres', path: '/offres' },
  { name: seoMeta.value.title, path: '/offres/retention-ecommerce' },
])
const titleHtml = computed(() => locale.value === 'en'
  ? 'Recover the carts you’re already <span class="text-gradient">paying to attract.</span>'
  : 'Récupérez les paniers que vous <span class="text-gradient">payez déjà pour attirer.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer 4 · e-commerce retention', title: 'E-commerce Retention & Conversion',
  description: 'We connect abandoned-cart follow-up, customer segmentation and an AI-assisted CRM so your store keeps the customers it already paid to acquire.',
  systemTitle: 'The traffic you already have is your cheapest growth lever.',
  systemText: 'A visitor who leaves a full cart isn’t a lost sale, until no one follows up. We connect detection, calibrated email/SMS follow-up and segmentation so recoverable carts get a real second chance, without spamming every visitor the same way.',
  modules: ['Abandoned-cart detection connected to your store', 'Calibrated email and SMS follow-up sequences', 'Customer segmentation by behavior and value', 'AI-assisted CRM for e-commerce', 'Results tracked against your actual sales, not vanity metrics'],
  capabilitiesTitle: 'What moves the recovery rate.',
  capabilities: [
    { icon: MailCheck, title: 'Recover abandoned carts', text: 'On a project we delivered, the recovery mechanism reached +30% more recovered carts.' },
    { icon: MessageSquareText, title: 'Reach customers where they read', text: 'On the same project, SMS follow-up reached a read rate above 90%.' },
    { icon: Users, title: 'Segment before you send', text: 'Follow-up rules adapt to customer behavior and value instead of one message for everyone.' },
  ],
  steps: [{step:'01',title:'Audit',text:'We map your current store, tools and existing follow-up.',outcome:'a clear picture of what is already recovering carts and what is not.'},{step:'02',title:'Connect',text:'We wire up detection, segmentation and follow-up channels.',outcome:'a connected recovery flow, ready to test on real traffic.'},{step:'03',title:'Launch and measure',text:'We launch the sequences and track results against your sales.',outcome:'live follow-up sequences with numbers to track in real time.'},{step:'04',title:'Optimize',text:'We refine segments and messages based on what actually converts.',outcome:'a recovery system that keeps improving with your real data.'}],
  faqs: [
    { question: 'Which e-commerce platforms do you support?', answer: 'We connect to the store and tools you already use; the audit confirms the integration suited to your platform.' },
    { question: 'Are the +30% and 90% figures guaranteed for my store?', answer: 'No. They describe results from a project we delivered. Your own numbers depend on your traffic, catalog and current setup, and are tracked from your real data once the system runs.' },
    { question: 'Do you need access to my customer data?', answer: 'Only what is needed for the agreed scope, defined during the audit, with your data handled under the terms set in the proposal.' },
  ],
  ctaTitle: 'Map the carts and customers your store is currently losing.',
} : {
  kicker: 'offre 4 · rétention e-commerce', title: 'Rétention & conversion e-commerce',
  description: 'Nous relions la relance des paniers abandonnés, la segmentation client et un CRM assisté par IA pour que votre boutique garde les clients qu’elle a déjà payés pour acquérir.',
  systemTitle: 'Le trafic que vous avez déjà est votre levier de croissance le moins cher.',
  systemText: 'Un visiteur qui abandonne un panier plein n’est pas une vente perdue, tant que personne ne le relance. On relie détection, relance email/SMS calibrée et segmentation pour que les paniers récupérables aient une vraie seconde chance, sans envoyer le même message à tout le monde.',
  modules: ['Détection des paniers abandonnés connectée à votre boutique', 'Séquences de relance email et SMS calibrées', 'Segmentation client par comportement et valeur', 'CRM assisté par IA pour l’e-commerce', 'Résultats suivis sur vos ventes réelles, pas des indicateurs de vanité'],
  capabilitiesTitle: 'Ce qui fait bouger le taux de récupération.',
  capabilities: [
    { icon: MailCheck, title: 'Récupérer les paniers abandonnés', text: 'Sur un projet que nous avons livré, le mécanisme de relance a permis +30% de paniers récupérés en plus.' },
    { icon: MessageSquareText, title: 'Atteindre les clients là où ils lisent', text: 'Sur ce même projet, la relance SMS a atteint un taux de lecture supérieur à 90%.' },
    { icon: Users, title: 'Segmenter avant d’envoyer', text: 'Les règles de relance s’adaptent au comportement et à la valeur du client plutôt qu’un message unique pour tous.' },
  ],
  steps: [{step:'01',title:'Auditer',text:'On cartographie votre boutique actuelle, vos outils et vos relances existantes.',outcome:'une vision claire de ce qui récupère déjà des paniers et de ce qui ne fonctionne pas.'},{step:'02',title:'Connecter',text:'On relie détection, segmentation et canaux de relance.',outcome:'un flux de récupération connecté, prêt à tester sur du trafic réel.'},{step:'03',title:'Lancer et mesurer',text:'On lance les séquences et on suit les résultats sur vos ventes.',outcome:'des séquences de relance actives et des chiffres à suivre en direct.'},{step:'04',title:'Optimiser',text:'On affine segments et messages selon ce qui convertit réellement.',outcome:'un système de récupération qui s’améliore avec vos données réelles.'}],
  faqs: [
    { question: 'Quelles plateformes e-commerce supportez-vous ?', answer: 'On se connecte à la boutique et aux outils que vous utilisez déjà ; l’audit confirme l’intégration adaptée à votre plateforme.' },
    { question: 'Les chiffres +30% et 90% sont-ils garantis pour ma boutique ?', answer: 'Non. Ils décrivent les résultats d’un projet que nous avons livré. Vos propres chiffres dépendent de votre trafic, de votre catalogue et de votre configuration actuelle, et sont suivis sur vos données réelles une fois le système en route.' },
    { question: 'Avez-vous besoin d’accéder à mes données clients ?', answer: 'Seulement ce qui est nécessaire au périmètre convenu, défini pendant l’audit, avec vos données traitées selon les conditions fixées dans la proposition.' },
  ],
  ctaTitle: 'Cartographions les paniers et clients que votre boutique perd actuellement.',
})
</script>
