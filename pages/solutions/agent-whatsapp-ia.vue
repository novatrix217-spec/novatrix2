<template><SolutionDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></SolutionDetail></template>
<script setup lang="ts">
import { MessageCircle, Zap, Database, Users, ShieldCheck } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'WhatsApp AI Agent — qualification with human handoff', description: 'An AI agent wired into WhatsApp Business that uses your approved data, qualifies requests and hands the conversation to a human when needed.' }
  : { title: 'Agent IA WhatsApp — qualification avec relais humain', description: 'Un agent IA branché sur WhatsApp Business qui utilise vos données validées, qualifie les demandes et transmet la conversation à un humain quand nécessaire.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'Qualify WhatsApp requests and <span class="text-gradient">hand them over with context.</span>'
  : 'Qualifiez les demandes WhatsApp et <span class="text-gradient">transmettez-les avec leur contexte.</span>')
const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
useHead(() => ({ script: [
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: locale.value==='en'?'WhatsApp AI Agent':'Agent IA WhatsApp', serviceType: locale.value==='en'?'WhatsApp Business conversational agent':'Agent conversationnel WhatsApp Business', provider: { '@type': 'Organization', name: 'NovatrixAI' }, areaServed: 'BJ', inLanguage: locale.value, description: locale.value==='en'?'AI agent deployed on WhatsApp Business: automatic replies, lead qualification and human escalation.':'Agent IA déployé sur WhatsApp Business : réponse automatique, qualification de leads et escalade humaine.' }) },
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale.value==='en'?'Home':'Accueil', item: locale.value==='en'?`${site}/en`:site }, { '@type': 'ListItem', position: 2, name: locale.value==='en'?'AI Agents':'Agents IA', item: `${site}${locale.value==='en'?'/en':''}/offres/pilotage-ia` }, { '@type': 'ListItem', position: 3, name: locale.value==='en'?'WhatsApp AI Agent':'Agent IA WhatsApp', item: `${site}${locale.value==='en'?'/en':''}/solutions/agent-whatsapp-ia` }] }) },
] }))
const content = computed(() => locale.value === 'en' ? {
  kicker: 'solution · whatsapp ai agent', title: 'WhatsApp AI Agent',
  description: 'We connect WhatsApp Business to an agent that uses approved context, replies within defined rules and hands requests to a human when needed.',
  painTitle: 'What’s costing you clients on WhatsApp today',
  painPoints: [
    { title: 'Clients write, but the request has no clear owner', text: 'The conversation waits in an inbox while the sales context remains scattered.', after: 'Known questions are handled and the right person receives the context.' },
    { title: 'Your team answers the same questions on loop', text: 'Hours, prices, availability: the same messages come back every day and eat up time on obvious answers.', after: 'The agent absorbs the recurring questions, your team focuses on the rest.' },
    { title: 'No way to know who was followed up, or when', text: 'Without a shared system, conversation context can remain on one person’s phone and be invisible to the rest of the team.', after: 'Conversations included in the agreed scope can be logged and shared with authorized team members.' },
    { title: 'Conversations are disconnected from customer context', text: 'Messages, CRM records and website requests do not always share the same status or owner.', after: 'The channel can be connected to the customer process and its validation rules.' },
  ],
  capabilitiesTitle: 'What the agent actually does',
  capabilities: [
    { icon: MessageCircle, title: 'Natural-language requests', text: 'Depending on the approved model and configuration, the agent can process normally phrased requests beyond a fixed menu of choices.' },
    { icon: Zap, title: 'Rule-based response flow', text: 'Known requests follow an approved response path; uncertain cases can be routed to a human.' },
    { icon: Database, title: 'Wired into approved data', text: 'The agent is configured to use approved sources such as your FAQ, catalog or documentation; sensitive or uncertain cases can be routed to human review.' },
    { icon: Users, title: 'Qualification and hand-off', text: 'Defined qualification rules can flag a relevant request and pass the context collected so far to a human.' },
    { icon: ShieldCheck, title: 'Human escalation rules', text: 'Requests outside the configured scope can be routed to a human instead of receiving an automatic answer.' },
  ],
  faqs: [
    { question: 'Does a WhatsApp AI agent replace my team?', answer: 'No, it absorbs repetitive questions and qualifies requests, so your team can focus on what really needs a human.' },
    { question: 'Do I need the official WhatsApp Business API?', answer: 'During the audit, we assess the official WhatsApp integration suited to your account and use case.' },
    { question: 'Can the agent get it wrong or hallucinate?', answer: 'Yes, an AI output can be wrong. The system is designed to use approved sources and route ambiguous or sensitive cases to a human, with controls defined during scoping.' },
    { question: 'How is the delivery timeline set?', answer: 'It depends on the approved knowledge base and the connections to your CRM, calendar or other tools. We scope these dependencies during the audit.' },
  ],
  related: [
    { title: 'AI Piloting Agents', to: '/offres/pilotage-ia', description: 'The full system: finance, agenda, social media and reporting piloted from WhatsApp.' },
    { title: 'Why WhatsApp is the right channel in French-speaking Africa', to: '/blog/pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone', description: 'The full analysis: adoption, use cases and limits of piloting through WhatsApp.' },
    { title: 'Our case studies', to: '/realisations', description: 'Agents and automations actually delivered, with the stack used.' },
  ],
  relatedOfferTo: '/offres/pilotage-ia',
  ctaTitle: 'Map the WhatsApp conversation that should reach your team with better context.',
} : {
  kicker: 'solution · agent whatsapp ia', title: 'Agent IA WhatsApp',
  description: 'Nous connectons WhatsApp Business à un agent qui utilise un contexte validé, répond selon des règles définies et transmet la demande à un humain lorsque nécessaire.',
  painTitle: 'Ce qui vous coûte des clients sur WhatsApp aujourd’hui',
  painPoints: [
    { title: 'Vos clients écrivent, mais la demande n’a pas de responsable clair', text: 'La conversation attend dans une messagerie pendant que le contexte commercial reste dispersé.', after: 'Les questions connues sont traitées et la bonne personne reçoit le contexte.' },
    { title: 'Votre équipe répond en boucle aux mêmes questions', text: 'Horaires, tarifs, disponibilité : les mêmes messages reviennent chaque jour et mobilisent du temps sur des réponses évidentes.', after: 'L’agent absorbe les questions récurrentes, votre équipe se concentre sur le reste.' },
    { title: 'Impossible de savoir qui a été relancé, et quand', text: 'Sans système partagé, le contexte d’une conversation peut rester dans le téléphone d’une seule personne et demeurer invisible pour le reste de l’équipe.', after: 'Les conversations incluses dans le périmètre convenu peuvent être journalisées et partagées avec les membres autorisés de l’équipe.' },
    { title: 'Les conversations sont déconnectées du contexte client', text: 'Les messages, les fiches CRM et les demandes du site ne partagent pas toujours le même statut ni le même responsable.', after: 'Le canal peut être relié au processus client et à ses règles de validation.' },
  ],
  capabilitiesTitle: 'Ce que l’agent fait, concrètement',
  capabilities: [
    { icon: MessageCircle, title: 'Demandes en langage naturel', text: 'Selon le modèle et la configuration validés, l’agent peut traiter des demandes formulées normalement au-delà d’un menu à choix fixe.' },
    { icon: Zap, title: 'Flux de réponse encadré', text: 'Les demandes connues suivent un parcours validé ; les cas incertains peuvent être transmis à un humain.' },
    { icon: Database, title: 'Branché sur des données validées', text: 'L’agent est configuré pour utiliser des sources approuvées comme votre FAQ, votre catalogue ou votre documentation ; les cas sensibles ou incertains peuvent être transmis à un humain.' },
    { icon: Users, title: 'Qualification et transfert', text: 'Des règles de qualification définies peuvent signaler une demande pertinente et transmettre à un humain le contexte collecté jusque-là.' },
    { icon: ShieldCheck, title: 'Règles d’escalade humaine', text: 'Les demandes hors du périmètre configuré peuvent être orientées vers un humain plutôt que recevoir une réponse automatique.' },
  ],
  faqs: [
    { question: 'Un agent WhatsApp IA remplace-t-il mon équipe ?', answer: 'Non, il absorbe les questions répétitives et qualifie les demandes, pour que votre équipe se concentre sur ce qui a vraiment besoin d’un humain.' },
    { question: 'Faut-il l’API WhatsApp Business officielle ?', answer: 'Nous évaluons pendant l’audit l’intégration WhatsApp officielle adaptée à votre compte et à votre cas d’usage.' },
    { question: 'L’agent peut-il se tromper ou halluciner ?', answer: 'Oui, une sortie d’IA peut être erronée. Le système est conçu pour utiliser des sources validées et transmettre les cas ambigus ou sensibles à un humain, avec des contrôles définis au cadrage.' },
    { question: 'Comment le délai de livraison est-il fixé ?', answer: 'Il dépend de la base de connaissances validée et des connexions au CRM, à l’agenda ou aux autres outils. Ces dépendances sont cadrées pendant l’audit.' },
  ],
  related: [
    { title: 'Agents IA de pilotage', to: '/offres/pilotage-ia', description: 'Le système complet : finance, agenda, réseaux sociaux et reporting pilotés depuis WhatsApp.' },
    { title: 'Pourquoi WhatsApp est le bon canal en Afrique francophone', to: '/blog/pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone', description: 'L’analyse complète : adoption, cas d’usage et limites du pilotage par WhatsApp.' },
    { title: 'Nos réalisations', to: '/realisations', description: 'Des agents et automatisations réellement livrés, avec la stack utilisée.' },
  ],
  relatedOfferTo: '/offres/pilotage-ia',
  ctaTitle: 'Cartographions la conversation WhatsApp qui doit arriver à votre équipe avec un meilleur contexte.',
})
</script>
