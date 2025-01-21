<script setup>
import Header from "./Header.vue";
</script>
<style scoped>
.animated-image {
  display: block; /* Optionnel, pour s'assurer que l'image est traitée comme un bloc */
  animation: vertical-move 1s infinite alternate ease-in-out;
}

@keyframes vertical-move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px); /* Ajustez la distance selon vos besoins */
  }
}
</style>

<template>
  <div class="relative">
    <Header />
    <section
      class="w-full grid grid-cols-1 md:grid-cols-2 items-start p-5 sm:p-20 my-2"
    >
      <div class="space-y-10">
        <p class="uppercase font-poppins text-sm text-[#1A73E8] font-bold">
          Révolutionnez votre futur avec NovatrixAi
        </p>
        <div
          class="font-volkhov font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#101828]"
        >
          <div class="flex space-x-3">
            <div>Innover,</div>
            <div class="relative">
              exceller
              <svg
                class="absolute bottom-0 -left-4 w-44 sm:w-80"
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
          <div>et redéfinir les limites du possible</div>
        </div>
        <p class="font-poppins text-gray-600 text-sm">
          Chez NovatrixAi, nous vous accompagnons dans l’intégration des
          technologies de pointe pour atteindre vos objectifs stratégiques.
          Ensemble, façonnons un avenir plus intelligent.
        </p>
        <div class="flex items-center space-x-4">
          <a
            href="#realisations"
            type="button"
            aria-label="Découvrir nos solutions"
            class="animated-image block bg-[#1A73E8] text-white px-6 py-3 text-sm font-poppins rounded-md shadow-md hover:bg-[#1662C4]"
          >
            Découvrir nos solutions
          </a>
        </div>
      </div>
      <div class="image-container">
        <nuxt-picture
          src="/images/hero.png"
          width="765"
          alt="Illustration futuriste"
          class="animated-image"
        />
        <svg
          class="absolute top-0 right-0 w-[35rem] -z-10"
          viewBox="0 0 704 724"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3069 222C-18.0931 153.2 5.4736 13.3333 22.3069 -48L701.807 -149L766.307 122.5L727.807 723.5C649.14 724.5 473.707 717 401.307 679C310.807 631.5 351.807 555 276.807 515C201.807 475 244.807 369.5 218.807 329.5C192.807 289.5 72.8069 308 22.3069 222Z"
            fill="#EAF3FF"
          />
        </svg>
      </div>
    </section>
  </div>
</template>
