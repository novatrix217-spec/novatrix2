<template>
  <div class="relative min-h-[560px] overflow-hidden rounded-2xl border bg-white">
    <div v-if="status === 'idle'" class="absolute inset-0 z-10 grid place-items-center bg-white p-8 text-center">
      <div class="max-w-md">
        <CalendarDays class="mx-auto h-9 w-9 text-violet-700"/>
        <h3 class="mt-5 text-2xl font-bold text-[#160630]">{{ t.consentTitle }}</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ t.consentText }}</p>
        <button type="button" class="btn-primary mt-6" :aria-controls="hostId" @click="start()">{{ t.showSlots }}</button>
        <p class="mt-4 text-xs leading-5 text-slate-500"><NuxtLink :to="localePath('/confidentialite') + '#calendly'" class="underline hover:text-violet-700" @click="closeCalendly">{{ t.privacy }}</NuxtLink></p>
      </div>
    </div>
    <div v-else-if="status === 'loading'" class="absolute inset-0 z-10 grid place-items-center bg-white p-8 text-center" role="status">
      <div><LoaderCircle class="mx-auto h-7 w-7 animate-spin text-violet-700"/><p class="mt-4 font-semibold text-[#160630]">{{ t.loading }}</p><p class="mt-2 text-sm text-slate-500">{{ t.loadingHelp }}</p></div>
    </div>
    <div v-else-if="status === 'error' || status === 'offline'" class="absolute inset-0 z-10 grid place-items-center bg-white p-8 text-center" role="alert">
      <div class="max-w-md"><WifiOff class="mx-auto h-8 w-8 text-violet-700"/><h3 class="mt-4 text-xl font-bold text-[#160630]">{{ status === 'offline' ? t.offline : t.error }}</h3><p class="mt-3 text-sm leading-6 text-slate-600">{{ t.fallback }}</p><div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" class="btn-primary" @click="start()">{{ t.retry }}</button><NuxtLink :to="localePath('/contact') + '#contact-form'" class="btn-secondary" @click="closeCalendly">{{ t.form }}</NuxtLink></div></div>
    </div>
    <div v-else-if="status === 'success'" class="absolute inset-0 z-10 grid place-items-center bg-white p-8 text-center" role="status">
      <div class="max-w-md"><CircleCheck class="mx-auto h-10 w-10 text-emerald-600"/><h3 class="mt-4 text-2xl font-bold text-[#160630]">{{ t.success }}</h3><p class="mt-3 text-sm leading-6 text-slate-600">{{ t.successHelp }}</p></div>
    </div>
    <div :id="hostId" ref="host" class="calendly-host min-w-[280px]" :aria-hidden="status !== 'ready'" :inert="status !== 'ready'"/>
  </div>
</template>

<script setup lang="ts">
import { CalendarDays, CircleCheck, LoaderCircle, WifiOff } from 'lucide-vue-next'

const { locale } = useI18n()
const localePath = useLocalePath()
const { initInlineWidget, closeCalendly } = useCalendly()
const host = ref<HTMLElement | null>(null)
const hostId = useId()
const status = ref<'idle'|'loading'|'ready'|'error'|'offline'|'success'>('idle')
let expectedFrame: HTMLIFrameElement | null = null
let responseTimeout: number | undefined
let autoRetried = false

const t = computed(() => locale.value === 'en' ? {
  consentTitle: 'Display available slots', consentText: 'By continuing, the Calendly booking tool will load inside this page and may process technical and booking data.', showSlots: 'Display slots', privacy: 'How Calendly processes data',
  loading: 'Loading available slots…', loadingHelp: 'We are waiting for the embedded calendar to confirm it is ready.', offline: 'You appear to be offline.', error: 'The calendar did not respond.',
  fallback: 'Retry here or send us your details with the local form.', retry: 'Retry', form: 'Use the contact form', success: 'Your audit is booked.', successHelp: 'Calendly will send the practical details to the email address you provided.',
} : {
  consentTitle: 'Afficher les créneaux disponibles', consentText: 'En continuant, l’outil de réservation Calendly se chargera dans cette page et pourra traiter des données techniques et de réservation.', showSlots: 'Afficher les créneaux', privacy: 'Comment Calendly traite les données',
  loading: 'Chargement des créneaux…', loadingHelp: 'Nous attendons que le calendrier intégré confirme qu’il est prêt.', offline: 'Vous semblez hors connexion.', error: 'Le calendrier n’a pas répondu.',
  fallback: 'Réessayez ici ou laissez-nous vos coordonnées via le formulaire local.', retry: 'Réessayer', form: 'Utiliser le formulaire', success: 'Votre audit est réservé.', successHelp: 'Calendly enverra les informations pratiques à l’adresse email renseignée.',
})

function clearResponseTimeout() {
  if (responseTimeout) window.clearTimeout(responseTimeout)
  responseTimeout = undefined
}
async function start(isRetry = false) {
  if (!host.value || (status.value === 'loading' && !isRetry)) return
  clearResponseTimeout()
  expectedFrame = null
  if (!isRetry) autoRetried = false
  status.value = 'loading'
  try {
    await initInlineWidget(host.value)
    responseTimeout = window.setTimeout(() => {
      if (status.value !== 'loading') return
      if (!autoRetried) {
        autoRetried = true
        start(true)
        return
      }
      host.value?.replaceChildren()
      expectedFrame = null
      status.value = navigator.onLine ? 'error' : 'offline'
    }, 20000)
  } catch {
    if (!autoRetried) {
      autoRetried = true
      start(true)
      return
    }
    status.value = navigator.onLine ? 'error' : 'offline'
  }
}
function onCalendlyMessage(event: MessageEvent) {
  if (event.origin !== 'https://calendly.com' || !host.value) return
  const frame = host.value.querySelector<HTMLIFrameElement>('iframe')
  if (!frame || event.source !== frame.contentWindow) return
  expectedFrame = frame
  const eventName = typeof event.data?.event === 'string' ? event.data.event : ''
  if (eventName === 'calendly.profile_page_viewed' || eventName === 'calendly.event_type_viewed' || eventName === 'calendly.date_and_time_selected') {
    clearResponseTimeout()
    status.value = 'ready'
  } else if (eventName === 'calendly.event_scheduled') {
    clearResponseTimeout()
    status.value = 'success'
  }
}
function onOnline() { if (status.value === 'offline') status.value = 'idle' }
function onOffline() { if (status.value !== 'success') { clearResponseTimeout(); status.value = 'offline' } }

onMounted(() => {
  window.addEventListener('message', onCalendlyMessage)
  window.addEventListener('online', onOnline)
  window.addEventListener('offline', onOffline)
  // Chargement direct de Calendly : priorite a la conversion plutot qu'a l'etape de
  // consentement intermediaire (cf. politique de confidentialite et mentions legales,
  // mises a jour en consequence pour refleter ce chargement automatique).
  start()
})
onBeforeUnmount(() => {
  clearResponseTimeout()
  window.removeEventListener('message', onCalendlyMessage)
  window.removeEventListener('online', onOnline)
  window.removeEventListener('offline', onOffline)
})
</script>

<style scoped>
.calendly-host { height: 680px; }
:deep(.calendly-inline-widget), :deep(.calendly-inline-widget iframe) { min-width: 280px; width: 100%; height: 680px !important; }
@media (max-width: 640px) { .calendly-host, :deep(.calendly-inline-widget), :deep(.calendly-inline-widget iframe) { height: 760px !important; } }
</style>
