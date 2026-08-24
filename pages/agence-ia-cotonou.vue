<template><SolutionDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></SolutionDetail></template>
<script setup lang="ts">
import { MapPin, Workflow, Globe, MessageSquare } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'AI Agency in Cotonou — automation and AI agents in Benin', description: 'NovatrixAI designs acquisition systems, AI agents and custom applications from Cotonou, Benin.' }
  : { title: 'Agence IA à Cotonou — automatisation et agents IA au Bénin', description: 'NovatrixAI conçoit des systèmes d’acquisition, agents IA et applications sur mesure depuis Cotonou, au Bénin.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'An AI agency in Cotonou, focused on <span class="text-gradient">your business flow.</span>'
  : 'Une agence IA à Cotonou, centrée sur <span class="text-gradient">votre parcours commercial.</span>')
const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
useHead(() => ({ script: [
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'NovatrixAI', image: `${site}/favicon-192x192.png`, address: { '@type': 'PostalAddress', addressLocality: 'Cotonou', addressCountry: 'BJ' }, areaServed: 'BJ', url: site, email: 'contact@novatrixai.com', inLanguage: locale.value }) },
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale.value==='en'?'Home':'Accueil', item: locale.value==='en'?`${site}/en`:site }, { '@type': 'ListItem', position: 2, name: locale.value==='en'?'AI Agency Cotonou':'Agence IA Cotonou', item: `${site}${locale.value==='en'?'/en':''}/agence-ia-cotonou` }] }) },
] }))
const content = computed(() => locale.value === 'en' ? {
  kicker: 'novatrixai · cotonou', title: 'AI Agency in Cotonou',
  description: 'From Cotonou, NovatrixAI designs acquisition systems, controlled AI agents and custom applications. Projects can be scoped and delivered remotely.',
  painTitle: 'When your tools do not follow your customer journey',
  painPoints: [
    { title: 'Requests arrive through several channels', text: 'Information is scattered and the next action is not always clear.', after: 'A shared flow can centralize each request and its status.' },
    { title: 'Manual handoffs slow down follow-up', text: 'Copying data between tools creates delays and avoidable errors.', after: 'Useful connections reduce re-entry between existing tools.' },
    { title: 'Automation lacks safeguards', text: 'Without rules and validation points, sensitive actions are hard to delegate.', after: 'Each automated action can have a defined control level.' },
    { title: 'The website is disconnected from operations', text: 'A form alone does not show who owns the next step.', after: 'The site can feed the same process used by the team.' },
  ],
  capabilitiesTitle: 'What we can design from Cotonou',
  capabilities: [
    { icon: MapPin, title: 'A team based in Cotonou', text: 'Local meetings can be arranged when relevant to the project.' },
    { icon: Workflow, title: 'Connected business workflows', text: 'We map the process before selecting the automations and integrations.' },
    { icon: MessageSquare, title: 'Channels connected to the process', text: 'Messaging, forms and CRM can be connected according to the tools already in place.' },
    { icon: Globe, title: 'Remote project delivery', text: 'Scoping, reviews and delivery can also be organized remotely.' },
  ],
  faqs: [
    { question: 'Where is NovatrixAI based?', answer: 'NovatrixAI is based in Cotonou, Benin.' },
    { question: 'Can the project be delivered remotely?', answer: 'Yes. The audit defines the working method, review points and tools needed for remote delivery.' },
    { question: 'Do we need to replace our existing tools?', answer: 'Not by default. We first map what is already useful, then recommend only the necessary connections or changes.' },
    { question: 'Can we start with one use case?', answer: 'Yes. The audit can identify a bounded first use case and how it connects to the rest of your process.' },
  ],
  related: [
    { title: 'Our solutions', to: '/offres', description: 'Acquisition systems, controlled AI agents, websites and applications.' },
    { title: 'Our case studies', to: '/realisations', description: 'Explore the project flows documented on the site.' },
    { title: 'Book my free audit', to: '/contact', description: 'Map your current journey and identify the first useful decision.' },
  ],
  relatedOfferTo: '/offres',
  ctaTitle: 'Map the first useful improvement for your customer journey.',
} : {
  kicker: 'novatrixai · cotonou', title: 'Agence IA à Cotonou',
  description: 'Depuis Cotonou, NovatrixAI conçoit des systèmes d’acquisition, des agents IA contrôlés et des applications sur mesure. Les projets peuvent être cadrés et livrés à distance.',
  painTitle: 'Quand vos outils ne suivent pas votre parcours client',
  painPoints: [
    { title: 'Les demandes arrivent par plusieurs canaux', text: 'L’information se disperse et la prochaine action n’est pas toujours claire.', after: 'Un flux partagé peut centraliser chaque demande et son statut.' },
    { title: 'Les passages manuels ralentissent la relance', text: 'Recopier les données entre les outils crée des délais et des erreurs évitables.', after: 'Les connexions utiles réduisent la ressaisie entre vos outils.' },
    { title: 'L’automatisation manque de garde-fous', text: 'Sans règles ni points de validation, les actions sensibles sont difficiles à déléguer.', after: 'Chaque action automatisée peut avoir un niveau de contrôle défini.' },
    { title: 'Le site reste déconnecté des opérations', text: 'Un formulaire seul ne précise pas qui prend en charge l’étape suivante.', after: 'Le site peut alimenter le même processus que celui utilisé par l’équipe.' },
  ],
  capabilitiesTitle: 'Ce que nous pouvons concevoir depuis Cotonou',
  capabilities: [
    { icon: MapPin, title: 'Une équipe basée à Cotonou', text: 'Des rendez-vous locaux peuvent être organisés lorsqu’ils sont utiles au projet.' },
    { icon: Workflow, title: 'Des flux métier reliés', text: 'Nous cartographions le processus avant de choisir les automatisations et intégrations.' },
    { icon: MessageSquare, title: 'Des canaux connectés au processus', text: 'Messagerie, formulaires et CRM peuvent être reliés selon les outils déjà en place.' },
    { icon: Globe, title: 'Une livraison possible à distance', text: 'Le cadrage, les validations et la livraison peuvent aussi être organisés à distance.' },
  ],
  faqs: [
    { question: 'Où est basée NovatrixAI ?', answer: 'NovatrixAI est basée à Cotonou, au Bénin.' },
    { question: 'Le projet peut-il être livré à distance ?', answer: 'Oui. L’audit définit la méthode de travail, les points de validation et les outils nécessaires à une livraison à distance.' },
    { question: 'Faut-il remplacer nos outils existants ?', answer: 'Pas par défaut. Nous cartographions d’abord ce qui est déjà utile, puis recommandons seulement les connexions ou changements nécessaires.' },
    { question: 'Peut-on commencer par un seul cas d’usage ?', answer: 'Oui. L’audit peut identifier un premier cas délimité et sa connexion avec le reste de votre processus.' },
  ],
  related: [
    { title: 'Nos solutions', to: '/offres', description: 'Systèmes d’acquisition, agents IA contrôlés, sites et applications.' },
    { title: 'Nos réalisations', to: '/realisations', description: 'Découvrez les flux de projets documentés sur le site.' },
    { title: 'Réserver mon audit gratuit', to: '/contact', description: 'Cartographier votre parcours actuel et identifier la première décision utile.' },
  ],
  relatedOfferTo: '/offres',
  ctaTitle: 'Cartographions la première amélioration utile de votre parcours client.',
})
</script>
