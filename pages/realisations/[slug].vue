<template><div v-if="project"><PageHero :kicker="lf(project.category,project.categoryEn)" :description="lf(project.summary,project.summaryEn)">{{ lf(project.title,project.titleEn) }}<template #actions><a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">{{ t.similar }} <ArrowRight class="h-4 w-4"/></a><NuxtLink :to="localePath('/realisations')" class="btn-secondary">{{ t.back }}</NuxtLink></template></PageHero>
  <div v-if="coverUrl" class="container-shell"><img :src="coverUrl" :alt="lf(project.title,project.titleEn)" class="-mt-10 mb-2 w-full rounded-2xl object-cover shadow-[var(--elev-3)] sm:max-h-[420px]"/></div>

  <section v-if="lf(project.challenge,project.challengeEn) || lf(project.solution,project.solutionEn)" class="section-pad">
    <div class="container-shell grid gap-10 lg:grid-cols-2">
      <div v-if="lf(project.challenge,project.challengeEn)"><SectionHeading :kicker="t.challengeKicker">{{ t.challengeTitle1 }} <span class="text-gradient">{{ t.challengeTitle2 }}</span></SectionHeading><p class="mt-6 text-base leading-7 text-[var(--muted)]">{{ lf(project.challenge,project.challengeEn) }}</p><blockquote v-if="project.quoteBefore" class="mt-6 rounded-xl border-l-4 border-violet-500 bg-[var(--surface)] p-5 text-sm italic leading-6 text-[var(--muted)]">« {{ lf(project.quoteBefore.text, project.quoteBeforeEn?.text) }} »<footer v-if="project.quoteBefore.author" class="mt-2 text-xs font-semibold not-italic text-[var(--ink)]">— {{ project.quoteBefore.author }}</footer></blockquote></div>
      <div v-if="lf(project.solution,project.solutionEn)"><SectionHeading :kicker="t.solutionKicker">{{ t.solutionTitle1 }} <span class="text-gradient">{{ t.solutionTitle2 }}</span></SectionHeading><p class="mt-6 text-base leading-7 text-[var(--muted)]">{{ lf(project.solution,project.solutionEn) }}</p><blockquote v-if="project.quoteAfter" class="mt-6 rounded-xl border-l-4 border-[var(--teal)] bg-[var(--surface)] p-5 text-sm italic leading-6 text-[var(--muted)]">« {{ lf(project.quoteAfter.text, project.quoteAfterEn?.text) }} »<footer v-if="project.quoteAfter.author" class="mt-2 text-xs font-semibold not-italic text-[var(--ink)]">— {{ project.quoteAfter.author }}</footer></blockquote></div>
    </div>
  </section>

  <section v-if="localizedFeatures.length" class="section-pad border-y bg-[var(--surface)]">
    <div class="container-shell"><SectionHeading :kicker="t.featuresKicker" center>{{ t.featuresTitle1 }} <span class="text-gradient">{{ t.featuresTitle2 }}</span></SectionHeading>
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div v-for="feature in localizedFeatures" :key="feature" class="card flex items-start gap-3"><Check class="mt-0.5 h-5 w-5 shrink-0 text-[var(--teal)]"/><span class="text-sm">{{ feature }}</span></div></div>
    </div>
  </section>

  <section v-if="project.resultsMetrics?.length" class="section-pad hero-grid grain relative overflow-hidden text-white">
    <div class="container-shell relative z-10"><SectionHeading :kicker="t.resultsKicker" dark center>{{ t.resultsTitle1 }} <span class="text-[#3DE0C5]">{{ t.resultsTitle2 }}</span></SectionHeading>
      <div class="mt-10 grid gap-5 sm:grid-cols-3"><div v-for="metric in project.resultsMetrics" :key="metric.label" class="glass-dark rounded-2xl p-7 text-center"><p class="font-heading text-4xl font-bold text-[#3DE0C5]">{{ metric.value }}</p><p class="mt-2 text-sm text-white/60">{{ metric.label }}</p></div></div>
    </div>
  </section>

  <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[1fr_.75fr]">
    <div><SectionHeading :kicker="t.summaryKicker">{{ lf(project.summary,project.summaryEn) }}</SectionHeading><p class="mt-6 text-sm leading-7 text-[var(--muted)]">{{ t.sourceLine }}</p></div>
    <aside class="card h-fit !p-7"><p class="kicker">{{ t.stackKicker }}</p><div v-if="project.tools?.length" class="mt-4 flex flex-wrap gap-2"><span v-for="tool in project.tools" :key="tool" class="rounded-md border px-2.5 py-1 font-mono text-[11px] text-[var(--muted)]">{{ tool }}</span></div><p v-else class="mt-4 text-sm text-[var(--muted)]">{{ t.customStack }}</p><p v-if="project.deliveryDays" class="mt-5 flex items-center gap-2 text-sm font-semibold"><Clock3 class="h-4 w-4 text-[var(--teal)]"/>{{ t.deliveredIn }} {{ project.deliveryDays }} {{ $t('card.days') }}</p></aside>
  </div></section>

  <CtaBand/></div></template>
<script setup lang="ts">
import { ArrowRight,Check,Clock3 } from 'lucide-vue-next'
import { demoProjects } from '~/shared/demo'
import type { PublicProject } from '~/shared/types'
const { locale } = useI18n()
const localePath = useLocalePath()
const lf = useLocaleField()
const route=useRoute(),fallback=demoProjects.find(p=>p.slug===route.params.slug)
const {data:project}=await useFetch<PublicProject>(`/api/projects/${route.params.slug}`,{default:()=>fallback as PublicProject})
if(!project.value)throw createError({statusCode:404,statusMessage:locale.value==='en'?'Case study not found':'Réalisation introuvable'})
const cld=useCloudinaryUrl()
const coverUrl=computed(()=>cld(project.value?.coverImageKey,'w_1200,h_600,c_fill'))
const seoMeta=computed(()=>({title:lf(project.value!.title,project.value!.titleEn),description:lf(project.value!.summary,project.value!.summaryEn)}))
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description, ogImage: () => coverUrl.value||undefined })
const calendarUrl=useRuntimeConfig().public.calendarUrl
const localizedFeatures=computed(()=>lf(project.value?.features,project.value?.featuresEn)||[])
const t=computed(()=>locale.value==='en'?{
  similar:'A similar project? Let’s talk', back:'Back to case studies',
  challengeKicker:'the challenge', challengeTitle1:'What was', challengeTitle2:'the problem.',
  solutionKicker:'the solution', solutionTitle1:'What we', solutionTitle2:'built.',
  featuresKicker:'key features', featuresTitle1:'What the system', featuresTitle2:'actually does.',
  resultsKicker:'results', resultsTitle1:'What it', resultsTitle2:'changed.',
  summaryKicker:'in short', sourceLine:`Case study ${project.value?.source==='comeup'?'from our project history':'led by NovatrixAI'}. Have a similar need? Let’s talk about what would save you the most time.`,
  stackKicker:'stack used', customStack:'Custom stack, tailored to the need.', deliveredIn:'Delivered in',
}:{
  similar:'Un projet similaire ? Discutons-en', back:'Retour aux réalisations',
  challengeKicker:'le défi', challengeTitle1:'Ce qui posait', challengeTitle2:'problème.',
  solutionKicker:'la solution', solutionTitle1:'Ce qu’on a', solutionTitle2:'construit.',
  featuresKicker:'fonctionnalités clés', featuresTitle1:'Ce que le système', featuresTitle2:'fait vraiment.',
  resultsKicker:'résultats', resultsTitle1:'Ce que ça a', resultsTitle2:'changé.',
  summaryKicker:'en résumé', sourceLine:`Réalisation ${project.value?.source==='comeup'?'issue de notre historique de missions':'menée par NovatrixAI'}. Vous avez un besoin proche ? Parlons de ce qui vous ferait gagner le plus de temps.`,
  stackKicker:'stack utilisée', customStack:'Stack sur mesure, adaptée au besoin.', deliveredIn:'Livré en',
})
</script>
