<template>
  <div style="perspective: 1000px">
    <article ref="tiltEl" class="tilt card glass-sheen flex h-full flex-col overflow-hidden !p-0">
      <div class="tilt-inner flex h-full flex-col">
        <div class="p-6 pb-4"><div class="flex items-start justify-between gap-4"><span class="gradient-action grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg shadow-violet-500/30"><component :is="icon" class="h-6 w-6" /></span><span class="rounded-md border bg-violet-600/5 px-2 py-1 font-mono text-[10px] text-violet-700 dark:text-violet-300">OFFRE_{{ tag }}</span></div><h3 class="mt-6 text-2xl font-bold">{{ title }}</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ description }}</p></div>
        <div class="mx-6 border-t py-4 font-mono text-xs font-semibold text-[var(--teal)]">→ {{ result }}</div>
        <ul class="flex-1 space-y-3 px-6 pb-6 text-sm text-[var(--muted)]"><li v-for="feature in features" :key="feature" class="flex gap-2"><Check class="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />{{ feature }}</li></ul>
        <div class="px-6 pb-6"><NuxtLink :to="to" class="btn-secondary w-full">Explorer le système <ArrowRight class="h-4 w-4" /></NuxtLink></div>
      </div>
    </article>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'
import type { Component } from 'vue'
defineProps<{ tag:string;title:string;description:string;result:string;features:string[];to:string;icon:Component }>()
const tiltEl = useTilt()
</script>
