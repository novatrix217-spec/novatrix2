<template><div><section class="hero-grid flex min-h-[80vh] items-center pt-20 text-white"><div class="container-shell text-center"><span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#3DE0C5] text-[#160630]"><Check class="h-8 w-8"/></span><p class="kicker mt-7 !text-[#3DE0C5]">{{ t.kicker }}</p><h1 class="mx-auto mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">{{ t.title }}</h1><p class="mx-auto mt-5 max-w-xl text-white/60">{{ title ? `« ${title} »` : t.subtitle }}</p><a v-if="safeDownload" :href="safeDownload" class="btn-primary mt-8">{{ t.download }} <Download class="h-4 w-4"/></a><NuxtLink v-else :to="localePath('/ressources')" class="btn-primary mt-8">{{ t.back }}</NuxtLink></div></section></div></template>
<script setup lang="ts">
import { Check,Download } from 'lucide-vue-next'
const { locale } = useI18n()
const localePath = useLocalePath()
definePageMeta({robots:false})
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Thank you', description: 'Your NovatrixAI resource request has been validated.' }
  : { title: 'Merci', description: 'Votre demande de ressource NovatrixAI a été validée.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const route=useRoute(),title=String(route.query.title||''),raw=String(route.query.download||'')
const safeDownload=computed(()=>raw.startsWith('/api/resources/')||raw.startsWith('https://')?raw:'')
const t=computed(()=>locale.value==='en'?{
  kicker:'// request validated', title:'Your resource is ready.', subtitle:'The link is available below and expires automatically.',
  download:'Download now', back:'Back to resources',
}:{
  kicker:'// demande validée', title:'Votre ressource est prête.', subtitle:'Le lien est disponible ci-dessous et expire automatiquement.',
  download:'Télécharger maintenant', back:'Retour aux ressources',
})
</script>
