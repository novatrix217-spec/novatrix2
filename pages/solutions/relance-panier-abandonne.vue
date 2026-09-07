<template><SolutionDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></SolutionDetail></template>
<script setup lang="ts">
import { ShoppingCart, MessageSquare, Clock, BarChart3 } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Abandoned cart recovery — Shopify and beyond', description: 'An automation that detects abandoned carts and follows up by SMS, email or WhatsApp at the right time. System already deployed on Shopify with Twilio.' }
  : { title: 'Relance automatique des paniers abandonnés — Shopify et au-delà', description: 'Une automatisation qui détecte les paniers abandonnés et relance par SMS, email ou WhatsApp au bon moment. Système déjà déployé sur Shopify avec Twilio.' })
usePageSeo(() => seoMeta.value.title, () => seoMeta.value.description)
const titleHtml = computed(() => locale.value === 'en'
  ? 'Follow up on abandoned carts <span class="text-gradient">before the opportunity goes cold.</span>'
  : 'Relancez les paniers abandonnés <span class="text-gradient">avant que l’opportunité ne refroidisse.</span>')
const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
useHead(() => ({ script: [
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: locale.value==='en'?'Abandoned Cart Recovery':'Relance automatique des paniers abandonnés', serviceType: locale.value==='en'?'E-commerce automation':'Automatisation e-commerce', provider: { '@type': 'Organization', name: 'NovatrixAI' }, areaServed: 'BJ', inLanguage: locale.value, description: locale.value==='en'?'Automatic detection and follow-up of abandoned carts on an online store, by SMS, email or WhatsApp.':'Détection et relance automatique des paniers abandonnés sur boutique en ligne, par SMS, email ou WhatsApp.' }) },
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale.value==='en'?'Home':'Accueil', item: locale.value==='en'?`${site}/en`:site }, { '@type': 'ListItem', position: 2, name: locale.value==='en'?'Acquisition System':'Système d’acquisition', item: `${site}${locale.value==='en'?'/en':''}/offres/acquisition` }, { '@type': 'ListItem', position: 3, name: locale.value==='en'?'Cart Recovery':'Relance panier abandonné', item: `${site}${locale.value==='en'?'/en':''}/solutions/relance-panier-abandonne` }] }) },
] }))
const content = computed(() => locale.value === 'en' ? {
  kicker: 'solution · cart recovery', title: 'Abandoned Cart Recovery',
  description: 'An automatic follow-up on the configured channel aims to give eligible abandoned carts another opportunity to convert. A system already delivered and documented at NovatrixAI.',
  painTitle: 'What every abandoned cart is costing you',
  painPoints: [
    { title: 'An abandoned cart can go unnoticed', text: 'Without tracking, the team cannot see which eligible carts need a follow-up.', after: 'Defined abandonment events can trigger an agreed follow-up sequence.' },
    { title: 'A manual follow-up arrives too late, or never', text: 'By the time a human spots and recontacts an abandoned cart, the client has often already bought elsewhere.', after: 'The follow-up goes out at the right moment, with no human involved.' },
    { title: 'A single follow-up channel doesn’t reach everyone', text: 'Email alone misses clients who don’t check it — the right channel depends on the client’s habit, not yours.', after: 'SMS, email or WhatsApp — the channel adapts to the client.' },
    { title: 'No way to know what the follow-up actually earns', text: 'Without dedicated tracking, follow-up happens blind, with no idea whether it converts or gets ignored.', after: 'Configured events can link follow-up activity to completed orders.' },
  ],
  capabilitiesTitle: 'What the system does for you',
  capabilities: [
    { icon: ShoppingCart, title: 'Automatic abandonment detection', text: 'The system identifies a cart left without purchase and triggers the sequence without human involvement.' },
    { icon: MessageSquare, title: 'Multichannel follow-up', text: 'SMS, email or WhatsApp depending on where the client responds best — never a single channel forced on everyone.' },
    { icon: Clock, title: 'Calibrated timing', text: 'The first message goes out at the right moment: not so early it feels intrusive, not so late the client already bought elsewhere.' },
    { icon: BarChart3, title: 'Recovery tracking', text: 'Configured events can link follow-up activity to completed orders for review.' },
  ],
  faqs: [
    { question: 'Does it work with Shopify?', answer: 'Yes, it’s one of the cases we’ve already deployed — with Twilio for SMS delivery. Other e-commerce platforms connect on the same principle.' },
    { question: 'How many follow-up messages should be sent?', answer: 'It depends on the sector and average cart value. We test a short sequence, one to three messages, and adjust based on observed results.' },
    { question: 'Does it annoy clients?', answer: 'An adapted frequency, a useful message and an opt-out option limit the risk of intrusion; the sequence is adjusted based on observed feedback.' },
  ],
  related: [
    { title: 'Abandoned cart recovery — the case study', to: '/realisations/relance-paniers-abandonnes-shopify-twilio', description: 'The system as deployed: Shopify, Twilio, detection and SMS follow-up.' },
    { title: 'Acquisition System', to: '/offres/acquisition', description: 'The full system: campaigns, funnel, CRM and follow-ups connected in a single chain.' },
    { title: 'The 5-point diagnostic to find where your acquisition is leaking', to: '/blog/le-diagnostic-en-5-points-pour-reperer-ou-votre-acquisition-fuit', description: 'Where your acquisition chain breaks most often — and how to check it.' },
  ],
  relatedOfferTo: '/offres/acquisition',
  ctaTitle: 'How many carts do you abandon every week without a follow-up? Let’s put a number on it.',
} : {
  kicker: 'solution · relance panier abandonné', title: 'Relance de paniers abandonnés',
  description: 'Une relance automatique sur le canal configuré vise à donner aux paniers éligibles une nouvelle occasion de convertir. Système déjà livré et documenté chez NovatrixAI.',
  painTitle: 'Ce que chaque panier abandonné vous coûte',
  painPoints: [
    { title: 'Un panier abandonné peut passer inaperçu', text: 'Sans suivi, l’équipe ne voit pas quels paniers éligibles nécessitent une relance.', after: 'Les événements d’abandon définis peuvent déclencher la séquence de relance convenue.' },
    { title: 'La relance manuelle arrive trop tard, ou jamais', text: 'Le temps qu’un humain repère et recontacte un panier abandonné, le client a souvent déjà acheté ailleurs.', after: 'La relance part au bon moment, sans intervention humaine.' },
    { title: 'Un seul canal de relance ne touche pas tout le monde', text: 'Un email seul rate les clients qui ne le consultent pas — le bon canal dépend de l’habitude du client, pas de la vôtre.', after: 'SMS, email ou WhatsApp — le canal s’adapte au client.' },
    { title: 'Impossible de savoir ce que la relance rapporte vraiment', text: 'Sans suivi dédié, la relance se fait à l’aveugle, sans savoir si elle convertit ou si elle est ignorée.', after: 'Les événements configurés peuvent relier l’activité de relance aux commandes finalisées.' },
  ],
  capabilitiesTitle: 'Ce que le système fait pour vous',
  capabilities: [
    { icon: ShoppingCart, title: 'Détection automatique de l’abandon', text: 'Le système identifie un panier laissé sans achat et déclenche la séquence sans intervention humaine.' },
    { icon: MessageSquare, title: 'Relance multicanal', text: 'SMS, email ou WhatsApp selon le canal où le client répond le mieux — pas un choix unique imposé.' },
    { icon: Clock, title: 'Timing calibré', text: 'Le premier message part au bon moment : ni trop tôt, perçu comme intrusif, ni trop tard, quand le client a déjà acheté ailleurs.' },
    { icon: BarChart3, title: 'Suivi de la récupération', text: 'Les événements configurés peuvent relier l’activité de relance aux commandes finalisées pour analyse.' },
  ],
  faqs: [
    { question: 'Est-ce que ça marche avec Shopify ?', answer: 'Oui, c’est l’un des cas que nous avons déjà déployés — avec Twilio pour l’envoi SMS. D’autres plateformes e-commerce se connectent selon le même principe.' },
    { question: 'Combien de messages de relance faut-il envoyer ?', answer: 'Ça dépend du secteur et du panier moyen. On teste une séquence courte, un à trois messages, et on ajuste selon les résultats observés.' },
    { question: 'Comment éviter des relances intrusives ?', answer: 'Une fréquence adaptée, un message utile et une option de désinscription limitent le risque d’intrusion ; la séquence est ajustée selon les retours observés.' },
  ],
  related: [
    { title: 'Relance automatique des paniers abandonnés — la réalisation', to: '/realisations/relance-paniers-abandonnes-shopify-twilio', description: 'Le système tel qu’il a été déployé : Shopify, Twilio, détection et relance SMS.' },
    { title: 'Système d’acquisition', to: '/offres/acquisition', description: 'Le système complet : campagnes, tunnel, CRM et relances reliés en une seule chaîne.' },
    { title: 'Le diagnostic en 5 points pour repérer où votre acquisition fuit', to: '/blog/le-diagnostic-en-5-points-pour-reperer-ou-votre-acquisition-fuit', description: 'Où votre chaîne d’acquisition se casse le plus souvent — et comment le vérifier.' },
  ],
  relatedOfferTo: '/offres/acquisition',
  ctaTitle: 'Combien de paniers abandonnez-vous chaque semaine sans les relancer ? Chiffrons-le ensemble.',
})
</script>
