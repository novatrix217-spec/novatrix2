<template>
  <footer class="dark bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
    <div class="container-shell py-16 lg:py-20">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <BrandMark light />
          <p class="mt-5 max-w-md text-sm leading-7">{{ $t('footer.tagline') }}</p>
          <p class="mt-5 flex items-center gap-2 text-sm"><MapPin class="h-4 w-4 text-[var(--accent)]" /> {{ $t('footer.location') }}</p>
          <a href="mailto:contact@novatrixai.com" class="mt-2 flex items-center gap-2 text-sm hover:text-[var(--text-primary)]"><Mail class="h-4 w-4 text-[var(--accent)]" /> contact@novatrixai.com</a>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-[var(--text-primary)]">{{ $t('footer.explore') }}</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><NuxtLink :to="localePath('/offres/acquisition')" class="hover:text-[var(--accent)]">{{ $t('footer.acquisition') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/offres/pilotage-ia')" class="hover:text-[var(--accent)]">{{ $t('footer.agentsIa') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/offres/novatrix-launch')" class="hover:text-[var(--accent)]">{{ $t('footer.novatrixLaunch') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/offres/retention-ecommerce')" class="hover:text-[var(--accent)]">{{ $t('footer.retentionEcommerce') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/offres/creation-web-apps')" class="hover:text-[var(--accent)]">{{ $t('footer.webApps') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/video-lab')" class="hover:text-[var(--accent)]">{{ $t('footer.videoLab') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/realisations')" class="hover:text-[var(--accent)]">{{ $t('footer.realisations') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/avis')" class="hover:text-[var(--accent)]">{{ $t('footer.avis') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/ressources')" class="hover:text-[var(--accent)]">{{ $t('footer.resources') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/blog')" class="hover:text-[var(--accent)]">{{ $t('footer.blog') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/formation')" class="hover:text-[var(--accent)]">{{ $t('footer.formation') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-[var(--text-primary)]">{{ $t('footer.solutions') }}</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><NuxtLink :to="localePath('/solutions/agent-whatsapp-ia')" class="hover:text-[var(--accent)]">{{ $t('footer.agentWhatsapp') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/solutions/automatisation-n8n')" class="hover:text-[var(--accent)]">{{ $t('footer.automationN8n') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/solutions/relance-panier-abandonne')" class="hover:text-[var(--accent)]">{{ $t('footer.cartRecovery') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/agence-ia-cotonou')" class="hover:text-[var(--accent)]">{{ $t('footer.cotonouAgency') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-[var(--text-primary)]">{{ $t('footer.start') }}</p>
          <p class="mt-5 text-sm leading-6">{{ $t('footer.startText') }}</p>
          <button type="button" class="btn-primary mt-5 !min-h-10 !px-4 !py-2" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowUpRight class="h-4 w-4" /></button>
        </div>
      </div>
      <div class="mt-14 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {{ new Date().getFullYear() }} NovatrixAI. {{ $t('footer.rights') }}</span>
        <div class="flex gap-4"><NuxtLink :to="localePath('/confidentialite')" class="hover:text-[var(--text-primary)]">{{ $t('footer.privacy') }}</NuxtLink><NuxtLink :to="localePath('/mentions-legales')" class="hover:text-[var(--text-primary)]">{{ $t('footer.legal') }}</NuxtLink><NuxtLink :to="localePath('/contact')" class="hover:text-[var(--text-primary)]">{{ $t('footer.contact') }}</NuxtLink></div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUpRight, Mail, MapPin } from 'lucide-vue-next'
const { openCalendly } = useCalendly()
const localePath = useLocalePath()
</script>
