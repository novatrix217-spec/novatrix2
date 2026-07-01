<template>
  <div ref="revealRoot">
    <section ref="heroEl" class="hero-rich relative flex min-h-[600px] items-center overflow-hidden pt-24 text-white sm:min-h-[760px] lg:min-h-screen">
      <div class="container-shell relative z-10 grid items-center gap-5 py-10 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:py-24">
        <div v-motion-slide-visible-once-left class="parallax-layer" style="--depth: 4">
          <h1 class="text-[2.6rem] font-bold leading-[1.04] tracking-[-.045em] sm:text-6xl xl:text-7xl">L’IA qui <span class="text-gradient-flow">relie</span><br>votre croissance.</h1>
          <p class="mt-6 max-w-xl text-base leading-7 text-white/75 sm:mt-7 sm:text-xl sm:leading-8">NovatrixAI conçoit des systèmes complets : acquisition, agents de pilotage et produits numériques sur mesure. Chaque maillon travaille avec les autres.</p>
          <div class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"><a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary glow-soft justify-center !px-7 !py-4">Réserver un appel de découverte <ArrowRight class="h-4 w-4"/></a><NuxtLink to="/offres" class="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#3DE0C5]/40 px-6 py-3 text-sm font-bold text-[#3DE0C5] backdrop-blur-md transition hover:bg-[#3DE0C5]/10">Voir les systèmes</NuxtLink></div>
          <div class="mt-9 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] text-white/70"><span v-for="badge in ['Systèmes complets','Validation humaine','Architecture maintenable','Suivi clair']" :key="badge" class="flex items-center gap-2"><i class="h-1 w-1 rounded-full bg-[#3DE0C5]"/>{{ badge }}</span></div>
        </div>
        <div class="relative flex h-[210px] items-end justify-center sm:h-[520px]" v-motion-fade-visible-once>
          <!-- halo violet rayonnant derrière le personnage -->
          <div class="parallax-layer absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-96 sm:w-96" style="--depth: 10; background: radial-gradient(circle, rgba(139,92,246,.5), rgba(192,38,211,.15) 45%, transparent 72%); filter: blur(28px)"/>
          <!-- personnage 3D détouré -->
          <img src="/hero/perso-v2.png" alt="Illustration 3D — expert NovatrixAI" class="parallax-layer relative z-10 h-full w-auto object-contain drop-shadow-2xl" style="--depth: -10" loading="eager"/>
        </div>
      </div>

      <!-- Indicateur de défilement animé -->
      <button type="button" aria-label="Faire défiler vers le bas" class="scroll-cue absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition hover:text-white sm:flex" :class="scrolledHero ? 'pointer-events-none opacity-0' : 'opacity-100'" @click="scrollDown">
        <span class="font-mono text-[10px] uppercase tracking-[.2em]">Défiler</span>
        <span class="scroll-mouse relative grid h-9 w-5 place-items-start justify-center rounded-full border border-current pt-1.5">
          <span class="scroll-dot h-1.5 w-1 rounded-full bg-current"/>
        </span>
      </button>
    </section>

    <MetricsStrip/>

    <section class="section-pad soft-grid">
      <div class="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div class="reveal-left"><SectionHeading kicker="le vrai problème" description="Une publicité, un CRM ou un agent isolé ne répare pas une chaîne cassée.">Le maillon manquant n’est pas un outil.<br><span class="text-gradient">C’est le système.</span></SectionHeading></div>
        <div class="card glass reveal-right relative overflow-hidden !p-8"><div class="absolute inset-y-0 left-0 w-1 gradient-action"/><div class="space-y-6"><div v-for="(item,i) in chain" :key="item" class="flex items-center gap-4"><span class="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-xs font-bold" :class="i===chain.length-1?'bg-[#3DE0C5] text-[#160630]':'bg-violet-600/10 text-violet-700 dark:text-violet-300'">{{ String(i+1).padStart(2,'0') }}</span><p class="font-semibold">{{ item }}</p><ArrowRight v-if="i<chain.length-1" class="ml-auto h-4 w-4 rotate-90 text-violet-400"/></div></div></div>
      </div>
    </section>

    <section id="offres" class="section-pad relative overflow-hidden border-y bg-[var(--surface)]">
      <div class="container-shell relative z-10"><div class="reveal"><SectionHeading kicker="nos offres" description="Trois systèmes indépendants. Une même exigence : relier le travail au résultat.">Trois systèmes.<br><span class="text-gradient">Un seul objectif.</span></SectionHeading></div>
        <div class="mt-14 grid gap-6 lg:grid-cols-3"><div v-for="(offer,i) in offers" :key="offer.tag" class="reveal-scale" :data-reveal-delay="i*120"><OfferCard v-bind="offer"/></div></div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-shell"><div class="reveal"><SectionHeading kicker="méthode" center description="Chaque phase a un livrable et une porte de sortie. On n’avance pas sur une hypothèse non testée.">De la réalité au <span class="text-gradient">système vivant.</span></SectionHeading></div>
        <div class="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><div v-for="(item,i) in process" :key="item.step" class="card card-hover reveal" :data-reveal-delay="i*100"><span class="font-heading text-5xl font-bold text-violet-600/10">{{ item.step }}</span><h3 class="mt-4 text-xl font-bold">{{ item.title }}</h3><p class="mt-3 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p></div></div>
      </div>
    </section>

    <section ref="proofEl" class="section-pad hero-grid grain relative overflow-hidden text-white">
      <div class="container-shell relative z-10"><div class="reveal"><SectionHeading kicker="preuves honnêtes" dark description="Des résultats observés sur des systèmes reliés, sans promesse artificielle.">Le résultat apparaît quand <span class="text-[#3DE0C5]">la chaîne tient.</span></SectionHeading></div>
        <div class="mt-14 grid gap-5 md:grid-cols-3"><div v-for="(result,i) in results" :key="result.value" class="glass-dark reveal-scale rounded-2xl p-7" :data-reveal-delay="i*120"><p class="font-heading text-4xl font-bold text-[#3DE0C5]">{{ result.value }}</p><h3 class="mt-4 text-lg font-bold">{{ result.title }}</h3><p class="mt-2 text-sm leading-6 text-white/55">{{ result.text }}</p></div></div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-shell grid items-center gap-12 lg:grid-cols-2">
        <div class="photo-duo reveal-left aspect-[5/4] rounded-2xl shadow-[var(--elev-3)]"><img src="/img/work.jpg" alt="Partenariat NovatrixAI avec ses clients" width="900" height="720" loading="lazy"/></div>
        <div class="reveal-right">
          <SectionHeading kicker="proximité">On travaille <span class="text-gradient">avec vous,</span><br>pas seulement pour vous.</SectionHeading>
          <p class="mt-6 text-lg leading-8 text-[var(--muted)]">Basés à Cotonou, nous accompagnons des entrepreneurs et des équipes francophones, sur place et à distance. Chaque système est construit autour de votre réalité — vos données, vos contraintes, votre rythme.</p>
          <a :href="calendarUrl" target="_blank" rel="noopener noreferrer" class="btn-primary mt-8">Échanger avec nous <ArrowRight class="h-4 w-4"/></a>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-shell"><div class="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading kicker="ressources" description="Des outils concrets pour cartographier avant de construire.">Commencez avec un <span class="text-gradient">diagnostic utile.</span></SectionHeading><NuxtLink to="/ressources" class="btn-secondary">Toutes les ressources <ArrowRight class="h-4 w-4"/></NuxtLink></div><div class="mt-12 grid gap-6 md:grid-cols-3"><div v-for="(resource,i) in featuredResources" :key="resource.slug" class="reveal" :data-reveal-delay="i*110"><ResourceCard :resource="resource"/></div></div></div>
    </section>

    <section class="section-pad border-y bg-[var(--surface)]"><div class="container-shell grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]"><div class="photo-duo reveal-left aspect-[4/5] max-w-sm rounded-2xl shadow-[var(--elev-3)]"><img src="/img/team-2.jpg" alt="Professionnelle accompagnée par NovatrixAI" width="600" height="750" loading="lazy"/></div><div><div class="reveal-right"><SectionHeading kicker="nos standards">Une agence responsable de <span class="text-gradient">toute la chaîne.</span></SectionHeading></div><div class="mt-8 grid gap-4 sm:grid-cols-2"><div v-for="(value,i) in values" :key="value.title" class="card card-hover glass-sheen reveal" :data-reveal-delay="i*90"><component :is="value.icon" class="h-6 w-6 text-violet-600"/><h3 class="mt-4 font-bold">{{ value.title }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ value.text }}</p></div></div></div></div></section>

    <section class="section-pad"><div class="container-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div class="reveal-left"><SectionHeading kicker="questions fréquentes">Clair avant de <span class="text-gradient">commencer.</span></SectionHeading></div><div class="reveal-right"><FaqAccordion :items="faqs"/></div></div></section>
    <CtaBand/>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight,Bot,Code2,Cpu,Eye,Layers3,ShieldCheck,Waypoints } from 'lucide-vue-next'
import { demoResources } from '~/shared/demo'
usePageSeo('Systèmes IA pour votre croissance', 'NovatrixAI conçoit des systèmes complets d’acquisition, des agents IA de pilotage et des applications sur mesure à Cotonou et à distance.')
const calendarUrl=useRuntimeConfig().public.calendarUrl
const heroEl=useParallax(20)
const proofEl=useParallax(12)
const revealRoot=useScrollReveal()
const scrolledHero=ref(false)
function onHeroScroll(){ scrolledHero.value = window.scrollY > 40 }
function scrollDown(){ window.scrollTo({ top: window.innerHeight - 70, behavior: 'smooth' }) }
onMounted(()=>{ window.addEventListener('scroll', onHeroScroll, { passive: true }) })
onBeforeUnmount(()=>window.removeEventListener('scroll', onHeroScroll))
const chain=['Attirer les bons prospects','Convertir dans un tunnel clair','Synchroniser chaque lead','Relancer au bon moment','Mesurer et décider']
const offers=[
  {tag:'A',title:'Système d’Acquisition',description:'Créatifs, campagnes, tunnel, CRM, relances et closing réunis dans une seule chaîne.',result:'des leads qualifiés en automatique',features:['Campagnes Meta, TikTok et Google','Tunnel et tracking sur mesure','CRM, email, SMS et WhatsApp','Closing relié aux données'],to:'/offres/acquisition',icon:Cpu},
  {tag:'B',title:'Agents IA de pilotage',description:'Une équipe d’agents pilotable depuis WhatsApp ou Telegram, branchée sur vos outils.',result:'des dizaines d’heures libérées',features:['Finance, agenda et reporting','Juridique et documents assistés','Réseaux sociaux et opérations','Validations humaines sensibles'],to:'/offres/pilotage-ia',icon:Bot},
  {tag:'C',title:'Web & applications',description:'Sites, applications web et mobiles, APIs et intégrations construits autour de vos flux métier.',result:'un process fiable et maintenable',features:['Cadrage produit et UX','Développement web et mobile','APIs et intégrations métier','Déploiement et évolution'],to:'/offres/creation-web-apps',icon:Code2},
]
const process=[{step:'01',title:'Découverte',text:'Nous partons de l’activité, des données et du vrai problème business.'},{step:'02',title:'Architecture',text:'Nous dessinons les flux, les responsabilités et les validations.'},{step:'03',title:'Déploiement',text:'Nous construisons, connectons et testons avec des cas réels.'},{step:'04',title:'Pilotage',text:'Nous suivons le résultat, corrigeons les ruptures et faisons évoluer.'}]
const results=[{value:'+30 %',title:'Paniers récupérés',text:'Des relances reliées au comportement permettent de récupérer des ventes qui se perdaient.'},{value:'Des dizaines',title:'D’heures gagnées par mois',text:'Les agents prennent en charge les tâches répétitives et rendent compte au dirigeant.'},{value:'Sans erreur',title:'Process testés de bout en bout',text:'Un lead ou une donnée traverse toute la chaîne avant la mise en production.'}]
const featuredResources=demoResources
const values=[{icon:Layers3,title:'Systèmes, pas bricolage',text:'Fiable, documenté, maintenable et évolutif.'},{icon:Waypoints,title:'Business d’abord',text:'Chaque choix technique sert un résultat compris.'},{icon:Eye,title:'Clarté',text:'Vous savez ce qui est en place, pourquoi et ce que cela produit.'},{icon:ShieldCheck,title:'Responsabilité',text:'Nous assumons la chaîne complète et ses points de contrôle.'}]
const faqs=[{question:'Est-ce une prestation isolée ?',answer:'Non. Nous construisons un système complet autour du résultat visé. Le périmètre peut être progressif, mais chaque phase doit former une boucle fonctionnelle.'},{question:'Faut-il remplacer tous nos outils ?',answer:'Pas forcément. Nous cartographions l’existant et conservons ce qui est fiable. Les connexions sont choisies selon votre maturité, vos contraintes et vos données.'},{question:'Les agents agissent-ils sans contrôle ?',answer:'Le niveau d’autonomie est défini à l’avance. Sur les sujets juridiques, fiscaux ou financiers, l’agent assiste et prépare ; une validation humaine reste prévue.'},{question:'Travaillez-vous hors du Bénin ?',answer:'Oui. NovatrixAI est basée à Cotonou et livre à distance pour une clientèle francophone et internationale.'}]
</script>
