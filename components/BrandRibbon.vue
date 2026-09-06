<template>
  <svg
    ref="root"
    class="brand-ribbon"
    :class="onDark ? 'brand-ribbon--on-dark' : ''"
    viewBox="0 0 1440 760"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <filter :id="glowFilterId"><feGaussianBlur stdDeviation="11"/></filter>
      <linearGradient :id="gradientId" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6c00ff"/>
        <stop offset=".54" stop-color="#ee00e8"/>
        <stop offset="1" stop-color="#8df8ff"/>
      </linearGradient>
    </defs>
    <path class="brand-ribbon-glow" :stroke="`url(#${gradientId})`" :filter="`url(#${glowFilterId})`" path-length="1" :d="path"/>
    <path class="brand-ribbon-line" :stroke="`url(#${gradientId})`" path-length="1" :d="path"/>
    <path class="brand-ribbon-pulse" path-length="1" :d="path"/>
  </svg>
</template>

<script setup lang="ts">
/**
 * Ruban lumineux signature, porté depuis le prototype novatrix-web : un trait qui se
 * *trace* au fil du défilement (stroke-dashoffset piloté par la progression de la section
 * hôte) plutôt qu'un décor figé.
 *
 * Purement décoratif : `aria-hidden`, jamais interactif, jamais porteur d'information.
 * Sous `prefers-reduced-motion`, le tracé est rendu d'emblée complet et le pulse masqué
 * (règles CSS), sans aucun calcul au scroll.
 */
const props = withDefaults(defineProps<{
  /** Identifiant unique : évite toute collision de `id` SVG si plusieurs rubans coexistent. */
  id: string
  /** Tracé dans le repère du viewBox 1440×760. Défaut : la courbe signature du prototype. */
  path?: string
  /** `screen` au lieu de `multiply` : indispensable sur fond sombre, sinon le ruban disparaît. */
  onDark?: boolean
}>(), {
  path: 'M-90 626 C156 92 378 838 626 348 S1032 -70 1532 528',
  onDark: false,
})

const root = ref<SVGSVGElement | null>(null)
const glowFilterId = computed(() => `${props.id}-glow`)
const gradientId = computed(() => `${props.id}-gradient`)

let raf = 0
onMounted(() => {
  const el = root.value
  if (!el) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const host = el.parentElement ?? el
  const update = () => {
    raf = 0
    const r = host.getBoundingClientRect()
    const vh = window.innerHeight || 1
    // 0 quand la section entre par le bas, 1 quand elle a fini de traverser l'écran.
    const progress = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)))
    // Le trait se dessine sur la première moitié de la traversée, puis reste plein.
    const drawn = Math.max(0, Math.min(1, progress * 2))
    el.style.setProperty('--ribbon-draw', String(1 - drawn))
    el.style.setProperty('--ribbon-opacity', String(Math.min(1, drawn * 1.4)))
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    cancelAnimationFrame(raf)
  })
})
</script>
