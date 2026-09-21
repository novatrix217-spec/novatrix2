import type { RouterConfig } from '@nuxt/schema'

/**
 * Position de la page à chaque navigation.
 *
 * Le navigateur restaure seul la position de défilement au rechargement, mais il le fait
 * avant que le contenu ne soit monté : sur une page dont le hero occupe tout l'écran, la
 * hauteur mesurée est alors bien plus courte que la hauteur finale, et la restauration
 * atterrissait dans le pied de page. On reprend donc la main : la position mémorisée n'est
 * rétablie qu'une fois le rendu terminé.
 */
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Ancre explicite : on laisse le CSS `scroll-behavior: smooth` faire le déplacement.
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: 'smooth' }
    }

    // Retour arrière/avant : on attend le rendu avant de rétablir la position mémorisée,
    // sinon le document n'a pas encore sa hauteur définitive.
    if (savedPosition) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve(savedPosition))
        })
      })
    }

    // Navigation normale : toujours en haut, sans animation.
    return { left: 0, top: 0 }
  },
}
