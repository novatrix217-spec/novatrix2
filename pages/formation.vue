<template><div ref="revealRoot"><PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/><template #actions><button type="button" class="btn-primary" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button><NuxtLink to="#programme" class="btn-secondary">{{ t.seeProgram }}</NuxtLink></template></PageHero>

  <section id="programme" class="section-pad">
    <div class="container-shell grid gap-12 lg:grid-cols-2">
      <div class="reveal-left"><SectionHeading :kicker="t.programKicker">{{ t.programTitle }}</SectionHeading>
        <ul class="mt-8 space-y-4">
          <li v-for="item in t.program" :key="item" class="flex items-start gap-3"><Check class="mt-0.5 h-5 w-5 shrink-0 text-[var(--teal)]"/><span class="text-base leading-7 text-[var(--muted)]">{{ item }}</span></li>
        </ul>
      </div>
      <div class="reveal-right card glass-sheen !p-8">
        <p class="kicker">// {{ t.detailsKicker }}</p>
        <dl class="mt-6 space-y-5">
          <div class="flex items-center justify-between border-b pb-4"><dt class="text-sm text-[var(--muted)]">{{ t.duration }}</dt><dd class="font-bold">{{ t.durationValue }}</dd></div>
          <div class="flex items-center justify-between border-b pb-4"><dt class="text-sm text-[var(--muted)]">{{ t.format }}</dt><dd class="font-bold">{{ t.formatValue }}</dd></div>
          <div class="flex items-center justify-between border-b pb-4"><dt class="text-sm text-[var(--muted)]">{{ t.prerequisite }}</dt><dd class="font-bold">{{ t.prerequisiteValue }}</dd></div>
          <div class="flex items-center justify-between"><dt class="text-sm text-[var(--muted)]">{{ t.price }}</dt><dd class="font-heading text-2xl font-bold text-violet-700 dark:text-violet-300">{{ t.priceValue }}</dd></div>
        </dl>
        <button type="button" class="btn-primary mt-8 w-full justify-center" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
        <p class="mt-3 text-center text-xs text-[var(--muted)]">{{ t.spotsNote }}</p>
      </div>
    </div>
  </section>

  <section class="section-pad border-y bg-[var(--surface)]">
    <div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.forWhomKicker" center>{{ t.forWhomTitle }}</SectionHeading></div>
      <div class="mt-12 grid gap-5 md:grid-cols-2">
        <div class="card"><Users class="h-6 w-6 text-violet-600"/><h3 class="mt-4 text-lg font-bold">{{ t.forWhomH }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ t.forWhomText }}</p></div>
        <div class="card"><ShieldCheck class="h-6 w-6 text-violet-600"/><h3 class="mt-4 text-lg font-bold">{{ t.prereqH }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ t.prereqText }}</p></div>
      </div>
    </div>
  </section>

  <section class="section-pad">
    <div class="container-shell">
      <div class="card !p-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p class="kicker">// {{ t.notForYouKicker }}</p>
          <h3 class="mt-3 text-xl font-bold">{{ t.notForYouTitle }}</h3>
          <p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ t.notForYouText }}</p>
        </div>
        <NuxtLink :to="localePath('/offres/pilotage-ia')" class="btn-secondary whitespace-nowrap">{{ t.notForYouCta }} <ArrowRight class="h-4 w-4"/></NuxtLink>
      </div>
    </div>
  </section>

  <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div class="reveal-left"><SectionHeading :kicker="t.faqKicker">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading></div><div class="reveal-right"><FaqAccordion :items="faqs"/></div></div></section>

  <section class="section-pad hero-grid grain relative overflow-hidden text-white"><div class="container-shell relative z-10 text-center"><SectionHeading :kicker="t.ctaKicker" dark center>{{ t.ctaTitle }}</SectionHeading><button type="button" class="btn-primary glow-soft mt-8 inline-flex" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button></div></section>
</div></template>
<script setup lang="ts">
import { ArrowRight,Check,ShieldCheck,Users } from 'lucide-vue-next'
const { locale } = useI18n()
const localePath = useLocalePath()
const revealRoot=useScrollReveal()
const { openCalendly } = useCalendly()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Workshop — Explore your first AI automation', description: 'A guided 3-hour session to explore n8n and work toward a first workflow on your use case, depending on the prerequisites and your pace.' }
  : { title: 'Atelier — Explorez votre première automatisation avec l’IA', description: 'Une session guidée de 3h pour explorer n8n et avancer vers un premier workflow sur votre cas, selon les prérequis et votre rythme.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
useHead(() => ({ script: [
  { type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Course', name: locale.value==='en'?'Explore your first AI automation':'Explorez votre première automatisation avec l’IA', description: locale.value==='en'?'Guided workshop to explore n8n and work toward a first workflow according to the participant’s prerequisites and pace.':'Atelier guidé pour explorer n8n et avancer vers un premier workflow selon les prérequis et le rythme du participant.', provider: { '@type': 'Organization', name: 'NovatrixAI', sameAs: site } }) },
] }))
const t = computed(() => locale.value === 'en' ? {
  kicker: 'live workshop', description: 'A guided session to explore n8n on your own use case and progress toward a first workflow, depending on the prerequisites and your pace.',
  heroTitle: 'Explore your first task<br><span class="text-gradient">to automate with AI.</span>',
  cta: 'Book my free audit', seeProgram: 'See the program',
  programKicker: 'what you’ll explore', programTitle: 'A guided path toward a first workflow.',
  program: [
    'The basics of automation: triggers, actions, connections between your tools.',
    'Hands-on tour of n8n, the tool behind it.',
    'Work on a first workflow based on the use case reviewed for the session.',
    'Connect two tools you already use — no code involved.',
    'Identify the next steps needed to test and adapt the workflow to your business.',
  ],
  detailsKicker: 'the essentials', duration: 'Duration', durationValue: '3 hours',
  format: 'Format', formatValue: 'Online, live',
  prerequisite: 'Prerequisite', prerequisiteValue: 'None',
  price: 'Price', priceValue: 'On request',
  spotsNote: 'Format, availability and pricing are confirmed after the free audit.',
  forWhomKicker: 'is this for you', forWhomTitle: 'Built for people who lose time, not developers.',
  forWhomH: 'Who it’s for', forWhomText: 'Entrepreneurs, freelancers and teams who repeat the same manual task every week and want to see, concretely, how AI removes it.',
  prereqH: 'Prerequisites', prereqText: 'None. No coding, no technical background. Just a computer and one repetitive task you want gone.',
  faqKicker: 'before you book', faqTitle1: 'Clear before you', faqTitle2: 'sign up.',
  ctaKicker: 'next step', ctaTitle: 'Check whether this workshop fits your use case.',
  notForYouKicker: 'prefer we handle it?', notForYouTitle: 'The workshop teaches you to do it yourself. Want us to do it for you, across several tasks at once?',
  notForYouText: 'Same logic, in a managed, expanded version: several agents connected to the selected business tools, maintained by us and piloted from WhatsApp — that’s the AI Piloting Agents offer.',
  notForYouCta: 'See the AI Agents offer',
}: {
  kicker: 'atelier en direct', description: 'Une session guidée pour explorer n8n sur votre propre cas et avancer vers un premier workflow, selon les prérequis et votre rythme.',
  heroTitle: 'Explorez votre première tâche<br><span class="text-gradient">à automatiser avec l’IA.</span>',
  cta: 'Réserver mon audit gratuit', seeProgram: 'Voir le programme',
  programKicker: 'ce que vous explorez', programTitle: 'Un parcours guidé vers un premier workflow.',
  program: [
    'Les bases de l’automatisation : déclencheurs, actions, connexions entre vos outils.',
    'Prise en main concrète de n8n, l’outil derrière tout ça.',
    'Travail sur un premier workflow à partir du cas d’usage examiné pour la session.',
    'Connexion de deux outils que vous utilisez déjà — sans une ligne de code.',
    'Identification des prochaines étapes pour tester et adapter le workflow à votre activité.',
  ],
  detailsKicker: 'l’essentiel', duration: 'Durée', durationValue: '3 heures',
  format: 'Format', formatValue: 'En ligne, en direct',
  prerequisite: 'Prérequis', prerequisiteValue: 'Aucun',
  price: 'Tarif', priceValue: 'Sur demande',
  spotsNote: 'Format, disponibilités et tarif sont confirmés après l’audit gratuit.',
  forWhomKicker: 'est-ce pour vous', forWhomTitle: 'Pensé pour ceux qui perdent du temps, pas pour des développeurs.',
  forWhomH: 'Pour qui', forWhomText: 'Entrepreneurs, indépendants et équipes qui répètent chaque semaine la même tâche manuelle, et veulent voir concrètement comment l’IA la supprime.',
  prereqH: 'Prérequis', prereqText: 'Aucun. Pas de code, pas de bagage technique. Juste un ordinateur et une tâche répétitive dont vous voulez vous débarrasser.',
  faqKicker: 'avant de vous inscrire', faqTitle1: 'Tout est clair avant de', faqTitle2: 'vous lancer.',
  ctaKicker: 'prochaine étape', ctaTitle: 'Vérifions si cet atelier correspond à votre cas d’usage.',
  notForYouKicker: 'vous préférez qu’on s’en charge ?', notForYouTitle: 'L’atelier vous apprend à le faire vous-même. Vous préférez qu’on le fasse pour vous, sur plusieurs tâches à la fois ?',
  notForYouText: 'Même logique, en version gérée et étendue : plusieurs agents connectés aux outils métier retenus, maintenus par nous et pilotés depuis WhatsApp — c’est l’offre Agents IA de pilotage.',
  notForYouCta: 'Voir l’offre Agents IA',
})
const faqs = computed(() => locale.value === 'en' ? [
  { question: 'Do I need any technical background?', answer: 'No. The workshop is built for non-developers. If you can use a browser, you can follow along.' },
  { question: 'Is the session recorded if I can’t attend live?', answer: 'The focus is hands-on practice on your own case, so it’s designed to be live. Ask us directly if a replay could work for your situation.' },
  { question: 'What if I don’t have a clear use case yet?', answer: 'That’s normal and fine — part of the session helps you spot the task worth automating first.' },
  { question: 'How do I pay?', answer: 'Payment terms are confirmed directly with us after the free audit; no online payment is collected on this page.' },
  { question: 'Does this workshop replace the AI Piloting Agents offer?', answer: 'No. The workshop teaches you to build one simple automation yourself. The AI Piloting Agents offer scopes, installs and maintains several controlled workflows connected to selected business tools and piloted from WhatsApp.' },
]: [
  { question: 'Faut-il un bagage technique ?', answer: 'Non. L’atelier est pensé pour des non-développeurs. Si vous savez utiliser un navigateur, vous pouvez suivre.' },
  { question: 'La session est-elle enregistrée si je ne peux pas être présent en direct ?', answer: 'L’intérêt est la pratique sur votre propre cas, donc c’est pensé pour du direct. Demandez-nous directement si un replay peut convenir à votre situation.' },
  { question: 'Et si je n’ai pas encore d’idée précise de tâche à automatiser ?', answer: 'C’est normal et ce n’est pas un problème — une partie de la session aide justement à repérer la tâche à automatiser en priorité.' },
  { question: 'Comment se fait le paiement ?', answer: 'Les modalités de paiement sont confirmées directement avec nous après l’audit gratuit ; aucun paiement en ligne n’est collecté sur cette page.' },
  { question: 'Cet atelier remplace-t-il l’offre Agents IA de pilotage ?', answer: 'Non. L’atelier vous apprend à construire vous-même une automatisation simple. L’offre Agents IA de pilotage cadre, installe et maintient plusieurs workflows contrôlés, connectés aux outils métier retenus et pilotés depuis WhatsApp.' },
])
</script>
