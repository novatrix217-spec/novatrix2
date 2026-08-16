<template>
  <div ref="revealRoot">
    <section ref="heroEl" class="hero-rich relative flex min-h-[600px] items-center overflow-hidden pt-24 text-white sm:min-h-[760px] lg:min-h-screen">
      <div class="container-shell relative z-10 grid items-center gap-5 py-10 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:py-24">
        <div v-motion-slide-visible-once-left class="parallax-layer" style="--depth: 4">
          <h1 class="text-[2.6rem] font-bold leading-[1.04] tracking-[-.045em] sm:text-6xl xl:text-7xl" v-html="t.heroTitle"/>
          <p class="mt-6 max-w-xl text-base leading-7 text-white/75 sm:mt-7 sm:text-xl sm:leading-8">{{ t.heroDescription }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"><a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-soft justify-center !px-7 !py-4">{{ $t('cta.button') }} <ArrowRight class="h-4 w-4"/></a><NuxtLink :to="localePath('/realisations')" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#3DE0C5]/40 px-6 py-3 text-sm font-bold text-[#3DE0C5] backdrop-blur-md transition hover:bg-[#3DE0C5]/10">{{ t.seeCases }}</NuxtLink></div>
          <div class="mt-9 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-white/70"><span v-for="badge in t.badges" :key="badge" class="flex items-center gap-2"><i class="h-1 w-1 rounded-full bg-[#3DE0C5]"/>{{ badge }}</span></div>
        </div>
        <div class="relative flex h-[210px] items-end justify-center sm:h-[520px]" v-motion-fade-visible-once>
          <!-- halo violet rayonnant derrière le personnage -->
          <div class="parallax-layer absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-96 sm:w-96" style="--depth: 10; background: radial-gradient(circle, rgba(139,92,246,.5), rgba(192,38,211,.15) 45%, transparent 72%); filter: blur(28px)"/>
          <!-- personnage 3D détouré -->
          <img src="/hero/perso-v2.png" :alt="t.heroImgAlt" class="parallax-layer relative z-10 h-full w-auto object-contain drop-shadow-2xl" style="--depth: -10" loading="eager"/>
        </div>
      </div>

      <!-- Indicateur de défilement animé -->
      <button type="button" :aria-label="t.scrollDown" class="scroll-cue absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition hover:text-white sm:flex" :class="scrolledHero ? 'pointer-events-none opacity-0' : 'opacity-100'" @click="scrollDown">
        <span class="font-mono text-[10px] uppercase tracking-[.2em]">{{ t.scroll }}</span>
        <span class="scroll-mouse relative grid h-9 w-5 place-items-start justify-center rounded-full border border-current pt-1.5">
          <span class="scroll-dot h-1.5 w-1 rounded-full bg-current"/>
        </span>
      </button>
    </section>

    <MetricsStrip :projects-count="projectsCount" :testimonials-count="testimonialsCount"/>

    <section class="section-pad soft-grid">
      <div class="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div class="reveal-left"><SectionHeading :kicker="t.problemKicker" :description="t.problemDescription">{{ t.problemTitle1 }}<br><span class="text-gradient">{{ t.problemTitle2 }}</span></SectionHeading></div>
        <div class="card glass reveal-right relative overflow-hidden !p-8"><div class="absolute inset-y-0 left-0 w-1 gradient-action"/><div class="space-y-6"><div v-for="(item,i) in chain" :key="item" class="flex items-center gap-4"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-xs font-bold" :class="i===chain.length-1?'bg-[#3DE0C5] text-[#160630]':'bg-violet-600/10 text-violet-700 dark:text-violet-300'">{{ String(i+1).padStart(2,'0') }}</span><p class="font-semibold">{{ item }}</p><ArrowRight v-if="i<chain.length-1" class="ml-auto h-4 w-4 rotate-90 text-violet-400"/></div></div></div>
      </div>
    </section>

    <section id="offres" class="section-pad relative overflow-hidden border-y bg-[var(--surface)]">
      <div class="container-shell relative z-10"><div class="reveal"><SectionHeading :kicker="t.offersKicker" :description="t.offersDescription">{{ t.offersTitle1 }}<br><span class="text-gradient">{{ t.offersTitle2 }}</span></SectionHeading></div>
        <div class="mt-14 grid gap-6 lg:grid-cols-3"><div v-for="(offer,i) in offers" :key="offer.tag" class="reveal-scale" :data-reveal-delay="i*120"><OfferCard v-bind="offer"/></div></div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.processKicker" center :description="t.processDescription">{{ t.processTitle1 }} <span class="text-gradient">{{ t.processTitle2 }}</span></SectionHeading></div>
        <div class="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><div v-for="(item,i) in process" :key="item.step" class="card card-hover reveal" :data-reveal-delay="i*100"><span class="font-heading text-5xl font-bold text-violet-600/10">{{ item.step }}</span><h3 class="mt-4 text-xl font-bold">{{ item.title }}</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p><p class="mt-4 flex items-start gap-2 border-t pt-4 text-xs font-semibold text-[var(--teal)]"><Check class="mt-0.5 h-3.5 w-3.5 shrink-0"/>{{ outcomeLabel }} {{ item.outcome }}</p></div></div>
      </div>
    </section>

    <section ref="proofEl" class="section-pad hero-grid grain relative overflow-hidden text-white">
      <div class="container-shell relative z-10"><div class="reveal"><SectionHeading :kicker="t.resultsKicker" dark :description="t.resultsDescription">{{ t.resultsTitle1 }} <span class="text-[#3DE0C5]">{{ t.resultsTitle2 }}</span></SectionHeading></div>
        <div class="mt-14 grid gap-5 md:grid-cols-3"><div v-for="(result,i) in results" :key="result.value" class="glass-dark reveal-scale rounded-2xl p-7" :data-reveal-delay="i*120"><p class="font-heading text-4xl font-bold text-[#3DE0C5]">{{ result.value }}</p><h3 class="mt-4 text-lg font-bold">{{ result.title }}</h3><p class="mt-2 text-sm leading-6 text-white/55">{{ result.text }}</p></div></div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-shell"><div class="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading :kicker="t.casesKicker" :description="t.casesDescription">{{ t.casesTitle1 }} <span class="text-gradient">{{ t.casesTitle2 }}</span></SectionHeading><NuxtLink :to="localePath('/realisations')" class="btn-secondary">{{ t.allCases }} <ArrowRight class="h-4 w-4"/></NuxtLink></div><div class="mt-12 grid gap-6 md:grid-cols-3"><div v-for="(project,i) in featuredProjects" :key="project.slug" class="reveal" :data-reveal-delay="i*110"><ProjectCard :project="project"/></div></div></div>
    </section>

    <section class="section-pad">
      <div class="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div class="photo-duo reveal-left aspect-[5/4] rounded-2xl shadow-[var(--elev-3)]"><img src="/img/work.jpg" :alt="t.workImgAlt" width="900" height="720" loading="lazy"/></div>
        <div class="reveal-right">
          <SectionHeading :kicker="t.partnerKicker">{{ t.partnerTitle1 }} <span class="text-gradient">{{ t.partnerTitle2 }}</span><br>{{ t.partnerTitle3 }}</SectionHeading>
          <p class="mt-6 text-lg leading-8 text-[var(--muted)]">{{ t.partnerDescription }}</p>
          <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary mt-8">{{ t.partnerCta }} <ArrowRight class="h-4 w-4"/></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-shell"><div class="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading :kicker="t.resourcesKicker" :description="t.resourcesDescription">{{ t.resourcesTitle1 }} <span class="text-gradient">{{ t.resourcesTitle2 }}</span></SectionHeading><NuxtLink :to="localePath('/ressources')" class="btn-secondary">{{ t.allResources }} <ArrowRight class="h-4 w-4"/></NuxtLink></div><div class="mt-12 grid gap-6 md:grid-cols-3"><div v-for="(resource,i) in featuredResources" :key="resource.slug" class="reveal" :data-reveal-delay="i*110"><ResourceCard :resource="resource"/></div></div></div>
    </section>

    <section class="section-pad border-y bg-[var(--surface)]"><div class="container-shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]"><div class="photo-duo reveal-left aspect-[4/5] max-w-sm rounded-2xl shadow-[var(--elev-3)]"><img src="/img/team-2.jpg" :alt="t.teamImgAlt" width="600" height="750" loading="lazy"/></div><div><div class="reveal-right"><SectionHeading :kicker="t.trustKicker">{{ t.trustTitle1 }} <span class="text-gradient">{{ t.trustTitle2 }}</span></SectionHeading></div><div class="mt-8 grid gap-4 sm:grid-cols-2"><div v-for="(value,i) in values" :key="value.title" class="card card-hover glass-sheen reveal" :data-reveal-delay="i*90"><component :is="value.icon" class="h-6 w-6 text-violet-600"/><h3 class="mt-4 font-bold">{{ value.title }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ value.text }}</p></div></div></div></div></section>

    <section v-if="testimonials.length" class="section-pad border-y bg-[var(--surface)]"><div class="container-shell"><div class="reveal"><SectionHeading :kicker="t.testimonialsKicker" center :description="t.testimonialsDescription">{{ t.testimonialsTitle1 }} <span class="text-gradient">{{ t.testimonialsTitle2 }}</span></SectionHeading></div><div class="mt-12"><TestimonialWall :items="testimonials" :limit="3"/></div><p class="mt-8 text-center"><NuxtLink :to="localePath('/avis')" class="btn-secondary">{{ t.allReviews }} <ArrowRight class="h-4 w-4"/></NuxtLink></p></div></section>

    <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div class="reveal-left"><SectionHeading :kicker="t.faqKicker">{{ t.faqTitle1 }} <span class="text-gradient">{{ t.faqTitle2 }}</span></SectionHeading></div><div class="reveal-right"><FaqAccordion :items="faqs"/></div></div></section>
    <CtaBand/>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight,Bot,Check,Code2,Cpu,Eye,Layers3,ShieldCheck,Waypoints } from 'lucide-vue-next'
import { demoProjects,demoResources,demoTestimonials } from '~/shared/demo'
import type { PublicProject,PublicTestimonial } from '~/shared/types'
const { locale } = useI18n()
const localePath = useLocalePath()
const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'AI that connects your growth', description: 'Your tools don’t talk to each other, and it costs you sales. NovatrixAI connects acquisition, AI piloting agents and custom applications into one chain. Book your call — Cotonou and remote.' }
  : { title: 'L’IA qui relie votre croissance', description: 'Vos outils ne se parlent pas et ça vous coûte des ventes. NovatrixAI relie acquisition, agents IA de pilotage et applications sur mesure en une seule chaîne. Réservez votre appel — Cotonou et à distance.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })
const {data:projectsData}=await useFetch<{items:PublicProject[]}>('/api/projects',{default:()=>({items:demoProjects})})
const {data:testimonialsData}=await useFetch<{items:PublicTestimonial[]}>('/api/testimonials',{default:()=>({items:demoTestimonials})})
const featuredProjects=computed(()=>{const items=projectsData.value?.items||[];return (items.filter(p=>p.featured).length?items.filter(p=>p.featured):items).slice(0,3)})
const testimonials=computed(()=>testimonialsData.value?.items||[])
const projectsCount=computed(()=>projectsData.value?.items?.length||demoProjects.length)
const testimonialsCount=computed(()=>testimonialsData.value?.items?.length||demoTestimonials.length)
const calendarUrl=useRuntimeConfig().public.calendarUrl
const heroEl=useParallax(20)
const proofEl=useParallax(12)
const revealRoot=useScrollReveal()
const scrolledHero=ref(false)
function onHeroScroll(){ scrolledHero.value = window.scrollY > 40 }
function scrollDown(){ window.scrollTo({ top: window.innerHeight - 70, behavior: 'smooth' }) }
onMounted(()=>{ window.addEventListener('scroll', onHeroScroll, { passive: true }) })
onBeforeUnmount(()=>window.removeEventListener('scroll', onHeroScroll))

const t=computed(()=>locale.value==='en'?{
  heroTitle:'AI that <span class="text-gradient-flow">connects</span><br>your growth.',
  heroDescription:'Your tools don’t talk to each other, and it costs you sales every day. We connect acquisition, AI agents and custom products into a single chain — built for a result, not for stacking software.',
  heroImgAlt:'3D illustration — NovatrixAI expert', seeCases:'See our case studies',
  badges:['A chain that holds','You stay in control','Nothing to rebuild in 6 months','You see what pays off'],
  scroll:'Scroll', scrollDown:'Scroll down',
  problemKicker:'the real problem', problemDescription:'A single ad, CRM or isolated agent doesn’t reconnect a broken chain. Your leads keep leaking between two tools.',
  problemTitle1:'What’s costing you sales isn’t a tool.', problemTitle2:'It’s the system.',
  offersKicker:'what we install for you', offersDescription:'Three systems that deploy alone or together. One commitment: turning your work into a measurable result.',
  offersTitle1:'Three systems.', offersTitle2:'One goal: your growth.',
  processKicker:'how we move forward together', processDescription:'Each phase has a clear deliverable and a checkpoint. You never pay for an untested hypothesis.',
  processTitle1:'From where you are to a', processTitle2:'system that works for you.',
  resultsKicker:'what it actually changes', resultsDescription:'Effects observed on connected systems. No inflated numbers, just what happens once everything is wired.',
  resultsTitle1:'The result shows up once', resultsTitle2:'the chain finally holds.',
  casesKicker:'not promises, delivered systems', casesDescription:'Automations, AI agents and applications actually built. Each entry states what’s confirmed and what’s still to document.',
  casesTitle1:'What we’ve', casesTitle2:'already put to work.', allCases:'All case studies',
  workImgAlt:'NovatrixAI partnership with its clients',
  partnerKicker:'a partner, not a vendor', partnerTitle1:'We build', partnerTitle2:'with you,', partnerTitle3:'not just for you.',
  partnerDescription:'Based in Cotonou, we support French-speaking leaders and teams, on-site or remote. Your system is built around your reality — your data, your constraints, your pace. Never a generic template forced onto your business.',
  partnerCta:'Talk with us',
  resourcesKicker:'to get started, free', resourcesDescription:'Practical tools to see where your chain is leaking, before we even talk.',
  resourcesTitle1:'Spot your leaks with a', resourcesTitle2:'free diagnostic.', allResources:'All resources',
  teamImgAlt:'Professional supported by NovatrixAI',
  trustKicker:'why trust us', trustTitle1:'One point of contact, accountable for', trustTitle2:'the entire chain.',
  testimonialsKicker:'what they say', testimonialsDescription:'Real feedback from clients we’ve worked with, imported from our ComeUp profile.',
  testimonialsTitle1:'Verified by those who’ve', testimonialsTitle2:'already tested it.', allReviews:'See all reviews',
  faqKicker:'your questions before the call', faqTitle1:'Everything’s clear before you', faqTitle2:'commit.',
}:{
  heroTitle:'L’IA qui <span class="text-gradient-flow">relie</span><br>votre croissance.',
  heroDescription:'Vos outils ne se parlent pas, et ça vous coûte des ventes chaque jour. On relie acquisition, agents IA et produits sur mesure en une seule chaîne — pensée pour un résultat, pas pour empiler des logiciels.',
  heroImgAlt:'Illustration 3D — expert NovatrixAI', seeCases:'Voir nos réalisations',
  badges:['Une chaîne qui tient','Vous gardez la main','Rien à recoder dans 6 mois','Vous voyez ce qui rapporte'],
  scroll:'Défiler', scrollDown:'Faire défiler vers le bas',
  problemKicker:'le vrai problème', problemDescription:'Une pub, un CRM ou un agent isolé ne rebranche pas une chaîne cassée. Vos leads continuent de fuir entre deux outils.',
  problemTitle1:'Ce qui vous fait perdre des ventes n’est pas un outil.', problemTitle2:'C’est le système.',
  offersKicker:'ce qu’on installe pour vous', offersDescription:'Trois systèmes qui se déploient seuls ou ensemble. Un même engagement : transformer votre travail en résultat mesurable.',
  offersTitle1:'Trois systèmes.', offersTitle2:'Un seul objectif : votre croissance.',
  processKicker:'comment on avance ensemble', processDescription:'Chaque phase a un livrable clair et un point de validation. Vous ne payez jamais pour une hypothèse non testée.',
  processTitle1:'De votre réalité à un', processTitle2:'système qui travaille pour vous.',
  resultsKicker:'ce que ça change concrètement', resultsDescription:'Des effets observés sur des systèmes reliés. Pas de chiffres gonflés, juste ce qui arrive quand tout est branché.',
  resultsTitle1:'Le résultat arrive quand', resultsTitle2:'la chaîne tient enfin.',
  casesKicker:'pas des promesses, des systèmes livrés', casesDescription:'Automatisations, agents IA et applications réellement construits. Chaque fiche indique ce qui est confirmé et ce qui reste à documenter.',
  casesTitle1:'Ce qu’on a', casesTitle2:'déjà fait tourner.', allCases:'Toutes les réalisations',
  workImgAlt:'Partenariat NovatrixAI avec ses clients',
  partnerKicker:'un partenaire, pas un prestataire', partnerTitle1:'On construit', partnerTitle2:'avec vous,', partnerTitle3:'pas juste pour vous.',
  partnerDescription:'Basés à Cotonou, on accompagne des dirigeants et des équipes francophones, sur place comme à distance. Votre système est bâti autour de votre réalité — vos données, vos contraintes, votre rythme. Jamais un modèle générique plaqué sur votre activité.',
  partnerCta:'Échanger avec nous',
  resourcesKicker:'pour commencer, gratuitement', resourcesDescription:'Des outils concrets pour voir où votre chaîne fuit, avant même d’en parler ensemble.',
  resourcesTitle1:'Repérez vos fuites avec un', resourcesTitle2:'diagnostic offert.', allResources:'Toutes les ressources',
  teamImgAlt:'Professionnelle accompagnée par NovatrixAI',
  trustKicker:'pourquoi nous faire confiance', trustTitle1:'Un seul interlocuteur, responsable de', trustTitle2:'toute la chaîne.',
  testimonialsKicker:'ce qu’ils en disent', testimonialsDescription:'Des retours réels de clients accompagnés, importés depuis notre profil ComeUp.',
  testimonialsTitle1:'Vérifié par ceux qui ont', testimonialsTitle2:'déjà testé.', allReviews:'Voir tous les avis',
  faqKicker:'vos questions avant l’appel', faqTitle1:'Tout est clair avant de', faqTitle2:'vous engager.',
})

const chain=computed(()=>locale.value==='en'?['Attract the right prospects','Convert without losing them along the way','Sync every lead automatically','Follow up at the moment that sells','Measure and decide without guessing']:['Attirer les bons prospects','Convertir sans les perdre en route','Synchroniser chaque lead automatiquement','Relancer au moment qui vend','Mesurer et décider sans deviner'])

const offers=computed(()=>locale.value==='en'?[
  {tag:'A',title:'Acquisition System',description:'Creatives, campaigns, funnel, CRM, follow-ups and closing in a single chain: no lead ever gets lost between two steps.',result:'qualified leads that arrive on their own',features:['Meta, TikTok and Google campaigns','Custom funnel and tracking','CRM, email, SMS and WhatsApp connected','Closing fed by your data'],to:'/offres/acquisition',icon:Cpu},
  {tag:'B',title:'AI Piloting Agents',description:'A team of agents you command from WhatsApp or Telegram, wired into your tools. Repetitive work gets done without you.',result:'your evenings and weekends back',features:['Finance, agenda and reporting','Legal and documents assisted','Social media and operations','You validate what’s sensitive'],to:'/offres/pilotage-ia',icon:Bot},
  {tag:'C',title:'Web & Applications',description:'Websites, web and mobile apps, APIs and integrations built around your business flows. A tool that looks like you, that you won’t have to throw away in a year.',result:'a reliable tool that grows with you',features:['Product and UX scoping','Web and mobile development','Business APIs and integrations','Deployment and evolution'],to:'/offres/creation-web-apps',icon:Code2},
]:[
  {tag:'A',title:'Système d’Acquisition',description:'Créatifs, campagnes, tunnel, CRM, relances et closing dans une seule chaîne : plus aucun lead ne se perd entre deux étapes.',result:'des leads qualifiés qui arrivent seuls',features:['Campagnes Meta, TikTok et Google','Tunnel et tracking sur mesure','CRM, email, SMS et WhatsApp reliés','Closing nourri par vos données'],to:'/offres/acquisition',icon:Cpu},
  {tag:'B',title:'Agents IA de pilotage',description:'Une équipe d’agents que vous commandez depuis WhatsApp ou Telegram, branchée sur vos outils. Le travail répétitif se fait sans vous.',result:'vos soirées et week-ends récupérés',features:['Finance, agenda et reporting','Juridique et documents assistés','Réseaux sociaux et opérations','Vous validez ce qui est sensible'],to:'/offres/pilotage-ia',icon:Bot},
  {tag:'C',title:'Web & applications',description:'Sites, apps web et mobiles, APIs et intégrations bâtis autour de vos flux métier. Un outil qui vous ressemble, que vous ne devrez pas jeter dans un an.',result:'un outil fiable qui grandit avec vous',features:['Cadrage produit et UX','Développement web et mobile','APIs et intégrations métier','Déploiement et évolution'],to:'/offres/creation-web-apps',icon:Code2},
])

const process=computed(()=>locale.value==='en'?[{step:'01',title:'Discovery',text:'We start from your business, your data and the real problem that’s costing you money.',outcome:'the real problem identified and a clear scope.'},{step:'02',title:'Architecture',text:'We map the flows, the roles and the checkpoints before writing a line of code.',outcome:'the flows and checkpoints laid out on paper.'},{step:'03',title:'Deployment',text:'We build, connect and test on your real cases, not on paper.',outcome:'a system tested on your real cases, not in theory.'},{step:'04',title:'Piloting',text:'We track the result, fix what breaks and evolve the system with you.',outcome:'active tracking and a system that evolves with you.'}]:[{step:'01',title:'Découverte',text:'On part de votre activité, de vos données et du vrai problème qui vous coûte de l’argent.',outcome:'le vrai problème identifié et un périmètre clair.'},{step:'02',title:'Architecture',text:'On dessine les flux, les rôles et les points de validation avant d’écrire une ligne.',outcome:'les flux et les points de validation posés sur papier.'},{step:'03',title:'Déploiement',text:'On construit, on connecte et on teste sur vos cas réels, pas sur du papier.',outcome:'un système testé sur vos cas réels, pas en théorie.'},{step:'04',title:'Pilotage',text:'On suit le résultat, on répare les ruptures et on fait évoluer avec vous.',outcome:'un suivi actif et un système qui évolue avec vous.'}])
const outcomeLabel=computed(()=>locale.value==='en'?'You leave with:':'Vous repartez avec :')

const results=computed(()=>locale.value==='en'?[{value:'+30%',title:'Of recovered sales',text:'Behavior-triggered follow-ups catch the carts and leads that used to slip away.'},{value:'Dozens',title:'Of hours given back monthly',text:'Agents absorb repetitive tasks and report to you, without you having to ask.'},{value:'Zero',title:'Gaps before going live',text:'A lead and a piece of data cross the whole chain and get validated before it ships to production.'}]:[{value:'+30 %',title:'De ventes récupérées',text:'Des relances branchées sur le comportement rattrapent les paniers et les leads qui vous échappaient.'},{value:'Des dizaines',title:'D’heures rendues chaque mois',text:'Les agents absorbent les tâches répétitives et vous rendent compte, sans vous solliciter.'},{value:'Zéro',title:'Faille avant la mise en ligne',text:'Un lead et une donnée traversent toute la chaîne et sont validés avant que ça parte en production.'}])

const featuredResources=demoResources

const values=computed(()=>locale.value==='en'?[{icon:Layers3,title:'Systems, not patchwork',text:'Reliable, documented, maintainable: nothing to rebuild in six months.'},{icon:Waypoints,title:'Your business first',text:'Every technical choice serves a result you understand.'},{icon:Eye,title:'Zero blind spots',text:'You know what’s running, why, and what it earns you.'},{icon:ShieldCheck,title:'We own it all',text:'A single team accountable for the whole chain and its safeguards.'}]:[{icon:Layers3,title:'Des systèmes, pas du bricolage',text:'Fiable, documenté, maintenable : rien à recoder dans six mois.'},{icon:Waypoints,title:'Votre business d’abord',text:'Chaque choix technique sert un résultat que vous comprenez.'},{icon:Eye,title:'Zéro zone d’ombre',text:'Vous savez ce qui tourne, pourquoi, et ce que ça vous rapporte.'},{icon:ShieldCheck,title:'On assume tout',text:'Une seule équipe garante de la chaîne complète et de ses garde-fous.'}])

const faqs=computed(()=>locale.value==='en'?[{question:'Is this just another one-off gig?',answer:'No, and that’s the whole point. We build a complete system around the result you’re after. Scope can start small, but every phase forms a loop that works from day one.'},{question:'Will I have to throw away all my tools?',answer:'Almost never. We map what already exists and keep everything that works. Connections are chosen based on your maturity, your constraints and your data — not to replace everything.'},{question:'Will the agents act behind my back?',answer:'Never on what matters. The level of autonomy is set with you in advance. On legal, tax or financial matters, the agent prepares and proposes; you validate.'},{question:'Do you work outside Benin?',answer:'Yes, every day. NovatrixAI is based in Cotonou and delivers remotely for a French-speaking and international clientele, with distance never affecting quality.'}]:[{question:'Est-ce une prestation isolée de plus ?',answer:'Non, et c’est tout l’intérêt. On construit un système complet autour du résultat que vous visez. Le périmètre peut démarrer petit, mais chaque phase forme une boucle qui fonctionne dès le premier jour.'},{question:'Vais-je devoir jeter tous mes outils ?',answer:'Presque jamais. On cartographie l’existant et on garde tout ce qui marche déjà. Les connexions sont choisies selon votre maturité, vos contraintes et vos données — pas pour tout remplacer.'},{question:'Les agents vont-ils agir dans mon dos ?',answer:'Jamais sur ce qui compte. Le niveau d’autonomie est fixé avec vous à l’avance. Sur le juridique, le fiscal ou le financier, l’agent prépare et propose ; c’est vous qui validez.'},{question:'Travaillez-vous en dehors du Bénin ?',answer:'Oui, tous les jours. NovatrixAI est basée à Cotonou et livre à distance pour une clientèle francophone et internationale, sans que la distance change quoi que ce soit à la qualité.'}])
</script>
