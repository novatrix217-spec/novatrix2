/**
 * Parcours qui se construit au défilement : chaque étape atteinte s'active, et toutes
 * celles qui précèdent le restent. Le conteneur reçoit `--progress` (0..1), consommé par
 * la ligne de liaison pour se tracer au fur et à mesure.
 *
 * Le motif existait déjà, écrit deux fois dans pages/index.vue (problèmes, chaîne
 * d'acquisition) ; il est factorisé ici pour servir aussi aux phases de la méthode.
 *
 * Usage :
 *   const { track, setStepRef, setNodeRef } = useStepProgress(4)
 *   <ol :ref="track">
 *     <li v-for="(item, i) in items" :ref="(el) => setStepRef(el, i)">
 *
 * Sous prefers-reduced-motion, tout est activé d'emblée : l'information reste visible,
 * seule la mise en scène disparaît.
 */
import type { ComponentPublicInstance } from 'vue'

export function useStepProgress(count: number, options: { threshold?: number } = {}) {
  const { threshold = 0.45 } = options
  const track = ref<HTMLElement | null>(null)
  const stepRefs = ref<(HTMLElement | null)[]>(Array.from({ length: count }, () => null))
  const nodeRefs = ref<(HTMLElement | null)[]>(Array.from({ length: count }, () => null))
  let observer: IntersectionObserver | null = null

  const toEl = (el: Element | ComponentPublicInstance | null) =>
    el instanceof HTMLElement ? el : null

  function setStepRef(el: Element | ComponentPublicInstance | null, index: number) {
    stepRefs.value[index] = toEl(el)
  }
  function setNodeRef(el: Element | ComponentPublicInstance | null, index: number) {
    nodeRefs.value[index] = toEl(el)
  }

  onMounted(() => {
    const host = track.value
    const steps = stepRefs.value.filter(Boolean) as HTMLElement[]
    if (!host || steps.length === 0) return
    const nodes = nodeRefs.value.filter(Boolean) as HTMLElement[]

    const activateUpTo = (index: number) => {
      host.style.setProperty('--progress', String((index + 1) / steps.length))
      steps.forEach((el, i) => el.classList.toggle('is-active', i <= index))
      nodes.forEach((el, i) => el.classList.toggle('is-active', i <= index))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.style.setProperty('--progress', '1')
      steps.forEach(el => el.classList.add('is-active'))
      nodes.forEach(el => el.classList.add('is-active'))
      return
    }

    // Marque le conteneur : les styles de mise en retrait des étapes non atteintes ne
    // s'appliquent qu'à partir d'ici. Sans script, rien n'est masqué ni délavé.
    host.classList.add('js-steps')

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const index = steps.indexOf(entry.target as HTMLElement)
        if (index === -1) continue
        activateUpTo(index)
        observer?.unobserve(entry.target)
      }
    }, { threshold, rootMargin: '0px 0px -10% 0px' })

    steps.forEach(el => observer!.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { track, setStepRef, setNodeRef }
}
