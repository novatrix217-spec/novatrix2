import Lenis from 'lenis'

/**
 * Défilement fluide/inertiel global (molette, trackpad, touche), via Lenis.
 * Lenis pilote le scroll natif de la page (`window.scrollTo` sous le capot) : les listeners
 * `scroll` existants (barre de progression, parallax) continuent de se déclencher normalement.
 *
 * Désactivé si prefers-reduced-motion — le scroll natif instantané reste alors actif.
 * À appeler une fois dans le layout par défaut.
 */
export function useSmoothScroll() {
  let lenis: Lenis | null = null
  let raf = 0

  // Lenis intercepte le scroll : un simple <a href="#ancre"> ne déclenche plus le saut natif
  // du navigateur. On lui délègue explicitement la navigation vers l'ancre au clic.
  const onClick = (e: MouseEvent) => {
    const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!anchor) return
    const id = anchor.getAttribute('href')?.slice(1)
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    lenis ? lenis.scrollTo(target) : target.scrollIntoView({ behavior: 'smooth' })
  }

  onMounted(() => {
    document.addEventListener('click', onClick)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    lenis = new Lenis({ duration: 1.1, smoothWheel: true })

    const loop = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', onClick)
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  })
}
