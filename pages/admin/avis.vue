<template><div>
  <h1 class="text-3xl font-bold">Avis clients</h1>
  <p class="mt-2 text-[var(--muted)]">Modérez les avis soumis depuis /avis avant publication.</p>
  <section v-if="pending.length" class="mt-8"><h2 class="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">À modérer ({{ pending.length }})</h2>
    <div class="mt-3 space-y-3"><article v-for="item in pending" :key="item._id" class="card">
      <div class="flex flex-wrap items-start justify-between gap-3"><div><p class="font-bold">{{ item.name }}<span v-if="item.role" class="ml-2 text-xs font-normal text-[var(--muted)]">{{ item.role }}</span></p><p v-if="item.email" class="text-xs text-[var(--muted)]">{{ item.email }}</p></div><div class="flex gap-2"><button class="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700" @click="setStatus(item,'published')">Publier</button><button class="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700" @click="setStatus(item,'rejected')">Rejeter</button></div></div>
      <p class="mt-3 text-sm leading-6">« {{ item.text }} »</p>
    </article></div>
  </section>
  <section class="mt-10"><h2 class="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Publiés ({{ published.length }})</h2>
    <div class="mt-3 space-y-3"><article v-for="item in published" :key="item._id" class="card flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="flex-1"><p class="font-bold">{{ item.name }}<span v-if="item.role" class="ml-2 text-xs font-normal text-[var(--muted)]">{{ item.role }}</span><span class="ml-2 rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase text-[var(--muted)]">{{ item.source }}</span></p><p class="mt-1 text-sm text-[var(--muted)]">« {{ item.text }} »</p></div>
      <button class="rounded-lg border px-3 py-2 text-xs font-bold" @click="setStatus(item,'pending')">Dépublier</button>
      <button class="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700" @click="remove(item._id)">Supprimer</button>
    </article></div>
  </section>
  <section v-if="rejected.length" class="mt-10"><h2 class="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Rejetés ({{ rejected.length }})</h2>
    <div class="mt-3 space-y-3"><article v-for="item in rejected" :key="item._id" class="card flex flex-col gap-3 sm:flex-row sm:items-center opacity-60">
      <div class="flex-1"><p class="font-bold">{{ item.name }}</p><p class="mt-1 text-sm">« {{ item.text }} »</p></div>
      <button class="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700" @click="remove(item._id)">Supprimer</button>
    </article></div>
  </section>
</div></template>
<script setup lang="ts">
definePageMeta({middleware:'admin',layout:'admin',i18n:{locales:['fr']}})
useSeoMeta({title:'Avis clients',robots:'noindex,nofollow'})
const {data,refresh}=await useFetch<any>('/api/admin/testimonials')
const pending=computed(()=>(data.value?.items||[]).filter((i:any)=>i.status==='pending'))
const published=computed(()=>(data.value?.items||[]).filter((i:any)=>i.status==='published'))
const rejected=computed(()=>(data.value?.items||[]).filter((i:any)=>i.status==='rejected'))
async function setStatus(item:any,status:string){await $fetch(`/api/admin/testimonials/${item._id}`,{method:'PATCH',body:{status}});await refresh()}
async function remove(id:string){if(confirm('Supprimer cet avis ?')){await $fetch(`/api/admin/testimonials/${id}`,{method:'DELETE'});await refresh()}}
</script>
