<template><OfferDetail v-bind="content" :illustration="illustration"><template #title><span v-html="titleHtml"/></template></OfferDetail></template>
<script setup lang="ts">
import { Blocks,PanelsTopLeft,Workflow } from 'lucide-vue-next'
import videoAssets from '~/shared/video-lab-assets.json'
// Affiche prise sur Cloudinary : public/media/video-lab/ est exclu du depot, un chemin
// local y pointant renvoyait un 404 en production.
const illustration = (videoAssets as Record<string, { poster: string }>)['laboratoire-spatial-vide'].poster
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Custom web development and applications', description: 'Websites, web and mobile apps, APIs and integrations that connect your processes and stop double entry. Built to be used, not just demoed.' }
  : { title: 'Création web et applications sur mesure', description: 'Sites, applis web et mobiles, APIs et intégrations qui relient vos process et arrêtent les doubles saisies. Conçus pour être utilisés, pas seulement montrés.' })
usePageSeo(() => seoMeta.value.title, () => seoMeta.value.description)
// Fil d Ariane affiche en SERP a la place de l URL brute.
useBreadcrumb(() => [
  { name: locale.value === 'en' ? 'Services' : 'Offres', path: '/offres' },
  { name: seoMeta.value.title, path: '/offres/creation-web-apps' },
])
const titleHtml = computed(() => locale.value === 'en'
  ? 'A digital product designed to save time for <span class="text-gradient">your teams when adopted.</span>'
  : 'Un produit numérique conçu pour faire gagner du temps à <span class="text-gradient">vos équipes lorsqu’il est adopté.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer c · web & applications', title: 'Web & Applications',
  description: 'Websites, web and mobile applications, APIs and integrations scoped around the real workflow your team needs to support.',
  systemTitle: 'We start from your result, not a feature list.',
  systemText: 'Your sales team re-types the same order in a notebook, then in WhatsApp, then in your invoicing tool? Every re-entry is a chance for an error. We build a tool that captures the information once and is designed to save time when adopted in the scoped workflow.',
  modules: ['Scoping the real need and journey', 'A clear interface, built for actual use', 'Reliable web and mobile applications', 'APIs that connect your tools without double entry', 'Launch, documentation and ongoing evolution'],
  capabilitiesTitle: 'A product designed around real usage.',
  capabilities: [{icon:PanelsTopLeft,title:'Usage before decoration',text:'The interface is reviewed against the tasks and devices identified during scoping.'},{icon:Workflow,title:'Reduce duplicate entry',text:'The agreed integrations can move selected data between existing tools.'},{icon:Blocks,title:'Documented technical choices',text:'Architecture, interfaces and known constraints are documented for the delivered scope.'}],
  steps: [{step:'01',title:'We scope',text:'Your users, your flows, the target result.',outcome:'a clear spec and a priced scope.'},{step:'02',title:'You see',text:'A prototype to validate before investing.',outcome:'a clickable prototype to validate before any development.'},{step:'03',title:'We build',text:'Product, APIs and integrations, tested.',outcome:'a tested product, ready to go live.'},{step:'04',title:'You launch',text:'Go-live, follow-up and a planned roadmap.',outcome:'your application in production, with an evolution roadmap.'}],
  faqs: [
    { question: 'How much does this project cost?', answer: 'It depends on scope: number of screens, integrations, mobile or not. We quote it after scoping, never a generic package.' },
    { question: 'How long does delivery take?', answer: 'It depends on the validated scope and integrations. The delivery sequence and review checkpoints are set during scoping.' },
    { question: 'What if my needs change along the way?', answer: 'Normal and expected. Scoping sets a first solid version; evolutions are planned afterward rather than blocking the launch.' },
    { question: 'How are code and access handed over?', answer: 'Repository access, documentation, licenses and intellectual-property terms are stated in the project proposal and contract before implementation.' },
  ],
  ctaTitle: 'Let’s turn what’s costing you time into a reliable product.',
} : {
  kicker: 'offre c · web & applications', title: 'Création web et applications',
  description: 'Sites, applications web et mobiles, APIs et intégrations cadrés autour du flux réel que votre équipe doit soutenir.',
  systemTitle: 'On part de votre résultat, pas d’une liste de fonctionnalités.',
  systemText: 'Vos commerciaux ressaisissent la même commande dans un carnet, puis dans WhatsApp, puis dans votre outil de facturation ? Chaque ressaisie est une occasion d’erreur. On construit un outil qui capture l’information une seule fois et vise à faire gagner du temps lorsqu’il est adopté dans le flux cadré.',
  modules: ['Cadrage du besoin et du parcours réel', 'Interface claire, pensée pour l’usage', 'Applications web et mobiles fiables', 'APIs qui relient vos outils sans double saisie', 'Mise en ligne, documentation et évolution assumée'],
  capabilitiesTitle: 'Un produit conçu autour des usages réels.',
  capabilities: [{icon:PanelsTopLeft,title:'L’usage avant la décoration',text:'L’interface est revue selon les tâches et les appareils identifiés au cadrage.'},{icon:Workflow,title:'Réduire les doubles saisies',text:'Les intégrations convenues peuvent faire circuler certaines données entre les outils existants.'},{icon:Blocks,title:'Des choix techniques documentés',text:'Architecture, interfaces et contraintes connues sont documentées pour le périmètre livré.'}],
  steps: [{step:'01',title:'On cadre',text:'Vos utilisateurs, vos flux, le résultat visé.',outcome:'un cahier des charges clair et un périmètre chiffré.'},{step:'02',title:'Vous voyez',text:'Un prototype à valider avant d’investir.',outcome:'un prototype cliquable à valider avant tout développement.'},{step:'03',title:'On construit',text:'Produit, APIs et intégrations, testés.',outcome:'un produit testé, prêt à être mis en ligne.'},{step:'04',title:'Vous lancez',text:'Mise en ligne, suivi et suite planifiée.',outcome:'votre application en production, avec une roadmap d’évolution.'}],
  faqs: [
    { question: 'Combien coûte ce projet ?', answer: 'Ça dépend du périmètre : nombre d’écrans, intégrations, mobile ou non. On chiffre après cadrage, jamais au forfait générique.' },
    { question: 'Combien de temps pour être livré ?', answer: 'Cela dépend du périmètre validé et des intégrations. La séquence de livraison et les points de revue sont fixés pendant le cadrage.' },
    { question: 'Et si mes besoins évoluent en cours de route ?', answer: 'Normal, et prévu. Le cadrage fixe une première version solide ; les évolutions se planifient ensuite, sans bloquer le lancement.' },
    { question: 'Comment le code et les accès sont-ils transmis ?', answer: 'Les accès au dépôt, la documentation, les licences et les conditions de propriété intellectuelle sont précisés dans la proposition et le contrat avant l’implémentation.' },
  ],
  ctaTitle: 'Transformons ce qui vous fait perdre du temps en produit fiable.',
})
</script>
