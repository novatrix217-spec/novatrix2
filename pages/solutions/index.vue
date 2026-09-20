<template><div ref="revealRoot"><PageHero :kicker="t.kicker" :description="t.description">{{ t.title1 }} <span class="text-gradient">{{ t.title2 }}</span>
    <template #actions>
      <button type="button" class="btn-primary" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
    </template>
  </PageHero>

  <section class="section-pad">
    <div class="container-shell grid gap-6 md:grid-cols-3">
      <NuxtLink v-for="(item,i) in solutions" :key="item.to" :to="localePath(item.to)" class="card card-hover glass-sheen reveal-scale flex flex-col" :data-reveal-delay="i*100">
        <span class="gradient-action grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg shadow-violet-500/30"><component :is="item.icon" class="h-6 w-6"/></span>
        <h3 class="mt-6 text-xl font-bold">{{ item.title }}</h3>
        <p class="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{{ item.description }}</p>
        <span class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">{{ t.discover }} <ArrowRight class="h-4 w-4"/></span>
      </NuxtLink>
    </div>
  </section>
  <CtaBand/></div></template>
<script setup lang="ts">
import { ArrowRight, MessageCircle, ShoppingCart, Workflow } from 'lucide-vue-next'
const { locale } = useI18n()
const localePath = useLocalePath()
const revealRoot = useScrollReveal()
const { openCalendly } = useCalendly()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Use cases: solve a visible break first', description: 'WhatsApp qualification, n8n data flow and abandoned cart follow-up: start from the situation your team recognizes today.' }
  : { title: 'Cas d’usage : corriger d’abord une rupture visible', description: 'Qualification WhatsApp, circulation des données avec n8n et relance panier : partez de la situation que votre équipe reconnaît aujourd’hui.' })
usePageSeo(() => seoMeta.value.title, () => seoMeta.value.description)
const t = computed(() => locale.value === 'en' ? {
  kicker: 'use cases', title1: 'Start from the situation', title2: 'that blocks the sale.',
  description: 'These pages describe concrete uses. Each one can be scoped alone, then connected to a complete system when useful.',
  discover: 'Discover',
} : {
  kicker: 'cas d’usage', title1: 'Partez de la situation', title2: 'qui bloque la vente.',
  description: 'Ces pages décrivent des usages concrets. Chacun peut être cadré seul, puis relié à un système complet quand c’est utile.',
  discover: 'Découvrir',
})
const solutions = computed(() => locale.value === 'en' ? [
  { to: '/solutions/agent-whatsapp-ia', icon: MessageCircle, title: 'Qualify WhatsApp conversations', description: 'Collect useful context, answer known questions and hand the conversation to the right person.' },
  { to: '/solutions/automatisation-n8n', icon: Workflow, title: 'n8n Automation', description: 'Your tools connected so data flows on its own, entered once, no more re-typing the same thing three times.' },
  { to: '/solutions/relance-panier-abandonne', icon: ShoppingCart, title: 'Abandoned Cart Follow-up', description: 'Automatic follow-up on the configured channel, designed to give eligible abandoned carts another opportunity to convert.' },
] : [
  { to: '/solutions/agent-whatsapp-ia', icon: MessageCircle, title: 'Qualifier les échanges WhatsApp', description: 'Recueillir le contexte utile, répondre aux questions connues et transmettre l’échange à la bonne personne.' },
  { to: '/solutions/automatisation-n8n', icon: Workflow, title: 'Automatisation n8n', description: 'Vos outils reliés pour que la donnée circule seule, saisie une fois, fini les ressaisies trois fois la même info.' },
  { to: '/solutions/relance-panier-abandonne', icon: ShoppingCart, title: 'Relance panier abandonné', description: 'Une relance automatique sur le canal configuré, conçue pour donner aux paniers éligibles une nouvelle occasion de convertir.' },
])
</script>
