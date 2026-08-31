<template>
  <div ref="revealRoot">
    <PageHero :kicker="t.kicker" :description="t.description">
      {{ t.title1 }} <span class="text-gradient">{{ t.title2 }}</span>
      <template #actions>
        <button type="button" class="btn-primary" @click="openCalendly">{{ $t('header.bookCall') }} <ArrowRight class="h-4 w-4"/></button>
      </template>
    </PageHero>

    <!-- Présentation commerciale de l'offre (Famille 5 : Créatifs & Contenu Vidéo IA) -->
    <section class="section-pad">
      <div class="container-shell grid items-start gap-12 lg:grid-cols-2">
        <div class="reveal-left">
          <SectionHeading :kicker="t.offerKicker">{{ t.offerTitle }}</SectionHeading>
          <p class="mt-6 text-lg leading-8 text-[var(--muted)]">{{ t.offerText }}</p>
        </div>
        <div class="reveal-right card !p-8">
          <div v-for="(item, i) in capabilities" :key="item.title" class="reveal flex items-start gap-4 border-b py-4 last:border-0" :data-reveal-delay="i * 70">
            <component :is="item.icon" class="mt-0.5 h-5 w-5 shrink-0 text-violet-600"/>
            <div><p class="font-semibold">{{ item.title }}</p><p class="mt-1 text-sm leading-6 text-[var(--muted)]">{{ item.text }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Emplacement des vidéos générées : grille avec état vide géré (aucune vidéo à inventer) -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <div class="reveal"><SectionHeading :kicker="t.galleryKicker" center :description="t.galleryDescription">{{ t.galleryTitle1 }} <span class="text-gradient">{{ t.galleryTitle2 }}</span></SectionHeading></div>
        <div v-if="videos.length" class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="video in videos" :key="video.title" class="card overflow-hidden !p-0">
            <div class="aspect-video bg-[var(--bg-void)]"/>
            <div class="p-5"><h3 class="font-bold">{{ video.title }}</h3><p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ video.description }}</p></div>
          </article>
        </div>
        <div v-else class="mx-auto mt-12 max-w-lg rounded-2xl border border-dashed border-[var(--border-strong)] p-10 text-center">
          <Clapperboard class="mx-auto h-8 w-8 text-[var(--text-secondary)]"/>
          <p class="mt-4 text-sm leading-6 text-[var(--muted)]">{{ t.galleryEmpty }}</p>
        </div>
      </div>
    </section>

    <CtaBand :title="t.ctaTitle"/>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Clapperboard, Gauge, Languages, ScissorsLineDashed, UserRoundCog } from 'lucide-vue-next'

interface VideoLabItem { title: string; description: string }

const { locale } = useI18n()
const { openCalendly } = useCalendly()
const revealRoot = useScrollReveal()

const seoMeta = computed(() => locale.value === 'en'
  ? { title: 'Video Lab — AI-generated creative content', description: 'AI avatar UGC, script and voice, multilingual dubbing, automatic long-video cutdown and pre-release performance prediction.' }
  : { title: 'Vidéo Lab — contenu créatif généré par IA', description: 'UGC IA avatar/script/voix, doublage multilingue, découpage automatique de vidéos longues et prédiction de performance avant diffusion.' })
useSeoMeta({ title: () => seoMeta.value.title, description: () => seoMeta.value.description })

const t = computed(() => locale.value === 'en' ? {
  kicker: 'offer · ai video creative', title1: 'AI-generated video content,', title2: 'made to convert.',
  description: 'The showcase for our AI Creative & Video Content offer: AI avatar UGC, multilingual dubbing, automatic cutdown of long videos and pre-release performance prediction.',
  offerKicker: 'the offer', offerTitle: 'A creative video system, not a one-off deliverable.',
  offerText: 'We connect script, AI avatar voice, multilingual dubbing and automatic cutdown so your video content keeps a steady pace without rebuilding everything from scratch each time. Performance prediction helps prioritize which cut to publish first.',
  galleryKicker: 'generated videos', galleryTitle1: 'Videos produced', galleryTitle2: 'for our clients.', galleryDescription: 'This space showcases the videos delivered through the system. It fills up as projects are published — nothing here is invented.',
  galleryEmpty: 'No video has been published in this gallery yet. The first deliveries will appear here.',
  ctaTitle: 'Map the video content that should support your acquisition system.',
} : {
  kicker: 'offre · créatifs vidéo ia', title1: 'Du contenu vidéo généré par IA,', title2: 'pensé pour convertir.',
  description: 'La vitrine de notre offre Créatifs & Contenu Vidéo IA : UGC IA avatar/script/voix, doublage multilingue, découpage automatique de vidéos longues et prédiction de performance avant diffusion.',
  offerKicker: 'l’offre', offerTitle: 'Un système de créatifs vidéo, pas un livrable isolé.',
  offerText: 'On relie script, voix d’avatar IA, doublage multilingue et découpage automatique pour que votre contenu vidéo garde un rythme régulier sans tout reconstruire à chaque fois. La prédiction de performance aide à prioriser le montage à publier en premier.',
  galleryKicker: 'vidéos générées', galleryTitle1: 'Des vidéos produites', galleryTitle2: 'pour nos clients.', galleryDescription: 'Cet espace présente les vidéos livrées via le système. Il se remplit au fil des projets publiés — rien n’y est inventé.',
  galleryEmpty: 'Aucune vidéo n’a encore été publiée dans cette galerie. Les premières livraisons apparaîtront ici.',
  ctaTitle: 'Cartographions le contenu vidéo qui doit soutenir votre système d’acquisition.',
})

const capabilities = computed(() => locale.value === 'en' ? [
  { icon: UserRoundCog, title: 'AI avatar UGC', text: 'Script, AI avatar and voice combined into a usable ad or social format.' },
  { icon: Languages, title: 'Multilingual dubbing', text: 'The same video adapted to several languages without a new shoot.' },
  { icon: ScissorsLineDashed, title: 'Automatic cutdown', text: 'Long videos automatically cut into shorter, publishable formats.' },
  { icon: Gauge, title: 'Pre-release performance prediction', text: 'An estimate to help prioritize which cut to publish first.' },
] : [
  { icon: UserRoundCog, title: 'UGC IA avatar', text: 'Script, avatar IA et voix combinés dans un format publicitaire ou social exploitable.' },
  { icon: Languages, title: 'Doublage multilingue', text: 'La même vidéo adaptée à plusieurs langues sans nouveau tournage.' },
  { icon: ScissorsLineDashed, title: 'Découpage automatique', text: 'Des vidéos longues découpées automatiquement en formats courts publiables.' },
  { icon: Gauge, title: 'Prédiction de performance avant diffusion', text: 'Une estimation pour prioriser le montage à publier en premier.' },
])

// Aucune vidéo à inventer : la grille reste vide et affiche un état géré proprement tant
// qu'aucune vidéo réelle n'est chargée (cf. brief — pas de contenu client inventé).
const videos: VideoLabItem[] = []
</script>
