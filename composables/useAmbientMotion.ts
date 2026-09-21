/**
 * Mouvement ambiant de la page, en trois temps :
 *
 * 1. DÉFILEMENT — chaque élément `.drift` reçoit `--sy` (-1..1 selon sa traversée du
 *    viewport), que le CSS traduit en déplacement selon son `--depth`. Contrairement à
 *    `useScrollParallax`, qui mesure un seul conteneur, un observateur unique suit ici
 *    tous les éléments marqués de la page : plus besoin d'un ref par section.
 * 2. À L'ARRÊT — `.scrolling` est posée sur <html> pendant le défilement et retirée après
 *    une courte inactivité, ce qui laisse le CSS reprendre la main avec ses animations
 *    lentes (respiration des halos, dérive des orbes) quand la page est immobile.
 * 3. AU SURVOL — `--cx` / `--cy` suivent le pointeur sur <html> (0..1), utilisables par
 *    n'importe quel décor pour réagir à la position de la souris sur la page entière.
 *
 * Un seul rAF pour tout, lecture du layout groupée, et rien ne tourne sous
 * prefers-reduced-motion.
 */
export function useAmbientMotion() {
  let raf = 0
  let idleTimer: number | undefined
  let targets: HTMLElement[] = []
  let pointerRaf = 0

  const measure = () => {
    raf = 0
    const vh = window.innerHeight || 1
    for (const el of targets) {
      const r = el.getBoundingClientRect()
      // Rien à écrire pour un élément loin du viewport : autant d'écritures de style
      // évitées à chaque frame de défilement.
      if (r.bottom < -vh || r.top > vh * 2) continue
      const progress = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2)
      el.style.setProperty('--sy', Math.max(-1, Math.min(1, progress)).toFixed(3))
    }
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(measure)
    const root = document.documentElement
    root.classList.add('scrolling')
    if (idleTimer) clearTimeout(idleTimer)
    // À l'arrêt, la classe tombe : les animations d'ambiance reprennent la main.
    idleTimer = window.setTimeout(() => root.classList.remove('scrolling'), 180)
  }

  const onPointer = (e: PointerEvent) => {
    if (pointerRaf) return
    pointerRaf = requestAnimationFrame(() => {
      pointerRaf = 0
      const root = document.documentElement
      root.style.setProperty('--cx', (e.clientX / (window.innerWidth || 1)).toFixed(3))
      root.style.setProperty('--cy', (e.clientY / (window.innerHeight || 1)).toFixed(3))
    })
  }

  const collect = () => {
    // `.drift-grid` porte --sy pour ses enfants, qui dérivent en quinconce via le CSS.
    targets = [...document.querySelectorAll<HTMLElement>('.drift, .drift-grid')]
    measure()
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    collect()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    if (!window.matchMedia('(pointer: coarse)').matches) {
      window.addEventListener('pointermove', onPointer, { passive: true })
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    window.removeEventListener('pointermove', onPointer)
    cancelAnimationFrame(raf)
    cancelAnimationFrame(pointerRaf)
    if (idleTimer) clearTimeout(idleTimer)
    document.documentElement.classList.remove('scrolling')
  })

  // Recollecte après changement de route : les éléments .drift de la page précédente
  // n'existent plus, ceux de la nouvelle ne sont pas encore observés.
  const route = useRoute()
  watch(() => route.fullPath, () => nextTick(collect))
}
