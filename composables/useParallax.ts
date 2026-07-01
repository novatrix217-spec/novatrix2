/**
 * Parallax piloté par la souris (et léger drift au scroll).
 * Écrit `--px` / `--py` (en px, -1..1 normalisé puis amplifié) sur l'élément hôte ;
 * les enfants `.parallax-layer` consomment ces variables avec leur propre `--depth`.
 *
 * Usage :
 *   const par = useParallax()
 *   <section :ref="par">
 *     <div class="parallax-layer" style="--depth: 6"> couche lointaine </div>
 *     <div class="parallax-layer" style="--depth: -10"> couche proche </div>
 *   </section>
 *
 * Désactivé si prefers-reduced-motion ou pointeur grossier (tactile).
 */
export function useParallax(strength = 18) {
  const host = ref<HTMLElement | null>(null)
  let raf = 0
  let tx = 0, ty = 0, cx = 0, cy = 0

  const render = () => {
    cx += (tx - cx) * 0.08
    cy += (ty - cy) * 0.08
    if (host.value) {
      host.value.style.setProperty('--px', cx.toFixed(2))
      host.value.style.setProperty('--py', cy.toFixed(2))
    }
    if (Math.abs(tx - cx) > 0.01 || Math.abs(ty - cy) > 0.01) {
      raf = requestAnimationFrame(render)
    } else { raf = 0 }
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(render) }

  const onMove = (e: PointerEvent) => {
    const el = host.value
    if (!el) return
    const r = el.getBoundingClientRect()
    tx = ((e.clientX - r.left) / r.width - 0.5) * strength
    ty = ((e.clientY - r.top) / r.height - 0.5) * strength
    kick()
  }
  const onLeave = () => { tx = 0; ty = 0; kick() }

  onMounted(() => {
    const el = host.value
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave, { passive: true })
  })

  onBeforeUnmount(() => {
    const el = host.value
    el?.removeEventListener('pointermove', onMove)
    el?.removeEventListener('pointerleave', onLeave)
    cancelAnimationFrame(raf)
  })

  return host
}

/**
 * Tilt 3D au survol d'une carte. Pose `rotateX/rotateY` selon la position du pointeur.
 * À poser sur l'élément `.tilt` (qui doit avoir un parent avec perspective).
 */
export function useTilt(max = 9) {
  const el = ref<HTMLElement | null>(null)
  let raf = 0

  const onMove = (e: PointerEvent) => {
    const node = el.value
    if (!node) return
    const r = node.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`
    })
  }
  const reset = () => {
    cancelAnimationFrame(raf)
    if (el.value) el.value.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  onMounted(() => {
    const node = el.value
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return
    node.addEventListener('pointermove', onMove, { passive: true })
    node.addEventListener('pointerleave', reset, { passive: true })
  })
  onBeforeUnmount(() => {
    const node = el.value
    node?.removeEventListener('pointermove', onMove)
    node?.removeEventListener('pointerleave', reset)
    cancelAnimationFrame(raf)
  })

  return el
}

/**
 * Barre de progression de scroll : écrit `--scroll` (0%..100%) sur <html>.
 * À appeler une fois dans le layout. Retourne rien (effet global).
 */
export function useScrollProgress() {
  let raf = 0
  const update = () => {
    raf = 0
    const h = document.documentElement
    const max = h.scrollHeight - h.clientHeight
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0
    h.style.setProperty('--scroll', `${pct.toFixed(2)}%`)
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(raf)
  })
}
