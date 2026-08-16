<template>
  <footer class="bg-[#160630] text-white/65">
    <div class="container-shell py-16 lg:py-20">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
          <BrandMark light />
          <p class="mt-5 max-w-md text-sm leading-7">{{ $t('footer.tagline') }}</p>
          <p class="mt-5 flex items-center gap-2 text-sm"><MapPin class="h-4 w-4 text-[#3DE0C5]" /> {{ $t('footer.location') }}</p>
          <a href="mailto:contact@novatrixai.com" class="mt-2 flex items-center gap-2 text-sm hover:text-white"><Mail class="h-4 w-4 text-[#3DE0C5]" /> contact@novatrixai.com</a>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-white">{{ $t('footer.explore') }}</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><NuxtLink :to="localePath('/offres/acquisition')" class="hover:text-[#3DE0C5]">{{ $t('footer.acquisition') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/offres/pilotage-ia')" class="hover:text-[#3DE0C5]">{{ $t('footer.agentsIa') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/offres/creation-web-apps')" class="hover:text-[#3DE0C5]">{{ $t('footer.webApps') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/realisations')" class="hover:text-[#3DE0C5]">{{ $t('footer.realisations') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/avis')" class="hover:text-[#3DE0C5]">{{ $t('footer.avis') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/ressources')" class="hover:text-[#3DE0C5]">{{ $t('footer.resources') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/blog')" class="hover:text-[#3DE0C5]">{{ $t('footer.blog') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/formation')" class="hover:text-[#3DE0C5]">{{ $t('footer.formation') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-white">{{ $t('footer.solutions') }}</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><NuxtLink :to="localePath('/solutions/agent-whatsapp-ia')" class="hover:text-[#3DE0C5]">{{ $t('footer.agentWhatsapp') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/solutions/automatisation-n8n')" class="hover:text-[#3DE0C5]">{{ $t('footer.automationN8n') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/solutions/relance-panier-abandonne')" class="hover:text-[#3DE0C5]">{{ $t('footer.cartRecovery') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/agence-ia-cotonou')" class="hover:text-[#3DE0C5]">{{ $t('footer.cotonouAgency') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-white">{{ $t('footer.start') }}</p>
          <p class="mt-5 text-sm leading-6">{{ $t('footer.startText') }}</p>
          <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary mt-5 !min-h-10 !px-4 !py-2">{{ $t('footer.bookCall') }} <ArrowUpRight class="h-4 w-4" /></a>
        </div>
      </div>
      <div class="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {{ new Date().getFullYear() }} NovatrixAI. {{ $t('footer.rights') }}</span>
        <div class="flex gap-4"><NuxtLink :to="localePath('/confidentialite')" class="hover:text-white">{{ $t('footer.privacy') }}</NuxtLink><NuxtLink :to="localePath('/contact')" class="hover:text-white">{{ $t('footer.contact') }}</NuxtLink></div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUpRight, Mail, MapPin } from 'lucide-vue-next'
const calendarUrl = useRuntimeConfig().public.calendarUrl
const localePath = useLocalePath()
</script>
