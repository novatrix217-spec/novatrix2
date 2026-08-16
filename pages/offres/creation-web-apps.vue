<template><OfferDetail v-bind="content"><template #title><span v-html="titleHtml"/></template></OfferDetail></template>
<script setup lang="ts">
import { Blocks,PanelsTopLeft,Workflow } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Custom web development and applications', description: 'Websites, web and mobile apps, APIs and integrations that connect your processes and stop double entry. Built to be used, not just demoed.' }
  : { title: 'Création web et applications sur mesure', description: 'Sites, applis web et mobiles, APIs et intégrations qui relient vos process et arrêtent les doubles saisies. Conçus pour être utilisés, pas seulement montrés.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const titleHtml = computed(() => locale.value === 'en'
  ? 'A digital product that actually saves time for <span class="text-gradient">your teams.</span>'
  : 'Un produit numérique qui fait vraiment gagner du temps à <span class="text-gradient">vos équipes.</span>')
const content = computed(() => locale.value === 'en' ? {
  kicker: 'offer c · web & applications', title: 'Web & Applications',
  description: 'Websites, web and mobile apps, APIs and integrations that hold up under real-world load, not just for the length of a demo. We connect what’s costing you time today.',
  systemTitle: 'We start from your result, not a feature list.',
  systemText: 'We start from who uses the tool, the decision to be made and the expected result. The interface, the data and the integrations then come to connect that loop, with no unnecessary step or dead screen.',
  modules: ['Scoping the real need and journey', 'A clear interface, built for actual use', 'Reliable web and mobile applications', 'APIs that connect your tools without double entry', 'Launch, documentation and ongoing evolution'],
  capabilitiesTitle: 'A product your teams actually use.',
  capabilities: [{icon:PanelsTopLeft,title:'Adopted without training',text:'A mobile-first interface so clear your teams act without needing it explained.'},{icon:Workflow,title:'No more double entry',text:'We connect your tools, data and automations to remove re-typing and missed steps.'},{icon:Blocks,title:'No debt that blocks you',text:'Typed code, documented architecture, deployment ready to evolve without breaking everything tomorrow.'}],
  steps: [{step:'01',title:'We scope',text:'Your users, your flows, the target result.',outcome:'a clear spec and a priced scope.'},{step:'02',title:'You see',text:'A prototype to validate before investing.',outcome:'a clickable prototype to validate before any development.'},{step:'03',title:'We build',text:'Product, APIs and integrations, tested.',outcome:'a tested product, ready to go live.'},{step:'04',title:'You launch',text:'Go-live, follow-up and a planned roadmap.',outcome:'your application in production, with an evolution roadmap.'}],
  ctaTitle: 'Let’s turn what’s costing you time into a reliable product.',
} : {
  kicker: 'offre c · web & applications', title: 'Création web et applications',
  description: 'Sites, applis web et mobiles, APIs et intégrations qui tiennent la charge du terrain, pas seulement le temps d’une démo. On relie ce qui vous fait perdre du temps aujourd’hui.',
  systemTitle: 'On part de votre résultat, pas d’une liste de fonctionnalités.',
  systemText: 'On part de qui utilise l’outil, de la décision à prendre et du résultat attendu. L’interface, les données et les intégrations viennent ensuite relier cette boucle, sans étape inutile ni écran mort.',
  modules: ['Cadrage du besoin et du parcours réel', 'Interface claire, pensée pour l’usage', 'Applications web et mobiles fiables', 'APIs qui relient vos outils sans double saisie', 'Mise en ligne, documentation et évolution assumée'],
  capabilitiesTitle: 'Un produit que vos équipes utilisent vraiment.',
  capabilities: [{icon:PanelsTopLeft,title:'Adopté sans formation',text:'Une interface mobile-first si claire que vos équipes agissent sans qu’on ait à leur expliquer.'},{icon:Workflow,title:'Fini les doubles saisies',text:'On relie vos outils, données et automatisations pour supprimer les ressaisies et les oublis.'},{icon:Blocks,title:'Zéro dette qui bloque',text:'Code typé, architecture documentée, déploiement prêt à évoluer sans tout casser demain.'}],
  steps: [{step:'01',title:'On cadre',text:'Vos utilisateurs, vos flux, le résultat visé.',outcome:'un cahier des charges clair et un périmètre chiffré.'},{step:'02',title:'Vous voyez',text:'Un prototype à valider avant d’investir.',outcome:'un prototype cliquable à valider avant tout développement.'},{step:'03',title:'On construit',text:'Produit, APIs et intégrations, testés.',outcome:'un produit testé, prêt à être mis en ligne.'},{step:'04',title:'Vous lancez',text:'Mise en ligne, suivi et suite planifiée.',outcome:'votre application en production, avec une roadmap d’évolution.'}],
  ctaTitle: 'Transformons ce qui vous fait perdre du temps en produit fiable.',
})
</script>
