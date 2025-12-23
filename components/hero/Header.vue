<script setup>
import Logo from "../global/Logo.vue";
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const mobileMenuOpen = ref(false);
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  position: relative;
}

.router-link-active::after,
.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
  border-radius: 2px;
}

.mobile-link.router-link-active,
.mobile-link.router-link-exact-active {
  background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<template>
  <div
    class="p-5 sm:px-16 sm:py-6 flex items-center w-full justify-between font-poppins"
  >
    <Logo />
    <div class="hidden lg:flex items-center space-x-20">
      <ul class="flex items-center space-x-12">
        <li><NuxtLink to="/">Accueil</NuxtLink></li>
        <li><NuxtLink to="/services">Services</NuxtLink></li>
        <li><NuxtLink to="/realisations">Réalisations</NuxtLink></li>
        <li><NuxtLink to="/a-propos">À propos</NuxtLink></li>
      </ul>
      <ul class="flex items-center space-x-8">
        <li>
          <NuxtLink
            to="#contact"
            class="border-2 rounded-lg px-3 py-2 border-gray-900"
            >Nous contacter</NuxtLink
          >
        </li>
      </ul>
    </div>
    <button
      class="lg:hidden block"
      @click="mobileMenuOpen = true"
      aria-label="hamburger-button"
    >
      <Icon name="icon-park-outline:hamburger-button" class="w-6 h-auto" />
    </button>

    <Dialog
      as="div"
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">NovatrixAi</span>
            <Logo />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
            aria-label="close"
          >
            <span class="sr-only">Fermer le menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                to="/"
                class="mobile-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
                >Accueil</NuxtLink
              >
              <NuxtLink
                to="/services"
                class="mobile-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
                >Services</NuxtLink
              >
              <NuxtLink
                to="/realisations"
                class="mobile-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
                >Réalisations</NuxtLink
              >
              <NuxtLink
                to="/a-propos"
                class="mobile-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
                >À propos</NuxtLink
              >
              <NuxtLink
                to="/#contact"
                class="mobile-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                @click="mobileMenuOpen = false"
                >Contact</NuxtLink
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </div>
</template>
