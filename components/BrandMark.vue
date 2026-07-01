<template>
  <NuxtLink to="/" class="flex items-center gap-2.5" aria-label="NovatrixAI, accueil">
    <img src="/logo-novatrix.png" alt="" width="40" height="40" class="h-9 w-9 shrink-0 rounded-[10px]" aria-hidden="true" />
    <span class="font-heading text-xl font-bold tracking-[-0.04em]" :class="light ? 'text-white' : 'text-[var(--ink)]'">
      Novatrix<span class="text-gradient">AI</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ light?: boolean }>()
</script>
