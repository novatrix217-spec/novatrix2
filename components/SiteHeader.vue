<template>
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300" :class="[isHero ? 'border-transparent bg-transparent text-white shadow-none' : 'glass text-[var(--ink)]', scrolled ? 'shadow-lg' : '']">
    <div class="container-shell flex h-[4.75rem] items-center justify-between lg:h-20">
      <BrandMark :light="isHero" />
      <nav class="hidden items-center gap-1 lg:flex" :aria-label="$t('nav.home') === 'Home' ? 'Main navigation' : 'Navigation principale'">
        <NuxtLink v-for="link in links" :key="link.to" :to="localePath(link.to)" class="rounded-lg px-3 py-2 text-sm font-semibold transition" :class="navClass(link.to)">{{ link.label }}</NuxtLink>
      </nav>
      <div class="hidden items-center gap-2 lg:flex">
        <NuxtLink :to="switchLocalePath(locale === 'fr' ? 'en' : 'fr')" class="grid h-10 place-items-center rounded-xl border px-3 font-mono text-xs font-bold transition hover:bg-violet-500/10" :class="isHero ? 'border-white/15' : ''" :aria-label="$t('header.switchLang')">{{ locale === 'fr' ? 'EN' : 'FR' }}</NuxtLink>
        <button class="grid h-10 w-10 place-items-center rounded-xl border transition hover:bg-violet-500/10" :class="isHero ? 'border-white/15' : ''" :aria-label="colorMode.value === 'dark' ? $t('header.lightMode') : $t('header.darkMode')" @click="toggleTheme">
          <Sun v-if="colorMode.value === 'dark'" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>
        <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary !min-h-10 !px-4 !py-2">{{ $t('header.bookCall') }}</a>
      </div>
      <button class="grid h-10 w-10 place-items-center rounded-xl border lg:hidden" :class="isHero ? 'border-white/15' : ''" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="$t('header.openMenu')" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </button>
    </div>
    <Transition name="modal">
      <div v-if="menuOpen" id="mobile-menu" class="border-t px-5 py-5 lg:hidden" :class="isHero ? 'border-white/10 glass-dark' : 'border-[var(--border)] glass'">
        <nav class="flex flex-col gap-1" aria-label="Navigation mobile">
          <NuxtLink v-for="link in links" :key="link.to" :to="localePath(link.to)" class="rounded-xl px-4 py-3 text-sm font-semibold transition" :class="isActive(link.to) ? (isHero ? 'bg-white/10 text-white' : 'bg-violet-600/10 text-violet-700 dark:text-violet-300') : 'hover:bg-violet-500/10'" @click="menuOpen = false">{{ link.label }}</NuxtLink>
          <div class="mt-3 flex gap-2">
            <NuxtLink :to="switchLocalePath(locale === 'fr' ? 'en' : 'fr')" class="grid h-12 place-items-center rounded-xl border px-4 font-mono text-xs font-bold" @click="menuOpen = false">{{ locale === 'fr' ? 'EN' : 'FR' }}</NuxtLink>
            <button class="grid h-12 w-12 place-items-center rounded-xl border" :aria-label="$t('header.changeTheme')" @click="toggleTheme"><Sun v-if="colorMode.value === 'dark'" class="h-4 w-4" /><Moon v-else class="h-4 w-4" /></button>
            <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary flex-1">{{ $t('header.bookCall') }}</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Menu, Moon, Sun, X } from 'lucide-vue-next'
const route = useRoute()
const colorMode = useColorMode()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const menuOpen = ref(false)
const scrolled = ref(false)
const calendarUrl = useRuntimeConfig().public.calendarUrl
// Header sombre tant qu'on survole le hero (fond violet) ; bascule en glass clair une fois le hero dépassé.
const isHero = computed(() => (route.path === '/' || route.path === '/en') && colorMode.value !== 'dark' && !scrolled.value)
// Le hero fait min-h-screen : on bascule quand on a quasi dépassé la hauteur du viewport.
function onScroll() { scrolled.value = window.scrollY > window.innerHeight - 90 }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
// Recalcule l'état au changement de route (sinon le header garde son apparence "scrollé" en revenant à l'accueil).
watch(() => route.path, () => { nextTick(onScroll) })
const links = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.offers'), to: '/offres' },
  { label: t('nav.realisations'), to: '/realisations' },
  { label: t('nav.resources'), to: '/ressources' },
  { label: t('nav.blog'), to: '/blog' },
  { label: t('nav.formation'), to: '/formation' },
  { label: t('nav.about'), to: '/a-propos' },
  { label: t('nav.contact'), to: '/contact' },
])
function isActive(to: string) {
  const localized = localePath(to)
  // Accueil : actif uniquement sur la racine exacte. Autres : actif sur la page et ses sous-pages.
  if (to === '/') return route.path === localized
  return route.path === localized || route.path.startsWith(`${localized}/`)
}
function navClass(to: string) {
  const active = isActive(to)
  return active ? (isHero.value ? 'bg-white/10 text-white' : 'bg-violet-600/10 text-violet-700 dark:text-violet-300') : (isHero.value ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-[var(--muted)] hover:bg-violet-500/5 hover:text-[var(--ink)]')
}
function toggleTheme() { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>
