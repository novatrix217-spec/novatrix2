<template>
  <div>
    <PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/></PageHero>

    <section class="section-pad">
      <div class="container-shell grid items-start gap-10 lg:grid-cols-[.7fr_1.3fr]">
        <div class="lg:sticky lg:top-28">
          <p class="kicker">{{ t.bookingKicker }}</p><h2 class="mt-4 text-3xl font-bold">{{ t.bookingTitle }}</h2><p class="mt-4 leading-7 text-[var(--muted)]">{{ t.bookingText }}</p>
          <ul class="mt-7 space-y-4"><li v-for="item in t.bookingPoints" :key="item" class="flex gap-3 text-sm leading-6"><Check class="mt-1 h-4 w-4 shrink-0 text-emerald-600"/>{{ item }}</li></ul>
        </div>
        <div id="calendly" class="scroll-mt-24"><BookingWidget/></div>
      </div>
    </section>

    <section id="contact-form" class="section-pad scroll-mt-24 border-y bg-[var(--surface)]">
      <div class="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
        <div><SectionHeading :kicker="t.formKicker" :description="t.formDescription">{{ t.formTitle }}</SectionHeading></div>
        <form class="card grid gap-4 sm:grid-cols-2" @submit.prevent="submit">
          <label class="text-xs font-semibold">{{ t.firstName }} *<input v-model.trim="form.firstName" class="field mt-2" required autocomplete="given-name"/></label>
          <label class="text-xs font-semibold">{{ t.email }} *<input v-model.trim="form.email" class="field mt-2" type="email" required autocomplete="email"/></label>
          <label class="text-xs font-semibold">{{ t.phone }} *<input v-model.trim="form.phone" class="field mt-2" type="tel" required autocomplete="tel"/></label>
          <label class="text-xs font-semibold">{{ t.company }} *<input v-model.trim="form.domain" class="field mt-2" required autocomplete="organization"/></label>
          <label class="col-span-full text-xs font-semibold">{{ t.messageLabel }}<textarea v-model.trim="form.message" class="field mt-2 min-h-32 py-3"/></label>
          <input v-model="form.website" tabindex="-1" class="absolute -left-[9999px]" autocomplete="off" aria-hidden="true"/>
          <label class="col-span-full flex items-start gap-3 text-xs leading-5 text-[var(--muted)]"><input v-model="form.consent" class="mt-1 accent-violet-600" type="checkbox" required/>{{ t.consent }} <NuxtLink :to="localePath('/confidentialite')" class="text-violet-700 underline">{{ t.privacy }}</NuxtLink></label>
          <p v-if="feedback" class="col-span-full rounded-xl p-3 text-sm" :class="success ? 'bg-emerald-500/10 text-emerald-700' : 'bg-red-500/10 text-red-700'" role="status">{{ feedback }}</p>
          <button class="btn-primary col-span-full" :disabled="pending"><LoaderCircle v-if="pending" class="h-4 w-4 animate-spin"/>{{ t.send }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Check, LoaderCircle } from 'lucide-vue-next'
const { locale } = useI18n()
const localePath = useLocalePath()
const seo = computed(() => locale.value === 'en' ? {
  title: 'Book your free project audit', description: 'Choose your audit slot directly on NovatrixAI. We map your current system and identify the most useful next project decision.',
} : {
  title: 'Réserver votre audit projet gratuit', description: 'Choisissez votre créneau directement sur NovatrixAI. Nous cartographions votre système actuel et identifions la prochaine décision utile pour votre projet.',
})
useSeoMeta({ title: () => seo.value.title, description: () => seo.value.description })
const t = computed(() => locale.value === 'en' ? {
  kicker: 'free project audit', description: 'Choose your slot directly here. We review your current system and the outcome you want, whether the scope concerns web, applications, AI, automation or training.',
  heroTitle: 'Turn your current context into <span class="text-gradient">a useful next decision.</span>', bookingKicker: 'book without leaving the site', bookingTitle: 'Pick the slot that works for you.', bookingText: 'The conversation focuses on your objective, current tools or process, constraints and the first decision worth making.', bookingPoints: ['A map of the current context', 'The first issue or opportunity to investigate', 'A concrete next decision, with no commitment'],
  formKicker: 'local fallback', formTitle: 'No suitable slot or calendar unavailable?', formDescription: 'Send the minimum useful context. We will contact you to arrange the conversation.', firstName: 'First name', email: 'Work email', phone: 'Phone', company: 'Company', messageLabel: 'What project or process would you like to review?', consent: 'I agree to be contacted about this request.', privacy: 'Privacy policy', send: 'Send my request', sent: 'Your request has been received. We will contact you shortly.', failed: 'The request could not be sent. Please try again.',
} : {
  kicker: 'audit projet offert', description: 'Choisissez votre créneau directement ici. Nous examinons votre système actuel et le résultat recherché, qu’il s’agisse de web, d’applications, d’IA, d’automatisation ou de formation.',
  heroTitle: 'Transformez votre contexte actuel en <span class="text-gradient">prochaine décision utile.</span>', bookingKicker: 'réserver sans quitter le site', bookingTitle: 'Choisissez le créneau qui vous convient.', bookingText: 'L’échange se concentre sur votre objectif, vos outils ou processus actuels, vos contraintes et la première décision utile.', bookingPoints: ['La carte du contexte actuel', 'Le premier problème ou levier à examiner', 'Une prochaine décision concrète, sans engagement'],
  formKicker: 'solution de secours locale', formTitle: 'Aucun créneau adapté ou calendrier indisponible ?', formDescription: 'Envoyez le contexte minimum utile. Nous vous recontactons pour organiser l’échange.', firstName: 'Prénom', email: 'Email professionnel', phone: 'Téléphone', company: 'Entreprise', messageLabel: 'Quel projet ou processus souhaitez-vous examiner ?', consent: 'J’accepte d’être recontacté au sujet de cette demande.', privacy: 'Politique de confidentialité', send: 'Envoyer ma demande', sent: 'Votre demande est bien reçue. Nous vous recontactons rapidement.', failed: 'La demande n’a pas pu être envoyée. Merci de réessayer.',
})
const form = reactive({ firstName: '', email: '', phone: '', domain: '', message: '', consent: false, website: '', source: 'contact' })
const pending = ref(false), feedback = ref(''), success = ref(false)
async function submit() {
  pending.value = true; feedback.value = ''
  try {
    await $fetch('/api/leads', { method: 'POST', body: form })
    success.value = true; feedback.value = t.value.sent
  } catch (error: any) {
    success.value = false; feedback.value = locale.value === 'fr' && error?.data?.statusMessage ? error.data.statusMessage : t.value.failed
  } finally { pending.value = false }
}
</script>
