<template>
  <article class="card card-hover flex h-full flex-col">
    <div class="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider"><span class="text-violet-700 dark:text-violet-300">{{ article.category }}</span><span class="text-[var(--muted)]">{{ article.readingTime }} min</span></div>
    <h3 class="mt-6 text-2xl font-bold leading-tight">{{ article.title }}</h3>
    <p class="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">{{ article.excerpt }}</p>
    <NuxtLink :to="`/blog/${article.slug}`" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">Lire l’article <ArrowRight class="h-4 w-4" /></NuxtLink>
  </article>
</template>
<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { PublicArticle } from '~/shared/types'
defineProps<{article:PublicArticle}>()
</script>
