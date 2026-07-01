<template>
  <section ref="parallaxEl" class="hero-grid grain relative overflow-hidden py-20 text-white lg:py-28">
    <div ref="revealEl" class="container-shell relative z-10 text-center">
      <p class="kicker !text-[#3DE0C5] reveal">// prochain maillon</p>
      <h2 class="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-[-.04em] sm:text-5xl reveal" data-reveal-delay="80">{{ title }}</h2>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-white/60 reveal" data-reveal-delay="160">{{ text }}</p>
      <div class="reveal" data-reveal-delay="240">
        <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-soft mt-9 !px-8 !py-4">Réserver un appel de découverte <ArrowRight class="h-4 w-4" /></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
withDefaults(defineProps<{ title?: string; text?: string }>(), {
  title: "Construisons le système qui relie enfin tout.",
  text: "30 minutes pour comprendre votre chaîne actuelle, repérer le maillon faible et définir la suite.",
})
const calendarUrl = useRuntimeConfig().public.calendarUrl
const parallaxEl = useParallax(14)
const revealEl = useScrollReveal()
</script>
