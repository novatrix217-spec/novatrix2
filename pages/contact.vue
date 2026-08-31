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
        <form class="card grid gap-4 sm:grid-cols-2" novalidate @submit.prevent="submit">
          <label class="text-xs font-semibold">{{ t.firstName }} *
            <input
              v-model.trim="form.firstName" class="field mt-2" required autocomplete="given-name"
              :aria-invalid="!!errors.firstName" :aria-describedby="errors.firstName ? 'error-firstName' : undefined"
              @blur="validateField('firstName')"
            />
            <span v-if="errors.firstName" id="error-firstName" class="mt-1 block text-xs font-normal text-red-600">{{ errors.firstName }}</span>
          </label>
          <label class="text-xs font-semibold">{{ t.email }} *
            <input
              v-model.trim="form.email" class="field mt-2" type="email" required autocomplete="email"
              :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'error-email' : undefined"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" id="error-email" class="mt-1 block text-xs font-normal text-red-600">{{ errors.email }}</span>
          </label>
          <label class="text-xs font-semibold">{{ t.phone }} *
            <input
              v-model.trim="form.phone" class="field mt-2" type="tel" required autocomplete="tel"
              :aria-invalid="!!errors.phone" :aria-describedby="errors.phone ? 'error-phone' : undefined"
              @blur="validateField('phone')"
            />
            <span v-if="errors.phone" id="error-phone" class="mt-1 block text-xs font-normal text-red-600">{{ errors.phone }}</span>
          </label>
          <label class="text-xs font-semibold">{{ t.company }} *
            <input
              v-model.trim="form.domain" class="field mt-2" required autocomplete="organization"
              :aria-invalid="!!errors.domain" :aria-describedby="errors.domain ? 'error-domain' : undefined"
              @blur="validateField('domain')"
            />
            <span v-if="errors.domain" id="error-domain" class="mt-1 block text-xs font-normal text-red-600">{{ errors.domain }}</span>
          </label>
          <label class="col-span-full text-xs font-semibold">{{ t.messageLabel }}<textarea v-model.trim="form.message" class="field mt-2 min-h-32 py-3"/></label>
          <input v-model="form.website" tabindex="-1" class="absolute -left-[9999px]" autocomplete="off" aria-hidden="true"/>
          <label class="col-span-full flex items-start gap-3 text-xs leading-5 text-[var(--muted)]">
            <input
              v-model="form.consent" class="mt-1 accent-violet-600" type="checkbox" required
              :aria-invalid="!!errors.consent" :aria-describedby="errors.consent ? 'error-consent' : undefined"
              @change="validateField('consent')"
            />
            {{ t.consent }} <NuxtLink :to="localePath('/confidentialite')" class="text-violet-700 underline">{{ t.privacy }}</NuxtLink>
            <span v-if="errors.consent" id="error-consent" class="mt-1 block w-full text-xs font-normal text-red-600">{{ errors.consent }}</span>
          </label>
          <p v-if="feedback" ref="feedbackEl" class="col-span-full rounded-xl p-3 text-sm" :class="success ? 'bg-emerald-500/10 text-emerald-700' : 'bg-red-500/10 text-red-700'" role="alert" tabindex="-1">{{ feedback }}</p>
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
  errorFirstName: 'Enter at least 2 characters.', errorEmail: 'Enter a valid email address.', errorPhone: 'Enter a valid phone number (at least 6 characters).', errorDomain: 'Enter your company or field of activity.', errorConsent: 'Please confirm you agree to be contacted.', errorSummary: 'Please correct the highlighted fields before sending.',
} : {
  kicker: 'audit projet offert', description: 'Choisissez votre créneau directement ici. Nous examinons votre système actuel et le résultat recherché, qu’il s’agisse de web, d’applications, d’IA, d’automatisation ou de formation.',
  heroTitle: 'Transformez votre contexte actuel en <span class="text-gradient">prochaine décision utile.</span>', bookingKicker: 'réserver sans quitter le site', bookingTitle: 'Choisissez le créneau qui vous convient.', bookingText: 'L’échange se concentre sur votre objectif, vos outils ou processus actuels, vos contraintes et la première décision utile.', bookingPoints: ['La carte du contexte actuel', 'Le premier problème ou levier à examiner', 'Une prochaine décision concrète, sans engagement'],
  formKicker: 'solution de secours locale', formTitle: 'Aucun créneau adapté ou calendrier indisponible ?', formDescription: 'Envoyez le contexte minimum utile. Nous vous recontactons pour organiser l’échange.', firstName: 'Prénom', email: 'Email professionnel', phone: 'Téléphone', company: 'Entreprise', messageLabel: 'Quel projet ou processus souhaitez-vous examiner ?', consent: 'J’accepte d’être recontacté au sujet de cette demande.', privacy: 'Politique de confidentialité', send: 'Envoyer ma demande', sent: 'Votre demande est bien reçue. Nous vous recontactons rapidement.', failed: 'La demande n’a pas pu être envoyée. Merci de réessayer.',
  errorFirstName: 'Indiquez au moins 2 caractères.', errorEmail: 'Indiquez une adresse email valide.', errorPhone: 'Indiquez un numéro de téléphone valide (6 caractères minimum).', errorDomain: 'Indiquez votre entreprise ou domaine d’activité.', errorConsent: 'Merci de confirmer votre accord pour être recontacté.', errorSummary: 'Corrigez les champs signalés avant l’envoi.',
})
const form = reactive({ firstName: '', email: '', phone: '', domain: '', message: '', consent: false, website: '', source: 'contact' })
const pending = ref(false), feedback = ref(''), success = ref(false)
const feedbackEl = ref<HTMLElement | null>(null)

type FieldName = 'firstName' | 'email' | 'phone' | 'domain' | 'consent'
const errors = reactive<Record<FieldName, string>>({ firstName: '', email: '', phone: '', domain: '', consent: '' })
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field: FieldName): boolean {
  let message = ''
  if (field === 'firstName' && form.firstName.trim().length < 2) message = t.value.errorFirstName
  if (field === 'email' && !EMAIL_RE.test(form.email.trim())) message = t.value.errorEmail
  if (field === 'phone' && form.phone.trim().length < 6) message = t.value.errorPhone
  if (field === 'domain' && form.domain.trim().length < 2) message = t.value.errorDomain
  if (field === 'consent' && !form.consent) message = t.value.errorConsent
  errors[field] = message
  return !message
}

function validateAll(): boolean {
  const fields: FieldName[] = ['firstName', 'email', 'phone', 'domain', 'consent']
  const results = fields.map(validateField)
  return results.every(Boolean)
}

async function focusFeedback() {
  await nextTick()
  feedbackEl.value?.focus()
}

async function submit() {
  feedback.value = ''
  if (!validateAll()) {
    success.value = false
    feedback.value = t.value.errorSummary
    await focusFeedback()
    return
  }
  pending.value = true
  try {
    await $fetch('/api/leads', { method: 'POST', body: form })
    success.value = true; feedback.value = t.value.sent
  } catch (error: any) {
    success.value = false; feedback.value = locale.value === 'fr' && error?.data?.statusMessage ? error.data.statusMessage : t.value.failed
  } finally {
    pending.value = false
    await focusFeedback()
  }
}
</script>
