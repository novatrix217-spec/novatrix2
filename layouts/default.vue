<template>
  <div class="min-h-screen overflow-x-hidden bg-[var(--bg-void)]">
    <a href="#contenu" class="skip-link">Aller au contenu</a>
    <div class="scroll-progress" aria-hidden="true" />
    <SiteHeader />
    <main id="contenu"><slot /></main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
useScrollProgress()
// useSmoothScroll (Lenis) est retiré : il interceptait le défilement natif et faisait
// tourner une boucle requestAnimationFrame en continu, sur toutes les pages et même à
// l'arrêt. Le défilement en devenait pâteux. Le scroll natif du navigateur est plus fluide
// et ne coûte rien ; les ancres internes sont gérées par `scroll-behavior: smooth` en CSS.
// Les effets de pointeur et le mouvement ambiant (useMagnetic, useSpotlight,
// useAmbientMotion) ont été retirés : trois écouteurs actifs en continu sur toutes les
// pages, pour un rendu que l'utilisateur ne percevait pas, et un défilement devenu lourd.
// Les composables restent dans le dépôt, prêts à être rebranchés un par un et mesurés.
</script>
