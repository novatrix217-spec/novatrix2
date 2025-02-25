<template>
  <footer class="px-5 sm:px-16 sm:p6 mt12">
    <div
      class="w-full text-center p-12 sm:p-0 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-10 gap-20 md:gap-12 lg:gap-20"
    >
      <div class="col-span-4 space-y-3">
        <NuxtLink to="/" class="text-[#181E4B] font-medium text-5xl"
          >Novatrix AI</NuxtLink
        >
        <p class="text-[#080809] text-xs font-light">
          Grâce à l'IA nous donnons vie à vos projets
        </p>
      </div>

      <div class="col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div class="space-y-4 col-span-2">
          <p class="font-bold text-lg">Liens rapides</p>
          <div class="space-y-2">
            <NuxtLink to="#a-propos" class="block text-[#5E6282]"
              >À propos</NuxtLink
            >
            <NuxtLink to="#services" class="block text-[#5E6282]"
              >Services</NuxtLink
            >
            <NuxtLink to="#realisations" class="block text-[#5E6282]"
              >Réalisations</NuxtLink
            >
          </div>
        </div>
        <div class="space-y-4">
          <p class="font-bold text-lg">Contacts</p>
          <div
            id="contact"
            class="space-x-0 mx-auto items-center justify-center"
          >
            <NuxtLink
              target="_blank"
              to="https://www.linkedin.com/company/novatrix-dev/"
              class="flex items-center space-x-3 justify-start text-[#5E6282]"
            >
              <SvgLinkedinSVG />
              <div>Novatrix AI</div></NuxtLink
            >
            <a
              href="mailto:mrdeck30@gmail.com"
              class="flex items-center space-x-2"
            >
              <div
                to="mailto:mrdeck30@gmail.com"
                class="flex items-center space-x-2 justify-start text-[#5E6282]"
              >
                <SvgEmailSVG />
              </div>
              <div>mrdeck30@gmail.com</div></a
            >

            <NuxtLink
              target="_blank"
              to="https://wa.me/22952746912"
              style="position: relative; right: 5px"
              class="flex items-center space-x- justify-start text-[#5E6282]"
            >
              <SvgWhatsappSVG />
              <div>+229 01 52 74 69 12</div>
            </NuxtLink>
            <NuxtLink
              target="_blank"
              to="https://comeup.com/fr/@novatrixai"
              style="position: relative; right: 5px"
              class="flex items-center space-x- justify-start text-[#5E6282]"
            >
              <Img src="/images/channels4_profile.jpg" width="30em" alt="Profil comeup Novatrix AI" class="me-2 rounded" ></Img>
              <div>@novatrixai</div>
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
      Made with ❤️, <a href="/" class="text-indigo-600">Novatrix AI</a> team
    </p>
  </footer>
</template>
