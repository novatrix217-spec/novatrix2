<template>
  <article class="card card-hover flex h-full flex-col">
    <div class="flex items-center justify-between"><span class="rounded-md bg-violet-600/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">{{ resource.type }}</span><LockKeyhole class="h-4 w-4 text-[var(--muted)]" /></div>
    <img v-if="coverUrl" :src="coverUrl" :alt="lf(resource.title, resource.titleEn)" class="mt-8 h-28 w-full rounded-xl object-cover" loading="lazy"/>
    <div v-else class="mt-8 grid h-28 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-50 dark:from-violet-950 dark:to-[#160630]"><FileText class="h-10 w-10 text-violet-600" /></div>
    <p class="mt-5 font-mono text-[10px] uppercase tracking-[.15em] text-[var(--teal)]">{{ lf(resource.sector, resource.sectorEn) }}</p>
    <h3 class="mt-2 text-xl font-bold">{{ lf(resource.title, resource.titleEn) }}</h3>
    <p class="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{{ lf(resource.description, resource.descriptionEn) }}</p>
    <NuxtLink :to="localePath(`/ressources/${resource.slug}`)" class="btn-secondary mt-6 w-full">{{ $t('card.viewResource') }} <ArrowRight class="h-4 w-4" /></NuxtLink>
  </article>
</template>
<script setup lang="ts">
import { ArrowRight,FileText,LockKeyhole } from 'lucide-vue-next'
import type { PublicResource } from '~/shared/types'
const props=defineProps<{resource:PublicResource}>()
const lf = useLocaleField()
const localePath = useLocalePath()
const cld = useCloudinaryUrl()
const coverUrl = computed(()=>cld(props.resource.coverImageKey,'w_400,h_220,c_fill'))
</script>
