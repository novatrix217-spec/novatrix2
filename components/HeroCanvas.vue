<template>
  <div
    ref="container"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0"
    :style="{ opacity: ready ? 1 : 0, transition: 'opacity 700ms ease-out' }"
  />
</template>

<script setup lang="ts">
/**
 * Calque WebGL décoratif du hero : dégradé de bruit animé, réagissant au pointeur.
 *
 * Garde-fous (aucun n'est optionnel) :
 * - jamais rendu côté serveur : le canvas n'est créé qu'après montage client ;
 * - `prefers-reduced-motion` coupe l'initialisation, le dégradé CSS `.hero-rich` du
 *   parent reste alors seul visible ;
 * - purement décoratif : `aria-hidden`, `pointer-events: none`, aucun texte — le H1 et
 *   les CTA restent du HTML brut par-dessus ;
 * - fallback strictement silencieux si WebGL manque ou si l'init échoue ;
 * - la boucle est suspendue hors viewport et quand l'onglet est masqué.
 *
 * Palette alignée sur les tokens du hero (#1C0038, #6D28D9, #C026D3).
 */
const VERTEX = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

const vec3 cBg = vec3(0.1098, 0.0, 0.2118);     // #1C0038
const vec3 cStart = vec3(0.4275, 0.1569, 0.851); // #6D28D9
const vec3 cEnd = vec3(0.7529, 0.1490, 0.8275);  // #C026D3

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 aspect = uResolution.x > uResolution.y
    ? vec2(uResolution.x / uResolution.y, 1.0)
    : vec2(1.0, uResolution.y / uResolution.x);
  vec2 p = (vUv - 0.5) * aspect;
  vec2 mouse = (uMouse - 0.5) * aspect;

  float t = uTime * 0.05;
  float n = noise(p * 1.6 + t);

  float dist = length(p - mouse);
  float glow = exp(-dist * 3.2) * 0.55;

  vec2 warped = p + (p - mouse) * glow * 0.35;
  float mixVal = clamp(length(warped) * 0.9 + n * 0.35, 0.0, 1.0);

  vec3 color = mix(cStart, cEnd, mixVal);
  // Le fond reste largement dominé par cBg : le shader donne du mouvement,
  // il ne doit jamais concurrencer la lisibilité du H1 et des CTA posés dessus.
  // Le mélange est volontairement faible et resserré (0,09 à 0,15 au lieu de 0,16 à 0,26) :
  // mixVal croît avec la distance au centre, donc les bords du hero s'éclaircissaient
  // nettement. Depuis que la section peut dépasser la hauteur de l'écran, cet écart se
  // lisait comme un fond qui change de couleur pendant le défilement.
  color = mix(cBg, color, 0.09 + n * 0.06);
  color += glow * 0.07 * cEnd;

  gl_FragColor = vec4(color, 1.0);
}
`

const container = ref<HTMLElement | null>(null)
const ready = ref(false)

let destroyed = false
let raf = 0
let cleanup: (() => void) | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const host = container.value
  if (!host) return

  // Sonde WebGL manuelle : le Renderer OGL loguerait une erreur console si le contexte
  // échoue, ce qui empêcherait un fallback réellement silencieux.
  const probe = document.createElement('canvas')
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return

  let inViewport = true
  let pageVisible = document.visibilityState === 'visible'

  void (async () => {
    try {
      const { Renderer, Triangle, Program, Mesh } = await import('ogl')
      if (destroyed) return

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: false, antialias: false })
      const gl = renderer.gl
      gl.clearColor(0.1098, 0, 0.2118, 1)
      gl.canvas.style.display = 'block'
      gl.canvas.style.width = '100%'
      gl.canvas.style.height = '100%'

      const geometry = new Triangle(gl)
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: { uTime: { value: 0 }, uMouse: { value: [0.5, 0.4] }, uResolution: { value: [1, 1] } },
      })
      const mesh = new Mesh(gl, { geometry, program })

      const resize = () => {
        const { clientWidth, clientHeight } = host
        if (!clientWidth || !clientHeight) return
        renderer.setSize(clientWidth, clientHeight)
        program.uniforms.uResolution.value = [clientWidth, clientHeight]
      }
      resize()
      host.appendChild(gl.canvas)

      const targetMouse = [0.5, 0.4]
      const currentMouse = [0.5, 0.4]
      const onPointerMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        targetMouse[0] = (event.clientX - rect.left) / rect.width
        targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height
      }
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('resize', resize)

      // La boucle est relancée à la demande plutôt que de tourner à vide : hors écran ou
      // onglet masqué, elle s'arrête réellement au lieu de redemander une frame à chaque
      // tour, ce qui la laissait active sur toute la session.
      // `loop` est défini plus bas : on passe par une variable pour que l'ordre de
      // déclaration n'impose pas de réorganiser tout le bloc d'initialisation.
      let resume = () => {}
      const observer = new IntersectionObserver(([entry]) => {
        inViewport = !!entry?.isIntersecting
        if (inViewport) resume()
      }, { rootMargin: '120px' })
      observer.observe(host)
      const onVisibility = () => {
        pageVisible = document.visibilityState === 'visible'
        if (pageVisible) resume()
      }
      document.addEventListener('visibilitychange', onVisibility)

      cleanup = () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('resize', resize)
        document.removeEventListener('visibilitychange', onVisibility)
        observer.disconnect()
        gl.canvas.parentElement?.removeChild(gl.canvas)
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }

      const start = performance.now()
      const loop = (now: number) => {
        if (destroyed) return
        // Hors écran ou onglet masqué : on rend la main au navigateur. `resume` relance la
        // boucle dès que le hero redevient visible.
        if (!inViewport || !pageVisible) { raf = 0; return }
        currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.06
        currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.06
        program.uniforms.uTime.value = (now - start) / 1000
        program.uniforms.uMouse.value = currentMouse
        renderer.render({ scene: mesh })
        if (!ready.value) ready.value = true
        raf = requestAnimationFrame(loop)
      }
      resume = () => {
        if (destroyed || raf || !inViewport || !pageVisible) return
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    } catch {
      // Contexte perdu, shader refusé, module indisponible : on laisse le dégradé CSS.
    }
  })()
})

onBeforeUnmount(() => {
  destroyed = true
  cancelAnimationFrame(raf)
  cleanup?.()
})
</script>
