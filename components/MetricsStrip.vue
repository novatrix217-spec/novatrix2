<template>
  <section ref="element" class="border-b border-t bg-white py-7 dark:bg-[#160630]">
    <div class="container-shell">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-4"><span class="font-heading text-3xl font-bold tabular-nums slashed-zero text-[var(--teal)]">+{{ value }}%</span><span class="text-sm text-[var(--muted)]">{{ t.recovered }}</span></div>
      <div class="flex items-center gap-4"><Layers class="h-7 w-7 shrink-0 text-[var(--teal)]" /><span class="text-sm"><strong class="tabular-nums">{{ projectsCount }}+</strong> {{ t.systems }}</span></div>
      <div class="flex items-center gap-4"><Star class="h-7 w-7 shrink-0 text-[var(--teal)]" /><span class="text-sm"><strong class="tabular-nums">{{ testimonialsCount }}</strong> {{ t.reviews }}</span></div>
      <div class="flex items-center gap-4"><MapPin class="h-7 w-7 shrink-0 text-[var(--teal)]" /><span class="text-sm">{{ t.location }}</span></div>
    </div>
    <p class="mt-4 text-[11px] text-[var(--muted)]/70">{{ t.disclaimer }}</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Layers, MapPin, Star } from 'lucide-vue-next'
withDefaults(defineProps<{ projectsCount?:number; testimonialsCount?:number }>(), { projectsCount: 31, testimonialsCount: 8 })
const { value, element } = useCountUp(30)
const { locale } = useI18n()
const t = computed(() => locale.value === 'en' ? {
  recovered: 'sales recovered*', systems: 'systems delivered', reviews: 'client reviews',
  location: 'Cotonou · French-speaking Africa & international',
  disclaimer: '*Potential observed on systems connected end to end. Your results depend on your starting point.',
} : {
  recovered: 'de ventes récupérées*', systems: 'systèmes livrés', reviews: 'avis clients',
  location: 'Cotonou · francophonie & international',
  disclaimer: '*Potentiel observé sur des systèmes reliés de bout en bout. Vos résultats dépendent de votre point de départ.',
})
</script>
