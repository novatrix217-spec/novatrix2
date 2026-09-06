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

    <!-- Galerie de démonstration : vidéos générées par IA, clic pour lire avec le son -->
    <section class="section-pad border-y bg-[var(--surface)]">
      <div class="container-shell">
        <div class="reveal"><SectionHeading :kicker="t.galleryKicker" center :description="t.galleryDescription">{{ t.galleryTitle1 }} <span class="text-gradient">{{ t.galleryTitle2 }}</span></SectionHeading></div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(video, i) in videos"
            :key="video.slug"
            class="reveal card overflow-hidden !p-0"
            :data-reveal-delay="i * 70"
          >
            <button
              type="button"
              class="group relative block aspect-video w-full overflow-hidden bg-gradient-to-br from-[#2a0f5c] via-[#160630] to-[#0b0318] text-left"
              :aria-label="playingSlug === video.slug ? t.pauseAria : t.playAria"
              @click="toggle(video.slug)"
            >
              <video
                :ref="(el) => setVideoRef(el, video.slug)"
                class="h-full w-full object-cover transition duration-300"
                :class="playingSlug === video.slug ? '' : 'brightness-75 group-hover:brightness-90'"
                :poster="video.poster"
                preload="none"
                muted
                playsinline
                :controls="playingSlug === video.slug"
                :src="video.src"
                @ended="onEnded(video.slug)"
                @pause="onEnded(video.slug)"
                @click.stop
              />
              <span
                v-if="playingSlug !== video.slug"
                class="pointer-events-none absolute inset-0 flex items-center justify-center transition duration-300 group-hover:scale-105"
              >
                <span class="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition group-hover:bg-white">
                  <Play class="ml-1 h-6 w-6 text-[#2a0f5c]" fill="currentColor"/>
                </span>
              </span>
            </button>
            <div class="p-5">
              <h3 class="font-bold">{{ video.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-[var(--muted)]">{{ video.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <CtaBand :title="t.ctaTitle"/>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Gauge, Languages, Play, ScissorsLineDashed, UserRoundCog } from 'lucide-vue-next'
import type { ComponentPublicInstance } from 'vue'
import videoAssets from '~/shared/video-lab-assets.json'

interface VideoLabItem { slug: string; src: string; poster: string; title: string; description: string }

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
  galleryKicker: 'ai demo reel', galleryTitle1: 'AI-generated video', galleryTitle2: 'demonstrations.',
  galleryDescription: 'These 10 clips were produced end-to-end by AI generation tools, as a demonstration of our AI Creative & Video Content offer — no real footage, no real actors. Click a card to play with sound.',
  playAria: 'Play the video with sound', pauseAria: 'Pause the video',
  ctaTitle: 'Map the video content that should support your acquisition system.',
} : {
  kicker: 'offre · créatifs vidéo ia', title1: 'Du contenu vidéo généré par IA,', title2: 'pensé pour convertir.',
  description: 'La vitrine de notre offre Créatifs & Contenu Vidéo IA : UGC IA avatar/script/voix, doublage multilingue, découpage automatique de vidéos longues et prédiction de performance avant diffusion.',
  offerKicker: 'l’offre', offerTitle: 'Un système de créatifs vidéo, pas un livrable isolé.',
  offerText: 'On relie script, voix d’avatar IA, doublage multilingue et découpage automatique pour que votre contenu vidéo garde un rythme régulier sans tout reconstruire à chaque fois. La prédiction de performance aide à prioriser le montage à publier en premier.',
  galleryKicker: 'démo générée par ia', galleryTitle1: 'Démonstrations vidéo', galleryTitle2: 'générées par IA.',
  galleryDescription: 'Ces 10 extraits ont été produits de bout en bout par des outils de génération IA, en démonstration de notre offre Créatifs & Contenu Vidéo IA — aucune image réelle, aucun acteur réel. Cliquez sur une carte pour lancer la lecture avec le son.',
  playAria: 'Lire la vidéo avec le son', pauseAria: 'Mettre la vidéo en pause',
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

// 10 vidéos réellement générées par IA (cf. brief), hébergées sur Cloudinary
// (f_auto/q_auto) plutôt que versionnées : voir scripts/upload-video-lab.mjs.
// Légendes descriptives honnêtes du contenu réel — aucun storytelling client inventé.
const videos = computed<VideoLabItem[]>(() => locale.value === 'en' ? [
  { slug: 'porte-parole-studio-fr', src: videoAssets['porte-parole-studio-fr'].src, poster: videoAssets['porte-parole-studio-fr'].poster, title: 'Studio spokesperson (FR)', description: 'AI avatar speaking French in a studio setting.' },
  { slug: 'ceo-face-camera', src: videoAssets['ceo-face-camera'].src, poster: videoAssets['ceo-face-camera'].poster, title: 'CEO addressing the camera', description: 'AI avatar of a tech CEO speaking directly to camera.' },
  { slug: 'ceo-tournage-publicite', src: videoAssets['ceo-tournage-publicite'].src, poster: videoAssets['ceo-tournage-publicite'].poster, title: 'CEO recording a commercial', description: 'AI avatar of a tech CEO shooting an ad-style video.' },
  { slug: 'porte-parole-logiciel-saas', src: videoAssets['porte-parole-logiciel-saas'].src, poster: videoAssets['porte-parole-logiciel-saas'].poster, title: 'Spokesperson presenting software', description: 'AI avatar talking about a software service.' },
  { slug: 'fondateur-cinematique', src: videoAssets['fondateur-cinematique'].src, poster: videoAssets['fondateur-cinematique'].poster, title: 'Cinematic founder-led ad', description: 'Cinematic, founder-style commercial sequence.' },
  { slug: 'laboratoire-spatial-vide', src: videoAssets['laboratoire-spatial-vide'].src, poster: videoAssets['laboratoire-spatial-vide'].poster, title: 'Empty space station lab', description: 'Empty research-lab set aboard a space station.' },
  { slug: 'orbit-lab', src: videoAssets['orbit-lab'].src, poster: videoAssets['orbit-lab'].poster, title: 'Orbit Lab', description: 'Sci-fi orbital laboratory sequence.' },
  { slug: 'scientifique-labo', src: videoAssets['scientifique-labo'].src, poster: videoAssets['scientifique-labo'].poster, title: 'Scientist in a lab', description: 'A scientist examining a sample in a laboratory.' },
  { slug: 'erudit-village-gothique', src: videoAssets['erudit-village-gothique'].src, poster: videoAssets['erudit-village-gothique'].poster, title: 'Scholar in a gothic village', description: 'A scholar walking through a gothic-style village.' },
  { slug: 'joueur-baseball-porcelaine', src: videoAssets['joueur-baseball-porcelaine'].src, poster: videoAssets['joueur-baseball-porcelaine'].poster, title: 'Baseball player (creative test)', description: 'A baseball player shattering porcelain — a creative style test.' },
] : [
  { slug: 'porte-parole-studio-fr', src: videoAssets['porte-parole-studio-fr'].src, poster: videoAssets['porte-parole-studio-fr'].poster, title: 'Porte-parole studio (FR)', description: 'Avatar IA s’exprimant en français dans un décor de studio.' },
  { slug: 'ceo-face-camera', src: videoAssets['ceo-face-camera'].src, poster: videoAssets['ceo-face-camera'].poster, title: 'CEO face caméra', description: 'Avatar IA d’un dirigeant tech s’adressant directement à la caméra.' },
  { slug: 'ceo-tournage-publicite', src: videoAssets['ceo-tournage-publicite'].src, poster: videoAssets['ceo-tournage-publicite'].poster, title: 'CEO en tournage publicitaire', description: 'Avatar IA d’un dirigeant tech dans une séquence de type publicité.' },
  { slug: 'porte-parole-logiciel-saas', src: videoAssets['porte-parole-logiciel-saas'].src, poster: videoAssets['porte-parole-logiciel-saas'].poster, title: 'Porte-parole logiciel', description: 'Avatar IA présentant un service logiciel.' },
  { slug: 'fondateur-cinematique', src: videoAssets['fondateur-cinematique'].src, poster: videoAssets['fondateur-cinematique'].poster, title: 'Publicité cinématique « fondateur »', description: 'Séquence publicitaire cinématique dans un style porté par un fondateur.' },
  { slug: 'laboratoire-spatial-vide', src: videoAssets['laboratoire-spatial-vide'].src, poster: videoAssets['laboratoire-spatial-vide'].poster, title: 'Laboratoire spatial vide', description: 'Décor de laboratoire de recherche vide à bord d’une station spatiale.' },
  { slug: 'orbit-lab', src: videoAssets['orbit-lab'].src, poster: videoAssets['orbit-lab'].poster, title: 'Orbit Lab', description: 'Séquence de laboratoire orbital, style science-fiction.' },
  { slug: 'scientifique-labo', src: videoAssets['scientifique-labo'].src, poster: videoAssets['scientifique-labo'].poster, title: 'Scientifique en laboratoire', description: 'Un scientifique examine un échantillon en laboratoire.' },
  { slug: 'erudit-village-gothique', src: videoAssets['erudit-village-gothique'].src, poster: videoAssets['erudit-village-gothique'].poster, title: 'Érudit dans un village gothique', description: 'Un érudit traverse un village au décor gothique.' },
  { slug: 'joueur-baseball-porcelaine', src: videoAssets['joueur-baseball-porcelaine'].src, poster: videoAssets['joueur-baseball-porcelaine'].poster, title: 'Joueur de baseball (test créatif)', description: 'Un joueur de baseball brisant de la porcelaine — un test de style créatif.' },
])

// Lecture au clic : un seul lecteur actif à la fois, son activé, sans autoplay.
const playingSlug = ref<string | null>(null)
const videoEls = new Map<string, HTMLVideoElement>()

function setVideoRef(el: Element | ComponentPublicInstance | null, slug: string) {
  if (el instanceof HTMLVideoElement) videoEls.set(slug, el)
  else videoEls.delete(slug)
}

function toggle(slug: string) {
  const current = playingSlug.value
  if (current && current !== slug) videoEls.get(current)?.pause()

  const el = videoEls.get(slug)
  if (!el) return

  if (playingSlug.value === slug) {
    el.pause()
    playingSlug.value = null
    return
  }

  el.muted = false
  playingSlug.value = slug
  void el.play().catch(() => { /* lecture bloquée par le navigateur : l'utilisateur peut réessayer via les contrôles natifs */ })
}

function onEnded(slug: string) {
  if (playingSlug.value === slug) playingSlug.value = null
}
</script>
