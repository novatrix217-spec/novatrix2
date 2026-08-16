<template><OfferDetail v-bind="content"><template #title><span v-html="titleHtml"/></template><template #visual><div><AgentChatDemo/><p class="mt-4 text-center font-mono text-[10px] text-[var(--muted)]">{{ locale==='en' ? 'simulation · human validation active' : 'simulation · validation humaine active' }}</p></div></template></OfferDetail></template>
<script setup lang="ts">
import { CalendarCheck,FileSearch,LineChart } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'AI piloting agents — your business obeys you', description: 'A team of AI agents that handles finance, documents, agenda, reporting and operations from a simple WhatsApp or Telegram message. You decide, they execute. Book your call.' }
  : { title: 'Agents IA de pilotage — votre entreprise vous obéit', description: 'Une équipe d’agents IA qui gère finance, documents, agenda, reporting et opérations sur un simple message WhatsApp ou Telegram. Vous décidez, ils exécutent. Réservez votre appel.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'Run your whole business from <span class="text-gradient">a simple conversation.</span>'
  : 'Dirigez toute votre boîte depuis <span class="text-gradient">une simple conversation.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer b · ai piloting', title: 'AI Piloting Agents',
  description: 'You send a message or a voice note. Your agents analyze, act inside your tools and report back — without you ever touching a spreadsheet.',
  systemTitle: 'A team of expert assistants, available 24/7 in your pocket.',
  systemText: 'No more tools that don’t talk to each other. The system connects email, agenda, accounting, documents, social media and CRM into a single chain. Each agent has its role, its autonomy and your validation rules, under your control.',
  guard: 'On legal, tax and financial matters, the agents prepare and inform your decision. They do not replace a licensed professional and keep your human validation at every step.',
  modules: ['Finance and invoicing that run on their own', 'Documents and legal work prepared for you', 'Advice and decision support', 'Social media and communication kept up', 'Agenda, reporting and coordination without effort'],
  capabilitiesTitle: 'Stop carrying it all. Take back some altitude.',
  capabilities: [{icon:LineChart,title:'See clearly',text:'Reports and alerts deliver the right info at the right time, without ever chasing your data.'},{icon:CalendarCheck,title:'Move forward',text:'Agenda, follow-ups, emails and tasks get handled from a simple message. What you ask gets done.'},{icon:FileSearch,title:'Stay secure',text:'Your sensitive documents are prepared and surfaced for validation. Nothing ships without your go-ahead.'}],
  steps: [{step:'01',title:'We listen',text:'Your tools, your tasks, your pain points and your limits.',outcome:'a map of your tasks and a first scope of agents to deploy.'},{step:'02',title:'We design',text:'Your agents, their access and their autonomy levels, tailored to you.',outcome:'your agents’ architecture and their autonomy levels validated.'},{step:'03',title:'We secure',text:'Real scenarios tested and safeguards set before anything else.',outcome:'tested scenarios and safeguards in place before any real run.'},{step:'04',title:'We deploy',text:'Progressive rollout and a system that grows with you.',outcome:'a first agent running, with a scale-up plan.'}],
  ctaTitle: 'Talk to your business. It’ll know what to do. Book your call.',
} : {
  kicker: 'offre b · pilotage ia', title: 'Agents IA de pilotage',
  description: 'Vous envoyez un message ou un vocal. Vos agents analysent, agissent dans vos outils et vous rendent compte, sans que vous touchiez à un tableur.',
  systemTitle: 'Une équipe d’assistants experts, disponible 24h/24 dans votre poche.',
  systemText: 'Fini les outils qui ne se parlent pas. Le système relie email, agenda, comptabilité, documents, réseaux et CRM en une seule chaîne. Chaque agent a son rôle, son autonomie et vos règles de validation, sous votre contrôle.',
  guard: 'Sur les sujets juridiques, fiscaux et financiers, les agents préparent et éclairent votre décision. Ils ne remplacent pas un professionnel agréé et gardent vos validations humaines à chaque étape.',
  modules: ['Finance et facturation qui tournent seules', 'Documents et juridique préparés pour vous', 'Conseil et aide à la décision', 'Réseaux sociaux et communication tenus', 'Agenda, reporting et coordination sans effort'],
  capabilitiesTitle: 'Arrêtez de tout porter. Reprenez de la hauteur.',
  capabilities: [{icon:LineChart,title:'Voir clair',text:'Rapports et alertes vous livrent la bonne info au bon moment, sans jamais courir après vos données.'},{icon:CalendarCheck,title:'Faire avancer',text:'Agenda, relances, emails et tâches se règlent sur un simple message. Ce que vous demandez est fait.'},{icon:FileSearch,title:'Sécuriser',text:'Vos documents sensibles sont préparés et remontés pour validation. Rien ne part sans votre feu vert.'}],
  steps: [{step:'01',title:'On vous écoute',text:'Vos outils, vos tâches, vos points de douleur et vos limites.',outcome:'une cartographie de vos tâches et un premier périmètre d’agents à déployer.'},{step:'02',title:'On conçoit',text:'Vos agents, leurs accès et leurs niveaux d’autonomie, taillés pour vous.',outcome:'l’architecture de vos agents et leurs niveaux d’autonomie validés.'},{step:'03',title:'On sécurise',text:'Scénarios réels testés et garde-fous posés avant tout.',outcome:'des scénarios testés et des garde-fous en place avant le moindre run réel.'},{step:'04',title:'On déploie',text:'Mise en route progressive et système qui grandit avec vous.',outcome:'un premier agent qui tourne, avec un plan de montée en charge.'}],
  ctaTitle: 'Parlez à votre entreprise. Elle saura quoi faire. Réservez votre appel.',
})
</script>
