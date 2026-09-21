<template>
  <div class="video-mosaic">
    <figure
      v-for="(item, i) in items"
      :key="item.slug"
      :ref="(el) => setTileRef(el, i)"
      class="video-mosaic-tile"
    >
      <video
        v-if="playVideo && visible[i]"
        :src="item.src"
        :poster="item.poster"
        class="video-mosaic-media"
        autoplay
        muted
        loop
        playsinline
        preload="none"
        aria-hidden="true"
        tabindex="-1"
      />
      <img
        v-else
        :src="item.poster"
        alt=""
        aria-hidden="true"
        class="video-mosaic-media"
        loading="lazy"
        decoding="async"
      >
    </figure>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import videoAssets from '~/shared/video-lab-assets.json'

// Mur de séquences générées par IA : la capacité de production vidéo de l'agence se montre
// au lieu de se décrire. Les tuiles dérivent à des vitesses différentes au défilement
// (--depth), ce qui donne de la profondeur au bloc.
const slugs = [
  'fondateur-cinematique',
  'orbit-lab',
  'ceo-tournage-publicite',
  'scientifique-labo',
  'porte-parole-studio-fr',
  'laboratoire-spatial-vide',
] as const

const assets = videoAssets as Record<string, { src: string; poster: string }>
const items = slugs.map(slug => ({
  slug,
  src: assets[slug]!.src,
  poster: assets[slug]!.poster,
}))

// Le parallax au scroll est retiré : trois instances lisaient le layout puis écrivaient
// un style à chaque frame, ce qui forçait des recalculs en cascade et saccadait le
// défilement, pour un déplacement que l’utilisateur jugeait imperceptible.

// Les six tuiles s'animent sur tous les écrans, mobile compris, mais leur vidéo n'est
// montée qu'au moment où la tuile entre dans le champ : rien n'est téléchargé pour une
// tuile jamais atteinte, et les six ne partent jamais en même temps. Seul
// prefers-reduced-motion laisse la mosaïque entièrement sur ses affiches.
const playVideo = ref(false)
const visible = ref<boolean[]>(items.map(() => false))
const tiles = ref<(HTMLElement | null)[]>(items.map(() => null))
let observer: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null

function setTileRef(el: Element | ComponentPublicInstance | null, index: number) {
  tiles.value[index] = el instanceof HTMLElement ? el : null
}
function syncPlayback() {
  playVideo.value = !motionQuery?.matches
}
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', syncPlayback)
  syncPlayback()

  // Une tuile atteinte garde sa vidéo : on cesse de l'observer, elle ne repasse donc jamais
  // sur son affiche. La marge fait démarrer le chargement juste avant l'entrée à l'écran.
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const index = tiles.value.indexOf(entry.target as HTMLElement)
      if (index === -1) continue
      visible.value[index] = true
      observer?.unobserve(entry.target)
    }
  }, { rootMargin: '200px' })

  tiles.value.forEach(el => el && observer!.observe(el))
})
onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', syncPlayback)
  observer?.disconnect()
})
</script>

<style scoped>
.video-mosaic {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .75rem;
}
@media (min-width: 768px) {
  .video-mosaic { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
}
.video-mosaic-tile {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, .12);
  background: #160630;
  aspect-ratio: 4 / 5;
  box-shadow: 0 18px 50px rgba(22, 6, 48, .22);
}
/* Une tuile sur deux est décalée verticalement : la grille respire au lieu de former
   un damier trop régulier. Le décalage est posé en marge plutôt qu'en transform, sinon
   il écraserait le translate3d que .scroll-parallax applique sur le même élément. */
@media (min-width: 768px) {
  .video-mosaic-tile:nth-child(even) { margin-top: 1.75rem; }
}
.video-mosaic-media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .6s cubic-bezier(.22, 1, .36, 1), filter .4s ease;
  filter: saturate(.85);
}
.video-mosaic-tile:hover .video-mosaic-media {
  transform: scale(1.06);
  filter: saturate(1.1);
}
@media (prefers-reduced-motion: reduce) {
  .video-mosaic-tile:nth-child(even) { transform: none; }
  .video-mosaic-media { transition: none; }
  .video-mosaic-tile:hover .video-mosaic-media { transform: none; }
}
</style>
