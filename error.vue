<template>
  <div class="hero-grid flex min-h-screen items-center justify-center px-5 text-center text-white">
    <div>
      <p class="kicker !text-[#3DE0C5]">ERREUR {{ error?.statusCode || 500 }}</p>
      <h1 class="mt-5 text-5xl font-bold">Cette route s'est perdue dans le système.</h1>
      <p class="mx-auto mt-5 max-w-xl text-white/60">Revenez à l'accueil. Le reste du réseau fonctionne toujours.</p>
      <button class="btn-primary mt-8" @click="handleError">Retour à l'accueil</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>()
const handleError = () => clearError({ redirect: '/' })
</script>
