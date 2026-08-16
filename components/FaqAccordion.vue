<template>
  <div class="divide-y rounded-2xl border bg-white px-5 dark:bg-[#160630]"><div v-for="(item,i) in items" :key="item.question">
    <button class="flex w-full items-center justify-between gap-5 py-5 text-left font-heading text-lg font-semibold" :aria-expanded="open===i" @click="open=open===i?-1:i">{{ item.question }}<ChevronDown class="h-5 w-5 shrink-0 text-violet-600 transition" :class="open===i?'rotate-180':''" /></button>
    <div class="grid transition-all duration-300" :class="open===i?'grid-rows-[1fr] pb-5':'grid-rows-[0fr]'"><p class="overflow-hidden text-sm leading-7 text-[var(--muted)]">{{ item.answer }}</p></div>
  </div></div>
</template>
<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
const props=defineProps<{items:{question:string;answer:string}[]}>();const open=ref(0)
useHead({script:[{type:'application/ld+json',children:JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:props.items.map(i=>({'@type':'Question',name:i.question,acceptedAnswer:{'@type':'Answer',text:i.answer}}))})}]})
</script>
