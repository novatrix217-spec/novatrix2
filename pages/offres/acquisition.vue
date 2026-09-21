<template><OfferDetail v-bind="content" :illustration="illustration"><template #title><span v-html="titleHtml"/></template><template #proof><DashboardProof v-bind="dashboardProof"/></template></OfferDetail></template>
<script setup lang="ts">
import { BarChart3,MailCheck,MousePointerClick } from 'lucide-vue-next'
import videoAssets from '~/shared/video-lab-assets.json'
// Affiche prise sur Cloudinary : public/media/video-lab/ est exclu du depot, un chemin
// local y pointant renvoyait un 404 en production.
const illustration = (videoAssets as Record<string, { poster: string }>)['ceo-tournage-publicite'].poster
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Connected acquisition system', description: 'Connect creatives, campaigns, conversion pages, CRM, follow-up and sales handoff in one readable prospect journey.' }
  : { title: 'Système d’acquisition connecté', description: 'Reliez créatifs, campagnes, pages de conversion, CRM, relances et passage aux ventes dans un parcours prospect lisible.' })
usePageSeo(() => seoMeta.value.title, () => seoMeta.value.description)
// Fil d Ariane affiche en SERP a la place de l URL brute.
useBreadcrumb(() => [
  { name: locale.value === 'en' ? 'Services' : 'Offres', path: '/offres' },
  { name: seoMeta.value.title, path: '/offres/acquisition' },
])
const titleHtml = computed(() => locale.value === 'en'
  ? 'Stop paying for clicks that <span class="text-gradient">end up in the trash.</span>'
  : 'Arrêtez de payer des clics qui <span class="text-gradient">finissent à la poubelle.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer a · acquisition', title: 'Acquisition System',
  description: 'We connect attention to the sales conversation: creatives, campaigns, conversion pages, CRM and follow-up in one system with explicit handoffs.',
  systemTitle: 'From the first click to the sales conversation, one readable journey.',
  systemText: 'Your ad can perform while the post-click journey still breaks. We connect the five blocks into one system so every lead has an owner, context and a next step.',
  modules: ['Creatives and campaign angles', 'Selected acquisition channels', 'Conversion journey and tracking plan', 'Email, SMS or WhatsApp follow-up rules configured for the agreed cases', 'Sales handoff with the context collected upstream'],
  capabilitiesTitle: 'What makes the prospect journey readable.',
  capabilities: [{icon:MousePointerClick,title:'Attract',text:'Align campaign messages with the problem and audience defined during scoping.'},{icon:MailCheck,title:'Follow up',text:'Define who follows up, on which channel and with which context.'},{icon:BarChart3,title:'Observe',text:'Connect useful events so the team can compare stages without inventing performance.'}],
  steps: [{step:'01',title:'Scoping',text:'We start from your sales goal and your real numbers.',outcome:'a priced sales target and the metrics that matter.'},{step:'02',title:'Architecture',text:'We map the path from click to purchase.',outcome:'the full path from click to purchase, mapped.'},{step:'03',title:'Build',text:'We build ads, funnel, CRM and follow-ups, connected end to end.',outcome:'a system connected end to end, ready to test.'},{step:'04',title:'Launch',text:'We launch, measure against your sales, and optimize relentlessly.',outcome:'live campaigns and numbers to track in real time.'}],
  faqs: [
    { question: 'How is the system priced?', answer: 'It depends on the selected channels, existing assets, data and integrations. The free audit defines the useful starting scope before a proposal is prepared.' },
    { question: 'How is the delivery timeline set?', answer: 'It depends on the channels, existing data and integrations. The scope and checkpoints are agreed after the audit, before implementation starts.' },
    { question: 'What if my current campaigns are already running?', answer: 'We integrate them rather than rebuild everything: we map what already works and connect the rest.' },
    { question: 'Is there a minimum ad budget?', answer: 'Yes, a test budget is needed so the system has data to optimize on. We set it together based on your sector.' },
  ],
  ctaTitle: 'Identify the first break in your acquisition journey.',
} : {
  kicker: 'offre a · acquisition', title: 'Système d’acquisition',
  description: 'Nous relions l’attention à l’échange commercial : créatifs, campagnes, pages de conversion, CRM et relances dans un système aux passages de relais explicites.',
  systemTitle: 'Du premier clic à l’échange commercial, un parcours lisible.',
  systemText: 'Votre publicité peut fonctionner pendant que le parcours après-clic se casse. Nous relions les cinq blocs dans un système pour que chaque lead ait un responsable, un contexte et une prochaine étape.',
  modules: ['Créatifs et angles de campagne', 'Canaux d’acquisition sélectionnés', 'Parcours de conversion et plan de mesure', 'Règles de relance email, SMS ou WhatsApp pour les cas convenus', 'Passage aux ventes avec le contexte recueilli en amont'],
  capabilitiesTitle: 'Ce qui rend le parcours prospect lisible.',
  capabilities: [{icon:MousePointerClick,title:'Attirer',text:'Aligner les messages de campagne sur le problème et l’audience définis au cadrage.'},{icon:MailCheck,title:'Relancer',text:'Définir qui relance, sur quel canal et avec quel contexte.'},{icon:BarChart3,title:'Observer',text:'Relier les événements utiles pour comparer les étapes sans inventer de performance.'}],
  steps: [{step:'01',title:'Cadrage',text:'On part de votre objectif de ventes et de vos vrais chiffres.',outcome:'un objectif de ventes chiffré et les indicateurs qui comptent.'},{step:'02',title:'Architecture',text:'On dessine le parcours qui mène le clic jusqu’à l’achat.',outcome:'le parcours complet du clic à l’achat, cartographié.'},{step:'03',title:'Construction',text:'On monte pubs, tunnel, CRM et relances, reliés bout à bout.',outcome:'un système connecté de bout en bout, prêt à tester.'},{step:'04',title:'Lancement',text:'On lance, on mesure sur vos ventes, on optimise sans relâche.',outcome:'des campagnes actives et des chiffres à suivre en direct.'}],
  faqs: [
    { question: 'Comment le système est-il chiffré ?', answer: 'Cela dépend des canaux sélectionnés, des actifs existants, des données et des intégrations. L’audit gratuit définit le point de départ utile avant la préparation d’une proposition.' },
    { question: 'Comment le délai de livraison est-il fixé ?', answer: 'Il dépend des canaux, des données disponibles et des intégrations. Le périmètre et les jalons sont convenus après l’audit, avant le début de l’implémentation.' },
    { question: 'Et si mes campagnes actuelles tournent déjà ?', answer: 'On les intègre plutôt que de tout reconstruire : on cartographie ce qui marche et on connecte le reste.' },
    { question: 'Faut-il un budget pub minimum ?', answer: 'Oui, un budget test est nécessaire pour que le système ait des données à optimiser. On le définit ensemble selon votre secteur.' },
  ],
  ctaTitle: 'Identifiez la première rupture de votre parcours d’acquisition.',
})
// Dashboard CRM réel d'une agence partenaire automatisée par
// NovatrixAI, période 01/07 → 10/08/2026. Client anonymisé à sa demande — chiffres réels.
const dashboardProof = computed(() => locale.value === 'en' ? {
  period: 'Jul 1 – Aug 10, 2026', prospects: '76', purchases: '16', revenue: '€3,540', roi: '9.1x',
  rows: [
    { month: 'July', prospects: '52', purchases: '12', revenue: '€2,980' },
    { month: 'August', prospects: '24', purchases: '4', revenue: '€560' },
  ],
  totalProspects: '76', totalPurchases: '16', totalRevenue: '€3,540',
} : {
  period: '01/07 – 10/08/2026', prospects: '76', purchases: '16', revenue: '3 540 €', roi: '9,1x',
  rows: [
    { month: 'Juillet', prospects: '52', purchases: '12', revenue: '2 980 €' },
    { month: 'Août', prospects: '24', purchases: '4', revenue: '560 €' },
  ],
  totalProspects: '76', totalPurchases: '16', totalRevenue: '3 540 €',
})
</script>
