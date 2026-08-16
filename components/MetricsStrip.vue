<template>
  <section ref="element" class="border-b border-t bg-white py-7 dark:bg-[#160630]">
    <div class="container-shell">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-4"><span class="font-heading text-3xl font-bold tabular-nums slashed-zero text-[var(--teal)]">+{{ value }}%</span><span class="text-sm text-[var(--muted)]">de ventes récupérées*</span></div>
      <div class="flex items-center gap-4"><Layers class="h-7 w-7 shrink-0 text-[var(--teal)]" /><span class="text-sm"><strong class="tabular-nums">{{ projectsCount }}+</strong> systèmes livrés</span></div>
      <div class="flex items-center gap-4"><Star class="h-7 w-7 shrink-0 text-[var(--teal)]" /><span class="text-sm"><strong class="tabular-nums">{{ testimonialsCount }}</strong> avis clients</span></div>
      <div class="flex items-center gap-4"><MapPin class="h-7 w-7 shrink-0 text-[var(--teal)]" /><span class="text-sm">Cotonou · francophonie &amp; international</span></div>
    </div>
    <p class="mt-4 text-[11px] text-[var(--muted)]/70">*Potentiel observé sur des systèmes reliés de bout en bout. Vos résultats dépendent de votre point de départ.</p>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Layers, MapPin, Star } from 'lucide-vue-next'
withDefaults(defineProps<{ projectsCount?:number; testimonialsCount?:number }>(), { projectsCount: 31, testimonialsCount: 8 })
const { value, element } = useCountUp(30)
</script>
