<script setup>
import SatelightSVG from "~/components/global/svg/SatelightSVG.vue";
import AeroplaneSVG from "~/components/global/svg/AeroplaneSVG.vue";
import MicrophoneSVG from "~/components/global/svg/MicrophoneSVG.vue";
import CogSVG from "~/components/global/svg/CogSVG.vue";
import PlusPlusSVG from "~/components/global/svg/PlusPlusSVG.vue";
</script>

<template>
  <section id="services" class="p-6">
    <div class="text-center space-y-3 relative">
      <p class="uppercase font-semibold text-[#F1A501]">Nos Services</p>
      <h2 class="text-[#181E4B] font-bold text-4xl sm:text-5xl font-volkhov">
        Des solutions adaptées à vos besoins
      </h2>
      <PlusPlusSVG />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-8 sm:p-0 gap-8 sm:gap-16 items-center my-4 sm:my-12 text-center"
    >
      <div class="relative group">
        <div
          class="space-y-3 cursor-pointer mt-2 group-hover:border group-hover:border-[#F1A501] p-12 sm:px-6 sm:py-12 group-hover:rounded-3xl group-hover:z-20 group-hover:bg-white group-hover:drop-shadow-2xl"
        >
          <SatelightSVG />
          <p class="text-[#181E4B] font-semibold">Développement Web</p>
          <p class="text-xs text-gray-500">
            Création de sites web performants, modernes et adaptés à vos besoins
            professionnels.
          </p>
        </div>
        <svg
          class="hidden group-hover:block group-hover:absolute group-hover:-bottom-4 group-hover:w-20 group-hover:-left-4 group-hover:-z-10"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H100V90C100 95.5228 95.5229 100 90 100H0V30Z"
            fill="#F1A501"
          />
        </svg>
      </div>
      <div class="relative group">
        <div
          class="space-y-3 cursor-pointer mt-0 group-hover:border group-hover:border-[#F1A501] px-6 py-12 group-hover:rounded-3xl group-hover:z-20 group-hover:bg-white group-hover:drop-shadow-2xl"
        >
          <AeroplaneSVG />
          <p class="text-[#181E4B] font-semibold">Applications Mobiles</p>
          <p class="text-xs text-gray-500">
            Développez des applications mobiles intuitives et robustes pour iOS
            et Android.
          </p>
        </div>
        <svg
          class="hidden group-hover:block group-hover:absolute group-hover:-bottom-4 group-hover:w-20 group-hover:-left-4 group-hover:-z-10"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H100V90C100 95.5228 95.5229 100 90 100H0V30Z"
            fill="#F1A501"
          />
        </svg>
      </div>
      <div class="relative group">
        <div
          class="space-y-3 cursor-pointer mt-0 group-hover:border group-hover:border-[#F1A501] px-6 py-12 group-hover:rounded-3xl group-hover:z-20 group-hover:bg-white group-hover:drop-shadow-2xl"
        >
          <MicrophoneSVG />
          <p class="text-[#181E4B] font-semibold">Création de Modèles IA</p>
          <p class="text-xs text-gray-500">
            Développez des modèles d’intelligence artificielle sur mesure pour
            vos projets.
          </p>
        </div>
        <svg
          class="hidden group-hover:block group-hover:absolute group-hover:-bottom-4 group-hover:w-20 group-hover:-left-4 group-hover:-z-10"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H100V90C100 95.5228 95.5229 100 90 100H0V30Z"
            fill="#F1A501"
          />
        </svg>
      </div>
      <div class="relative group">
        <div
          class="space-y-3 cursor-pointer group-hover:border group-hover:border-[#F1A501] px-6 py-12 group-hover:rounded-3xl group-hover:z-20 group-hover:bg-white group-hover:drop-shadow-2xl"
        >
          <CogSVG />
          <p class="text-[#181E4B] font-semibold">
            Automatisation & Intégration IA
          </p>
          <p class="text-xs text-gray-500">
            Rationalisez vos processus avec des solutions d'automatisation et
            d'intégration de l'IA.
          </p>
        </div>
        <svg
          class="hidden group-hover:block group-hover:absolute group-hover:-bottom-4 group-hover:w-20 group-hover:-left-4 group-hover:-z-10"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H100V90C100 95.5228 95.5229 100 90 100H0V30Z"
            fill="#F1A501"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
