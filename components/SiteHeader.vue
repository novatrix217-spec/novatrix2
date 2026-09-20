<template>
  <header ref="headerEl" class="fixed inset-x-0 top-0 z-50 transition-all duration-300" :class="[isHero ? 'header-hero text-white' : 'glass text-[var(--text-primary)]', scrolled ? 'shadow-lg' : '']">
    <div class="container-shell flex h-[4.75rem] items-center justify-between lg:h-20">
      <BrandMark :light="isHero" />
      <nav class="hidden items-center gap-0.5 xl:flex" :aria-label="$t('nav.home') === 'Home' ? 'Main navigation' : 'Navigation principale'">
        <template v-for="item in navItems" :key="item.key">
          <NuxtLink v-if="!item.children" :to="localePath(item.to)" class="whitespace-nowrap rounded-lg px-3 py-2 text-[.95rem] font-semibold transition" :class="navClass(item.to)">{{ item.label }}</NuxtLink>
          <div v-else data-nav-group class="relative">
            <button type="button" class="flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-[.95rem] font-semibold transition" :class="[groupLinkClass(item), openGroup === item.key ? (isHero ? 'bg-white/10 text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)]') : '']" aria-haspopup="true" :aria-expanded="openGroup === item.key" @click="openGroup = openGroup === item.key ? null : item.key" @keydown.escape="openGroup = null">
              {{ item.label }}
              <ChevronDown class="h-3.5 w-3.5 transition" :class="openGroup === item.key ? 'rotate-180' : ''" />
            </button>
            <Transition name="modal">
              <div v-if="openGroup === item.key" class="absolute left-0 top-full mt-1 min-w-[11rem] rounded-xl border p-1.5 shadow-lg glass" :class="isHero && !scrolled ? 'border-white/15' : 'border-[var(--border-subtle)]'">
                <NuxtLink v-for="child in item.children" :key="child.to" :to="localePath(child.to)" class="block rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-[var(--accent-soft)]" @click="openGroup = null">{{ child.label }}</NuxtLink>
              </div>
            </Transition>
          </div>
        </template>
        <NuxtLink :to="localePath('/contact')" class="whitespace-nowrap rounded-lg px-3 py-2 text-[.95rem] font-semibold transition" :class="navClass('/contact')">{{ $t('nav.contact') }}</NuxtLink>
      </nav>
      <div class="hidden items-center gap-2 xl:flex">
        <NuxtLink :to="switchLocalePath(locale === 'fr' ? 'en' : 'fr')" class="grid h-10 place-items-center rounded-xl border px-3 font-mono text-xs font-bold transition hover:bg-[var(--accent-soft)]" :class="isHero ? 'border-white/15' : ''" :aria-label="$t('header.switchLang')">{{ locale === 'fr' ? 'EN' : 'FR' }}</NuxtLink>
        <button class="grid h-10 w-10 place-items-center rounded-xl border transition hover:bg-[var(--accent-soft)]" :class="isHero ? 'border-white/15' : ''" :aria-label="colorMode.value === 'dark' ? $t('header.lightMode') : $t('header.darkMode')" @click="toggleTheme">
          <Sun v-if="colorMode.value === 'dark'" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>
        <button type="button" class="btn-primary !min-h-10 whitespace-nowrap !px-4 !py-2" @click="openCalendly">{{ $t('header.bookCall') }}</button>
      </div>
      <button class="grid h-10 w-10 place-items-center rounded-xl border xl:hidden" :class="isHero ? 'border-white/15' : ''" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="$t(menuOpen ? 'header.closeMenu' : 'header.openMenu')" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </button>
    </div>
    <Transition name="modal">
      <div v-if="menuOpen" id="mobile-menu" class="border-t px-5 py-5 xl:hidden" :class="isHero ? 'border-white/10 glass-dark' : 'border-[var(--border-subtle)] glass'">
        <nav class="flex flex-col gap-1" :aria-label="$t('header.mobileNav')">
          <NuxtLink v-for="link in mobileLinks" :key="link.to" :to="localePath(link.to)" class="rounded-xl px-4 py-3 text-sm font-semibold transition" :class="isActive(link.to) ? (isHero ? 'bg-white/10 text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)]') : 'hover:bg-[var(--accent-soft)]'" @click="menuOpen = false">{{ link.label }}</NuxtLink>
          <div class="mt-3 flex gap-2">
            <NuxtLink :to="switchLocalePath(locale === 'fr' ? 'en' : 'fr')" class="grid h-12 place-items-center rounded-xl border px-4 font-mono text-xs font-bold" @click="menuOpen = false">{{ locale === 'fr' ? 'EN' : 'FR' }}</NuxtLink>
            <button class="grid h-12 w-12 place-items-center rounded-xl border" :aria-label="$t('header.changeTheme')" @click="toggleTheme"><Sun v-if="colorMode.value === 'dark'" class="h-4 w-4" /><Moon v-else class="h-4 w-4" /></button>
            <button type="button" class="btn-primary flex-1" @click="openMobileCalendly">{{ $t('header.bookCall') }}</button>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-vue-next'
const route = useRoute()
const colorMode = useColorMode()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const headerEl = ref<HTMLElement | null>(null)
const menuOpen = ref(false)
const scrolled = ref(false)
const openGroup = ref<string | null>(null)
const { openCalendly } = useCalendly()
// La nav reste claire en permanence, y compris au-dessus du hero violet : le contenu qu'elle
// porte (liens, logo, boutons) est donc toujours dessiné en couleurs sombres, lisibles sur le
// fond clair. Auparavant elle basculait en transparent sur le hero, ce qui donnait du texte
// blanc sur fond clair pendant la transition et un contraste illisible sur mobile.
// isHero est conservé et figé à false : le header garde une seule apparence, et les variantes
// « sur le hero » des classes utilitaires ci-dessous deviennent inertes sans être supprimées.
const isHero = computed(() => false)
// Le hero (.hero-screen) fait 100vh moins la hauteur du header, pas la hauteur pleine du
// viewport : on bascule dès qu'on a dépassé sa position réelle dans le document, pour ne
// pas garder le texte blanc de la nav sur un fond clair une fois le hero passé.
// La bascule se fait quand le bas du hero atteint le bas du header, mesuré sur l'élément
// lui-même : en dur (90px), le seuil était calé sur le header desktop et se déclenchait
// trop tôt sur mobile, où la nav claire réapparaissait par-dessus le hero encore violet.
// getBoundingClientRect() est relatif au viewport : il suit donc la barre d'URL mobile,
// contrairement à une hauteur mémorisée au montage.
function onScroll() {
  const hero = document.querySelector('.hero-screen')
  if (!hero) { scrolled.value = window.scrollY > window.innerHeight; return }
  const headerHeight = headerEl.value?.offsetHeight ?? 76
  scrolled.value = hero.getBoundingClientRect().bottom <= headerHeight
}
function onClickOutside(event: MouseEvent) {
  if (openGroup.value && !(event.target as HTMLElement).closest('[data-nav-group]')) {
    openGroup.value = null
  }
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') openGroup.value = null
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
// Recalcule l'état au changement de route (sinon le header garde son apparence "scrollé" en revenant à l'accueil).
watch(() => route.path, () => { nextTick(onScroll) })
const navItems = computed(() => [
  { key: 'home', label: t('nav.home'), to: '/' },
  {
    key: 'offres',
    label: t('nav.solutions'),
    children: [
      { label: t('nav.solutions'), to: '/offres' },
      { label: t('nav.useCases'), to: '/solutions' },
      { label: t('nav.realisations'), to: '/realisations' },
    ],
  },
  { key: 'videoLab', label: t('nav.videoLab'), to: '/video-lab' },
  { key: 'about', label: t('nav.about'), to: '/a-propos' },
  {
    key: 'resources',
    label: t('nav.resources'),
    children: [
      { label: t('nav.resources'), to: '/ressources' },
      { label: t('nav.blog'), to: '/blog' },
      { label: t('nav.formation'), to: '/formation' },
    ],
  },
])
const mobileLinks = computed(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.solutions'), to: '/offres' },
  { label: t('nav.useCases'), to: '/solutions' },
  { label: t('nav.realisations'), to: '/realisations' },
  { label: t('nav.videoLab'), to: '/video-lab' },
  { label: t('nav.about'), to: '/a-propos' },
  { label: t('nav.resources'), to: '/ressources' },
  { label: t('nav.blog'), to: '/blog' },
  { label: t('nav.formation'), to: '/formation' },
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
  return active ? (isHero.value ? 'bg-white/10 text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)]') : (isHero.value ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]')
}
function groupLinkClass(item: { children?: { to: string }[] }) {
  const active = !!item.children?.some(child => isActive(child.to))
  return active ? (isHero.value ? 'bg-white/10 text-white' : 'bg-[var(--accent-soft)] text-[var(--accent)]') : (isHero.value ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-primary)]')
}
function toggleTheme() { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' }
function openMobileCalendly() {
  menuOpen.value = false
  nextTick(openCalendly)
}
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>
