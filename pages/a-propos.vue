<template><div ref="revealRoot"><PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/></PageHero>
  <section class="section-pad"><div class="container-shell grid gap-12 lg:grid-cols-2"><div class="reveal-left"><SectionHeading :kicker="t.convictionKicker"><span v-html="t.convictionTitle"/></SectionHeading></div><div class="reveal-right space-y-5 text-lg leading-8 text-[var(--muted)]"><p>{{ t.p1 }}</p><p>{{ t.p2 }}</p></div></div></section>
  <section class="section-pad border-y bg-[var(--surface)]"><div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.workKicker" center>{{ t.workTitle1 }} <span class="text-gradient">{{ t.workTitle2 }}</span></SectionHeading></div><div class="mt-12 grid gap-5 md:grid-cols-3"><div v-for="(item,i) in values" :key="item.title" class="card card-hover glass-sheen reveal-scale" :data-reveal-delay="i*90"><component :is="item.icon" class="h-6 w-6 text-violet-600"/><h3 class="mt-4 text-lg font-bold">{{ item.title }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p></div></div></div></section>

  <!-- Fondateur : photo réelle (bibliothèque personal branding Dane, cf. Drive), identité et corpulence préservées. -->
  <section class="section-pad">
    <div class="container-shell">
      <div class="reveal"><SectionHeading :kicker="t.teamKicker" center>{{ t.teamTitle1 }} <span class="text-gradient">{{ t.teamTitle2 }}</span></SectionHeading></div>
      <div class="mx-auto mt-12 max-w-sm">
        <div class="card flex flex-col items-center !p-8 text-center">
          <img src="/img/founder-dane.jpg" :alt="t.founderPhotoAlt" width="112" height="112" class="h-28 w-28 rounded-full object-cover object-top" loading="lazy"/>
          <p class="mt-5 font-bold">{{ t.founderName }}</p>
          <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{{ t.founderRole }}</p>
        </div>
      </div>
    </div>
  </section>

  <CtaBand/></div></template>
<script setup lang="ts">
import { FileText,Route,TimerReset } from 'lucide-vue-next'
const { locale } = useI18n()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'About', description: 'NovatrixAI connects your entire acquisition chain, from the ad to the signed appointment. One team accountable for the result, based in Cotonou.' }
  : { title: 'À propos', description: 'NovatrixAI relie toute votre chaîne d’acquisition, de la pub au rendez-vous signé. Un seul responsable du résultat, basé à Cotonou.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const revealRoot=useScrollReveal()
const t=computed(()=>locale.value==='en'?{
  kicker:'novatrixai', description:'Based in Cotonou, we take back control of the chain that’s losing you clients: from the first ad to the signed appointment.',
  heroTitle:'You don’t need one more tool.<br><span class="text-gradient">You need everything to talk to each other.</span>',
  convictionKicker:'our conviction', convictionTitle:'What’s costing you sales isn’t a tool. It’s <span class="text-gradient">everything that doesn’t talk to each other.</span>',
  p1:'A hit ad earns you nothing if the page lets the visitor slip away. A converting page earns you nothing if the lead waits three days without a reply. Every isolated link makes you pay for the others’ shortcomings.',
  p2:'We scope the whole chain, connect the agreed links and review each phase with your team. You keep a readable system and documented decisions.',
  workKicker:'how we work', workTitle1:'Clear scope.', workTitle2:'Visible decisions.',
  teamKicker:'the team', teamTitle1:'Behind the', teamTitle2:'system.', founderName:'Raphaël Jacques-Dane Patrick Agbahungba', founderRole:'Founder & CEO', founderPhotoAlt:'Raphaël Jacques-Dane Patrick Agbahungba, founder and CEO of NovatrixAI',
}:{
  kicker:'novatrixai', description:'Basés à Cotonou, nous reprenons en main la chaîne qui vous fait perdre des clients : de la première pub jusqu’au rendez-vous signé.',
  heroTitle:'Vous n’avez pas besoin d’un outil de plus.<br><span class="text-gradient">Vous avez besoin que tout se parle.</span>',
  convictionKicker:'notre conviction', convictionTitle:'Ce qui vous coûte des ventes, ce n’est pas un outil. C’est <span class="text-gradient">tout ce qui ne se parle pas.</span>',
  p1:'Une pub qui cartonne ne vous rapporte rien si la page laisse filer le visiteur. Une page qui convertit ne vous rapporte rien si le lead attend trois jours sans réponse. Chaque maillon isolé vous fait payer les efforts des autres.',
  p2:'Nous cadrons la chaîne complète, relions les maillons convenus et revoyons chaque phase avec votre équipe. Vous gardez un système lisible et des décisions documentées.',
  workKicker:'façon de travailler', workTitle1:'Un périmètre clair.', workTitle2:'Des décisions visibles.',
  teamKicker:'l’équipe', teamTitle1:'Derrière le', teamTitle2:'système.', founderName:'Raphaël Jacques-Dane Patrick Agbahungba', founderRole:'Fondateur & CEO', founderPhotoAlt:'Raphaël Jacques-Dane Patrick Agbahungba, fondateur et CEO de NovatrixAI',
})
const values=computed(()=>locale.value==='en'?[
  {icon:FileText,title:'You keep control',text:'You understand what’s running and why. No black box, no forced dependency.'},
  {icon:TimerReset,title:'Visible checkpoints',text:'The delivery sequence and review points are explicit from the scoping phase.'},
  {icon:Route,title:'Review before the next phase',text:'Each agreed step is reviewed before the following one starts.'},
]:[
  {icon:FileText,title:'Vous gardez la main',text:'Vous comprenez ce qui tourne et pourquoi. Aucune boîte noire, aucune dépendance subie.'},
  {icon:TimerReset,title:'Des jalons visibles',text:'La séquence de livraison et les points de revue sont explicites dès le cadrage.'},
  {icon:Route,title:'Revue avant la phase suivante',text:'Chaque étape convenue est revue avant le démarrage de la suivante.'},
])
</script>
