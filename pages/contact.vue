<template><div><PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/></PageHero>
  <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-2"><div class="card !p-7 sm:!p-9"><h2 class="text-2xl font-bold">{{ t.formTitle }}</h2><form class="mt-7 grid gap-4 sm:grid-cols-2" @submit.prevent="submit"><label class="text-xs font-semibold">{{ t.firstName }} *<input v-model.trim="form.firstName" class="field mt-2" required/></label><label class="text-xs font-semibold">{{ t.email }} *<input v-model.trim="form.email" class="field mt-2" type="email" required/></label><label class="text-xs font-semibold">{{ t.phone }} *<input v-model.trim="form.phone" class="field mt-2" type="tel" required/></label><label class="text-xs font-semibold">{{ t.company }} *<input v-model.trim="form.domain" class="field mt-2" required/></label><label class="col-span-full text-xs font-semibold">{{ t.messageLabel }}<textarea v-model.trim="form.message" class="field mt-2 min-h-32 py-3"/></label><input v-model="form.website" tabindex="-1" class="absolute -left-[9999px]" autocomplete="off"/><label class="col-span-full flex items-start gap-3 text-xs leading-5 text-[var(--muted)]"><input v-model="form.consent" class="mt-1 accent-violet-600" type="checkbox" required/>{{ t.consent }} <NuxtLink :to="localePath('/confidentialite')" class="text-violet-700 underline">{{ t.privacy }}</NuxtLink></label><p v-if="feedback" class="col-span-full rounded-xl p-3 text-sm" :class="success?'bg-emerald-500/10 text-emerald-700':'bg-red-500/10 text-red-700'">{{ feedback }}</p><button class="btn-primary col-span-full" :disabled="pending"><LoaderCircle v-if="pending" class="h-4 w-4 animate-spin"/>{{ t.send }}</button></form></div>
    <div><div class="card !p-7"><p class="kicker">{{ t.callKicker }}</p><h2 class="mt-4 text-2xl font-bold">{{ t.callTitle }}</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ t.callText }}</p><a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary mt-6">{{ $t('cta.button') }} <ExternalLink class="h-4 w-4"/></a></div><a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="mt-5 flex items-center gap-4 rounded-2xl border bg-[#075E54] p-6 text-white transition hover:-translate-y-1"><MessageCircle class="h-7 w-7"/><span><strong class="block">{{ t.waTitle }}</strong><small class="text-white/65">{{ t.waText }}</small></span></a></div></div></section></div></template>
<script setup lang="ts">
import { ExternalLink,LoaderCircle,MessageCircle } from 'lucide-vue-next'
const { locale } = useI18n()
const localePath = useLocalePath()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Book a call', description: 'Tell us what’s holding you back and walk away with a concrete plan. Book your free call with NovatrixAI.' }
  : { title: 'Réserver un appel', description: 'Parlez-nous de ce qui vous freine et repartez avec un plan concret. Réservez votre appel offert avec NovatrixAI.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const config=useRuntimeConfig(),calendarUrl=config.public.calendarUrl,whatsappUrl=config.public.whatsappUrl
const t=computed(()=>locale.value==='en'?{
  kicker:'contact', description:'Tell us where you’re losing time, leads or money today. We’ll show you exactly the chain to connect to make it stop.',
  heroTitle:'Your next growth starts with <span class="text-gradient">a single conversation.</span>',
  formTitle:'Tell us what’s holding you back.', firstName:'First name', email:'Email', phone:'Phone', company:'Company',
  messageLabel:'What do you want to stop losing?', consent:'Yes, contact me back to talk about it.', privacy:'Privacy policy',
  send:'I want help', callKicker:'your free call', callTitle:'Book your slot now.',
  callText:'20 minutes to spot what’s costing you the most, and walk away with a concrete plan to fix it. No commitment.',
  waTitle:'A question? Write to us', waText:'Fast reply, even before you book.',
  sent:'Got it. We’ll get back to you very soon to talk about it.', failed:'The message didn’t go through. Try again, we don’t want to miss you.',
}:{
  kicker:'contact', description:'Dites-nous où vous perdez du temps, des leads ou de l’argent aujourd’hui. On vous montre exactement la chaîne à relier pour que ça s’arrête.',
  heroTitle:'Votre prochaine croissance commence par <span class="text-gradient">un seul échange.</span>',
  formTitle:'Dites-nous ce qui vous freine.', firstName:'Prénom', email:'Email', phone:'Téléphone', company:'Entreprise',
  messageLabel:'Qu’est-ce que vous voulez arrêter de perdre ?', consent:'Oui, recontactez-moi pour en parler.', privacy:'Politique de confidentialité',
  send:'Je veux qu’on m’aide', callKicker:'votre appel offert', callTitle:'Réservez votre créneau maintenant.',
  callText:'20 minutes pour repérer ce qui vous coûte le plus cher, et repartir avec le plan concret pour le régler. Sans engagement.',
  waTitle:'Une question ? Écrivez-nous', waText:'Réponse rapide, avant même de réserver.',
  sent:'C’est noté. On revient vers vous très vite pour en parler.', failed:'L’envoi n’a pas abouti. Réessayez, on ne veut pas vous rater.',
})
const form=reactive({firstName:'',email:'',phone:'',domain:'',message:'',consent:false,website:'',source:'contact'}),pending=ref(false),feedback=ref(''),success=ref(false)
async function submit(){pending.value=true;feedback.value='';try{await $fetch('/api/leads',{method:'POST',body:form});success.value=true;feedback.value=t.value.sent}catch(e:any){success.value=false;feedback.value=e?.data?.statusMessage||t.value.failed}finally{pending.value=false}}
</script>
