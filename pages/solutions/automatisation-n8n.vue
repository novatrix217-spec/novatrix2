<template><SolutionDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></SolutionDetail></template>
<script setup lang="ts">
import { Workflow, Plug, AlertTriangle, GitBranch, Server } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'n8n Automation — custom workflows between your tools', description: 'Design, development and maintenance of n8n workflows: your tools talk to each other, your data flows on its own, no more manual re-entry.' }
  : { title: 'Automatisation n8n — workflows sur mesure entre vos outils', description: 'Conception, développement et maintenance de workflows n8n : vos outils se parlent, vos données circulent seules, plus de ressaisie manuelle.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'Your tools connected by n8n — <span class="text-gradient">no re-entry, nothing missed.</span>'
  : 'Vos outils reliés par n8n — <span class="text-gradient">sans ressaisie, sans oubli.</span>')
const site = useRuntimeConfig().public.siteUrl
useHead({ script: [
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: locale.value==='en'?'n8n Automation':'Automatisation n8n', serviceType: locale.value==='en'?'Automation workflow development':'Développement de workflows d’automatisation', provider: { '@type': 'Organization', name: 'NovatrixAI' }, areaServed: 'BJ', inLanguage: locale.value, description: locale.value==='en'?'Design and maintenance of n8n workflows connecting existing business tools.':'Conception et maintenance de workflows n8n reliant les outils métier existants.' }) },
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale.value==='en'?'Home':'Accueil', item: locale.value==='en'?`${site}/en`:site }, { '@type': 'ListItem', position: 2, name: locale.value==='en'?'AI Agents':'Agents IA', item: `${site}${locale.value==='en'?'/en':''}/offres/pilotage-ia` }, { '@type': 'ListItem', position: 3, name: locale.value==='en'?'n8n Automation':'Automatisation n8n', item: `${site}${locale.value==='en'?'/en':''}/solutions/automatisation-n8n` }] }) },
] })
const content = computed(() => locale.value === 'en' ? {
  kicker: 'solution · n8n automation', title: 'n8n Automation',
  description: 'n8n connects your applications so information flows on its own. We design, build and maintain the workflows that replace your repetitive tasks.',
  painTitle: 'What’s costing you time every week',
  painPoints: [
    { title: 'The same data typed three times, in three different tools', text: 'Every manual re-entry is one more chance to make a mistake — or to forget.', after: 'Data flows on its own, entered once, up to date everywhere.' },
    { title: 'An email that triggers five manual actions', text: 'Creating a contact, opening a file, notifying the team: repeated gestures a workflow runs in seconds.', after: 'The five actions run on their own, in seconds.' },
    { title: 'No one knows why a workflow stopped last night', text: 'Without monitoring or alerts, a broken automation can run empty for days before anyone notices.', after: 'An alert fires on the first failure, before it piles up.' },
    { title: 'Every new tool adds one more connection to maintain by hand', text: 'The bigger your stack grows, the more manual bridges pile up between your tools — until it’s unmanageable.', after: 'Each new tool plugs in, with no manual bridge to maintain.' },
  ],
  capabilitiesTitle: 'What a well-built n8n workflow gives you',
  capabilities: [
    { icon: Workflow, title: 'Custom workflows, not templates', text: 'Every automation is built around your real process, not a generic template adapted on the fly.' },
    { icon: Plug, title: 'Connected to your existing tools', text: 'CRM, messaging, spreadsheet, accounting: we connect what you already use, without forcing a full switch.' },
    { icon: GitBranch, title: 'Conditional logic and loops', text: 'n8n handles complex cases — conditions, branches, loops — not just a trigger followed by one action.' },
    { icon: AlertTriangle, title: 'Alerts on failure', text: 'If a step fails, you know immediately — not three weeks later when you discover the damage.' },
    { icon: Server, title: 'Hosting and maintenance included', text: 'The workflow runs, we monitor it, we fix it if a third-party API changes without warning.' },
  ],
  faqs: [
    { question: 'Why n8n rather than Zapier or Make?', answer: 'n8n handles complex logic (loops, conditions, branches) at a predictable cost, and can be self-hosted for sensitive data. We pick the tool based on your case, not out of habit.' },
    { question: 'Who maintains the workflow after delivery?', answer: 'We do, by default over the agreed period. Third-party automations (an API change, a quota hit) are the top cause of failure, and we monitor for them.' },
    { question: 'Can we start from a tool we already use?', answer: 'Yes, almost always. We map what already exists before proposing a connection, never the other way around.' },
    { question: 'What happens if a third-party tool changes its API?', answer: 'We catch it through our alerts and fix the workflow — that’s included in post-delivery support.' },
  ],
  related: [
    { title: 'AI Piloting Agents', to: '/offres/pilotage-ia', description: 'The full system where your n8n workflows plug into agents piloted from WhatsApp.' },
    { title: 'Three levels of autonomy for your AI agents', to: '/blog/trois-niveaux-d-autonomie-pour-vos-agents-ia-et-ou-mettre-le-curseur', description: 'The framework we use to decide how far a workflow acts on its own.' },
    { title: 'Our case studies', to: '/realisations', description: 'n8n automations actually delivered: CRM, content, publishing, HR.' },
  ],
  relatedOfferTo: '/offres/pilotage-ia',
  ctaTitle: 'Which repetitive task costs you the most time this week? Let’s start there.',
} : {
  kicker: 'solution · automatisation n8n', title: 'Automatisation n8n',
  description: 'n8n connecte vos applications entre elles pour que l’information circule seule. Nous concevons, construisons et maintenons les workflows qui remplacent vos tâches répétitives.',
  painTitle: 'Ce qui vous fait perdre du temps chaque semaine',
  painPoints: [
    { title: 'Une même donnée saisie trois fois, dans trois outils différents', text: 'Chaque ressaisie manuelle est une occasion de plus de faire une erreur — ou d’oublier.', after: 'La donnée circule seule, saisie une fois, partout à jour.' },
    { title: 'Un email reçu qui déclenche cinq actions manuelles', text: 'Créer un contact, ouvrir un dossier, notifier l’équipe : des gestes répétés qu’un workflow exécute en quelques secondes.', after: 'Les cinq actions s’exécutent seules, en quelques secondes.' },
    { title: 'Personne ne sait pourquoi un workflow s’est arrêté la nuit dernière', text: 'Sans supervision ni alerte, une automatisation cassée peut tourner à vide pendant des jours sans que personne ne le remarque.', after: 'Une alerte part au premier échec, avant que ça ne s’accumule.' },
    { title: 'Chaque nouvel outil ajoute une connexion de plus à maintenir à la main', text: 'Plus votre stack grossit, plus le nombre de ponts manuels entre vos outils augmente — jusqu’à devenir ingérable.', after: 'Chaque nouvel outil se branche, sans pont manuel à entretenir.' },
  ],
  capabilitiesTitle: 'Ce qu’un workflow n8n bien conçu apporte',
  capabilities: [
    { icon: Workflow, title: 'Workflows sur mesure, pas des templates', text: 'Chaque automatisation est construite autour de votre process réel, pas d’un modèle générique adapté à la va-vite.' },
    { icon: Plug, title: 'Connecté à vos outils existants', text: 'CRM, messagerie, tableur, comptabilité : on relie ce que vous utilisez déjà, sans vous forcer à tout changer.' },
    { icon: GitBranch, title: 'Logique conditionnelle et boucles', text: 'n8n gère les cas complexes — conditions, branches, boucles — pas seulement un déclencheur suivi d’une action.' },
    { icon: AlertTriangle, title: 'Alertes en cas d’échec', text: 'Si une étape échoue, vous le savez immédiatement — pas trois semaines plus tard en découvrant les dégâts.' },
    { icon: Server, title: 'Hébergement et maintenance assurés', text: 'Le workflow tourne, on le surveille, on le corrige si une API tierce change sans prévenir.' },
  ],
  faqs: [
    { question: 'Pourquoi n8n plutôt que Zapier ou Make ?', answer: 'n8n gère les logiques complexes (boucles, conditions, branches) à un coût prévisible, et peut s’auto-héberger pour les données sensibles. On choisit l’outil selon votre cas, pas par habitude.' },
    { question: 'Qui maintient le workflow après la livraison ?', answer: 'Nous, par défaut sur la période convenue. Les automatisations tierces (API qui change, quota dépassé) sont la première cause de panne, et on les surveille.' },
    { question: 'Peut-on partir d’un outil qu’on utilise déjà ?', answer: 'Oui, presque toujours. On cartographie l’existant avant de proposer une connexion, jamais l’inverse.' },
    { question: 'Que se passe-t-il si un outil tiers change son API ?', answer: 'On le détecte via nos alertes et on corrige le workflow — c’est inclus dans le suivi post-livraison.' },
  ],
  related: [
    { title: 'Agents IA de pilotage', to: '/offres/pilotage-ia', description: 'Le système complet où vos workflows n8n s’intègrent à des agents pilotables depuis WhatsApp.' },
    { title: 'Trois niveaux d’autonomie pour vos agents IA', to: '/blog/trois-niveaux-d-autonomie-pour-vos-agents-ia-et-ou-mettre-le-curseur', description: 'Le cadre qu’on applique pour décider jusqu’où un workflow agit seul.' },
    { title: 'Nos réalisations', to: '/realisations', description: 'Des automatisations n8n réellement livrées : CRM, contenu, publication, RH.' },
  ],
  relatedOfferTo: '/offres/pilotage-ia',
  ctaTitle: 'Quelle tâche répétitive vous coûte le plus de temps cette semaine ? Commençons par elle.',
})
</script>
