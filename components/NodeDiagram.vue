<template>
  <div ref="box" class="h-full w-full" @pointermove="move" @pointerleave="offset = { x: 0, y: 0 }">
    <svg viewBox="0 0 100 100" class="h-full w-full transition-transform duration-500" :style="{ transform: `translate(${offset.x}px,${offset.y}px)` }" role="img" aria-label="Réseau NovatrixAI animé">
      <defs><pattern id="g" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="rgba(109,40,217,.18)" stroke-width=".2"/></pattern><filter id="glow"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <rect width="100" height="100" fill="url(#g)"/>
      <line v-for="(edge,i) in edges" :key="i" :x1="edge[0]" :y1="edge[1]" :x2="edge[2]" :y2="edge[3]" :stroke="i === active ? '#3DE0C5' : 'rgba(139,92,246,.32)'" :stroke-width="i === active ? .7 : .3" stroke-dasharray="2 2" :class="i === active ? 'flow-line' : ''"/>
      <g v-for="node in nodes" :key="node.label">
        <circle v-if="node.core" :cx="node.x" :cy="node.y" r="11" fill="none" stroke="#3DE0C5" stroke-width=".35" class="node-pulse"/>
        <rect :x="node.x-(node.core?8:5)" :y="node.y-3" :width="node.core?16:10" height="6" rx="1.2" :fill="node.core?'#3DE0C5':node.out?'#10243A':'#250052'" :stroke="node.core||node.out?'#3DE0C5':'#8B5CF6'" stroke-width=".5" :filter="node.core?'url(#glow)':undefined"/>
        <text :x="node.x" :y="node.y+.8" text-anchor="middle" :fill="node.core?'#1C0038':node.out?'#3DE0C5':'#C4B5FD'" :font-size="node.core?2.1:1.55" font-family="JetBrains Mono" font-weight="600">{{ node.label }}</text>
      </g>
    </svg>
  </div>
</template>
<script setup lang="ts">
const nodes=[{x:10,y:20,label:'Campagnes'},{x:10,y:50,label:'Leads'},{x:10,y:80,label:'Outils'},{x:34,y:17,label:'Tunnel'},{x:34,y:40,label:'Scoring'},{x:34,y:65,label:'Agents IA'},{x:34,y:87,label:'CRM'},{x:58,y:50,label:'Novatrix Core',core:true},{x:84,y:20,label:'Clients',out:true},{x:84,y:44,label:'Temps gagné',out:true},{x:84,y:69,label:'Croissance',out:true},{x:84,y:90,label:'Pilotage',out:true}]
const edges=[[10,20,34,17],[10,20,34,40],[10,50,34,40],[10,50,34,65],[10,80,34,65],[10,80,34,87],[34,17,58,50],[34,40,58,50],[34,65,58,50],[34,87,58,50],[58,50,84,20],[58,50,84,44],[58,50,84,69],[58,50,84,90]]
const active=ref(0),box=ref<HTMLElement|null>(null),offset=ref({x:0,y:0}); let frame=0,last=0
function loop(now:number){if(now-last>520){active.value=(active.value+1)%edges.length;last=now}frame=requestAnimationFrame(loop)}
function move(e:PointerEvent){if(!box.value)return;const r=box.value.getBoundingClientRect();offset.value={x:((e.clientX-r.left)/r.width-.5)*5,y:((e.clientY-r.top)/r.height-.5)*5}}
onMounted(()=>{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)frame=requestAnimationFrame(loop)});onBeforeUnmount(()=>cancelAnimationFrame(frame))
</script>
