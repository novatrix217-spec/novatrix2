<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#0E0320]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="gate-title" @click.self="close">
        <div class="modal-panel my-8 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#160630] text-white shadow-2xl">
          <div class="gradient-action flex items-center justify-between px-6 py-4"><div class="flex items-center gap-2"><Download class="h-5 w-5"/><p class="font-semibold">Accéder à la ressource</p></div><button class="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10" aria-label="Fermer" @click="close"><X class="h-5 w-5"/></button></div>
          <div class="p-6">
            <p class="font-mono text-[10px] uppercase tracking-[.16em] text-[#3DE0C5]">{{ resource.type }} · accès protégé</p>
            <h2 id="gate-title" class="mt-2 text-2xl font-bold">{{ resource.title }}</h2>
            <p class="mt-2 text-sm leading-6 text-white/55">Renseignez ces informations pour recevoir un lien personnel et temporaire.</p>
            <form class="mt-6 grid gap-4 sm:grid-cols-2" @submit.prevent="submit">
              <label class="text-xs text-white/70">Prénom *<input v-model.trim="form.firstName" class="field mt-1.5 !border-white/15 !bg-white/5 !text-white" required maxlength="80" autocomplete="given-name"/></label>
              <label class="text-xs text-white/70">Email professionnel *<input v-model.trim="form.email" class="field mt-1.5 !border-white/15 !bg-white/5 !text-white" required type="email" maxlength="320" autocomplete="email"/></label>
              <label class="text-xs text-white/70">Téléphone *<input v-model.trim="form.phone" class="field mt-1.5 !border-white/15 !bg-white/5 !text-white" required type="tel" maxlength="30" autocomplete="tel"/></label>
              <label class="text-xs text-white/70">Entreprise / domaine *<input v-model.trim="form.domain" class="field mt-1.5 !border-white/15 !bg-white/5 !text-white" required maxlength="120" autocomplete="organization"/></label>
              <input v-model="form.website" tabindex="-1" autocomplete="off" class="absolute -left-[9999px]" aria-hidden="true"/>
              <label class="col-span-full flex items-start gap-3 text-xs leading-5 text-white/60"><input v-model="form.consent" type="checkbox" required class="mt-1 h-4 w-4 accent-violet-600"/>J’accepte que NovatrixAI utilise ces informations pour m’envoyer la ressource et me recontacter. <NuxtLink to="/confidentialite" class="text-[#3DE0C5] underline">Confidentialité</NuxtLink></label>
              <p v-if="errorMessage" class="col-span-full rounded-lg bg-red-500/10 p-3 text-sm text-red-200">{{ errorMessage }}</p>
              <button class="btn-primary col-span-full w-full" :disabled="pending"><LoaderCircle v-if="pending" class="h-4 w-4 animate-spin"/><Download v-else class="h-4 w-4"/>{{ pending ? 'Validation…' : 'Recevoir la ressource' }}</button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { Download,LoaderCircle,X } from 'lucide-vue-next'
import type { PublicResource } from '~/shared/types'
const props=defineProps<{open:boolean;resource:PublicResource}>();const emit=defineEmits<{close:[]}>()
const form=reactive({firstName:'',email:'',phone:'',domain:'',consent:false,website:'',resourceSlug:props.resource.slug,source:'resource'})
const pending=ref(false),errorMessage=ref('')
function close(){if(!pending.value)emit('close')}
async function submit(){pending.value=true;errorMessage.value='';try{const data=await $fetch<{downloadUrl:string}>('/api/leads',{method:'POST',body:{...form,resourceSlug:props.resource.slug,utm:{source:useRoute().query.utm_source,medium:useRoute().query.utm_medium,campaign:useRoute().query.utm_campaign}}});await navigateTo({path:'/merci',query:{download:data.downloadUrl,title:props.resource.title}})}catch(e:any){errorMessage.value=e?.data?.statusMessage||'Impossible de valider la demande. Réessayez dans un instant.'}finally{pending.value=false}}
watch(()=>props.open,v=>{if(import.meta.client)document.body.style.overflow=v?'hidden':''});onBeforeUnmount(()=>{if(import.meta.client)document.body.style.overflow=''})
</script>
