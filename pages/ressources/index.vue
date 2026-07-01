<template><div><PageHero kicker="bibliothèque" description="Guides, checklists et canevas pour diagnostiquer votre chaîne avant d’investir dans un nouvel outil.">Des ressources pour construire <span class="text-gradient">avec méthode.</span></PageHero>
  <section class="section-pad"><div class="container-shell"><div class="flex flex-wrap gap-2"><button v-for="filter in filters" :key="filter" class="rounded-full border px-4 py-2 text-xs font-semibold transition" :class="active===filter?'gradient-action border-transparent text-white':'hover:border-violet-400'" @click="active=filter">{{ filter }}</button></div><div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"><ResourceCard v-for="item in shown" :key="item.slug" :resource="item"/></div><p v-if="!shown.length" class="py-16 text-center text-[var(--muted)]">Aucune ressource dans cette catégorie.</p></div></section><CtaBand title="Un guide aide. Un système transforme."/></div></template>
<script setup lang="ts">
import { demoResources } from '~/shared/demo'
import type { PublicResource } from '~/shared/types'
usePageSeo('Ressources gratuites', 'Guides, checklists et canevas NovatrixAI sur l’acquisition, les agents IA et la création d’applications.')
const {data}=await useFetch<{items:PublicResource[]}>('/api/resources',{default:()=>({items:demoResources})})
const active=ref('Toutes'),filters=computed(()=>['Toutes',...new Set((data.value?.items||[]).map(r=>r.sector))]),shown=computed(()=>active.value==='Toutes'?data.value?.items||[]:(data.value?.items||[]).filter(r=>r.sector===active.value))
</script>
