<template>
  <section ref="heroRoot" class="soft-grid relative overflow-hidden border-b pt-32 pb-20 lg:pt-40 lg:pb-24">
    <div class="parallax-layer pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full" aria-hidden="true" style="--depth: 8; background: radial-gradient(circle, rgba(139,92,246,.16), transparent 70%); filter: blur(30px)"/>
    <div ref="revealRoot" class="container-shell relative">
      <div class="max-w-4xl">
        <p class="kicker reveal">// {{ kicker }}</p>
        <h1 class="display-title mt-6 reveal" data-reveal-delay="80"><slot/></h1>
        <p v-if="description" class="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] reveal" data-reveal-delay="160">{{ description }}</p>
        <div v-if="$slots.actions" class="mt-8 flex flex-wrap gap-3 reveal" data-reveal-delay="240"><slot name="actions"/></div>
      </div>
      <hr class="hairline reveal mt-12" data-reveal-delay="320">
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{kicker:string;description?:string}>()
const heroRoot=useParallax(9)
const revealRoot=useScrollReveal()
</script>
