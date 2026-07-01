<template>
  <section ref="element" class="border-b border-t bg-white py-7 dark:bg-[#160630]">
    <div class="container-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-4"><span class="font-heading text-3xl font-bold tabular-nums slashed-zero text-[var(--teal)]">+{{ value }}%</span><span class="text-sm text-[var(--muted)]">de paniers récupérés</span></div>
      <div class="flex items-center gap-4"><Clock3 class="h-7 w-7 text-[var(--teal)]" /><span class="text-sm">Des dizaines d'heures gagnées</span></div>
      <div class="flex items-center gap-4"><BadgeCheck class="h-7 w-7 text-[var(--teal)]" /><span class="text-sm">Process sans erreur</span></div>
      <div class="flex items-center gap-4"><Sparkles class="h-7 w-7 text-[var(--teal)]" /><span class="text-sm">Leads qualifiés automatiquement</span></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { BadgeCheck, Clock3, Sparkles } from 'lucide-vue-next'
const { value, element } = useCountUp(30)
</script>
