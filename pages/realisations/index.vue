<template><div><PageHero :kicker="t.kicker" :description="t.description">{{ t.title1 }} <span class="text-gradient">{{ t.title2 }}</span></PageHero>
  <section class="section-pad"><div class="container-shell"><div class="flex flex-wrap gap-2"><button v-for="filter in filters" :key="filter.value" class="rounded-full border px-4 py-2 text-xs font-semibold transition" :class="active===filter.value?'gradient-action border-transparent text-white':'hover:border-violet-400'" @click="active=filter.value">{{ filter.label }}</button></div><div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"><ProjectCard v-for="item in shown" :key="item.slug" :project="item"/></div><p v-if="!shown.length" class="py-16 text-center text-[var(--muted)]">{{ $t('realisations.empty') }}</p></div></section>
  <section class="section-pad border-t bg-[var(--surface)]"><div class="container-shell"><div class="reveal"><SectionHeading kicker="avis clients" center :description="t.testimonialsDescription">{{ t.testimonialsTitle1 }} <span class="text-gradient">{{ t.testimonialsTitle2 }}</span></SectionHeading></div><div class="mt-12"><TestimonialWall :items="testimonials?.items||[]" :limit="6"/></div><p class="mt-8 text-center"><NuxtLink :to="localePath('/avis')" class="btn-secondary">{{ t.seeAll }} <ArrowRight class="h-4 w-4"/></NuxtLink></p></div></section>
  <CtaBand/></div></template>
<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { demoProjects, demoTestimonials } from '~/shared/demo'
import type { PublicProject, PublicTestimonial } from '~/shared/types'
const { locale } = useI18n()
const localePath = useLocalePath()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'case studies', title1: 'What we’ve', title2: 'already built.',
  description: 'Systems actually delivered — automations, AI agents and applications. Each entry states what’s confirmed and what’s still to document.',
  testimonialsTitle1: 'What they', testimonialsTitle2: 'say.',
  testimonialsDescription: 'Real feedback from clients we’ve worked with — imported from our ComeUp profile.',
  seeAll: 'See all reviews',
} : {
  kicker: 'réalisations', title1: 'Ce qu’on a', title2: 'déjà construit.',
  description: 'Des systèmes réellement livrés — automatisations, agents IA et applications. Chaque fiche indique ce qui est confirmé et ce qui reste à documenter.',
  testimonialsTitle1: 'Ce qu’ils en', testimonialsTitle2: 'disent.',
  testimonialsDescription: 'Des retours réels de clients accompagnés — importés depuis notre profil ComeUp.',
  seeAll: 'Voir tous les avis',
})
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Case studies', description: 'Automations, AI agents and applications delivered by NovatrixAI — real systems, not mockups.' }
  : { title: 'Réalisations', description: 'Automatisations, agents IA et applications livrés par NovatrixAI — des systèmes réels, pas des maquettes.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const {data}=await useFetch<{items:PublicProject[]}>('/api/projects',{default:()=>({items:demoProjects})})
const {data:testimonials}=await useFetch<{items:PublicTestimonial[]}>('/api/testimonials',{default:()=>({items:demoTestimonials})})
const active=ref('Toutes')
const filters=computed(()=>{
  const cats=[...new Set((data.value?.items||[]).map(p=>p.category))]
  const catEnMap=new Map((data.value?.items||[]).map(p=>[p.category,p.categoryEn||p.category]))
  return [{value:'Toutes',label:locale.value==='en'?'All':'Toutes'},...cats.map(c=>({value:c,label:locale.value==='en'?catEnMap.get(c):c}))]
})
const shown=computed(()=>active.value==='Toutes'?data.value?.items||[]:(data.value?.items||[]).filter(p=>p.category===active.value))
</script>
