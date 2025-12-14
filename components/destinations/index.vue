<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import data from '~/rendu.json'

/* DATA */
const portfolio = data.portfolio || []

/* SHOW / TOGGLE */
const show = ref(portfolio.map(() => false))
function toggle(i: number) { show.value[i] = !show.value[i] }

/* Carousel controls */
const carouselRef = ref<HTMLElement | null>(null)
function next() {
  const el = carouselRef.value
  if (!el) return
  const offset = Math.max(el.clientWidth - 48, 260)
  el.scrollBy({ left: offset, behavior: 'smooth' })
}
function prev() {
  const el = carouselRef.value
  if (!el) return
  const offset = Math.max(el.clientWidth - 48, 260)
  el.scrollBy({ left: -offset, behavior: 'smooth' })
}

/* MODAL */
const selectedItem = ref<any | null>(null)
const openModal = (item: any) => { selectedItem.value = item }
const closeModal = () => { selectedItem.value = null }

/* Format descriptions: escape HTML & convert newlines to <br/> */
function formatDesc(text?: string | null) {
  if (!text) return ''
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(/\r\n|\r|\n/g, '<br/>')
}

/* Auto-scroll */
let autoTimer: number | null = null
let autoDir = 1 // 1 = forward, -1 = backward
function startAutoScroll() {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  } catch (e) {}
  stopAutoScroll()
  autoDir = 1
  autoTimer = window.setInterval(() => {
    const el = carouselRef.value
    if (!el) return
    const offset = Math.max(el.clientWidth - 48, 260)

    // If moving forward and near the end, switch direction and step backward
    if (autoDir === 1) {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        autoDir = -1
        el.scrollBy({ left: -offset, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: offset, behavior: 'smooth' })
      }
    } else {
      // moving backward
      if (el.scrollLeft <= 8) {
        autoDir = 1
        el.scrollBy({ left: offset, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: -offset, behavior: 'smooth' })
      }
    }
  }, 4200)
}
function stopAutoScroll() {
  if (autoTimer !== null) {
    window.clearInterval(autoTimer)
    autoTimer = null
  }
}

onMounted(() => { startAutoScroll() })
onUnmounted(() => { stopAutoScroll() })
</script>

<template>
  <section id="realisations" class="p-6 sm:px-20 font-poppins">

    <!-- TITRE -->
    <div class="text-center space-y-3 mb-8">
      <p class="capitalize font-semibold text-gray-600">Nos Réalisations</p>
      <h2 class="text-[#14183E] font-bold text-4xl sm:text-5xl font-volkhov">Ce que nous avons accompli</h2>
    </div>

    <!-- CAROUSEL -->
    <div class="my-6">
      <div class="carousel-wrapper relative" @mouseenter="stopAutoScroll" @mouseleave="startAutoScroll" @touchstart="stopAutoScroll" @touchend="startAutoScroll">
        <button @click="prev" aria-label="Précédent" class="carousel-control left-3">
          ◀
        </button>
        <div ref="carouselRef" class="carousel-viewport">
          <div class="carousel-track">
            <template v-for="(item, i) in portfolio.slice(0, 12)" :key="item.id">
              <div class="carousel-item cursor-pointer" @click="openModal(item)">
                <div class="card-media">
                  <nuxt-img :src="item.image" :alt="item.title" format="webp" class="media-img" />
                </div>
                  <div class="card-body bg-white  rounded-b-3xl px-4 py-3">
                    <div class="flex items-center justify-between mb-2">
                      <p class="font-medium text-gray-700 title">{{ item.title }}</p>
                      <span class="text-xs text-gray-400">Projet</span>
                    </div>
                    <p @click.stop="toggle(i)" class="text-gray-500 desc" :class="{ 'clamped': !show[i] }" v-html="formatDesc(item.shortDescription || item.description)"></p>
                  </div>
              </div>
            </template>
          </div>
        </div>
        <button @click="next" aria-label="Suivant" class="carousel-control right-3">
          ▶
        </button>
      </div>
    </div>

    <!-- MODAL -->
    <teleport to="body">
      <div
        v-if="selectedItem"
        class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-2xl p-8 max-w-3xl w-full relative modal-content">
          <button
            class="absolute top-4 right-4 text-xl text-gray-500"
            @click="closeModal"
          >
            ✕
          </button>

          <nuxt-img
            :src="selectedItem.image"
            :alt="selectedItem.title"
            format="webp"
            class="w-full h-80 object-contain rounded-xl mb-6"
          />

          <h3 class="text-2xl font-bold mb-3 text-[#14183E]">
            {{ selectedItem.title }}
          </h3>

          <p class="text-gray-600 leading-relaxed" v-html="formatDesc(selectedItem.description)"></p>
        </div>
      </div>
    </teleport>

  </section>
</template>

<style scoped>
/* Carousel base */
.carousel-wrapper { position: relative; }
.carousel-viewport {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 0.5rem;
}
.carousel-track { display:flex; gap:1.5rem; padding:0.5rem 1rem; }

/* Cards: fixed height ensures uniform layout */
.carousel-item {
  flex: 0 0 280px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  height: 380px;
  border-radius: 0.75rem;
  overflow: hidden;
  background: transparent;
}

.card-media { flex: 0 0 55%; overflow: hidden; }
.card-media img,
.card-media picture img,
.card-media .media-img { width: 100%; height: 100%; object-fit: cover; display: block; }

.card-body { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; }
.card-body .title { font-size: 15px; line-height: 1.2; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: normal; }
.card-body .desc { margin-top: 0.25rem; color: #6B7280; line-height: 1.3; font-size: 13.5px; white-space: pre-wrap; }
.card-body .desc.clamped {
  /* clamp visually while preserving explicit line breaks */
  max-height: calc(1.3em * 3);
  overflow: hidden;
}
.card-body .desc:not(.clamped) { max-height: none; }

.carousel-control { position: absolute; top: 50%; transform: translateY(-50%); z-index: 20; width: 40px; height: 40px; display:grid; place-items:center; border-radius:9999px; background: rgba(255,255,255,0.9); box-shadow: 0 6px 18px rgba(12,22,52,0.08); }
.carousel-control.left-3 { left: 8px }
.carousel-control.right-3 { right: 8px }

/* responsive: show more items at larger widths */
@media (min-width: 1024px) {
  .carousel-item { flex: 0 0 calc((100% - 2rem) / 3); }
}
@media (min-width: 640px) and (max-width: 1023px) {
  .carousel-item { flex: 0 0 calc((100% - 1rem) / 2); }
}

/* hide scroll bar */
.carousel-viewport::-webkit-scrollbar { display: none; }
.carousel-viewport { -ms-overflow-style: none; scrollbar-width: none; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .carousel-viewport { scroll-behavior: auto; }
}

/* Modal scrollable content */
.modal-content {
  max-height: calc(100vh - 96px);
  overflow: auto;
}
.modal-content::-webkit-scrollbar { width: 10px; }
.modal-content::-webkit-scrollbar-thumb { background: rgba(16,24,40,0.06); border-radius: 6px; }


</style>
