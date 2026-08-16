<template><div v-if="resource"><PageHero :kicker="`${t.resourceKicker} · ${resource.type}`" :description="lf(resource.description,resource.descriptionEn)">{{ lf(resource.title,resource.titleEn) }}<template #actions><button class="btn-primary" @click="gate=true"><LockKeyhole class="h-4 w-4"/>{{ t.unlock }}</button><NuxtLink :to="localePath('/ressources')" class="btn-secondary">{{ t.back }}</NuxtLink></template></PageHero>
  <div v-if="coverUrl" class="container-shell"><img :src="coverUrl" :alt="lf(resource.title,resource.titleEn)" class="-mt-10 mb-2 w-full rounded-2xl object-cover shadow-[var(--elev-3)] sm:max-h-[360px]"/></div>
  <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[1fr_.75fr]"><div><SectionHeading :kicker="t.whatKicker">{{ t.whatTitle1 }} <span class="text-gradient">{{ t.whatTitle2 }}</span></SectionHeading><div class="mt-8 space-y-4"><div v-for="item in t.benefits" :key="item" class="flex gap-3 rounded-xl border bg-[var(--surface)] p-4"><Check class="mt-0.5 h-5 w-5 shrink-0 text-[var(--teal)]"/><span>{{ item }}</span></div></div></div><aside class="card h-fit !p-8"><p class="kicker">{{ t.protectedKicker }}</p><h2 class="mt-4 text-2xl font-bold">{{ t.receiveLink }}</h2><p class="mt-4 text-sm leading-6 text-[var(--muted)]">{{ t.neverExposed }}</p><button class="btn-primary mt-7 w-full" @click="gate=true">{{ t.accessNow }} <ArrowRight class="h-4 w-4"/></button></aside></div></section><LeadGateModal :open="gate" :resource="resource" @close="gate=false"/><CtaBand/></div></template>
<script setup lang="ts">
import { ArrowRight,Check,LockKeyhole } from 'lucide-vue-next'
import { demoResources } from '~/shared/demo'
import type { PublicResource } from '~/shared/types'
const { locale } = useI18n()
const localePath = useLocalePath()
const lf = useLocaleField()
const route=useRoute(),fallback=demoResources.find(r=>r.slug===route.params.slug)
const {data:resource}=await useFetch<PublicResource>(`/api/resources/${route.params.slug}`,{default:()=>fallback as PublicResource})
if(!resource.value)throw createError({statusCode:404,statusMessage:locale.value==='en'?'Resource not found':'Ressource introuvable'})
const cld=useCloudinaryUrl()
const coverUrl=computed(()=>cld(resource.value?.coverImageKey,'w_1200,h_500,c_fill'))
const seoMeta=computed(()=>({title:lf(resource.value!.title,resource.value!.titleEn),description:lf(resource.value!.description,resource.value!.descriptionEn)}))
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description, ogImage: () => coverUrl.value||undefined })
const gate=ref(false)
const t=computed(()=>locale.value==='en'?{
  resourceKicker:'resource', unlock:'Unlock the resource', back:'Back to resources',
  whatKicker:'what you get', whatTitle1:'A practical resource, designed to', whatTitle2:'take action.',
  benefits:['A structure you can reuse directly','The essential checkpoints','A clear path, no unnecessary jargon'],
  protectedKicker:'protected access', receiveLink:'Get your personal link.', neverExposed:'The file is never exposed publicly. The signed link expires automatically.', accessNow:'Access now',
}:{
  resourceKicker:'ressource', unlock:'Débloquer la ressource', back:'Retour aux ressources',
  whatKicker:'ce que vous obtenez', whatTitle1:'Un support concret, conçu pour', whatTitle2:'passer à l’action.',
  benefits:['Une structure directement réutilisable','Les points de contrôle essentiels','Un parcours lisible, sans jargon inutile'],
  protectedKicker:'accès protégé', receiveLink:'Recevez votre lien personnel.', neverExposed:'Le fichier n’est jamais exposé publiquement. Le lien signé expire automatiquement.', accessNow:'Accéder maintenant',
})
</script>
