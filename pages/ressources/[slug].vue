<template><div v-if="resource"><PageHero :kicker="`ressource · ${resource.type}`" :description="resource.description">{{ resource.title }}<template #actions><button class="btn-primary" @click="gate=true"><LockKeyhole class="h-4 w-4"/>Débloquer la ressource</button><NuxtLink to="/ressources" class="btn-secondary">Retour aux ressources</NuxtLink></template></PageHero>
  <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[1fr_.75fr]"><div><SectionHeading kicker="ce que vous obtenez">Un support concret, conçu pour <span class="text-gradient">passer à l’action.</span></SectionHeading><div class="mt-8 space-y-4"><div v-for="item in benefits" :key="item" class="flex gap-3 rounded-xl border bg-[var(--surface)] p-4"><Check class="mt-0.5 h-5 w-5 shrink-0 text-[var(--teal)]"/><span>{{ item }}</span></div></div></div><aside class="card h-fit !p-8"><p class="kicker">accès protégé</p><h2 class="mt-4 text-2xl font-bold">Recevez votre lien personnel.</h2><p class="mt-4 text-sm leading-6 text-[var(--muted)]">Le fichier n’est jamais exposé publiquement. Le lien signé expire automatiquement.</p><button class="btn-primary mt-7 w-full" @click="gate=true">Accéder maintenant <ArrowRight class="h-4 w-4"/></button></aside></div></section><LeadGateModal :open="gate" :resource="resource" @close="gate=false"/><CtaBand/></div></template>
<script setup lang="ts">
import { ArrowRight,Check,LockKeyhole } from 'lucide-vue-next'
import { demoResources } from '~/shared/demo'
import type { PublicResource } from '~/shared/types'
const route=useRoute(),fallback=demoResources.find(r=>r.slug===route.params.slug)
const {data:resource}=await useFetch<PublicResource>(`/api/resources/${route.params.slug}`,{default:()=>fallback as PublicResource})
if(!resource.value)throw createError({statusCode:404,statusMessage:'Ressource introuvable'})
usePageSeo(resource.value.title,resource.value.description)
const gate=ref(false),benefits=['Une structure directement réutilisable','Les points de contrôle essentiels','Un parcours lisible, sans jargon inutile']
</script>
