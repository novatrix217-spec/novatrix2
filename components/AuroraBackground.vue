<template>
  <div class="aurora" aria-hidden="true">
    <div class="orb parallax-layer" :class="palette[0]" :style="orb(0)" />
    <div class="orb parallax-layer" :class="palette[1]" :style="orb(1)" />
    <div class="orb parallax-layer" :class="palette[2]" :style="orb(2)" />
  </div>
</template>

<script setup lang="ts">
/**
 * Fond aurora : 3 orbes floutées qui dérivent lentement et réagissent au parallax
 * du conteneur parent (variables --px/--py posées par useParallax).
 * `intensity` module l'opacité globale (sections claires = plus discret).
 * `variant` choisit la palette des 3 orbes :
 *   - 'brand' (défaut) : violet · magenta · mint
 *   - 'violet'         : violet · magenta · violet (sans vert)
 */
const props = withDefaults(defineProps<{ intensity?: number; variant?: 'brand' | 'violet' }>(), {
  intensity: 1,
  variant: 'brand',
})

const palettes = {
  brand: ['orb-violet', 'orb-magenta', 'orb-mint'],
  violet: ['orb-violet', 'orb-magenta', 'orb-violet'],
} as const

const palette = computed(() => palettes[props.variant])

const layout = [
  { top: '-12%', left: '-8%', size: '46vw', depth: 8, opacity: 0.5, delay: '0s' },
  { top: '30%', right: '-10%', size: '40vw', depth: -12, opacity: 0.42, delay: '-7s' },
  { bottom: '-16%', left: '24%', size: '38vw', depth: 6, opacity: 0.38, delay: '-13s' },
]

function orb(i: number) {
  const o = layout[i]!
  return {
    top: o.top, left: o.left, right: o.right, bottom: o.bottom,
    width: o.size, height: o.size,
    opacity: String(o.opacity * props.intensity),
    '--depth': String(o.depth),
    animationDelay: o.delay,
  } as Record<string, string>
}
</script>
