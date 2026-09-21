import type { PublicArticle } from '~/shared/types'

/**
 * Visuel de couverture d'un article. Même contrat que `useProjectImage` : une image
 * explicitement associée en base l'emporte, sinon on retombe sur une illustration locale.
 *
 * Le repli n'est pas arbitraire : chaque catégorie reçoit un visuel de la banque déjà
 * présente dans le dépôt (affiches du Video Lab), choisi pour son sujet. Sans cela les
 * cartes d'article s'affichaient sans aucune image, alors que les cartes de projet en
 * avaient une : le blog paraissait vide en comparaison.
 */
const POSTERS = '/media/video-lab/posters/'

/**
 * Association explicite pour les articles publiés : chacun reçoit le visuel qui colle le
 * mieux à son sujet. Un tirage par catégorie donnait la même image à deux articles
 * voisins, quelle que soit la fonction de répartition.
 */
const bySlug: Record<string, string> = {
  'pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone': `${POSTERS}porte-parole-studio-fr.webp`,
  'trois-niveaux-d-autonomie-pour-vos-agents-ia-et-ou-mettre-le-curseur': `${POSTERS}porte-parole-logiciel-saas.webp`,
  'le-referencement-pour-les-ia-ce-qui-compte-quand-chatgpt-repond-a-votre-place': `${POSTERS}scientifique-labo.webp`,
  'cinq-questions-a-trancher-avant-de-cadrer-une-application-metier': `${POSTERS}laboratoire-spatial-vide.webp`,
  'le-diagnostic-en-5-points-pour-reperer-ou-votre-acquisition-fuit': `${POSTERS}ceo-face-camera.webp`,
}

const byCategory: Record<string, string[]> = {
  Acquisition: [`${POSTERS}ceo-tournage-publicite.webp`, `${POSTERS}ceo-face-camera.webp`],
  'Pilotage IA': [`${POSTERS}porte-parole-logiciel-saas.webp`, `${POSTERS}porte-parole-studio-fr.webp`],
  'Web & applications': [`${POSTERS}orbit-lab.webp`, `${POSTERS}laboratoire-spatial-vide.webp`],
  Stratégie: [`${POSTERS}fondateur-cinematique.webp`, `${POSTERS}scientifique-labo.webp`],
  Produit: [`${POSTERS}scientifique-labo.webp`],
}

// Repli de dernier recours, pour une catégorie non prévue ou absente.
const fallback = [`${POSTERS}erudit-village-gothique.webp`]

/**
 * Index stable dérivé du slug : deux articles d'une même catégorie ne reçoivent pas la
 * même illustration, et un article garde toujours la sienne d'un rendu à l'autre.
 */
function pick(list: string[], slug: string) {
  if (list.length === 1) return list[0]!
  // La longueur du slug entre dans le calcul : deux titres de même catégorie commençant
  // par les mêmes mots tombaient sinon sur le même reste, donc sur la même image.
  let hash = slug.length * 7
  for (let i = 0; i < slug.length; i++) hash = (hash * 33 + slug.charCodeAt(i)) >>> 0
  return list[hash % list.length]!
}

export function useArticleImage() {
  const cld = useCloudinaryUrl()

  return (article?: Pick<PublicArticle, 'slug' | 'category' | 'coverImageKey'>, transform = 'q_auto,f_auto') => {
    if (!article) return ''
    const coverImageKey = article.coverImageKey?.trim()
    if (coverImageKey) {
      if (/^https?:\/\//i.test(coverImageKey)) return coverImageKey
      const cloudinaryUrl = cld(coverImageKey, transform)
      if (cloudinaryUrl) return cloudinaryUrl
    }
    const slug = article.slug ?? ''
    // Un article publié a son visuel choisi ; un nouvel article retombe sur sa catégorie.
    return bySlug[slug] ?? pick(byCategory[article.category ?? ''] ?? fallback, slug)
  }
}
