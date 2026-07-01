<template><div><section class="hero-grid flex min-h-[80vh] items-center pt-20 text-white"><div class="container-shell text-center"><span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#3DE0C5] text-[#160630]"><Check class="h-8 w-8"/></span><p class="kicker mt-7 !text-[#3DE0C5]">// demande validée</p><h1 class="mx-auto mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">Votre ressource est prête.</h1><p class="mx-auto mt-5 max-w-xl text-white/60">{{ title ? `« ${title} »` : 'Le lien est disponible ci-dessous et expire automatiquement.' }}</p><a v-if="safeDownload" :href="safeDownload" class="btn-primary mt-8">Télécharger maintenant <Download class="h-4 w-4"/></a><NuxtLink v-else to="/ressources" class="btn-primary mt-8">Retour aux ressources</NuxtLink></div></section></div></template>
<script setup lang="ts">
import { Check,Download } from 'lucide-vue-next'
definePageMeta({robots:false});usePageSeo('Merci','Votre demande de ressource NovatrixAI a été validée.')
const route=useRoute(),title=String(route.query.title||''),raw=String(route.query.download||'')
const safeDownload=computed(()=>raw.startsWith('/api/resources/')||raw.startsWith('https://')?raw:'')
</script>
