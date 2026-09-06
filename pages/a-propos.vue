<template><div ref="revealRoot"><PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/></PageHero>
  <section class="section-pad"><div class="container-shell grid gap-12 lg:grid-cols-2"><div class="reveal-left"><SectionHeading :kicker="t.convictionKicker"><span v-html="t.convictionTitle"/></SectionHeading></div><div class="reveal-right space-y-5 text-lg leading-8 text-[var(--muted)]"><p>{{ t.p1 }}</p><p>{{ t.p2 }}</p></div></div></section>
  <section class="section-pad border-y bg-[var(--surface)]"><div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.workKicker" center>{{ t.workTitle1 }} <span class="text-gradient">{{ t.workTitle2 }}</span></SectionHeading></div><div class="mt-12 grid gap-5 md:grid-cols-3"><div v-for="(item,i) in values" :key="item.title" class="card card-hover glass-sheen reveal-scale" :data-reveal-delay="i*90"><component :is="item.icon" class="h-6 w-6 text-violet-600"/><h3 class="mt-4 text-lg font-bold">{{ item.title }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p></div></div></div></section>

  <!-- Équipe : photos réelles uniquement (aucune photo générée ni générique). -->
  <section class="section-pad">
    <div class="container-shell">
      <div class="reveal"><SectionHeading :kicker="t.teamKicker" center>{{ t.teamTitle1 }} <span class="text-gradient">{{ t.teamTitle2 }}</span></SectionHeading></div>
      <div class="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        <div v-for="(member, i) in team" :key="member.name" class="card card-hover reveal-scale flex flex-col items-center !p-8 text-center" :data-reveal-delay="i * 90">
          <!-- Repli sur les initiales tant qu'une photo réelle n'est pas fournie : jamais
               d'image cassée, et jamais de portrait générique ou généré à la place. -->
          <img v-if="member.photo && !failedPhotos.has(member.name)" :src="member.photo" :alt="member.alt" width="112" height="112" class="h-28 w-28 rounded-full object-cover object-top" loading="lazy" @error="failedPhotos.add(member.name)"/>
          <span v-else class="grid h-28 w-28 place-items-center rounded-full bg-[var(--accent-soft)] font-heading text-2xl font-bold text-[var(--accent)]" role="img" :aria-label="member.alt">{{ member.initials }}</span>
          <p class="mt-5 font-bold">{{ member.name }}</p>
          <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{{ member.role }}</p>
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
// Photos dont le chargement a échoué : bascule sur les initiales sans image cassée.
const failedPhotos=reactive(new Set<string>())
const t=computed(()=>locale.value==='en'?{
  kicker:'novatrixai', description:'Based in Cotonou, we take back control of the chain that’s losing you clients: from the first ad to the signed appointment.',
  heroTitle:'You don’t need one more tool.<br><span class="text-gradient">You need everything to talk to each other.</span>',
  convictionKicker:'our conviction', convictionTitle:'What’s costing you sales isn’t a tool. It’s <span class="text-gradient">everything that doesn’t talk to each other.</span>',
  p1:'A hit ad earns you nothing if the page lets the visitor slip away. A converting page earns you nothing if the lead waits three days without a reply. Every isolated link makes you pay for the others’ shortcomings.',
  p2:'We scope the whole chain, connect the agreed links and review each phase with your team. You keep a readable system and documented decisions.',
  workKicker:'how we work', workTitle1:'Clear scope.', workTitle2:'Visible decisions.',
  teamKicker:'the team', teamTitle1:'Behind the', teamTitle2:'system.',
}:{
  kicker:'novatrixai', description:'Basés à Cotonou, nous reprenons en main la chaîne qui vous fait perdre des clients : de la première pub jusqu’au rendez-vous signé.',
  heroTitle:'Vous n’avez pas besoin d’un outil de plus.<br><span class="text-gradient">Vous avez besoin que tout se parle.</span>',
  convictionKicker:'notre conviction', convictionTitle:'Ce qui vous coûte des ventes, ce n’est pas un outil. C’est <span class="text-gradient">tout ce qui ne se parle pas.</span>',
  p1:'Une pub qui cartonne ne vous rapporte rien si la page laisse filer le visiteur. Une page qui convertit ne vous rapporte rien si le lead attend trois jours sans réponse. Chaque maillon isolé vous fait payer les efforts des autres.',
  p2:'Nous cadrons la chaîne complète, relions les maillons convenus et revoyons chaque phase avec votre équipe. Vous gardez un système lisible et des décisions documentées.',
  workKicker:'façon de travailler', workTitle1:'Un périmètre clair.', workTitle2:'Des décisions visibles.',
  teamKicker:'l’équipe', teamTitle1:'Derrière le', teamTitle2:'système.',
})
const team=computed(()=>locale.value==='en'?[
  { name:'Raphaël Jacques-Dane Patrick Agbahungba', role:'Founder & CEO', initials:'RA', photo:'/img/founder-dane.jpg', alt:'Raphaël Jacques-Dane Patrick Agbahungba, founder and CEO of NovatrixAI' },
  { name:'Mériadeck Amoussou', role:'CTO', initials:'MA', photo:'', alt:'Mériadeck Amoussou, CTO of NovatrixAI' },
]:[
  { name:'Raphaël Jacques-Dane Patrick Agbahungba', role:'Fondateur & CEO', initials:'RA', photo:'/img/founder-dane.jpg', alt:'Raphaël Jacques-Dane Patrick Agbahungba, fondateur et CEO de NovatrixAI' },
  { name:'Mériadeck Amoussou', role:'Directeur technique (CTO)', initials:'MA', photo:'', alt:'Mériadeck Amoussou, directeur technique de NovatrixAI' },
])
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
