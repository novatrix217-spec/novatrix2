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
  let safety: number | undefined

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

    // Deux seuils : 0 déclenche dès que l'élément effleure le viewport, `threshold` garde le
    // rendu d'origine pour les blocs assez hauts. Sans le seuil 0, un élément plus haut que le
    // viewport (ou très plat) pouvait n'atteindre jamais le ratio demandé et rester invisible
    // en permanence — le contenu était alors dans le DOM mais jamais affiché.
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        apply(entry.target)
        if (once && observer) observer.unobserve(entry.target)
      }
    }, { threshold: [0, threshold], rootMargin: '0px 0px -8% 0px' })

    targets.forEach((t) => observer!.observe(t))

    // Filet de sécurité : au-delà de ce délai, tout élément encore masqué est affiché
    // d'office. Une animation ratée doit rester une animation ratée, jamais du contenu
    // définitivement invisible pour le visiteur.
    safety = window.setTimeout(() => {
      host.querySelectorAll('.reveal:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-scale:not(.is-visible)')
        .forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 1.5) apply(el)
        })
    }, 2500)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    if (safety) clearTimeout(safety)
  })

  return root
}
