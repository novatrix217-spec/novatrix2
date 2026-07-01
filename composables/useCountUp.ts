export function useCountUp(target: number, duration = 1300) {
  const value = ref(0)
  const element = ref<HTMLElement | null>(null)
  let frame = 0

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => {
      if (reduced) { value.value = target; return }
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
