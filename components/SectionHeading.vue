<template>
  <div :class="center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <p class="kicker">// {{ kicker }}</p>
    <component :is="level" class="section-title mt-5" :class="dark ? 'text-white' : 'text-[var(--ink)]'"><slot /></component>
    <p v-if="description" class="mt-5 text-lg leading-8" :class="dark ? 'text-white/60' : 'text-[var(--muted)]'">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ kicker: string; description?: string; center?: boolean; dark?: boolean; level?: 'h1' | 'h2' }>(), { level: 'h2' })
</script>
