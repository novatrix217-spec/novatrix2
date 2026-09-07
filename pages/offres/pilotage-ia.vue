<template><OfferDetail v-bind="content"><template #title><span v-html="titleHtml"/></template><template #visual><div><AgentChatDemo/><p class="mt-4 text-center font-mono text-[10px] text-[var(--muted)]">{{ locale==='en' ? 'simulation · human validation active' : 'simulation · validation humaine active' }}</p></div></template></OfferDetail></template>
<script setup lang="ts">
import { CalendarCheck,FileSearch,LineChart } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Controlled AI piloting agents', description: 'Connect selected operational tasks to AI agents with explicit access, validation and escalation rules.' }
  : { title: 'Agents IA de pilotage contrôlés', description: 'Reliez certaines tâches opérationnelles à des agents IA avec des règles explicites d’accès, de validation et d’escalade.' })
usePageSeo(() => seoMeta.value.title, () => seoMeta.value.description)
// Fil d Ariane affiche en SERP a la place de l URL brute.
useBreadcrumb(() => [
  { name: locale.value === 'en' ? 'Services' : 'Offres', path: '/offres' },
  { name: seoMeta.value.title, path: '/offres/pilotage-ia' },
])
const titleHtml = computed(() => locale.value === 'en'
  ? 'Pilot selected workflows through <span class="text-gradient">a controlled conversation.</span>'
  : 'Pilotez certains flux via <span class="text-gradient">une conversation contrôlée.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer b · ai piloting', title: 'AI Piloting Agents',
  description: 'A message can trigger an approved workflow, prepare information or request a validation inside the tools selected during scoping.',
  systemTitle: 'A controlled team of assistants, connected to your daily tools.',
  systemText: 'No more tools that don’t talk to each other. The system connects email, agenda, accounting, documents, social media and CRM into a single chain. Each agent has its role, its autonomy and your validation rules, under your control.',
  guard: 'On legal, tax and financial matters, the agents prepare and inform your decision. They do not replace a licensed professional and keep your human validation at every step.',
  modules: ['Finance or invoicing information prepared for review', 'Document workflows with human validation', 'Decision-support summaries', 'Approved communication workflows', 'Agenda, reporting and coordination tasks'],
  capabilitiesTitle: 'Stop carrying it all. Take back some altitude.',
  capabilities: [{icon:LineChart,title:'See the agreed signals',text:'Reports and alerts gather the information selected during scoping.'},{icon:CalendarCheck,title:'Trigger a controlled workflow',text:'A message starts only the actions and access rules explicitly configured.'},{icon:FileSearch,title:'Keep human review',text:'Sensitive outputs are prepared and surfaced for validation before the next action.'}],
  steps: [{step:'01',title:'We listen',text:'Your tools, your tasks, your pain points and your limits.',outcome:'a map of your tasks and a first scope of agents to deploy.'},{step:'02',title:'We design',text:'Your agents, their access and their autonomy levels, tailored to you.',outcome:'your agents’ architecture and their autonomy levels validated.'},{step:'03',title:'We secure',text:'Real scenarios tested and safeguards set before anything else.',outcome:'tested scenarios and safeguards in place before any real run.'},{step:'04',title:'We deploy',text:'Progressive rollout and a system that grows with you.',outcome:'a first agent running, with a scale-up plan.'}],
  faqs: [
    { question: 'How is this system priced?', answer: 'It depends on the number of workflows, access rules and integrations. The free audit defines the useful first scope.' },
    { question: 'How is the delivery timeline set?', answer: 'It depends on the validated workflows, data access and safeguards. The delivery sequence is agreed after scoping.' },
    { question: 'What if the agent gets something wrong?', answer: 'On legal, tax and financial matters, it prepares and proposes — you validate. On the rest, an escalation safeguard is set with you before the first deployment.' },
    { question: 'Can I limit what the agent does on its own?', answer: 'Yes, the autonomy level is fixed with you, action by action, before the first deployment.' },
  ],
  ctaTitle: 'Identify the first workflow worth controlling with an agent.',
} : {
  kicker: 'offre b · pilotage ia', title: 'Agents IA de pilotage',
  description: 'Un message peut déclencher un flux validé, préparer une information ou demander une validation dans les outils sélectionnés au cadrage.',
  systemTitle: 'Une équipe d’assistants contrôlés, reliée à vos outils du quotidien.',
  systemText: 'Fini les outils qui ne se parlent pas. Le système relie email, agenda, comptabilité, documents, réseaux et CRM en une seule chaîne. Chaque agent a son rôle, son autonomie et vos règles de validation, sous votre contrôle.',
  guard: 'Sur les sujets juridiques, fiscaux et financiers, les agents préparent et éclairent votre décision. Ils ne remplacent pas un professionnel agréé et gardent vos validations humaines à chaque étape.',
  modules: ['Informations financières ou de facturation préparées pour revue', 'Flux documentaires avec validation humaine', 'Synthèses d’aide à la décision', 'Flux de communication validés', 'Tâches d’agenda, de reporting et de coordination'],
  capabilitiesTitle: 'Arrêtez de tout porter. Reprenez de la hauteur.',
  capabilities: [{icon:LineChart,title:'Voir les signaux convenus',text:'Rapports et alertes regroupent les informations sélectionnées au cadrage.'},{icon:CalendarCheck,title:'Déclencher un flux contrôlé',text:'Un message lance uniquement les actions et droits explicitement configurés.'},{icon:FileSearch,title:'Garder la revue humaine',text:'Les sorties sensibles sont préparées et remontées pour validation avant l’action suivante.'}],
  steps: [{step:'01',title:'On vous écoute',text:'Vos outils, vos tâches, vos points de douleur et vos limites.',outcome:'une cartographie de vos tâches et un premier périmètre d’agents à déployer.'},{step:'02',title:'On conçoit',text:'Vos agents, leurs accès et leurs niveaux d’autonomie, taillés pour vous.',outcome:'l’architecture de vos agents et leurs niveaux d’autonomie validés.'},{step:'03',title:'On sécurise',text:'Scénarios réels testés et garde-fous posés avant tout.',outcome:'des scénarios testés et des garde-fous en place avant le moindre run réel.'},{step:'04',title:'On déploie',text:'Mise en route progressive et système qui grandit avec vous.',outcome:'un premier agent qui tourne, avec un plan de montée en charge.'}],
  faqs: [
    { question: 'Comment ce système est-il chiffré ?', answer: 'Cela dépend du nombre de flux, des règles d’accès et des intégrations. L’audit gratuit définit le premier périmètre utile.' },
    { question: 'Comment le délai de livraison est-il fixé ?', answer: 'Il dépend des flux validés, des accès aux données et des garde-fous. La séquence de livraison est convenue après le cadrage.' },
    { question: 'Que se passe-t-il si l’agent se trompe ?', answer: 'Sur les sujets juridiques, fiscaux et financiers, il prépare et propose — c’est vous qui validez. Sur le reste, un garde-fou d’escalade est fixé avec vous avant le premier déploiement.' },
    { question: 'Puis-je limiter ce que l’agent fait seul ?', answer: 'Oui, le niveau d’autonomie est fixé avec vous, action par action, avant le premier déploiement.' },
  ],
  ctaTitle: 'Identifiez le premier flux à confier à un agent contrôlé.',
})
</script>
