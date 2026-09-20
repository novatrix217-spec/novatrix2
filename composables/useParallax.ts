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
 * Tilt 3D par délégation : un seul jeu d'écouteurs sur le conteneur anime toutes les
 * cartes `.tilt` qu'il contient, y compris celles rendues par `v-for`. `useTilt` ne
 * pilote qu'un élément et ne convient donc pas à une liste.
 */
export function useTiltGroup(max = 8) {
  const host = ref<HTMLElement | null>(null)
  let raf = 0

  const onMove = (e: PointerEvent) => {
    const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.tilt')
    if (!card) return
    const r = card.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      card.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`
    })
  }
  const onOut = (e: PointerEvent) => {
    const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.tilt')
    // `pointerout` remonte aussi pour un déplacement interne à la carte : on ne remet à
    // plat que si le pointeur a réellement quitté cette carte.
    if (!card || card.contains(e.relatedTarget as Node | null)) return
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  onMounted(() => {
    const el = host.value
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerout', onOut, { passive: true })
  })
  onBeforeUnmount(() => {
    const el = host.value
    el?.removeEventListener('pointermove', onMove)
    el?.removeEventListener('pointerout', onOut)
    cancelAnimationFrame(raf)
  })

  return host
}

/**
 * Boutons magnétiques : tout élément `.magnetic` de la page suit légèrement le pointeur
 * quand il s'en approche, puis revient en place. Un seul écouteur global couvre la page
 * entière, y compris les boutons rendus par `v-for` ou ajoutés après coup.
 * `radius` est la distance (px) au-delà de laquelle l'élément ne réagit plus.
 * À appeler une fois par page. Inerte au toucher et sous prefers-reduced-motion.
 */
export function useMagnetic(strength = 0.28, radius = 90) {
  let raf = 0
  const active = new Set<HTMLElement>()

  const onMove = (e: PointerEvent) => {
    const els = document.querySelectorAll<HTMLElement>('.magnetic')
    if (!els.length) return
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        // Distance au bord du bouton plutôt qu'à son centre : un grand bouton ne doit pas
        // se mettre à fuir le pointeur simplement parce qu'il est large.
        const reach = Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2))
        if (reach > radius) {
          if (active.delete(el)) el.style.transform = ''
          return
        }
        active.add(el)
        const falloff = 1 - reach / radius
        el.style.transform = `translate(${(dx * strength * falloff).toFixed(1)}px, ${(dy * strength * falloff).toFixed(1)}px)`
      })
    })
  }
  const reset = () => {
    cancelAnimationFrame(raf)
    active.forEach((el) => { el.style.transform = '' })
    active.clear()
  }

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', reset, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', reset)
    cancelAnimationFrame(raf)
    reset()
  })
}

/**
 * Lueur qui suit le curseur sur les éléments `.spotlight` : écrit `--mx` / `--my` (en %)
 * sur la carte survolée, qu'un dégradé radial CSS consomme. Un seul écouteur délégué
 * couvre toute la page, cartes rendues par `v-for` comprises.
 * À appeler une fois par page. Inerte au toucher et sous prefers-reduced-motion.
 */
export function useSpotlight() {
  let raf = 0

  const onMove = (e: PointerEvent) => {
    const card = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spotlight')
    if (!card) return
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
      card.style.setProperty('--my', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
    })
  }

  onMounted(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return
    window.addEventListener('pointermove', onMove, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    cancelAnimationFrame(raf)
  })
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

/**
 * Parallax piloté par le SCROLL (complément de `useParallax`, qui ne réagit qu'à la souris
 * et reste donc inerte sur mobile). Écrit `--sy` sur l'élément hôte : progression -1..1 de
 * la traversée de l'élément dans le viewport (0 = centré à l'écran).
 *
 * Les enfants `.scroll-parallax` consomment `--sy` avec leur propre `--depth` :
 *   const host = useScrollParallax()
 *   <section :ref="host">
 *     <div class="scroll-parallax" style="--depth: 40"> couche lente </div>
 *   </section>
 *
 * Désactivé si prefers-reduced-motion. Lecture seule du layout dans un rAF : aucun
 * listener de scroll bloquant, et rien n'est écrit pendant la phase de scroll elle-même.
 */
export function useScrollParallax() {
  const host = ref<HTMLElement | null>(null)
  let raf = 0

  const update = () => {
    raf = 0
    const el = host.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight || 1
    // Centre de l'élément rapporté au centre du viewport, normalisé et borné.
    const progress = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2)
    el.style.setProperty('--sy', Math.max(-1, Math.min(1, progress)).toFixed(3))
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

  onMounted(() => {
    if (!host.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    cancelAnimationFrame(raf)
  })

  return host
}
