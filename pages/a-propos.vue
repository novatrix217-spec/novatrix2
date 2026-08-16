<template><div ref="revealRoot"><PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/></PageHero>
  <section class="section-pad"><div class="container-shell grid gap-12 lg:grid-cols-2"><div class="reveal-left"><SectionHeading :kicker="t.convictionKicker"><span v-html="t.convictionTitle"/></SectionHeading></div><div class="reveal-right space-y-5 text-lg leading-8 text-[var(--muted)]"><p>{{ t.p1 }}</p><p>{{ t.p2 }}</p></div></div></section>
  <section class="section-pad border-y bg-[var(--surface)]"><div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.workKicker" center>{{ t.workTitle1 }} <span class="text-gradient">{{ t.workTitle2 }}</span></SectionHeading></div><div class="mt-12 grid gap-5 md:grid-cols-3"><div v-for="(item,i) in values" :key="item.title" class="card card-hover glass-sheen reveal-scale" :data-reveal-delay="i*90"><component :is="item.icon" class="h-6 w-6 text-violet-600"/><h3 class="mt-4 text-lg font-bold">{{ item.title }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p></div></div></div></section><CtaBand/></div></template>
<script setup lang="ts">
import { BadgeCheck,BrainCircuit,FileText,Focus,Route,TimerReset } from 'lucide-vue-next'
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
  p2:'We take responsibility for the whole chain: we architect it, build it, connect it, test it and grow it. You get back a system that runs, not a list of tasks to watch over.',
  workKicker:'how we work', workTitle1:'Clear commitments.', workTitle2:'Kept down to the last link.',
}:{
  kicker:'novatrixai', description:'Basés à Cotonou, nous reprenons en main la chaîne qui vous fait perdre des clients : de la première pub jusqu’au rendez-vous signé.',
  heroTitle:'Vous n’avez pas besoin d’un outil de plus.<br><span class="text-gradient">Vous avez besoin que tout se parle.</span>',
  convictionKicker:'notre conviction', convictionTitle:'Ce qui vous coûte des ventes, ce n’est pas un outil. C’est <span class="text-gradient">tout ce qui ne se parle pas.</span>',
  p1:'Une pub qui cartonne ne vous rapporte rien si la page laisse filer le visiteur. Une page qui convertit ne vous rapporte rien si le lead attend trois jours sans réponse. Chaque maillon isolé vous fait payer les efforts des autres.',
  p2:'Nous prenons la responsabilité de toute la chaîne : on l’architecture, on la construit, on la relie, on la teste et on la fait grandir. Vous récupérez un système qui tourne, pas une liste de tâches à surveiller.',
  workKicker:'façon de travailler', workTitle1:'Des engagements clairs.', workTitle2:'Tenus jusqu’au dernier maillon.',
})
const values=computed(()=>locale.value==='en'?[
  {icon:BadgeCheck,title:'The result, not the excuse',text:'One point of contact accountable for the whole chain. No more vendors pointing fingers at each other.'},
  {icon:BrainCircuit,title:'A system, not patchwork',text:'Reliable, documented and built to evolve: it holds up over time, even without us behind it.'},
  {icon:Focus,title:'Your sales first',text:'We start from what you want to win. The tool follows, never the other way around.'},
  {icon:FileText,title:'You keep control',text:'You understand what’s running and why. No black box, no forced dependency.'},
  {icon:TimerReset,title:'Delivered when promised',text:'An announced date is a date kept. You always know where things stand.'},
  {icon:Route,title:'Nothing breaks along the way',text:'Every step is validated before the next. Zero surprises on launch day.'},
]:[
  {icon:BadgeCheck,title:'Le résultat, pas l’excuse',text:'Un seul interlocuteur répond de toute la chaîne. Plus de prestataires qui se renvoient la faute.'},
  {icon:BrainCircuit,title:'Un système, pas du bricolage',text:'Fiable, documenté et évolutif : ça tient dans le temps, même sans nous derrière.'},
  {icon:Focus,title:'Vos ventes d’abord',text:'On part de ce que vous voulez gagner. L’outil suit, jamais l’inverse.'},
  {icon:FileText,title:'Vous gardez la main',text:'Vous comprenez ce qui tourne et pourquoi. Aucune boîte noire, aucune dépendance subie.'},
  {icon:TimerReset,title:'Livré quand c’est promis',text:'Une date annoncée est une date tenue. Vous savez toujours où vous en êtes.'},
  {icon:Route,title:'Rien ne casse en route',text:'Chaque étape est validée avant la suivante. Zéro surprise le jour du lancement.'},
])
</script>
