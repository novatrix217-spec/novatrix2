<template>
  <div class="testimonial-carousel" :class="{ 'is-paused': paused }" @mouseenter="paused = true" @mouseleave="paused = false">
    <div class="testimonial-track" :style="trackStyle">
      <figure v-for="(item, i) in loopItems" :key="`${item._id || item.text}-${i}`" class="card testimonial-slide !p-6">
        <div v-if="item.rating" class="flex gap-0.5 text-[var(--teal)]"><Star v-for="n in 5" :key="n" class="h-3.5 w-3.5" :class="n<=item.rating! ? 'fill-current' : 'text-[var(--border)]'"/></div>
        <blockquote class="mt-3 flex-1 text-sm leading-6 text-[var(--ink)]">« {{ lf(item.text, item.textEn) }} »</blockquote>
        <figcaption class="mt-5 flex items-center gap-3 border-t pt-4">
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-action font-mono text-xs font-bold text-white">{{ initials(item.name) }}</span>
          <span><span class="block text-sm font-bold">{{ item.name }}</span><span v-if="item.role" class="block text-xs text-[var(--muted)]">{{ lf(item.role, item.roleEn) }}</span></span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import type { PublicTestimonial } from '~/shared/types'

// Défilement automatique en boucle (CSS transform + rAF), pas de librairie externe :
// la piste est dupliquée une fois pour boucler sans à-coup, on relance depuis 0 au
// franchissement de la moitié. Pause au survol et arrêt total si prefers-reduced-motion.
const props = defineProps<{ items: PublicTestimonial[] }>()
const lf = useLocaleField()
function initials(name: string) { return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() }

const loopItems = computed(() => [...props.items, ...props.items])
const offset = ref(0)
const paused = ref(false)
const trackStyle = computed(() => ({ transform: `translateX(-${offset.value}px)` }))

let raf = 0
let trackEl: HTMLElement | null = null
const SPEED = 32 // px/s

// Le défilement ne tourne que lorsque le carrousel est à l'écran : sans cela, la boucle
// restait active sur toute la session, y compris sur les pages qui n'affichent aucun
// témoignage, et alourdissait le défilement général.
let observer: IntersectionObserver | null = null
let last = 0

function step(now: number) {
  const dt = (now - last) / 1000
  last = now
  if (!paused.value && trackEl) {
    offset.value += SPEED * dt
    const half = trackEl.scrollWidth / 2
    if (offset.value >= half) offset.value -= half
  }
  raf = requestAnimationFrame(step)
}
function play() {
  if (raf) return
  last = performance.now()
  raf = requestAnimationFrame(step)
}
function halt() {
  if (!raf) return
  cancelAnimationFrame(raf)
  raf = 0
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  trackEl = document.querySelector('.testimonial-track')
  const host = trackEl?.parentElement
  if (!host) return
  observer = new IntersectionObserver(([entry]) => {
    entry?.isIntersecting ? play() : halt()
  }, { rootMargin: '100px' })
  observer.observe(host)
})
onBeforeUnmount(() => {
  halt()
  observer?.disconnect()
})
</script>
<style scoped>
.testimonial-carousel {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}
.testimonial-track {
  display: flex;
  gap: 1.25rem;
  width: max-content;
}
.testimonial-slide {
  display: flex;
  flex-direction: column;
  width: min(340px, 84vw);
  flex-shrink: 0;
}
@media (prefers-reduced-motion: reduce) {
  .testimonial-carousel { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .testimonial-track { transform: none !important; }
}
</style>
