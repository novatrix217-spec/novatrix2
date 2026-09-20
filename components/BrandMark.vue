<template>
  <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5" :aria-label="`NovatrixAI, ${$t('nav.home')}`">
    <img src="/logo-novatrix.png" alt="" width="48" height="48" class="h-11 w-11 shrink-0 rounded-xl" aria-hidden="true" />
    <span class="font-heading text-2xl font-bold tracking-[-0.04em]" :class="light ? 'text-white' : 'text-[var(--text-primary)]'">
      Novatrix<span class="text-[var(--accent)]">AI</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ light?: boolean }>()
const localePath = useLocalePath()
</script>
