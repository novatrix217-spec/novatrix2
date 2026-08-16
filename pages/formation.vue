<template><div ref="revealRoot"><PageHero :kicker="t.kicker" :description="t.description"><span v-html="t.heroTitle"/><template #actions><a :href="whatsappCta" target="_blank" rel="noopener noreferrer" class="btn-primary">{{ t.cta }} <ArrowRight class="h-4 w-4"/></a><NuxtLink to="#programme" class="btn-secondary">{{ t.seeProgram }}</NuxtLink></template></PageHero>

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
        <a :href="whatsappCta" target="_blank" rel="noopener noreferrer" class="btn-primary mt-8 w-full justify-center">{{ t.cta }} <ArrowRight class="h-4 w-4"/></a>
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

  <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div class="reveal-left"><SectionHeading :kicker="t.faqKicker">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading></div><div class="reveal-right"><FaqAccordion :items="faqs"/></div></div></section>

  <section class="section-pad hero-grid grain relative overflow-hidden text-white"><div class="container-shell relative z-10 text-center"><SectionHeading :kicker="t.ctaKicker" dark center>{{ t.ctaTitle }}</SectionHeading><a :href="whatsappCta" target="_blank" rel="noopener noreferrer" class="btn-primary glow-soft mt-8 inline-flex">{{ t.cta }} <ArrowRight class="h-4 w-4"/></a></div></section>
</div></template>
<script setup lang="ts">
import { ArrowRight,Check,ShieldCheck,Users } from 'lucide-vue-next'
const { locale } = useI18n()
const revealRoot=useScrollReveal()
const config=useRuntimeConfig()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Workshop — Automate your first task with AI', description: 'A hands-on 3-hour session: leave with a working n8n automation, built on your own case, no technical background needed.' }
  : { title: 'Atelier — Automatisez votre première tâche avec l’IA', description: 'Une session pratique de 3h : repartez avec une automatisation n8n fonctionnelle, construite sur votre propre cas, sans prérequis technique.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const site = useRuntimeConfig().public.siteUrl
useHead({ script: [
  { type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Course', name: locale.value==='en'?'Automate your first task with AI':'Automatisez votre première tâche avec l’IA', description: locale.value==='en'?'Hands-on workshop: build a working automation with n8n in 3 hours.':'Atelier pratique : construire une automatisation n8n fonctionnelle en 3h.', provider: { '@type': 'Organization', name: 'NovatrixAI', sameAs: site } }) },
] })
const whatsappCta = computed(() => {
  const base = config.public.whatsappUrl
  const msg = locale.value === 'en' ? 'Hello, I’m interested in the "Automate your first task with AI" workshop.' : 'Bonjour, je suis intéressé(e) par l’atelier « Automatisez votre première tâche avec l’IA ».'
  return `${base}?text=${encodeURIComponent(msg)}`
})
const t = computed(() => locale.value === 'en' ? {
  kicker: 'live workshop', description: 'A single, hands-on session. No slides to sit through — you leave with a real automation running on your own case.',
  heroTitle: 'Automate your first task<br><span class="text-gradient">with AI — in one session.</span>',
  cta: 'Reserve my spot', seeProgram: 'See the program',
  programKicker: 'what you’ll learn', programTitle: 'From zero to a working automation, in 3 hours.',
  program: [
    'The basics of automation: triggers, actions, connections between your tools.',
    'Hands-on tour of n8n, the tool behind it.',
    'Build your first workflow: a real, working example.',
    'Connect two tools you already use — no code involved.',
    'Leave with a functioning workflow, ready to adapt to your own business.',
  ],
  detailsKicker: 'the essentials', duration: 'Duration', durationValue: '3 hours',
  format: 'Format', formatValue: 'Online, live',
  prerequisite: 'Prerequisite', prerequisiteValue: 'None',
  price: 'Price', priceValue: 'On request',
  spotsNote: 'Limited spots — price and details confirmed by WhatsApp.',
  forWhomKicker: 'is this for you', forWhomTitle: 'Built for people who lose time, not developers.',
  forWhomH: 'Who it’s for', forWhomText: 'Entrepreneurs, freelancers and teams who repeat the same manual task every week and want to see, concretely, how AI removes it.',
  prereqH: 'Prerequisites', prereqText: 'None. No coding, no technical background. Just a computer and one repetitive task you want gone.',
  faqKicker: 'before you book', faqTitle1: 'Clear before you', faqTitle2: 'sign up.',
  ctaKicker: 'ready?', ctaTitle: 'Your first automation could exist by this time next week.',
}: {
  kicker: 'atelier en direct', description: 'Une seule session, 100% pratique. Pas de diapos à subir — vous repartez avec une vraie automatisation qui tourne sur votre propre cas.',
  heroTitle: 'Automatisez votre première tâche<br><span class="text-gradient">avec l’IA — en une session.</span>',
  cta: 'Réserver ma place', seeProgram: 'Voir le programme',
  programKicker: 'ce que vous apprenez', programTitle: 'De zéro à une automatisation qui tourne, en 3h.',
  program: [
    'Les bases de l’automatisation : déclencheurs, actions, connexions entre vos outils.',
    'Prise en main concrète de n8n, l’outil derrière tout ça.',
    'Construction de votre premier workflow : un exemple réel, qui fonctionne.',
    'Connexion de deux outils que vous utilisez déjà — sans une ligne de code.',
    'Vous repartez avec un workflow fonctionnel, prêt à adapter à votre activité.',
  ],
  detailsKicker: 'l’essentiel', duration: 'Durée', durationValue: '3 heures',
  format: 'Format', formatValue: 'En ligne, en direct',
  prerequisite: 'Prérequis', prerequisiteValue: 'Aucun',
  price: 'Tarif', priceValue: 'Sur demande',
  spotsNote: 'Places limitées — tarif et détails confirmés par WhatsApp.',
  forWhomKicker: 'est-ce pour vous', forWhomTitle: 'Pensé pour ceux qui perdent du temps, pas pour des développeurs.',
  forWhomH: 'Pour qui', forWhomText: 'Entrepreneurs, indépendants et équipes qui répètent chaque semaine la même tâche manuelle, et veulent voir concrètement comment l’IA la supprime.',
  prereqH: 'Prérequis', prereqText: 'Aucun. Pas de code, pas de bagage technique. Juste un ordinateur et une tâche répétitive dont vous voulez vous débarrasser.',
  faqKicker: 'avant de vous inscrire', faqTitle1: 'Tout est clair avant de', faqTitle2: 'vous lancer.',
  ctaKicker: 'prêt(e) ?', ctaTitle: 'Votre première automatisation pourrait exister d’ici la semaine prochaine.',
})
const faqs = computed(() => locale.value === 'en' ? [
  { question: 'Do I need any technical background?', answer: 'No. The workshop is built for non-developers. If you can use a browser, you can follow along.' },
  { question: 'Is the session recorded if I can’t attend live?', answer: 'The focus is hands-on practice on your own case, so it’s designed to be live. Ask us directly if a replay could work for your situation.' },
  { question: 'What if I don’t have a clear use case yet?', answer: 'That’s normal and fine — part of the session helps you spot the task worth automating first.' },
  { question: 'How do I pay?', answer: 'Payment is confirmed directly with us after booking via WhatsApp — no online payment system yet at this stage.' },
]: [
  { question: 'Faut-il un bagage technique ?', answer: 'Non. L’atelier est pensé pour des non-développeurs. Si vous savez utiliser un navigateur, vous pouvez suivre.' },
  { question: 'La session est-elle enregistrée si je ne peux pas être présent en direct ?', answer: 'L’intérêt est la pratique sur votre propre cas, donc c’est pensé pour du direct. Demandez-nous directement si un replay peut convenir à votre situation.' },
  { question: 'Et si je n’ai pas encore d’idée précise de tâche à automatiser ?', answer: 'C’est normal et ce n’est pas un problème — une partie de la session aide justement à repérer la tâche à automatiser en priorité.' },
  { question: 'Comment se fait le paiement ?', answer: 'Le paiement se confirme directement avec nous après l’inscription via WhatsApp — pas encore de paiement en ligne à ce stade.' },
])
</script>
