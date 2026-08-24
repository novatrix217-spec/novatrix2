<template>
  <DialogRoot v-model:open="bookingOpen">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-[100] bg-[#160630]/75 backdrop-blur-sm" />
      <DialogContent class="modal-panel fixed bottom-0 left-1/2 z-[101] max-h-[96dvh] w-full max-w-4xl -translate-x-1/2 overflow-y-auto rounded-t-2xl bg-[var(--background)] shadow-2xl sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl">
        <div class="sticky top-0 z-30 flex items-start justify-between gap-4 border-b bg-[var(--background)] p-4 sm:p-6">
          <div>
            <p class="kicker">{{ t.kicker }}</p>
            <DialogTitle class="mt-2 text-xl font-bold sm:text-2xl">{{ t.title }}</DialogTitle>
            <DialogDescription class="mt-2 text-sm text-[var(--muted)]">{{ t.text }}</DialogDescription>
            <p class="mt-2 text-xs text-[var(--muted)]">
              {{ t.embedHelp }}
              <NuxtLink :to="localePath('/contact') + '#calendly'" class="underline" @click="closeCalendly">{{ t.accessiblePage }}</NuxtLink>
            </p>
          </div>
          <DialogClose as-child>
            <button type="button" class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border hover:bg-violet-500/10" :aria-label="t.close">
              <X class="h-5 w-5" />
            </button>
          </DialogClose>
        </div>
        <div class="p-4 sm:p-6"><BookingWidget /></div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const { bookingOpen, closeCalendly } = useCalendly()

const t = computed(() => locale.value === 'en' ? {
  kicker: 'free project audit',
  title: 'Choose your slot without leaving NovatrixAI.',
  text: 'A focused conversation to map your current system and identify the most useful next decision for your project.',
  close: 'Close booking',
  embedHelp: 'The booking tool opens below.',
  accessiblePage: 'Prefer the full booking page.',
} : {
  kicker: 'audit projet offert',
  title: 'Choisissez votre créneau sans quitter NovatrixAI.',
  text: 'Un échange ciblé pour cartographier votre système actuel et identifier la prochaine décision utile pour votre projet.',
  close: 'Fermer la réservation',
  embedHelp: 'L’outil de réservation s’ouvre ci-dessous.',
  accessiblePage: 'Préférer la page de réservation complète.',
})

watch(() => route.fullPath, closeCalendly)
</script>
