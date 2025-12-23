<template>
  <footer class="px-5 sm:px-16 sm:p6 mt12 overflow-hidden">
    <div
      class="w-full text-center p-6 sm:p-12 md:p-0 space-y-6 sm:space-y-4 md:space-y-0 md:grid md:grid-cols-10 gap-8 md:gap-12 lg:gap-20"
    >
      <div class="col-span-4 space-y-3">
        <NuxtLink to="/" class="flex items-center justify-center md:justify-start">
          <span class="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style="display: flex; align-items: center; gap: 0;">
            <span style="background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">N</span><img src="/logo.png" alt="" class="inline-block w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10" style="margin: 0 -2px; position: relative; top: 3px;" /><span style="background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">vatrix </span><span style="background: linear-gradient(135deg, #9333EA 0%, #2563EB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">AI</span>
          </span>
        </NuxtLink>
        <p class="text-[#080809] text-xs sm:text-sm font-light text-center md:text-left">
          Grâce à l'IA nous donnons vie à vos projets
        </p>
      </div>

      <div class="col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div class="space-y-4 col-span-2 text-center md:text-left">
          <p class="font-bold text-lg">Liens rapides</p>
          <div class="space-y-2">
            <NuxtLink to="/" class="block text-[#5E6282]"
              >Accueil</NuxtLink
            >
            <NuxtLink to="/a-propos" class="block text-[#5E6282]"
              >À propos</NuxtLink
            >
            <NuxtLink to="/services" class="block text-[#5E6282]"
              >Services</NuxtLink
            >
            <NuxtLink to="/realisations" class="block text-[#5E6282]"
              >Réalisations</NuxtLink
            >
          </div>
        </div>
        <div class="space-y-2 text-center md:text-left">
          <p class="font-bold text-base sm:text-lg mb-3">Contacts</p>
          <div
            id="contact"
            class="space-y-3 flex flex-col items-center md:items-start"
          >
            <NuxtLink
              target="_blank"
              to="https://wa.me/2290163774295"
              class="flex items-center gap-2 text-[#5E6282]"
            >
              <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <SvgWhatsappSVG class="w-6 h-6" />
              </div>
              <div>+229 01 63 77 42 95</div>
            </NuxtLink>
            <NuxtLink
              target="_blank"
              to="https://comeup.com/fr/@novatrixai"
              class="flex items-center gap-2 text-[#5E6282]"
            >
              <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <img src="/images/channels4_profile.jpg" width="24" height="24" alt="Profil comeup Novatrix AI" class="rounded w-6 h-6 object-cover" />
              </div>
              <div>@novatrixai</div>
            </NuxtLink>
            <NuxtLink
              target="_blank"
              to="https://www.linkedin.com/company/novatrix-dev/"
              class="flex items-center gap-2 text-[#5E6282]"
            >
              <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <SvgLinkedinSVG class="w-6 h-6" />
              </div>
              <div>Novatrix AI</div></NuxtLink
            >
            <a
              href="mailto:novatrix217@gmail.com"
              class="flex items-center gap-2 text-[#5E6282]"
            >
              <div class="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <SvgEmailSVG class="w-6 h-6" />
              </div>
              <div>novatrix217@gmail.com</div></a
            >
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
      Made with ❤️, <a href="/" class="text-indigo-600">Novatrix AI</a> team
    </p>
  </footer>
</template>
