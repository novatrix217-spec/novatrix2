<template><div v-if="article"><article><PageHero :kicker="`${article.category} · ${article.readingTime} min`" :description="article.excerpt">{{ article.title }}</PageHero><div class="container-shell py-16 lg:py-24"><div class="prose-novatrix mx-auto max-w-3xl" v-html="html"/></div></article><CtaBand/></div></template>
<script setup lang="ts">
import { demoArticles } from '~/shared/demo'
import type { PublicArticle } from '~/shared/types'
const route=useRoute(),fallback=demoArticles.find(a=>a.slug===route.params.slug)
const {data:article}=await useFetch<PublicArticle>(`/api/articles/${route.params.slug}`,{default:()=>fallback as PublicArticle})
if(!article.value)throw createError({statusCode:404,statusMessage:'Article introuvable'})
usePageSeo(article.value.seo?.metaTitle||article.value.title,article.value.seo?.metaDescription||article.value.excerpt,article.value.seo?.ogImage||'/og-default.svg')
const html=computed(()=>useSafeMarkdown(article.value?.body||''))
useHead({script:[{type:'application/ld+json',children:JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:article.value.title,description:article.value.excerpt,datePublished:article.value.publishedAt,author:{'@type':'Organization',name:'NovatrixAI'}})}]})
</script>
