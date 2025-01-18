<template>
  <footer class="p-5 sm:px-16 sm:py-6 mt-12">
    <div
      class="w-full text-center p-12 sm:p-0 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-10 gap-20 md:gap-12 lg:gap-20"
    >
      <div class="col-span-4 space-y-3">
        <NuxtLink to="/" class="text-[#181E4B] font-medium text-5xl"
          >Novatrix AI</NuxtLink
        >
        <p class="text-[#080809] text-xs font-light">
          Réservez votre voyage en toute simplicité
        </p>
      </div>

      <div class="col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div class="space-y-4 col-span-2">
          <p class="font-bold text-lg">Liens rapides</p>
          <div class="space-y-2">
            <NuxtLink to="/about" class="block text-[#5E6282]"
              >À propos</NuxtLink
            >
            <NuxtLink to="/careers" class="block text-[#5E6282]"
              >Services</NuxtLink
            >
            <NuxtLink to="/careers" class="block text-[#5E6282]"
              >Réalisations</NuxtLink
            >
          </div>
        </div>
        <div class="space-y-4">
          <p class="font-bold text-lg">Contacts</p>
          <div class="space-x-4 flex mx-auto items-center justify-center">
            <NuxtLink
              target="_blank"
              to="https://www.linkedin.com/company/novatrix-dev/"
              class="block text-[#5E6282]"
            >
              <SvgLinkedinSVG
            /></NuxtLink>
            <NuxtLink
              target="_blank"
              to="mailto:mrdeck30@gmail.com"
              class="block text-[#5E6282]"
            >
              <Icon size="3em" name="mdi:email" />
            </NuxtLink>
            <NuxtLink
              target="_blank"
              to="https://wa.me/22952746912"
              class="block text-[#5E6282]"
            >
              <SvgWhatsappSVG />
            </NuxtLink>
          </div>
        </div>
        <!-- <div class="space-y-4">
          <p class="font-bold text-lg">Réseaux sociaux</p>
          <div class="space-y-2">
            <a href="https://www.instagram.com" class="block text-[#5E6282]"
              >Instagram</a
            >
            <a href="https://twitter.com" class="block text-[#5E6282]"
              >Twitter</a
            >
          </div>
        </div> -->
      </div>

      <!-- <div class="col-span-2 flex items-center justify-center space-x-3">
        <nuxt-picture
          src="/images/GooglePlay.jpg"
          alt="GooglePlay"
          width="107"
          height="35"
        />
        <nuxt-picture
          src="/images/PlayStore.jpg"
          alt="PlayStore"
          width="100"
          height="35"
        />
      </div> -->
    </div>

    <p class="text-center text-xs text-[#5E6282] mb-8 sm:mt-8">
      Made with ❤️, <a href="/" class="text-indigo-600">Novatrix AI</a>
    </p>
  </footer>
</template>
