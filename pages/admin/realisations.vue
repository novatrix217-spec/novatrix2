<template><div><div class="flex items-end justify-between"><div><h1 class="text-3xl font-bold">Réalisations</h1><p class="mt-2 text-[var(--muted)]">Études de cas publiques. Les entrées importées de ComeUp démarrent minimales — enrichissez-les ici.</p></div></div>
  <div class="mt-8 grid gap-7 xl:grid-cols-[.9fr_1.1fr]">
    <form class="card space-y-4" @submit.prevent="save">
      <h2 class="text-xl font-bold">{{ editingId ? 'Modifier la réalisation' : 'Nouvelle réalisation' }}</h2>
      <input v-model="form.title" class="field" placeholder="Titre" required/>
      <div class="grid grid-cols-2 gap-3"><input v-model="form.category" class="field" placeholder="Catégorie" required/><input v-model="form.deliveryDays" class="field" type="number" min="1" placeholder="Délai (jours)"/></div>
      <div class="flex items-center gap-4"><img v-if="coverUrl" :src="coverUrl" alt="" class="h-16 w-24 rounded-lg object-cover"/><div class="flex-1"><input type="file" accept="image/png,image/jpeg,image/webp" class="block w-full text-sm" @change="uploadCover"/><p v-if="coverNotice" class="mt-1 text-xs text-[var(--muted)]">{{ coverNotice }}</p></div></div>
      <textarea v-model="form.summary" class="field min-h-20 py-3" placeholder="Résumé (1-2 phrases, affiché sur la carte)" required/>
      <textarea v-model="form.challenge" class="field min-h-20 py-3" placeholder="Le défi (optionnel)"/>
      <textarea v-model="form.solution" class="field min-h-20 py-3" placeholder="La solution (optionnel)"/>
      <textarea v-model="form.featuresRaw" class="field min-h-20 py-3" placeholder="Fonctionnalités clés, une par ligne"/>
      <div class="grid grid-cols-2 gap-3"><input v-model="form.quoteBeforeText" class="field" placeholder="Citation « avant » (optionnel)"/><input v-model="form.quoteBeforeAuthor" class="field" placeholder="Auteur"/></div>
      <div class="grid grid-cols-2 gap-3"><input v-model="form.quoteAfterText" class="field" placeholder="Citation « après » (optionnel)"/><input v-model="form.quoteAfterAuthor" class="field" placeholder="Auteur"/></div>
      <textarea v-model="form.metricsRaw" class="field min-h-16 py-3" placeholder="Résultats chiffrés : une ligne par métrique, format « valeur | libellé »"/>
      <input v-model="form.toolsRaw" class="field" placeholder="Outils, séparés par des virgules"/>
      <div class="flex items-center gap-4"><select v-model="form.status" class="field"><option value="draft">Brouillon</option><option value="published">Publié</option></select><label class="flex items-center gap-2 text-sm"><input v-model="form.featured" type="checkbox"/>Mettre en avant</label></div>
      <p v-if="notice" class="text-sm text-violet-700">{{ notice }}</p>
      <div class="flex gap-3"><button class="btn-primary flex-1">{{ editingId ? 'Enregistrer' : 'Créer' }}</button><button v-if="editingId" type="button" class="rounded-lg border px-4 text-sm font-bold" @click="resetForm">Annuler</button></div>
    </form>
    <div class="space-y-3">
      <article v-for="item in data?.items" :key="item._id" class="card flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="flex-1"><p class="font-bold">{{ item.title }}</p><p class="mt-1 text-xs text-[var(--muted)]">{{ item.category }} · {{ item.status==='published'?'Publié':'Brouillon' }}{{ item.featured ? ' · vedette' : '' }}{{ item.source==='comeup' ? ' · ComeUp' : '' }}</p></div>
        <button class="rounded-lg border px-3 py-2 text-xs font-bold" @click="edit(item)">Modifier</button>
        <button class="rounded-lg border px-3 py-2 text-xs font-bold" @click="toggleStatus(item)">{{ item.status==='published'?'Dépublier':'Publier' }}</button>
        <button class="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700" @click="remove(item._id)">Supprimer</button>
      </article>
    </div>
  </div>
</div></template>
<script setup lang="ts">
definePageMeta({middleware:'admin',layout:'admin',i18n:{locales:['fr']}})
useSeoMeta({title:'Réalisations',robots:'noindex,nofollow'})
const {data,refresh}=await useFetch<any>('/api/admin/projects')
const notice=ref(''),editingId=ref('')
const blank=()=>({title:'',category:'Acquisition',deliveryDays:'',summary:'',challenge:'',solution:'',featuresRaw:'',quoteBeforeText:'',quoteBeforeAuthor:'',quoteAfterText:'',quoteAfterAuthor:'',metricsRaw:'',toolsRaw:'',status:'draft',featured:false,coverImageKey:''})
const form=reactive(blank())
const cld=useCloudinaryUrl()
const coverUrl=computed(()=>cld(form.coverImageKey,'w_240,h_160,c_fill'))
const coverNotice=ref('')
async function uploadCover(e:Event){const file=(e.target as HTMLInputElement).files?.[0];if(!file)return;const body=new FormData();body.append('file',file);coverNotice.value='Téléversement…';try{const r=await $fetch<any>('/api/admin/upload?folder=projects',{method:'POST',body});form.coverImageKey=r.key;coverNotice.value='Image envoyée.'}catch(err:any){coverNotice.value=err?.data?.statusMessage||'Échec du téléversement'}}
function resetForm(){editingId.value='';Object.assign(form,blank());notice.value='';coverNotice.value=''}
function edit(item:any){editingId.value=item._id;Object.assign(form,{title:item.title,category:item.category,deliveryDays:item.deliveryDays||'',summary:item.summary,challenge:item.challenge||'',solution:item.solution||'',featuresRaw:(item.features||[]).join('\n'),quoteBeforeText:item.quoteBefore?.text||'',quoteBeforeAuthor:item.quoteBefore?.author||'',quoteAfterText:item.quoteAfter?.text||'',quoteAfterAuthor:item.quoteAfter?.author||'',metricsRaw:(item.resultsMetrics||[]).map((m:any)=>`${m.value} | ${m.label}`).join('\n'),toolsRaw:(item.tools||[]).join(', '),status:item.status,featured:!!item.featured,coverImageKey:item.coverImageKey||''})}
function payload(){
  const features=form.featuresRaw.split('\n').map(s=>s.trim()).filter(Boolean)
  const tools=form.toolsRaw.split(',').map(s=>s.trim()).filter(Boolean)
  const resultsMetrics=form.metricsRaw.split('\n').map(s=>s.trim()).filter(Boolean).map(line=>{const [value,...rest]=line.split('|');return {value:(value||'').trim(),label:rest.join('|').trim()}}).filter(m=>m.value&&m.label)
  const body:any={title:form.title,category:form.category,summary:form.summary,features,tools,resultsMetrics,status:form.status,featured:form.featured,coverImageKey:form.coverImageKey||undefined}
  if(form.deliveryDays)body.deliveryDays=Number(form.deliveryDays)
  if(form.challenge)body.challenge=form.challenge
  if(form.solution)body.solution=form.solution
  if(form.quoteBeforeText)body.quoteBefore={text:form.quoteBeforeText,author:form.quoteBeforeAuthor||undefined}
  if(form.quoteAfterText)body.quoteAfter={text:form.quoteAfterText,author:form.quoteAfterAuthor||undefined}
  return body
}
async function save(){notice.value='Enregistrement…';try{if(editingId.value){await $fetch(`/api/admin/projects/${editingId.value}`,{method:'PATCH',body:payload()})}else{await $fetch('/api/admin/projects',{method:'POST',body:payload()})}notice.value='Enregistré.';resetForm();await refresh()}catch(err:any){notice.value=err?.data?.statusMessage||'Échec de l’enregistrement'}}
async function toggleStatus(item:any){await $fetch(`/api/admin/projects/${item._id}`,{method:'PATCH',body:{status:item.status==='published'?'draft':'published'}});await refresh()}
async function remove(id:string){if(confirm('Supprimer cette réalisation ?')){await $fetch(`/api/admin/projects/${id}`,{method:'DELETE'});await refresh()}}
</script>
