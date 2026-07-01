<template>
  <footer class="bg-[#160630] text-white/65">
    <div class="container-shell py-16 lg:py-20">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <BrandMark light />
          <p class="mt-5 max-w-md text-sm leading-7">Des systèmes complets pour acquérir des clients, piloter l'activité et créer les produits numériques qui font avancer l'entreprise.</p>
          <p class="mt-5 flex items-center gap-2 text-sm"><MapPin class="h-4 w-4 text-[#3DE0C5]" /> Cotonou, Bénin · Francophonie & international</p>
          <a href="mailto:contact@novatrixai.com" class="mt-2 flex items-center gap-2 text-sm hover:text-white"><Mail class="h-4 w-4 text-[#3DE0C5]" /> contact@novatrixai.com</a>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-white">Explorer</p>
          <ul class="mt-5 space-y-3 text-sm">
            <li><NuxtLink to="/offres/acquisition" class="hover:text-[#3DE0C5]">Acquisition</NuxtLink></li>
            <li><NuxtLink to="/offres/pilotage-ia" class="hover:text-[#3DE0C5]">Agents IA</NuxtLink></li>
            <li><NuxtLink to="/offres/creation-web-apps" class="hover:text-[#3DE0C5]">Web & applications</NuxtLink></li>
            <li><NuxtLink to="/ressources" class="hover:text-[#3DE0C5]">Ressources</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-[#3DE0C5]">Blog</NuxtLink></li>
          </ul>
        </div>
        <div>
          <p class="font-mono text-xs font-semibold uppercase tracking-[.18em] text-white">Démarrer</p>
          <p class="mt-5 text-sm leading-6">Un appel court pour cartographier le vrai problème et la chaîne à construire.</p>
          <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary mt-5 !min-h-10 !px-4 !py-2">Réserver un appel <ArrowUpRight class="h-4 w-4" /></a>
        </div>
      </div>
      <div class="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span>© {{ new Date().getFullYear() }} NovatrixAI. Tous droits réservés.</span>
        <div class="flex gap-4"><NuxtLink to="/confidentialite" class="hover:text-white">Confidentialité</NuxtLink><NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink></div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUpRight, Mail, MapPin } from 'lucide-vue-next'
const calendarUrl = useRuntimeConfig().public.calendarUrl
</script>
