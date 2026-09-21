/**
 * Cycle automatique : les étapes s'allument l'une après l'autre, en boucle, sans aucune
 * action du visiteur. À la différence de `useStepProgress`, qui avance avec le défilement,
 * le parcours tourne ici tout seul dès qu'il est à l'écran.
 *
 * L'étape courante porte `.is-current`, celles déjà passées `.is-active`.
 *
 * Le cycle ne tourne que lorsque la section est visible (inutile d'animer hors écran, et
 * l'onglet masqué suspend de lui-même les timers) et s'arrête sous prefers-reduced-motion,
 * où toutes les étapes restent simplement allumées.
 *
 * Usage :
 *   const { track, setStepRef, current } = useStepCycle(4, 2200)
 */
import type { ComponentPublicInstance } from 'vue'

export function useStepCycle(count: number, interval = 2400) {
  const track = ref<HTMLElement | null>(null)
  const stepRefs = ref<(HTMLElement | null)[]>(Array.from({ length: count }, () => null))
  const current = ref(0)
  let timer: number | undefined
  let observer: IntersectionObserver | null = null

  function setStepRef(el: Element | ComponentPublicInstance | null, index: number) {
    stepRefs.value[index] = el instanceof HTMLElement ? el : null
  }

  const paint = () => {
    stepRefs.value.forEach((el, i) => {
      if (!el) return
      el.classList.toggle('is-current', i === current.value)
      el.classList.toggle('is-active', i <= current.value)
    })
    track.value?.style.setProperty('--progress', String((current.value + 1) / count))
  }

  const start = () => {
    if (timer) return
    timer = window.setInterval(() => {
      current.value = (current.value + 1) % count
      paint()
    }, interval)
  }
  const stop = () => {
    if (!timer) return
    clearInterval(timer)
    timer = undefined
  }

  onMounted(() => {
    const host = track.value
    if (!host) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Pas de cycle : tout est allumé, l'information reste entière.
      stepRefs.value.forEach(el => el?.classList.add('is-active'))
      host.style.setProperty('--progress', '1')
      return
    }

    host.classList.add('js-steps')
    paint()

    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start()
      else stop()
    }, { threshold: 0.2 })
    observer.observe(host)
  })

  onBeforeUnmount(() => {
    stop()
    observer?.disconnect()
  })

  return { track, setStepRef, current }
}
