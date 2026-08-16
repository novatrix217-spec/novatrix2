<template>
  <div ref="revealRoot">
    <PageHero :kicker="kicker" :description="description"><slot name="title">{{ title }}</slot><template #actions><a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></a><NuxtLink :to="localePath(relatedOfferTo||'/offres')" class="btn-secondary">{{ t.viewSystem }}</NuxtLink></template></PageHero>

    <section class="section-pad">
      <div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.painKicker" center>{{ painTitle }}</SectionHeading></div>
        <div class="mt-12 grid gap-5 md:grid-cols-2">
          <div v-for="(item,i) in painPoints" :key="item.title" class="card card-hover reveal" :data-reveal-delay="i*90">
            <span class="font-mono text-xs font-bold text-violet-600/40">{{ String(i+1).padStart(2,'0') }}</span>
            <h3 class="mt-3 text-lg font-bold">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p>
            <p v-if="item.after" class="mt-4 flex items-start gap-2 border-t pt-4 text-sm font-semibold text-[var(--teal)]"><Check class="mt-0.5 h-4 w-4 shrink-0"/>{{ item.after }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.installKicker" center>{{ capabilitiesTitle }}</SectionHeading></div>
        <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(item,i) in capabilities" :key="item.title" class="card card-hover glass-sheen reveal-scale" :data-reveal-delay="i*100">
            <component :is="item.icon" class="h-6 w-6 text-violet-600"/>
            <h3 class="mt-4 text-lg font-bold">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="faqs?.length" class="section-pad">
      <div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div class="reveal-left"><SectionHeading :kicker="t.faqKicker">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading></div>
        <div class="reveal-right"><FaqAccordion :items="faqs"/></div>
      </div>
    </section>

    <section v-if="related?.length" class="section-pad border-t bg-[var(--surface)]">
      <div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.seeAlsoKicker">{{ t.seeAlsoTitle1 }} <span class="text-gradient">{{ t.seeAlsoTitle2 }}</span></SectionHeading></div>
        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <NuxtLink v-for="(item,i) in related" :key="item.to" :to="localePath(item.to)" class="card card-hover reveal flex flex-col" :data-reveal-delay="i*90">
            <h3 class="text-lg font-bold">{{ item.title }}</h3>
            <p class="mt-2 flex-1 text-sm leading-6 text-[var(--muted)]">{{ item.description }}</p>
            <span class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet-700 dark:text-violet-300">{{ t.discover }} <ArrowRight class="h-4 w-4"/></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand :title="ctaTitle"/>
  </div>
</template>
<script setup lang="ts">
import { ArrowRight,Check } from 'lucide-vue-next'
import type { Component } from 'vue'
defineProps<{
  kicker:string;title:string;description:string
  painTitle:string;painPoints:{title:string;text:string;after?:string}[]
  capabilitiesTitle:string;capabilities:{icon:Component;title:string;text:string}[]
  faqs?:{question:string;answer:string}[]
  related?:{title:string;to:string;description:string}[]
  relatedOfferTo?:string
  ctaTitle:string
}>()
const { locale } = useI18n()
const localePath = useLocalePath()
const calendarUrl=useRuntimeConfig().public.calendarUrl
const revealRoot=useScrollReveal()
const t=computed(()=>locale.value==='en'?{
  viewSystem:'View the full system', painKicker:'what’s blocking you today', installKicker:'what we install',
  faqKicker:'frequently asked questions', faqTitle1:'Clear before you', faqTitle2:'call us.',
  seeAlsoKicker:'see also', seeAlsoTitle1:'You might also be interested', seeAlsoTitle2:'in this.', discover:'Discover',
}:{
  viewSystem:'Voir le système complet', painKicker:'ce qui bloque aujourd’hui', installKicker:'ce qu’on installe',
  faqKicker:'questions fréquentes', faqTitle1:'Clair avant de', faqTitle2:'nous appeler.',
  seeAlsoKicker:'voir aussi', seeAlsoTitle1:'Vous pourriez aussi être intéressé', seeAlsoTitle2:'par.', discover:'Découvrir',
})
</script>
