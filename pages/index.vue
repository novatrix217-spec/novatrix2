<template>
  <div ref="revealRoot">
    <!-- 1. Promesse et action principale -->
    <section class="hero-rich relative overflow-hidden pt-24 text-white">
      <div class="container-shell grid min-h-[620px] items-center gap-8 py-14 sm:min-h-[680px] lg:grid-cols-[1.12fr_.88fr] lg:py-20">
        <div class="relative z-10">
          <p ref="heroKickerEl" class="kicker !text-[#3DE0C5]">{{ t.heroKicker }}</p>
          <h1 ref="heroTitleEl" class="mt-5 max-w-4xl text-[2.65rem] font-bold leading-[1.04] tracking-[-.045em] sm:text-6xl xl:text-7xl" v-html="t.heroTitle"/>
          <p ref="heroDescEl" class="mt-6 max-w-2xl text-lg leading-8 text-white/75">{{ t.heroDescription }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button ref="heroCtaBtnEl" type="button" class="btn-primary !px-7 !py-4" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
            <NuxtLink ref="heroCtaLinkEl" :to="localePath('/realisations')" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">{{ t.seeProof }}</NuxtLink>
          </div>
          <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a href="#reservation" class="inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">{{ t.contactUs }} <ArrowRight class="h-3.5 w-3.5"/></a>
            <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"><SvgWhatsappSVG class="h-4 w-4 shrink-0"/>{{ t.whatsappUs }}</a>
          </div>
          <p ref="heroAuditNoteEl" class="mt-5 max-w-xl text-xs leading-5 text-white/55">{{ t.auditNote }}</p>
        </div>
        <HeroFlowViz class="mt-6 lg:mt-0 lg:h-[480px]" />
      </div>
    </section>

    <!-- 2. Problèmes reconnus -->
    <section ref="problemsSectionEl" class="section-pad">
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
            class="card problems-card"
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
    <section class="section-pad">
      <div class="container-shell">
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading :kicker="t.useCasesKicker" :description="t.useCasesDescription">{{ t.useCasesTitle1 }} <span class="text-gradient">{{ t.useCasesTitle2 }}</span></SectionHeading><NuxtLink :to="localePath('/solutions')" class="btn-secondary">{{ t.allUseCases }} <ArrowRight class="h-4 w-4"/></NuxtLink></div>
        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <NuxtLink v-for="item in useCases" :key="item.to" :to="localePath(item.to)" class="card card-hover flex flex-col">
            <component :is="item.icon" class="h-7 w-7 text-violet-700"/><h2 class="mt-5 text-xl font-bold">{{ item.title }}</h2><p class="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p><span class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-700">{{ t.discover }} <ArrowRight class="h-4 w-4"/></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5. Systèmes secondaires -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <SectionHeading :kicker="t.secondaryKicker" center :description="t.secondaryDescription">{{ t.secondaryTitle1 }} <span class="text-gradient">{{ t.secondaryTitle2 }}</span></SectionHeading>
        <div class="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2"><OfferCard v-for="offer in secondaryOffers" :key="offer.tag" v-bind="offer"/></div>
      </div>
    </section>

    <!-- 6. Méthode -->
    <section class="section-pad">
      <div class="container-shell">
        <SectionHeading :kicker="t.methodKicker" center :description="t.methodDescription">{{ t.methodTitle1 }} <span class="text-gradient">{{ t.methodTitle2 }}</span></SectionHeading>
        <ol class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><li v-for="item in method" :key="item.step" class="card"><span class="font-mono text-xs font-bold text-violet-700">{{ item.step }}</span><h2 class="mt-4 text-lg font-bold">{{ item.title }}</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p></li></ol>
      </div>
    </section>

    <!-- 7. Preuves concentrées -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading :kicker="t.proofKicker" :description="t.proofDescription">{{ t.proofTitle1 }} <span class="text-gradient">{{ t.proofTitle2 }}</span></SectionHeading><NuxtLink :to="localePath('/realisations')" class="btn-secondary">{{ t.allProof }} <ArrowRight class="h-4 w-4"/></NuxtLink></div>
        <div class="mt-12 grid gap-6 md:grid-cols-3"><ProjectCard v-for="project in featuredProjects" :key="project.slug" :project="project"/></div>
        <div v-if="testimonials.length" class="mt-14 border-t pt-12"><p class="kicker text-center">{{ t.testimonialsKicker }}</p><TestimonialWall class="mt-7" :items="testimonials" :limit="3"/></div>
      </div>
    </section>

    <!-- 8. Objections et réservation intégrée -->
    <section class="section-pad">
      <div class="container-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
        <div><SectionHeading :kicker="t.faqKicker" :description="t.bookingDescription">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading><div class="mt-8"><FaqAccordion :items="faqs"/></div></div>
        <div id="reservation" class="scroll-mt-24"><p class="kicker">{{ t.bookingKicker }}</p><h2 class="mt-4 text-3xl font-bold">{{ t.bookingTitle }}</h2><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ t.bookingText }}</p><BookingWidget class="mt-6"/></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Bell, Bot, Clapperboard, Code2, Database, MessageCircle, MousePointerClick, Rocket, ShoppingCart, Target, TimerOff, TrendingUp, UserRoundX, Waypoints, Workflow } from 'lucide-vue-next'
import type { ComponentPublicInstance } from 'vue'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { demoProjects, demoTestimonials } from '~/shared/demo'
import { hasCompleteProjectEnglish } from '~/shared/english-content'
import type { PublicProject, PublicTestimonial } from '~/shared/types'

const { locale } = useI18n()
const localePath = useLocalePath()
const { openCalendly } = useCalendly()
const { whatsappUrl } = useWhatsapp()
const revealRoot = useScrollReveal()

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
const testimonials = computed(() => (testimonialsData.value?.items?.length ? testimonialsData.value.items : demoTestimonials).slice(0, 3))

const seo = computed(() => locale.value === 'en' ? {
  title: 'Turn more prospects into booked meetings', description: 'NovatrixAI connects acquisition, CRM and follow-up so prospects stop leaking between your tools. Explore the system and book a free audit.',
} : {
  title: 'Transformez plus de prospects en rendez-vous', description: 'NovatrixAI relie acquisition, CRM et relances pour éviter que vos prospects se perdent entre vos outils. Découvrez le système et réservez un audit gratuit.',
})
useSeoMeta({ title: () => seo.value.title, description: () => seo.value.description })

const t = computed(() => locale.value === 'en' ? {
  heroKicker: 'connected acquisition system', heroTitle: 'Turn more of your prospects into meetings — <span class="text-gradient-flow">without losing them between your tools.</span>', heroDescription: 'We connect campaigns, conversion pages, CRM and follow-up into one sales system, with defined next steps and ownership.', seeProof: 'See delivered work', auditNote: 'The audit identifies the first break in your journey. No commitment and no tool imposed.', contactUs: 'Contact us directly', whatsappUs: 'Or message us on WhatsApp',
  problemsKicker: 'where sales stall', problemsTitle1: 'Your leads are there.', problemsTitle2: 'The handoffs fail.', problemsDescription: 'The loss often happens after the click: between a form, a message, a spreadsheet and the next follow-up.',
  acquisitionKicker: 'flagship solution', acquisitionTitle1: 'One acquisition system,', acquisitionTitle2: 'from attention to sales.', acquisitionDescription: 'We connect the five links that move a prospect forward. The scope adapts to what already exists and what is actually broken.', viewAcquisition: 'Explore the acquisition system',
  useCasesKicker: 'start from a concrete leak', useCasesTitle1: 'A use case your team', useCasesTitle2: 'recognizes immediately.', useCasesDescription: 'Each use case solves a visible break and can connect to the complete acquisition system.', allUseCases: 'All use cases', discover: 'See the use case',
  secondaryKicker: 'four more connected systems', secondaryTitle1: 'Pilot operations, grow, retain', secondaryTitle2: 'or produce video content.', secondaryDescription: 'When the bottleneck is no longer acquisition, we connect the systems that run behind the sale.',
  methodKicker: 'a controlled path', methodTitle1: 'Understand first.', methodTitle2: 'Connect what matters.', methodDescription: 'Every phase has a decision, an explicit scope and a usable output.',
  proofKicker: 'delivered, not invented', proofTitle1: 'Systems that have already', proofTitle2: 'run in real conditions.', proofDescription: 'The evidence below comes from published project records and client feedback available on the site.', allProof: 'All case studies', testimonialsKicker: 'client feedback',
  faqKicker: 'before you book', faqTitle1: 'Clear answers, then', faqTitle2: 'a useful audit.', bookingDescription: 'Check the main objections, then choose a slot directly here.', bookingKicker: 'book inside the site', bookingTitle: 'Choose your free audit slot.', bookingText: 'The calendar loads only after you choose to display the slots. If it is unavailable, the local contact form takes over.',
} : {
  heroKicker: 'système d’acquisition connecté', heroTitle: 'Transformez plus de vos prospects en rendez-vous — <span class="text-gradient-flow">sans les perdre entre vos outils.</span>', heroDescription: 'On relie campagnes, pages de conversion, CRM et relances dans un seul système commercial, avec des prochaines étapes et responsabilités définies.', seeProof: 'Voir les réalisations', auditNote: 'L’audit identifie la première rupture de votre parcours. Sans engagement et sans outil imposé.', contactUs: 'Nous contacter directement', whatsappUs: 'Ou écrivez-nous sur WhatsApp',
  problemsKicker: 'là où les ventes se bloquent', problemsTitle1: 'Vos leads sont là.', problemsTitle2: 'Les passages de relais cassent.', problemsDescription: 'La perte arrive souvent après le clic : entre un formulaire, un message, un tableur et la prochaine relance.',
  acquisitionKicker: 'solution locomotive', acquisitionTitle1: 'Un système d’acquisition,', acquisitionTitle2: 'de l’attention à la vente.', acquisitionDescription: 'On relie les cinq maillons qui font avancer un prospect. Le périmètre s’adapte à l’existant et à ce qui bloque réellement.', viewAcquisition: 'Découvrir le système d’acquisition',
  useCasesKicker: 'partir d’une fuite concrète', useCasesTitle1: 'Un cas d’usage que votre équipe', useCasesTitle2: 'reconnaît tout de suite.', useCasesDescription: 'Chaque cas règle une rupture visible et peut se connecter au système d’acquisition complet.', allUseCases: 'Tous les cas d’usage', discover: 'Voir le cas d’usage',
  secondaryKicker: 'quatre autres systèmes connectés', secondaryTitle1: 'Piloter les opérations, grandir, fidéliser', secondaryTitle2: 'ou produire du contenu vidéo.', secondaryDescription: 'Quand le blocage n’est plus l’acquisition, on relie les systèmes qui tournent derrière la vente.',
  methodKicker: 'un parcours maîtrisé', methodTitle1: 'Comprendre d’abord.', methodTitle2: 'Relier ce qui compte.', methodDescription: 'Chaque phase produit une décision, un périmètre explicite et un livrable utilisable.',
  proofKicker: 'livré, pas inventé', proofTitle1: 'Des systèmes déjà', proofTitle2: 'mis en situation réelle.', proofDescription: 'Les preuves ci-dessous viennent des fiches projets publiées et des retours clients disponibles sur le site.', allProof: 'Toutes les réalisations', testimonialsKicker: 'retours clients',
  faqKicker: 'avant de réserver', faqTitle1: 'Des réponses claires, puis', faqTitle2: 'un audit utile.', bookingDescription: 'Vérifiez les principales objections, puis choisissez votre créneau directement ici.', bookingKicker: 'réservation sur le site', bookingTitle: 'Choisissez votre créneau d’audit gratuit.', bookingText: 'Le calendrier ne charge qu’après votre choix d’afficher les créneaux. S’il est indisponible, le formulaire local prend le relais.',
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
const secondaryOffers = computed(() => locale.value === 'en' ? [
  { tag: '2', title: 'AI Piloting Agents', description: 'Connect repetitive operational work to controlled AI agents on WhatsApp or Telegram, with validation rules for sensitive actions.', result: 'a controlled operating system', features: ['Tasks mapped before automation', 'Connections to existing tools', 'Human validation where needed'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: '3', title: 'Novatrix Launch', description: 'A staged support program — Start, Growth, Scale — that adapts to where your system stands today.', result: 'a progressive path to a scaled system', features: ['Start: first system live', 'Growth: follow-up and CRM connected', 'Scale: channels expanded'], to: '/offres/novatrix-launch', icon: Rocket },
  { tag: '4', title: 'E-commerce Retention & Conversion', description: 'Email/SMS abandoned-cart recovery, segmentation and AI CRM built to bring customers back.', result: 'more recovered carts, customers who return', features: ['Abandoned-cart detection and recovery', 'Email and SMS sequences', 'Behavior-based segmentation'], to: '/offres/retention-ecommerce', icon: ShoppingCart },
  { tag: '5', title: 'AI Creative & Video Content', description: 'AI avatar UGC, multilingual dubbing, automatic cutdown and performance prediction.', result: 'video content at a steady pace', features: ['AI avatar UGC', 'Multilingual dubbing', 'Automatic cutdown'], to: '/video-lab', icon: Clapperboard },
] : [
  { tag: '2', title: 'Agents IA de pilotage interne', description: 'Relier le travail opérationnel répétitif à des agents IA contrôlés sur WhatsApp ou Telegram, avec des règles de validation pour les actions sensibles.', result: 'un système d’opérations maîtrisé', features: ['Tâches cartographiées avant automatisation', 'Connexion aux outils existants', 'Validation humaine quand elle compte'], to: '/offres/pilotage-ia', icon: Bot },
  { tag: '3', title: 'Novatrix Launch', description: 'Un accompagnement progressif — Start, Growth, Scale — qui s’adapte à l’état actuel de votre système.', result: 'un parcours progressif vers un système à l’échelle', features: ['Start : premier système opérationnel', 'Growth : relances et CRM connectés', 'Scale : canaux étendus'], to: '/offres/novatrix-launch', icon: Rocket },
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
