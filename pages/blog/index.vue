<template><div><PageHero :kicker="t.kicker" :description="t.description">{{ t.title1 }} <span class="text-gradient">{{ t.title2 }}</span></PageHero><section class="section-pad"><div class="container-shell"><div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><BlogCard v-for="article in articles" :key="article.slug" :article="article"/></div><p v-if="!articles.length" class="py-16 text-center text-[var(--muted)]">{{ $t('blogList.empty') }}</p></div></section><CtaBand :title="t.ctaTitle"/></div></template>
<script setup lang="ts">
import { demoArticles } from '~/shared/demo'
import type { PublicArticle } from '~/shared/types'
const { locale } = useI18n()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'system journal', title1: 'Understanding before', title2: 'automating.',
  description: 'Short analyses on acquisition chains, AI agents and useful digital products.',
  ctaTitle: 'Your context deserves better than a generic recipe.',
} : {
  kicker: 'journal système', title1: 'Comprendre avant', title2: 'd’automatiser.',
  description: 'Des analyses courtes sur les chaînes d’acquisition, les agents IA et les produits numériques utiles.',
  ctaTitle: 'Votre contexte mérite mieux qu’une recette générique.',
})
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'AI, acquisition and products blog', description: 'NovatrixAI analyses on acquisition systems, AI piloting agents and business applications.' }
  : { title: 'Blog IA, acquisition et produits', description: 'Analyses NovatrixAI sur les systèmes d’acquisition, les agents IA de pilotage et les applications métier.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const {data}=await useFetch<{items:PublicArticle[]}>('/api/articles',{default:()=>({items:demoArticles})});const articles=computed(()=>data.value?.items||[])
</script>
