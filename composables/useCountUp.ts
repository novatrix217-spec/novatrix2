/**
 * Anime plusieurs compteurs déclenchés par un seul élément observé : l'ensemble des
 * chiffres d'une même bande monte d'un seul geste, au lieu qu'un seul bouge pendant que
 * les autres restent figés. Même contrat que `useCountUp` : valeur finale en SSR, rien
 * ne rejoue sous prefers-reduced-motion.
 */
export function useCountUpGroup(targets: number[], duration = 1300) {
  const values = targets.map(t => ref(t))
  const element = ref<HTMLElement | null>(null)
  let frame = 0

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const run = () => {
      values.forEach(v => { v.value = 0 })
      const started = performance.now()
      const tick = (now: number) => {
        // Borné à 0 : le premier rAF peut recevoir un horodatage antérieur à `started`,
        // ce qui produisait une frame de valeurs négatives visible à l'écran.
        const progress = Math.min(Math.max((now - started) / duration, 0), 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        values.forEach((v, i) => { v.value = Math.round(targets[i]! * eased) })
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { run(); observer.disconnect() }
    }, { threshold: .35 })
    if (element.value) observer.observe(element.value)
    onBeforeUnmount(() => { observer.disconnect(); cancelAnimationFrame(frame) })
  })

  return { values, element }
}

export function useCountUp(target: number, duration = 1300) {
  // La valeur finale est le rendu SSR par défaut : aucun flash à "0" avant hydratation
  // (pour les robots, les connexions lentes ou prefers-reduced-motion). L'animation ne
  // rejoue qu'après montage côté client, quand l'élément entre dans le viewport.
  const value = ref(target)
  const element = ref<HTMLElement | null>(null)
  let frame = 0

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const run = () => {
      value.value = 0
      const started = performance.now()
      const tick = (now: number) => {
        // Borné à 0 : sans cela, un premier rAF antérieur à `started` affichait une frame
        // de valeur négative.
        const progress = Math.min(Math.max((now - started) / duration, 0), 1)
        value.value = Math.round(target * (1 - Math.pow(1 - progress, 3)))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { run(); observer.disconnect() }
    }, { threshold: .35 })
    if (element.value) observer.observe(element.value)
    onBeforeUnmount(() => { observer.disconnect(); cancelAnimationFrame(frame) })
  })
  return { value, element }
}
