<template>
  <div class="min-h-screen overflow-x-hidden">
    <a href="#contenu" class="skip-link">Aller au contenu</a>
    <div class="scroll-progress" aria-hidden="true" />
    <SiteHeader />
    <main id="contenu"><slot /></main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
useScrollProgress()
</script>
