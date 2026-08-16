<template><div><PageHero :kicker="t.kicker" :description="t.description">{{ t.title1 }} <span class="text-gradient">{{ t.title2 }}</span></PageHero>

  <section class="section-pad"><div class="container-shell"><TestimonialWall :items="data?.items||[]"/><p v-if="!data?.items?.length" class="py-16 text-center text-[var(--muted)]">{{ $t('avisPage.empty') }}</p></div></section>

  <section class="section-pad border-t bg-[var(--surface)]"><div class="container-shell max-w-2xl"><div class="card !p-7 sm:!p-9">
    <SectionHeading :kicker="t.formKicker">{{ t.formTitle1 }} <span class="text-gradient">{{ t.formTitle2 }}</span></SectionHeading>
    <form class="mt-7 grid gap-4" @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-cols-2"><label class="text-xs font-semibold">{{ t.name }} *<input v-model.trim="form.name" class="field mt-2" required maxlength="120"/></label><label class="text-xs font-semibold">{{ t.role }}<input v-model.trim="form.role" class="field mt-2" maxlength="160"/></label></div>
      <label class="text-xs font-semibold">{{ t.email }}<input v-model.trim="form.email" class="field mt-2" type="email" maxlength="320"/></label>
      <label class="text-xs font-semibold">{{ t.rating }}<div class="mt-2 flex gap-1"><button v-for="n in 5" :key="n" type="button" class="p-1" :aria-label="`${n} ${t.stars}`" @click="form.rating=n"><Star class="h-6 w-6" :class="n<=form.rating?'fill-current text-[var(--teal)]':'text-[var(--border)]'"/></button></div></label>
      <label class="text-xs font-semibold">{{ t.text }} *<textarea v-model.trim="form.text" class="field mt-2 min-h-32 py-3" required minlength="10" maxlength="2000"/></label>
      <input v-model="form.website" tabindex="-1" class="absolute -left-[9999px]" autocomplete="off"/>
      <p v-if="feedback" class="rounded-xl p-3 text-sm" :class="success?'bg-emerald-500/10 text-emerald-700':'bg-red-500/10 text-red-700'">{{ feedback }}</p>
      <button class="btn-primary" :disabled="pending"><LoaderCircle v-if="pending" class="h-4 w-4 animate-spin"/>{{ t.send }}</button>
      <p class="text-xs text-[var(--muted)]">{{ t.moderation }}</p>
    </form>
  </div></div></section>
  <CtaBand/></div></template>
<script setup lang="ts">
import { LoaderCircle,Star } from 'lucide-vue-next'
import { demoTestimonials } from '~/shared/demo'
import type { PublicTestimonial } from '~/shared/types'
const { locale } = useI18n()
const t = computed(() => locale.value === 'en' ? {
  kicker: 'reviews', title1: 'What our clients', title2: 'say.',
  description: 'Verified feedback from clients we’ve worked with. Worked with us? Your review helps the next one decide.',
  formKicker: 'leave your review', formTitle1: '30 seconds to help the', formTitle2: 'next client.',
  name: 'Name', role: 'Role / company', email: 'Email (optional, never published)', rating: 'Rating', stars: 'stars',
  text: 'Your review', send: 'Send my review', moderation: 'Your review will be checked before publishing.',
  sent: 'Thank you! Your review will be published after verification.', failed: 'Something went wrong. Please try again in a moment.',
} : {
  kicker: 'avis clients', title1: 'Ce que nos clients', title2: 'en disent.',
  description: 'Des retours vérifiés de clients accompagnés. Vous avez travaillé avec nous ? Votre avis aide les prochains à décider.',
  formKicker: 'laissez votre avis', formTitle1: '30 secondes pour aider le', formTitle2: 'prochain client.',
  name: 'Nom', role: 'Rôle / entreprise', email: 'Email (optionnel, jamais publié)', rating: 'Note', stars: 'étoiles',
  text: 'Votre avis', send: 'Envoyer mon avis', moderation: 'Votre avis sera vérifié avant publication.',
  sent: 'Merci ! Votre avis sera publié après vérification.', failed: 'L’envoi n’a pas abouti. Réessayez dans un instant.',
})
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Client reviews', description: 'What NovatrixAI clients say about the systems delivered — reviews verified before publishing.' }
  : { title: 'Avis clients', description: 'Ce que les clients de NovatrixAI disent des systèmes livrés — avis vérifiés avant publication.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const {data}=await useFetch<{items:PublicTestimonial[]}>('/api/testimonials',{default:()=>({items:demoTestimonials})})
const form=reactive({name:'',role:'',email:'',rating:5,text:'',website:''}),pending=ref(false),feedback=ref(''),success=ref(false)
async function submit(){pending.value=true;feedback.value='';try{await $fetch('/api/testimonials',{method:'POST',body:form});success.value=true;feedback.value=t.value.sent;Object.assign(form,{name:'',role:'',email:'',rating:5,text:''})}catch(e:any){success.value=false;feedback.value=e?.data?.statusMessage||t.value.failed}finally{pending.value=false}}
</script>
