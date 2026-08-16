<template><div><PageHero :kicker="t.kicker" :description="t.description">{{ t.title1 }} <span class="text-gradient">{{ t.title2 }}</span></PageHero>
  <section class="section-pad"><div class="container-shell"><div class="flex flex-wrap gap-2"><button v-for="filter in filters" :key="filter.value" class="rounded-full border px-4 py-2 text-xs font-semibold transition" :class="active===filter.value?'gradient-action border-transparent text-white':'hover:border-violet-400'" @click="active=filter.value">{{ filter.label }}</button></div><div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"><ResourceCard v-for="item in shown" :key="item.slug" :resource="item"/></div><p v-if="!shown.length" class="py-16 text-center text-[var(--muted)]">{{ $t('resourcesList.empty') }}</p></div></section><CtaBand :title="t.ctaTitle"/></div></template>
<script setup lang="ts">
import { demoResources } from '~/shared/demo'
import type { PublicResource } from '~/shared/types'
const { locale } = useI18n()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'library', title1: 'Resources to build', title2: 'with method.',
  description: 'Guides, checklists and canvases to diagnose your chain before investing in a new tool.',
  ctaTitle: 'A guide helps. A system transforms.',
} : {
  kicker: 'bibliothèque', title1: 'Des ressources pour construire', title2: 'avec méthode.',
  description: 'Guides, checklists et canevas pour diagnostiquer votre chaîne avant d’investir dans un nouvel outil.',
  ctaTitle: 'Un guide aide. Un système transforme.',
})
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Free resources', description: 'NovatrixAI guides, checklists and canvases on acquisition, AI agents and building applications.' }
  : { title: 'Ressources gratuites', description: 'Guides, checklists et canevas NovatrixAI sur l’acquisition, les agents IA et la création d’applications.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const {data}=await useFetch<{items:PublicResource[]}>('/api/resources',{default:()=>({items:demoResources})})
const active=ref('Toutes')
const filters=computed(()=>{
  const sectors=[...new Set((data.value?.items||[]).map(r=>r.sector))]
  const enMap=new Map((data.value?.items||[]).map(r=>[r.sector,r.sectorEn||r.sector]))
  return [{value:'Toutes',label:locale.value==='en'?'All':'Toutes'},...sectors.map(s=>({value:s,label:locale.value==='en'?enMap.get(s):s}))]
})
const shown=computed(()=>active.value==='Toutes'?data.value?.items||[]:(data.value?.items||[]).filter(r=>r.sector===active.value))
</script>
