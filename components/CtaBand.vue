<template>
  <section ref="parallaxEl" class="dark grain relative overflow-hidden bg-[var(--bg-elevated)] py-20 text-[var(--text-primary)] lg:py-28">
    <div ref="revealEl" class="container-shell relative z-10 text-center">
      <p class="kicker !text-[var(--accent)] reveal">{{ $t('cta.kicker') }}</p>
      <h2 class="mx-auto mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-[-.04em] sm:text-5xl reveal" data-reveal-delay="80">{{ title ?? $t('cta.defaultTitle') }}</h2>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-[var(--text-secondary)] reveal" data-reveal-delay="160">{{ text ?? $t('cta.defaultText') }}</p>
      <div class="reveal flex flex-col items-center gap-3 sm:flex-row sm:justify-center" data-reveal-delay="240">
        <button type="button" class="btn-primary glow-soft magnetic mt-9 w-full !px-8 !py-4 sm:w-auto" @click="openCalendly">{{ $t('cta.button') }} <ArrowRight class="h-4 w-4" /></button>
        <a v-if="hasWhatsapp" :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] px-8 py-4 text-sm font-bold text-[var(--text-primary)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)] sm:w-auto">
          <SvgWhatsappSVG class="h-5 w-5 shrink-0" />{{ $t('cta.whatsapp') }}
        </a>
      </div>
      <p class="mt-4 text-xs text-[var(--text-secondary)] reveal" data-reveal-delay="280">{{ $t('cta.disclaimer') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
defineProps<{ title?: string; text?: string }>()
const { openCalendly } = useCalendly()
const { whatsappUrl, hasWhatsapp } = useWhatsapp()
const parallaxEl = useParallax(14)
const revealEl = useScrollReveal()
</script>
