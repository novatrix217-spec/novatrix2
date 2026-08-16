<template>
  <section ref="parallaxEl" class="hero-grid grain relative overflow-hidden py-20 text-white lg:py-28">
    <div ref="revealEl" class="container-shell relative z-10 text-center">
      <p class="kicker !text-[#3DE0C5] reveal">{{ $t('cta.kicker') }}</p>
      <h2 class="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-[-.04em] sm:text-5xl reveal" data-reveal-delay="80">{{ title ?? $t('cta.defaultTitle') }}</h2>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-white/60 reveal" data-reveal-delay="160">{{ text ?? $t('cta.defaultText') }}</p>
      <div class="reveal" data-reveal-delay="240">
        <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-soft mt-9 !px-8 !py-4">{{ $t('cta.button') }} <ArrowRight class="h-4 w-4" /></a>
        <p class="mt-4 text-xs text-white/45 reveal" data-reveal-delay="280">{{ $t('cta.disclaimer') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
defineProps<{ title?: string; text?: string }>()
const calendarUrl = useRuntimeConfig().public.calendarUrl
const parallaxEl = useParallax(14)
const revealEl = useScrollReveal()
</script>
