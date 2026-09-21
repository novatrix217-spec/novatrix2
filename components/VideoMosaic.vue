<template>
  <div class="video-mosaic">
    <figure
      v-for="(item, i) in items"
      :key="item.slug"
      class="video-mosaic-tile"

    >
      <video
        v-if="playVideo && item.animated"
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
// Seules trois tuiles sont animées : six vidéos simultanées pèseraient une quinzaine de
// mégaoctets et se disputeraient l'attention. Les autres restent sur leur affiche, ce qui
// suffit à faire lire le bloc comme un mur de production vidéo.
const animatedSlugs = new Set(['fondateur-cinematique', 'ceo-tournage-publicite', 'porte-parole-studio-fr'])
const items = slugs.map(slug => ({
  slug,
  src: assets[slug]!.src,
  poster: assets[slug]!.poster,
  animated: animatedSlugs.has(slug),
}))

// Le parallax au scroll est retiré : trois instances lisaient le layout puis écrivaient
// un style à chaque frame, ce qui forçait des recalculs en cascade et saccadait le
// défilement, pour un déplacement que l’utilisateur jugeait imperceptible.

// Les vidéos ne tournent que sur grand écran et hors mouvement réduit : ailleurs, seules
// les affiches sont servies, donc aucun octet de vidéo sur la connexion du visiteur.
const playVideo = ref(false)
let motionQuery: MediaQueryList | null = null
let widthQuery: MediaQueryList | null = null
function syncPlayback() {
  playVideo.value = !!widthQuery?.matches && !motionQuery?.matches
}
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  widthQuery = window.matchMedia('(min-width: 768px)')
  motionQuery.addEventListener('change', syncPlayback)
  widthQuery.addEventListener('change', syncPlayback)
  syncPlayback()
})
onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', syncPlayback)
  widthQuery?.removeEventListener('change', syncPlayback)
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
