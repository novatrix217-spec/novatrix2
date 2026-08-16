<template><SolutionDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></SolutionDetail></template>
<script setup lang="ts">
import { MessageCircle, Zap, Database, Users, ShieldCheck } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'WhatsApp AI Agent — automatic 24/7 qualification and replies', description: 'An AI agent wired into WhatsApp Business that understands natural language, replies from your real data and qualifies your leads before handing off to a human.' }
  : { title: 'Agent IA WhatsApp — qualification et réponse automatique 24h/24', description: 'Un agent IA branché sur WhatsApp Business qui comprend une demande en langage naturel, répond depuis vos vraies données et qualifie vos leads avant transfert à un humain.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'An AI agent that replies on WhatsApp, <span class="text-gradient">24/7 — without you.</span>'
  : 'Un agent IA qui répond sur WhatsApp, <span class="text-gradient">24h/24 — sans vous.</span>')
const site = useRuntimeConfig().public.siteUrl
useHead({ script: [
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: locale.value==='en'?'WhatsApp AI Agent':'Agent IA WhatsApp', serviceType: locale.value==='en'?'WhatsApp Business conversational agent':'Agent conversationnel WhatsApp Business', provider: { '@type': 'Organization', name: 'NovatrixAI' }, areaServed: 'BJ', inLanguage: locale.value, description: locale.value==='en'?'AI agent deployed on WhatsApp Business: automatic replies, lead qualification and human escalation.':'Agent IA déployé sur WhatsApp Business : réponse automatique, qualification de leads et escalade humaine.' }) },
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale.value==='en'?'Home':'Accueil', item: locale.value==='en'?`${site}/en`:site }, { '@type': 'ListItem', position: 2, name: locale.value==='en'?'AI Agents':'Agents IA', item: `${site}${locale.value==='en'?'/en':''}/offres/pilotage-ia` }, { '@type': 'ListItem', position: 3, name: locale.value==='en'?'WhatsApp AI Agent':'Agent IA WhatsApp', item: `${site}${locale.value==='en'?'/en':''}/solutions/agent-whatsapp-ia` }] }) },
] })
const content = computed(() => locale.value === 'en' ? {
  kicker: 'solution · whatsapp ai agent', title: 'WhatsApp AI Agent',
  description: 'WhatsApp is already the channel your clients open first. We wire in an agent that understands, replies and qualifies — not a rigid scripted chatbot.',
  painTitle: 'What’s costing you clients on WhatsApp today',
  painPoints: [
    { title: 'Clients write, no one replies for hours', text: 'Every hour of silence on WhatsApp is an hour where the prospect looks elsewhere.', after: 'A reply within seconds, day and night.' },
    { title: 'Your team answers the same questions on loop', text: 'Hours, prices, availability: the same messages come back every day and eat up time on obvious answers.', after: 'The agent absorbs the recurring questions, your team focuses on the rest.' },
    { title: 'No way to know who was followed up, or when', text: 'Without a system, every conversation lives on one person’s phone — invisible to the rest of the team.', after: 'Every conversation is tracked and visible to the whole team.' },
    { title: 'Your market’s most-used channel is its least equipped', text: 'A CRM, a website, some ads — and zero system on the channel where your clients actually talk to you.', after: 'Your main channel becomes your best-equipped one.' },
  ],
  capabilitiesTitle: 'What the agent actually does',
  capabilities: [
    { icon: MessageCircle, title: 'Natural understanding', text: 'The agent understands a normally phrased request, not just keywords or a menu of choices.' },
    { icon: Zap, title: 'Instant reply, 24/7', text: 'Every message gets a reply within seconds, nights and weekends included.' },
    { icon: Database, title: 'Wired into your real data', text: 'The agent draws on your FAQ, your catalog or your documentation — never a made-up answer on a sensitive topic.' },
    { icon: Users, title: 'Qualification and hand-off at the right time', text: 'A hot lead is identified and passed to a human with full context, not just a name and a number.' },
    { icon: ShieldCheck, title: 'Built-in human escalation', text: 'The moment a request falls outside the scope, the agent hands off — never a forced answer on something it doesn’t know.' },
  ],
  faqs: [
    { question: 'Does a WhatsApp AI agent replace my team?', answer: 'No, it absorbs repetitive questions and qualifies requests, so your team can focus on what really needs a human.' },
    { question: 'Do I need the official WhatsApp Business API?', answer: 'Yes, it’s the only reliable and compliant path for automated professional use — we handle the setup.' },
    { question: 'Can the agent get it wrong or hallucinate?', answer: 'It answers from your real data, not improvisation. On ambiguous cases, it escalates to a human rather than guessing.' },
    { question: 'How long does it take to deploy?', answer: 'A simple agent on a FAQ can be live within days; an agent connected to your CRM and calendar needs more scoping. We quote that on a call.' },
  ],
  related: [
    { title: 'AI Piloting Agents', to: '/offres/pilotage-ia', description: 'The full system: finance, agenda, social media and reporting piloted from WhatsApp.' },
    { title: 'Why WhatsApp is the right channel in French-speaking Africa', to: '/blog/pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone', description: 'The full analysis: adoption, use cases and limits of piloting through WhatsApp.' },
    { title: 'Our case studies', to: '/realisations', description: 'Agents and automations actually delivered, with the stack used.' },
  ],
  relatedOfferTo: '/offres/pilotage-ia',
  ctaTitle: 'Your first WhatsApp agent could be live before the end of the month. Let’s talk.',
} : {
  kicker: 'solution · agent whatsapp ia', title: 'Agent IA WhatsApp',
  description: 'WhatsApp est déjà le canal que vos clients ouvrent en premier. Nous y branchons un agent qui comprend, répond et qualifie — pas un chatbot à scénarios rigides.',
  painTitle: 'Ce qui vous coûte des clients sur WhatsApp aujourd’hui',
  painPoints: [
    { title: 'Vos clients écrivent, personne ne répond avant plusieurs heures', text: 'Chaque heure de silence sur WhatsApp est une heure où le prospect regarde ailleurs.', after: 'Réponse en quelques secondes, jour et nuit.' },
    { title: 'Votre équipe répond en boucle aux mêmes questions', text: 'Horaires, tarifs, disponibilité : les mêmes messages reviennent chaque jour et mobilisent du temps sur des réponses évidentes.', after: 'L’agent absorbe les questions récurrentes, votre équipe se concentre sur le reste.' },
    { title: 'Impossible de savoir qui a été relancé, et quand', text: 'Sans système, chaque conversation vit dans le téléphone d’une seule personne — invisible pour le reste de l’équipe.', after: 'Chaque conversation est tracée et visible par toute l’équipe.' },
    { title: 'Le canal le plus utilisé de votre marché reste le moins outillé', text: 'Un CRM, un site, de la pub — et zéro système sur le canal où vos clients vous parlent réellement.', after: 'Votre canal principal devient votre canal le mieux équipé.' },
  ],
  capabilitiesTitle: 'Ce que l’agent fait, concrètement',
  capabilities: [
    { icon: MessageCircle, title: 'Compréhension naturelle', text: 'L’agent comprend une demande formulée normalement, pas seulement des mots-clés ou un menu à choix.' },
    { icon: Zap, title: 'Réponse immédiate, 24h/24', text: 'Chaque message reçoit une réponse en quelques secondes, week-end et nuit compris.' },
    { icon: Database, title: 'Branché sur vos vraies données', text: 'L’agent s’appuie sur votre FAQ, votre catalogue ou votre documentation — jamais une réponse inventée sur un sujet sensible.' },
    { icon: Users, title: 'Qualification et transfert au bon moment', text: 'Un lead chaud est identifié et transmis à un humain avec le contexte complet, pas juste un nom et un numéro.' },
    { icon: ShieldCheck, title: 'Escalade humaine intégrée', text: 'Dès que la demande sort du cadre prévu, l’agent passe la main — jamais de réponse forcée sur un sujet qu’il ne maîtrise pas.' },
  ],
  faqs: [
    { question: 'Un agent WhatsApp IA remplace-t-il mon équipe ?', answer: 'Non, il absorbe les questions répétitives et qualifie les demandes, pour que votre équipe se concentre sur ce qui a vraiment besoin d’un humain.' },
    { question: 'Faut-il l’API WhatsApp Business officielle ?', answer: 'Oui, c’est la seule voie fiable et conforme pour un usage professionnel automatisé — nous nous chargeons de la mise en place.' },
    { question: 'L’agent peut-il se tromper ou halluciner ?', answer: 'Il répond à partir de vos données réelles, pas d’une improvisation. Sur les cas ambigus, il escalade vers un humain plutôt que de deviner.' },
    { question: 'Combien de temps pour le déployer ?', answer: 'Un agent simple sur une FAQ se met en place en quelques jours ; un agent connecté à votre CRM et votre agenda demande plus de cadrage. On chiffre ça en appel.' },
  ],
  related: [
    { title: 'Agents IA de pilotage', to: '/offres/pilotage-ia', description: 'Le système complet : finance, agenda, réseaux sociaux et reporting pilotés depuis WhatsApp.' },
    { title: 'Pourquoi WhatsApp est le bon canal en Afrique francophone', to: '/blog/pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone', description: 'L’analyse complète : adoption, cas d’usage et limites du pilotage par WhatsApp.' },
    { title: 'Nos réalisations', to: '/realisations', description: 'Des agents et automatisations réellement livrés, avec la stack utilisée.' },
  ],
  relatedOfferTo: '/offres/pilotage-ia',
  ctaTitle: 'Votre premier agent WhatsApp peut être en ligne avant la fin du mois. Parlons-en.',
})
</script>
