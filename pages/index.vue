<template>
  <div ref="revealRoot">
    <!-- 1. Promesse et action principale -->
    <!-- Hero plein écran : la hauteur du header fixe est retirée du calcul (au lieu d'être
         ajoutée en padding), sinon la section dépasse le viewport au lieu de le remplir.
         100svh suit la barre d'URL mobile, avec repli 100vh pour les navigateurs anciens. -->
    <section class="hero-rich hero-screen relative flex items-center overflow-hidden text-white">
      <ClientOnly><HeroCanvas /></ClientOnly>
      <div class="container-shell relative z-10 grid w-full items-center gap-6 py-6 lg:grid-cols-[1.12fr_.88fr] lg:gap-8">
        <div class="relative z-10">
          <p ref="heroKickerEl" class="kicker !text-[#3DE0C5] !text-xs">{{ t.heroKicker }}</p>
          <h1 ref="heroTitleEl" class="mt-4 max-w-4xl text-[clamp(1.5rem,2.4vw+3vh,3.5rem)] font-bold leading-[1.08] tracking-[-.04em]" v-html="t.heroTitle"/>
          <p ref="heroDescEl" class="mt-3 max-w-2xl text-[clamp(.9rem,.3vw+1.4vh,1.15rem)] leading-7 text-white/75">{{ t.heroDescription }}</p>
          <div class="mt-5 flex flex-col gap-3 sm:flex-row">
            <button ref="heroCtaBtnEl" type="button" class="btn-primary magnetic !px-6 !py-3 !text-sm" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
            <NuxtLink ref="heroCtaLinkEl" :to="localePath('/realisations')" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">{{ t.seeProof }}</NuxtLink>
          </div>
          <div class="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a href="#reservation" class="inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">{{ t.contactUs }} <ArrowRight class="h-3.5 w-3.5"/></a>
            <a v-if="hasWhatsapp" :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"><SvgWhatsappSVG class="h-4 w-4 shrink-0"/>{{ t.whatsappUs }}</a>
          </div>
          <p ref="heroAuditNoteEl" class="mt-3 max-w-xl text-xs leading-5 text-white/55">{{ t.auditNote }}</p>
        </div>
        <HeroVideo class="mt-4 max-h-[36vh] lg:mt-0 lg:max-h-[min(440px,50vh)]" />
      </div>
      <!-- Invitation à descendre : le hero occupe tout l'écran, rien n'indiquait qu'une
           page entière suivait. Décoratif, donc masqué aux lecteurs d'écran. -->
      <a
        href="#problemes"
        class="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/55 transition hover:text-white lg:flex"
        aria-hidden="true"
        tabindex="-1"
      >
        <span class="font-mono text-[10px] uppercase tracking-[.22em]">{{ t.scrollCue }}</span>
        <span class="relative grid h-9 w-5 place-items-start justify-center rounded-full border border-white/25 pt-1.5">
          <span class="scroll-dot h-1.5 w-1.5 rounded-full bg-[#3DE0C5]"/>
        </span>
      </a>
    </section>

    <!-- 1 bis. Preuve chiffrée immédiate, juste sous la promesse -->
    <MetricsStrip :projects-count="projectsCount" :testimonials-count="testimonialsCount" />

    <!-- 2. Problèmes reconnus -->
    <section id="problemes" ref="problemsSectionEl" class="section-pad scroll-mt-24">
      <div class="container-shell">
        <SectionHeading :kicker="t.problemsKicker" center :description="t.problemsDescription">{{ t.problemsTitle1 }} <span class="text-gradient">{{ t.problemsTitle2 }}</span></SectionHeading>
        <div ref="problemsTrackEl" class="problems-track mt-12">
          <div class="problems-line" aria-hidden="true"><span class="problems-line-fill"/></div>
          <span
            v-for="(item, index) in problems"
            :key="`problem-node-${index}`"
            :ref="(el) => setProblemNodeRef(el, index)"
            class="problems-node"
            aria-hidden="true"
          ><span class="problems-node-fill"/></span>
          <article
            v-for="(item, index) in problems"
            :key="item.title"
            :ref="(el) => setProblemCardRef(el, index)"
            class="card problems-card spotlight"
          >
            <component :is="item.icon" class="problems-card-icon h-6 w-6"/><h2 class="mt-5 text-xl font-bold">{{ item.title }}</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 3. Offre locomotive -->
    <section ref="acquisitionSectionEl" class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeading :kicker="t.acquisitionKicker" :description="t.acquisitionDescription">{{ t.acquisitionTitle1 }} <span class="text-gradient">{{ t.acquisitionTitle2 }}</span></SectionHeading>
          <NuxtLink :to="localePath('/offres/acquisition')" class="btn-primary mt-8">{{ t.viewAcquisition }} <ArrowRight class="h-4 w-4"/></NuxtLink>
        </div>
        <div ref="acquisitionTrackEl" class="acquisition-track">
          <div class="acquisition-line" aria-hidden="true"><span class="acquisition-line-fill"/><span class="acquisition-dot"/></div>
          <span
            v-for="(step, index) in acquisitionChain"
            :key="`acquisition-node-${index}`"
            :ref="(el) => setAcquisitionNodeRef(el, index)"
            class="acquisition-node"
            aria-hidden="true"
          ><component :is="acquisitionIcons[index]" class="h-3.5 w-3.5"/></span>
          <article
            v-for="(step, index) in acquisitionChain"
            :key="step.title"
            :ref="(el) => setAcquisitionStepRef(el, index)"
            class="acquisition-step"
          >
            <span class="acquisition-step-index grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-xs font-bold">{{ index + 1 }}</span>
            <div><h2 class="font-bold">{{ step.title }}</h2><p class="mt-1 text-sm leading-6 text-[var(--muted)]">{{ step.text }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <!-- 4. Cas d’usage -->
    <!-- Aurora + parallax souris : les orbes dérivent en continu et suivent le pointeur,
         ce qui donne du relief à une section autrement plate. Inerte au toucher et sous
         prefers-reduced-motion (géré par useParallax et par le composant). -->
    <section ref="useCasesSectionEl" class="section-pad relative overflow-hidden">
      <AuroraBackground :intensity="0.45" variant="violet" />
      <div class="container-shell relative z-10">
        <div class="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading :kicker="t.useCasesKicker" :description="t.useCasesDescription">{{ t.useCasesTitle1 }} <span class="text-gradient">{{ t.useCasesTitle2 }}</span></SectionHeading><NuxtLink :to="localePath('/solutions')" class="btn-secondary">{{ t.allUseCases }} <ArrowRight class="h-4 w-4"/></NuxtLink></div>
        <!-- Le premier cas est mis en avant (colonne large, fond appuyé) : les trois cartes
             n'ont pas le même poids commercial, la mise en page le reflète. -->
        <div ref="useCasesGridEl" class="use-case-grid mt-12 grid gap-5">
          <NuxtLink
            v-for="(item, i) in useCases"
            :key="item.to"
            :to="localePath(item.to)"
            class="use-case card reveal-scale tilt flex flex-col"
            :class="i === 0 ? 'use-case-lead' : ''"
            :data-reveal-delay="i * 110"
          >
            <component :is="item.icon" class="shrink-0 text-violet-700" :class="i === 0 ? 'h-9 w-9' : 'h-7 w-7'"/>
            <h2 class="mt-5 font-bold" :class="i === 0 ? 'text-2xl' : 'text-xl'">{{ item.title }}</h2>
            <p class="mt-3 leading-6 text-[var(--muted)]" :class="i === 0 ? 'text-base' : 'text-sm'">{{ item.text }}</p>
            <!-- Le cas mis en avant détaille sa chaîne : la carte gagne en substance au lieu
                 d'être un simple agrandissement des deux autres. -->
            <ul v-if="i === 0" class="mt-6 flex-1 space-y-2.5 border-t pt-5 text-sm text-[var(--muted)]">
              <li v-for="point in leadUseCasePoints" :key="point" class="flex gap-2.5"><Check class="mt-0.5 h-4 w-4 shrink-0 text-violet-600"/>{{ point }}</li>
            </ul>
            <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-700" :class="i === 0 ? '' : 'flex-1 items-end'">{{ t.discover }} <ArrowRight class="h-4 w-4"/></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Systèmes secondaires -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <div class="reveal"><SectionHeading :kicker="t.secondaryKicker" center :description="t.secondaryDescription">{{ t.secondaryTitle1 }} <span class="text-gradient">{{ t.secondaryTitle2 }}</span></SectionHeading></div>
        <div class="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2"><OfferCard v-for="(offer, i) in secondaryOffers" :key="offer.tag" v-bind="offer" class="reveal" :data-reveal-delay="i * 110"/></div>
      </div>
    </section>

    <!-- 6. Méthode — rupture sombre à mi-page : casse la répétition des sections claires
         et donne un deuxième temps fort après le hero. Parallax au scroll sur le fond. -->
    <section ref="methodSectionEl" class="method-band grain relative overflow-hidden py-16 text-white lg:py-20">
      <div class="scroll-parallax pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[110px]" style="--depth: 60" aria-hidden="true"/>
      <div class="scroll-parallax pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-[#3DE0C5]/10 blur-[110px]" style="--depth: -45" aria-hidden="true"/>
      <div class="container-shell relative z-10">
        <div class="max-w-3xl">
          <p class="kicker !text-[#3DE0C5]">{{ t.methodKicker }}</p>
          <h2 class="mt-5 text-3xl font-bold leading-[1.1] tracking-[-.03em] sm:text-5xl">{{ t.methodTitle1 }} <span class="text-gradient-flow">{{ t.methodTitle2 }}</span></h2>
          <p class="mt-5 text-lg leading-8 text-white/70">{{ t.methodDescription }}</p>
        </div>
        <ol class="method-steps mt-14">
          <li v-for="item in method" :key="item.step" class="method-step">
            <span class="method-step-num">{{ item.step }}</span>
            <h3 class="mt-5 text-lg font-bold">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-white/60">{{ item.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 6 bis. Démonstration vidéo — la capacité de production se montre au lieu de se
         décrire. Fond sombre : les séquences ressortent, et la page alterne enfin autre
         chose que des aplats clairs successifs. -->
    <section class="video-band relative overflow-hidden py-16 text-white lg:py-20">
      <div class="container-shell relative z-10">
        <div class="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading :kicker="t.videoKicker" dark :description="t.videoDescription">{{ t.videoTitle1 }} <span class="text-gradient">{{ t.videoTitle2 }}</span></SectionHeading>
          <NuxtLink :to="localePath('/video-lab')" class="btn-secondary magnetic shrink-0 !border-white/25 !text-white hover:!bg-white/10">{{ t.videoCta }} <ArrowRight class="h-4 w-4"/></NuxtLink>
        </div>
        <VideoMosaic class="reveal mt-12" />
      </div>
    </section>

    <!-- 7. Preuves concentrées -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <div class="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading :kicker="t.proofKicker" :description="t.proofDescription">{{ t.proofTitle1 }} <span class="text-gradient">{{ t.proofTitle2 }}</span></SectionHeading><NuxtLink :to="localePath('/realisations')" class="btn-secondary">{{ t.allProof }} <ArrowRight class="h-4 w-4"/></NuxtLink></div>
        <div class="mt-12 grid gap-6 md:grid-cols-3"><ProjectCard v-for="(project, i) in featuredProjects" :key="project.slug" :project="project" class="reveal-scale" :data-reveal-delay="i * 110"/></div>
        <div v-if="testimonials.length" class="reveal mt-14 border-t pt-12"><p class="kicker text-center">{{ t.testimonialsKicker }}</p><TestimonialCarousel class="mt-7" :items="testimonials"/></div>
      </div>
    </section>

    <!-- 8. Objections et réservation — dernière étape du parcours : les objections se lèvent
         à gauche, la réservation est mise en avant à droite dans un panneau surélevé. -->
    <section class="section-pad bg-[var(--surface)]">
      <div class="container-shell">
        <div class="mx-auto max-w-2xl text-center">
          <p class="kicker">{{ t.faqKicker }}</p>
          <h2 class="mt-4 text-3xl font-bold leading-[1.12] tracking-[-.03em] sm:text-4xl">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></h2>
          <p class="mt-4 text-base leading-7 text-[var(--muted)]">{{ t.bookingDescription }}</p>
        </div>
        <div class="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div class="reveal-left"><FaqAccordion :items="faqs"/></div>
          <div id="reservation" class="booking-panel reveal-right scroll-mt-24">
            <p class="kicker">{{ t.bookingKicker }}</p>
            <h3 class="mt-3 text-2xl font-bold leading-snug">{{ t.bookingTitle }}</h3>
            <p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ t.bookingText }}</p>
            <BookingWidget class="mt-6"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Bell, Bot, Check, Clapperboard, Code2, Database, MessageCircle, MousePointerClick, Rocket, ShoppingCart, Target, TimerOff, TrendingUp, UserRoundX, Waypoints, Workflow } from 'lucide-vue-next'
import type { ComponentPublicInstance } from 'vue'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { demoProjects, demoTestimonials } from '~/shared/demo'
import { hasCompleteProjectEnglish } from '~/shared/english-content'
import type { PublicProject, PublicTestimonial } from '~/shared/types'

const { locale } = useI18n()
const localePath = useLocalePath()
const { openCalendly } = useCalendly()
const { whatsappUrl, hasWhatsapp } = useWhatsapp()
const revealRoot = useScrollReveal()
// Parallax au scroll des halos de la bande "méthode" (inerte si prefers-reduced-motion).
const methodSectionEl = useScrollParallax()
// Parallax souris de la section cas d'usage : alimente les orbes de l'aurora (--px/--py).
const useCasesSectionEl = useParallax(12)
// Tilt 3D délégué : les trois cartes de cas d'usage s'inclinent sous le curseur.
const useCasesGridEl = useTiltGroup()
// Les CTA marqués .magnetic suivent légèrement le pointeur qui s'en approche. Amplitude
// volontairement faible : au-delà, le bouton se dérobe sous le curseur au lieu d'attirer.
useMagnetic(0.14, 70)
// Lueur qui suit le curseur sur les cartes marquées .spotlight.
useSpotlight()

// Révélation séquencée du bloc texte hero à l'arrivée (one-shot, cf. brief J2 Hero).
type ComponentWithEl = { $el?: unknown }
const heroKickerEl = ref<HTMLElement | null>(null)
const heroTitleEl = ref<HTMLElement | null>(null)
const heroDescEl = ref<HTMLElement | null>(null)
const heroCtaBtnEl = ref<HTMLElement | null>(null)
const heroCtaLinkEl = ref<ComponentWithEl | null>(null)
const heroAuditNoteEl = ref<HTMLElement | null>(null)
const heroReducedMotion = useReducedMotion()

function toEl(node: HTMLElement | ComponentWithEl | null): HTMLElement | null {
  if (!node) return null
  if (node instanceof HTMLElement) return node
  return node.$el instanceof HTMLElement ? node.$el : null
}

onMounted(() => {
  if (!import.meta.client) return
  const kicker = toEl(heroKickerEl.value)
  const title = toEl(heroTitleEl.value)
  const desc = toEl(heroDescEl.value)
  const ctaBtn = toEl(heroCtaBtnEl.value)
  const ctaLink = toEl(heroCtaLinkEl.value)
  const auditNote = toEl(heroAuditNoteEl.value)
  const targets = [kicker, title, desc, ctaBtn, ctaLink, auditNote].filter((el): el is HTMLElement => !!el)
  if (!targets.length) return

  const accent = title?.querySelector<HTMLElement>('.text-gradient-flow') ?? null

  if (heroReducedMotion.value) {
    gsap.set(targets, { opacity: 1, y: 0 })
    if (accent) gsap.set(accent, { opacity: 1, y: 0 })
    return
  }

  gsap.registerPlugin(CustomEase)
  // Même courbe que `.reveal` dans main.css : cubic-bezier(.22,1,.36,1)
  const ease = CustomEase.create('novatrixHeroReveal', '0.22,1,0.36,1')

  gsap.set(kicker, { opacity: 0, y: 10 })
  gsap.set(title, { opacity: 0, y: 16 })
  gsap.set(desc, { opacity: 0, y: 16 })
  gsap.set(ctaBtn, { opacity: 0, y: 16 })
  gsap.set(ctaLink, { opacity: 0, y: 16 })
  gsap.set(auditNote, { opacity: 0 })
  if (accent) gsap.set(accent, { opacity: 0, y: 16 })

  const tl = gsap.timeline()
  if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.45, ease }, 0)
  if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.6, ease }, 0.13)
  if (accent) tl.to(accent, { opacity: 1, y: 0, duration: 0.6, ease }, 0.26)
  if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.55, ease }, 0.48)
  if (ctaBtn) tl.to(ctaBtn, { opacity: 1, y: 0, duration: 0.45, ease }, 0.65)
  if (ctaLink) tl.to(ctaLink, { opacity: 1, y: 0, duration: 0.45, ease }, 0.73)
  if (auditNote) tl.to(auditNote, { opacity: 1, duration: 0.4, ease }, 0.85)
})

// Section "Problèmes reconnus" : ligne de progression + 3 nœuds, activés par paliers au
// scroll normal (IntersectionObserver, remplace l'ancien ScrollTrigger scrub qui figeait le
// molette/trackpad — cf. diagnostic performance). --progress est écrit par palier (0, .5, 1)
// sur .problems-track ; la ligne consomme cette variable en CSS (scaleX desktop / scaleY
// mobile) avec une transition CSS douce pour garder la fluidité visuelle du remplissage.
// Positionnement des nœuds/cartes en CSS Grid pur (cf. main.css), pas de mesure DOM ici.
const problemsSectionEl = ref<HTMLElement | null>(null)
const problemsTrackEl = ref<HTMLElement | null>(null)
const problemNodeRefs = ref<(HTMLElement | null)[]>([null, null, null])
const problemCardRefs = ref<(HTMLElement | null)[]>([null, null, null])
const problemsReducedMotion = useReducedMotion()

function setProblemNodeRef(el: Element | ComponentPublicInstance | null, index: number) {
  problemNodeRefs.value[index] = el instanceof HTMLElement ? el : null
}
function setProblemCardRef(el: Element | ComponentPublicInstance | null, index: number) {
  problemCardRefs.value[index] = el instanceof HTMLElement ? el : null
}

let problemsObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!import.meta.client) return
  const section = problemsSectionEl.value
  const track = problemsTrackEl.value
  const nodes = problemNodeRefs.value
  const cards = problemCardRefs.value
  if (!section || !track || nodes.some(el => !el) || cards.some(el => !el)) return
  const nodeEls = nodes as HTMLElement[]
  const cardEls = cards as HTMLElement[]

  const activateUpTo = (index: number) => {
    track.style.setProperty('--progress', String((index + 1) / nodeEls.length))
    nodeEls.forEach((el, i) => el.classList.toggle('is-active', i <= index))
    cardEls.forEach((el, i) => el.classList.toggle('is-active', i <= index))
  }

  if (problemsReducedMotion.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    track.style.setProperty('--progress', '1')
    nodeEls.forEach(el => el.classList.add('is-active'))
    cardEls.forEach(el => el.classList.add('is-active'))
    return
  }

  problemsObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const index = cardEls.indexOf(entry.target as HTMLElement)
      if (index === -1) continue
      activateUpTo(index)
      problemsObserver?.unobserve(entry.target)
    }
  }, { threshold: 0.5, rootMargin: '0px 0px -10% 0px' })

  cardEls.forEach(el => problemsObserver!.observe(el))
})

onBeforeUnmount(() => {
  problemsObserver?.disconnect()
  problemsObserver = null
})

// Section "Offre locomotive" (système d'acquisition) : liste verticale simple des 5 étapes,
// jamais de blocage de défilement (le pin desktop qui figeait 3.5 hauteurs d'écran a été
// retiré — cf. diagnostic performance). Desktop et mobile partagent désormais la même logique :
// chaque étape/nœud s'active à son tour au scroll normal via IntersectionObserver, comme le
// faisait déjà la version mobile avant migration.
const acquisitionSectionEl = ref<HTMLElement | null>(null)
const acquisitionTrackEl = ref<HTMLElement | null>(null)
const acquisitionNodeRefs = ref<(HTMLElement | null)[]>([null, null, null, null, null])
const acquisitionStepRefs = ref<(HTMLElement | null)[]>([null, null, null, null, null])
const acquisitionReducedMotion = useReducedMotion()
const acquisitionIcons = [Target, MousePointerClick, Database, Bell, TrendingUp]

function setAcquisitionNodeRef(el: Element | ComponentPublicInstance | null, index: number) {
  acquisitionNodeRefs.value[index] = el instanceof HTMLElement ? el : null
}
function setAcquisitionStepRef(el: Element | ComponentPublicInstance | null, index: number) {
  acquisitionStepRefs.value[index] = el instanceof HTMLElement ? el : null
}

let acquisitionObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!import.meta.client) return
  const section = acquisitionSectionEl.value
  const track = acquisitionTrackEl.value
  const nodes = acquisitionNodeRefs.value
  const steps = acquisitionStepRefs.value
  if (!section || !track || nodes.some(el => !el) || steps.some(el => !el)) return
  const nodeEls = nodes as HTMLElement[]
  const stepEls = steps as HTMLElement[]

  const activateUpTo = (index: number) => {
    track.style.setProperty('--progress', String((index + 1) / nodeEls.length))
    nodeEls.forEach((el, i) => el.classList.toggle('is-active', i <= index))
    stepEls.forEach((el, i) => el.classList.toggle('is-active', i <= index))
  }

  if (acquisitionReducedMotion.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    track.style.setProperty('--progress', '1')
    nodeEls.forEach(el => el.classList.add('is-active'))
    stepEls.forEach(el => el.classList.add('is-active'))
    return
  }

  acquisitionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const index = stepEls.indexOf(entry.target as HTMLElement)
      if (index === -1) continue
      activateUpTo(index)
      acquisitionObserver?.unobserve(entry.target)
    }
  }, { threshold: 0.5, rootMargin: '0px 0px -10% 0px' })

  stepEls.forEach(el => acquisitionObserver!.observe(el))
})

onBeforeUnmount(() => {
  acquisitionObserver?.disconnect()
  acquisitionObserver = null
})

const { data: projectsData } = await useFetch<{ items: PublicProject[] }>('/api/projects', { default: () => ({ items: demoProjects }) })
const { data: testimonialsData } = await useFetch<{ items: PublicTestimonial[] }>('/api/testimonials', { default: () => ({ items: demoTestimonials }) })
const featuredProjects = computed(() => {
  const source = projectsData.value?.items?.length ? projectsData.value.items : demoProjects
  const items = locale.value === 'en' ? source.filter(hasCompleteProjectEnglish) : source
  return (items.some(project => project.featured) ? items.filter(project => project.featured) : items).slice(0, 3)
})
const testimonials = computed(() => testimonialsData.value?.items?.length ? testimonialsData.value.items : demoTestimonials)
// Compteurs de la bande de preuve : volumes réels publiés, jamais de chiffre inventé.
const projectsCount = computed(() => projectsData.value?.items?.length || demoProjects.length)
const testimonialsCount = computed(() => testimonialsData.value?.items?.length || demoTestimonials.length)

const seo = computed(() => locale.value === 'en' ? {
  title: 'Turn more prospects into booked meetings', description: 'NovatrixAI connects acquisition, CRM and follow-up so prospects stop leaking between your tools. Explore the system and book a free audit.',
} : {
  title: 'Transformez plus de prospects en rendez-vous', description: 'NovatrixAI relie acquisition, CRM et relances pour éviter que vos prospects se perdent entre vos outils. Réservez un audit gratuit.',
})
usePageSeo(() => seo.value.title, () => seo.value.description)

const t = computed(() => locale.value === 'en' ? {
  heroKicker: 'connected acquisition system', heroTitle: 'Turn more of your prospects into meetings, <span class="text-gradient-flow">without losing them between your tools.</span>', heroDescription: 'We connect campaigns, conversion pages, CRM and follow-up into one sales system, with defined next steps and ownership.', seeProof: 'See delivered work', auditNote: 'The audit identifies the first break in your journey. No commitment and no tool imposed.', contactUs: 'Contact us directly', whatsappUs: 'Or message us on WhatsApp',
  problemsKicker: 'where sales stall', problemsTitle1: 'Your leads are there.', problemsTitle2: 'The handoffs fail.', problemsDescription: 'The loss often happens after the click: between a form, a message, a spreadsheet and the next follow-up.',
  acquisitionKicker: 'flagship solution', acquisitionTitle1: 'One acquisition system,', acquisitionTitle2: 'from attention to sales.', acquisitionDescription: 'We connect the five links that move a prospect forward. The scope adapts to what already exists and what is actually broken.', viewAcquisition: 'Explore the acquisition system',
  useCasesKicker: 'start from a concrete leak', useCasesTitle1: 'A use case your team', useCasesTitle2: 'recognizes immediately.', useCasesDescription: 'Each use case solves a visible break and can connect to the complete acquisition system.', allUseCases: 'All use cases', discover: 'See the use case',
  secondaryKicker: 'four more connected systems', secondaryTitle1: 'Pilot operations, grow, retain', secondaryTitle2: 'or produce video content.', secondaryDescription: 'When the bottleneck is no longer acquisition, we connect the systems that run behind the sale.',
  methodKicker: 'a controlled path', methodTitle1: 'Understand first.', methodTitle2: 'Connect what matters.', methodDescription: 'Every phase has a decision, an explicit scope and a usable output.',
  videoKicker: 'produced in-house', videoTitle1: 'Video content generated', videoTitle2: 'by AI, shot by no one.', videoDescription: 'Every sequence below was produced without a camera, a set or a crew. The same pipeline can carry your ads and your spokesperson videos.', videoCta: 'See the Video Lab', scrollCue: 'Scroll',
  proofKicker: 'delivered, not invented', proofTitle1: 'Systems that have already', proofTitle2: 'run in real conditions.', proofDescription: 'The evidence below comes from published project records and client feedback available on the site.', allProof: 'All case studies', testimonialsKicker: 'client feedback',
  faqKicker: 'before you book', faqTitle1: 'Clear answers, then', faqTitle2: 'a useful audit.', bookingDescription: 'Check the main objections, then choose a slot directly here.', bookingKicker: 'book inside the site', bookingTitle: 'Choose your free audit slot.', bookingText: 'The calendar opens directly below. If it is unavailable, the local contact form takes over.',
} : {
  heroKicker: 'système d’acquisition connecté', heroTitle: 'Transformez plus de vos prospects en rendez-vous, <span class="text-gradient-flow">sans les perdre entre vos outils.</span>', heroDescription: 'On relie campagnes, pages de conversion, CRM et relances dans un seul système commercial, avec des prochaines étapes et responsabilités définies.', seeProof: 'Voir les réalisations', auditNote: 'L’audit identifie la première rupture de votre parcours. Sans engagement et sans outil imposé.', contactUs: 'Nous contacter directement', whatsappUs: 'Ou écrivez-nous sur WhatsApp',
  problemsKicker: 'là où les ventes se bloquent', problemsTitle1: 'Vos leads sont là.', problemsTitle2: 'Les passages de relais cassent.', problemsDescription: 'La perte arrive souvent après le clic : entre un formulaire, un message, un tableur et la prochaine relance.',
  acquisitionKicker: 'solution locomotive', acquisitionTitle1: 'Un système d’acquisition,', acquisitionTitle2: 'de l’attention à la vente.', acquisitionDescription: 'On relie les cinq maillons qui font avancer un prospect. Le périmètre s’adapte à l’existant et à ce qui bloque réellement.', viewAcquisition: 'Découvrir le système d’acquisition',
  useCasesKicker: 'partir d’une fuite concrète', useCasesTitle1: 'Un cas d’usage que votre équipe', useCasesTitle2: 'reconnaît tout de suite.', useCasesDescription: 'Chaque cas règle une rupture visible et peut se connecter au système d’acquisition complet.', allUseCases: 'Tous les cas d’usage', discover: 'Voir le cas d’usage',
  secondaryKicker: 'quatre autres systèmes connectés', secondaryTitle1: 'Piloter les opérations, grandir, fidéliser', secondaryTitle2: 'ou produire du contenu vidéo.', secondaryDescription: 'Quand le blocage n’est plus l’acquisition, on relie les systèmes qui tournent derrière la vente.',
  methodKicker: 'un parcours maîtrisé', methodTitle1: 'Comprendre d’abord.', methodTitle2: 'Relier ce qui compte.', methodDescription: 'Chaque phase produit une décision, un périmètre explicite et un livrable utilisable.',
  videoKicker: 'produit en interne', videoTitle1: 'Du contenu vidéo généré', videoTitle2: 'par IA, tourné par personne.', videoDescription: 'Chaque séquence ci-dessous a été produite sans caméra, sans décor et sans équipe. La même chaîne peut porter vos publicités et vos vidéos de porte-parole.', videoCta: 'Voir le Vidéo Lab', scrollCue: 'Défiler',
  proofKicker: 'livré, pas inventé', proofTitle1: 'Des systèmes déjà', proofTitle2: 'mis en situation réelle.', proofDescription: 'Les preuves ci-dessous viennent des fiches projets publiées et des retours clients disponibles sur le site.', allProof: 'Toutes les réalisations', testimonialsKicker: 'retours clients',
  faqKicker: 'avant de réserver', faqTitle1: 'Des réponses claires, puis', faqTitle2: 'un audit utile.', bookingDescription: 'Vérifiez les principales objections, puis choisissez votre créneau directement ici.', bookingKicker: 'réservation sur le site', bookingTitle: 'Choisissez votre créneau d’audit gratuit.', bookingText: 'Le calendrier s’ouvre directement ci-dessous. S’il est indisponible, le formulaire local prend le relais.',
})

const problems = computed(() => locale.value === 'en' ? [
  { icon: UserRoundX, title: 'A lead arrives with no immediate owner', text: 'The form is submitted, but the next action depends on someone noticing it in another tool.' },
  { icon: TimerOff, title: 'Follow-up starts after intent has cooled', text: 'The prospect waits while your team searches for context or re-enters their information.' },
  { icon: Waypoints, title: 'The break stays invisible', text: 'Campaign, CRM and sales each show part of the journey, but no one sees the whole handoff.' },
] : [
  { icon: UserRoundX, title: 'Un lead arrive sans prise en charge immédiate', text: 'Le formulaire est rempli, mais la prochaine action dépend de quelqu’un qui le remarque dans un autre outil.' },
  { icon: TimerOff, title: 'La relance commence quand l’intention a refroidi', text: 'Le prospect attend pendant que l’équipe cherche le contexte ou ressaisit ses informations.' },
  { icon: Waypoints, title: 'La rupture reste invisible', text: 'Campagne, CRM et vente montrent chacun une partie du parcours, sans rendre le passage de relais lisible.' },
])
const acquisitionChain = computed(() => locale.value === 'en' ? [
  { title: 'Attract', text: 'Put the right message in front of the right prospect.' }, { title: 'Convert', text: 'Give each click a clear, relevant next step.' }, { title: 'Centralize', text: 'Keep the lead and its context in one usable place.' }, { title: 'Follow up', text: 'Trigger the right action without waiting for manual re-entry.' }, { title: 'Move forward', text: 'Give sales the context needed for the next conversation.' },
] : [
  { title: 'Attirer', text: 'Placer le bon message devant le bon prospect.' }, { title: 'Convertir', text: 'Donner à chaque clic une prochaine étape claire et pertinente.' }, { title: 'Centraliser', text: 'Garder le lead et son contexte dans un espace exploitable.' }, { title: 'Relancer', text: 'Déclencher la bonne action sans attendre une ressaisie manuelle.' }, { title: 'Faire avancer', text: 'Donner aux commerciaux le contexte utile pour la prochaine conversation.' },
])
const useCases = computed(() => locale.value === 'en' ? [
  { to: '/solutions/agent-whatsapp-ia', icon: MessageCircle, title: 'Qualify conversations on WhatsApp', text: 'Respond, gather context and hand a structured conversation to the right person.' },
  { to: '/solutions/automatisation-n8n', icon: Workflow, title: 'Stop re-entering the same data', text: 'Connect existing tools so information moves once and remains usable.' },
  { to: '/solutions/relance-panier-abandonne', icon: ShoppingCart, title: 'Follow up abandoned carts', text: 'Detect abandonment and trigger a calibrated follow-up on the chosen channel.' },
] : [
  { to: '/solutions/agent-whatsapp-ia', icon: MessageCircle, title: 'Qualifier les échanges WhatsApp', text: 'Répondre, recueillir le contexte et transmettre une conversation structurée à la bonne personne.' },
  { to: '/solutions/automatisation-n8n', icon: Workflow, title: 'Arrêter les ressaisies', text: 'Relier les outils existants pour que l’information circule une fois et reste exploitable.' },
  { to: '/solutions/relance-panier-abandonne', icon: ShoppingCart, title: 'Relancer les paniers abandonnés', text: 'Détecter l’abandon et déclencher une relance calibrée sur le canal choisi.' },
])
// Détail du cas d'usage mis en avant : reprend ce que fait réellement l'agent WhatsApp
// (cf. /solutions/agent-whatsapp-ia), sans promesse de résultat chiffré.
const leadUseCasePoints = computed(() => locale.value === 'en' ? [
  'Answers immediately, even outside office hours',
  'Collects the context before the sales conversation',
  'Hands over a structured thread to the right person',
] : [
  'Répond tout de suite, même hors horaires de bureau',
  'Recueille le contexte avant l’échange commercial',
  'Transmet un fil structuré à la bonne personne',
])
const secondaryOffers = computed(() => locale.value === 'en' ? [
  { tag: '2', title: 'AI Piloting Agents', description: 'Connect repetitive operational work to controlled AI agents on WhatsApp or Telegram, with validation rules for sensitive actions.', result: 'a controlled operating system', features: ['Tasks mapped before automation', 'Connections to existing tools', 'Human validation where needed'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: '3', title: 'Novatrix Launch', description: 'A staged support program (Start, Growth, Scale) that adapts to where your system stands today.', result: 'a progressive path to a scaled system', features: ['Start: first system live', 'Growth: follow-up and CRM connected', 'Scale: channels expanded'], to: '/offres/novatrix-launch', icon: Rocket },
  { tag: '4', title: 'E-commerce Retention & Conversion', description: 'Email/SMS abandoned-cart recovery, segmentation and AI CRM built to bring customers back.', result: 'more recovered carts, customers who return', features: ['Abandoned-cart detection and recovery', 'Email and SMS sequences', 'Behavior-based segmentation'], to: '/offres/retention-ecommerce', icon: ShoppingCart },
  { tag: '5', title: 'AI Creative & Video Content', description: 'AI avatar UGC, multilingual dubbing, automatic cutdown and performance prediction.', result: 'video content at a steady pace', features: ['AI avatar UGC', 'Multilingual dubbing', 'Automatic cutdown'], to: '/video-lab', icon: Clapperboard },
] : [
  { tag: '2', title: 'Agents IA de pilotage interne', description: 'Relier le travail opérationnel répétitif à des agents IA contrôlés sur WhatsApp ou Telegram, avec des règles de validation pour les actions sensibles.', result: 'un système d’opérations maîtrisé', features: ['Tâches cartographiées avant automatisation', 'Connexion aux outils existants', 'Validation humaine quand elle compte'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: '3', title: 'Novatrix Launch', description: 'Un accompagnement progressif (Start, Growth, Scale) qui s’adapte à l’état actuel de votre système.', result: 'un parcours progressif vers un système à l’échelle', features: ['Start : premier système opérationnel', 'Growth : relances et CRM connectés', 'Scale : canaux étendus'], to: '/offres/novatrix-launch', icon: Rocket },
  { tag: '4', title: 'Rétention & conversion e-commerce', description: 'Relance email/SMS des paniers abandonnés, segmentation et CRM IA pensés pour faire revenir vos clients.', result: 'plus de paniers récupérés, des clients qui reviennent', features: ['Détection et relance des paniers abandonnés', 'Séquences email et SMS', 'Segmentation comportementale'], to: '/offres/retention-ecommerce', icon: ShoppingCart },
  { tag: '5', title: 'Créatifs & contenu vidéo IA', description: 'UGC IA avatar, doublage multilingue, découpage automatique et prédiction de performance.', result: 'du contenu vidéo à un rythme régulier', features: ['UGC IA avatar', 'Doublage multilingue', 'Découpage automatique'], to: '/video-lab', icon: Clapperboard },
])
const method = computed(() => locale.value === 'en' ? [
  { step: '01', title: 'Audit', text: 'Map the journey, existing tools and first commercial break.' }, { step: '02', title: 'Design', text: 'Define the target flow, responsibilities and useful signals.' }, { step: '03', title: 'Connect and test', text: 'Build the links and validate them with real scenarios.' }, { step: '04', title: 'Operate', text: 'Observe what happens and prioritize the next improvement.' },
] : [
  { step: '01', title: 'Auditer', text: 'Cartographier le parcours, les outils existants et la première rupture commerciale.' }, { step: '02', title: 'Concevoir', text: 'Définir le flux cible, les responsabilités et les signaux utiles.' }, { step: '03', title: 'Relier et tester', text: 'Construire les connexions et les valider avec des scénarios réels.' }, { step: '04', title: 'Piloter', text: 'Observer ce qui se passe et prioriser la prochaine amélioration.' },
])
const faqs = computed(() => locale.value === 'en' ? [
  { question: 'Do we need to replace our current tools?', answer: 'Not by default. The audit starts by identifying what already works. We replace or add only what is needed to repair the journey.' },
  { question: 'Can we start with one use case?', answer: 'Yes. A bounded use case can be the first useful link, provided it connects cleanly to the rest of your process.' },
  { question: 'What happens during the free audit?', answer: 'We map the current journey, identify the first visible break and agree on the next useful decision. The audit does not commit you to a project.' },
  { question: 'Can you work with a remote team?', answer: 'Yes. NovatrixAI is based in Cotonou and can run discovery, reviews and delivery remotely.' },
] : [
  { question: 'Faut-il remplacer nos outils actuels ?', answer: 'Pas par défaut. L’audit commence par identifier ce qui fonctionne déjà. On ne remplace ou n’ajoute que ce qui est utile pour réparer le parcours.' },
  { question: 'Peut-on commencer par un seul cas d’usage ?', answer: 'Oui. Un cas délimité peut être le premier maillon utile, à condition de le connecter proprement au reste de votre processus.' },
  { question: 'Que se passe-t-il pendant l’audit gratuit ?', answer: 'On cartographie le parcours actuel, on identifie la première rupture visible et on convient de la prochaine décision utile. L’échange ne vous engage pas sur un projet.' },
  { question: 'Pouvez-vous travailler avec une équipe à distance ?', answer: 'Oui. NovatrixAI est basée à Cotonou et peut mener cadrage, validations et livraison à distance.' },
])
</script>
