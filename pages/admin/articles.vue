<template><div>
  <div class="flex items-end justify-between"><div><h1 class="text-3xl font-bold">Articles</h1><p class="mt-2 text-[var(--muted)]">Rédaction manuelle et contenus reçus par le webhook d’auto-publication.</p></div></div>

  <section class="card mt-8 !p-6">
    <h2 class="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Auto-publication (n8n / Make)</h2>
    <p class="mt-2 text-sm leading-6 text-[var(--muted)]">Configurez un nœud HTTP Request dans votre automatisation : méthode <code class="rounded bg-[var(--surface-soft)] px-1.5 py-0.5 font-mono text-xs">POST</code> vers l’URL ci-dessous, en-tête <code class="rounded bg-[var(--surface-soft)] px-1.5 py-0.5 font-mono text-xs">Authorization: Bearer &lt;clé&gt;</code>, corps JSON avec <code class="rounded bg-[var(--surface-soft)] px-1.5 py-0.5 font-mono text-xs">title, excerpt, body, category</code> (voir champs optionnels dans la doc technique).</p>
    <div v-if="automation" class="mt-4 grid gap-3 sm:grid-cols-[auto_1fr_auto]">
      <span class="self-center font-mono text-[11px] uppercase text-[var(--muted)]">URL</span>
      <code class="rounded-lg border bg-[var(--surface-soft)] px-3 py-2 text-xs">{{ automation.webhookUrl }}</code>
      <button type="button" class="rounded-lg border px-3 py-2 text-xs font-bold" @click="copy(automation.webhookUrl)">Copier</button>
      <span class="self-center font-mono text-[11px] uppercase text-[var(--muted)]">Clé</span>
      <code class="rounded-lg border bg-[var(--surface-soft)] px-3 py-2 text-xs">{{ keyVisible ? automation.apiKey : '•'.repeat(24) }}</code>
      <div class="flex gap-2"><button type="button" class="rounded-lg border px-3 py-2 text-xs font-bold" @click="keyVisible=!keyVisible">{{ keyVisible ? 'Masquer' : 'Afficher' }}</button><button type="button" class="rounded-lg border px-3 py-2 text-xs font-bold" @click="copy(automation.apiKey)">Copier</button></div>
    </div>
    <p v-if="automation && !automation.configured" class="mt-3 text-sm text-amber-700">Aucune clé configurée : définissez <code class="rounded bg-[var(--surface-soft)] px-1.5 py-0.5 font-mono text-xs">AUTOPUBLISH_API_KEY</code> dans les variables d’environnement.</p>
    <p v-if="copyNotice" class="mt-3 text-xs text-emerald-700">{{ copyNotice }}</p>
  </section>

  <div class="mt-8 grid gap-7 xl:grid-cols-[1fr_1.1fr]">
    <form class="card space-y-4" @submit.prevent="save">
      <h2 class="text-xl font-bold">{{ editingId ? 'Modifier l’article' : 'Nouvel article' }}</h2>
      <input v-model="form.title" class="field" placeholder="Titre" required/>
      <div class="grid grid-cols-2 gap-3"><input v-model="form.category" class="field" placeholder="Catégorie" required/><input v-model="form.slug" class="field" placeholder="Slug (auto si vide)"/></div>
      <div class="flex items-center gap-4"><img v-if="coverUrl" :src="coverUrl" alt="" class="h-16 w-24 rounded-lg object-cover"/><div class="flex-1"><input type="file" accept="image/png,image/jpeg,image/webp" class="block w-full text-sm" @change="uploadCover"/><p v-if="coverNotice" class="mt-1 text-xs text-[var(--muted)]">{{ coverNotice }}</p></div></div>
      <input v-model="form.tagsRaw" class="field" placeholder="Tags, séparés par des virgules"/>
      <textarea v-model="form.excerpt" class="field min-h-20 py-3" placeholder="Extrait (affiché sur la carte et en meta description par défaut)" required maxlength="400"/>
      <textarea v-model="form.body" class="field min-h-64 py-3 font-mono text-xs" placeholder="Corps en Markdown (#, ##, -, **gras**)" required/>
      <details class="text-sm"><summary class="cursor-pointer font-semibold text-[var(--muted)]">Référencement (optionnel)</summary>
        <div class="mt-3 space-y-3"><input v-model="form.metaTitle" class="field" placeholder="Titre SEO (70 car. max, sinon le titre)" maxlength="70"/><textarea v-model="form.metaDescription" class="field min-h-16 py-2" placeholder="Meta description (170 car. max, sinon l’extrait)" maxlength="170"/></div>
      </details>
      <div class="flex items-center gap-4"><select v-model="form.status" class="field"><option value="draft">Brouillon</option><option value="published">Publié</option></select><span class="text-xs text-[var(--muted)]">Temps de lecture estimé : {{ estimatedReadingTime }} min</span></div>
      <p v-if="notice" class="text-sm" :class="noticeOk?'text-emerald-700':'text-red-700'">{{ notice }}</p>
      <div class="flex gap-3"><button class="btn-primary flex-1">{{ editingId ? 'Enregistrer' : 'Créer' }}</button><button v-if="editingId" type="button" class="rounded-lg border px-4 text-sm font-bold" @click="resetForm">Annuler</button></div>
    </form>

    <div class="space-y-3">
      <article v-for="item in data?.items" :key="item._id" class="card">
        <div class="flex gap-4">
          <img v-if="item.coverImageKey" :src="cld(item.coverImageKey,'w_140,h_100,c_fill')" alt="" class="h-16 w-20 shrink-0 rounded-lg object-cover"/>
          <div class="flex-1"><span class="font-mono text-[10px] uppercase text-violet-700">{{ item.category }} · {{ item.status==='published'?'Publié':'Brouillon' }} · {{ item.source==='automation'?'Webhook':'Manuel' }}</span><h2 class="mt-2 text-lg font-bold">{{ item.title }}</h2><p class="mt-2 text-xs text-[var(--muted)]">{{ item.readingTime }} min · {{ (item.tags||[]).join(', ') || 'sans tag' }}</p></div>
          <div class="flex flex-col gap-2"><button class="rounded-lg border px-3 py-2 text-xs font-bold" @click="edit(item)">Modifier</button><button class="rounded-lg border px-3 py-2 text-xs font-bold" @click="toggle(item)">{{ item.status==='published'?'Dépublier':'Publier' }}</button><button class="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700" @click="remove(item._id)">Supprimer</button></div>
        </div>
      </article>
    </div>
  </div>
</div></template>
<script setup lang="ts">
definePageMeta({middleware:'admin',layout:'admin',i18n:{locales:['fr']}})
useSeoMeta({title:'Articles',robots:'noindex,nofollow'})
const {data,refresh}=await useFetch<any>('/api/admin/articles')
const {data:automation}=await useFetch<any>('/api/admin/automation')
const keyVisible=ref(false),copyNotice=ref('')
async function copy(value:string){try{await navigator.clipboard.writeText(value);copyNotice.value='Copié.'}catch{copyNotice.value=value}setTimeout(()=>copyNotice.value='',2000)}

const notice=ref(''),noticeOk=ref(false),editingId=ref('')
const blank=()=>({title:'',category:'Stratégie',slug:'',tagsRaw:'',excerpt:'',body:'',metaTitle:'',metaDescription:'',status:'draft',coverImageKey:''})
const form=reactive(blank())
const cld=useCloudinaryUrl()
const coverUrl=computed(()=>cld(form.coverImageKey,'w_240,h_160,c_fill'))
const coverNotice=ref('')
async function uploadCover(e:Event){const file=(e.target as HTMLInputElement).files?.[0];if(!file)return;const body=new FormData();body.append('file',file);coverNotice.value='Téléversement…';try{const r=await $fetch<any>('/api/admin/upload?folder=articles',{method:'POST',body});form.coverImageKey=r.key;coverNotice.value='Image envoyée.'}catch(err:any){coverNotice.value=err?.data?.statusMessage||'Échec du téléversement'}}
const estimatedReadingTime=computed(()=>Math.max(1,Math.ceil(form.body.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length/220)))
function resetForm(){editingId.value='';Object.assign(form,blank());notice.value='';coverNotice.value=''}
function edit(item:any){editingId.value=item._id;Object.assign(form,{title:item.title,category:item.category,slug:item.slug,tagsRaw:(item.tags||[]).join(', '),excerpt:item.excerpt,body:item.body,metaTitle:item.seo?.metaTitle||'',metaDescription:item.seo?.metaDescription||'',status:item.status,coverImageKey:item.coverImageKey||''});window.scrollTo({top:0,behavior:'smooth'})}
function payload(){
  const tags=form.tagsRaw.split(',').map(s=>s.trim()).filter(Boolean)
  const body:any={title:form.title,category:form.category,tags,excerpt:form.excerpt,body:form.body,status:form.status,coverImageKey:form.coverImageKey||undefined}
  if(form.slug)body.slug=form.slug
  if(form.metaTitle||form.metaDescription)body.seo={metaTitle:form.metaTitle||undefined,metaDescription:form.metaDescription||undefined}
  return body
}
async function save(){notice.value='Enregistrement…';noticeOk.value=false;try{if(editingId.value){await $fetch(`/api/admin/articles/${editingId.value}`,{method:'PATCH',body:payload()})}else{await $fetch('/api/admin/articles',{method:'POST',body:payload()})}notice.value='Enregistré.';noticeOk.value=true;resetForm();await refresh()}catch(err:any){notice.value=err?.data?.statusMessage||'Échec de l’enregistrement';noticeOk.value=false}}
async function toggle(item:any){await $fetch(`/api/admin/articles/${item._id}`,{method:'PATCH',body:{status:item.status==='published'?'draft':'published'}});await refresh()}
async function remove(id:string){if(confirm('Supprimer cet article ?')){await $fetch(`/api/admin/articles/${id}`,{method:'DELETE'});await refresh()}}
</script>
