<template>
  <div class="mx-auto w-full max-w-[390px] overflow-hidden rounded-[28px] border-[7px] border-[#160630] bg-[#e9e4dc] shadow-2xl">
    <div class="flex items-center gap-3 bg-[#075E54] px-4 py-4 text-white"><span class="grid h-9 w-9 place-items-center rounded-full bg-[#3DE0C5] text-[#160630]"><Bot class="h-5 w-5"/></span><div><p class="text-sm font-bold">NovatrixAI Pilot</p><p class="text-[10px] text-white/70">en ligne · système actif</p></div></div>
    <div class="flex h-[430px] flex-col gap-3 overflow-y-auto p-4"><div class="mx-auto rounded-full bg-white/70 px-3 py-1 text-[10px] text-slate-500">Aujourd'hui</div>
      <div v-for="message in visible" :key="message.id" class="bubble-in flex" :class="message.from==='user'?'justify-end':'justify-start'"><div class="max-w-[82%] rounded-xl px-3 py-2 text-xs leading-5 text-[#160630] shadow-sm" :class="message.from==='user'?'rounded-br-sm bg-[#DCF8C6]':'rounded-bl-sm bg-white'">{{ message.text }}<div class="mt-1 text-right text-[9px] text-slate-400">10:24 <span v-if="message.from==='user'" class="text-sky-500">✓✓</span></div></div></div>
      <div v-if="typing" class="bubble-in w-fit rounded-xl bg-white px-4 py-3 shadow-sm"><span v-for="i in 3" :key="i" class="mx-0.5 inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"/></div>
    </div>
    <div class="flex items-center gap-2 bg-[#f4f4f4] p-3"><span class="flex-1 rounded-full bg-white px-4 py-2 text-[11px] text-slate-400">Écrivez une commande…</span><span class="grid h-8 w-8 place-items-center rounded-full bg-[#075E54]"><ArrowUp class="h-4 w-4 text-white"/></span></div>
  </div>
</template>
<script setup lang="ts">
import { ArrowUp,Bot } from 'lucide-vue-next'
const all=[{id:1,from:'user',text:'Donne-moi les chiffres clés de la semaine et les décisions à prendre.'},{id:2,from:'agent',text:'Synthèse prête. Deux factures arrivent à échéance. Je recommande de relancer les clients aujourd’hui.'},{id:3,from:'user',text:'Fais les relances et programme un point demain à 9 h.'},{id:4,from:'agent',text:'Relances préparées. Je te demande validation avant envoi. Le point est ajouté à l’agenda.'}]
const visible=ref<typeof all>([]),typing=ref(false);let timers:ReturnType<typeof setTimeout>[]=[]
function play(){visible.value=[];all.forEach((m,i)=>timers.push(setTimeout(()=>{if(m.from==='agent')typing.value=true;timers.push(setTimeout(()=>{typing.value=false;visible.value.push(m)},m.from==='agent'?650:100))},i*1800+200)));timers.push(setTimeout(play,all.length*1800+2200))}
onMounted(play);onBeforeUnmount(()=>timers.forEach(clearTimeout))
</script>
