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
useSmoothScroll()
// Effets de pointeur déclarés ici plutôt que page par page : un seul écouteur délégué
// suffit pour tout le site, et les éléments marqués .magnetic / .spotlight réagissent
// où qu'ils se trouvent, y compris dans les composants partagés (CtaBand, cartes).
useMagnetic(0.14, 70)
useSpotlight()
</script>
