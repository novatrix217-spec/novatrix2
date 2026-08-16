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
        const progress = Math.min((now - started) / duration, 1)
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
