import Lenis from 'lenis'

/**
 * Fondation smooth-scroll (Lenis) — réservée aux jalons suivants (J1+).
 *
 * Non appelé par aucun composant à ce stade (J0) : ce composable n'a donc
 * aucun effet sur le comportement actuel du site. Il ne fait qu'exposer une
 * fabrique prête à l'emploi pour brancher Lenis plus tard.
 *
 * Contrainte SSR impérative : le constructeur `Lenis` lit `window` de façon
 * synchrone (ex. `window.matchMedia(...)` pour `prefers-reduced-motion`), donc
 * toute instanciation côté serveur lève `ReferenceError: window is not defined`.
 * `start()` vérifie donc `import.meta.client` avant toute instanciation, et doit
 * être appelé depuis `onMounted()` (ou un plugin `*.client.ts`), jamais pendant
 * le rendu SSR ni au niveau racine d'un composant.
 *
 * Usage prévu (J1+) :
 *   const { start, stop, destroy, instance } = useLenis()
 *   onMounted(() => start())
 *   onBeforeUnmount(() => destroy())
 *   // piloter la boucle de rendu via GSAP ticker ou requestAnimationFrame,
 *   // par ex. gsap.ticker.add((time) => instance()?.raf(time * 1000))
 *
 * Lenis respecte nativement `prefers-reduced-motion` (option `respectReducedMotion`,
 * true par défaut : lerp forcé à 1, scrolls programmatiques instantanés). Pour les
 * animations GSAP/ScrollTrigger associées, combiner en plus avec `useReducedMotion()`.
 */

let instance: Lenis | null = null

export function useLenis() {
  const start = (options: ConstructorParameters<typeof Lenis>[0] = {}) => {
    if (!import.meta.client) return null
    if (instance) return instance
    instance = new Lenis({ autoRaf: false, respectReducedMotion: true, ...options })
    return instance
  }

  const stop = () => {
    instance?.stop()
  }

  const destroy = () => {
    instance?.destroy()
    instance = null
  }

  return { start, stop, destroy, instance: () => instance }
}
