<template>
  <!-- pb resserré : l'en-tête se terminait sur un filet suivi de ~9rem de vide avant la
       première section, ce qui donnait un trou au milieu de chaque page intérieure. -->
  <section ref="heroRoot" class="soft-grid relative overflow-hidden border-b pt-32 pb-12 lg:pt-36 lg:pb-14">
    <div class="parallax-layer pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full" aria-hidden="true" style="--depth: 8; background: radial-gradient(circle, rgba(139,92,246,.16), transparent 70%); filter: blur(30px)"/>
    <div ref="revealRoot" class="container-shell relative">
      <div class="max-w-4xl">
        <p class="kicker reveal">// {{ kicker }}</p>
        <h1 class="display-title mt-6 reveal" data-reveal-delay="80"><slot/></h1>
        <p v-if="description" class="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] reveal" data-reveal-delay="160">{{ description }}</p>
        <div v-if="$slots.actions" class="mt-8 flex flex-wrap gap-3 reveal" data-reveal-delay="240"><slot name="actions"/></div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{kicker:string;description?:string}>()
const heroRoot=useParallax(9)
const revealRoot=useScrollReveal()
</script>
