<template><SolutionDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></SolutionDetail></template>
<script setup lang="ts">
import { MapPin, Smartphone, Wallet, Globe } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'AI Agency in Cotonou — automation and AI agents in Benin', description: 'NovatrixAI builds acquisition systems, AI agents and custom applications for businesses in Benin and West Africa. Based in Cotonou, payment in FCFA or Mobile Money.' }
  : { title: 'Agence IA à Cotonou — automatisation et agents IA au Bénin', description: 'NovatrixAI conçoit des systèmes d’acquisition, agents IA et applications sur mesure pour les entreprises du Bénin et d’Afrique de l’Ouest. Basée à Cotonou, paiement en FCFA ou Mobile Money.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'AI agency in Cotonou, built for <span class="text-gradient">your local reality.</span>'
  : 'Agence IA à Cotonou, pensée pour <span class="text-gradient">votre réalité locale.</span>')
const site = useRuntimeConfig().public.siteUrl
useHead({ script: [
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'NovatrixAI', image: `${site}/favicon-192x192.png`, address: { '@type': 'PostalAddress', addressLocality: 'Cotonou', addressCountry: 'BJ' }, areaServed: ['Bénin', 'Côte d’Ivoire', 'Sénégal', 'Togo', 'Burkina Faso'], url: site, email: 'contact@novatrixai.com', inLanguage: locale.value }) },
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale.value==='en'?'Home':'Accueil', item: locale.value==='en'?`${site}/en`:site }, { '@type': 'ListItem', position: 2, name: locale.value==='en'?'AI Agency Cotonou':'Agence IA Cotonou', item: `${site}${locale.value==='en'?'/en':''}/agence-ia-cotonou` }] }) },
] })
const content = computed(() => locale.value === 'en' ? {
  kicker: 'novatrixai · cotonou', title: 'AI Agency in Cotonou',
  description: 'NovatrixAI builds acquisition systems, AI agents and custom applications for businesses in Benin, West Africa and the French-speaking world — based in Cotonou, remote for the rest of the world.',
  painTitle: 'What holds back a Beninese SME in going digital',
  painPoints: [
    { title: 'Western tools ignore your local constraints', text: 'Mobile Money, unstable connections, WhatsApp as the main channel — most solutions aren’t built for this reality.' },
    { title: 'Finding a reliable AI provider, local or remote, remains hard', text: 'Between agencies that charge too much and freelancers with no follow-up, few options offer support over time.' },
    { title: 'International agencies bill in hard currency, without knowing the market', text: 'A price built for Europe or North America doesn’t account for your economic reality.' },
    { title: 'The informal sector remains largely left out of digital tools', text: 'Cash management, sales tracking, invoicing: most small businesses still run entirely on paper.' },
  ],
  capabilitiesTitle: 'What changes when you work with an agency based here',
  capabilities: [
    { icon: MapPin, title: 'Based in Cotonou, available in person', text: 'An in-person meeting is possible for local clients — not just a video call.' },
    { icon: Smartphone, title: 'Built for WhatsApp and mobile first', text: 'Our systems are designed for the channels and connections actually used here.' },
    { icon: Wallet, title: 'Payment in FCFA or Mobile Money', text: 'Bank transfer, Mobile Money (MTN, Moov) or hard currency depending on your situation — agreed on a call.' },
    { icon: Globe, title: 'Clients in Benin, West Africa and the French-speaking world', text: 'The same standard, whether the client is in Cotonou, Abidjan, Dakar or Paris.' },
  ],
  faqs: [
    { question: 'Where is NovatrixAI based?', answer: 'In Cotonou, Benin.' },
    { question: 'Do you work with businesses outside Benin?', answer: 'Yes, with clients across West Africa and the French-speaking world, remotely — distance changes nothing about quality or follow-up.' },
    { question: 'Do you accept payment in FCFA or Mobile Money?', answer: 'Yes. Bank transfer, Mobile Money or hard currency depending on your situation, agreed on a call.' },
    { question: 'Do you work with the informal sector or small structures?', answer: 'Yes. A small structure needs a reliable system as much as a large one — the scope adapts to your size, not the other way around.' },
  ],
  related: [
    { title: 'Our services', to: '/offres', description: 'Acquisition system, AI piloting agents, web and application development.' },
    { title: 'Our case studies', to: '/realisations', description: 'Systems actually delivered, in Benin and internationally.' },
    { title: 'Contact us', to: '/contact', description: 'A short call to map your need, no commitment.' },
  ],
  relatedOfferTo: '/offres',
  ctaTitle: 'Based in Cotonou or elsewhere in West Africa? Let’s talk about your system.',
} : {
  kicker: 'novatrixai · cotonou', title: 'Agence IA à Cotonou',
  description: 'NovatrixAI conçoit des systèmes d’acquisition, des agents IA et des applications sur mesure pour les entreprises du Bénin, d’Afrique de l’Ouest et de la francophonie — basée à Cotonou, à distance pour le reste du monde.',
  painTitle: 'Ce qui bloque une PME béninoise face au numérique',
  painPoints: [
    { title: 'Les outils occidentaux ignorent vos contraintes locales', text: 'Mobile Money, connexion instable, WhatsApp comme canal principal — la plupart des solutions ne sont pas pensées pour cette réalité.' },
    { title: 'Trouver un prestataire IA fiable, sur place ou à distance, reste difficile', text: 'Entre les agences trop chères et les freelances sans suivi, peu d’options offrent un accompagnement dans la durée.' },
    { title: 'Les agences internationales facturent en devise forte, sans connaître le marché', text: 'Un tarif pensé pour l’Europe ou l’Amérique du Nord ne tient pas compte de votre réalité économique.' },
    { title: 'Le secteur informel reste largement à l’écart du numérique', text: 'Gestion de caisse, suivi des ventes, facturation : la majorité des petites structures fonctionnent encore entièrement au papier.' },
  ],
  capabilitiesTitle: 'Ce que ça change de travailler avec une agence basée ici',
  capabilities: [
    { icon: MapPin, title: 'Basés à Cotonou, disponibles en présentiel', text: 'Un rendez-vous en personne est possible pour les clients locaux — pas seulement une visioconférence.' },
    { icon: Smartphone, title: 'Pensé pour WhatsApp et le mobile d’abord', text: 'Nos systèmes sont conçus pour fonctionner sur les canaux et les connexions réellement utilisés ici.' },
    { icon: Wallet, title: 'Paiement en FCFA ou Mobile Money', text: 'Virement, Mobile Money (MTN, Moov) ou devise forte selon votre situation — à convenir en appel.' },
    { icon: Globe, title: 'Clients au Bénin, en Afrique de l’Ouest et en francophonie', text: 'Le même niveau d’exigence, que le client soit à Cotonou, Abidjan, Dakar ou Paris.' },
  ],
  faqs: [
    { question: 'Où est basée NovatrixAI ?', answer: 'À Cotonou, au Bénin.' },
    { question: 'Travaillez-vous avec des entreprises hors du Bénin ?', answer: 'Oui, avec des clients dans toute l’Afrique de l’Ouest et la francophonie, à distance — la distance ne change rien à la qualité ni au suivi.' },
    { question: 'Acceptez-vous les paiements en FCFA ou en Mobile Money ?', answer: 'Oui. Virement, Mobile Money ou devise forte selon votre situation, à convenir en appel.' },
    { question: 'Travaillez-vous avec le secteur informel ou les petites structures ?', answer: 'Oui. Une petite structure a autant besoin d’un système fiable qu’une grande — le périmètre s’adapte à votre taille, pas l’inverse.' },
  ],
  related: [
    { title: 'Nos offres', to: '/offres', description: 'Système d’acquisition, agents IA de pilotage, création web et applications.' },
    { title: 'Nos réalisations', to: '/realisations', description: 'Des systèmes réellement livrés, au Bénin et à l’international.' },
    { title: 'Nous contacter', to: '/contact', description: 'Un appel court pour cartographier votre besoin, sans engagement.' },
  ],
  relatedOfferTo: '/offres',
  ctaTitle: 'Basé à Cotonou ou ailleurs en Afrique de l’Ouest ? Discutons de votre système.',
})
</script>
