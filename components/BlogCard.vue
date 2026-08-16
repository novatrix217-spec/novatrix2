<template>
  <article class="card card-hover flex h-full flex-col overflow-hidden">
    <img v-if="coverUrl" :src="coverUrl" :alt="lf(article.title, article.titleEn)" class="-mx-6 -mt-6 mb-2 h-40 w-[calc(100%+3rem)] object-cover" loading="lazy"/>
    <div class="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider"><span class="text-violet-700 dark:text-violet-300">{{ lf(article.category, article.categoryEn) }}</span><span class="text-[var(--muted)]">{{ lf(article.readingTime, article.readingTimeEn) }} {{ $t('card.min') }}</span></div>
    <h3 class="mt-6 text-2xl font-bold leading-tight">{{ lf(article.title, article.titleEn) }}</h3>
    <p class="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">{{ lf(article.excerpt, article.excerptEn) }}</p>
    <NuxtLink :to="localePath(`/blog/${article.slug}`)" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">{{ $t('card.readArticle') }} <ArrowRight class="h-4 w-4" /></NuxtLink>
  </article>
</template>
<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import type { PublicArticle } from '~/shared/types'
const props=defineProps<{article:PublicArticle}>()
const lf = useLocaleField()
const localePath = useLocalePath()
const cld = useCloudinaryUrl()
const coverUrl = computed(()=>cld(props.article.coverImageKey,'w_500,h_280,c_fill'))
</script>
