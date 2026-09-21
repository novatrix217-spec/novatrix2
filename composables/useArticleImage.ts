import type { PublicArticle } from '~/shared/types'
import videoAssets from '~/shared/video-lab-assets.json'

/**
 * Visuel de couverture d'un article. Même contrat que `useProjectImage` : une image
 * explicitement associée en base l'emporte, sinon on retombe sur une illustration locale.
 *
 * Le repli n'est pas arbitraire : chaque catégorie reçoit un visuel de la banque déjà
 * présente dans le dépôt (affiches du Video Lab), choisi pour son sujet. Sans cela les
 * cartes d'article s'affichaient sans aucune image, alors que les cartes de projet en
 * avaient une : le blog paraissait vide en comparaison.
 */
/**
 * Les affiches sont prises sur Cloudinary via le manifeste, et non dans public/ : le
 * dossier public/media/video-lab/ est exclu du dépôt (.gitignore) parce qu'il contient les
 * sources vidéo. Pointer vers ces fichiers locaux donnait donc des 404 en production,
 * alors que tout fonctionnait en développement.
 */
const assets = videoAssets as Record<string, { poster: string }>
const poster = (slug: string) => assets[slug]?.poster ?? ''

/**
 * Association explicite pour les articles publiés : chacun reçoit le visuel qui colle le
 * mieux à son sujet. Un tirage par catégorie donnait la même image à deux articles
 * voisins, quelle que soit la fonction de répartition.
 */
const bySlug: Record<string, string> = {
  'pourquoi-whatsapp-est-le-bon-canal-pour-un-agent-ia-en-afrique-francophone': poster('porte-parole-studio-fr'),
  'trois-niveaux-d-autonomie-pour-vos-agents-ia-et-ou-mettre-le-curseur': poster('porte-parole-logiciel-saas'),
  'le-referencement-pour-les-ia-ce-qui-compte-quand-chatgpt-repond-a-votre-place': poster('scientifique-labo'),
  'cinq-questions-a-trancher-avant-de-cadrer-une-application-metier': poster('laboratoire-spatial-vide'),
  'le-diagnostic-en-5-points-pour-reperer-ou-votre-acquisition-fuit': poster('ceo-face-camera'),
}

const byCategory: Record<string, string[]> = {
  Acquisition: [poster('ceo-tournage-publicite'), poster('ceo-face-camera')],
  'Pilotage IA': [poster('porte-parole-logiciel-saas'), poster('porte-parole-studio-fr')],
  'Web & applications': [poster('orbit-lab'), poster('laboratoire-spatial-vide')],
  Stratégie: [poster('fondateur-cinematique'), poster('scientifique-labo')],
  Produit: [poster('scientifique-labo')],
}

// Repli de dernier recours, pour une catégorie non prévue ou absente.
const fallback = [poster('erudit-village-gothique')]

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
