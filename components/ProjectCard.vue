<template>
  <article class="card card-hover flex h-full flex-col overflow-hidden">
    <img v-if="coverUrl" :src="coverUrl" :alt="lf(project.title, project.titleEn)" class="-mx-6 -mt-6 mb-2 h-40 w-[calc(100%+3rem)] object-cover" loading="lazy"/>
    <div class="flex items-center justify-between"><span class="rounded-md bg-violet-600/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">{{ lf(project.category, project.categoryEn) }}</span><span v-if="project.deliveryDays" class="flex items-center gap-1.5 font-mono text-[10px] text-[var(--teal)]"><Clock3 class="h-3 w-3"/>{{ project.deliveryDays }} {{ $t('card.days') }}</span></div>
    <h3 class="mt-6 text-xl font-bold leading-snug">{{ lf(project.title, project.titleEn) }}</h3>
    <p class="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{{ lf(project.summary, project.summaryEn) }}</p>
    <div v-if="project.tools?.length" class="mt-5 flex flex-wrap gap-1.5">
      <span v-for="tool in project.tools" :key="tool" class="rounded-md border px-2 py-0.5 font-mono text-[10px] text-[var(--muted)]">{{ tool }}</span>
    </div>
    <NuxtLink :to="localePath(`/realisations/${project.slug}`)" class="btn-secondary mt-6 w-full">{{ $t('card.viewCase') }} <ArrowRight class="h-4 w-4"/></NuxtLink>
  </article>
</template>
<script setup lang="ts">
import { ArrowRight,Clock3 } from 'lucide-vue-next'
import type { PublicProject } from '~/shared/types'
const props=defineProps<{project:PublicProject}>()
const lf = useLocaleField()
const localePath = useLocalePath()
const cld = useCloudinaryUrl()
const coverUrl = computed(()=>cld(props.project.coverImageKey,'w_500,h_280,c_fill'))
</script>
