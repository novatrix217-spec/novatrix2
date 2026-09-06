<template>
  <component :is="tag" class="reveal-words">
    <span
      v-for="(word, i) in words"
      :key="`${word}-${i}`"
      :style="{ '--word-index': i }"
    >{{ word }}</span>
  </component>
</template>

<script setup lang="ts">
/**
 * Découpe un titre en mots pour la révélation en cascade au défilement
 * (cf. `.reveal-words` dans main.css, piloté par `animation-timeline: view()`).
 *
 * Le texte reste un seul bloc lisible : les mots sont des `<span>` inline conservant
 * leurs espaces (`white-space: pre-wrap`), donc la sélection, la recherche dans la page
 * et les lecteurs d'écran lisent la phrase normalement, sans césure artificielle.
 */
const props = withDefaults(defineProps<{ text: string; tag?: string }>(), { tag: 'span' })

// L'espace est conservé en fin de mot plutôt que supprimé : sans lui, les mots se
// colleraient une fois transformés en éléments inline-block.
const words = computed(() => props.text.trim().split(/(\s+)/).filter(Boolean).reduce<string[]>((acc, part, i, all) => {
  if (/^\s+$/.test(part)) return acc
  const next = all[i + 1]
  acc.push(/^\s+$/.test(next ?? '') ? `${part} ` : part)
  return acc
}, []))
</script>
