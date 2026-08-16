<template>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <figure v-for="item in shown" :key="item._id||item.text" class="card flex h-full flex-col !p-6">
      <div v-if="item.rating" class="flex gap-0.5 text-[var(--teal)]"><Star v-for="n in 5" :key="n" class="h-3.5 w-3.5" :class="n<=item.rating! ? 'fill-current' : 'text-[var(--border)]'"/></div>
      <blockquote class="mt-3 flex-1 text-sm leading-6 text-[var(--ink)]">« {{ lf(item.text, item.textEn) }} »</blockquote>
      <figcaption class="mt-5 flex items-center gap-3 border-t pt-4">
        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-action font-mono text-xs font-bold text-white">{{ initials(item.name) }}</span>
        <span><span class="block text-sm font-bold">{{ item.name }}</span><span v-if="item.role" class="block text-xs text-[var(--muted)]">{{ lf(item.role, item.roleEn) }}</span></span>
      </figcaption>
    </figure>
  </div>
</template>
<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { PublicTestimonial } from '~/shared/types'
const props = defineProps<{items:PublicTestimonial[];limit?:number}>()
const shown = computed(() => props.limit ? props.items.slice(0, props.limit) : props.items)
const lf = useLocaleField()
function initials(name:string){return name.split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()}
</script>
