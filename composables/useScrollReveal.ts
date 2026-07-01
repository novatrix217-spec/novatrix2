/**
 * Révèle les éléments porteurs d'une classe `.reveal*` quand ils entrent dans le viewport.
 * Observe tout le sous-arbre du conteneur retourné (`root`), un seul observer par usage.
 * Respecte prefers-reduced-motion (les classes CSS gèrent déjà le fallback, on se contente
 * de marquer visible immédiatement).
 *
 * Usage :
 *   const reveal = useScrollReveal()
 *   <div :ref="reveal"> ... éléments avec class="reveal" ... </div>
 *
 * Un délai d'apparition en cascade se déclare via l'attribut `data-reveal-delay` (ms).
 */
export function useScrollReveal(options: { threshold?: number; once?: boolean } = {}) {
  const { threshold = 0.16, once = true } = options
  const root = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const apply = (el: Element) => {
    const delay = (el as HTMLElement).dataset.revealDelay
    if (delay) (el as HTMLElement).style.transitionDelay = `${delay}ms`
    el.classList.add('is-visible')
  }

  onMounted(() => {
    const host = root.value
    if (!host) return
    const targets = host.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    if (!targets.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { targets.forEach(apply); return }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        apply(entry.target)
        if (once && observer) observer.unobserve(entry.target)
      }
    }, { threshold, rootMargin: '0px 0px -8% 0px' })

    targets.forEach((t) => observer!.observe(t))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return root
}
