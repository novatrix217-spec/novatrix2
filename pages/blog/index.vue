<template><div><PageHero kicker="journal système" description="Des analyses courtes sur les chaînes d’acquisition, les agents IA et les produits numériques utiles.">Comprendre avant <span class="text-gradient">d’automatiser.</span></PageHero><section class="section-pad"><div class="container-shell"><div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><BlogCard v-for="article in articles" :key="article.slug" :article="article"/></div></div></section><CtaBand title="Votre contexte mérite mieux qu’une recette générique."/></div></template>
<script setup lang="ts">
import { demoArticles } from '~/shared/demo'
import type { PublicArticle } from '~/shared/types'
usePageSeo('Blog IA, acquisition et produits', 'Analyses NovatrixAI sur les systèmes d’acquisition, les agents IA de pilotage et les applications métier.')
const {data}=await useFetch<{items:PublicArticle[]}>('/api/articles',{default:()=>({items:demoArticles})});const articles=computed(()=>data.value?.items||[])
</script>
