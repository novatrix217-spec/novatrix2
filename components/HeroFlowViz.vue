<template>
  <div ref="hostEl" class="relative mx-auto w-full max-w-lg" aria-hidden="true">
    <!-- Desktop pipeline: Lead -> Agent IA -> RDV, paquet animé en boucle -->
    <div
      ref="desktopEl"
      class="parallax-layer relative hidden h-[300px] w-full items-center justify-between overflow-hidden rounded-3xl border border-white/10 px-10 py-8 glass-dark lg:flex"
      style="--depth: 7"
    >
      <div class="absolute inset-14 rounded-full bg-violet-500/20 blur-3xl" />

      <svg class="pointer-events-none absolute inset-x-16 top-1/2 h-px w-[calc(100%-8rem)] -translate-y-1/2" viewBox="0 0 100 2" preserveAspectRatio="none" focusable="false">
        <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(139,92,246,.32)" stroke-width="1" />
        <line x1="0" y1="1" x2="100" y2="1" stroke="#3DE0C5" stroke-width="1" stroke-dasharray="4 3" class="flow-line" />
      </svg>

      <div ref="node1El" class="relative z-10 flex flex-col items-center gap-3">
        <div class="flex h-16 items-center justify-center">
          <span class="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80">
            <UserRound class="h-5 w-5" />
          </span>
        </div>
        <span class="font-mono text-[10px] uppercase tracking-wide text-white/60">{{ $t('heroFlow.lead') }}</span>
      </div>

      <div ref="node2El" class="relative z-10 flex flex-col items-center gap-3">
        <div class="flex h-16 items-center justify-center">
          <span class="relative grid h-16 w-16 place-items-center rounded-full bg-[#3DE0C5] text-[#160630]">
            <span class="node-pulse absolute inset-0 rounded-full border border-[#3DE0C5]" />
            <span ref="glow2El" class="absolute inset-0 rounded-full bg-[#3DE0C5]/60 opacity-0" style="filter: blur(10px)" />
            <Bot class="relative h-7 w-7" />
          </span>
        </div>
        <span class="font-mono text-[10px] uppercase tracking-wide text-white/60">{{ $t('heroFlow.agent') }}</span>
      </div>

      <div ref="node3El" class="relative z-10 flex flex-col items-center gap-3">
        <div class="flex h-16 items-center justify-center">
          <span class="relative grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80">
            <CalendarCheck class="h-5 w-5" />
            <span ref="badgeEl" class="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#3DE0C5] text-[#160630] opacity-0">
              <BadgeCheck class="h-3.5 w-3.5" />
            </span>
          </span>
        </div>
        <span class="font-mono text-[10px] uppercase tracking-wide text-white/60">{{ $t('heroFlow.meeting') }}</span>
      </div>

      <div ref="packetEl" class="pointer-events-none absolute left-0 top-0 h-3 w-3 rounded-full bg-[#3DE0C5] shadow-[0_0_12px_2px_rgba(61,224,197,.7)]" />
    </div>

    <!-- Version mobile compacte : crossfade d'un glow par nœud, pas de paquet en mouvement -->
    <div ref="mobileEl" class="relative flex h-[124px] w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 px-6 glass-dark lg:hidden">
      <svg class="pointer-events-none absolute inset-x-6 top-[42%] h-px w-[calc(100%-3rem)]" viewBox="0 0 100 2" preserveAspectRatio="none" focusable="false">
        <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(139,92,246,.32)" stroke-width="1" />
      </svg>

      <div class="relative z-10 flex flex-col items-center gap-2">
        <span class="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80">
          <span ref="glowM1El" class="absolute inset-0 rounded-full bg-[#8B5CF6]/60 opacity-0" style="filter: blur(8px)" />
          <UserRound class="relative h-4 w-4" />
        </span>
        <span class="font-mono text-[9px] uppercase tracking-wide text-white/60">{{ $t('heroFlow.lead') }}</span>
      </div>

      <div class="relative z-10 flex flex-col items-center gap-2">
        <span class="relative grid h-11 w-11 place-items-center rounded-full bg-[#3DE0C5] text-[#160630]">
          <span ref="glowM2El" class="absolute inset-0 rounded-full bg-[#3DE0C5]/60 opacity-0" style="filter: blur(8px)" />
          <Bot class="relative h-5 w-5" />
        </span>
        <span class="font-mono text-[9px] uppercase tracking-wide text-white/60">{{ $t('heroFlow.agent') }}</span>
      </div>

      <div class="relative z-10 flex flex-col items-center gap-2">
        <span class="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80">
          <span ref="glowM3El" class="absolute inset-0 rounded-full bg-[#3DE0C5]/60 opacity-0" style="filter: blur(8px)" />
          <CalendarCheck class="relative h-4 w-4" />
        </span>
        <span class="font-mono text-[9px] uppercase tracking-wide text-white/60">{{ $t('heroFlow.meeting') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Pipeline visuel du hero : Lead entrant -> Agent IA -> RDV confirmé.
 * Inspiré de `NodeDiagram.vue` (nœud pulsé `.node-pulse`, ligne active `.flow-line`/`dash-flow`),
 * mais dédié au hero : paquet HTML animé en `transform`/`opacity` uniquement (jamais d'attributs
 * SVG cx/cy), boucle GSAP pilotée par IntersectionObserver, variante mobile compacte visible dès
 * le breakpoint de base (pas de `hidden` sous `lg`).
 *
 * Décoratif et redondant avec le texte du hero : `aria-hidden="true"` sur le conteneur racine.
 */
import { BadgeCheck, Bot, CalendarCheck, UserRound } from 'lucide-vue-next'
import gsap from 'gsap'

const hostEl = useParallax(9)
const desktopEl = ref<HTMLElement | null>(null)
const mobileEl = ref<HTMLElement | null>(null)
const node1El = ref<HTMLElement | null>(null)
const node2El = ref<HTMLElement | null>(null)
const node3El = ref<HTMLElement | null>(null)
const packetEl = ref<HTMLElement | null>(null)
const glow2El = ref<HTMLElement | null>(null)
const badgeEl = ref<HTMLElement | null>(null)
const glowM1El = ref<HTMLElement | null>(null)
const glowM2El = ref<HTMLElement | null>(null)
const glowM3El = ref<HTMLElement | null>(null)

const reducedMotion = useReducedMotion()

let mm: gsap.MatchMedia | null = null
let io: IntersectionObserver | null = null
let activeTl: gsap.core.Timeline | null = null
let isVisible = false

function buildDesktopTimeline(): () => void {
  const root = desktopEl.value
  const packet = packetEl.value
  const n1 = node1El.value, n2 = node2El.value, n3 = node3El.value
  const glow2 = glow2El.value
  const badge = badgeEl.value
  if (!root || !packet || !n1 || !n2 || !n3 || !glow2 || !badge) return () => {}

  const rootRect = root.getBoundingClientRect()
  const centerX = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    return r.left - rootRect.left + r.width / 2
  }
  const pos1 = centerX(n1)
  const pos2 = centerX(n2)
  const pos3 = centerX(n3)
  const midY = rootRect.height / 2

  gsap.set(packet, { xPercent: -50, yPercent: -50, y: midY })

  if (reducedMotion.value) {
    // État final statique : pipeline "terminé", pas de paquet en mouvement, pas de pulse/parallax additionnel.
    gsap.set(packet, { x: pos3, opacity: 1, scale: 1 })
    gsap.set(badge, { opacity: 1, scale: 1 })
    gsap.set(glow2, { opacity: 0 })
    return () => {}
  }

  gsap.set(badge, { opacity: 0, scale: 0 })

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7, paused: true })
  tl.set(packet, { x: pos1, opacity: 1, scale: 1 })
  tl.to(packet, { x: pos2, scale: 1.15, duration: 1.4, ease: 'power2.inOut', force3D: true }, 0)
  tl.to(packet, { scale: 1, duration: 0.2, ease: 'power1.out' }, 1.4)
  tl.to(glow2, { opacity: 0.9, scale: 1.25, duration: 0.35, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.4)
  tl.to(packet, { x: pos3, scale: 1.15, duration: 1.4, ease: 'power2.inOut', force3D: true }, 2.1)
  tl.to(packet, { scale: 1, duration: 0.2, ease: 'power1.out' }, 3.5)
  tl.fromTo(badge, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, 3.6)
  tl.to(packet, { opacity: 0, duration: 0.4, ease: 'power1.in' }, 5.0)
  tl.set(packet, { x: pos1 }, 5.4)
  tl.set(badge, { scale: 0, opacity: 0 }, 5.4)
  tl.to(packet, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 5.4)

  activeTl = tl
  if (isVisible) tl.play()

  return () => {
    tl.kill()
    if (activeTl === tl) activeTl = null
  }
}

function buildMobileTimeline(): () => void {
  const g1 = glowM1El.value, g2 = glowM2El.value, g3 = glowM3El.value
  if (!g1 || !g2 || !g3) return () => {}

  gsap.set([g1, g2, g3], { opacity: 0 })

  if (reducedMotion.value) return () => {}

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true })
  tl.to(g1, { opacity: 1, duration: 0.5, ease: 'sine.inOut' }, 0)
  tl.to(g1, { opacity: 0, duration: 0.5, ease: 'sine.inOut' }, 0.7)
  tl.to(g2, { opacity: 1, duration: 0.5, ease: 'sine.inOut' }, 1.2)
  tl.to(g2, { opacity: 0, duration: 0.5, ease: 'sine.inOut' }, 1.9)
  tl.to(g3, { opacity: 1, duration: 0.5, ease: 'sine.inOut' }, 2.4)
  tl.to(g3, { opacity: 0, duration: 0.5, ease: 'sine.inOut' }, 3.1)

  activeTl = tl
  if (isVisible) tl.play()

  return () => {
    tl.kill()
    if (activeTl === tl) activeTl = null
  }
}

onMounted(() => {
  if (!import.meta.client) return

  mm = gsap.matchMedia()
  mm.add({ isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023.98px)' }, (context) => {
    const conditions = context.conditions as { isDesktop: boolean; isMobile: boolean } | undefined
    return conditions?.isDesktop ? buildDesktopTimeline() : buildMobileTimeline()
  })

  const root = hostEl.value
  if (root) {
    io = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      isVisible = entry.isIntersecting
      if (isVisible) activeTl?.play()
      else activeTl?.pause()
    }, { threshold: 0.2 })
    io.observe(root)
  }
})

onBeforeUnmount(() => {
  io?.disconnect()
  mm?.revert()
  activeTl = null
})
</script>
