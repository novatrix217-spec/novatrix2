<script setup>
import Header from "./Header.vue";
import { ref, onMounted } from "vue";

const inView = ref(false);
onMounted(() => {
  requestAnimationFrame(() => (inView.value = true));
});
</script>

<style scoped>
.cta-btn {
  transform: translateY(12px);
  opacity: 0;
  transition: transform 600ms cubic-bezier(.22,.9,.3,1), box-shadow 200ms, opacity 500ms;
}
.cta-btn.in-view {
  transform: translateY(0);
  opacity: 1;
  box-shadow: 0 10px 30px rgba(26,115,232,0.18);
}
.cta-btn:hover {
  transform: translateY(-4px) scale(1.02);
}

.cta-btn .label {
  display: inline-block;
  position: relative;
  z-index: 1;
}
.cta-btn .arrow {
  display: inline-block;
  margin-left: 10px;
  transition: transform 250ms ease, opacity 250ms ease;
  opacity: 0.95;
  transform: translateX(0);
}
.cta-btn:hover .arrow {
  transform: translateX(6px);
}
.cta-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(26,115,232,0.14);
}

.cta-btn.in-view {
  animation: cta-entrance 600ms cubic-bezier(.22,.9,.3,1) both, cta-float 6s ease-in-out 900ms infinite;
}
@keyframes cta-float {
  0% { transform: translateY(0); }
  25% { transform: translateY(-4px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(2px); }
  100% { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .cta-btn, .cta-btn .arrow, .side-image { animation: none !important; transition: none !important; }
}

/* Shimmer / scintillement */
.cta-btn {
  position: relative;
  overflow: hidden;
}
.cta-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.02) 100%);
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 300ms ease;
  pointer-events: none;
  mix-blend-mode: overlay;
}
.cta-btn.in-view::before {
  animation: shimmer-full 2200ms linear 600ms infinite;
  opacity: 1;
}
@keyframes shimmer-full {
  0% { transform: translateX(-120%); opacity: 0; }
  10% { opacity: 0.7; }
  50% { transform: translateX(0%); opacity: 0.85; }
  90% { opacity: 0.2; }
  100% { transform: translateX(120%); opacity: 0; }
}

/* small sparkle dot that occasionally pulses (kept subtle) */
.cta-btn::after {
  content: "";
  position: absolute;
  top: 18%;
  right: 10%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 70%);
  box-shadow: 0 0 8px rgba(255,255,255,0.6);
  opacity: 0;
  transform: translateY(0) scale(0.8);
  pointer-events: none;
}
.cta-btn.in-view::after {
  animation: sparkle 4200ms ease-in-out 1200ms infinite;
}
@keyframes sparkle {
  0% { opacity: 0; transform: translateY(0) scale(0.6); }
  8% { opacity: 1; transform: translateY(-2px) scale(1); }
  30% { opacity: 0.6; transform: translateY(0) scale(0.9); }
  100% { opacity: 0; transform: translateY(0) scale(0.6); }
}

@media (prefers-reduced-motion: reduce) {
  .cta-btn::before, .cta-btn::after { animation: none !important; opacity: 0 !important; }
}
@keyframes cta-entrance {
  from { transform: translateY(12px) scale(0.995); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.side-image {
  opacity: 0;
  transform: translateX(30px) scale(0.98);
  transition: transform 900ms cubic-bezier(.22,.9,.3,1), opacity 800ms;
  will-change: transform, opacity;
  display: block;
}
.side-image.in-view {
  opacity: 1;
  transform: translateX(0) scale(1);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(4px) translateY(-8px); }
  100% { transform: translateX(0) translateY(0); }
}

.image-container { position: relative; }

</style>

<template>
  <div class="relative overflow-hidden">
    <section
      class="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 px-5 py-2 sm:px-10 sm:py-4 md:px-16 md:py-5 lg:px-20 lg:py-6"
    >
      <div class="space-y-6 sm:space-y-8 md:space-y-10">
        <p class="uppercase font-poppins text-xs sm:text-sm text-blue-600 font-bold tracking-wide">
          Révolutionnez votre futur avec NovatrixAi
        </p>
        <div
          class="font-volkhov font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 leading-tight"
        >
          <div class="flex space-x-2 sm:space-x-3 flex-wrap items-center">
            <div>Innover,</div>
            <div class="relative">
              exceller
              <svg
                class="absolute bottom-0 -left-2 sm:-left-4 w-28 sm:w-36 md:w-44 lg:w-60 xl:w-80"
                viewBox="0 0 385 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_1_121"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="385"
                  height="12"
                >
                  <rect width="385" height="12" fill="#C4C4C4" />
                </mask>
              </svg>
            </div>
          </div>
          <div class="mt-2 sm:mt-3">et redéfinir les limites du possible</div>
        </div>
        <p class="font-poppins text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
          Chez NovatrixAi, nous vous accompagnons dans l’intégration des
          technologies de pointe pour atteindre vos objectifs stratégiques.
          Ensemble, façonnons un avenir plus intelligent.
        </p>
        <div class="flex items-center">
          <NuxtLink
            to="/services"
            type="button"
            aria-label="Découvrir nos solutions"
            class="cta-btn block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base font-poppins rounded-full shadow-md hover:shadow-xl relative overflow-hidden"
            :class="{ 'in-view': inView }"
          >
            <span class="label">Découvrir nos solutions</span>
            <span class="arrow" aria-hidden="true">➜</span>
          </NuxtLink>
        </div>
      </div>
      <div class="image-container mt-8 md:mt-0">
        <nuxt-picture
          src="/images/hero.png"
          width="765"
          alt="Illustration futuriste"
          class="side-image w-full h-auto max-w-full"
          :class="{ 'in-view': inView }"
        />
        <svg
          class="absolute top-0 right-0 w-48 sm:w-64 md:w-96 lg:w-[28rem] xl:w-[35rem] -z-10 opacity-90"
          viewBox="0 0 704 724"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3069 222C-18.0931 153.2 5.4736 13.3333 22.3069 -48L701.807 -149L766.307 122.5L727.807 723.5C649.14 724.5 473.707 717 401.307 679C310.807 631.5 351.807 555 276.807 515C201.807 475 244.807 369.5 218.807 329.5C192.807 289.5 72.8069 308 22.3069 222Z"
            fill="#E0EEFF"
          />
        </svg>
      </div>
    </section>
  </div>
</template>
